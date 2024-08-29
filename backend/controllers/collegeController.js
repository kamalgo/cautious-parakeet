const { Op } = require("sequelize");
const ROLES = require("../helpers/roles");
// const User = require("../models/usersModel");
const collegeprofile = require("../models/collegeModel");
const streamData = require("../models/streamModel");
const QualificationLevel = require("../models/qaulfification-levelModel");
const MahadbtCollegeStream = require("../models/mahadbtCollegeStreamModel");

const { validationResult } = require("express-validator");
const { createHmac } = require("crypto");

const dotenv = require("dotenv");
dotenv.config();

exports.getAllCollegeProfile = (req, res) => {
  collegeprofile
    .findAll({})
    .then((data) => {
      // console.log("your data req", data);
      data = JSON.stringify(data);
      data = JSON.parse(data);
      res.json({
        success: true,
        data,
      });
    })
    .catch((error) => {
      res.status(500).json({
        success: false,
        message: "Failed to retrieve College Profile",
        error: error,
      });
    });
};

exports.getSingleCollegeProfile = (req, res) => {
  try {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      return res.status(400).json({
        success: false,
        message: errors.array()[0].msg,
      });
    }

    collegeprofile
      .findOne({
        attributes: [
          "id",
          "institute_choice_code",
          "institute_name",
          "institute_state",
          "institute_district",
          "institute_taluka",
        ],
        where: {
          id: req.body.id,
        },
      })
      .then((data) => {
        if (data) {
          data = JSON.stringify(data);
          data = JSON.parse(data);

          res.status(200).json({
            success: true,
            data,
          });
        } else {
          res.status(404).json({
            success: false,
            message: "College Profile not found",
          });
        }
      })
      .catch((error) => {
        res.status(500).json({
          success: false,
          message: "Failed to get College Profile",
          error: error,
        });
      });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "An error occurred while processing the request",
      error: error,
    });
  }
};

exports.addCollegeProfile = (req, res) => {
  try {
    const {
      institute_choice_code,
      institute_name,
      institute_state,
      institute_district,
      institute_taluka,
    } = req.body.data;

    console.log(
      institute_choice_code,
      institute_name,
      institute_state,
      institute_district,
      institute_taluka
    );

    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      return res.status(400).json({
        success: false,
        message: errors.array()[0].msg,
      });
    }

    collegeprofile
      .create({
        institute_choice_code,
        institute_name,
        institute_state,
        institute_district,
        institute_taluka,
      })
      .then((data) => {
        return res.status(200).json({
          message: "College Profile Creation successfull",
          success: true,
          data: {
            id: data.id,
            name: data.institute_name,
          },
        });
      })
      .catch((error) => {
        error.errors[0].instance = undefined;
        if (error.errors[0].type == "unique violation") {
          // 409 Conflict status code to indicate a conflict with the current state of the resource due to a unique constraint violation.
          return res.status(409).json({
            success: false,
            error: error.errors[0],
            message: "College Profile already exists",
          });
        } else {
          return res.status(400).json({
            success: false,
            error: error.errors[0],
            message: "something went wrong while signup!",
          });
        }
      });
  } catch (error) {
    return res.status(400).json({
      success: false,
      error,
      message: "something went wrong!",
    });
  }
};

exports.updateCollegeProfile = (req, res) => {
  try {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      return res.status(400).json({
        success: false,
        message: errors.array()[0].msg,
      });
    }

    const {
      institute_choice_code,
      institute_name,
      institute_state,
      institute_district,
      institute_taluka,
    } = req.body;
    // const body = req.body;
    collegeprofile
      .update(req.body, {
        where: {
          id: req.body.id,
          // institute_choice_code: req.body.institute_choice_code,
          // institute_name: req.body.institute_name,
          // institute_state: req.body.institute_state,
          // institute_district: req.body.institute_district,
          // institute_taluka: institute_taluka
        },
        // console.log("your body data", body);
      })
      .then((data) => {
        if (data[0]) {
          return res.status(200).json({
            success: true,
            message: "College Profile updated successfully",
          });
        } else {
          return res.status(404).json({
            success: false,
            message: "College Profile not found",
          });
        }
      })
      .catch((errors) => {
        return res.status(500).json({
          success: false,
          message: "Failed to update College Profile",
          errors,
        });
      });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "An error occurred while processing the request",
      error: error,
    });
  }
};

exports.deleteCollegeProfile = (req, res) => {
  try {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      return res.status(400).json({
        success: false,
        message: errors.array()[0].msg,
      });
    }

    collegeprofile
      .destroy({
        where: {
          id: req.body.id,
        },
      })
      .then((data) => {
        if (data) {
          return res.status(200).json({
            success: true,
            message: "College profile deleted successfully",
          });
        } else {
          return res.status(404).json({
            success: false,
            message: "College profile not found",
          });
        }
      })
      .catch((error) => {
        return res.status(500).json({
          success: false,
          message: "Failed to delete College profile",
          error: error,
        });
      });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "An error occurred while processing the request",
      error: error,
    });
  }
};

// get Qualification level Data for addding the college
exports.getQualificationlevel = (req, res) => {
  // res.send("Bhaiyajiiiiiii tesnion mat lo");
  console.log("your reqq data for course");
  QualificationLevel.findAll({
    attributes: ["qualification_name"],
  })
    .then((data) => {
      // console.log("your data req", data)
      // return
      data = JSON.stringify(data);
      data = JSON.parse(data);
      // console.log(data);
      res.json({
        success: true,
        data,
      });
    })
    .catch((error) => {
      res.status(500).json({
        success: false,
        message: "Failed to Marital Status list",
        error: error,
      });
    });
};

// get Stream Data for addding the college
exports.getStramlevel = (req, res) => {
  // res.send("Bhaiyajiiiiiii tesnion mat lo");
  // console.log("your reqq data for course");
  streamData
    .findAll({
      attributes: ["stream_name"],
    })
    .then((data) => {
      // console.log("your data req", data)
      // return
      data = JSON.stringify(data);
      data = JSON.parse(data);
      // console.log(data);
      res.json({
        success: true,
        data,
      });
    })
    .catch((error) => {
      res.status(500).json({
        success: false,
        message: "Failed to Marital Status list",
        error: error,
      });
    });
};

// exports.deleteUsers = (req, res) => {
//   try {
//     const errors = validationResult(req);

//     if (!errors.isEmpty()) {
//       return res.status(400).json({
//         success: false,
//         message: errors.array()[0].msg,
//       });
//     }

//     User.destroy({
//       where: {
//         id: {
//           [Op.in]: req.body.Ids,
//         },
//       },
//     })
//       .then((data) => {
//         if (data) {
//           return res.status(200).json({
//             success: true,
//             message: "Users deleted successfully",
//           });
//         } else {
//           return res.status(404).json({
//             success: false,
//             message: "Users not found",
//           });
//         }
//       })
//       .catch((error) => {
//         return res.status(500).json({
//           success: false,
//           message: "Failed to delete users",
//           error: error,
//         });
//       });
//   } catch (error) {
//     return res.status(500).json({
//       success: false,
//       message: "An error occurred while processing the request",
//       error: error,
//     });
//   }
// };

//

// exports.getAllUsersByRole = (req, res) => {
//   try {
//     const { role } = req.body;

//     const errors = validationResult(req);

//     if (!errors.isEmpty()) {
//       return res.status(400).json({
//         success: false,
//         message: errors.array()[0].msg,
//       });
//     }

//     if (role == ROLES.ADMIN) {
//       return res.json({
//         success: false,
//         message: "Role not allowed!",
//       });
//     }

//     User.findAll({
//       attributes: ["id", "username", "role", "createdAt", "updatedAt"],
//       where: {
//         role,
//       },
//     })
//       .then((data) => {
//         data = JSON.stringify(data);
//         data = JSON.parse(data);

//         res.json({
//           success: true,
//           data,
//           count: data.length,
//         });
//       })
//       .catch((error) => {
//         res.status(500).json({
//           success: false,
//           message: "Failed to retrieve users",
//           error: error,
//         });
//       });
//   } catch (error) {
//     return res.status(500).json({
//       success: false,
//       message: "An error occurred while processing the request",
//       error: error,
//     });
//   }
// };

// exports.getUserCountByRole = (req, res) => {
//   try {
//     User.count({
//       group: "role",
//       attributes: ["role"],
//     })
//       .then((data) => {
//         data = JSON.stringify(data);
//         data = JSON.parse(data);
//         let totalCount = 0;
//         data.map((item) => {
//           totalCount += item.count;
//         });

//         return res.json({
//           success: true,
//           data,
//           totalCount: totalCount,
//         });
//       })
//       .catch((error) => {
//         return res.status(500).json({
//           success: false,
//           message: "Failed to get user count",
//           error: error,
//         });
//       });
//   } catch (error) {
//     return res.status(500).json({
//       success: false,
//       message: "An error occurred while processing the request",
//       error: error,
//     });
//   }
// };

// exports.getrecentUsers = (req, res) => {
//   try {
//     User.findAll({
//       order: [
//         // Will escape title and validate DESC against a list of valid direction parameters
//         ["id", "DESC"],
//       ],
//       limit: 5,
//       attributes: ["id", "username", "role", "createdAt", "updatedAt"],
//       where: {
//         role: {
//           [Op.ne]: ROLES.ADMIN,
//         },
//       },
//     })
//       .then((data) => {
//         data = JSON.stringify(data);
//         data = JSON.parse(data);

//         res.json({
//           success: true,
//           data,
//           count: data.length,
//         });
//       })
//       .catch((error) => {
//         res.status(500).json({
//           success: false,
//           message: "Failed to retrieve users",
//           error: error,
//         });
//       });
//   } catch (error) {
//     return res.status(500).json({
//       success: false,
//       message: "An error occurred while processing the request",
//       error: error,
//     });
//   }
// };

exports.addQualification_Stream = async (req, res) => {
  try {
    const { college_id, qualification_name, stream_name } = req.body.data;

    // console.log(college_id, qualification_name, stream_name);
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      return res.status(400).json({
        success: false,
        message: errors.array()[0].msg,
      });
    }

    // Check if data already exists
    const existingStream = await MahadbtCollegeStream.findOne({
      where: {
        college_id,
        qualification_name,
        stream_name,
      },
    });

    if (existingStream) {
      return res.status(409).json({
        success: false,
        message: "Qualification & Stream already exists",
      });
    }

    // If data doesn't exist, create a new stream
    const createdStream = await MahadbtCollegeStream.create({
      college_id,
      qualification_name,
      stream_name,
    });

    return res.status(200).json({
      message: "Added Qualification & Stream Successfully!",
      success: true,
      data: {
        id: createdStream.id,
        // name: createdStream.institute_name,
      },
    });
  } catch (error) {
    console.log("error is", error);
    return res.status(500).json({
      success: false,
      error: error.message,
      message: "Something went wrong!",
    });
  }
};

exports.updateQualification_Stream = (req, res) => {
  try {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      return res.status(400).json({
        success: false,
        message: errors.array()[0].msg,
      });
    }

    const { college_id, qualification_name, stream_name } = req.body;
    // const body = req.body;
    const data = {
      qualification_name,
      stream_name,
    };
    MahadbtCollegeStream.update(data, {
      where: {
        college_id: college_id,
      },
    })
      .then((data) => {
        if (data) {
          return res.status(200).json({
            success: true,
            message: "Qualification Info updated successfully",
          });
        } else {
          return res.status(404).json({
            success: false,
            message: "Qualification Info not found",
          });
        }
      })
      .catch((errors) => {
        return res.status(500).json({
          success: false,
          message: "Failed to update Qualification Info",
          errors,
        });
      });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "An error occurred while processing the request",
      error: error,
    });
  }
};

// deleting the single  college qualification info by passing id in mahadbt_college_streams eg id = 3
exports.deleteQualification_Stream = async (req, res) => {
  try {
    const { id } = req.body; // Assuming ID is passed in the request body

    // Find the stream by its ID
    const stream = await MahadbtCollegeStream.findByPk(id);

    // Check if the stream exists
    if (!stream) {
      return res.status(404).json({
        success: false,
        message: "Stream not found",
      });
    }

    // Delete the stream
    await stream.destroy();

    return res.status(200).json({
      success: true,
      message: "Stream deleted successfully",
    });
  } catch (error) {
    console.log("Error:", error);
    return res.status(500).json({
      success: false,
      error: error.message,
      message: "Something went wrong while deleting the stream",
    });
  }
};

exports.getQualificationInfoByCollegeId = async (req, res) => {
  try {
    // const { college_id } = req.body; // Assuming college ID is passed in the request body

    // Fetch qualification streams by college ID
    const qualificationStreams = await MahadbtCollegeStream.findAll({
      attributes: ["id", "college_id", "qualification_name", "stream_name"],
      // where: {
      //   college_id: college_id,
      // },
    });

    // Check if any qualification streams were found
    if (qualificationStreams.length === 0) {
      return res.status(404).json({
        success: false,
        message:
          "No qualification information found for the specified college ID",
      });
    }

    // Qualification streams found, return them
    return res.status(200).json({
      success: true,
      message: "Qualification information retrieved successfully",
      data: qualificationStreams,
    });
  } catch (error) {
    console.log("Error:", error);
    return res.status(500).json({
      success: false,
      error: error.message,
      message: "Something went wrong while fetching qualification information",
    });
  }
};

// exports.getAllQualification_Stream = (req, res) => {

//   MahadbtCollegeStream.findAll({
//     attributes: ["college_id", "qualification_name", "stream_name"],
//     where: {
//       id : req.body.college_id
//     },
//   })
//     .then((data) => {
//       console.log("your data req", data);
//       data = JSON.stringify(data);
//       data = JSON.parse(data);
//       res.json({
//         success: true,
//         data,
//       });
//     })
//     .catch((error) => {
//       res.status(500).json({
//         success: false,
//         message: "Failed to retrieve College Qualification Info",
//         error: error,
//       });
//     });
// };

//   try {
//     const errors = validationResult(req);

//     if (!errors.isEmpty()) {
//       return res.status(400).json({
//         success: false,
//         message: errors.array()[0].msg,
//       });
//     }

//     MahadbtCollegeStream.destroy({
//       where: {
//         id: {
//           [Op.in]: req.body.Ids,
//         },
//       },
//     })
//       .then((data) => {
//         if (data) {
//           return res.status(200).json({
//             success: true,
//             message: "Qulification Info deleted successfully",
//           });
//         } else {
//           return res.status(404).json({
//             success: false,
//             message: "Qulification Info not found",
//           });
//         }
//       })
//       .catch((error) => {
//         return res.status(500).json({
//           success: false,
//           message: "Failed to delete Qulification Info",
//           error: error,
//         });
//       });
//   } catch (error) {
//     return res.status(500).json({
//       success: false,
//       message: "An error occurred while processing the request",
//       error: error,
//     });
//   }
// };

const pass_encryptor = (plainPassword, salt) => {
  return createHmac("sha256", salt).update(plainPassword).digest("hex");
};
