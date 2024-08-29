const MahadbtMaritalStatus = require("../models/MahadbtMaritalStatusModel");
const MahadbtReligion = require("../models/mahadbtReligionModel");
const MahadbtCasteCatogory = require("../models/mahadbtCasteCatogory");
const MadbtDisabilityType = require("../models/mahadbtDisabilityTypeModel");
const MadbtWithDisabilityType = require("../models/mahdbtWithDisabilityModel");
const MahadbtOccupation = require("../models/mahadbtOccupationModel");
const MahadbtHostelTypes = require("../models/MahadbtHostelTypeModel");
const QualificationLevel = require("../models/qaulfification-levelModel");
const yearofstudy = require("../models/yearOfStudy");
const admissionYear = require("../models/admissionYearModel");
const examMonth = require("../models/examMonth");

const dotenv = require("dotenv");

dotenv.config();

// Drop down for Marital Status
exports.getListOfMaritalStatus = (req, res) => {
  // res.send("Bhaiyajiiiiiii tesnion mat lo");
  // console.log("your reqq data for course");
  MahadbtMaritalStatus.findAll()
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

// Drop down for Religion List
exports.getListOfReligions = (req, res) => {
  // res.send("Bhaiyajiiiiiii tesnion mat lo");
  // console.log("your reqq data for course");
  MahadbtReligion.findAll()
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

// Drop down for Caste Catogory List
exports.getListOfCasteCatogory = (req, res) => {
  // res.send("Bhaiyajiiiiiii tesnion mat lo");
  // console.log("your reqq data for course");
  MahadbtCasteCatogory.findAll()
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

// Drop down for Disability type List
exports.getListdisabilitytype = (req, res) => {
  // res.send("Bhaiyajiiiiiii tesnion mat lo");
  // console.log("your reqq data for course");
  MadbtDisabilityType.findAll()
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

// Drop down for Disability with type List
exports.getListdisabilitywithtype = (req, res) => {
  // res.send("Bhaiyajiiiiiii tesnion mat lo");
  // console.log("your reqq data for course");
  MadbtWithDisabilityType.findAll()
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

// Drop down for Occuption List
exports.getListofOccupation = (req, res) => {
  // res.send("Bhaiyajiiiiiii tesnion mat lo");
  // console.log("your reqq data for course");
  MahadbtOccupation.findAll()
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

// Drop down for Hostel Type List
exports.getListofHostelType = (req, res) => {
  // res.send("Bhaiyajiiiiiii tesnion mat lo");
  // console.log("your reqq data for course");
  MahadbtHostelTypes.findAll()
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

// Drop down for Qualification Level List
exports.getListofQualificationLevel = (req, res) => {
  // res.send("Bhaiyajiiiiiii tesnion mat lo");
  // console.log("your reqq data for course");
  QualificationLevel.findAll()
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

// Drop down for year of study List
exports.getListofyearOfStudy = (req, res) => {
  // res.send("Bhaiyajiiiiiii tesnion mat lo");
  // console.log("your reqq data for course");
  yearofstudy
    .findAll()
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

// Drop down for SSC Admission year
exports.getListofSSCadmissionYear = (req, res) => {
  // res.send("Bhaiyajiiiiiii tesnion mat lo");
  // console.log("your reqq data for course");
  admissionYear
    .findAll()
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

// Drop down for HSC Admission year
exports.getListofHSCadmissionYear = (req, res) => {
  // res.send("Bhaiyajiiiiiii tesnion mat lo");
  // console.log("your reqq data for course");
  admissionYear
    .findAll()
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

// Drop down for SSC Exam month
exports.getSSCExamMonth = (req, res) => {
  // res.send("Bhaiyajiiiiiii tesnion mat lo");
  // console.log("your reqq data for course");
  examMonth
    .findAll()
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

// Drop down for HSC Exam month
exports.getHSCExamMonth = (req, res) => {
  // res.send("Bhaiyajiiiiiii tesnion mat lo");
  console.log("your reqq data for course");
  examMonth
    .findAll()
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
