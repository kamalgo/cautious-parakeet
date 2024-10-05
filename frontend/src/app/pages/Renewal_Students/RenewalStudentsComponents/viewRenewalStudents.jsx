
import { Progress } from '@chakra-ui/react';
import CustomCard from "./CustomCard";
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
              viewData?.referenceId,
              viewData?.alternateMobileNumber,
              viewData?.mahadbt_Login,
              viewData?.Mahadbt_Username,
              viewData?.Mahadbt_Password
            ];
            const missingFieldsCount = fields.filter(field => field === null).length;

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

      {/* Candidate Name */}
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
      </Box>

      {/* Email */}
      <Box display={"flex"} justifyContent={"space-between"} alignItems={"center"} p={"10px"}>
        <Heading pr={2} as="h5" size="sm">
          Email
        </Heading>
        <Box display="flex" alignItems="center">
          {viewData?.email === null ? (
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
          {viewData?.whatsappNumber === null ? (
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
          {viewData?.referenceId === null ? (
            <>
              <Icon as={FiAlertCircle} color="red.500" boxSize={5} mr={2} />
              <Text fontSize="md">Missing</Text>
            </>
          ) : (
            <Text fontSize="md">{viewData?.referenceId}</Text>
          )}
        </Box>
      </Box>

      {/* Alternate Mobile Number */}
      <Box display={"flex"} justifyContent={"space-between"} alignItems={"center"} p={"10px"}>
        <Heading pr={2} as="h5" size="sm">
          Alternate Mobile Number
        </Heading>
        <Box display="flex" alignItems="center">
          {viewData?.alternateMobileNumber === null ? (
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
          {viewData?.mahadbt_Login === null ? (
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
          {viewData?.Mahadbt_Username === null ? (
            <>
              <Icon as={FiAlertCircle} color="red.500" boxSize={5} mr={2} />
              <Text fontSize="md">Missing</Text>
            </>
          ) : (
            <Text fontSize="md">{viewData?.Mahadbt_Username}</Text>
          )}
        </Box>
      </Box>

      {/* MahaDBT Password */}
      <Box display={"flex"} justifyContent={"space-between"} alignItems={"center"} p={"10px"}>
        <Heading pr={2} as="h5" size="sm">
          MahaDBT Password
        </Heading>
        <Box display="flex" alignItems="center">
          {viewData?.Mahadbt_Password === null ? (
            <>
              <Icon as={FiAlertCircle} color="red.500" boxSize={5} mr={2} />
              <Text fontSize="md">Missing</Text>
            </>
          ) : (
            <Text fontSize="md">{viewData?.Mahadbt_Password}</Text>
          )}
        </Box>
      </Box>

      {/* Aadhaar Number */}
      <Box display={"flex"} justifyContent={"space-between"} alignItems={"center"} p={"10px"}>
        <Heading pr={2} as="h5" size="sm">
          Aadhaar Number
        </Heading>
        <Box display="flex" alignItems="center">
          {viewData?.aadhar_number === null ? (
            <>
              <Icon as={FiAlertCircle} color="red.500" boxSize={5} mr={2} />
              <Text fontSize="md">Missing</Text>
            </>
          ) : (
            <Text fontSize="md">{viewData?.aadhar_number}</Text>
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
                    Income Details
                  </Heading>

                  {/* Badge to show missing fields count */}
                  {(() => {
                    const fields = [
                      viewData?.annualIncome,
                      viewData?.incomeCertYesNo,
                      viewData?.incomeCertNumber,
                      viewData?.incomeIssuingAuthority,
                      viewData?.incomeIssueDate,
                    ];
                    const missingFieldsCount = fields.filter((field) => field === null).length;

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
                    {viewData?.annualIncome === null ? (
                      <>
                        <Icon as={FiAlertCircle} color="red.500" boxSize={5} mr={2} />
                        <Text fontSize="md">Missing</Text>
                      </>
                    ) : (
                      <Text fontSize="md">{viewData?.annualIncome}</Text>
                    )}
                  </Box>
                </Box>

                {/* Income Certificate (Yes/No) */}
                <Box display={"flex"} justifyContent={"space-between"} alignItems={"center"} p={"10px"}>
                  <Heading pr={2} as="h5" size="sm">Do you have income certificate?</Heading>
                  <Box display="flex" alignItems="center">
                    {viewData?.incomeCertYesNo === null ? (
                      <>
                        <Icon as={FiAlertCircle} color="red.500" boxSize={5} mr={2} />
                        <Text fontSize="md">Missing</Text>
                      </>
                    ) : (
                      <Text fontSize="md">{viewData?.incomeCertYesNo}</Text>
                    )}
                  </Box>
                </Box>

                {/* Income Certificate Number */}
                <Box display={"flex"} justifyContent={"space-between"} alignItems={"center"} p={"10px"}>
                  <Heading pr={2} as="h5" size="sm">Income Certificate Number</Heading>
                  <Box display="flex" alignItems="center">
                    {viewData?.incomeCertNumber === null ? (
                      <>
                        <Icon as={FiAlertCircle} color="red.500" boxSize={5} mr={2} />
                        <Text fontSize="md">Missing</Text>
                      </>
                    ) : (
                      <Text fontSize="md">{viewData?.incomeCertNumber}</Text>
                    )}
                  </Box>
                </Box>

                {/* Income Certificate Issuing Authority */}
                <Box display={"flex"} justifyContent={"space-between"} alignItems={"center"} p={"10px"}>
                  <Heading pr={2} as="h5" size="sm">Income Certificate Issuing Authority</Heading>
                  <Box display="flex" alignItems="center">
                    {viewData?.incomeIssuingAuthority === null ? (
                      <>
                        <Icon as={FiAlertCircle} color="red.500" boxSize={5} mr={2} />
                        <Text fontSize="md">Missing</Text>
                      </>
                    ) : (
                      <Text fontSize="md">{viewData?.incomeIssuingAuthority}</Text>
                    )}
                  </Box>
                </Box>

                {/* Income Certificate Issuing Date */}
                <Box display={"flex"} justifyContent={"space-between"} alignItems={"center"} p={"10px"}>
                  <Heading pr={2} as="h5" size="sm">Income Certificate Issuing Date</Heading>
                  <Box display="flex" alignItems="center">
                    {viewData?.incomeIssueDate === null ? (
                      <>
                        <Icon as={FiAlertCircle} color="red.500" boxSize={5} mr={2} />
                        <Text fontSize="md">Missing</Text>
                      </>
                    ) : (
                      <Text fontSize="md">{viewData?.incomeIssueDate}</Text>
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
                    {viewData?.incomeDoc ? (
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
              <AccordionButton sx={{ backgroundColor: 'blue.900', color: 'white' }}>
                <Box as="span" flex="1" textAlign="left" display="flex" alignItems="center">
                  <Heading as="h2" size="md" p={"20px"}>
                    Current Course
                  </Heading>

                  {/* Badge to show missing fields count */}
                  {(() => {
                    const fields = [
                      viewData?.instituteName,
                      viewData?.instituteState,
                      viewData?.instituteDistrict,
                      viewData?.instituteTaluka,
                      viewData?.presentYearOfStudy,
                      viewData?.pastYearOfStudy,
                      viewData?.presentYearCompletedPursuing,
                      viewData?.pastYearCompletedPursuing,
                      viewData?.resultPassedAtkt,
                      viewData?.previousYearPercentage,
                      viewData?.admissionYearOfThatCourse,
                      viewData?.admissionDateCurrentCourse,
                      viewData?.admissionYear,

                    ];
                    const missingFieldsCount = fields.filter(field => !field || field === "NA").length;

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
                    if (viewData?.presentYearOfStudy === "Second Year" || viewData?.admissionCasteCateogary === "SC") {
                      documents.push(viewData?.allotmentLetterDoc);
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

                {/* institute Name */}
                <Box display={"flex"} justifyContent={"space-between"} alignItems={"center"} p={"10px"}>
                  <Heading pr={2} as="h5" size="sm">Institute Name</Heading>
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

                {/* Present year of study */}
                <Box display={"flex"} justifyContent={"space-between"} alignItems={"center"} p={"10px"}>
                  <Heading pr={2} as="h5" size="sm">Present year of study</Heading>
                  <Box display="flex" alignItems="center">
                    {viewData?.presentYearOfStudy === null || viewData?.presentYearOfStudy === "NA" ? (
                      <>
                        <Icon as={FiAlertCircle} color="red.500" boxSize={5} mr={2} />
                        <Text fontSize="md">Missing</Text>
                      </>
                    ) : (
                      <Text fontSize="md">{viewData?.presentYearOfStudy}</Text>
                    )}
                  </Box>
                </Box>

                {/* Past year of study */}
                <Box display={"flex"} justifyContent={"space-between"} alignItems={"center"} p={"10px"}>
                  <Heading pr={2} as="h5" size="sm">Past year of study</Heading>
                  <Box display="flex" alignItems="center">
                    {viewData?.pastYearOfStudy === null || viewData?.pastYearOfStudy === "NA" ? (
                      <>
                        <Icon as={FiAlertCircle} color="red.500" boxSize={5} mr={2} />
                        <Text fontSize="md">Missing</Text>
                      </>
                    ) : (
                      <Text fontSize="md">{viewData?.pastYearOfStudy}</Text>
                    )}
                  </Box>
                </Box>

                {/* present Year Completed Pursuing*/}
                <Box display={"flex"} justifyContent={"space-between"} alignItems={"center"} p={"10px"}>
                  <Heading pr={2} as="h5" size="sm">Present Year Completed Pursuing</Heading>
                  <Box display="flex" alignItems="center">
                    {viewData?.presentYearCompletedPursuing === null || viewData?.presentYearCompletedPursuing === "NA" ? (
                      <>
                        <Icon as={FiAlertCircle} color="red.500" boxSize={5} mr={2} />
                        <Text fontSize="md">Missing</Text>
                      </>
                    ) : (
                      <Text fontSize="md">{viewData?.presentYearCompletedPursuing}</Text>
                    )}
                  </Box>
                </Box>


                {/* past Year Completed Pursuing*/}
                <Box display={"flex"} justifyContent={"space-between"} alignItems={"center"} p={"10px"}>
                  <Heading pr={2} as="h5" size="sm">Past Year Completed Pursuing</Heading>
                  <Box display="flex" alignItems="center">
                    {viewData?.pastYearCompletedPursuing === null || viewData?.pastYearCompletedPursuing === "NA" ? (
                      <>
                        <Icon as={FiAlertCircle} color="red.500" boxSize={5} mr={2} />
                        <Text fontSize="md">Missing</Text>
                      </>
                    ) : (
                      <Text fontSize="md">{viewData?.pastYearCompletedPursuing}</Text>
                    )}
                  </Box>
                </Box>


                {/* result Passed Atkt */}
                <Box display={"flex"} justifyContent={"space-between"} alignItems={"center"} p={"10px"}>
                  <Heading pr={2} as="h5" size="sm"> Result </Heading>
                  <Box display="flex" alignItems="center">
                    {viewData?.resultPassedAtkt === null || viewData?.resultPassedAtkt === "NA" ? (
                      <>
                        <Icon as={FiAlertCircle} color="red.500" boxSize={5} mr={2} />
                        <Text fontSize="md">Missing</Text>
                      </>
                    ) : (
                      <Text fontSize="md">{viewData?.resultPassedAtkt}</Text>
                    )}
                  </Box>
                </Box>


                {/* previous Year Percentage*/}
                <Box display={"flex"} justifyContent={"space-between"} alignItems={"center"} p={"10px"}>
                  <Heading pr={2} as="h5" size="sm">Previous Year Percentage </Heading>
                  <Box display="flex" alignItems="center">
                    {viewData?.previousYearPercentage === null || viewData?.previousYearPercentage === "NA" ? (
                      <>
                        <Icon as={FiAlertCircle} color="red.500" boxSize={5} mr={2} />
                        <Text fontSize="md">Missing</Text>
                      </>
                    ) : (
                      <Text fontSize="md">{viewData?.previousYearPercentage}</Text>
                    )}
                  </Box>
                </Box>


                {/* admissionYearOfThatCourse */}
                <Box display={"flex"} justifyContent={"space-between"} alignItems={"center"} p={"10px"}>
                  <Heading pr={2} as="h5" size="sm">Admission Year of Current Course</Heading>
                  <Box display="flex" alignItems="center">
                    {viewData?.admissionYearOfThatCourse === null || viewData?.admissionYearOfThatCourse === "NA" ? (
                      <>
                        <Icon as={FiAlertCircle} color="red.500" boxSize={5} mr={2} />
                        <Text fontSize="md">Missing</Text>
                      </>
                    ) : (
                      <Text fontSize="md">{viewData?.admissionYearOfThatCourse}</Text>
                    )}
                  </Box>
                </Box>


                {/* admissionDateCurrentCourse */}
                <Box display={"flex"} justifyContent={"space-between"} alignItems={"center"} p={"10px"}>
                  <Heading pr={2} as="h5" size="sm">Admission Date of current course</Heading>
                  <Box display="flex" alignItems="center">
                    {viewData?.admissionDateCurrentCourse === null || viewData?.admissionDateCurrentCourse === "NA" ? (
                      <>
                        <Icon as={FiAlertCircle} color="red.500" boxSize={5} mr={2} />
                        <Text fontSize="md">Missing</Text>
                      </>
                    ) : (
                      <Text fontSize="md">{viewData?.admissionDateCurrentCourse}</Text>
                    )}
                  </Box>
                </Box>

                {/* Admission Year */}

                {/* {(viewData?.presentYearOfStudy === Third Year && viewdata?.pastYearOfStudy === Second Year) &&
                <Box display={"flex"} justifyContent={"space-between"} alignItems={"center"} p={"10px"}>
                  <Heading pr={2} as="h5" size="sm">Admission Year of College</Heading>
                  <Box display="flex" alignItems="center">
                    {viewData?.admissionYear === null || viewData?.admissionYear === "NA" ? (
                      <>
                        <Icon as={FiAlertCircle} color="red.500" boxSize={5} mr={2} />
                        <Text fontSize="md">Missing</Text>
                      </>
                    ) : (
                      <Text fontSize="md">{viewData?.admissionYear}</Text>
                    )} }
                  </Box>
                </Box> */}


{/* Admission Year */}
{(viewData?.presentYearOfStudy === "Third Year" && viewData?.pastYearCompletedPursuing === "Direct Second Year Completed"  ) && (
  <Box display={"flex"} justifyContent={"space-between"} alignItems={"center"} p={"10px"}>
    <Heading pr={2} as="h5" size="sm">Admission Year of College</Heading>
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
)}



                <Box
                  display={"flex"}
                  justifyContent={"space-between"}
                  alignItems={"center"}
                  p={"10px"}
                >
                  <Heading pr={2} as="h5" size="sm">
                    Previous Year Marksheet Doc
                  </Heading>
                  <Text fontSize="md">
                    {viewData?.previousYearMarksheetDoc ? (
                      <a href={viewData.previousYearMarksheetDoc} target="_blank" rel="noopener noreferrer">
                        Click! <ExternalLinkIcon mx="2px" />
                      </a>
                    ) : (
                      <>
                        <Icon as={FiAlertCircle} color="red.500" boxSize={5} mr={2} /><Text fontSize="md">Missing</Text>
                      </>
                    )}
                  </Text>
                </Box>


                <Box
                  display={"flex"}
                  justifyContent={"space-between"}
                  alignItems={"center"}
                  p={"10px"}
                >
                  <Heading pr={2} as="h5" size="sm">
                    Fee Receipt Document
                  </Heading>
                  <Text fontSize="md">
                    {viewData?.feeReceiptDoc ? (
                      <a href={viewData.feeReceiptDoc} target="_blank" rel="noopener noreferrer">
                        Click! <ExternalLinkIcon mx="2px" />
                      </a>
                    ) : (
                      <>
                        <Icon as={FiAlertCircle} color="red.500" boxSize={5} mr={2} /><Text fontSize="md">Missing</Text>
                      </>)}
                  </Text>
                </Box>


                {/* Render CAP Allotment Letter if Present Year of Study is Second Year or admissionCasteCategory is OBC */}
                {(viewData?.presentYearOfStudy === "Second Year" || viewData?.admissionCasteCateogary === "SC") && (

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
                      {viewData?.allotmentLetterDoc ? (
                        <a href={viewData.allotmentLetterDoc} target="_blank" rel="noopener noreferrer">
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
                    Hostel Details

                    {/* Badge to show missing fields count */}
                    {(() => {
                      const fields = [viewData?.areYouHostellerDayScholar];
                      // If the user is a hosteller, check for missing fields in other hostel-related fields
                      if (viewData?.areYouHostellerDayScholar === "Hosteller") {
                        fields.push(
                          viewData?.hostelType,
                          viewData?.hostelPgName,
                          viewData?.hostelPgAddress,
                          viewData?.hostelPgPincode,
                          viewData?.hostelAdmissionDate,
                          viewData?.isMessAvailable,
                          viewData?.rentPerMonth
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
                      const documents = viewData?.areYouHostellerDayScholar === "Hosteller" ? [viewData?.hostelCertificate] : [];

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
                    {viewData?.areYouHostellerDayScholar === null ? (
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
                        {viewData?.hostelType === null ? (
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
                        {viewData?.hostelPgName === null ? (
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
                        {viewData?.hostelPgAddress === null ? (
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
                        {viewData?.hostelPgPincode === null ? (
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
                        {viewData?.hostelAdmissionDate === null ? (
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
                        {viewData?.isMessAvailable === null ? (
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
                        {viewData?.rentPerMonth === null ? (
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
                        {viewData?.hostelCertificate ? (
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

                {/* Is your parent registered labour */}
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

                {/* Admitted under EWS */}
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