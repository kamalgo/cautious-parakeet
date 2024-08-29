import React, { useContext, useEffect, useState } from "react";
import { formContext } from "../FormDashboard";
import {
  Box,
  Button,
  FormControl,
  FormLabel,
  Input,
  Select,
  Tag,
  TagCloseButton,
  TagLabel,
  VStack,
  useToast,
} from "@chakra-ui/react";
import {
  getcurrentcourseInfoApi,
  submitFormDataApi,
  submitFormDataForAdmissionUploadDocumentApi,
} from "../../../api/FormApi/FormApi";
import { getOTPSecret } from "../../../helpers/AuthHelpers";
import {
  getQualificationLevelListApi,
  getYearOfStudylListApi,
} from "../../../api/FormApi/FormDropdownApi";
import { InboxOutlined } from "@ant-design/icons";

function FormFour() {
  const [admissionDocFile, setAdmissionDocFile] = useState([]);
  const [feesDocFile, setFeesDocFile] = useState([]);
  const [buttonLoading, setButtonLoading] = useState(false);

  const [stateOfAdmissionType, setStateOfAdmissionType] = useState(false);

  const [formData, setFormData] = useState({});
  const [qualificationLevelList, setQualificationLevelList] = useState([]);
  const [yearOfStudylList, setYearOfStudylList] = useState([]);
  const toast = useToast();

  const listForAdmissionType = [
    "Through CAP/Govt. Quota",
    "Through TFWS",
    "Through Spot Admission/Institute Level",
    "Through Management Quota",
    "Through CLAT",
  ];

  const handleAdmissionUpload = (event) => {
    // console.log("event from", event);
    setAdmissionDocFile(Object.entries(event.target.files));
  };

  const handleFeesUpload = (event) => {
    // console.log("event from caste", event);
    setFeesDocFile(Object.entries(event.target.files));
  };

  const uploadAdmissionDocument = () => {
    console.log("uploadAdmissionDocument");

    const formDataMain = new FormData();

    const data = { id: formData.id };

    for (const key in data) {
      formDataMain.append(key, data[key]);
    }

    admissionDocFile.map((item, index) => {
      // test.push(item);
      console.log("item-addmissiondocumet", item);
      formDataMain.append(`admissiondocument`, item[1]);
    });

    submitFormDataForAdmissionUploadDocumentApi(formDataMain)
      .then((res) => {
        console.log("res", res);
        if (res.success) {
          // onClose();
          // getAllColleges();
          toast({
            title: "Admission Document uploaded.",
            description: res.message,
            status: "success",
            duration: 9000,
            isClosable: true,
            position: "top-right",
          });
          setAdmissionDocFile([]);
          // setDisplayCasteLink(res.url);
          // setFormData({ ...formData, casteDoc: res.url });
        } else {
          // onClose();
          toast({
            title: "Operation failed!",
            description: res.message,
            status: "error",
            duration: 9000,
            isClosable: true,
            position: "top-right",
          });
        }
      })
      .catch((error) => {
        toast({
          title: "Error",
          description: "Operation Failed!",
          status: "error",
          duration: 9000,
          isClosable: true,
          position: "top-right",
        });

        console.error(error);
      });
  };

  const uploadFeesAdmissionBonafideDocument = () => {
    console.log("uploadFeesAdmissionBonafideDocument");

    const formDataMain = new FormData();

    const data = { id: formData.id };

    for (const key in data) {
      formDataMain.append(key, data[key]);
    }

    feesDocFile.map((item, index) => {
      // test.push(item);
      console.log("item-feesAdmissionBonafideDocument", item);
      formDataMain.append(`feesAdmissionbonafidedocument`, item[1]);
    });

    // submitFormDataForCasteUploadDocumentApi(formDataMain)
    //   .then((res) => {
    //     console.log("res", res);
    //     if (res.success) {
    //       // onClose();
    //       // getAllColleges();
    //       toast({
    //         title: "Caste Document uploaded.",
    //         description: res.message,
    //         status: "success",
    //         duration: 9000,
    //         isClosable: true,
    //         position: "top-right",
    //       });
    //       // setDisplayCasteLink(res.url);
    //       // setFormData({ ...formData, casteDoc: res.url });
    //     } else {
    //       // onClose();
    //       toast({
    //         title: "Operation failed!",
    //         description: res.message,
    //         status: "error",
    //         duration: 9000,
    //         isClosable: true,
    //         position: "top-right",
    //       });
    //     }
    //   })
    //   .catch((error) => {
    //     toast({
    //       title: "Error",
    //       description: "Operation Failed!",
    //       status: "error",
    //       duration: 9000,
    //       isClosable: true,
    //       position: "top-right",
    //     });

    //     console.error(error);
    //   });
  };

  const handleChange = (param) => (event) => {
    setFormData({ ...formData, [param]: event.target.value });
  };

  const handleChangeAdmissionTypeDropDown = (param) => (event) => {
    const newValue = event.target.value;
    const isAdmissionTypeSelected =
      newValue === "Through CAP/Govt. Quota" || newValue === "Through CLAT";
    setStateOfAdmissionType(isAdmissionTypeSelected);
    setFormData({ ...formData, [param]: newValue });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    // console.log("formData", formData);
    const data = {
      id: formData.id,
      admissionYear: formData.admissionYear,
      instituteState: formData.instituteState,
      instituteDistrict: formData.instituteDistrict,
      instituteTaluka: formData.instituteTaluka,
      qualificationLevel: formData.qualificationLevel,
      courseStream: formData.courseStream,
      instituteName: formData.instituteName,
      coursename: formData.coursename,
      admissionType: formData.admissionType,
      cetPercentAge: formData.cetPercentAge,
      admissionApplicationId: formData.admissionApplicationId,
      admissionLetterDoc: formData.admissionLetterDoc,
      currentYear: formData.currentYear,
      isCompletedPursuing: formData.isCompletedPursuing,
      admissionDate: formData.admissionDate,
      feesPaid: formData.feesPaid,
      feeReceiptDoc: formData.feeReceiptDoc,
      admissionCategory: formData.admissionCategory,
      modeStudy: formData.modeStudy,
    };

    console.log("data", data);

    submitFormDataApi(data)
      .then((res) => {
        if (res.success) {
          toast({
            title: "OtherInfo Details Updated.",
            description: res.message,
            status: "success",
            duration: 9000,
            isClosable: true,
            position: "top-right",
          });
        } else {
          // onClose();
          toast({
            title: "Operation failed!",
            description: res.message,
            status: "error",
            duration: 9000,
            isClosable: true,
            position: "top-right",
          });
        }
      })
      .catch((error) => {
        toast({
          title: "Error",
          description: "Operation Failed!",
          status: "error",
          duration: 9000,
          isClosable: true,
          position: "top-right",
        });

        console.error(error);
      });
  };

  const getcurrentcourseInfo = () => {
    const studentMail = getOTPSecret().to;
    const data = {
      email: studentMail,
    };
    getcurrentcourseInfoApi(data)
      .then((res) => {
        console.log("res -- getcurrentcourseInfo", res.data[0]);
        setFormData(res.data[0]);
      })
      .catch((error) => {
        console.error(error);
      });
  };

  const getQualificationLevelListData = () => {
    getQualificationLevelListApi()
      .then((res) => {
        // console.log("res getQualificationLevelListApi", res);
        setQualificationLevelList(res.data);
      })
      .catch((error) => {
        console.error(error);
      });
  };

  const getYearOfStudylListData = () => {
    getYearOfStudylListApi()
      .then((res) => {
        // console.log("res getYearOfStudylListApi", res);
        setYearOfStudylList(res.data);
      })
      .catch((error) => {
        console.error(error);
      });
  };

  const removeAdmissionDoc = (index) => {
    let temp = [...admissionDocFile];
    temp.splice(index, 1);
    setAdmissionDocFile(temp || []);
  };

  const removeFeesDoc = (index) => {
    let temp = [...feesDocFile];
    temp.splice(index, 1);
    setFeesDocFile(temp || []);
  };

  useEffect(() => {
    getcurrentcourseInfo();
    getQualificationLevelListData();
    getYearOfStudylListData();
  }, []);

  return (
    <>
      <form onSubmit={handleSubmit}>
        <Box maxW="md" mx="auto" mt="8">
          <VStack spacing="4">
            <FormControl id="id" display={"none"}>
              <FormLabel>id</FormLabel>
              <Input
                type="text"
                placeholder="Enter your id"
                value={formData.id}
                onChange={handleChange("id")}
              />
            </FormControl>
            <FormControl id="admissionYear">
              <FormLabel>Admission Year In Current Course</FormLabel>
              <Input
                type="text"
                placeholder="Admission Year In Current Course"
                value={formData.admissionYear}
                onChange={handleChange("admissionYear")}
              />
            </FormControl>
            {/* <FormControl id="admissionYear">
              <FormLabel>Admission Year In Current Course</FormLabel>
              <Select
                placeholder="Select your Admission Year In Current Course"
                value={formData.admissionYear}
                onChange={handleChange("admissionYear")}
              >
                {sscAdmissionYear?.map((status, index) => (
                  <option key={index} value={status.year}>
                    {status.year}
                  </option>
                ))}
              </Select>
            </FormControl> */}

            <FormControl id="instituteState">
              <FormLabel>Institute State</FormLabel>
              <Input
                type="text"
                placeholder="Institute State"
                value={formData.instituteState}
                onChange={handleChange("instituteState")}
              />
            </FormControl>

            <FormControl id="instituteDistrict">
              <FormLabel>Institute District</FormLabel>
              <Input
                type="text"
                placeholder="Institute District"
                value={formData.instituteDistrict}
                onChange={handleChange("instituteDistrict")}
              />
            </FormControl>

            <FormControl id="instituteTaluka">
              <FormLabel>Institute Taluka</FormLabel>
              <Input
                type="text"
                placeholder="Institute Taluka"
                value={formData.instituteTaluka}
                onChange={handleChange("instituteTaluka")}
              />
            </FormControl>

            {/* <FormControl id="qualificationLevel">
              <FormLabel>Qualification Level</FormLabel>
              <Input
                type="text"
                placeholder="Qualification Level"
                value={formData.qualificationLevel}
                onChange={handleChange("qualificationLevel")}
              />
            </FormControl> */}
            <FormControl id="qualificationLevel">
              <FormLabel>Qualification Level</FormLabel>
              <Select
                placeholder="Select your Qualification Level"
                value={formData.qualificationLevel}
                onChange={handleChange("qualificationLevel")}
              >
                {qualificationLevelList?.map((status, index) => (
                  <option key={index} value={status.qualification_name}>
                    {status.qualification_name}
                  </option>
                ))}
              </Select>
            </FormControl>

            <FormControl id="courseStream">
              <FormLabel>Course Stream</FormLabel>
              <Input
                type="text"
                placeholder="Course Stream"
                value={formData.courseStream}
                onChange={handleChange("courseStream")}
              />
            </FormControl>

            <FormControl id="instituteName">
              <FormLabel>Institute Name</FormLabel>
              <Input
                type="text"
                placeholder="institute Name"
                value={formData.instituteName}
                onChange={handleChange("instituteName")}
              />
            </FormControl>

            <FormControl id="coursename">
              <FormLabel>Course name</FormLabel>
              <Input
                type="text"
                placeholder="Course name"
                value={formData.coursename}
                onChange={handleChange("coursename")}
              />
            </FormControl>

            {/* <FormControl id="admissionType">
              <FormLabel>Admission Type</FormLabel>
              <Input
                type="text"
                placeholder="Enter Your Admission Type"
                value={formData.admissionType}
                onChange={handleChangeAdmissionTypeDropDown("admissionType")}
              />
            </FormControl> */}
            <FormControl id="admissionType">
              <FormLabel>Admission Type</FormLabel>

              <Select
                placeholder="Select your Admission Type"
                value={formData.admissionType}
                onChange={handleChangeAdmissionTypeDropDown("admissionType")}
              >
                {listForAdmissionType?.map((status, index) => {
                  // console.log("status", status);
                  return (
                    <option key={index} value={status}>
                      {status}
                    </option>
                  );
                })}
              </Select>
            </FormControl>
            {stateOfAdmissionType && (
              <>
                <FormControl id="cetPercentAge">
                  <FormLabel>CET / JEE Percentage</FormLabel>
                  <Input
                    type="text"
                    placeholder="Cet Percentage"
                    value={formData.cetPercentAge}
                    onChange={handleChange("cetPercentAge")}
                  />
                </FormControl>

                <FormControl id="admissionApplicationId">
                  <FormLabel>
                    Application Admission ID/CAP ID/CLAT Admit Card No
                  </FormLabel>
                  <Input
                    type="text"
                    placeholder="Admission Application Id"
                    value={formData.admissionApplicationId}
                    onChange={handleChange("admissionApplicationId")}
                  />
                </FormControl>

                {/* <FormControl id="admissionLetterDoc">
                  <FormLabel>Admission Letter Doc</FormLabel>
                  <Input
                    type="text"
                    placeholder="Admission Letter Doc"
                    value={formData.admissionLetterDoc}
                    onChange={handleChange("admissionLetterDoc")}
                  />
                </FormControl> */}
                <FormControl id="admissionLetterDoc">
                  <FormLabel>Admission Letter Doc</FormLabel>
                  <label htmlFor="formIdAdmission">
                    <Box
                      padding={1}
                      display={"flex"}
                      justifyItems={"center"}
                      borderRadius={6}
                      alignItems={"center"}
                      marginBottom={4}
                      justifyContent={"center"}
                    >
                      <Input
                        type="file"
                        accept="*"
                        onChange={handleAdmissionUpload}
                        placeholder="0 file selected"
                        // required
                        name="admissiondocument"
                        id="formIdAdmission"
                        marginLeft={2}
                        hidden
                        // isDisabled={buttonLoading}
                      />

                      <Box
                        border="2px dashed #ccc"
                        textAlign="center"
                        padding="10"
                        borderRadius="md"
                        marginBottom="4"
                        cursor="pointer"
                        onDrop={(e) => {
                          e.preventDefault();
                          e.stopPropagation();
                          handleAdmissionUpload(e);
                        }}
                        onDragOver={(e) => {
                          e.preventDefault();
                          e.stopPropagation();
                        }}
                      >
                        <InboxOutlined
                          style={{ fontSize: "36px", color: "#ccc" }}
                        />
                        <p style={{ fontSize: "17px" }}>
                          {admissionDocFile.length == 0 ? (
                            <p style={{ color: "blue" }}>
                              Click here to select your zip file{" "}
                              {formData && formData?.casteDoc}
                            </p>
                          ) : (
                            <p style={{ color: "green" }}>
                              Click on Upload button to upload selected file
                            </p>
                          )}
                        </p>
                      </Box>
                    </Box>
                  </label>
                  <div
                    style={{
                      display: "flex",
                      justifyContent: "center",
                      padding: 5,
                    }}
                  >
                    {admissionDocFile &&
                      admissionDocFile.map((item, index) => {
                        return (
                          <Tag
                            size={"sm"}
                            key={index}
                            borderRadius="full"
                            variant="solid"
                            colorScheme="green"
                            mr={2}
                            mt={2}
                          >
                            <TagLabel>{item[1]?.name}</TagLabel>
                            {!buttonLoading && (
                              <TagCloseButton
                                onClick={() => removeAdmissionDoc(index)}
                              />
                            )}
                          </Tag>
                        );
                      })}
                    <Button onClick={() => uploadAdmissionDocument()}>
                      Save
                    </Button>
                  </div>
                </FormControl>
              </>
            )}

            {/* <FormControl id="currentYear">
              <FormLabel>Year Of Study</FormLabel>
              <Input
                type="text"
                placeholder="current Year"
                value={formData.currentYear}
                onChange={handleChange("currentYear")}
              />
            </FormControl> */}
            <FormControl id="currentYear">
              <FormLabel>Year Of Study</FormLabel>
              <Select
                placeholder="Select your Year Of Study"
                value={formData.currentYear}
                onChange={handleChange("currentYear")}
              >
                {yearOfStudylList?.map((status, index) => (
                  <option key={index} value={status.year}>
                    {status.year}
                  </option>
                ))}
              </Select>
            </FormControl>

            <FormControl id="isCompletedPursuing">
              <FormLabel>Year Of Study Completed Or Pursuing</FormLabel>
              <Input
                type="text"
                placeholder="Enter Your Year Of Study Completed Or Pursuing"
                value={formData.isCompletedPursuing}
                onChange={handleChange("isCompletedPursuing")}
              />
            </FormControl>

            <FormControl id="admissionDate">
              <FormLabel>Admission Date</FormLabel>
              <Input
                type="text"
                placeholder="Admission Date"
                value={formData.admissionDate}
                onChange={handleChange("admissionDate")}
              />
            </FormControl>

            <FormControl id="feesPaid">
              <FormLabel>Fees Paid</FormLabel>
              <Input
                type="text"
                placeholder="fees Paid"
                value={formData.feesPaid}
                onChange={handleChange("feesPaid")}
              />
            </FormControl>

            {/* <FormControl id="feeReceiptDoc">
              <FormLabel>
                Upload Fees/Admission Receipt/bonafide certificate
              </FormLabel>
              <Input
                type="text"
                placeholder="Upload Fees/Admission Receipt/bonafide certificate"
                value={formData.feeReceiptDoc}
                onChange={handleChange("feeReceiptDoc")}
              />
            </FormControl> */}
            <FormControl id="feeReceiptDoc">
              <FormLabel>
                Upload Fees/Admission Receipt/bonafide certificate
              </FormLabel>
              <label htmlFor="formIdFeesAdmissionBonafide">
                <Box
                  padding={1}
                  display={"flex"}
                  justifyItems={"center"}
                  borderRadius={6}
                  alignItems={"center"}
                  marginBottom={4}
                  justifyContent={"center"}
                >
                  <Input
                    type="file"
                    accept="*"
                    onChange={handleFeesUpload}
                    placeholder="0 file selected"
                    // required
                    name="feesdocument"
                    id="formIdFeesAdmissionBonafide"
                    marginLeft={2}
                    hidden
                    // isDisabled={buttonLoading}
                  />

                  <Box
                    border="2px dashed #ccc"
                    textAlign="center"
                    padding="10"
                    borderRadius="md"
                    marginBottom="4"
                    cursor="pointer"
                    onDrop={(e) => {
                      e.preventDefault();
                      e.stopPropagation();
                      handleFeesUpload(e);
                    }}
                    onDragOver={(e) => {
                      e.preventDefault();
                      e.stopPropagation();
                    }}
                  >
                    <InboxOutlined
                      style={{ fontSize: "36px", color: "#ccc" }}
                    />
                    <p style={{ fontSize: "17px" }}>
                      {feesDocFile.length == 0 ? (
                        <p style={{ color: "blue" }}>
                          Click here to select your zip file{" "}
                        </p>
                      ) : (
                        <p style={{ color: "green" }}>
                          Click on Upload button to upload selected file
                        </p>
                      )}
                    </p>
                  </Box>
                </Box>
              </label>
              <div
                style={{
                  display: "flex",
                  justifyContent: "center",
                  padding: 5,
                }}
              >
                {feesDocFile &&
                  feesDocFile.map((item, index) => {
                    return (
                      <Tag
                        size={"sm"}
                        key={index}
                        borderRadius="full"
                        variant="solid"
                        colorScheme="green"
                        mr={2}
                        mt={2}
                      >
                        <TagLabel>{item[1]?.name}</TagLabel>
                        {!buttonLoading && (
                          <TagCloseButton
                            onClick={() => removeFeesDoc(index)}
                          />
                        )}
                      </Tag>
                    );
                  })}
                <Button onClick={() => uploadFeesAdmissionBonafideDocument()}>
                  Save
                </Button>
              </div>
            </FormControl>

            <FormControl id="admissionCategory">
              <FormLabel>
                Is Admission Through Open Or Reserved Category ?
              </FormLabel>
              <Input
                type="text"
                placeholder="Is Admission Through Open Or Reserved Category ?"
                value={formData.admissionCategory}
                onChange={handleChange("admissionCategory")}
              />
            </FormControl>

            <FormControl id="modeStudy">
              <FormLabel>Mode Of Study</FormLabel>
              <Input
                type="text"
                placeholder="Mode Of Study"
                value={formData.modeStudy}
                onChange={handleChange("modeStudy")}
              />
            </FormControl>
          </VStack>
          <Button
            color="text.light"
            type="submit"
            bg="primary.main"
            variant={"outline"}
            mt={2}
          >
            Submit
          </Button>
        </Box>
      </form>
    </>
  );
}

export default FormFour;
