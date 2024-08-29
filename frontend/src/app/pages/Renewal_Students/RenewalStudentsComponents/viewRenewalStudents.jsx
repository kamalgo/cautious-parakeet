import React, { useEffect, useState } from "react";
import { Select as ChakraSelect } from "chakra-react-select";  // Import chakra-react-select
import { useParams, Link } from 'react-router-dom';
import { useToast } from "@chakra-ui/react";
import { ExternalLinkIcon } from "@chakra-ui/icons"; // Import ExternalLinkIcon from Chakra UI
import { Box, Heading, SimpleGrid, Text, Button, useDisclosure, AlertDialog, AlertDialogBody, AlertDialogFooter, AlertDialogHeader, AlertDialogContent, AlertDialogOverlay, Accordion, AccordionItem, AccordionButton, AccordionPanel, AccordionIcon } from "@chakra-ui/react";
import Base from "../../../components/Base";
import {
  markLoginUnsuccessful, markLoginSuccessful, renewalStudentProfileView, updatePersonalInfo, updateIncomeDetails, updateCurrentCourseDetails,
  updateHostelDetails, updateSchemeDetails, sendSelectedDataToDB
} from "../../../api/RenewalStudentsApi/RenewalStudentsApi";

import Edit_Prsnl_Renewal_Modal from "./Edit_Prsnl_Renewal_Modal";
import Edit_Income_Renewal_Modal from "./Edit_Income_Renewal_Modal";
import Edit_Current_Course_Renewal_Modal from "./Edit_Current_Course_Renewal_Modal";
import Edit_Hostel_Renewal_Modal from "./Edit_Hostel_Renewal_Modal";
import Edit_Scheme_Renewal_Modal from "./Edit_Scheme_Renewal_Modal";
import PersonalInfoVerificationDialog from "./verificationDialogs/PersonalInfoVerificationDialog";
import IncomeDetailsVerificationDialog from "./verificationDialogs/IncomeDetailsVerificationDialog";
import CurrentCourseDialog from "./verificationDialogs/CurrentCourseDialog";
import HostelDialog from "./verificationDialogs/HostelDialog";
import SchemeDialog from "./verificationDialogs/SchemeDialog";




function viewRenewalStudents() {
  const toast = useToast();  // Initialize toast once for the component
  const [selectedOptions, setSelectedOptions] = useState([]);

  const [isVerified, setIsVerified] = useState(false);
  const [isIncomeVerified, setIsIncomeVerified] = useState(false);
  const [isCurrentCourseVerified, setIsCurrentCourseVerified] = useState(false);
  const [isHostelVerified, setIsHostelVerified] = useState(false);
  const [isSchemeVerified, setIsSchemeVerified] = useState(false);



  //Modals for edit button
  const [viewData, setViewData] = useState([]);
  const [selectedId, setSelectedId] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isIncomeModalOpen, setIsIncomeModalOpen] = useState(false);
  const [isCurrentCourseModalOpen, setIsCurrentCourseModalOpen] = useState(false);
  const [isHostelModalOpen, setIsHostelModalOpen] = useState(false);
  const [isSchemeModalOpen, setIsSchemeModalOpen] = useState(false);



  //Dialogs for verification button
  const [isPersonalDialogOpen, setIsPersonalDialogOpen] = useState(false); // State for personal info dialog
  const [isIncomeDialogOpen, setIsIncomeDialogOpen] = useState(false); // State for income dialog
  const [isCurrentCourseDialogOpen, setIsCurrentCourseDialogOpen] = useState(false);
  const [isHostelDialogOpen, setIsHostelDialogOpen] = useState(false);
  const [isSchemeDialogOpen, setIsSchemeDialogOpen] = useState(false);


  const { id } = useParams();

  useEffect(() => {
    const fetchProfileData = async () => {
      try {
        const data = { id };
        const response = await renewalStudentProfileView(data);

        // Ensure response is correctly set
        if (response && response.data) {
          setViewData(response.data);
          setIsVerified(response.data.personalInfo_verified === 'yes');
          setIsIncomeVerified(response.data.incomeDetails_verified === 'yes');
          setIsCurrentCourseVerified(response.data.currentCourse_verified === 'yes');
          setIsHostelVerified(response.data.hostelDetails_verified === 'yes');
          setIsSchemeVerified(response.data.scheme_verified === 'yes');
        }

      } catch (err) {
        console.error("Error fetching student profile view data:", err);
      }
    };
    fetchProfileData();
  }, [id]);


  const handleVerifyClick = (e, section) => {
    e.stopPropagation();
    if (section === 'personal') {
      setIsPersonalDialogOpen(true);

    } else if (section === 'income') {
      setIsIncomeDialogOpen(true);

    } else if (section === 'current') {
      setIsCurrentCourseDialogOpen(true);

    } else if (section === 'hostel') {
      setIsHostelDialogOpen(true); // Ensure this line is setting the state correctly

    } else if (section == "scheme") {
      setIsSchemeDialogOpen(true);
    }

  };

  const confirmPersonalVerification = async (verificationStatus) => {
    try {
      const response = await updatePersonalInfo(id, verificationStatus);
      if (response.success) {
        setIsVerified(verificationStatus === 'yes');
      }
    } catch (err) {
      console.error("Error updating personal information verification status:", err);
    } finally {
      setIsPersonalDialogOpen(false);
    }
  };

  const confirmIncomeVerification = async (verificationStatus) => {
    try {
      const response = await updateIncomeDetails(id, verificationStatus);
      if (response.success) {
        setIsIncomeVerified(verificationStatus === 'yes');

        // Optionally re-fetch the profile data to ensure it’s up-to-date
        const updatedResponse = await renewalStudentProfileView({ id });
        if (updatedResponse && updatedResponse.data) {
          setViewData(updatedResponse.data);
          setIsIncomeVerified(updatedResponse.data.incomeDetails_verified === 'yes');
        }
      }
    } catch (err) {
      console.error("Error updating income verification status:", err);
    } finally {
      setIsIncomeDialogOpen(false);
    }
  };


  const confirmCurrentCourseVerification = async (verificationStatus) => {
    try {
      const response = await updateCurrentCourseDetails(id, verificationStatus);
      if (response.success) {
        // Update state correctly based on verification status
        setIsCurrentCourseVerified(verificationStatus === 'yes');
      }
    } catch (err) {
      console.error("Error updating current course verification status:", err);
    } finally {
      setIsCurrentCourseDialogOpen(false);
    }
  };

  // Confirmation for Hostel Verification
  const confirmHostelVerification = async (verificationStatus) => {
    try {
      const response = await updateHostelDetails(id, verificationStatus);
      if (response.success) {
        // Update state correctly based on verification status
        setIsHostelVerified(verificationStatus === 'yes');
      }
    } catch (err) {
      console.error("Error updating hostel verification status:", err);
    } finally {
      setIsHostelDialogOpen(false); // Ensure dialog closes after operation
    }
  };

  // Confirmation for Hostel Verification
  const confirmSchemeVerification = async (verificationStatus) => {
    try {
      const response = await updateSchemeDetails(id, verificationStatus);
      if (response.success) {
        // Update state correctly based on verification status
        setIsSchemeVerified(verificationStatus === 'yes');
      }
    } catch (err) {
      console.error("Error updating hostel verification status:", err);
    } finally {
      setIsSchemeDialogOpen(false); // Ensure dialog closes after operation
    }
  };





  const openModalWithId = () => {
    setSelectedId(id);
    setIsModalOpen(true);
  };

  const openIncomeModalWithId = () => {
    setSelectedId(id);
    setIsIncomeModalOpen(true);
  };

  const openCurrentCourseModalWithId = () => {
    setSelectedId(id);
    setIsCurrentCourseModalOpen(true);
  };


  const openHostelModalWithId = () => {
    setSelectedId(id);
    setIsHostelModalOpen(true);
  };

  const openSchemeModalWithId = () => {
    setSelectedId(id);
    setIsSchemeModalOpen(true);
  };


  // Handle login successful
  //  const handleLoginSuccessful = async () => {
  //   try {
  //     const response = await markLoginSuccessful(id);
  //     if (response.success) {
  //       console.log("Login marked as successful");
  //       // You can show a success message or update the state as needed
  //     }
  //   } catch (err) {
  //     console.error("Error marking login as successful:", err);
  //   }
  // };


  // Handle successful login
  const handleLoginSuccessful = async () => {
    try {
      const response = await markLoginSuccessful(id); // Assuming 'id' is defined in your component
      if (response.success) {
        toast({
          title: "Success!",
          description: "Login marked as successful.",
          status: "success",
          duration: 5000,
          isClosable: true,
          position: "top-right",
        });
        console.log("Login marked as successful");
      } else {
        toast({
          title: "Failed!",
          description: "Could not mark login as successful.",
          status: "error",
          duration: 5000,
          isClosable: true,
          position: "top-right",
        });
      }
    } catch (err) {
      console.error("Error marking login as successful:", err);
      toast({
        title: "Error!",
        description: "There was an error processing the request.",
        status: "error",
        duration: 5000,
        isClosable: true,
        position: "top-right",
      });
    }
  };

  // Handle unsuccessful login
  const handleLoginUnsuccessful = async () => {
    try {
      const response = await markLoginUnsuccessful(id); // Assuming 'id' is defined in your component
      if (response.success) {
        toast({
          title: "Success!",
          description: "Login marked as unsuccessful.",
          status: "success",
          duration: 5000,
          isClosable: true,
          position: "top-right",
        });
        console.log("Login marked as unsuccessful");
      } else {
        toast({
          title: "Failed!",
          description: "Could not mark login as unsuccessful.",
          status: "error",
          duration: 5000,
          isClosable: true,
          position: "top-right",
        });
      }
    } catch (err) {
      console.error("Error marking login as unsuccessful:", err);
      toast({
        title: "Error!",
        description: "There was an error processing the request.",
        status: "error",
        duration: 5000,
        isClosable: true,
        position: "top-right",
      });
    }
  };




  // // Handle login unsuccessful
  // const handleLoginUnsuccessful = async () => {
  //   try {
  //     const response = await markLoginUnsuccessful(id);
  //     if (response.success) {
  //       console.log("Login marked as unsuccessful");
  //       // You can show a failure message or update the state as needed
  //     }
  //   } catch (err) {
  //     console.error("Error marking login as unsuccessful:", err);
  //   }
  // };

  // Define your options here (could come from API as well)
  const options = [
    { value: "why", label: "why" },
    { value: "this", label: "this" },
    { value: "Kolaveri,Kolaveri", label: "Kolaveri,Kolaveri" },
    { value: "Kolaveri di", label: "Kolaveri di" }
  ];


    // Handle changes in dropdown
    const handleSelectChange = (selected) => {
      setSelectedOptions(selected);
    };
// Handle form submission to send data to DB
const handleSubmit = async () => {
  try {
    // Map selectedOptions to only include the `value` field
    const selectedValues = selectedOptions.map(option => option.value);

    // Log the selected values for debugging
    console.log("Selected Values:", id, selectedValues);

    // Call your API function and pass the processed values
    const response = await sendSelectedDataToDB(id,selectedValues); // Pass only the values
    if (response.success) {
      toast({
        title: "Success!",
        description: "Data sent to the database successfully.",
        status: "success",
        duration: 5000,
        isClosable: true,
        position: "top-right",
      });
    } else {
      toast({
        title: "Failed!",
        description: "Failed to send data to the database.",
        status: "error",
        duration: 5000,
        isClosable: true,
        position: "top-right",
      });
    }
  } catch (err) {
    console.error("Error sending selected data to DB:", err);
    toast({
      title: "Error!",
      description: "There was an error sending the data.",
      status: "error",
      duration: 5000,
      isClosable: true,
      position: "top-right",
    });
  }
};  

  return (
    <div>

      <Base>
      <Box p={3}>
          <Button colorScheme="green" ml={1050} onClick={handleLoginSuccessful}>
            MahaDBT Login Successful
          </Button>

          <Button colorScheme="red" ml={5} onClick={handleLoginUnsuccessful}>
            MahaDBT Login Unsuccessful
          </Button>
        </Box>
      <Box p={4}>
      <ChakraSelect
        isMulti  // Enables multi-select
        name="multi-select"
        options={options}  // Options for dropdown
        placeholder="Select options"
        closeMenuOnSelect={false}  // Allows multiple selections
        onChange={handleSelectChange}  // Event handler for when selection changes
      />
      <Button colorScheme="blue" mt={4} onClick={handleSubmit}>
        Update Remarks
      </Button>
    </Box>

        <Accordion defaultIndex={[0]} allowMultiple>

          <AccordionItem>
            <h2>
              <AccordionButton sx={{ backgroundColor: 'blue.900', color: 'white' }}>
                <Box as="span" flex="1" textAlign="left">
                  <Heading as="h2" size="md" p={"20px"}>
                    Personal Information
                  </Heading>
                </Box>

                <Button ml="auto" onClick={(e) => { e.stopPropagation(); openModalWithId(); }} colorScheme="blue" size="sm">Edit</Button>
                <Button ml={2} colorScheme={isVerified ? "green" : "red"} size="sm" onClick={(e) => handleVerifyClick(e, 'personal')}>
                  {isVerified ? "Verified" : "Not Verified"}
                </Button>
                <AccordionIcon />
              </AccordionButton>
            </h2>
            <AccordionPanel pb={4}>
              <SimpleGrid columns={3} spacing={10}>
                <Box display={"flex"} justifyContent={"space-between"} alignItems={"center"} p={"10px"}>
                  <Heading pr={2} as="h5" size="sm">
                    Candidate Name (As Per SSC Marksheet)
                  </Heading>
                  <Text fontSize="md">
                    {viewData?.candidateName === null ? "NA" : viewData?.candidateName}
                  </Text>
                </Box>

                <Box display={"flex"} justifyContent={"space-between"} alignItems={"center"} p={"10px"}>
                  <Heading pr={2} as="h5" size="sm">
                    Email
                  </Heading>
                  <Text fontSize="md">
                    {viewData?.email === null ? "NA" : viewData?.email}
                  </Text>
                </Box>

                <Box display={"flex"} justifyContent={"space-between"} alignItems={"center"} p={"10px"}>
                  <Heading pr={2} as="h5" size="sm">
                    Mobile (Student WhatsApp Number)
                  </Heading>
                  <Text fontSize="md">
                    {viewData?.whatsappNumber === null ? "NA" : viewData?.whatsappNumber}
                  </Text>
                </Box>

                <Box display={"flex"} justifyContent={"space-between"} alignItems={"center"} p={"10px"}>
                  <Heading pr={2} as="h5" size="sm">
                    College Ref Code
                  </Heading>
                  <Text fontSize="md">
                    {viewData?.referenceId === null ? "NA" : viewData?.referenceId}
                  </Text>
                </Box>

                <Box display={"flex"} justifyContent={"space-between"} alignItems={"center"} p={"10px"}>
                  <Heading pr={2} as="h5" size="sm">
                    Alternate Mobile Number
                  </Heading>
                  <Text fontSize="md">
                    {viewData?.alternateMobileNumber === null ? "NA" : viewData?.alternateMobileNumber}
                  </Text>
                </Box>

                <Box display={"flex"} justifyContent={"space-between"} alignItems={"center"} p={"10px"}>
                  <Heading pr={2} as="h5" size="sm">
                    MahaDBT Login
                  </Heading>
                  <Text fontSize="md">
                    {viewData?.mahadbt_Login === null ? "NA" : viewData?.mahadbt_Login}
                  </Text>
                </Box>

                <Box display={"flex"} justifyContent={"space-between"} alignItems={"center"} p={"10px"}>
                  <Heading pr={2} as="h5" size="sm">
                    MahaDBT Username
                  </Heading>
                  <Text fontSize="md">
                    {viewData?.Mahadbt_Username === null ? "NA" : viewData?.Mahadbt_Username}
                  </Text>
                </Box>

                <Box display={"flex"} justifyContent={"space-between"} alignItems={"center"} p={"10px"}>
                  <Heading pr={2} as="h5" size="sm">
                    MahaDBT Password
                  </Heading>
                  <Text fontSize="md">
                    {viewData?.Mahadbt_Password === null ? "NA" : viewData?.Mahadbt_Password}
                  </Text>
                </Box>

              </SimpleGrid>
            </AccordionPanel>
          </AccordionItem>

          <AccordionItem>
            <h2>
              <AccordionButton sx={{ backgroundColor: 'blue.700', color: 'white' }}>
                <Box as="span" flex="1" textAlign="left">
                  <Heading as="h2" size="md" p={"20px"}>
                    Income Details
                  </Heading>
                </Box>

                <Button ml="auto" onClick={(e) => { e.stopPropagation(); openIncomeModalWithId(); }} colorScheme="blue" size="sm">Edit</Button>
                <Button ml={2} colorScheme={isIncomeVerified ? "green" : "red"} size="sm" onClick={(e) => handleVerifyClick(e, 'income')}>
                  {isIncomeVerified ? "Verified" : "Not Verified"}
                </Button>
                <AccordionIcon />
              </AccordionButton>
            </h2>
            <AccordionPanel pb={4}>
              <SimpleGrid columns={3} spacing={10}>
                <Box
                  display={"flex"}
                  justifyContent={"space-between"}
                  alignItems={"center"}
                  p={"10px"}
                >
                  <Heading pr={2} as="h5" size="sm">
                    Annual Income
                  </Heading>

                  <Text fontSize="md">
                    {viewData?.annualIncome === null
                      ? "NA"
                      : viewData?.annualIncome}
                  </Text>
                </Box>
                <Box
                  display={"flex"}
                  justifyContent={"space-between"}
                  alignItems={"center"}
                  p={"10px"}
                >
                  <Heading pr={2} as="h5" size="sm">
                    Do you have income certificate ?
                  </Heading>

                  <Text fontSize="md">
                    {viewData?.incomeCertYesNo === null
                      ? "NA"
                      : viewData?.incomeCertYesNo}
                  </Text>
                </Box>

                <Box
                  display={"flex"}
                  justifyContent={"space-between"}
                  alignItems={"center"}
                  p={"10px"}
                >
                  <Heading pr={2} as="h5" size="sm">
                    Income Certificate Number
                  </Heading>

                  <Text fontSize="md">
                    {viewData?.incomeCertNumber === null
                      ? "NA"
                      : viewData?.incomeCertNumber}
                  </Text>
                </Box>

                <Box
                  display={"flex"}
                  justifyContent={"space-between"}
                  alignItems={"center"}
                  p={"10px"}
                >
                  <Heading pr={2} as="h5" size="sm">
                    Income certificate issuing authority
                  </Heading>

                  <Text fontSize="md">
                    {viewData?.incomeIssuingAuthority === null
                      ? "NA"
                      : viewData?.incomeIssuingAuthority}
                  </Text>
                </Box>
                <Box
                  display={"flex"}
                  justifyContent={"space-between"}
                  alignItems={"center"}
                  p={"10px"}
                >
                  <Heading pr={2} as="h5" size="sm">
                    Income certificate issuing date
                  </Heading>

                  <Text fontSize="md">
                    {viewData?.incomeIssueDate === null
                      ? "NA"
                      : viewData?.incomeIssueDate}
                  </Text>
                </Box>
              </SimpleGrid>
            </AccordionPanel>
          </AccordionItem>

          <AccordionItem>
            <h2>
              <AccordionButton sx={{ backgroundColor: 'blue.900', color: 'white' }}>
                <Box as="span" flex="1" textAlign="left">
                  <Heading as="h2" size="md" p={"20px"}>
                    Current Course
                  </Heading>
                </Box>
                <button
                  style={{
                    marginLeft: "auto",
                    padding: "5px 10px",
                    fontSize: "14px",
                    backgroundColor: "#3182CE",
                    color: "white",
                    border: "none",
                    cursor: "pointer",
                    borderRadius: "4px",
                    zIndex: 2,
                  }}
                  onClick={(e) => {
                    e.stopPropagation();
                    openCurrentCourseModalWithId();
                  }}
                >
                  Edit
                </button>
                <Button ml={2} colorScheme={isCurrentCourseVerified ? "green" : "red"} size="sm" onClick={(e) => handleVerifyClick(e, 'current')}>
                  {isCurrentCourseVerified ? "Verified" : "Not Verified"}
                </Button>


                <AccordionIcon />
              </AccordionButton>
            </h2>
            <AccordionPanel pb={4}>
              <SimpleGrid columns={3} spacing={10}>
                <Box
                  display={"flex"}
                  justifyContent={"space-between"}
                  alignItems={"center"}
                  p={"10px"}
                >
                  <Heading pr={2} as="h5" size="sm">
                    Admission Year In Current Course
                  </Heading>

                  <Text fontSize="md">
                    {viewData?.admissionYear === null
                      ? "NA"
                      : viewData?.admissionYear}
                  </Text>
                </Box>

                <Box
                  display={"flex"}
                  justifyContent={"space-between"}
                  alignItems={"center"}
                  p={"10px"}
                >
                  <Heading pr={2} as="h5" size="sm">
                    Institute State
                  </Heading>

                  <Text fontSize="md">
                    {viewData?.instituteState === null
                      ? "NA"
                      : viewData?.instituteState}
                  </Text>
                </Box>

                <Box
                  display={"flex"}
                  justifyContent={"space-between"}
                  alignItems={"center"}
                  p={"10px"}
                >
                  <Heading pr={2} as="h5" size="sm">
                    Institute District
                  </Heading>

                  <Text fontSize="md">
                    {viewData?.instituteDistrict === null
                      ? "NA"
                      : viewData?.instituteDistrict}
                  </Text>
                </Box>

                <Box
                  display={"flex"}
                  justifyContent={"space-between"}
                  alignItems={"center"}
                  p={"10px"}
                >
                  <Heading pr={2} as="h5" size="sm">
                    Institute Taluka
                  </Heading>

                  <Text fontSize="md">
                    {viewData?.instituteTaluka === null
                      ? "NA"
                      : viewData?.instituteTaluka}
                  </Text>
                </Box>

                <Box
                  display={"flex"}
                  justifyContent={"space-between"}
                  alignItems={"center"}
                  p={"10px"}
                >
                  <Heading pr={2} as="h5" size="sm">
                    Qualification Level
                  </Heading>

                  <Text fontSize="md">
                    {viewData?.qualificationLevel === null
                      ? "NA"
                      : viewData?.qualificationLevel}
                  </Text>
                </Box>

                <Box
                  display={"flex"}
                  justifyContent={"space-between"}
                  alignItems={"center"}
                  p={"10px"}
                >
                  <Heading pr={2} as="h5" size="sm">
                    Course Stream
                  </Heading>

                  <Text fontSize="md">
                    {viewData?.courseStream === null
                      ? "NA"
                      : viewData?.courseStream}
                  </Text>
                </Box>

                <Box
                  display={"flex"}
                  justifyContent={"space-between"}
                  alignItems={"center"}
                  p={"10px"}
                >
                  <Heading pr={2} as="h5" size="sm">
                    Institute Name
                  </Heading>

                  <Text fontSize="md">
                    {viewData?.instituteName === null
                      ? "NA"
                      : viewData?.instituteName}
                  </Text>
                </Box>

                <Box
                  display={"flex"}
                  justifyContent={"space-between"}
                  alignItems={"center"}
                  p={"10px"}
                >
                  <Heading pr={2} as="h5" size="sm">
                    Course name
                  </Heading>

                  <Text fontSize="md">
                    {viewData?.coursename === null
                      ? "NA"
                      : viewData?.coursename}
                  </Text>
                </Box>

                <Box
                  display={"flex"}
                  justifyContent={"space-between"}
                  alignItems={"center"}
                  p={"10px"}
                >
                  <Heading pr={2} as="h5" size="sm">
                    Admission Type
                  </Heading>

                  <Text fontSize="md">
                    {viewData?.admissionType === null
                      ? "NA"
                      : viewData?.admissionType}
                  </Text>
                </Box>

                <Box
                  display={"flex"}
                  justifyContent={"space-between"}
                  alignItems={"center"}
                  p={"10px"}
                >
                  <Heading pr={2} as="h5" size="sm">
                    CET / JEE Percentage
                  </Heading>

                  <Text fontSize="md">
                    {viewData?.cetPercentAge === null
                      ? "NA"
                      : viewData?.cetPercentAge}
                  </Text>
                </Box>

                <Box
                  display={"flex"}
                  justifyContent={"space-between"}
                  alignItems={"center"}
                  p={"10px"}
                >
                  <Heading pr={2} as="h5" size="sm">
                    Application Admission ID/CAP ID/CLAT Admit Card No
                  </Heading>

                  <Text fontSize="md">
                    {viewData?.admissionApplicationId === null
                      ? "NA"
                      : viewData?.admissionApplicationId}
                  </Text>
                </Box>

                <Box
                  display={"flex"}
                  justifyContent={"space-between"}
                  alignItems={"center"}
                  p={"10px"}
                >
                  <Heading pr={2} as="h5" size="sm">
                    Admission Letter Doc
                  </Heading>

                  <Link
                    href={
                      viewData?.admissionLetterDoc === null
                        ? "NA"
                        : viewData?.admissionLetterDoc
                    }
                    isExternal
                  >
                    Click! <ExternalLinkIcon mx="2px" />
                  </Link>
                </Box>

                <Box
                  display={"flex"}
                  justifyContent={"space-between"}
                  alignItems={"center"}
                  p={"10px"}
                >
                  <Heading pr={2} as="h5" size="sm">
                    Year Of Study
                  </Heading>

                  <Text fontSize="md">
                    {viewData?.currentYear === null
                      ? "NA"
                      : viewData?.currentYear}
                  </Text>
                </Box>

                <Box
                  display={"flex"}
                  justifyContent={"space-between"}
                  alignItems={"center"}
                  p={"10px"}
                >
                  <Heading pr={2} as="h5" size="sm">
                    Year Of Study Completed Or Pursuing
                  </Heading>

                  <Text fontSize="md">
                    {viewData?.isCompletedPursuing === null
                      ? "NA"
                      : viewData?.isCompletedPursuing}
                  </Text>
                </Box>

                <Box
                  display={"flex"}
                  justifyContent={"space-between"}
                  alignItems={"center"}
                  p={"10px"}
                >
                  <Heading pr={2} as="h5" size="sm">
                    Admission Date
                  </Heading>

                  <Text fontSize="md">
                    {viewData?.admissionDate === null
                      ? "NA"
                      : viewData?.admissionDate}
                  </Text>
                </Box>

                <Box
                  display={"flex"}
                  justifyContent={"space-between"}
                  alignItems={"center"}
                  p={"10px"}
                >
                  <Heading pr={2} as="h5" size="sm">
                    Fees Paid
                  </Heading>

                  <Text fontSize="md">
                    {viewData?.feesPaid === null ? "NA" : viewData?.feesPaid}
                  </Text>
                </Box>

                <Box
                  display={"flex"}
                  justifyContent={"space-between"}
                  alignItems={"center"}
                  p={"10px"}
                >
                  <Heading pr={2} as="h5" size="sm">
                    Upload Fees/Admission Receipt/bonafide certificate
                  </Heading>

                  <Link
                    href={
                      viewData?.feeReceiptDoc === null
                        ? "NA"
                        : viewData?.feeReceiptDoc
                    }
                    isExternal
                  >
                    Click! <ExternalLinkIcon mx="2px" />
                  </Link>
                </Box>

                <Box
                  display={"flex"}
                  justifyContent={"space-between"}
                  alignItems={"center"}
                  p={"10px"}
                >
                  <Heading pr={2} as="h5" size="sm">
                    Upload Fees/Admission Receipt/bonafide certificate
                  </Heading>

                  <Link
                    href={
                      viewData?.feeReceiptDoc === null
                        ? "NA"
                        : viewData?.feeReceiptDoc
                    }
                    isExternal
                  >
                    Click! <ExternalLinkIcon mx="2px" />
                  </Link>
                </Box>

                <Box
                  display={"flex"}
                  justifyContent={"space-between"}
                  alignItems={"center"}
                  p={"10px"}
                >
                  <Heading pr={2} as="h5" size="sm">
                    Is Admission Through Open Or Reserved Category ?
                  </Heading>

                  <Text fontSize="md">
                    {viewData?.admissionCategory === null
                      ? "NA"
                      : viewData?.admissionCategory}
                  </Text>
                </Box>

                <Box
                  display={"flex"}
                  justifyContent={"space-between"}
                  alignItems={"center"}
                  p={"10px"}
                >
                  <Heading pr={2} as="h5" size="sm">
                    Mode Of Study
                  </Heading>

                  <Text fontSize="md">
                    {viewData?.modeStudy === null ? "NA" : viewData?.modeStudy}
                  </Text>
                </Box>
              </SimpleGrid>
            </AccordionPanel>
          </AccordionItem>

          <AccordionItem>
            <h2>
              <AccordionButton sx={{ backgroundColor: 'blue.700', color: 'white' }}>
                <Box as="span" flex="1" textAlign="left">
                  <Heading as="h2" size="md" p={"20px"}>
                    Hostel Details
                  </Heading>
                </Box>

                <Button ml="auto" onClick={(e) => { e.stopPropagation(); openHostelModalWithId(); }} colorScheme="blue" size="sm">Edit</Button>
                <Button ml={2} colorScheme={isHostelVerified ? "green" : "red"} size="sm" onClick={(e) => handleVerifyClick(e, 'hostel')}>
                  {isHostelVerified ? "Verified" : "Not Verified"}
                </Button>
                <AccordionIcon />
              </AccordionButton>
            </h2>
            <AccordionPanel pb={4}>
              <SimpleGrid columns={3} spacing={10}>
                <Box
                  display={"flex"}
                  justifyContent={"space-between"}
                  alignItems={"center"}
                  p={"10px"}
                >
                  <Heading pr={2} as="h5" size="sm">
                    Are you a Hosteller or Day Scholar
                  </Heading>

                  <Text fontSize="md">
                    {viewData?.areYouHostellerDayScholar === null
                      ? "NA"
                      : viewData?.areYouHostellerDayScholar}
                  </Text>
                </Box>

                <Box
                  display={"flex"}
                  justifyContent={"space-between"}
                  alignItems={"center"}
                  p={"10px"}
                >
                  <Heading pr={2} as="h5" size="sm">
                    Hostel Type
                  </Heading>

                  <Text fontSize="md">
                    {viewData?.hostelType === null
                      ? "NA"
                      : viewData?.hostelType}
                  </Text>
                </Box>

                <Box
                  display={"flex"}
                  justifyContent={"space-between"}
                  alignItems={"center"}
                  p={"10px"}
                >
                  <Heading pr={2} as="h5" size="sm">
                    Hostel/ P.G/Rented House Name
                  </Heading>

                  <Text fontSize="md">
                    {viewData?.hostelPgName === null
                      ? "NA"
                      : viewData?.hostelPgName}
                  </Text>
                </Box>

                <Box
                  display={"flex"}
                  justifyContent={"space-between"}
                  alignItems={"center"}
                  p={"10px"}
                >
                  <Heading pr={2} as="h5" size="sm">
                    Hostel/ P.G/Rented House Address
                  </Heading>

                  <Text fontSize="md">
                    {viewData?.hostelPgAddress === null
                      ? "NA"
                      : viewData?.hostelPgAddress}
                  </Text>
                </Box>

                <Box
                  display={"flex"}
                  justifyContent={"space-between"}
                  alignItems={"center"}
                  p={"10px"}
                >
                  <Heading pr={2} as="h5" size="sm">
                    Hostel Pin Code
                  </Heading>

                  <Text fontSize="md">
                    {viewData?.hostelPgPincode === null
                      ? "NA"
                      : viewData?.hostelPgPincode}
                  </Text>
                </Box>

                <Box
                  display={"flex"}
                  justifyContent={"space-between"}
                  alignItems={"center"}
                  p={"10px"}
                >
                  <Heading pr={2} as="h5" size="sm">
                    Hostel Admission Date
                  </Heading>

                  <Text fontSize="md">
                    {viewData?.hostelAdmissionDate === null
                      ? "NA"
                      : viewData?.hostelAdmissionDate}
                  </Text>
                </Box>

                <Box
                  display={"flex"}
                  justifyContent={"space-between"}
                  alignItems={"center"}
                  p={"10px"}
                >
                  <Heading pr={2} as="h5" size="sm">
                    Is mess available ?
                  </Heading>

                  <Text fontSize="md">
                    {viewData?.isMessAvailable === null
                      ? "NA"
                      : viewData?.isMessAvailable}
                  </Text>
                </Box>

                <Box
                  display={"flex"}
                  justifyContent={"space-between"}
                  alignItems={"center"}
                  p={"10px"}
                >
                  <Heading pr={2} as="h5" size="sm">
                    Rent per month ?
                  </Heading>

                  <Text fontSize="md">
                    {viewData?.rentPerMonth === null
                      ? "NA"
                      : viewData?.rentPerMonth}
                  </Text>
                </Box>

              </SimpleGrid>
            </AccordionPanel>
          </AccordionItem>

          <AccordionItem>
            <h2>
              <AccordionButton sx={{ backgroundColor: 'blue.900', color: 'white' }}>
                <Box as="span" flex="1" textAlign="left">
                  <Heading as="h2" size="md" p={"20px"}>
                    Scheme Wise Details
                  </Heading>
                </Box>
                <button
                  style={{
                    marginLeft: "auto",
                    padding: "5px 10px",
                    fontSize: "14px",
                    backgroundColor: "#3182CE",
                    color: "white",
                    border: "none",
                    cursor: "pointer",
                    borderRadius: "4px",
                    zIndex: 2,
                  }}
                  onClick={(e) => {
                    e.stopPropagation();
                    openSchemeModalWithId();
                  }}
                >
                  Edit
                </button>

                <Button ml={2} colorScheme={isSchemeVerified ? "green" : "red"} size="sm" onClick={(e) => handleVerifyClick(e, 'scheme')}>
                  {isSchemeVerified ? "Verified" : "Not Verified"}
                </Button>
                <AccordionIcon />
              </AccordionButton>
            </h2>
            <AccordionPanel pb={4}>
              <SimpleGrid columns={3} spacing={10}>
                <Box
                  display={"flex"}
                  justifyContent={"space-between"}
                  alignItems={"center"}
                  p={"10px"}
                >
                  <Heading pr={2} as="h5" size="sm">
                    Previous year application id
                  </Heading>

                  <Text fontSize="md">
                    {viewData?.previousYearApplicationId === null
                      ? "NA"
                      : viewData?.previousYearApplicationId}
                  </Text>
                </Box>

                <Box
                  display={"flex"}
                  justifyContent={"space-between"}
                  alignItems={"center"}
                  p={"10px"}
                >
                  <Heading pr={2} as="h5" size="sm">
                    Number of beneficiary in family ?
                  </Heading>

                  <Text fontSize="md">
                    {viewData?.numberOfBeneficiaryInFamily === null
                      ? "NA"
                      : viewData?.numberOfBeneficiaryInFamily}
                  </Text>
                </Box>

                <Box
                  display={"flex"}
                  justifyContent={"space-between"}
                  alignItems={"center"}
                  p={"10px"}
                >
                  <Heading pr={2} as="h5" size="sm">
                    How many boy child ?
                  </Heading>

                  <Text fontSize="md">
                    {viewData?.howManyBoysChild === null
                      ? "NA"
                      : viewData?.howManyBoysChild}
                  </Text>
                </Box>

                <Box
                  display={"flex"}
                  justifyContent={"space-between"}
                  alignItems={"center"}
                  p={"10px"}
                >
                  <Heading pr={2} as="h5" size="sm">
                    Is your parent AlphaBhuDharak
                  </Heading>

                  <Text fontSize="md">
                    {viewData?.isYourParentAlphabhudarak === null
                      ? "NA"
                      : viewData?.isYourParentAlphabhudarak}
                  </Text>
                </Box>

                <Box
                  display={"flex"}
                  justifyContent={"space-between"}
                  alignItems={"center"}
                  p={"10px"}
                >
                  <Heading pr={2} as="h5" size="sm">
                    Is your parent registered labour ?
                  </Heading>

                  <Text fontSize="md">
                    {viewData?.isRegisteredLabour === null
                      ? "NA"
                      : viewData?.isRegisteredLabour}
                  </Text>
                </Box>

                <Box
                  display={"flex"}
                  justifyContent={"space-between"}
                  alignItems={"center"}
                  p={"10px"}
                >
                  <Heading pr={2} as="h5" size="sm">
                    Admitted under EWS ?
                  </Heading>

                  <Text fontSize="md">
                    {viewData?.admittedUnderEws === null
                      ? "NA"
                      : viewData?.admittedUnderEws}
                  </Text>
                </Box>

                

              </SimpleGrid>
            </AccordionPanel>
          </AccordionItem>

        </Accordion>

        <PersonalInfoVerificationDialog
          isOpen={isPersonalDialogOpen}
          onClose={() => setIsPersonalDialogOpen(false)}
          onConfirm={confirmPersonalVerification}
        />

        <IncomeDetailsVerificationDialog
          isOpen={isIncomeDialogOpen}
          onClose={() => setIsIncomeDialogOpen(false)}
          onConfirm={confirmIncomeVerification}
        />

        <CurrentCourseDialog
          isOpen={isCurrentCourseDialogOpen}
          onClose={() => setIsCurrentCourseDialogOpen(false)}
          onConfirm={confirmCurrentCourseVerification}
        />

        <HostelDialog
          isOpen={isHostelDialogOpen}
          onClose={() => setIsHostelDialogOpen(false)}
          onConfirm={confirmHostelVerification}
        />

        <SchemeDialog
          isOpen={isSchemeDialogOpen}
          onClose={() => setIsSchemeDialogOpen(false)}
          onConfirm={confirmSchemeVerification}
        />

        <Edit_Prsnl_Renewal_Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} id={selectedId} />
        {/* <Upload_Document_Modal isOpen={isModalOpenUpload} onClose={() => setisModalOpenUpload(false)}  /> */}
        <Edit_Income_Renewal_Modal isOpen={isIncomeModalOpen} onClose={() => setIsIncomeModalOpen(false)} id={selectedId} />
        <Edit_Current_Course_Renewal_Modal isOpen={isCurrentCourseModalOpen} onClose={() => setIsCurrentCourseModalOpen(false)} id={selectedId} />
        <Edit_Hostel_Renewal_Modal isOpen={isHostelModalOpen} onClose={() => setIsHostelModalOpen(false)} id={selectedId} />
        <Edit_Scheme_Renewal_Modal isOpen={isSchemeModalOpen} onClose={() => setIsSchemeModalOpen(false)} id={selectedId} />

      </Base>
    </div>
  );
}

export default viewRenewalStudents;