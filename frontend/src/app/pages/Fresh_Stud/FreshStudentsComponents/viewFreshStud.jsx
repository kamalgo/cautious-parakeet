import { Progress } from '@chakra-ui/react';
import CustomCard from '../RenewalStudentsComponents/CustomCard';
// import CustomCard from "./CustomCard";
import React, { useEffect, useState } from "react";
import { Select as ChakraSelect } from "chakra-react-select";  // Import chakra-react-select
import { useParams, Link } from 'react-router-dom';
import { useToast } from "@chakra-ui/react";
import { ExternalLinkIcon } from "@chakra-ui/icons"; // Import ExternalLinkIcon from Chakra UI
import {
  Box, Heading, SimpleGrid, Text, Button, useDisclosure, AlertDialog, AlertDialogBody, AlertDialogFooter, AlertDialogHeader, AlertDialogContent,
  AlertDialogOverlay, Accordion, AccordionItem, AccordionButton, AccordionPanel, AccordionIcon, Icon, Badge
} from "@chakra-ui/react";
import { FiAlertCircle } from "react-icons/fi"; // Example: FiAlertCircle from React Icons
import Base from "../../../components/Base";
import {
  appPending, appSubmitted, markLoginUnsuccessful, markLoginSuccessful, renewalStudentProfileView, updatePersonalInfo, updateIncomeDetails, updateCurrentCourseDetails,
  updateHostelDetails, updateSchemeDetails, sendSelectedDataToDB
} from "../../../api/RenewalStudentsApi/RenewalStudentsApi";

import { fetchRecordDetails } from '../../../api/FreshStudApi/FreshStudApi';


// import Edit_Prsnl_Renewal_Modal from "./Edit_Prsnl_Renewal_Modal";
import Edit_Prsnl_Renewal_Modal from '../../Renewal_Students/RenewalStudentsComponents/Edit_Prsnl_Renewal_Modal';
import Edit_Prsnl_FreshStud_Modal from './Edit_Prsnl_FreshStud_Modal';
// import Edit_Income_Renewal_Modal from "./Edit_Income_Renewal_Modal";
import Edit_Caste_FreshStud_Model from './Edit_Caste_FreshStud_Model';
// import Edit_Income_Renewal_Modal from '../../Renewal_Students/RenewalStudentsComponents/Edit_Income_Renewal_Modal';
import Edit_Income_FreshStud_Modal from './Edit_Income_FreshStud_Modal';
import Edit_Domi_FreshStud_Modal from './Edit_Domi_FreshStud_Modal';
// import Edit_Current_Course_Renewal_Modal from "./Edit_Current_Course_Renewal_Modal";
// import Edit_Current_Course_Renewal_Modal from '../../Renewal_Students/RenewalStudentsComponents/Edit_Current_Course_Renewal_Modal';
import Edit_Current_Course_Fresh_Modal from './Edit_Current_Course_Fresh_Modal';
import Edit_10th_FreshStud_Modal from './Edit_10th_FreshStud_Modal';
import Edit_12th_FreshStud_Modal from './Edit_12th_FreshStud_Modal';
// import Edit_Hostel_Renewal_Modal from "./Edit_Hostel_Renewal_Modal";
// import Edit_Hostel_Renewal_Modal from '../../Renewal_Students/RenewalStudentsComponents/Edit_Hostel_Renewal_Modal';
import Edit_Hostel_Fresh_Modal from './Edit_Hostel_Fresh_Modal';
// import Edit_Scheme_Renewal_Modal from "./Edit_Scheme_Renewal_Modal";
import Edit_Scheme_Renewal_Modal from '../../Renewal_Students/RenewalStudentsComponents/Edit_Scheme_Renewal_Modal';
// import PersonalInfoVerificationDialog from "./verificationDialogs/PersonalInfoVerificationDialog";
import PersonalInfoVerificationDialog from '../../Renewal_Students/RenewalStudentsComponents/verificationDialogs/PersonalInfoVerificationDialog';
// import IncomeDetailsVerificationDialog from "./verificationDialogs/IncomeDetailsVerificationDialog";
import IncomeDetailsVerificationDialog from '../../Renewal_Students/RenewalStudentsComponents/verificationDialogs/IncomeDetailsVerificationDialog';
// import CurrentCourseDialog from "./verificationDialogs/CurrentCourseDialog";
import CurrentCourseDialog from '../../Renewal_Students/RenewalStudentsComponents/verificationDialogs/CurrentCourseDialog';
// import HostelDialog from "./verificationDialogs/HostelDialog";
import HostelDialog from '../../Renewal_Students/RenewalStudentsComponents/verificationDialogs/HostelDialog';
// import SchemeDialog from "./verificationDialogs/SchemeDialog";
import SchemeDialog from '../../Renewal_Students/RenewalStudentsComponents/verificationDialogs/SchemeDialog';

function viewFreshStud() {

  const [docSize, setDocSize] = useState(null);
  const [viewData, setViewData] = useState([]);
  const [refreshRemarks, setRefreshRemarks] = useState(0);

  const toast = useToast();  // Initialize toast once for the component
  const [selectedOptions, setSelectedOptions] = useState([]);

  const [isVerified, setIsVerified] = useState(false);
  const [isIncomeVerified, setIsIncomeVerified] = useState(false);
  const [isCurrentCourseVerified, setIsCurrentCourseVerified] = useState(false);
  const [isHostelVerified, setIsHostelVerified] = useState(false);
  const [isSchemeVerified, setIsSchemeVerified] = useState(false);



  //Modals for edit button
  const [selectedId, setSelectedId] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isCasteModalOpen, setIsCasteModalOpen]  = useState(false);
  const [isIncomeModalOpen, setIsIncomeModalOpen] = useState(false);
  const [isDomiModalOpen, setIsDomiModalOpen] = useState(false);
  const [isCurrentCourseModalOpen, setIsCurrentCourseModalOpen] = useState(false);
  const [is10thModalOpen, setIs10thModalOpen] = useState(false);
  const [is12thModalOpen, setIs12thModalOpen] = useState(false);
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
        const response = await fetchRecordDetails(id);

        console.log("Full API Response:", response.data);


        // Ensure response is correctly set
        if (response && response.data) {
          setViewData(response.data);
          setIsVerified(response.data.personalInfo_verified === 'yes');
          setIsIncomeVerified(response.data.incomeDetails_verified === 'yes');
          setIsCurrentCourseVerified(response.data.currentCourse_verified === 'yes');
          setIsHostelVerified(response.data.hostelDetails_verified === 'yes');
          setIsSchemeVerified(response.data.schemeWise_verified === 'yes');
          console.log("Scheme Verified Status on Fetch:", response.data.scheme_verified);

          // Parse the remarks from the response
          const remarks = JSON.parse(response.data.remarks || '[]');
          console.log("Parsed Remarks:", remarks); // Log the parsed remarks
          setRemarks(remarks);


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
        const updatedResponse = await fetchRecordDetails({ id });
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

  // Confirmation for Confirm Verification
  const confirmSchemeVerification = async (verificationStatus) => {
    try {
      const response = await updateSchemeDetails(id, verificationStatus);
      console.log("API Response:", response); // Check the response
      if (response.success) {
        setIsSchemeVerified(verificationStatus === 'yes');
        console.log("Verification Status:", verificationStatus === 'yes'); // Log the status being set
      }
    } catch (err) {
      console.error("Error updating scheme verification status:", err);
    } finally {
      setIsSchemeDialogOpen(false);
    }
  };

  useEffect(() => {
    console.log("Scheme verified status:", isSchemeVerified);
  }, [isSchemeVerified]);


  const openModalWithId = () => {
    setSelectedId(id);
    setIsModalOpen(true);
  };

  
  const openCasteModalWithId = () => {
    setSelectedId(id);
    setIsCasteModalOpen(true);
  };

  const openIncomeModalWithId = () => {
    setSelectedId(id);
    setIsIncomeModalOpen(true);
  };

  const openDomiModalWithId = () => {
    setSelectedId(id);
    setIsDomiModalOpen(true);
  };

  const openCurrentCourseModalWithId = () => {
    setSelectedId(id);
    setIsCurrentCourseModalOpen(true);
  };

  const open10thModalWithId = () => {
    setSelectedId(id);
    setIs10thModalOpen(true);
  };
    
  const open12thModalWithId = () => {
    setSelectedId(id);
    setIs12thModalOpen(true);
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


  //Handle App Submitted
  const handleAppSubmitted = async () => {
    try {
      const response = await appSubmitted(id); // Assuming 'id' is defined in your component
      if (response.success) {
        toast({
          title: "Success!",
          description: "Application marked as Submitted.",
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

  //Handle App Submitted
  // Handle successful login
  const handleAppPending = async () => {
    try {
      const response = await appPending(id); // Assuming 'id' is defined in your component
      if (response.success) {
        toast({
          title: "Success!",
          description: "Application marked as Pending.",
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
    { value: "Personal Information Missing", label: "Personal Information Missing" },
    { value: "Income Details Missing", label: "Income Details Missing" },
    { value: "Current Course Details Missing", label: "Current Course Details Missing" },
    { value: "Hostel Details Missing", label: "Hostel Details Missing" },
    { value: "Scheme Details Missing", label: "Scheme Details Missing" },
    { value: "Invalid Income Details", label: "Invalid Income Details" },
    { value: "Invalid Current Course Details", label: "Invalid Current Course Details" },
    { value: "Invalid Hostel Details", label: "Invalid Hostel Details" },
    { value: "Invalid Scheme Details", label: "Invalid Scheme Details" },
    { value: "Income Certificate Upload Pending", label: "Income Certificate Upload Pending" },
    { value: "Blurred Copy of Income Certificate Uploaded", label: "Blurred Copy of Income Certificate Uploaded" },
    { value: "Income Certificate is of Previous Year", label: "Income Certificate is of Previous Year" },
    { value: "Invalid Income Certificate", label: "Invalid Income Certificate" },
    { value: "Previous Marksheet Upload Pending", label: "Previous Marksheet Upload Pending" },
    { value: "Blurred Copy of Previous Marksheet Uploaded", label: "Blurred Copy of Previous Marksheet Uploaded" },
    { value: "Copy of Both Semester Required", label: "Copy of Both Semester Required" },
    { value: "Invalid Previous Year Marksheet", label: "Invalid Previous Year Marksheet" },
    //income cert
    { value: "Incorrect Income Certificate Uploaded", label: "Incorrect Income Certificate Uploaded" },
    { value: "Mismatched Details on the Income Certificate", label: "Mismatched Details on the Income Certificate" },
    //Marksheet
    { value: "Previous Marksheet Upload Pending", label: "Previous Marksheet Upload Pending" },
    { value: "Blurred or Unclear Previous Marksheet", label: "Blurred or Unclear Previous Marksheet" },
    // { value: "Previous Marksheet is of an Incorrect Year", label: "Previous Marksheet is of an Incorrect Year" },
    //Fee Receipt
    { value: "Fee Receipt Upload Pending", label: "Fee Receipt Upload Pending" },
    { value: "Blurred or Unclear Fee Receipt", label: "Blurred or Unclear Fee Receipt" },
    { value: "Incorrect Fee Receipt Uploaded", label: "Incorrect Fee Receipt Uploaded" },
    { value: "Fee Receipt Not Signed or Stamped", label: "Fee Receipt Not Signed or Stamped" },
    { value: "Fee Receipt for a Different Term/Period", label: "Fee Receipt for a Different Term/Period" },
    //Bonafide
    { value: "Bonafide Certificate Upload Pending", label: "Bonafide Certificate Upload Pending" },
    { value: "Blurred or Unclear Bonafide Certificate", label: "Blurred or Unclear Bonafide Certificate" },
    { value: "Bonafide Certificate Expired", label: "Bonafide Certificate Expired" },
    //CAP Allotment 
    { value: "CAP Allotment Letter Not Uploaded", label: "CAP Allotment Letter Not Uploaded" },
    { value: "Blurred or Unclear CAP Allotment Letter", label: "Blurred or Unclear CAP Allotment Letter" },
    { value: "CAP Allotment Not Signed or Stamped", label: "CAP Allotment Not Signed or Stamped" },
    //Hostel Warden
    { value: "Hostel Warden Certificate Not Uploaded", label: "Hostel Warden Certificate Not Uploaded" },
    { value: "Combined Copy of Hostel Warden Certificate and Hostel Fee Receipt Not Uploaded", label: "Combined Copy of Hostel Warden Certificate and Hostel Fee Receipt Not Uploaded" },
    { value: "Blurred or Unclear Hostel Warden Certificate", label: "Blurred or Unclear Hostel Warden Certificate" },
    { value: "Expired Hostel Warden Certificate", label: "Expired Hostel Warden Certificate" },
    //Alpabhudarak
    { value: "Alpabhudarak Certificate Not Uploaded", label: "Alpabhudarak Certificate Not Uploaded" },
    { value: "Blurred or Unclear Alpabhudarak Certificate", label: "Blurred or Unclear Alpabhudarak Certificate" },
    { value: "Expired Alpabhudarak Certificate", label: "Expired Alpabhudarak Certificate" },
    //Declaration
    { value: "Declaration Certificate Not Uploaded", label: "Declaration Certificate Not Uploaded" },
    { value: "Blurred or Unclear Declaration Certificate", label: "Blurred or Unclear Declaration Certificate" },
    { value: "Expired Declaration Certificate", label: "Expired Declaration Certificate" },
    { value: "Declaration Certificate Missing Key Details", label: "Declaration Certificate Missing Key Details" },
    //Labour Certificate
    { value: "Labour Certificate Not Uploaded", label: "Labour Certificate Not Uploaded" },
    { value: "Blurred or Unclear Labour Certificate", label: "Blurred or Unclear Labour Certificate" },
    { value: "Expired Labour Certificate", label: "Expired Labour Certificate" },
    //EWS
    { value: "EWS Certificate Not Uploaded", label: "EWS Certificate Not Uploaded" },
    { value: "Blurred or Unclear EWS Certificate", label: "Blurred or Unclear EWS Certificate" },
    { value: "Expired EWS Certificate", label: "Expired EWS Certificate" },
  ];


  // Handle changes in dropdown
  const handleSelectChange = (selected) => {
    setSelectedOptions(selected);
  };

  const handleSubmit = async () => {
    try {
      const selectedValues = selectedOptions.map(option => option.value);
      const response = await sendSelectedDataToDB(id, selectedValues);
      if (response.success) {
        toast({
          title: 'Success!',
          description: 'Data sent to the database successfully.',
          status: 'success',
          duration: 5000,
          isClosable: true,
          position: 'top-right',
        });
        setRefreshRemarks(prev => prev + 1); // Increment the state to trigger re-render
      } else {
        toast({
          title: 'Failed!',
          description: 'Failed to send data to the database.',
          status: 'error',
          duration: 5000,
          isClosable: true,
          position: 'top-right',
        });
      }
    } catch (err) {
      console.error('Error sending selected data to DB:', err);
      toast({
        title: 'Error!',
        description: 'There was an error sending the data.',
        status: 'error',
        duration: 5000,
        isClosable: true,
        position: 'top-right',
      });
    }
  };

  const [remarks, setRemarks] = useState([]);

  const handleRemoveRemark = (index) => {
    setRemarks(prevRemarks => prevRemarks.filter((_, i) => i !== index));
  };

  console.log("admission caste category", viewData?.admissionCasteCategory);  // Should output exactly "OBC"
  console.log("View data", viewData);  // Logs the entire viewData object


  //this is for the size of the document
  // useEffect(() => {
  //   const fetchFileSize = async () => {
  //     if (viewData?.casteDoc) {
  //       try {
  //         const response = await fetch(viewData.casteDoc, { method: "HEAD" });
  //         const size = response.headers.get("content-length");
  //         if (size) {
  //           setDocSize((size / 1024).toFixed(2)); // Convert bytes to KB and round off
  //         }
  //       } catch (error) {
  //         console.error("Error fetching file size:", error);
  //       }
  //     }
  //   };
  //   fetchFileSize();
  // }, [viewData?.casteDoc]);


  return (
    <div>

      <Base>
        {/* <div>
          <Progress value={40} hasStripe size="lg" colorScheme="twitter" is />
        </div> */}
        <Box p={3}>
          <Button colorScheme="green" ml={1050} onClick={handleAppSubmitted}>
            Application Submitted
          </Button>

          <Button colorScheme="red" ml={5} onClick={handleAppPending}>
            Application Pending
          </Button>

        </Box>
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

        <CustomCard
          title="Remarks"
          id={id}
          key={refreshRemarks} // Ensure CustomCard is re-rendered when refreshRemarks changes
        />




        <Accordion defaultIndex={[0]} allowMultiple>

          <AccordionItem>
            <h2>
              <AccordionButton sx={{ backgroundColor: 'blue.700', color: 'white' }}>
                <Box as="span" flex="1" textAlign="left" display="flex" alignItems="center">
                  <Heading as="h2" size="md" p={"20px"}>
                    Personal Information
                    {/* Badge to show missing fields count */}
                    {(() => {
                      const fields = [
                        viewData?.candidateName,
                        viewData?.email,
                        viewData?.whatsappNumber,
                        viewData?.refCode,
                        viewData?.alternateMobileNumber,
                        viewData?.mahadbt_Login,
                        viewData?.mahabdtUsername,
                        viewData?.hash_password
                      ];
                      // const missingFieldsCount = fields.filter(field => field === null).length;
                      const missingFieldsCount = fields.filter(field => !field || field.trim?.() === "").length;

                      return missingFieldsCount > 0 && (
                        <Badge ml={3} colorScheme="red" fontSize="0.8em">
                          {missingFieldsCount} Fields Missing
                        </Badge>
                      );
                    })()}
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

                {/* Candidate Name
                <Box display={"flex"} justifyContent={"space-between"} alignItems={"center"} p={"10px"}>
                  <Heading pr={2} as="h5" size="sm">
                    Candidate Name (As Per SSC Marksheet)
                  </Heading>
                  <Box display="flex" alignItems="center">
                    {viewData?.candidateName === null ? (
                      <>
                        <Icon as={FiAlertCircle} color="red.500" boxSize={5} mr={2} />
                        <Text fontSize="md">Missing</Text>
                      </>
                    ) : (
                      <Text fontSize="md">{viewData?.candidateName}</Text>
                    )}
                  </Box>
                </Box> */}


                {/* Candidate Name */}
                <Box display={"flex"} justifyContent={"space-between"} alignItems={"center"} p={"10px"}>
                  <Heading pr={2} as="h5" size="sm">
                    Candidate Name (As Per SSC Marksheet)
                  </Heading>
                  <Box display="flex" alignItems="center">
                    {!viewData?.candidateName || viewData?.candidateName.trim?.() === "" ? (
                      <>
                        <Icon as={FiAlertCircle} color="red.500" boxSize={5} mr={2} />
                        <Text fontSize="md">Missing</Text>
                      </>
                    ) : (
                      <Text fontSize="md">{viewData?.candidateName}</Text>
                    )}
                  </Box>
                </Box>




                {/* Email */}
                <Box display={"flex"} justifyContent={"space-between"} alignItems={"center"} p={"10px"}>
                  <Heading pr={2} as="h5" size="sm">
                    Email
                  </Heading>
                  <Box display="flex" alignItems="center">
                  {!viewData?.email || viewData?.email.trim?.() === "" ? (
                      <>
                        <Icon as={FiAlertCircle} color="red.500" boxSize={5} mr={2} />
                        <Text fontSize="md">Missing</Text>
                      </>
                    ) : (
                      <Text fontSize="md">{viewData?.email}</Text>
                    )}
                  </Box>
                </Box>

                {/* Mobile (Student WhatsApp Number) */}
                <Box display={"flex"} justifyContent={"space-between"} alignItems={"center"} p={"10px"}>
                  <Heading pr={2} as="h5" size="sm">
                    Mobile (Student WhatsApp Number)
                  </Heading>
                  <Box display="flex" alignItems="center">
                  {!viewData?.whatsappNumber || viewData?.whatsappNumber.trim?.() === "" ? (
                      <>
                        <Icon as={FiAlertCircle} color="red.500" boxSize={5} mr={2} />
                        <Text fontSize="md">Missing</Text>
                      </>
                    ) : (
                      <Text fontSize="md">{viewData?.whatsappNumber}</Text>
                    )}
                  </Box>
                </Box>

                {/* College Ref Code */}
                <Box display={"flex"} justifyContent={"space-between"} alignItems={"center"} p={"10px"}>
                  <Heading pr={2} as="h5" size="sm">
                    College Ref Code
                  </Heading>
                  <Box display="flex" alignItems="center">
                  {!viewData?.refCode || viewData?.refCode.trim?.() === "" ? (
                      <>
                        <Icon as={FiAlertCircle} color="red.500" boxSize={5} mr={2} />
                        <Text fontSize="md">Missing</Text>
                      </>
                    ) : (
                      <Text fontSize="md">{viewData?.refCode}</Text>
                    )}
                  </Box>
                </Box>

                {/* Alternate Mobile Number */}
                <Box display={"flex"} justifyContent={"space-between"} alignItems={"center"} p={"10px"}>
                  <Heading pr={2} as="h5" size="sm">
                    Alternate Mobile Number
                  </Heading>
                  <Box display="flex" alignItems="center">
                  {!viewData?.alternateMobileNumber || viewData?.alternateMobileNumber.trim?.() === "" ? (
                      <>
                        <Icon as={FiAlertCircle} color="red.500" boxSize={5} mr={2} />
                        <Text fontSize="md">Missing</Text>
                      </>
                    ) : (
                      <Text fontSize="md">{viewData?.alternateMobileNumber}</Text>
                    )}
                  </Box>
                </Box>

                {/* MahaDBT Login */}
                <Box display={"flex"} justifyContent={"space-between"} alignItems={"center"} p={"10px"}>
                  <Heading pr={2} as="h5" size="sm">
                    MahaDBT Login
                  </Heading>
                  <Box display="flex" alignItems="center">
                  {!viewData?.mahadbt_Login || viewData?.mahadbt_Login.trim?.() === "" ? (
                      <>
                        <Icon as={FiAlertCircle} color="red.500" boxSize={5} mr={2} />
                        <Text fontSize="md">Missing</Text>
                      </>
                    ) : (
                      <Text fontSize="md">{viewData?.mahadbt_Login}</Text>
                    )}
                  </Box>
                </Box>

                {/* MahaDBT Username */}
                <Box display={"flex"} justifyContent={"space-between"} alignItems={"center"} p={"10px"}>
                  <Heading pr={2} as="h5" size="sm">
                    MahaDBT Username
                  </Heading>
                  <Box display="flex" alignItems="center">
                  {!viewData?.mahabdtUsername || viewData?.mahabdtUsername.trim?.() === "" ? (
                      <>
                        <Icon as={FiAlertCircle} color="red.500" boxSize={5} mr={2} />
                        <Text fontSize="md">Missing</Text>
                      </>
                    ) : (
                      <Text fontSize="md">{viewData?.mahabdtUsername}</Text>
                    )}
                  </Box>
                </Box>

                {/* MahaDBT Password */}
                {/* <Box display={"flex"} justifyContent={"space-between"} alignItems={"center"} p={"10px"}>
                  <Heading pr={2} as="h5" size="sm">
                    MahaDBT Password
                  </Heading>
                  <Box display="flex" alignItems="center">
                    {viewData?.hash_password === null ? (
                      <>
                        <Icon as={FiAlertCircle} color="red.500" boxSize={5} mr={2} />
                        <Text fontSize="md">Missing</Text>
                      </>
                    ) : (
                      <Text fontSize="md">{viewData?.hash_password}</Text>
                    )}
                  </Box>
                </Box> */}

                <Box display={"flex"} justifyContent={"space-between"} alignItems={"center"} p={"10px"}>
                  <Heading pr={2} as="h5" size="sm">
                    MahaDBT Password
                  </Heading>
                  <Box display="flex" alignItems="center" maxW="300px" overflow="hidden">
                  {!viewData?.hash_password || viewData?.hash_password.trim?.() === "" ? (

                      <>
                        <Icon as={FiAlertCircle} color="red.500" boxSize={5} mr={2} />
                        <Text fontSize="md">Missing</Text>
                      </>
                    ) : (
                      <Box
                        maxW="100%"
                        overflow="hidden"
                        whiteSpace="nowrap"
                        textOverflow="ellipsis"
                        wordBreak="break-word"
                      >
                        <Text fontSize="md">{viewData?.hash_password}</Text>
                      </Box>
                    )}
                  </Box>
                </Box>





                {/* Aadhaar Number */}
                <Box display={"flex"} justifyContent={"space-between"} alignItems={"center"} p={"10px"}>
                  <Heading pr={2} as="h5" size="sm">
                    Aadhaar Number
                  </Heading>
                  <Box display="flex" alignItems="center">
                  {!viewData?.aadhaar_number || viewData?.aadhaar_number.trim?.() === "" ? (
                      <>
                        <Icon as={FiAlertCircle} color="red.500" boxSize={5} mr={2} />
                        <Text fontSize="md">Missing</Text>
                      </>
                    ) : (
                      <Text fontSize="md">{viewData?.aadhaar_number}</Text>
                    )}
                  </Box>
                </Box>

              </SimpleGrid>
            </AccordionPanel>
          </AccordionItem>

          <AccordionItem>
            <h2>
              <AccordionButton sx={{ backgroundColor: 'blue.700', color: 'white' }}>
                <Box as="span" flex="1" textAlign="left" display="flex" alignItems="center">
                  <Heading as="h2" size="md" p={"20px"}>
                    Caste Details
                  </Heading>

                  {/* Badge to show missing fields count */}
                  {(() => {
                    const fields = [
                      viewData?.casteCategory,
                      viewData?.subCaste,
                      viewData?.doYouHaveCasteCertificate,
                      viewData?.casteCertificateNumber,
                      viewData?.casteIssuedDistrict,
                      viewData?.casteApplicantName,
                      viewData?.casteIssAuthority,
                      viewData?.casteIssuedDate,                      
                    ];
                    // const missingFieldsCount = fields.filter((field) => field === null).length;
                    const missingFieldsCount = fields.filter(field => !field || field.trim?.() === "").length;

                    return missingFieldsCount > 0 && (
                      <Badge ml={3} colorScheme="red" fontSize="0.8em">
                        {missingFieldsCount} Fields Missing
                      </Badge>
                    );
                  })()}

                  {/* Badge to show missing documents count */}
                  {(() => {
                    const documents = [viewData?.casteDoc];
                    const missingDocumentsCount = documents.filter((doc) => doc === null || doc === "").length;

                    return missingDocumentsCount > 0 && (
                      <Badge ml={3} colorScheme="red" fontSize="0.8em">
                        {missingDocumentsCount} Documents Missing
                      </Badge>
                    );
                  })()}
                </Box>

                <Button ml="auto" onClick={(e) => { e.stopPropagation(); openCasteModalWithId(); }} colorScheme="blue" size="sm">Edit</Button>
                <Button ml={2} colorScheme={isIncomeVerified ? "green" : "red"} size="sm" onClick={(e) => handleVerifyClick(e, 'income')}>
                  {isIncomeVerified ? "Verified" : "Not Verified"}
                </Button>
                <AccordionIcon />
              </AccordionButton>
            </h2>

            <AccordionPanel pb={4}>
              <SimpleGrid columns={3} spacing={10}>
                {/* Caste Category */}
                <Box display={"flex"} justifyContent={"space-between"} alignItems={"center"} p={"10px"}>
                  <Heading pr={2} as="h5" size="sm">Caste Category</Heading>
                  <Box display="flex" alignItems="center">
                    {viewData?.casteCategory === null ? (
                      <>
                        <Icon as={FiAlertCircle} color="red.500" boxSize={5} mr={2} />
                        <Text fontSize="md">Missing</Text>
                      </>
                    ) : (
                      <Text fontSize="md">{viewData?.casteCategory}</Text>
                    )}
                  </Box>
                </Box>

                {/* subCaste */}
                <Box display={"flex"} justifyContent={"space-between"} alignItems={"center"} p={"10px"}>
                  <Heading pr={2} as="h5" size="sm">Sub Caste</Heading>
                  <Box display="flex" alignItems="center">
                    {viewData?.subCaste === null ? (
                      <>
                        <Icon as={FiAlertCircle} color="red.500" boxSize={5} mr={2} />
                        <Text fontSize="md">Missing</Text>
                      </>
                    ) : (
                      <Text fontSize="md">{viewData?.subCaste}</Text>
                    )}
                  </Box>
                </Box>

                {/* doYouHaveCasteCertificate */}
                <Box display={"flex"} justifyContent={"space-between"} alignItems={"center"} p={"10px"}>
                  <Heading pr={2} as="h5" size="sm">Do you have Caste Cert</Heading>
                  <Box display="flex" alignItems="center">
                    {viewData?.doYouHaveCasteCertificate === null ? (
                      <>
                        <Icon as={FiAlertCircle} color="red.500" boxSize={5} mr={2} />
                        <Text fontSize="md">Missing</Text>
                      </>
                    ) : (
                      <Text fontSize="md">{viewData?.doYouHaveCasteCertificate}</Text>
                    )}
                  </Box>
                </Box>

                {/* Caste Cert Number */}
                <Box display={"flex"} justifyContent={"space-between"} alignItems={"center"} p={"10px"}>
                  <Heading pr={2} as="h5" size="sm">Caste Cert Number</Heading>
                  <Box display="flex" alignItems="center">
                    {viewData?.casteCertificateNumber === null ? (
                      <>
                        <Icon as={FiAlertCircle} color="red.500" boxSize={5} mr={2} />
                        <Text fontSize="md">Missing</Text>
                      </>
                    ) : (
                      <Text fontSize="md">{viewData?.casteCertificateNumber}</Text>
                    )}
                  </Box>
                </Box>

                {/*Caste Cert Issu. Dist.*/}
                <Box display={"flex"} justifyContent={"space-between"} alignItems={"center"} p={"10px"}>
                  <Heading pr={2} as="h5" size="sm">Caste Cert Issu. Dist.</Heading>
                  <Box display="flex" alignItems="center">
                    {viewData?.casteIssuedDistrict === null || !viewData?.casteIssuedDistrict ?(
                      <>
                        <Icon as={FiAlertCircle} color="red.500" boxSize={5} mr={2} />
                        <Text fontSize="md">Missing</Text>
                      </>
                    ) : (
                      <Text fontSize="md">{viewData?.casteIssuedDistrict}</Text>
                    )}
                  </Box>
                </Box>

                {/*casteApplicantName*/}
                <Box display={"flex"} justifyContent={"space-between"} alignItems={"center"} p={"10px"}>
                  <Heading pr={2} as="h5" size="sm">Caste Cert Applicant Name</Heading>
                  <Box display="flex" alignItems="center">
                    {viewData?.casteApplicantName === null ? (
                      <>
                        <Icon as={FiAlertCircle} color="red.500" boxSize={5} mr={2} />
                        <Text fontSize="md">Missing</Text>
                      </>
                    ) : (
                      <Text fontSize="md">{viewData?.casteApplicantName}</Text>
                    )}
                  </Box>
                </Box>


                {/*casteIssAuthority*/}
                <Box display={"flex"} justifyContent={"space-between"} alignItems={"center"} p={"10px"}>
                  <Heading pr={2} as="h5" size="sm">Caste Cert Issu. Authority</Heading>
                  <Box display="flex" alignItems="center">
                    {viewData?.casteIssAuthority === null ? (
                      <>
                        <Icon as={FiAlertCircle} color="red.500" boxSize={5} mr={2} />
                        <Text fontSize="md">Missing</Text>
                      </>
                    ) : (
                      <Text fontSize="md">{viewData?.casteIssAuthority}</Text>
                    )}
                  </Box>
                </Box>

                {/*casteIssDate*/}
                <Box display={"flex"} justifyContent={"space-between"} alignItems={"center"} p={"10px"}>
                  <Heading pr={2} as="h5" size="sm">Caste Cert Issu. Authority</Heading>
                  <Box display="flex" alignItems="center">
                    {viewData?.casteIssuedDate === null ? (
                      <>
                        <Icon as={FiAlertCircle} color="red.500" boxSize={5} mr={2} />
                        <Text fontSize="md">Missing</Text>
                      </>
                    ) : (
                      <Text fontSize="md">{viewData?.casteIssuedDate}</Text>
                    )}
                  </Box>
                </Box>
              

                <Box
                  display={"flex"}
                  justifyContent={"space-between"}
                  alignItems={"center"}
                  p={"10px"}
                >
                  <Heading pr={2} as="h5" size="sm">
                    Caste doc
                  </Heading>
                  <Text fontSize="md">
                    {viewData?.casteDoc ? (
                      <>
                        <a href={viewData.casteDoc} target="_blank" rel="noopener noreferrer">
                          Click! <ExternalLinkIcon mx="2px" />
                        </a>
                        {docSize && <Text as="span">({docSize} KB)</Text>}
                      </>
                    ) : (
                      <Text color="red.500">Missing</Text>
                    )}
                  </Text>
                </Box>


              </SimpleGrid>
            </AccordionPanel>
          </AccordionItem>

          <AccordionItem>
            <h2>
              <AccordionButton sx={{ backgroundColor: 'blue.700', color: 'white' }}>
                <Box as="span" flex="1" textAlign="left" display="flex" alignItems="center">
                  <Heading as="h2" size="md" p={"20px"}>
                    Income Details
                  </Heading>

                  {/* Badge to show missing fields count */}
                  {(() => {
                    const fields = [
                      viewData?.annualFamilyIncome,
                      viewData?.doYouHaveIncomeCertificate,
                      viewData?.incomeCertNo,
                      viewData?.incomeIssAuthority,
                      viewData?.incomeIssuedDate,
                      viewData?.incomeDoc,                      
                    ];
                    // const missingFieldsCount = fields.filter((field) => field === null).length;
                    const missingFieldsCount = fields.filter(field => !field || field.trim?.() === "").length;


                    return missingFieldsCount > 0 && (
                      <Badge ml={3} colorScheme="red" fontSize="0.8em">
                        {missingFieldsCount} Fields Missing
                      </Badge>
                    );
                  })()}

                  {/* Badge to show missing documents count */}
                  {(() => {
                    const documents = [viewData?.incomeDoc];
                    // const missingDocumentsCount = documents.filter((doc) => doc === null || doc === "").length;
                    const missingDocumentsCount = documents.filter((doc) => !doc || doc.trim?.() === "").length;


                    return missingDocumentsCount > 0 && (
                      <Badge ml={3} colorScheme="red" fontSize="0.8em">
                        {missingDocumentsCount} Documents Missing
                      </Badge>
                    );
                  })()}
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
                {/* Annual Income */}
                <Box display={"flex"} justifyContent={"space-between"} alignItems={"center"} p={"10px"}>
                  <Heading pr={2} as="h5" size="sm">Annual Income</Heading>
                  <Box display="flex" alignItems="center">
                  {!viewData?.annualFamilyIncome || viewData?.annualFamilyIncome.trim?.() === "" ? (
                      <>
                        <Icon as={FiAlertCircle} color="red.500" boxSize={5} mr={2} />
                        <Text fontSize="md">Missing</Text>
                      </>
                    ) : (
                      <Text fontSize="md">{viewData?.annualFamilyIncome}</Text>
                    )}
                  </Box>
                </Box>

                {/* Income Certificate (Yes/No) */}
                <Box display={"flex"} justifyContent={"space-between"} alignItems={"center"} p={"10px"}>
                  <Heading pr={2} as="h5" size="sm">Do you have income certificate?</Heading>
                  <Box display="flex" alignItems="center">
                  {!viewData?.doYouHaveIncomeCertificate || viewData?.doYouHaveIncomeCertificate.trim?.() === "" ? (
                      <>
                        <Icon as={FiAlertCircle} color="red.500" boxSize={5} mr={2} />
                        <Text fontSize="md">Missing</Text>
                      </>
                    ) : (
                      <Text fontSize="md">{viewData?.doYouHaveIncomeCertificate}</Text>
                    )}
                  </Box>
                </Box>

                {/* Income Certificate Number */}
                <Box display={"flex"} justifyContent={"space-between"} alignItems={"center"} p={"10px"}>
                  <Heading pr={2} as="h5" size="sm">Income Certificate Number</Heading>
                  <Box display="flex" alignItems="center">
                  {!viewData?.incomeCertNo || viewData?.incomeCertNo.trim?.() === "" ? (
                      <>
                        <Icon as={FiAlertCircle} color="red.500" boxSize={5} mr={2} />
                        <Text fontSize="md">Missing</Text>
                      </>
                    ) : (
                      <Text fontSize="md">{viewData?.incomeCertNo}</Text>
                    )}
                  </Box>
                </Box>

                {/* Income Certificate Issuing Authority */}
                <Box display={"flex"} justifyContent={"space-between"} alignItems={"center"} p={"10px"}>
                  <Heading pr={2} as="h5" size="sm">Income Certificate Issuing Authority</Heading>
                  <Box display="flex" alignItems="center">
                  {!viewData?.incomeIssAuthority || viewData?.incomeIssAuthority.trim?.() === "" ? (
                      <>
                        <Icon as={FiAlertCircle} color="red.500" boxSize={5} mr={2} />
                        <Text fontSize="md">Missing</Text>
                      </>
                    ) : (
                      <Text fontSize="md">{viewData?.incomeIssAuthority}</Text>
                    )}
                  </Box>
                </Box>

                {/* Income Certificate Issuing Date */}
                <Box display={"flex"} justifyContent={"space-between"} alignItems={"center"} p={"10px"}>
                  <Heading pr={2} as="h5" size="sm">Income Certificate Issuing Date</Heading>
                  <Box display="flex" alignItems="center">
                  {!viewData?.incomeIssuedDate || viewData?.incomeIssuedDate.trim?.() === "" ? (
                      <>
                        <Icon as={FiAlertCircle} color="red.500" boxSize={5} mr={2} />
                        <Text fontSize="md">Missing</Text>
                      </>
                    ) : (
                      <Text fontSize="md">{viewData?.incomeIssuedDate}</Text>
                    )}
                  </Box>
                </Box>

                {/* Income Document */}
                <Box
                  display={"flex"}
                  justifyContent={"space-between"}
                  alignItems={"center"}
                  p={"10px"}
                >
                  <Heading pr={2} as="h5" size="sm">
                    Income doc
                  </Heading>
                  <Text fontSize="md">
                    {viewData?.incomeDoc && viewData?.incomeDoc.trim?.() !== "" ? (
                      <a href={viewData.incomeDoc} target="_blank" rel="noopener noreferrer">
                        Click! <ExternalLinkIcon mx="2px" />
                      </a>
                    ) : (
                      <Text color="red.500">Missing</Text>
                    )}
                  </Text>
                </Box>

              </SimpleGrid>
            </AccordionPanel>
          </AccordionItem>

          <AccordionItem>
            <h2>
              <AccordionButton sx={{ backgroundColor: 'blue.700', color: 'white' }}>
                <Box as="span" flex="1" textAlign="left" display="flex" alignItems="center">
                  <Heading as="h2" size="md" p={"20px"}>
                    Domicile Details
                  </Heading>

                  {/* Badge to show missing fields count */}
                  {(() => {
                    const fields = [
                      viewData?.doYouHaveDomicileMaharashtraKarnataka,
                      viewData?.doYouHaveDomicileCertificate,
                      viewData?.domicileRelationType,
                      viewData?.domicileCertNumber,
                      viewData?.domicileApplicantName,
                      viewData?.domicileIssuedAuthority,
                      viewData?.domicileIssuedDate,
                      viewData?.domicileDoc,
                      
                    ];
                    // const missingFieldsCount = fields.filter((field) => field === null).length;
                    const missingFieldsCount = fields.filter(field => !field || field.trim?.() === "").length;


                    return missingFieldsCount > 0 && (
                      <Badge ml={3} colorScheme="red" fontSize="0.8em">
                        {missingFieldsCount} Fields Missing
                      </Badge>
                    );
                  })()}

                  {/* Badge to show missing documents count */}
                  {(() => {
                    const documents = [viewData?.incomeDoc];
                    const missingDocumentsCount = documents.filter((doc) => doc === null || doc === "").length;

                    return missingDocumentsCount > 0 && (
                      <Badge ml={3} colorScheme="red" fontSize="0.8em">
                        {missingDocumentsCount} Documents Missing
                      </Badge>
                    );
                  })()}
                </Box>

                <Button ml="auto" onClick={(e) => { e.stopPropagation(); openDomiModalWithId(); }} colorScheme="blue" size="sm">Edit</Button>
                <Button ml={2} colorScheme={isIncomeVerified ? "green" : "red"} size="sm" onClick={(e) => handleVerifyClick(e, 'income')}>
                  {isIncomeVerified ? "Verified" : "Not Verified"}
                </Button>
                <AccordionIcon />
              </AccordionButton>
            </h2>

            <AccordionPanel pb={4}>
              <SimpleGrid columns={3} spacing={10}>

                {/* doYouHaveDomicileMaharashtraKarnataka */}
                <Box display={"flex"} justifyContent={"space-between"} alignItems={"center"} p={"10px"}>
                  <Heading pr={2} as="h5" size="sm">Domicile of Maharastra/Karnataka ?</Heading>
                  <Box display="flex" alignItems="center">
                  {!viewData?.doYouHaveDomicileMaharashtraKarnataka || viewData?.doYouHaveDomicileMaharashtraKarnataka.trim?.() === "" ? (
                      <>
                        <Icon as={FiAlertCircle} color="red.500" boxSize={5} mr={2} />
                        <Text fontSize="md">Missing</Text>
                      </>
                    ) : (
                      <Text fontSize="md">{viewData?.doYouHaveDomicileMaharashtraKarnataka}</Text>
                    )}
                  </Box>
                </Box>

                {/* doYouHaveDomicileCertificate */}
                <Box display={"flex"} justifyContent={"space-between"} alignItems={"center"} p={"10px"}>
                  <Heading pr={2} as="h5" size="sm">Do you have domicile certificate ?</Heading>
                  <Box display="flex" alignItems="center">
                  {!viewData?.doYouHaveDomicileCertificate || viewData?.doYouHaveDomicileCertificate.trim?.() === "" ? (
                      <>
                        <Icon as={FiAlertCircle} color="red.500" boxSize={5} mr={2} />
                        <Text fontSize="md">Missing</Text>
                      </>
                    ) : (
                      <Text fontSize="md">{viewData?.doYouHaveDomicileCertificate}</Text>
                    )}
                  </Box>
                </Box>


                {/* domicileRelationType */}
                <Box display={"flex"} justifyContent={"space-between"} alignItems={"center"} p={"10px"}>
                  <Heading pr={2} as="h5" size="sm">Relationship Type</Heading>
                  <Box display="flex" alignItems="center">
                  {!viewData?.domicileRelationType || viewData?.domicileRelationType.trim?.() === "" ? (
                      <>
                        <Icon as={FiAlertCircle} color="red.500" boxSize={5} mr={2} />
                        <Text fontSize="md">Missing</Text>
                      </>
                    ) : (
                      <Text fontSize="md">{viewData?.domicileRelationType}</Text>
                    )}
                  </Box>
                </Box>

                {/* domicileCertNumber */}
                <Box display={"flex"} justifyContent={"space-between"} alignItems={"center"} p={"10px"}>
                  <Heading pr={2} as="h5" size="sm">Domicile Certificate no.</Heading>
                  <Box display="flex" alignItems="center">
                  {!viewData?.domicileCertNumber || viewData?.domicileCertNumber.trim?.() === "" ? (
                      <>
                        <Icon as={FiAlertCircle} color="red.500" boxSize={5} mr={2} />
                        <Text fontSize="md">Missing</Text>
                      </>
                    ) : (
                      <Text fontSize="md">{viewData?.domicileCertNumber}</Text>
                    )}
                  </Box>
                </Box>


                {/* domicileApplicantName */}
                <Box display={"flex"} justifyContent={"space-between"} alignItems={"center"} p={"10px"}>
                  <Heading pr={2} as="h5" size="sm">Applicant name</Heading>
                  <Box display="flex" alignItems="center">
                  {!viewData?.domicileApplicantName || viewData?.domicileApplicantName.trim?.() === "" ? (
                      <>
                        <Icon as={FiAlertCircle} color="red.500" boxSize={5} mr={2} />
                        <Text fontSize="md">Missing</Text>
                      </>
                    ) : (
                      <Text fontSize="md">{viewData?.domicileApplicantName}</Text>
                    )}
                  </Box>
                </Box>


                {/* domicileIssuedAuthority */}
                <Box display={"flex"} justifyContent={"space-between"} alignItems={"center"} p={"10px"}>
                  <Heading pr={2} as="h5" size="sm">Issuing Authority</Heading>
                  <Box display="flex" alignItems="center">
                  {!viewData?.domicileIssuedAuthority || viewData?.domicileIssuedAuthority.trim?.() === "" ? (
                      <>
                        <Icon as={FiAlertCircle} color="red.500" boxSize={5} mr={2} />
                        <Text fontSize="md">Missing</Text>
                      </>
                    ) : (
                      <Text fontSize="md">{viewData?.domicileIssuedAuthority}</Text>
                    )}
                  </Box>
                </Box>

                {/* domicileIssuedDate */}
                <Box display={"flex"} justifyContent={"space-between"} alignItems={"center"} p={"10px"}>
                  <Heading pr={2} as="h5" size="sm">Date of issue</Heading>
                  <Box display="flex" alignItems="center">
                  {!viewData?.domicileIssuedDate || viewData?.domicileIssuedDate.trim?.() === "" ? (
                      <>
                        <Icon as={FiAlertCircle} color="red.500" boxSize={5} mr={2} />
                        <Text fontSize="md">Missing</Text>
                      </>
                    ) : (
                      <Text fontSize="md">{viewData?.domicileIssuedDate}</Text>
                    )}
                  </Box>
                </Box>


                {/* domicileDoc */}
                <Box
                  display={"flex"}
                  justifyContent={"space-between"}
                  alignItems={"center"}
                  p={"10px"}
                >
                  <Heading pr={2} as="h5" size="sm">
                    Domicile doc
                  </Heading>
                  <Text fontSize="md">
                  {viewData?.domicileDoc && viewData?.domicileDoc.trim?.() !== "" ? (
                      <a href={viewData.domicileDoc} target="_blank" rel="noopener noreferrer">
                        Click! <ExternalLinkIcon mx="2px" />
                      </a>
                    ) : (
                      <Text color="red.500">Missing</Text>
                    )}
                  </Text>
                </Box>

              </SimpleGrid>
            </AccordionPanel>
          </AccordionItem>

          <AccordionItem>
            <h2>
              <AccordionButton sx={{ backgroundColor: 'blue.900', color: 'white' }}>
                <Box as="span" flex="1" textAlign="left" display="flex" alignItems="center">
                  <Heading as="h2" size="md" p={"20px"}>
                    Current Course
                  </Heading>

                  {/* Badge to show missing fields count */}
                  {(() => {
                    const fields = [
                      viewData?.admissionYear,
                      viewData?.instituteState,
                      viewData?.instituteDistrict,
                      viewData?.instituteTaluka,
                      viewData?.qualificationLevel,
                      viewData?.courseStream,
                      viewData?.instituteName,
                      viewData?.courseName,
                      viewData?.admissionType,
                      viewData?.currentYear,
                      viewData?.isCompletedPursuing,
                      viewData?.admissionDate,
                      viewData?.feesPaid,
                      viewData?.admissionCategory,
                      viewData?.modeStudy,
                    ];

                    // Only count the admission type is Through CAP/Govt. Quota or Through CLAT
                    
                    if (viewData?.admissionType === "Through CAP/Govt. Quota" || viewData?.admissionType === "Through CLAT") {
                      fields.push(viewData?.cetPercentage);
                      fields.push(viewData?.admissionApplicationId);
                    }

                    // const missingFieldsCount = fields.filter(field => !field || field === "NA").length;
                    const missingFieldsCount = fields.filter(field => !field || field.trim?.() === "").length;

                    return missingFieldsCount > 0 && (
                      <Badge ml={3} colorScheme="red" fontSize="0.8em">
                        {missingFieldsCount} Fields Missing
                      </Badge>
                    );
                  })()}
                  {/* Badge to show missing documents count */}
                  {(() => {
                    const documents = [viewData?.feeReceiptDoc, viewData?.previousYearMarksheetDoc];

                    // Only count the allotment letter if it's Second Year
                    if (viewData?.admissionType === "Through CAP/Govt. Quota" || viewData?.admissionType === "Through CLAT") {
                      documents.push(viewData?.admissionLetterDoc);
                    }

                    const missingDocumentsCount = documents.filter((doc) => doc === null).length;

                    return missingDocumentsCount > 0 && (
                      <Badge ml={3} colorScheme="red" fontSize="0.8em">
                        {missingDocumentsCount} Documents Missing
                      </Badge>
                    );
                  })()}

                </Box>

                <Button ml="auto" onClick={(e) => { e.stopPropagation(); openCurrentCourseModalWithId(); }} colorScheme="blue" size="sm">Edit</Button>
                <Button ml={2} colorScheme={isCurrentCourseVerified ? "green" : "red"} size="sm" onClick={(e) => handleVerifyClick(e, 'current')}>
                  {isCurrentCourseVerified ? "Verified" : "Not Verified"}
                </Button>
                <AccordionIcon />
              </AccordionButton>
            </h2>

            <AccordionPanel pb={4}>
              <SimpleGrid columns={3} spacing={10}>

                {/* Admission Year */}
                <Box display={"flex"} justifyContent={"space-between"} alignItems={"center"} p={"10px"}>
                  <Heading pr={2} as="h5" size="sm">Admission Year In Current Course</Heading>
                  <Box display="flex" alignItems="center">
                    {viewData?.admissionYear === null || viewData?.admissionYear === "NA" ? (
                      <>
                        <Icon as={FiAlertCircle} color="red.500" boxSize={5} mr={2} />
                        <Text fontSize="md">Missing</Text>
                      </>
                    ) : (
                      <Text fontSize="md">{viewData?.admissionYear}</Text>
                    )}
                  </Box>
                </Box>

                {/* Institute State */}
                <Box display={"flex"} justifyContent={"space-between"} alignItems={"center"} p={"10px"}>
                  <Heading pr={2} as="h5" size="sm">Institute State</Heading>
                  <Box display="flex" alignItems="center">
                    {viewData?.instituteState === null || viewData?.instituteState === "NA" ? (
                      <>
                        <Icon as={FiAlertCircle} color="red.500" boxSize={5} mr={2} />
                        <Text fontSize="md">Missing</Text>
                      </>
                    ) : (
                      <Text fontSize="md">{viewData?.instituteState}</Text>
                    )}
                  </Box>
                </Box>

                {/* Institute District */}
                <Box display={"flex"} justifyContent={"space-between"} alignItems={"center"} p={"10px"}>
                  <Heading pr={2} as="h5" size="sm">Institute District</Heading>
                  <Box display="flex" alignItems="center">
                    {viewData?.instituteDistrict === null || viewData?.instituteDistrict === "NA" ? (
                      <>
                        <Icon as={FiAlertCircle} color="red.500" boxSize={5} mr={2} />
                        <Text fontSize="md">Missing</Text>
                      </>
                    ) : (
                      <Text fontSize="md">{viewData?.instituteDistrict}</Text>
                    )}
                  </Box>
                </Box>

                {/* Institute Taluka */}
                <Box display={"flex"} justifyContent={"space-between"} alignItems={"center"} p={"10px"}>
                  <Heading pr={2} as="h5" size="sm">Institute Taluka</Heading>
                  <Box display="flex" alignItems="center">
                    {viewData?.instituteTaluka === null || viewData?.instituteTaluka === "NA" ? (
                      <>
                        <Icon as={FiAlertCircle} color="red.500" boxSize={5} mr={2} />
                        <Text fontSize="md">Missing</Text>
                      </>
                    ) : (
                      <Text fontSize="md">{viewData?.instituteTaluka}</Text>
                    )}
                  </Box>
                </Box>

                {/* Qualification Level */}
                {(viewData?.presentYearOfStudy === "Third Year" && viewData?.pastYearCompletedPursuing === "Direct Second Year Completed") && (
                  <Box display={"flex"} justifyContent={"space-between"} alignItems={"center"} p={"10px"}>
                    <Heading pr={2} as="h5" size="sm">Qualification Level</Heading>
                    <Box display="flex" alignItems="center">
                      {viewData?.qualificationLevel === null || viewData?.qualificationLevel === "NA" ? (
                        <>
                          <Icon as={FiAlertCircle} color="red.500" boxSize={5} mr={2} />
                          <Text fontSize="md">Missing</Text>
                        </>
                      ) : (
                        <Text fontSize="md">{viewData?.qualificationLevel}</Text>
                      )}
                    </Box>
                  </Box>
                )}

                {/* Course Stream */}
                {(viewData?.presentYearOfStudy === "Third Year" && viewData?.pastYearCompletedPursuing === "Direct Second Year Completed") && (
                  <Box display={"flex"} justifyContent={"space-between"} alignItems={"center"} p={"10px"}>
                    <Heading pr={2} as="h5" size="sm">Course Stream</Heading>
                    <Box display="flex" alignItems="center">
                      {viewData?.courseStream === null || viewData?.courseStream === "NA" ? (
                        <>
                          <Icon as={FiAlertCircle} color="red.500" boxSize={5} mr={2} />
                          <Text fontSize="md">Missing</Text>
                        </>
                      ) : (
                        <Text fontSize="md">{viewData?.courseStream}</Text>
                      )}
                    </Box>
                  </Box>
                )}

                {/* institute Name */}
                <Box display={"flex"} justifyContent={"space-between"} alignItems={"center"} p={"10px"}>
                  <Heading pr={2} as="h5" size="sm">College Name</Heading>
                  <Box display="flex" alignItems="center">
                    {viewData?.instituteName === null || viewData?.instituteName === "NA" ? (
                      <>
                        <Icon as={FiAlertCircle} color="red.500" boxSize={5} mr={2} />
                        <Text fontSize="md">Missing</Text>
                      </>
                    ) : (
                      <Text fontSize="md">{viewData?.instituteName}</Text>
                    )}
                  </Box>
                </Box>

                {/* Course Name */}
                {/* {(viewData?.presentYearOfStudy === "Third Year" && viewData?.pastYearCompletedPursuing === "Direct Second Year Completed") && ( */}
                <Box display={"flex"} justifyContent={"space-between"} alignItems={"center"} p={"10px"}>
                  <Heading pr={2} as="h5" size="sm">Course Name</Heading>
                  <Box display="flex" alignItems="center">
                    {viewData?.courseName === null || viewData?.courseName === "NA" ? (
                      <>
                        <Icon as={FiAlertCircle} color="red.500" boxSize={5} mr={2} />
                        <Text fontSize="md">Missing</Text>
                      </>
                    ) : (
                      <Text fontSize="md">{viewData?.courseName}</Text>
                    )}
                  </Box>
                </Box>
                {/* )} */}

                {/* Admission Type */}
                {/* {(viewData?.presentYearOfStudy === "Third Year" && viewData?.pastYearCompletedPursuing === "Direct Second Year Completed") && ( */}
                <Box display={"flex"} justifyContent={"space-between"} alignItems={"center"} p={"10px"}>
                  <Heading pr={2} as="h5" size="sm">Admission Type</Heading>
                  <Box display="flex" alignItems="center">
                    {viewData?.admissionType === null || viewData?.admissionType === "NA" ? (
                      <>
                        <Icon as={FiAlertCircle} color="red.500" boxSize={5} mr={2} />
                        <Text fontSize="md">Missing</Text>
                      </>
                    ) : (
                      <Text fontSize="md">{viewData?.admissionType}</Text>
                    )}
                  </Box>
                </Box>
                {/* )} */}



                {(viewData?.admissionType === "Through CAP/Govt. Quota" || viewData?.admissionType === "Through CLAT") && (
                  <Box display={"flex"} justifyContent={"space-between"} alignItems={"center"} p={"10px"}>
                    <Heading pr={2} as="h5" size="sm">CET Percentage</Heading>
                    <Box display="flex" alignItems="center">
                      {viewData?.cetPercentage === null || viewData?.cetPercentage === "NA" ? (
                        <>
                          <Icon as={FiAlertCircle} color="red.500" boxSize={5} mr={2} />
                          <Text fontSize="md">Missing</Text>
                        </>
                      ) : (
                        <Text fontSize="md">{viewData?.cetPercentage}</Text>
                      )}
                    </Box>
                  </Box>
                )}


                {/* Admission Application ID */}
                {(viewData?.admissionType === "Through CAP/Govt. Quota" || viewData?.admissionType === "Through CLAT") && (
                  <Box display={"flex"} justifyContent={"space-between"} alignItems={"center"} p={"10px"}>
                    <Heading pr={2} as="h5" size="sm">Admission Application ID</Heading>
                    <Box display="flex" alignItems="center">
                      {viewData?.admissionApplicationId === null || viewData?.admissionApplicationId === "NA" ? (
                        <>
                          <Icon as={FiAlertCircle} color="red.500" boxSize={5} mr={2} />
                          <Text fontSize="md">Missing</Text>
                        </>
                      ) : (
                        <Text fontSize="md">{viewData?.admissionApplicationId}</Text>
                      )}
                    </Box>
                  </Box>
                )}


                {/* Present year of study */}
                <Box display={"flex"} justifyContent={"space-between"} alignItems={"center"} p={"10px"}>
                  <Heading pr={2} as="h5" size="sm">Year Of Study</Heading>
                  <Box display="flex" alignItems="center">
                    {viewData?.currentYear === null || viewData?.currentYear === "NA" ? (
                      <>
                        <Icon as={FiAlertCircle} color="red.500" boxSize={5} mr={2} />
                        <Text fontSize="md">Missing</Text>
                      </>
                    ) : (
                      <Text fontSize="md">{viewData?.currentYear}</Text>
                    )}
                  </Box>
                </Box>

                {/* present Year Completed Pursuing*/}
                <Box display={"flex"} justifyContent={"space-between"} alignItems={"center"} p={"10px"}>
                  <Heading pr={2} as="h5" size="sm">Present Year Completed or Pursuing</Heading>
                  <Box display="flex" alignItems="center">
                    {viewData?.isCompletedPursuing === null || viewData?.isCompletedPursuing === "NA" ? (
                      <>
                        <Icon as={FiAlertCircle} color="red.500" boxSize={5} mr={2} />
                        <Text fontSize="md">Missing</Text>
                      </>
                    ) : (
                      <Text fontSize="md">{viewData?.isCompletedPursuing}</Text>
                    )}
                  </Box>
                </Box>

                {/* admissionDateCurrentCourse */}
                <Box display={"flex"} justifyContent={"space-between"} alignItems={"center"} p={"10px"}>
                  <Heading pr={2} as="h5" size="sm">Admission Date of current course</Heading>
                  <Box display="flex" alignItems="center">
                    {viewData?.admissionDate === null || viewData?.admissionDate === "NA" ? (
                      <>
                        <Icon as={FiAlertCircle} color="red.500" boxSize={5} mr={2} />
                        <Text fontSize="md">Missing</Text>
                      </>
                    ) : (
                      <Text fontSize="md">{viewData?.admissionDate}</Text>
                    )}
                  </Box>
                </Box>

                {/* feesPaid */}
                <Box display={"flex"} justifyContent={"space-between"} alignItems={"center"} p={"10px"}>
                  <Heading pr={2} as="h5" size="sm">Fees Paid</Heading>
                  <Box display="flex" alignItems="center">
                    {viewData?.feesPaid === null || viewData?.feesPaid === "NA" ? (
                      <>
                        <Icon as={FiAlertCircle} color="red.500" boxSize={5} mr={2} />
                        <Text fontSize="md">Missing</Text>
                      </>
                    ) : (
                      <Text fontSize="md">{viewData?.feesPaid}</Text>
                    )}
                  </Box>
                </Box>

                {/* admissionCategory */}
                <Box display={"flex"} justifyContent={"space-between"} alignItems={"center"} p={"10px"}>
                  <Heading pr={2} as="h5" size="sm">Admission Category</Heading>
                  <Box display="flex" alignItems="center">
                    {viewData?.admissionCategory === null || viewData?.admissionCategory === "NA" ? (
                      <>
                        <Icon as={FiAlertCircle} color="red.500" boxSize={5} mr={2} />
                        <Text fontSize="md">Missing</Text>
                      </>
                    ) : (
                      <Text fontSize="md">{viewData?.admissionCategory}</Text>
                    )}
                  </Box>
                </Box>

                {/* modeStudy */}
                <Box display={"flex"} justifyContent={"space-between"} alignItems={"center"} p={"10px"}>
                  <Heading pr={2} as="h5" size="sm">Mode of study</Heading>
                  <Box display="flex" alignItems="center">
                    {viewData?.modeStudy === null || viewData?.modeStudy === "NA" ? (
                      <>
                        <Icon as={FiAlertCircle} color="red.500" boxSize={5} mr={2} />
                        <Text fontSize="md">Missing</Text>
                      </>
                    ) : (
                      <Text fontSize="md">{viewData?.modeStudy}</Text>
                    )}
                  </Box>
                </Box>


                {/* Render CAP Allotment Letter if Present Year of Study is Second Year or admissionCasteCategory is OBC */}
                {(viewData?.admissionType === "Through CAP/Govt. Quota" || viewData?.admissionType === "Through CLAT") && (
                <Box
                  display={"flex"}
                  justifyContent={"space-between"}
                  alignItems={"center"}
                  p={"10px"}
                >
                  <Heading pr={2} as="h5" size="sm">
                    CAP Allotment Letter
                  </Heading>
                  <Text fontSize="md">
                  {viewData?.admissionLetterDoc && viewData?.admissionLetterDoc.trim?.() !== "" ? (
                      <a href={viewData.admissionLetterDoc} target="_blank" rel="noopener noreferrer">
                        Click! <ExternalLinkIcon mx="2px" />
                      </a>
                    ) : (
                      <>
                        <Icon as={FiAlertCircle} color="red.500" boxSize={5} mr={2} /><Text fontSize="md">Missing</Text>
                      </>)}
                  </Text>
                </Box>
              )}


              </SimpleGrid>
            </AccordionPanel>
          </AccordionItem>

          <AccordionItem>
            <h2>
              <AccordionButton sx={{ backgroundColor: 'blue.700', color: 'white' }}>
                <Box as="span" flex="1" textAlign="left">
                  <Heading as="h2" size="md" p={"20px"}>
                    Class 10th

                    {/* Badge to show missing fields count */}
                    {(() => {
                      const fields = [
                                        viewData?.class10Qualification,
                                        viewData?.class10Stream,
                                        viewData?.class10State,
                                        viewData?.class10District,
                                        viewData?.class10Taluka,
                                        viewData?.class10Course,
                                        viewData?.class10Board,
                                        viewData?.class10Mode,
                                        viewData?.class10AdmissionYear,
                                        viewData?.class10PassingYear,
                                        viewData?.class10Result,
                                        viewData?.class10Percentage,
                                        viewData?.class10Attempt,
                                        viewData?.class10SeatNumber,
                                        viewData?.class10MonthOfExam,
                                        viewData?.class10MarksObtained,
                                      ];
                      // If the user is a hosteller, check for missing fields in other hostel-related fields
                      if (viewData?.areYouHostellerDayScholar === "Hosteller") {
                        fields.push(

                          
                        );
                      }
                      // const missingFieldsCount = fields.filter(field => field === null || field === "NA").length;
                      const missingFieldsCount = fields.filter(field => !field || field.trim?.() === "").length;

                      return missingFieldsCount > 0 && (
                        <Badge ml={3} colorScheme="red" fontSize="0.8em">
                          {missingFieldsCount} Fields Missing
                        </Badge>
                      );
                    })()}

                    {/* Badge to show missing documents count class10Doc*/}
                    {(() => {
                              const documents = [
                                viewData?.class10Doc, // Add other document variables here if needed
                              ];
                      const missingDocumentsCount = documents.filter((doc) => doc === null).length;

                      return missingDocumentsCount > 0 && (
                        <Badge ml={3} colorScheme="red" fontSize="0.8em">
                          {missingDocumentsCount} Documents Missing
                        </Badge>
                      );
                    })()}
                  </Heading>
                </Box>
                <Button ml="auto" onClick={(e) => { e.stopPropagation(); open10thModalWithId(); }} colorScheme="blue" size="sm">Edit</Button>
                <Button ml={2} colorScheme={isHostelVerified ? "green" : "red"} size="sm" onClick={(e) => handleVerifyClick(e, 'hostel')}>
                  {isHostelVerified ? "Verified" : "Not Verified"}
                </Button>
                <AccordionIcon />
              </AccordionButton>
            </h2>

            <AccordionPanel pb={4}>
              <SimpleGrid columns={3} spacing={10}>
                {/*class10Qualification*/}
                <Box display={"flex"} justifyContent={"space-between"} alignItems={"center"} p={"10px"}>
                  <Heading pr={2} as="h5" size="sm">Qualification Level</Heading>
                  <Box display="flex" alignItems="center">
                  {viewData?.class10Qualification === null || viewData?.class10Qualification === "NA" ? (
                      <>
                        <Icon as={FiAlertCircle} color="red.500" boxSize={5} mr={2} />
                        <Text fontSize="md">Missing</Text>
                      </>
                    ) : (
                      <Text fontSize="md">{viewData?.class10Qualification}</Text>
                    )}
                  </Box>
                </Box>


                  {/* Class 10th Stream */}
                  <Box display={"flex"} justifyContent={"space-between"} alignItems={"center"} p={"10px"}>
                    <Heading pr={2} as="h5" size="sm">Class 10th Stream</Heading>
                    <Box display="flex" alignItems="center">
                    {viewData?.class10Stream === null || viewData?.class10Stream === "NA" ? (
                        <>
                          <Icon as={FiAlertCircle} color="red.500" boxSize={5} mr={2} />
                          <Text fontSize="md">Missing</Text>
                        </>
                      ) : (
                        <Text fontSize="md">{viewData?.class10Stream}</Text>
                      )}
                    </Box>
                  </Box>

                  {/* 10th State */}
                  <Box display={"flex"} justifyContent={"space-between"} alignItems={"center"} p={"10px"}>
                    <Heading pr={2} as="h5" size="sm">Class 10th State</Heading>
                    <Box display="flex" alignItems="center">
                    {viewData?.class10State === null || viewData?.class10State === "NA" ? (
                        <>
                          <Icon as={FiAlertCircle} color="red.500" boxSize={5} mr={2} />
                          <Text fontSize="md">Missing</Text>
                        </>
                      ) : (
                        <Text fontSize="md">{viewData?.class10State}</Text>
                      )}
                    </Box>
                  </Box>

                  {/* class10District */}
                  <Box display={"flex"} justifyContent={"space-between"} alignItems={"center"} p={"10px"}>
                    <Heading pr={2} as="h5" size="sm">Class 10th District</Heading>
                    <Box display="flex" alignItems="center">
                    {viewData?.class10District === null || viewData?.class10District === "NA" ? (
                        <>
                          <Icon as={FiAlertCircle} color="red.500" boxSize={5} mr={2} />
                          <Text fontSize="md">Missing</Text>
                        </>
                      ) : (
                        <Text fontSize="md">{viewData?.class10District}</Text>
                      )}
                    </Box>
                  </Box>

                  {/* class10Taluka */}
                  <Box display={"flex"} justifyContent={"space-between"} alignItems={"center"} p={"10px"}>
                    <Heading pr={2} as="h5" size="sm">Class 10th Taluka</Heading>
                    <Box display="flex" alignItems="center">
                    {viewData?.class10Taluka === null || viewData?.class10Taluka === "NA" ? (
                        <>
                          <Icon as={FiAlertCircle} color="red.500" boxSize={5} mr={2} />
                          <Text fontSize="md">Missing</Text>
                        </>
                      ) : (
                        <Text fontSize="md">{viewData?.class10Taluka}</Text>
                      )}
                    </Box>
                  </Box>

                  {/* class10Course */}
                  <Box display={"flex"} justifyContent={"space-between"} alignItems={"center"} p={"10px"}>
                    <Heading pr={2} as="h5" size="sm">Class 10th Course</Heading>
                    <Box display="flex" alignItems="center">
                    {viewData?.class10Course === null || viewData?.class10Course === "NA" ? (
                        <>
                          <Icon as={FiAlertCircle} color="red.500" boxSize={5} mr={2} />
                          <Text fontSize="md">Missing</Text>
                        </>
                      ) : (
                        <Text fontSize="md">{viewData?.class10Course}</Text>
                      )}
                    </Box>
                  </Box>


                  {/* class10Board */}
                  <Box display={"flex"} justifyContent={"space-between"} alignItems={"center"} p={"10px"}>
                    <Heading pr={2} as="h5" size="sm">Class 10th Board</Heading>
                    <Box display="flex" alignItems="center">
                    {viewData?.class10Board === null || viewData?.class10Board === "NA" ? (
                        <>
                          <Icon as={FiAlertCircle} color="red.500" boxSize={5} mr={2} />
                          <Text fontSize="md">Missing</Text>
                        </>
                      ) : (
                        <Text fontSize="md">{viewData?.class10Board}</Text>
                      )}
                    </Box>
                  </Box>


                  {/* class10Mode */}
                  <Box display={"flex"} justifyContent={"space-between"} alignItems={"center"} p={"10px"}>
                    <Heading pr={2} as="h5" size="sm">Class 10th Mode</Heading>
                    <Box display="flex" alignItems="center">
                    {viewData?.class10Mode === null || viewData?.class10Mode === "NA" ? (
                        <>
                          <Icon as={FiAlertCircle} color="red.500" boxSize={5} mr={2} />
                          <Text fontSize="md">Missing</Text>
                        </>
                      ) : (
                        <Text fontSize="md">{viewData?.class10Mode}</Text>
                      )}
                    </Box>
                  </Box>

                  {/* class10AdmissionYear */}
                  <Box display={"flex"} justifyContent={"space-between"} alignItems={"center"} p={"10px"}>
                    <Heading pr={2} as="h5" size="sm">Class 10th Admission Year</Heading>
                    <Box display="flex" alignItems="center">
                    {viewData?.class10AdmissionYear === null || viewData?.class10AdmissionYear === "NA" ? (
                        <>
                          <Icon as={FiAlertCircle} color="red.500" boxSize={5} mr={2} />
                          <Text fontSize="md">Missing</Text>
                        </>
                      ) : (
                        <Text fontSize="md">{viewData?.class10AdmissionYear}</Text>
                      )}
                    </Box>
                  </Box>

                  {/* class10PassingYear */}
                  <Box display={"flex"} justifyContent={"space-between"} alignItems={"center"} p={"10px"}>
                    <Heading pr={2} as="h5" size="sm">Class 10th Passing Year</Heading>
                    <Box display="flex" alignItems="center">
                    {viewData?.class10PassingYear === null || viewData?.class10PassingYear === "NA" ? (
                        <>
                          <Icon as={FiAlertCircle} color="red.500" boxSize={5} mr={2} />
                          <Text fontSize="md">Missing</Text>
                        </>
                      ) : (
                        <Text fontSize="md">{viewData?.class10PassingYear}</Text>
                      )}
                    </Box>
                  </Box>

                  {/* class10Result */}
                  <Box display={"flex"} justifyContent={"space-between"} alignItems={"center"} p={"10px"}>
                    <Heading pr={2} as="h5" size="sm">Class 10th Result</Heading>
                    <Box display="flex" alignItems="center">
                    {viewData?.class10Result === null || viewData?.class10Result === "NA" ? (
                        <>
                          <Icon as={FiAlertCircle} color="red.500" boxSize={5} mr={2} />
                          <Text fontSize="md">Missing</Text>
                        </>
                      ) : (
                        <Text fontSize="md">{viewData?.class10Result}</Text>
                      )}
                    </Box>
                  </Box>

                  {/* class10Percentage */}
                  <Box display={"flex"} justifyContent={"space-between"} alignItems={"center"} p={"10px"}>
                    <Heading pr={2} as="h5" size="sm">Class 10th Percentage</Heading>
                    <Box display="flex" alignItems="center">
                    {viewData?.class10Percentage === null || viewData?.class10Percentage === "NA" ? (
                        <>
                          <Icon as={FiAlertCircle} color="red.500" boxSize={5} mr={2} />
                          <Text fontSize="md">Missing</Text>
                        </>
                      ) : (
                        <Text fontSize="md">{viewData?.class10Percentage}</Text>
                      )}
                    </Box>
                  </Box>

                  {/* class10Attempt */}
                  <Box display={"flex"} justifyContent={"space-between"} alignItems={"center"} p={"10px"}>
                    <Heading pr={2} as="h5" size="sm">Class 10th Attempt</Heading>
                    <Box display="flex" alignItems="center">
                    {viewData?.class10Attempt === null || viewData?.class10Attempt === "NA" ? (
                        <>
                          <Icon as={FiAlertCircle} color="red.500" boxSize={5} mr={2} />
                          <Text fontSize="md">Missing</Text>
                        </>
                      ) : (
                        <Text fontSize="md">{viewData?.class10Attempt}</Text>
                      )}
                    </Box>
                  </Box>

                  {/* class10SeatNumber */}
                  {viewData?.class10Board === "MAHARASHTRA STATE BOARD OF SECONDARY AND HIGHER SECONDARY EDUCATION" && (
                  <Box display={"flex"} justifyContent={"space-between"} alignItems={"center"} p={"10px"}>
                    <Heading pr={2} as="h5" size="sm">Class 10th Seat NUmber</Heading>
                    <Box display="flex" alignItems="center">
                    {viewData?.class10SeatNumber === null || viewData?.class10SeatNumber === "NA" ? (
                        <>
                          <Icon as={FiAlertCircle} color="red.500" boxSize={5} mr={2} />
                          <Text fontSize="md">Missing</Text>
                        </>
                      ) : (
                        <Text fontSize="md">{viewData?.class10SeatNumber}</Text>
                      )}
                    </Box>
                  </Box>
                  )}

                  {/* class10MonthOfExam */}
                  {viewData?.class10Board === "MAHARASHTRA STATE BOARD OF SECONDARY AND HIGHER SECONDARY EDUCATION" && (
                  <Box display={"flex"} justifyContent={"space-between"} alignItems={"center"} p={"10px"}>
                    <Heading pr={2} as="h5" size="sm">Class 10th Month of Exam</Heading>
                    <Box display="flex" alignItems="center">
                    {viewData?.class10MonthOfExam === null || viewData?.class10MonthOfExam === "NA" ? (
                        <>
                          <Icon as={FiAlertCircle} color="red.500" boxSize={5} mr={2} />
                          <Text fontSize="md">Missing</Text>
                        </>
                      ) : (
                        <Text fontSize="md">{viewData?.class10MonthOfExam}</Text>
                      )}
                    </Box>
                  </Box>
                )}

                  {/* class10MarksObtained */}
                  {viewData?.class10Board === "MAHARASHTRA STATE BOARD OF SECONDARY AND HIGHER SECONDARY EDUCATION" && (
                  <Box display={"flex"} justifyContent={"space-between"} alignItems={"center"} p={"10px"}>
                    <Heading pr={2} as="h5" size="sm">Class 10th Marks Obtained</Heading>
                    <Box display="flex" alignItems="center">
                    {viewData?.class10MarksObtained === null || viewData?.class10MarksObtained === "NA" ? (
                        <>
                          <Icon as={FiAlertCircle} color="red.500" boxSize={5} mr={2} />
                          <Text fontSize="md">Missing</Text>
                        </>
                      ) : (
                        <Text fontSize="md">{viewData?.class10MarksObtained}</Text>
                      )}
                    </Box>
                  </Box>
                  )}


                  {/* class10Doc */}
                  <Box
                    display={"flex"}
                    justifyContent={"space-between"}
                    alignItems={"center"}
                    p={"10px"}
                  >
                    <Heading pr={2} as="h5" size="sm">
                      Class 10th Marksheet
                    </Heading>
                    <Text fontSize="md">
                    {viewData?.class10Doc && viewData?.class10Doc.trim?.() !== "" ? (
                        <a href={viewData.class10Doc} target="_blank" rel="noopener noreferrer">
                          Click! <ExternalLinkIcon mx="2px" />
                        </a>
                      ) : (
                        <>
                          <Icon as={FiAlertCircle} color="red.500" boxSize={5} mr={2} /><Text fontSize="md">Missing</Text>
                        </>)}
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
                    Class 12th

                    {/* Badge to show missing fields count */}
                    {(() => {
                      const fields = [
                        viewData?.class12Stream,
                        viewData?.class12InstituteState,
                        viewData?.class12InstituteDistrict,
                        viewData?.class12Taluka,
                        viewData?.class12CollegeName,
                        viewData?.class12Course,
                        viewData?.class12Board,
                        viewData?.class12SeatNumber,
                        viewData?.class12Mode,
                        viewData?.class12AdmissionYear,
                        viewData?.class12PassingYear,
                        viewData?.class12Result, 
                        viewData?.class12Percentage,
                        viewData?.class12Attempts,
                      ];


                      // If the user is a hosteller, check for missing fields in other hostel-related fields
                      if (viewData?.class12Board === "MAHARASHTRA STATE BOARD OF SECONDARY AND HIGHER SECONDARY EDUCATION") {
                        fields.push(
                        viewData?.class12SeatNumber,//this is an example for conditonal counting

                        );
                      }
                      const missingFieldsCount = fields.filter(field => field === null || field === "NA").length;

                      return missingFieldsCount > 0 && (
                        <Badge ml={3} colorScheme="red" fontSize="0.8em">
                          {missingFieldsCount} Fields Missing
                        </Badge>
                      );
                    })()}

                    {/* Badge to show missing documents count */}
                    {(() => {
                      const documents = [
                        viewData?.class12Doc, // Add other document variables here if needed
                      ];

                      const missingDocumentsCount = documents.filter((doc) => doc === null).length;

                      return missingDocumentsCount > 0 && (
                        <Badge ml={3} colorScheme="red" fontSize="0.8em">
                          {missingDocumentsCount} Documents Missing
                        </Badge>
                      );
                    })()}
                  </Heading>
                </Box>
                <Button ml="auto" onClick={(e) => { e.stopPropagation(); open12thModalWithId(); }} colorScheme="blue" size="sm">Edit</Button>
                <Button ml={2} colorScheme={isHostelVerified ? "green" : "red"} size="sm" onClick={(e) => handleVerifyClick(e, 'hostel')}>
                  {isHostelVerified ? "Verified" : "Not Verified"}
                </Button>
                <AccordionIcon />
              </AccordionButton>
            </h2>

            <AccordionPanel pb={4}>
              <SimpleGrid columns={3} spacing={10}>


                {/* class12Stream */}
                <Box display={"flex"} justifyContent={"space-between"} alignItems={"center"} p={"10px"}>
                  <Heading pr={2} as="h5" size="sm">Class 12 Stream</Heading>
                  <Box display="flex" alignItems="center">
                    {viewData?.class12Stream === null ? (
                      <>
                        <Icon as={FiAlertCircle} color="red.500" boxSize={5} mr={2} />
                        <Text fontSize="md">Missing</Text>
                      </>
                    ) : (
                      <Text fontSize="md">{viewData?.class12Stream}</Text>
                    )}
                  </Box>
                </Box>

                {/* class12InstituteState */}
                <Box display={"flex"} justifyContent={"space-between"} alignItems={"center"} p={"10px"}>
                  <Heading pr={2} as="h5" size="sm">Class 12 Institute State</Heading>
                  <Box display="flex" alignItems="center">
                  {viewData?.class12InstituteState === null || viewData?.class12InstituteState === "NA" ? (
                      <>
                        <Icon as={FiAlertCircle} color="red.500" boxSize={5} mr={2} />
                        <Text fontSize="md">Missing</Text>
                      </>
                    ) : (
                      <Text fontSize="md">{viewData?.class12InstituteState}</Text>
                    )}
                  </Box>
                </Box>

                {/* class12InstituteDistrict */}
                <Box display={"flex"} justifyContent={"space-between"} alignItems={"center"} p={"10px"}>
                  <Heading pr={2} as="h5" size="sm">Class 12 Institute District</Heading>
                  <Box display="flex" alignItems="center">
                  {viewData?.class12InstituteDistrict === null || viewData?.class12InstituteDistrict === "NA" ? (
                      <>
                        <Icon as={FiAlertCircle} color="red.500" boxSize={5} mr={2} />
                        <Text fontSize="md">Missing</Text>
                      </>
                    ) : (
                      <Text fontSize="md">{viewData?.class12InstituteDistrict}</Text>
                    )}
                  </Box>
                </Box>

                {/* class12Taluka */}
                <Box display={"flex"} justifyContent={"space-between"} alignItems={"center"} p={"10px"}>
                  <Heading pr={2} as="h5" size="sm">Class 12 Taluka</Heading>
                  <Box display="flex" alignItems="center">
                  {viewData?.class12Taluka === null || viewData?.class12Taluka === "NA" ? (
                      <>
                        <Icon as={FiAlertCircle} color="red.500" boxSize={5} mr={2} />
                        <Text fontSize="md">Missing</Text>
                      </>
                    ) : (
                      <Text fontSize="md">{viewData?.class12Taluka}</Text>
                    )}
                  </Box>
                </Box>

                {/* class12CollegeName */}
                <Box display={"flex"} justifyContent={"space-between"} alignItems={"center"} p={"10px"}>
                  <Heading pr={2} as="h5" size="sm">Class 12 College Name</Heading>
                  <Box display="flex" alignItems="center">
                  {viewData?.class12CollegeName === null || viewData?.class12CollegeName === "NA" ? (
                      <>
                        <Icon as={FiAlertCircle} color="red.500" boxSize={5} mr={2} />
                        <Text fontSize="md">Missing</Text>
                      </>
                    ) : (
                      <Text fontSize="md">{viewData?.class12CollegeName}</Text>
                    )}
                  </Box>
                </Box>

                {/* class12Course */}
                <Box display={"flex"} justifyContent={"space-between"} alignItems={"center"} p={"10px"}>
                  <Heading pr={2} as="h5" size="sm">Class 12 Course</Heading>
                  <Box display="flex" alignItems="center">
                  {viewData?.class12Course === null || viewData?.class12Course === "NA" ? (
                      <>
                        <Icon as={FiAlertCircle} color="red.500" boxSize={5} mr={2} />
                        <Text fontSize="md">Missing</Text>
                      </>
                    ) : (
                      <Text fontSize="md">{viewData?.class12Course}</Text>
                    )}
                  </Box>
                </Box>

                {/* class12Board */}
                <Box display={"flex"} justifyContent={"space-between"} alignItems={"center"} p={"10px"}>
                  <Heading pr={2} as="h5" size="sm">Class 12 Board</Heading>
                  <Box display="flex" alignItems="center">
                  {viewData?.class12Board === null || viewData?.class12Board === "NA" ? (
                      <>
                        <Icon as={FiAlertCircle} color="red.500" boxSize={5} mr={2} />
                        <Text fontSize="md">Missing</Text>
                      </>
                    ) : (
                      <Text fontSize="md">{viewData?.class12Board}</Text>
                    )}
                  </Box>
                </Box>

                {/* class12SeatNumber */}
                {viewData?.class12Board === "MAHARASHTRA STATE BOARD OF SECONDARY AND HIGHER SECONDARY EDUCATION" && (
                <Box display={"flex"} justifyContent={"space-between"} alignItems={"center"} p={"10px"}>
                  <Heading pr={2} as="h5" size="sm">Class 12 Seat Number</Heading>
                  <Box display="flex" alignItems="center">
                  {viewData?.class12SeatNumber === null || viewData?.class12SeatNumber === "NA" ? (
                      <>
                        <Icon as={FiAlertCircle} color="red.500" boxSize={5} mr={2} />
                        <Text fontSize="md">Missing</Text>
                      </>
                    ) : (
                      <Text fontSize="md">{viewData?.class12SeatNumber}</Text>
                    )}
                  </Box>
                </Box>
                )}

                {/* class12Mode */}
                <Box display={"flex"} justifyContent={"space-between"} alignItems={"center"} p={"10px"}>
                  <Heading pr={2} as="h5" size="sm">Class 12 Mode</Heading>
                  <Box display="flex" alignItems="center">
                  {viewData?.class12Mode === null || viewData?.class12Mode === "NA" ? (
                      <>
                        <Icon as={FiAlertCircle} color="red.500" boxSize={5} mr={2} />
                        <Text fontSize="md">Missing</Text>
                      </>
                    ) : (
                      <Text fontSize="md">{viewData?.class12Mode}</Text>
                    )}
                  </Box>
                </Box>

                {/* class12AdmissionYear */}
                <Box display={"flex"} justifyContent={"space-between"} alignItems={"center"} p={"10px"}>
                  <Heading pr={2} as="h5" size="sm">Class 12 Admission Year</Heading>
                  <Box display="flex" alignItems="center">
                  {viewData?.class12AdmissionYear === null || viewData?.class12AdmissionYear === "NA" ? (
                      <>
                        <Icon as={FiAlertCircle} color="red.500" boxSize={5} mr={2} />
                        <Text fontSize="md">Missing</Text>
                      </>
                    ) : (
                      <Text fontSize="md">{viewData?.class12AdmissionYear}</Text>
                    )}
                  </Box>
                </Box>

                {/* class12PassingYear */}
                <Box display={"flex"} justifyContent={"space-between"} alignItems={"center"} p={"10px"}>
                  <Heading pr={2} as="h5" size="sm">Class 12 Passing Year</Heading>
                  <Box display="flex" alignItems="center">
                  {viewData?.class12PassingYear === null || viewData?.class12PassingYear === "NA" ? (
                      <>
                        <Icon as={FiAlertCircle} color="red.500" boxSize={5} mr={2} />
                        <Text fontSize="md">Missing</Text>
                      </>
                    ) : (
                      <Text fontSize="md">{viewData?.class12PassingYear}</Text>
                    )}
                  </Box>
                </Box>

                {/* class12Result */}
                <Box display={"flex"} justifyContent={"space-between"} alignItems={"center"} p={"10px"}>
                  <Heading pr={2} as="h5" size="sm">Class 12 Result</Heading>
                  <Box display="flex" alignItems="center">
                  {viewData?.class12Result === null || viewData?.class12Result === "NA" ? (
                      <>
                        <Icon as={FiAlertCircle} color="red.500" boxSize={5} mr={2} />
                        <Text fontSize="md">Missing</Text>
                      </>
                    ) : (
                      <Text fontSize="md">{viewData?.class12Result}</Text>
                    )}
                  </Box>
                </Box>

                {/* class12Percentage */}
                <Box display={"flex"} justifyContent={"space-between"} alignItems={"center"} p={"10px"}>
                  <Heading pr={2} as="h5" size="sm">Class 12 Percentage</Heading>
                  <Box display="flex" alignItems="center">
                  {viewData?.class12Percentage === null || viewData?.class12Percentage === "NA" ? (
                      <>
                        <Icon as={FiAlertCircle} color="red.500" boxSize={5} mr={2} />
                        <Text fontSize="md">Missing</Text>
                      </>
                    ) : (
                      <Text fontSize="md">{viewData?.class12Percentage}%</Text>
                    )}
                  </Box>
                </Box>

                {/* class12Attempts */}
                <Box display={"flex"} justifyContent={"space-between"} alignItems={"center"} p={"10px"}>
                  <Heading pr={2} as="h5" size="sm">Class 12 Attempts</Heading>
                  <Box display="flex" alignItems="center">
                  {viewData?.class12Attempts === null || viewData?.class12Attempts === "NA" ? (
                      <>
                        <Icon as={FiAlertCircle} color="red.500" boxSize={5} mr={2} />
                        <Text fontSize="md">Missing</Text>
                      </>
                    ) : (
                      <Text fontSize="md">{viewData?.class12Attempts}</Text>
                    )}
                  </Box>
                </Box>




                {/* class12Doc */}
                <Box
                  display={"flex"}
                  justifyContent={"space-between"}
                  alignItems={"center"}
                  p={"10px"}
                >
                  <Heading pr={2} as="h5" size="sm">
                    Class 12th Marksheet
                  </Heading>
                  <Text fontSize="md">
                  {viewData?.class12Doc && viewData?.class12Doc.trim?.() !== "" ? (
                      <a href={viewData.class12Doc} target="_blank" rel="noopener noreferrer">
                        Click! <ExternalLinkIcon mx="2px" />
                      </a>
                    ) : (
                      <>
                        <Icon as={FiAlertCircle} color="red.500" boxSize={5} mr={2} /><Text fontSize="md">Missing</Text>
                      </>)}
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

                    {/* Badge to show missing fields count */}
                    {(() => {
                      const fields = [
                        viewData?.areYouHostellerDayScholar
                      ];


                      // If the user is a hosteller, check for missing fields in other hostel-related fields
                      if (viewData?.areYouHostellerDayScholar === "Hosteller") {
                        fields.push(
                                //this is for conditional rendering 
                                viewData?.hostelType,
                                viewData?.hostelPgName,
                                viewData?.hostelPgAddress,
                                viewData?.hostelPgPincode,
                                viewData?.hostelAdmissionDate,
                                viewData?.isMessAvailable,
                                viewData?.rentPerMonth,
                        );
                      }

                      // const missingFieldsCount = fields.filter(field => field === null || field === "NA").length;
                      const missingFieldsCount = fields.filter(field => !field || field.trim?.() === "").length;
                      return missingFieldsCount > 0 && (
                        <Badge ml={3} colorScheme="red" fontSize="0.8em">
                          {missingFieldsCount} Fields Missing
                        </Badge>
                      );
                    })()}

                    {/* Badge to show missing documents count */}
                    {(() => {
                      const documents =[viewData?.hostelCertificate];

                      const missingDocumentsCount = documents.filter((doc) => doc === null).length;

                      return missingDocumentsCount > 0 && (
                        <Badge ml={3} colorScheme="red" fontSize="0.8em">
                          {missingDocumentsCount} Documents Missing
                        </Badge>
                      );
                    })()}
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
                {/* Are you a Hosteller or Day Scholar */}
                <Box display={"flex"} justifyContent={"space-between"} alignItems={"center"} p={"10px"}>
                  <Heading pr={2} as="h5" size="sm">Are you a Hosteller or Day Scholar</Heading>
                  <Box display="flex" alignItems="center">
                    {viewData?.areYouHostellerDayScholar === null || viewData?.areYouHostellerDayScholar === "NA" ? (
                      <>
                        <Icon as={FiAlertCircle} color="red.500" boxSize={5} mr={2} />
                        <Text fontSize="md">Missing</Text>
                      </>
                    ) : (
                      <Text fontSize="md">{viewData?.areYouHostellerDayScholar}</Text>
                    )}
                  </Box>
                </Box>

                {/* Render other fields only if the user is a Hosteller */}
                {viewData?.areYouHostellerDayScholar === "Hosteller" && (
                  <>
                    {/* Hostel Type */}
                    <Box display={"flex"} justifyContent={"space-between"} alignItems={"center"} p={"10px"}>
                      <Heading pr={2} as="h5" size="sm">Hostel Type</Heading>
                      <Box display="flex" alignItems="center">
                      {viewData?.hostelType === null || viewData?.hostelType === "NA" ? (
                          <>
                            <Icon as={FiAlertCircle} color="red.500" boxSize={5} mr={2} />
                            <Text fontSize="md">Missing</Text>
                          </>
                        ) : (
                          <Text fontSize="md">{viewData?.hostelType}</Text>
                        )}
                      </Box>
                    </Box>

                    {/* Hostel/P.G/Rented House Name */}
                    <Box display={"flex"} justifyContent={"space-between"} alignItems={"center"} p={"10px"}>
                      <Heading pr={2} as="h5" size="sm">Hostel/ P.G/Rented House Name</Heading>
                      <Box display="flex" alignItems="center">
                      {viewData?.hostelPgName === null || viewData?.hostelPgName === "NA" ? (
                          <>
                            <Icon as={FiAlertCircle} color="red.500" boxSize={5} mr={2} />
                            <Text fontSize="md">Missing</Text>
                          </>
                        ) : (
                          <Text fontSize="md">{viewData?.hostelPgName}</Text>
                        )}
                      </Box>
                    </Box>

                    {/* Hostel/P.G/Rented House Address */}
                    <Box display={"flex"} justifyContent={"space-between"} alignItems={"center"} p={"10px"}>
                      <Heading pr={2} as="h5" size="sm">Hostel/ P.G/Rented House Address</Heading>
                      <Box display="flex" alignItems="center">
                      {viewData?.hostelPgAddress === null || viewData?.hostelPgAddress === "NA" ? (
                          <>
                            <Icon as={FiAlertCircle} color="red.500" boxSize={5} mr={2} />
                            <Text fontSize="md">Missing</Text>
                          </>
                        ) : (
                          <Text fontSize="md">{viewData?.hostelPgAddress}</Text>
                        )}
                      </Box>
                    </Box>

                    {/* Hostel Pin Code */}
                    <Box display={"flex"} justifyContent={"space-between"} alignItems={"center"} p={"10px"}>
                      <Heading pr={2} as="h5" size="sm">Hostel Pin Code</Heading>
                      <Box display="flex" alignItems="center">
                      {viewData?.hostelPgPincode === null || viewData?.hostelPgPincode === "NA" ? (
                          <>
                            <Icon as={FiAlertCircle} color="red.500" boxSize={5} mr={2} />
                            <Text fontSize="md">Missing</Text>
                          </>
                        ) : (
                          <Text fontSize="md">{viewData?.hostelPgPincode}</Text>
                        )}
                      </Box>
                    </Box>

                    {/* Hostel Admission Date */}
                    <Box display={"flex"} justifyContent={"space-between"} alignItems={"center"} p={"10px"}>
                      <Heading pr={2} as="h5" size="sm">Hostel Admission Date</Heading>
                      <Box display="flex" alignItems="center">
                      {viewData?.hostelAdmissionDate === null || viewData?.hostelAdmissionDate === "NA" ? (
                          <>
                            <Icon as={FiAlertCircle} color="red.500" boxSize={5} mr={2} />
                            <Text fontSize="md">Missing</Text>
                          </>
                        ) : (
                          <Text fontSize="md">{viewData?.hostelAdmissionDate}</Text>
                        )}
                      </Box>
                    </Box>

                    {/* Is mess available? */}
                    <Box display={"flex"} justifyContent={"space-between"} alignItems={"center"} p={"10px"}>
                      <Heading pr={2} as="h5" size="sm">Is mess available?</Heading>
                      <Box display="flex" alignItems="center">
                      {viewData?.isMessAvailable === null || viewData?.isMessAvailable === "NA" ? (
                          <>
                            <Icon as={FiAlertCircle} color="red.500" boxSize={5} mr={2} />
                            <Text fontSize="md">Missing</Text>
                          </>
                        ) : (
                          <Text fontSize="md">{viewData?.isMessAvailable}</Text>
                        )}
                      </Box>
                    </Box>

                    {/* Rent per month */}
                    <Box display={"flex"} justifyContent={"space-between"} alignItems={"center"} p={"10px"}>
                      <Heading pr={2} as="h5" size="sm">Rent per month?</Heading>
                      <Box display="flex" alignItems="center">
                      {viewData?.rentPerMonth === null || viewData?.rentPerMonth === "NA" ? (
                          <>
                            <Icon as={FiAlertCircle} color="red.500" boxSize={5} mr={2} />
                            <Text fontSize="md">Missing</Text>
                          </>
                        ) : (
                          <Text fontSize="md">{viewData?.rentPerMonth}</Text>
                        )}
                      </Box>
                    </Box>

                    {/* Hostel Certificate */}
                    <Box
                      display={"flex"}
                      justifyContent={"space-between"}
                      alignItems={"center"}
                      p={"10px"}
                    >
                      <Heading pr={2} as="h5" size="sm">
                        Hostel Certificate
                      </Heading>
                      <Text fontSize="md">
                      {viewData?.hostelCertificate && viewData?.hostelCertificate.trim?.() !== "" ? (
                          <a href={viewData.hostelCertificate} target="_blank" rel="noopener noreferrer">
                            Click! <ExternalLinkIcon mx="2px" />
                          </a>
                        ) : (
                          <>
                            <Icon as={FiAlertCircle} color="red.500" boxSize={5} mr={2} /><Text fontSize="md">Missing</Text>
                          </>)}
                      </Text>
                    </Box>
                  </>
                )}
              </SimpleGrid>
            </AccordionPanel>
          </AccordionItem>

          <AccordionItem>
            <h2>
              <AccordionButton sx={{ backgroundColor: 'blue.900', color: 'white' }}>
                <Box as="span" flex="1" textAlign="left">
                  <Heading as="h2" size="md" p={"20px"}>
                    Scheme Wise Details
                    {/* Badge to show missing fields count */}
                    {(() => {
                      const fields = [
                        viewData?.previousYearApplicationId,
                        viewData?.numberOfBeneficiaryInFamily,
                        viewData?.howManyBoysChild,
                        viewData?.isYourParentAlphabhudarak,
                        viewData?.isRegisteredLabour,
                        viewData?.admittedUnderEws
                      ];
                      const missingFieldsCount = fields.filter(field => field === null || field === "NA").length;

                      if (
                        viewData?.admissionCasteCateogary === 'EBC') {
                        fields.push(viewData?.leavingCertDoc);
                      }

                      if (
                        viewData?.admissionCasteCateogary === 'SEBC' ||
                        viewData?.admissionCasteCateogary === 'General') {
                        fields.push(viewData?.isYourParentAlphabhudarak)
                        fields.push(viewData?.isRegisteredLabour)
                        fields.push(viewData?.admittedUnderEws);
                      }


                      return missingFieldsCount > 0 && (
                        <Badge ml={3} colorScheme="red" fontSize="0.8em">
                          {missingFieldsCount} Fields Missing
                        </Badge>
                      );
                    })()}

                    {/* Badge to show missing documents count */}
                    {(() => {
                      const documents = [viewData?.declarationCertDoc];
                      const missingDocumentsCount = documents.filter((doc) => doc === null).length;

                      // Only count the allotment letter if it's Second Year
                      if (
                        viewData?.admissionCasteCateogary === 'SC' ||
                        viewData?.admissionCasteCateogary === 'OBC' ||
                        viewData?.admissionCasteCateogary === 'SBC' ||
                        viewData?.admissionCasteCateogary === 'VJNT' ||
                        viewData?.admissionCasteCateogary === 'ST') {
                        documents.push(viewData?.leavingCertDoc);
                      }

                      if (
                        viewData?.admissionCasteCateogary === 'OBC' ||
                        viewData?.admissionCasteCateogary === 'SBC' ||
                        viewData?.admissionCasteCateogary === 'VJNT' ||
                        viewData?.admissionCasteCateogary === 'ST') {
                        documents.push(viewData?.casteValidityDoc);
                      }

                      if (
                        viewData?.admissionCasteCateogary === 'SEBC' ||
                        viewData?.admissionCasteCateogary === 'General') {
                        documents.push(viewData?.alphabhudharakDoc)
                        documents.push(viewData?.labourDoc);
                      }




                      return missingDocumentsCount > 0 && (
                        <Badge ml={3} colorScheme="red" fontSize="0.8em">
                          {missingDocumentsCount} Documents Missing
                        </Badge>
                      );
                    })()}
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
                <Button
                  ml={2}
                  colorScheme={isSchemeVerified ? "green" : "red"}
                  size="sm"
                  onClick={(e) => handleVerifyClick(e, 'scheme')}
                >
                  {isSchemeVerified ? "Verified" : "Not Verified"}
                </Button>

                <AccordionIcon />
              </AccordionButton>
            </h2>
            <AccordionPanel pb={4}>
              <SimpleGrid columns={3} spacing={10}>
                {/* Previous year application id */}
                <Box display={"flex"} justifyContent={"space-between"} alignItems={"center"} p={"10px"}>
                  <Heading pr={2} as="h5" size="sm">Previous year application id</Heading>
                  <Box display="flex" alignItems="center">
                    {viewData?.previousYearApplicationId === null ? (
                      <>
                        <Icon as={FiAlertCircle} color="red.500" boxSize={5} mr={2} />
                        <Text fontSize="md">Missing</Text>
                      </>
                    ) : (
                      <Text fontSize="md">{viewData?.previousYearApplicationId}</Text>
                    )}
                  </Box>
                </Box>

                {/* Number of beneficiary in family */}
                <Box display={"flex"} justifyContent={"space-between"} alignItems={"center"} p={"10px"}>
                  <Heading pr={2} as="h5" size="sm">Number of beneficiary in family?</Heading>
                  <Box display="flex" alignItems="center">
                    {viewData?.numberOfBeneficiaryInFamily === null ? (
                      <>
                        <Icon as={FiAlertCircle} color="red.500" boxSize={5} mr={2} />
                        <Text fontSize="md">Missing</Text>
                      </>
                    ) : (
                      <Text fontSize="md">{viewData?.numberOfBeneficiaryInFamily}</Text>
                    )}
                  </Box>
                </Box>

                {/* How many boy child */}
                <Box display={"flex"} justifyContent={"space-between"} alignItems={"center"} p={"10px"}>
                  <Heading pr={2} as="h5" size="sm">How many boy child?</Heading>
                  <Box display="flex" alignItems="center">
                    {viewData?.howManyBoysChild === null ? (
                      <>
                        <Icon as={FiAlertCircle} color="red.500" boxSize={5} mr={2} />
                        <Text fontSize="md">Missing</Text>
                      </>
                    ) : (
                      <Text fontSize="md">{viewData?.howManyBoysChild}</Text>
                    )}
                  </Box>
                </Box>

                {/* Is your parent AlphaBhuDharak */}
                {(viewData?.admissionCasteCateogary === 'SEBC' ||
                  viewData?.admissionCasteCateogary === 'General') && (
                    <Box display={"flex"} justifyContent={"space-between"} alignItems={"center"} p={"10px"}>
                      <Heading pr={2} as="h5" size="sm">Is your parent AlphaBhuDharak?</Heading>
                      <Box display="flex" alignItems="center">
                        {viewData?.isYourParentAlphabhudarak === null ? (
                          <>
                            <Icon as={FiAlertCircle} color="red.500" boxSize={5} mr={2} />
                            <Text fontSize="md">Missing</Text>
                          </>
                        ) : (
                          <Text fontSize="md">{viewData?.isYourParentAlphabhudarak}</Text>
                        )}
                      </Box>
                    </Box>
                  )}

                {/* Alpabhudarak Doc*/}
                {(viewData?.isYourParentAlphabhudarak === 'Yes') && (
                  <Box display={"flex"} justifyContent={"space-between"} alignItems={"center"} p={"10px"}>
                    <Heading pr={2} as="h5" size="sm">Alphabhudarak Doc </Heading>
                    <Text fontSize="md">
                      {viewData?.alphabhudharakDoc ? (
                        <a href={viewData.alphabhudharakDoc} target="_blank" rel="noopener noreferrer">
                          Click! <ExternalLinkIcon mx="2px" />
                        </a>
                      ) : (
                        <>
                          <Icon as={FiAlertCircle} color="red.500" boxSize={5} mr={2} />
                          <Text fontSize="md">Missing</Text>
                        </>
                      )}
                    </Text>
                  </Box>
                )}


                {/* Admitted under EWS */}
                {(viewData?.admissionCasteCateogary === 'SEBC' ||
                  viewData?.admissionCasteCateogary === 'General') && (
                    <Box display={"flex"} justifyContent={"space-between"} alignItems={"center"} p={"10px"}>
                      <Heading pr={2} as="h5" size="sm">Admitted under EWS?</Heading>
                      <Box display="flex" alignItems="center">
                        {viewData?.admittedUnderEws === null ? (
                          <>
                            <Icon as={FiAlertCircle} color="red.500" boxSize={5} mr={2} />
                            <Text fontSize="md">Missing</Text>
                          </>
                        ) : (
                          <Text fontSize="md">{viewData?.admittedUnderEws}</Text>
                        )}
                      </Box>
                    </Box>
                  )}

                {/* Is your parent registered labour */}
                {(viewData?.admissionCasteCateogary === 'SEBC' ||
                  viewData?.admissionCasteCateogary === 'General'
                ) && (
                    <Box display={"flex"} justifyContent={"space-between"} alignItems={"center"} p={"10px"}>
                      <Heading pr={2} as="h5" size="sm">Is your parent registered labour?</Heading>
                      <Box display="flex" alignItems="center">
                        {viewData?.isRegisteredLabour === null ? (
                          <>
                            <Icon as={FiAlertCircle} color="red.500" boxSize={5} mr={2} />
                            <Text fontSize="md">Missing</Text>
                          </>
                        ) : (
                          <Text fontSize="md">{viewData?.isRegisteredLabour}</Text>
                        )}
                      </Box>
                    </Box>
                  )}

                {/* Registered Labour Doc*/}
                {(viewData?.isRegisteredLabour === 'Yes') && (
                  <Box display={"flex"} justifyContent={"space-between"} alignItems={"center"} p={"10px"}>
                    <Heading pr={2} as="h5" size="sm">Registered Labour Doc </Heading>
                    <Text fontSize="md">
                      {viewData?.labourDoc ? (
                        <a href={viewData.labourDoc} target="_blank" rel="noopener noreferrer">
                          Click! <ExternalLinkIcon mx="2px" />
                        </a>
                      ) : (
                        <>
                          <Icon as={FiAlertCircle} color="red.500" boxSize={5} mr={2} />
                          <Text fontSize="md">Missing</Text>
                        </>
                      )}
                    </Text>
                  </Box>
                )}

                {/* Declaration Cert */}
                <Box display={"flex"} justifyContent={"space-between"} alignItems={"center"} p={"10px"}>
                  <Heading pr={2} as="h5" size="sm">Declaration Certificate</Heading>
                  <Text fontSize="md">
                    {viewData?.declarationCertDoc ? (
                      <a href={viewData.declarationCertDoc} target="_blank" rel="noopener noreferrer">
                        Click! <ExternalLinkIcon mx="2px" />
                      </a>
                    ) : (
                      <>
                        <Icon as={FiAlertCircle} color="red.500" boxSize={5} mr={2} />
                        <Text fontSize="md">Missing</Text>
                      </>
                    )}
                  </Text>
                </Box>

                {/* Leaving Certificate */}
                {(viewData?.admissionCasteCateogary === 'SC' ||
                  viewData?.admissionCasteCateogary === 'OBC' ||
                  viewData?.admissionCasteCateogary === 'SBC' ||
                  viewData?.admissionCasteCateogary === 'VJNT' ||
                  viewData?.admissionCasteCateogary === 'ST') && (
                    <Box display={"flex"} justifyContent={"space-between"} alignItems={"center"} p={"10px"}>
                      <Heading pr={2} as="h5" size="sm">Leaving Certificate</Heading>
                      <Text fontSize="md">
                        {viewData?.leavingCertDoc ? (
                          <a href={viewData.leavingCertDoc} target="_blank" rel="noopener noreferrer">
                            Click! <ExternalLinkIcon mx="2px" />
                          </a>
                        ) : (
                          <>
                            <Icon as={FiAlertCircle} color="red.500" boxSize={5} mr={2} />
                            <Text fontSize="md">Missing</Text>
                          </>
                        )}
                      </Text>
                    </Box>
                  )}

                {/* Caste Validity */}
                {(viewData?.admissionCasteCateogary === 'OBC' ||
                  viewData?.admissionCasteCateogary === 'SBC' ||
                  viewData?.admissionCasteCateogary === 'VJNT' ||
                  viewData?.admissionCasteCateogary === 'ST') && (
                    <Box display={"flex"} justifyContent={"space-between"} alignItems={"center"} p={"10px"}>
                      <Heading pr={2} as="h5" size="sm">Caste Validity</Heading>
                      <Text fontSize="md">
                        {viewData?.casteValidityDoc ? (
                          <a href={viewData.casteValidityDoc} target="_blank" rel="noopener noreferrer">
                            Click! <ExternalLinkIcon mx="2px" />
                          </a>
                        ) : (
                          <>
                            <Icon as={FiAlertCircle} color="red.500" boxSize={5} mr={2} />
                            <Text fontSize="md">Missing</Text>
                          </>
                        )}
                      </Text>
                    </Box>
                  )}
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

        <Edit_Prsnl_FreshStud_Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} id={selectedId} />
        {/* <Upload_Document_Modal isOpen={isModalOpenUpload} onClose={() => setisModalOpenUpload(false)}  /> */}
        <Edit_Caste_FreshStud_Model isOpen={isCasteModalOpen} onClose={() => setIsCasteModalOpen(false)} id={selectedId} />

        <Edit_Income_FreshStud_Modal isOpen={isIncomeModalOpen} onClose={() => setIsIncomeModalOpen(false)} id={selectedId} />
        
        <Edit_Domi_FreshStud_Modal isOpen={isDomiModalOpen} onClose={() => setIsDomiModalOpen(false)} id={selectedId} />
        <Edit_Current_Course_Fresh_Modal isOpen={isCurrentCourseModalOpen} onClose={() => setIsCurrentCourseModalOpen(false)} id={selectedId} />
        <Edit_10th_FreshStud_Modal isOpen={is10thModalOpen} onClose={() => setIs10thModalOpen(false)} id={selectedId} />
        <Edit_12th_FreshStud_Modal isOpen={is12thModalOpen} onClose={() => setIs12thModalOpen(false)} id={selectedId} />
        <Edit_Hostel_Fresh_Modal isOpen={isHostelModalOpen} onClose={() => setIsHostelModalOpen(false)} id={selectedId} />
        <Edit_Scheme_Renewal_Modal isOpen={isSchemeModalOpen} onClose={() => setIsSchemeModalOpen(false)} id={selectedId} />


      </Base>
    </div>
  );
}

export default viewFreshStud;