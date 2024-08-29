import React, { useContext, useEffect, useState } from "react";
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
  Text,
  VStack,
} from "@chakra-ui/react";
import { useToast } from "@chakra-ui/react";
import { SingleDatepicker } from "chakra-dayzed-datepicker";
import { parseISO, set } from "date-fns";
import { InboxOutlined } from "@ant-design/icons";

import {
  getPersonalInfoApi,
  submitFormDataApi,
  submitFormDataForCasteUploadDocumentApi,
  submitFormDataForDisabilityUploadDocumentApi,
  submitFormDataForDomacileUploadDocumentApi,
  submitFormDataForIncomeUploadDocumentApi,
} from "../../../api/FormApi/FormApi";
import { getOTPSecret } from "../../../helpers/AuthHelpers";
import {
  getCasteCatogoryListApi,
  getDisabilityTypeListApi,
  getDisabilityWithTypeListApi,
  getMaritalStatusApi,
  getReligionListApi,
} from "../../../api/FormApi/FormDropdownApi";

function FormOne() {
  const [videoFile, setVideoFile] = useState([]);
  const [incomeFile, setIncomeFile] = useState([]);
  const [domicileFile, setDomicile] = useState([]);
  const [DisabilityFile, setDisabilityFile] = useState([]);
  const [buttonLoading, setButtonLoading] = useState(false);
  // const [displayCasteLink, setDisplayCasteLink] = useState("");

  const doYouHaveCasteCertificateDropDown = ["Yes", "No"];
  const doYouHaveIncomeCertificateDropDown = ["Yes", "No"];
  const doYouHaveDomicileCertificateDropDown = ["Yes", "No"];
  const doYouHaveDisabilityDropDown = ["Yes", "No"];
  const doYouHaveDisabilityCertificateDropDown = ["Yes", "No"];

  const [stateOfCasteCertificate, setStateOfCasteCertificate] = useState(false);
  const [stateOfIncomeCertificate, setStateOfIncomeCertificate] =
    useState(false);
  const [stateOfDomicileCertificate, setStateOfDomicileCertificate] =
    useState(false);
  const [stateOfDisabilityCertificate, setStateOfDisabilityCertificate] =
    useState(false);
  const [formData, setFormData] = useState({});
  const [maritalStatus, setMaritalStatus] = useState([]);
  const [religionList, setReligionList] = useState([]);
  const [casteCategoryList, setCasteCategoryList] = useState([]);
  const [disabilityTypeList, setDisabilityTypeList] = useState([]);
  const [disabilityWithTypelist, setDisabilityWithTypelist] = useState([]);

  const toast = useToast();

  const handleChange = (param) => (event) => {
    setFormData({ ...formData, [param]: event.target.value });
  };

  const handleVideoUpload = (event) => {
    console.log("event from caste", event);
    setVideoFile(Object.entries(event.target.files));
  };

  const handleIncomeUpload = (event) => {
    console.log("event from income", event);
    setIncomeFile(Object.entries(event.target.files));
  };

  const handleDomicileUpload = (event) => {
    console.log("event from domicile", event);
    setDomicile(Object.entries(event.target.files));
  };

  const handleDisabilityUpload = (event) => {
    console.log("event from Disability", event);
    setDisabilityFile(Object.entries(event.target.files));
  };

  const uploadCasteDocument = () => {
    console.log("uploadCasteDocument");

    const formDataMain = new FormData();

    const data = { id: formData.id };

    for (const key in data) {
      formDataMain.append(key, data[key]);
    }

    videoFile.map((item, index) => {
      // test.push(item);
      console.log("item-caste", item);
      formDataMain.append(`video`, item[1]);
    });

    submitFormDataForCasteUploadDocumentApi(formDataMain)
      .then((res) => {
        console.log("res", res);
        if (res.success) {
          // onClose();
          // getAllColleges();
          toast({
            title: "Caste Document uploaded.",
            description: res.message,
            status: "success",
            duration: 9000,
            isClosable: true,
            position: "top-right",
          });
          setVideoFile([]);
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

  const uploadIncomeDocument = () => {
    console.log("uploadIncomeDocument");

    const formDataMain = new FormData();

    const data = { id: formData.id };

    for (const key in data) {
      formDataMain.append(key, data[key]);
    }

    incomeFile.map((item, index) => {
      // test.push(item);
      console.log("item-income", item);
      formDataMain.append(`incomedocument`, item[1]);
    });
    console.log("formDataMain", formDataMain);
    submitFormDataForIncomeUploadDocumentApi(formDataMain)
      .then((res) => {
        console.log("res", res);
        if (res.success) {
          // onClose();
          // getAllColleges();
          toast({
            title: "Income Document uploaded.",
            description: res.message,
            status: "success",
            duration: 9000,
            isClosable: true,
            position: "top-right",
          });
          setIncomeFile([]);
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

  const uploadDomicileDocument = () => {
    console.log("uploadDomicileDocument");

    const formDataMain = new FormData();

    const data = { id: formData.id };

    for (const key in data) {
      formDataMain.append(key, data[key]);
    }

    domicileFile.map((item, index) => {
      // test.push(item);
      console.log("item-domicile", item);
      formDataMain.append(`domiciledocument`, item[1]);
    });
    console.log("formDataMain", formDataMain);
    submitFormDataForDomacileUploadDocumentApi(formDataMain)
      .then((res) => {
        console.log("res", res);
        if (res.success) {
          // onClose();
          // getAllColleges();
          toast({
            title: "Domicile Document uploaded.",
            description: res.message,
            status: "success",
            duration: 9000,
            isClosable: true,
            position: "top-right",
          });
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

  const uploadDisabilityDDocument = () => {
    console.log("uploadDisabilityDDocument");

    const formDataMain = new FormData();

    const data = { id: formData.id };

    for (const key in data) {
      formDataMain.append(key, data[key]);
    }

    DisabilityFile.map((item, index) => {
      // test.push(item);
      console.log("item-disability", item);
      formDataMain.append(`disabilitydocument`, item[1]);
    });
    console.log("formDataMain", formDataMain);
    submitFormDataForDisabilityUploadDocumentApi(formDataMain)
      .then((res) => {
        console.log("res", res);
        if (res.success) {
          // onClose();
          // getAllColleges();
          toast({
            title: "Disability Document uploaded.",
            description: res.message,
            status: "success",
            duration: 9000,
            isClosable: true,
            position: "top-right",
          });
          // setDisabilityFile([]);
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

  // const handleChangeDate = (param) => (date) => {
  //   console.log("Selected date:", param, "---", date);
  //   // setFormData({ ...formData, [param]: date });
  //   // if (typeof date === "string") {
  //   date = parseISO(date); // Convert string to Date object
  //   // }
  //   setFormData({ ...formData, [param]: date });
  // };

  const removeVideo = (index) => {
    let temp = [...videoFile];
    temp.splice(index, 1);
    setVideoFile(temp || []);
  };
  const removeIncomeDoc = (index) => {
    let temp = [...incomeFile];
    temp.splice(index, 1);
    setIncomeFile(temp || []);
  };

  const removeDomicileDoc = (index) => {
    let temp = [...domicileFile];
    temp.splice(index, 1);
    setDomicile(temp || []);
  };

  const removeDisabilityDoc = (index) => {
    let temp = [...DisabilityFile];
    temp.splice(index, 1);
    setDisabilityFile(temp || []);
  };

  const handleChangedoYouHaveCasteCertificateDropDown = (param) => (event) => {
    // if (formData.doYouHaveCasteCertificate === "Yes") {
    //   setStateOfCasteCertificate(false);
    // } else {
    //   setStateOfCasteCertificate(true);
    // }
    // const newValue = event.target.value;

    const newValue = event.target.value;
    setStateOfCasteCertificate(newValue === "Yes");
    // setStateOfCasteCertificate(newValue === "Yes");
    setFormData({ ...formData, [param]: newValue });
  };

  const handleChangedoYouHaveIncomeCertificateDropDown = (param) => (event) => {
    if (formData.doYouHaveIncomeCertificate === "Yes") {
      setStateOfIncomeCertificate(false);
    } else {
      setStateOfIncomeCertificate(true);
    }
    const newValue = event.target.value;
    setFormData({ ...formData, [param]: newValue });
  };

  const handleChangedoYouHaveDomicileCertificateDropDown =
    (param) => (event) => {
      if (formData.doYouHaveDomicileCertificate === "Yes") {
        setStateOfDomicileCertificate(false);
      } else {
        setStateOfDomicileCertificate(true);
      }
      const newValue = event.target.value;
      setFormData({ ...formData, [param]: newValue });
    };

  const handleChangedoYouHaveDisabilityDropDown = (param) => (event) => {
    if (formData.doYouHaveDisability === "Yes") {
      setStateOfDisabilityCertificate(false);
    } else {
      setStateOfDisabilityCertificate(true);
    }
    const newValue = event.target.value;
    setFormData({ ...formData, [param]: newValue });
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    const formDataMain = new FormData();

    // console.log("formData", formData);
    const data = {
      id: formData.id,
      candidateName: formData.candidateName,
      email: formData.email,
      whatsappNumber: formData.whatsappNumber,
      dob: formData.dob,
      gender: formData.gender,
      parentMobileNumber: formData.parentMobileNumber,
      maritalStatus: formData.maritalStatus,
      religion: formData.religion,
      casteCategory: formData.casteCategory,
      subCaste: formData.subCaste,
      doYouHaveCasteCertificate: formData.doYouHaveCasteCertificate,
      casteCertificateNumber: formData.casteCertificateNumber,
      casteIssuedDistrict: formData.casteIssuedDistrict,
      casteApplicantName: formData.casteApplicantName,
      casteIssuingAuthority: formData.casteIssuingAuthority,
      casteDoc: formData.casteDoc,
      casteIssuedDate: formData.casteIssuedDate,
      annualFamilyIncome: formData.annualFamilyIncome,
      doYouHaveIncomeCertificate: formData.doYouHaveIncomeCertificate,
      incomeCertNo: formData.incomeCertNo,
      incomeIssAuthority: formData.incomeIssAuthority,
      incomeDoc: formData.incomeDoc,
      incomeIssuedDate: formData.incomeIssuedDate,
      doYouHaveDomicileMaharashtraKarnataka:
        formData.doYouHaveDomicileMaharashtraKarnataka,
      doYouHaveDomicileCertificate: formData.doYouHaveDomicileCertificate,
      domicileRelationType: formData.domicileRelationType,
      domicilecertnumber: formData.domicileCertNumber,
      domicileApplicantName: formData.domicileApplicantName,
      domicileIssuedAuthority: formData.domicileIssuedAuthority,
      domicileDoc: formData.domicileDoc,
      domicileIssuedDate: formData.domicileIssuedDate,
      doYouHaveDisability: formData.doYouHaveDisability,
      disabilityType: formData.disabilityType,
      disabilityName: formData.disabilityName,
      doYouHaveDisabilityCertificate: formData.doYouHaveDisabilityCertificate,
      disabilityCertificateNo: formData.disabilityCertificateNo,
      disabilityPercentage: formData.disabilityPercentage,
      disabilityIssuedDate: formData.disabilityIssuedDate,
      disabilityIssuingAuthority: formData.disabilityIssuingAuthority,
      disabilityDoc: formData.disabilityDoc,
      bankaccName: formData.bankaccName,
      bankIfsc: formData.bankIfsc,
    };

    console.log("data", data);

    // formData.append("data", ...data);
    // Append each key-value pair from data object individually
    for (const key in data) {
      formDataMain.append(key, data[key]);
    }

    // videoFile.map((item, index) => {
    //   // test.push(item);
    //   console.log("item-caste", item);
    //   formDataMain.append(`video`, item[1]);
    // });

    // incomeFile.map((item, index) => {
    //   // test.push(item);
    //   console.log("item-income", item);
    //   formDataMain.append(`incomeDocumentFile`, item[1]);
    // });

    // domicileFile.map((item, index) => {
    //   // test.push(item);
    //   console.log("item-domicileFile", item);
    //   formDataMain.append(`domicileDocumentFile`, item[1]);
    // });
    // console.log("formData::::::", formDataMain);

    submitFormDataApi(formDataMain)
      .then((res) => {
        if (res.success) {
          // onClose();
          // getAllColleges();
          toast({
            title: "PersonalInfo Details Updated.",
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

  const getPersonalInfo = () => {
    const studentMail = getOTPSecret().to;
    const data = {
      email: studentMail,
    };
    getPersonalInfoApi(data)
      .then((res) => {
        console.log("res", res.data[0]);
        setFormData(res.data[0]);
        // setTempFormData(res.data[0]);
      })
      .catch((error) => {
        console.error(error);
      });
  };

  const getMaritalStatusData = () => {
    getMaritalStatusApi()
      .then((res) => {
        setMaritalStatus(res.data);
      })
      .catch((error) => {
        console.error(error);
      });
  };

  const getReligionListData = () => {
    getReligionListApi()
      .then((res) => {
        // console.log("getReligionListData:::", res.data);
        setReligionList(res.data);
      })
      .catch((error) => {
        console.error(error);
      });
  };

  const getCasteCatogoryListData = () => {
    getCasteCatogoryListApi()
      .then((res) => {
        // console.log("getReligionListData:::", res.data);
        setCasteCategoryList(res.data);
      })
      .catch((error) => {
        console.error(error);
      });
  };

  const getDisabilityTypeListData = () => {
    getDisabilityTypeListApi()
      .then((res) => {
        setDisabilityTypeList(res.data);
      })
      .catch((error) => {
        console.error(error);
      });
  };

  const getDisabilityWithTypelistData = () => {
    getDisabilityWithTypeListApi()
      .then((res) => {
        setDisabilityWithTypelist(res.data);
      })
      .catch((error) => {
        console.error(error);
      });
  };

  useEffect(() => {
    getPersonalInfo();
    getMaritalStatusData();
    getReligionListData();
    getCasteCatogoryListData();
    getDisabilityTypeListData();
    getDisabilityWithTypelistData();
  }, []);

  return (
    <div>
      <form onSubmit={handleSubmit} encType="multipart/form-data">
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
            <FormControl id="candidateName">
              <FormLabel>candidate Name (As Per SSC Marksheet)</FormLabel>
              <Input
                type="text"
                placeholder="Enter your candidateName"
                value={formData.candidateName}
                onChange={handleChange("candidateName")}
              />
            </FormControl>
            <FormControl id="email">
              <FormLabel>email</FormLabel>
              <Input
                type="text"
                placeholder="Enter your email"
                value={formData.email}
                onChange={handleChange("email")}
              />
            </FormControl>
            <FormControl id="whatsappNumber">
              <FormLabel>Mobile (Student WhatsApp Number)</FormLabel>
              <Input
                type="text"
                placeholder="Enter your whatsappNumber"
                value={formData.whatsappNumber}
                onChange={handleChange("whatsappNumber")}
                inputMode="numeric"
                pattern="[0-9]*" // Allows only numbers
              />
            </FormControl>
            <FormControl id="dob">
              <FormLabel>Date of Birth (as per Aadhar)</FormLabel>
              <Input
                type="text"
                placeholder="Enter your dob"
                value={formData.dob}
                onChange={handleChange("dob")}
              />
            </FormControl>
            {/* <FormControl id="dob">
              <FormLabel>Date of Birth (as per Aadhar)</FormLabel>

              <SingleDatepicker
                name="date-input"
                date={formData.dob}
                onDateChange={handleChangeDate("dob")}
              />
            </FormControl> */}

            <FormControl id="gender">
              <FormLabel>Gender</FormLabel>
              <Input
                type="text"
                placeholder="Enter your gender"
                value={formData.gender}
                onChange={handleChange("gender")}
              />
            </FormControl>
            <FormControl id="parentMobileNumber">
              <FormLabel>Parent's/Guardian Mobile No</FormLabel>
              <Input
                type="text"
                placeholder="Enter your parentMobileNumber"
                value={formData.parentMobileNumber}
                onChange={handleChange("parentMobileNumber")}
                inputMode="numeric"
                pattern="[0-9]*" // Allows only numbers
              />
            </FormControl>
            {/* <FormControl id="maritalStatus">
              <FormLabel>Marital Status</FormLabel>
              <Input
                type="text"
                placeholder="Enter your maritalStatus"
                value={formData.maritalStatus}
                onChange={handleChange("maritalStatus")}
              />
            </FormControl> */}
            <FormControl id="maritalStatus">
              <FormLabel>Marital Status</FormLabel>
              <Select
                placeholder="Select your maritalStatus"
                value={formData.maritalStatus}
                onChange={handleChange("maritalStatus")}
                required
              >
                {maritalStatus?.map((status, index) => (
                  <option key={index} value={status.marital_status}>
                    {status.marital_status}
                  </option>
                ))}
              </Select>
            </FormControl>
            {/* <FormControl id="religion">
              <FormLabel>Religion</FormLabel>
              <Input
                type="text"
                placeholder="Enter your religion"
                value={formData.religion}
                onChange={handleChange("religion")}
              />
            </FormControl> */}
            <FormControl id="religion">
              <FormLabel>Religion</FormLabel>
              <Select
                placeholder="Select your religion"
                value={formData.religion}
                onChange={handleChange("religion")}
                required
              >
                {religionList?.map((status, index) => (
                  <option key={index} value={status.religion_id}>
                    {status.religion_id}
                  </option>
                ))}
              </Select>
            </FormControl>
            {/* <FormControl id="casteCategory">
              <FormLabel>Caste Category</FormLabel>
              <Input
                type="text"
                placeholder="Enter your casteCategory"
                value={formData.casteCategory}
                onChange={handleChange("casteCategory")}
              />
            </FormControl> */}
            <FormControl id="casteCategory">
              <FormLabel>Caste Category</FormLabel>
              <Select
                placeholder="Select your casteCategory"
                value={formData.casteCategory}
                onChange={handleChange("casteCategory")}
                required
              >
                {casteCategoryList?.map((status, index) => (
                  <option key={index} value={status.category_name}>
                    {status.category_name}
                  </option>
                ))}
              </Select>
            </FormControl>
            <FormControl id="subCaste">
              <FormLabel>Sub Caste</FormLabel>
              <Input
                type="text"
                placeholder="Enter your subCaste"
                value={formData.subCaste}
                onChange={handleChange("subCaste")}
              />
            </FormControl>
            <FormControl id="doYouHaveCasteCertificate">
              <FormLabel>Do you have Caste Certificate?</FormLabel>

              <Select
                placeholder="Select your Caste Certificate"
                value={formData.doYouHaveCasteCertificate}
                onChange={handleChangedoYouHaveCasteCertificateDropDown(
                  "doYouHaveCasteCertificate"
                )}
              >
                {doYouHaveCasteCertificateDropDown?.map((status, index) => {
                  console.log("status", status);
                  return (
                    <option key={index} value={status}>
                      {status}
                    </option>
                  );
                })}
              </Select>
            </FormControl>
            {stateOfCasteCertificate && (
              <>
                <FormControl id="casteCertificateNumber">
                  <FormLabel>Caste Certificate Number</FormLabel>
                  <Input
                    type="text"
                    placeholder="Enter your casteCertificateNumber"
                    value={formData.casteCertificateNumber}
                    onChange={handleChange("casteCertificateNumber")}
                    required={stateOfCasteCertificate}
                  />
                </FormControl>

                <FormControl id="casteIssuedDistrict">
                  <FormLabel>Issuing District (Caste Certificate)</FormLabel>
                  <Input
                    type="text"
                    placeholder="Enter your casteIssuedDistrict"
                    value={formData.casteIssuedDistrict}
                    onChange={handleChange("casteIssuedDistrict")}
                    required={stateOfCasteCertificate}
                  />
                </FormControl>

                <FormControl id="casteApplicantName">
                  <FormLabel> Caste Applicant Name</FormLabel>
                  <Input
                    type="text"
                    placeholder="Enter your casteApplicantName"
                    value={formData.casteApplicantName}
                    onChange={handleChange("casteApplicantName")}
                    required={stateOfCasteCertificate}
                  />
                </FormControl>

                <FormControl id="casteIssuingAuthority">
                  <FormLabel> Caste Issuing Authority</FormLabel>
                  <Input
                    type="text"
                    placeholder="Enter your Caste Issuing Authority"
                    value={formData.casteIssuingAuthority}
                    onChange={handleChange("casteIssuingAuthority")}
                    required={stateOfCasteCertificate}
                  />
                </FormControl>

                {/* <FormControl id="casteDoc">
                  <FormLabel> Caste Docs</FormLabel>
                  <Input
                    type="text"
                    placeholder="Enter your Caste Docs"
                    value={formData.casteDoc}
                    onChange={handleChange("casteDoc")}
                    required={stateOfCasteCertificate}
                  />
                </FormControl> */}
                <FormControl id="casteDoc">
                  <FormLabel> Caste Docs</FormLabel>
                  <label htmlFor="formId">
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
                        onChange={handleVideoUpload}
                        placeholder="0 file selected"
                        // required
                        name="video"
                        id="formId"
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
                          handleVideoUpload(e);
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
                          {videoFile.length == 0 ? (
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
                    {videoFile &&
                      videoFile.map((item, index) => {
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
                                onClick={() => removeVideo(index)}
                              />
                            )}
                          </Tag>
                        );
                      })}
                    <Button onClick={() => uploadCasteDocument()}>Save</Button>
                  </div>
                </FormControl>

                <FormControl id="casteIssuedDate">
                  <FormLabel> Caste Issuing Date</FormLabel>
                  <Input
                    type="text"
                    placeholder="Enter your Income Date of Issue"
                    value={formData.casteIssuedDate}
                    onChange={handleChange("casteIssuedDate")}
                  />

                  {/* <SingleDatepicker
                    name="date-input"
                    date={formData.casteIssuedDate || null}
                    onDateChange={handleChangeDate("casteIssuedDate")}
                  /> */}
                </FormControl>
              </>
            )}
            <FormControl id="annualFamilyIncome">
              <FormLabel>Family Annual Income</FormLabel>
              <Input
                type="text"
                placeholder="Enter your Family Annual Income"
                value={formData.annualFamilyIncome}
                onChange={handleChange("annualFamilyIncome")}
              />
            </FormControl>
            {/* <FormControl id="doYouHaveIncomeCertificate">
              <FormLabel>Do you have Income Certificate?</FormLabel>
              <Input
                type="text"
                placeholder="Enter your doYouHaveIncomeCertificate"
                value={formData.doYouHaveIncomeCertificate}
                onChange={handleChange("doYouHaveIncomeCertificate")}
              />
            </FormControl> */}
            <FormControl id="doYouHaveIncomeCertificate">
              <FormLabel>Do you have Income Certificate?</FormLabel>
              <Select
                placeholder="Select your Income Certificate"
                value={formData.doYouHaveIncomeCertificate}
                onChange={handleChangedoYouHaveIncomeCertificateDropDown(
                  "doYouHaveIncomeCertificate"
                )}
              >
                {doYouHaveIncomeCertificateDropDown?.map((status, index) => {
                  console.log("status", status);
                  return (
                    <option key={index} value={status}>
                      {status}
                    </option>
                  );
                })}
              </Select>
            </FormControl>
            {stateOfIncomeCertificate && (
              <>
                <FormControl id="incomeCertNo">
                  <FormLabel>Income Certificate Number</FormLabel>
                  <Input
                    type="text"
                    placeholder="Enter your incomeCertNo"
                    value={formData.incomeCertNo}
                    onChange={handleChange("incomeCertNo")}
                    required={stateOfIncomeCertificate}
                  />
                </FormControl>

                <FormControl id="incomeIssAuthority">
                  <FormLabel>Income Certificate Issuing Authority</FormLabel>
                  <Input
                    type="text"
                    placeholder="Enter your Income Issuing Authority"
                    value={formData.incomeIssAuthority}
                    onChange={handleChange("incomeIssAuthority")}
                    required={stateOfIncomeCertificate}
                  />
                </FormControl>

                {/* <FormControl id="incomeDoc">
                  <FormLabel>Income Certificate Doc</FormLabel>
                  <Input
                    type="text"
                    placeholder="Enter your Income income Doc"
                    value={formData.incomeDoc}
                    onChange={handleChange("incomeDoc")}
                    required={stateOfIncomeCertificate}
                  />
                </FormControl> */}
                <FormControl id="incomeDoc">
                  <FormLabel> Income Certificate Doc</FormLabel>
                  <label htmlFor="formIdMain">
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
                        onChange={handleIncomeUpload}
                        placeholder="0 file selected"
                        name="incomeDoc"
                        id="formIdMain"
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
                          handleIncomeUpload(e);
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
                          {incomeFile.length == 0 ? (
                            <p style={{ color: "blue" }}>
                              Click here to select your Income docs file{" "}
                              {formData && formData?.incomeDoc}
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
                    {incomeFile &&
                      incomeFile.map((item, index) => {
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
                                onClick={() => removeIncomeDoc(index)}
                              />
                            )}
                          </Tag>
                        );
                      })}
                    <Button onClick={() => uploadIncomeDocument()}>Save</Button>
                  </div>
                </FormControl>

                <FormControl id="incomeIssuedDate">
                  <FormLabel>Income Certificate Issuing date</FormLabel>
                  <Input
                    type="text"
                    placeholder="Enter your Income Date of Issue"
                    value={formData.incomeIssuedDate}
                    onChange={handleChange("incomeIssuedDate")}
                    required={stateOfIncomeCertificate}
                  />
                </FormControl>
              </>
            )}
            <FormControl id="doYouHaveDomicileMaharashtraKarnataka">
              <FormLabel>
                Are you Domicile of Maharashtra / Maharashtra-Karnataka Border ?
              </FormLabel>
              <Input
                type="text"
                placeholder="Are you Domicile of Maharashtra / Maharashtra-Karnataka Border ?"
                value={formData.doYouHaveDomicileMaharashtraKarnataka}
                onChange={handleChange("doYouHaveDomicileMaharashtraKarnataka")}
              />
            </FormControl>
            {/* <FormControl id="doYouHaveDomicileCertificate">
              <FormLabel>Do you have Domicile Certificate ?</FormLabel>
              <Input
                type="text"
                placeholder="Do you have Domicile Certificate ?"
                value={formData.doYouHaveDomicileCertificate}
                onChange={handleChange("doYouHaveDomicileCertificate")}
              />
            </FormControl> */}
            <FormControl id="doYouHaveDomicileCertificate">
              <FormLabel>Do you have Domicile Certificate ?</FormLabel>
              <Select
                placeholder="Select your Domicile Certificate"
                value={formData.doYouHaveDomicileCertificate}
                onChange={handleChangedoYouHaveDomicileCertificateDropDown(
                  "doYouHaveDomicileCertificate"
                )}
              >
                {doYouHaveDomicileCertificateDropDown?.map((status, index) => {
                  // console.log("status", status);
                  return (
                    <option key={index} value={status}>
                      {status}
                    </option>
                  );
                })}
              </Select>
            </FormControl>
            {stateOfDomicileCertificate && (
              <>
                <FormControl id="domicileRelationType">
                  <FormLabel>Relationship Type (Domicile)</FormLabel>
                  <Input
                    type="text"
                    placeholder="Relationship Type"
                    value={formData.domicileRelationType}
                    onChange={handleChange("domicileRelationType")}
                    required={stateOfDomicileCertificate}
                  />
                </FormControl>

                <FormControl id="domicileCertNumber">
                  <FormLabel>Domicile Certificate No</FormLabel>
                  <Input
                    type="text"
                    placeholder="Domicile Certificate No"
                    value={formData.domicileCertNumber}
                    onChange={handleChange("domicileCertNumber")}
                    required={stateOfDomicileCertificate}
                  />
                </FormControl>

                <FormControl id="domicileApplicantName">
                  <FormLabel>Domicile Applicant Name</FormLabel>
                  <Input
                    type="text"
                    placeholder="Domicile Applicant Name"
                    value={formData.domicileApplicantName}
                    onChange={handleChange("domicileApplicantName")}
                    required={stateOfDomicileCertificate}
                  />
                </FormControl>

                <FormControl id="domicileIssuedAuthority">
                  <FormLabel>Domicile Issuing Authority</FormLabel>
                  <Input
                    type="text"
                    placeholder="Domicile Issuing Authority"
                    value={formData.domicileIssuedAuthority}
                    onChange={handleChange("domicileIssuedAuthority")}
                    required={stateOfDomicileCertificate}
                  />
                </FormControl>

                {/* <FormControl id="domicileDoc">
                  <FormLabel>Domicile Doc</FormLabel>
                  <Input
                    type="text"
                    placeholder="Domicile Doc"
                    value={formData.domicileDoc}
                    onChange={handleChange("domicileDoc")}
                    required={stateOfDomicileCertificate}
                  />
                </FormControl> */}

                <FormControl id="domicileDoc">
                  <FormLabel> Domicile Doc</FormLabel>
                  <label htmlFor="formIdMainDomicileDocs">
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
                        onChange={handleDomicileUpload}
                        placeholder="0 file selected"
                        name="domicileDoc"
                        id="formIdMainDomicileDocs"
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
                          handleDomicileUpload(e);
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
                          {domicileFile.length == 0 ? (
                            <p style={{ color: "blue" }}>
                              Click here to select your Domicile docs file{" "}
                              {formData && formData.domicileDoc}
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
                    {domicileFile &&
                      domicileFile?.map((item, index) => {
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
                                onClick={() => removeDomicileDoc(index)}
                              />
                            )}
                          </Tag>
                        );
                      })}
                    <Button onClick={() => uploadDomicileDocument()}>
                      Save
                    </Button>
                  </div>
                </FormControl>

                <FormControl id="domicileIssuedDate">
                  <FormLabel>Domicile Issued Date</FormLabel>
                  <Input
                    type="text"
                    placeholder="Domicile Issued Date"
                    value={formData.domicileIssuedDate}
                    onChange={handleChange("domicileIssuedDate")}
                    required={stateOfDomicileCertificate}
                  />
                </FormControl>
              </>
            )}
            {/* <FormControl id="doYouHaveDisability">
              <FormLabel>Do You Have Any Disability</FormLabel>
              <Input
                type="text"
                placeholder="Disability of any Type?"
                value={formData.doYouHaveDisability}
                onChange={handleChange("doYouHaveDisability")}
              />
            </FormControl> */}
            <FormControl id="doYouHaveDisability">
              <FormLabel>Do You Have Any Disability</FormLabel>
              <Select
                placeholder="Select your Disability Type"
                value={formData.doYouHaveDisability}
                onChange={handleChangedoYouHaveDisabilityDropDown(
                  "doYouHaveDisability"
                )}
              >
                {doYouHaveDisabilityDropDown?.map((status, index) => {
                  // console.log("status", status);
                  return (
                    <option key={index} value={status}>
                      {status}
                    </option>
                  );
                })}
              </Select>
            </FormControl>
            {stateOfDisabilityCertificate && (
              <>
                {/* <FormControl id="disabilityType">
              <FormLabel>Disability Type</FormLabel>
              <Input
                type="text"
                placeholder="Disability Type"
                value={formData.disabilityType}
                onChange={handleChange("disabilityType")}
              />
            </FormControl> */}
                <FormControl id="disabilityType">
                  <FormLabel>Disability Type</FormLabel>
                  <Select
                    placeholder="Select your Disability Type"
                    value={formData.disabilityType}
                    onChange={handleChange("disabilityType")}
                    required={stateOfDisabilityCertificate}
                  >
                    {disabilityTypeList?.map((status, index) => (
                      <option key={index} value={status.disability_type}>
                        {status.disability_type}
                      </option>
                    ))}
                  </Select>
                </FormControl>

                {/* <FormControl id="disabilityName">
              <FormLabel>Person with Disability</FormLabel>
              <Input
                type="text"
                placeholder="Person with Disability"
                value={formData.disabilityName}
                onChange={handleChange("disabilityName")}
              />
            </FormControl> */}
                <FormControl id="disabilityName">
                  <FormLabel>Person with Disability</FormLabel>
                  <Select
                    placeholder="Select your Disability"
                    value={formData.disabilityName}
                    onChange={handleChange("disabilityName")}
                    required={stateOfDisabilityCertificate}
                  >
                    {disabilityWithTypelist?.map((status, index) => (
                      <option key={index} value={status.Disability}>
                        {status.Disability}
                      </option>
                    ))}
                  </Select>
                </FormControl>

                {/* <FormControl id="doYouHaveDisabilityCertificate">
                  <FormLabel>Do you have Disability Certificate ?</FormLabel>
                  <Input
                    type="text"
                    placeholder="Do you have Disability Certificate ?"
                    value={formData.doYouHaveDisabilityCertificate}
                    onChange={handleChange("doYouHaveDisabilityCertificate")}
                    required={stateOfDisabilityCertificate}
                  />
                </FormControl> */}
                <FormControl id="doYouHaveDisabilityCertificate">
                  <FormLabel>Do you have Disability Certificate ?</FormLabel>

                  <Select
                    placeholder="Select your value"
                    value={formData.doYouHaveDisabilityCertificate}
                    onChange={handleChange("doYouHaveDisabilityCertificate")}
                    required={stateOfDisabilityCertificate}
                  >
                    {doYouHaveDisabilityCertificateDropDown?.map(
                      (status, index) => {
                        console.log("status", status);
                        return (
                          <option key={index} value={status}>
                            {status}
                          </option>
                        );
                      }
                    )}
                  </Select>
                </FormControl>

                <FormControl id="disabilityCertificateNo">
                  <FormLabel>Disability Certificate Number ?</FormLabel>
                  <Input
                    type="text"
                    placeholder="Disability Certificate Number ?"
                    value={formData.disabilityCertificateNo}
                    onChange={handleChange("disabilityCertificateNo")}
                    required={stateOfDisabilityCertificate}
                  />
                </FormControl>

                <FormControl id="disabilityPercentage">
                  <FormLabel>
                    Disability Percentage (Should not less than 40%)
                  </FormLabel>
                  <Input
                    type="text"
                    placeholder="Disability Percentage (Should not less than 40%)"
                    value={formData.disabilityPercentage}
                    onChange={handleChange("disabilityPercentage")}
                    required={stateOfDisabilityCertificate}
                  />
                </FormControl>

                <FormControl id="disabilityIssuedDate">
                  <FormLabel>Disability Issuing Date</FormLabel>
                  <Input
                    type="text"
                    placeholder="Disability Issuing Date"
                    value={formData.disabilityIssuedDate}
                    onChange={handleChange("disabilityIssuedDate")}
                    required={stateOfDisabilityCertificate}
                  />
                </FormControl>

                <FormControl id="disabilityIssuingAuthority">
                  <FormLabel>Disability Issuing Authority</FormLabel>
                  <Input
                    type="text"
                    placeholder="Disability Issuing Authority"
                    value={formData.disabilityIssuingAuthority}
                    onChange={handleChange("disabilityIssuingAuthority")}
                    required={stateOfDisabilityCertificate}
                  />
                </FormControl>

                {/* <FormControl id="disabilityDoc">
                  <FormLabel>Disability Document</FormLabel>
                  <Input
                    type="text"
                    placeholder="Disability Document"
                    value={formData.disabilityDoc}
                    onChange={handleChange("disabilityDoc")}
                    required={stateOfDisabilityCertificate}
                  />
                </FormControl> */}

                <FormControl id="disabilityDoc">
                  <FormLabel>Disability Document</FormLabel>
                  <label htmlFor="formIdMainDisabilityDocs">
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
                        onChange={handleDisabilityUpload}
                        placeholder="0 file selected"
                        name="DisabilityDoc"
                        id="formIdMainDisabilityDocs"
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
                          handleDisabilityUpload(e);
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
                          {DisabilityFile.length == 0 ? (
                            <p style={{ color: "blue" }}>
                              Click here to select your Domicile docs file{" "}
                              {formData && formData.domicileDoc}
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
                    {DisabilityFile &&
                      DisabilityFile?.map((item, index) => {
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
                                onClick={() => removeDisabilityDoc(index)}
                              />
                            )}
                          </Tag>
                        );
                      })}
                    <Button onClick={() => uploadDisabilityDDocument()}>
                      Save
                    </Button>
                  </div>
                </FormControl>
              </>
            )}
            <FormControl id="bankaccName">
              <FormLabel>Bank Account Number</FormLabel>
              <Input
                type="text"
                placeholder="Bank Account Number"
                value={formData.bankaccName}
                onChange={handleChange("bankaccName")}
              />
            </FormControl>
            <FormControl id="bankIfsc">
              <FormLabel>Bank IFSC Code</FormLabel>
              <Input
                type="text"
                placeholder="Bank IFSC Code"
                value={formData.bankIfsc}
                onChange={handleChange("bankIfsc")}
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
    </div>
  );
}

export default FormOne;
