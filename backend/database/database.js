const sequelize = require("./connection");
const User = require("../models/usersModel");
const collegeprofile = require("../models/collegeModel");
const Mahadbtprofiles = require("../models/mahadbtModel");
const ExcelInfo = require("../models/testExcelModel");
const dummyModel = require("../models/dummyExcelModel");
const courseData = require("../models/courseModel");
const streamData = require("../models/streamModel");
const QualificationLevel = require("../models/qaulfification-levelModel");
const MahadbtCourseName = require("../models/mahadbtCourseNameModel");
const MahadbtCollegeStream = require("../models/mahadbtCollegeStreamModel");
const MahadbtQualificationLevel = require("../models/MahadbtQualificationLevelModel");
const MahadbtMaritalStatus = require("../models/MahadbtMaritalStatusModel");
const MahadbtReligion = require("../models/mahadbtReligionModel.js");
const MahadbtCasteCatogory = require("../models/mahadbtCasteCatogory");
const MdbtDisabilityType = require("../models/mahadbtDisabilityTypeModel");
const MdbtWithDisabilityType = require("../models/mahdbtWithDisabilityModel");
const MahadbtOccupation = require("../models/mahadbtOccupationModel");
const MahadbtHostelTypes = require("../models/MahadbtHostelTypeModel");
const YearOfStudy = require("../models/yearOfStudy");
const admissionYear = require("../models/admissionYearModel");
const examMonth = require("../models/examMonth");
const MahadbtSubCaste = require("../models/mahadbtSubCaste.js");

User.sync({
  alter: false,
});

collegeprofile.sync({
  alter: false,
});

Mahadbtprofiles.sync({
  alter: false,
});

ExcelInfo.sync({
  alter: false,
});

dummyModel.sync({
  alter: false,
});

courseData.sync({
  alter: false,
});

streamData.sync({
  alter: false,
});

QualificationLevel.sync({
  alter: false,
});

MahadbtCourseName.sync({
  alter: false,
});

MahadbtCollegeStream.sync({
  alter: false,
});

MahadbtQualificationLevel.sync({
  alter: false,
});

MahadbtMaritalStatus.sync({
  alter: false,
});

MahadbtReligion.sync({
  alter: false,
});

MahadbtCasteCatogory.sync({
  alter: false,
});

MdbtDisabilityType.sync({
  alter: false,
});

MdbtWithDisabilityType.sync({
  alter: false,
});

MahadbtOccupation.sync({
  alter: false,
});

MahadbtHostelTypes.sync({
  alter: false,
});

YearOfStudy.sync({
  alter: false,
});

admissionYear.sync({
  alter: false,
});

examMonth.sync({
  alter: false,
});

MahadbtSubCaste.sync({
  alter: false
})

module.exports = {
  sequelize,
  User,
  collegeprofile,
  dummyModel,
  courseData,
  streamData,
  QualificationLevel,
};
