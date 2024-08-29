import React, { useEffect, useState } from "react";
import { useParams } from 'react-router-dom';
import { Table as AntTable } from "antd";
import { Select } from "@chakra-ui/react";
import {
  Box,
  Button,
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  Heading,
  Flex,
  Spacer,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
  useToast,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  FormControl,
  FormLabel,
  Input,
  Textarea,
} from "@chakra-ui/react";
import { ChevronRightIcon, DownloadIcon } from "@chakra-ui/icons";
import { BsThreeDotsVertical } from "react-icons/bs";
import Base from "../../components/Base";
import { getScAppIdApi, chargeSubscription, addTranch } from "../../api/ScTracker";
import { DatePicker } from 'antd';
import { v4 as uuidv4 } from 'uuid';
import dayjs from 'dayjs';

const datePickerStyles = `
  .ant-picker-dropdown {
    z-index: 1500 !important;
  }
`;

const ScStudentDetails = () => {
  const { ApplicationID } = useParams();
  const [students, setStudents] = useState([]);
  const toast = useToast();

  // Modal states for charge subscription
  const [isModalOpenCharge, setIsModalOpenCharge] = useState(false);
  const [scheduledOn, setScheduledOn] = useState(null);
  const [amount, setAmount] = useState('');
  const [remarks, setRemarks] = useState('Charge Subscription');
  const [merchantTxnId, setMerchantTxnId] = useState('');
  
  // Modal states for adding tranch
  const [isModalOpenAddTranch, setIsModalOpenAddTranch] = useState(false);
  const [creditDate, setCreditDate] = useState(null);
  const [tranch, setTranch] = useState('');
  const [tranchAmount, setTranchAmount] = useState('');
  const [name, setName] = useState('');
  const [status, setStatus] = useState('');
  const [referenceId, setReferenceId] = useState(''); // Add referenceId state

  useEffect(() => {
    console.log("ApplicationID:", ApplicationID);
    getAllStudents();
  }, [ApplicationID]);

  const columns = [
    {
      title: "ID",
      dataIndex: "id",
      key: "id",
      sorter: (a, b) => a.id - b.id,
    },
    {
      title: "Student Name",
      dataIndex: "Name",
      key: "Name",
    },
    {
      title: "Credited",
      dataIndex: "Credited_Date",
      key: "Credited_Date",
    },
    {
      title: "Amount",
      dataIndex: "Amount",
      key: "Amount",
    },
    {
      title: "Tranche",
      dataIndex: "Tranch",
      key: "Tranch",
    },
    {
      title: "Application ID",
      dataIndex: "ApplicationID",
      key: "ApplicationID",
    },
    {
      title: "Status",
      dataIndex: "Status",
      key: "Status",
    },
    {
      title: "Reference ID",
      dataIndex: "refID",
      key: "Status",
    },
    {
      title: "Action",
      key: "action",
      render: (text, record) => (
        <Menu>
          <MenuButton as={Button} variant="ghost">
            <BsThreeDotsVertical />
          </MenuButton>
          <MenuList>
            <MenuItem>View</MenuItem>
            <MenuItem onClick={() => handleDelete(record.ApplicationID)}>Delete</MenuItem>
          </MenuList>
        </Menu>
      ),
    },
  ];

  const getAllStudents = async () => {
    try {
      const res = await getScAppIdApi(ApplicationID);
      if (res.success) {
        setStudents(res.data);
        if (res.data.length > 0) {
          setName(res.data[0].Name);
          setReferenceId(res.data[0].referenceId || ''); // Set referenceId
        }
      } else {
        console.error("Failed to fetch data:", res.error);
      }
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  const handleDelete = (ApplicationID) => {
    console.log("Delete item with Application ID:", ApplicationID);
    toast({
      title: "Delete action triggered",
      description: `Delete functionality to be implemented for Application ID: ${ApplicationID}`,
      status: "info",
      duration: 5000,
      isClosable: true,
      position: "top-right",
    });
  };

  const downloadCSVFileOfCollegeList = () => {
    downloadCSVFileOfCOllegeListFunctionApi()
      .then((res) => {
        if (res.success) {
          const csvData = res.data
            .map((obj) => Object.values(obj).join(","))
            .join("\n");

          const blob = new Blob([csvData], { type: "text/csv" });
          const link = document.createElement("a");
          link.href = window.URL.createObjectURL(blob);
          link.download = "csvforcollegelist.csv";

          document.body.appendChild(link);
          link.click();

          document.body.removeChild(link);
          window.URL.revokeObjectURL(link.href);
        } else {
          console.error("Failed to download CSV:", res.error);
        }
      })
      .catch((error) => {
        console.error("Error downloading CSV:", error);
      });
  };

  const openModalCharge = () => {
    setIsModalOpenCharge(true);
    setMerchantTxnId(uuidv4());
  };

  const closeModalCharge = () => {
    setIsModalOpenCharge(false);
  };

  const openModalAddTranch = () => {
    const tranchNumber = students.length + 1;
    setTranch(tranchNumber.toString());
    setIsModalOpenAddTranch(true);
    setName(students[0]?.Name || '');
    setReferenceId(students[0]?.referenceId || ''); // Set referenceId when opening modal
  };

  const closeModalAddTranch = () => {
    setIsModalOpenAddTranch(false);
  };

  const handleCharge = async () => {
    const formattedScheduledOn = scheduledOn ? dayjs(scheduledOn).format('YYYY-MM-DD') : null;

    const chargeData = {
      amount,
      remarks,
      scheduledOn: formattedScheduledOn,
      merchantTxnId,
    };

    console.log("Data to be sent:", chargeData);

    try {
      const response = await chargeSubscription(chargeData);
      if (response.success) {
        toast({
          title: "Success",
          description: response.message || "Charge data added successfully!",
          status: "success",
          duration: 5000,
          isClosable: true,
          position: "top-right",
        });
      } else {
        toast({
          title: "Error",
          description: response.message || "An error occurred while adding charge data.",
          status: "error",
          duration: 5000,
          isClosable: true,
          position: "top-right",
        });
      }
    } catch (error) {
      console.error("Error adding charge data:", error);
      toast({
        title: "Error",
        description: "An error occurred while adding charge data.",
        status: "error",
        duration: 5000,
        isClosable: true,
        position: "top-right",
      });
    }

    closeModalCharge();
  };

  const handleAddTranch = async () => {
    const formattedCreditDate = creditDate ? dayjs(creditDate).format('YYYY-MM-DD') : null;

    const tranchData = {
      ApplicationID,
      name,
      status,
      tranchAmount,
      tranch,
      creditDate: formattedCreditDate,
      referenceId, // Include referenceId in the tranchData
    };

    console.log("Data to be sent:", tranchData);

    try {
      const response = await addTranch(tranchData);
      if (response.success) {
        toast({
          title: "Success",
          description: response.message || "Tranch data added successfully!",
          status: "success",
          duration: 5000,
          isClosable: true,
          position: "top-right",
        });
      } else {
        toast({
          title: "Error",
          description: response.message || "An error occurred while adding tranch data.",
          status: "error",
          duration: 5000,
          isClosable: true,
          position: "top-right",
        });
      }
    } catch (error) {
      console.error("Error adding tranch data:", error);
      toast({
        title: "Error",
        description: "An error occurred while adding tranch data.",
        status: "error",
        duration: 5000,
        isClosable: true,
        position: "top-right",
      });
    }

    closeModalAddTranch();
  };

  return (
    <Base>
      <style>{datePickerStyles}</style>
      <Box p={4}>
        <Breadcrumb spacing="8px" separator={<ChevronRightIcon color="gray.500" />}>
          <BreadcrumbItem>
            <BreadcrumbLink href="#">Home</BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbItem isCurrentPage>
            <BreadcrumbLink href="#">StudentDetails</BreadcrumbLink>
          </BreadcrumbItem>
        </Breadcrumb>
        <Flex alignItems="center" justifyContent="space-between" mt={4}>
          <Heading as="h1" size="lg">
            Student Details
          </Heading>
          <Flex alignItems="center">
            <Button colorScheme="blue" mr={4} onClick={downloadCSVFileOfCollegeList}>
              Download CSV
            </Button>
            <Button colorScheme="blue" mr={4} onClick={openModalCharge}>
              Charge Subscription
            </Button>
            <Button colorScheme="blue" onClick={openModalAddTranch}>
              Add Tranch
            </Button>
          </Flex>
        </Flex>
        <AntTable columns={columns} dataSource={students} rowKey="id" pagination={false} />

        {/* Modal for Charge Subscription */}
        <Modal isOpen={isModalOpenCharge} onClose={closeModalCharge}>
          <ModalOverlay />
          <ModalContent>
            <ModalHeader>Charge Subscription</ModalHeader>
            <ModalCloseButton />
            <ModalBody>
              <FormControl mb={4}>
                <FormLabel>Scheduled On</FormLabel>
                <DatePicker
                  value={scheduledOn}
                  onChange={(date) => setScheduledOn(date)}
                />
              </FormControl>
              <FormControl mb={4}>
                <FormLabel>Amount</FormLabel>
                <Input
                  type="number"
                  value={amount}
                  onChange={(e) => setAmount(e.target.value)}
                />
              </FormControl>
              <FormControl mb={4}>
                <FormLabel>Remarks</FormLabel>
                <Textarea
                  value={remarks}
                  onChange={(e) => setRemarks(e.target.value)}
                />
              </FormControl>
            </ModalBody>
            <ModalFooter>
              <Button colorScheme="blue" mr={3} onClick={handleCharge}>
                Submit
              </Button>
              <Button variant="ghost" onClick={closeModalCharge}>
                Cancel
              </Button>
            </ModalFooter>
          </ModalContent>
        </Modal>

        {/* Modal for Adding Tranch */}
        <Modal isOpen={isModalOpenAddTranch} onClose={closeModalAddTranch}>
          <ModalOverlay />
          <ModalContent>
            <ModalHeader>Add Tranch</ModalHeader>
            <ModalCloseButton />
            <ModalBody>
              <FormControl mb={4}>
                <FormLabel>Tranch</FormLabel>
                <Input
                  type="text"
                  value={tranch}
                  onChange={(e) => setTranch(e.target.value)}
                />
              </FormControl>
              <FormControl mb={4}>
                <FormLabel>Tranch Amount</FormLabel>
                <Input
                  type="number"
                  value={tranchAmount}
                  onChange={(e) => setTranchAmount(e.target.value)}
                />
              </FormControl>
              <FormControl mb={4}>
                <FormLabel>Credit Date</FormLabel>
                <DatePicker
                  value={creditDate}
                  onChange={(date) => setCreditDate(date)}
                />
              </FormControl>
              <FormControl mb={4}>
                <FormLabel>Name</FormLabel>
                <Input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />
              </FormControl>
              <FormControl mb={4}>
                <FormLabel>Status</FormLabel>
                <Input
                  type="text"
                  value={status}
                  onChange={(e) => setStatus(e.target.value)}
                />
              </FormControl>
              <FormControl mb={4}>
                <FormLabel>Reference ID</FormLabel>
                <Input
                  type="text"
                  value={referenceId}
                  onChange={(e) => setReferenceId(e.target.value)}
                />
              </FormControl>
            </ModalBody>
            <ModalFooter>
              <Button colorScheme="blue" mr={3} onClick={handleAddTranch}>
                Submit
              </Button>
              <Button variant="ghost" onClick={closeModalAddTranch}>
                Cancel
              </Button>
            </ModalFooter>
          </ModalContent>
        </Modal>
      </Box>
    </Base>
  );
};

export default ScStudentDetails;




// import React, { useEffect, useState } from "react";
// import { useParams, NavLink } from 'react-router-dom';
// import { Table as AntTable } from "antd";
// import {
//   Box,
//   Button,
//   Breadcrumb,
//   BreadcrumbItem,
//   BreadcrumbLink,
//   Heading,
//   Flex,
//   Spacer,
//   Menu,
//   MenuButton,
//   MenuItem,
//   MenuList,
//   useToast,
//   Text,
//   Modal,
//   ModalOverlay,
//   ModalContent,
//   ModalHeader,
//   ModalFooter,
//   ModalBody,
//   ModalCloseButton,
//   FormControl,
//   FormLabel,
//   Input,
//   Textarea,
// } from "@chakra-ui/react";
// import { ChevronRightIcon, DownloadIcon } from "@chakra-ui/icons";
// import { BsThreeDotsVertical } from "react-icons/bs";
// import Base from "../../components/Base";
// import { downloadCSVFileOfCOllegeListFunctionApi } from "../../api/College";
// import { getScAppIdApi } from "../../api/ScTracker"; //to search student by application id
// import { DatePicker } from 'antd';
// import { v4 as uuidv4 } from 'uuid';
// import { chargeSubscription } from '../../api/ScTracker'; // Update the path to match your file structure
// import dayjs from 'dayjs';

// const ScStudentDetails = () => {
//   const { ApplicationID } = useParams(); // Extracting ApplicationID from the URL
//   const [students, setStudents] = useState([]); // Changed 'college' to 'students' for clarity
//   const [accountSum, setAccountSum] = useState(0);
//   const [subReferenceId, setSubReferenceId] = useState('');
//   const toast = useToast();

//   const [isModalOpen, setIsModalOpen] = useState(false);
//   const [scheduledOn, setScheduledOn] = useState(null);
//   const [amount, setAmount] = useState('');
//   const [remarks, setRemarks] = useState('Charge Subscription');
//   const [merchantTxnId, setMerchantTxnId] = useState('');

//   useEffect(() => {
//     console.log("ApplicationID:", ApplicationID); // Debugging line
//     getAllColleges();
//   }, [ApplicationID]);

//   // useEffect(() => {
//   //   if (students.length > 0) {
//   //     const sum = students.reduce((acc, curr) => {
//   //       const accountNumber = parseFloat(curr.AccountNumber_AsPerBank || 0);
//   //       console.log(`Account Number: ${accountNumber}`);
//   //       return acc + accountNumber;
//   //     }, 0);
//   //     setAccountSum(sum);
//   //     console.log(`Calculated Account Sum: ${sum}`);
//   //   }
//   // }, [students]);

//   const columns = [
//     {
//       title: "ID",
//       dataIndex: "id",
//       key: "id",
//       sorter: (a, b) => a.id - b.id,
//     },
//     {
//       title: "Beneficiary Name",
//       dataIndex: "Candidate_name",
//       key: "Candidate_name",
//     },
//     {
//       title: "Credited",
//       dataIndex: "Credited",
//       key: "Credited",
//     },
//     {
//       title: "Account Number",
//       dataIndex: "AccountNumber_AsPerBank",
//       key: "AccountNumber_AsPerBank",
//     },
//     {
//       title: "Transaction ID",
//       dataIndex: "Credit_Transaction_ID",
//       key: "Credit_Transaction_ID",
//     },
//     {
//       title: "Credit Date",
//       dataIndex: "Credit_Date",
//       key: "Credit_Date",
//     },
//     {
//       title: "Status",
//       dataIndex: "Status",
//       key: "Status",
//     },
//     {
//       title: "Application ID",
//       dataIndex: "ApplicationID",
//       key: "ApplicationID",
//     },
//     {
//       title: "Mobile Number",
//       dataIndex: "whatsapp_number",
//       key: "whatsapp_number",
//     },
//     {
//       title: "Action",
//       key: "action",
//       render: (text, record) => (
//         <Menu>
//           <MenuButton as={Button} variant="ghost">
//             <BsThreeDotsVertical />
//           </MenuButton>
//           <MenuList>
//             <MenuItem>View</MenuItem>
//             <MenuItem onClick={() => handleDelete(record.ApplicationID)}>Delete</MenuItem>
//           </MenuList>
//         </Menu>
//       ),
//     },
//   ];

//   const onChange = (pagination, filters, sorter, extra) => {};

//   const getAllColleges = async () => {
//     try {
//       const res = await getScAppIdApi(ApplicationID);
//       if (res.success) {
//         // Handle successful data fetch
//         console.log("Fetched data:", res.data);
//         setStudents(res.data); // Set the fetched data to the state
//       } else {
//         console.error("Failed to fetch data:", res.error);
//       }
//     } catch (error) {
//       console.error("Error fetching data:", error);
//     }
//   };

//   const handleDelete = (ApplicationID) => {
//     console.log("Delete item with Application ID:", ApplicationID);
//     toast({
//       title: "Delete action triggered",
//       description: `Delete functionality to be implemented for Application ID: ${ApplicationID}`,
//       status: "info",
//       duration: 5000,
//       isClosable: true,
//       position: "top-right",
//     });
//   };

//   const downloadCSVFileOfCollegeList = () => {
//     downloadCSVFileOfCOllegeListFunctionApi()
//       .then((res) => {
//         if (res.success) {
//           const csvData = res.data
//             .map((obj) => Object.values(obj).join(","))
//             .join("\n");

//           const blob = new Blob([csvData], { type: "text/csv" });
//           const link = document.createElement("a");
//           link.href = window.URL.createObjectURL(blob);
//           link.download = "csvforcollegelist.csv";

//           document.body.appendChild(link);
//           link.click();

//           document.body.removeChild(link);
//           window.URL.revokeObjectURL(link.href);
//         } else {
//           console.error("Failed to download CSV:", res.error);
//         }
//       })
//       .catch((error) => {
//         console.error("Error downloading CSV:", error);
//       });
//   };

//   const openModal = () => {
//     setIsModalOpen(true);
//     setMerchantTxnId(uuidv4());  // Generate unique ID when opening the modal
//   };

//   const closeModal = () => {
//     setIsModalOpen(false);
//   };

//   const handleCharge = async () => {
//     const formattedScheduledOn = scheduledOn ? dayjs(scheduledOn).format('YYYY-MM-DD') : null;

//     const data = {
//       ApplicationID,
//       subReferenceId,
//       accountSum,
//       scheduledOn: formattedScheduledOn, // Format the date before sending
//       amount,
//       remarks,
//       merchantTxnId,
//     };

//     // Print data to console before hitting the API
//     console.log("Data to be sent:", data);

//     try {
//       const res = await chargeSubscription(data);
//       if (res.success) {
//         toast({
//           title: "Success",
//           description: res.message,
//           status: "success",
//           duration: 5000,
//           isClosable: true,
//           position: "top-right",
//         });
//       } else {
//         toast({
//           title: "Error",
//           description: res.message,
//           status: "error",
//           duration: 5000,
//           isClosable: true,
//           position: "top-right",
//         });
//       }
//     } catch (error) {
//       toast({
//         title: "Error",
//         description: "An error occurred while charging the subscription",
//         status: "error",
//         duration: 5000,
//         isClosable: true,
//         position: "top-right",
//       });
//       console.error("Error charging subscription:", error);
//     }

//     closeModal();
//   };

//   return (
//     <Base>
//       <Box py={5} px={5} bg={"text.light"} borderWidth="1px" borderRadius="lg">
//         <Flex>
//           <Box>
//             <Heading as="h4" size={"md"} my={2}>
//               PFMS Tracker
//             </Heading>

//             <Button onClick={downloadCSVFileOfCollegeList}>
//               <DownloadIcon />
//             </Button>

//             <Breadcrumb
//               spacing="8px"
//               separator={<ChevronRightIcon color="gray.500" />}
//               fontSize={15}
//             >
//               <BreadcrumbItem>
//                 <BreadcrumbLink>
//                   <NavLink to="/dashboard/admin">Dashboard</NavLink>
//                 </BreadcrumbLink>
//               </BreadcrumbItem>

//               <BreadcrumbItem>
//                 <NavLink to="/dashboard/admin/ScStudentDetails">ScStudentDetails</NavLink>
//               </BreadcrumbItem>

//               <BreadcrumbItem isCurrentPage>
//                 <BreadcrumbLink>Details</BreadcrumbLink>
//               </BreadcrumbItem>
//             </Breadcrumb>
//           </Box>
//           <Spacer />
//           <Box>
//             {/* Add Tranch Button */}
//               <Button colorScheme="blue" mr={100} mt={10}>
//                  Add Tranch
//                </Button>

//             {/* <Text position={"absolute"} right={180} top={50}>
//               Total Scholarship Received: {accountSum}
//             </Text> */}
//             <Button colorScheme="teal" position="absolute" right={7} top={40} onClick={openModal}>
//               Charge
//             </Button>
//           </Box>
//         </Flex>
//       </Box>
//       <Box bg="white" my={3}>
//         <AntTable
//           rowKey={"id"}
//           columns={columns}
//           dataSource={students}
//           onChange={onChange}
//           bordered={true}
//           loading={false}
//         />
//       </Box>
//       <Box py={5} px={5} bg={"text.light"} borderWidth="1px" borderRadius="lg" mt={4}>
//         <Heading as="h4" size={"md"} my={2}>
//           Application ID: {ApplicationID}
//         </Heading>
//         <Text>Sub Reference ID: {subReferenceId}</Text>
//       </Box>

//       <Modal isOpen={isModalOpen} onClose={closeModal}>
//         <ModalOverlay />
//         <ModalContent>
//           <ModalHeader>Charge Subscription</ModalHeader>
//           <ModalCloseButton />
//           <ModalBody>
//             <Text>Total Scholarship Received: {accountSum}</Text>
//             <Text>Sub Reference ID: {subReferenceId}</Text>
//             <Text>Merchant Txn ID: {merchantTxnId}</Text>
//             <FormControl mt={4}>
//               <FormLabel>Scheduled On</FormLabel>
//               <DatePicker 
//                 onChange={date => setScheduledOn(date)} 
//                 popupStyle={{ zIndex: 1400 }} // Adjust the z-index
//               />
//             </FormControl>
//             <FormControl mt={4}>
//               <FormLabel>Amount</FormLabel>
//               <Input value={amount} onChange={e => setAmount(e.target.value)} />
//             </FormControl>
//             <FormControl mt={4}>
//               <FormLabel>Remarks</FormLabel>
//               <Textarea value={remarks} isReadOnly />
//             </FormControl>
//           </ModalBody>
//           <ModalFooter>
//             <Button colorScheme="blue" mr={3} onClick={handleCharge}>
//               Charge Subscription
//             </Button>
//             <Button variant="ghost" onClick={closeModal}>Cancel</Button>
//           </ModalFooter>
//         </ModalContent>
//       </Modal>
//     </Base>
//   );
// }

// export default ScStudentDetails;





///////////////////////////////

// //this is code is the base code and fully functional till fetching subrefernceid

// import React, { useEffect, useState } from "react";
// import { useParams, NavLink } from 'react-router-dom';
// import { Table as AntTable } from "antd";
// import {
//   Box,
//   Button,
//   Breadcrumb,
//   BreadcrumbItem,
//   BreadcrumbLink,
//   Heading,
//   Flex,
//   Spacer,
//   Menu,
//   MenuButton,
//   MenuItem,
//   MenuList,
//   useToast,
//   Text,
// } from "@chakra-ui/react";
// import { ChevronRightIcon, DownloadIcon } from "@chakra-ui/icons";
// import { BsThreeDotsVertical } from "react-icons/bs";
// import Base from "../../components/Base";
// import { isAuthenticated } from "../../helpers/AuthHelpers";
// import { downloadCSVFileOfCOllegeListFunctionApi } from "../../api/College";
// import { getScAppIdApi } from "../../api/ScTracker";

// const ScStudentDetails = () => {
//   const { ApplicationID  } = useParams();
//   const [college, setCollegeList] = useState([]);
//   const [accountSum, setAccountSum] = useState(0);
//   const [students, setStudents] = useState([]);
//   const [subReferenceId, setSubReferenceId] = useState('');
//   const toast = useToast();

//   useEffect(() => {
//     getAllColleges();
//   }, [applicationId]);

//   useEffect(() => {
//     if (college.length > 0) {
//       const sum = college.reduce((acc, curr) => acc + parseFloat(curr.AccountNumber_AsPerBank || 0), 0);
//       setAccountSum(sum);
//     }
//   }, [college]);

//   useEffect(() => {
//     if (students.length > 0) {
//       console.log("Students:", students);
//     }
//     console.log("Sub Reference ID:", subReferenceId);
//   }, [students, subReferenceId]);

//   const columns = [
//     {
//       title: "ID",
//       dataIndex: "id",
//       key: "id",
//       sorter: (a, b) => a.id - b.id,
//     },
//     {
//       title: "Beneficiary Name",
//       dataIndex: "Beneficiary_Name",
//       key: "Beneficiary_Name",
//     },
//     {
//       title: "Scheme Name",
//       dataIndex: "SchemeName",
//       key: "SchemeName",
//     },
//     {
//       title: "Credited",
//       dataIndex: "Credited",
//       key: "Credited",
//     },
//     {
//       title: "Account Number",
//       dataIndex: "AccountNumber_AsPerBank",
//       key: "AccountNumber_AsPerBank",
//     },
//     {
//       title: "Transaction ID",
//       dataIndex: "Credit_Transaction_ID",
//       key: "Credit_Transaction_ID",
//     },
//     {
//       title: "Credit Date",
//       dataIndex: "Credit_Date",
//       key: "Credit_Date",
//     },
//     {
//       title: "Status",
//       dataIndex: "Status",
//       key: "Status",
//     },
//     {
//       title: "Application ID",
//       dataIndex: "First_ApplicationID",
//       key: "First_ApplicationID",
//     },
//     {
//       title: "whatsapp_number",
//       dataIndex: "whatsapp_number",
//       key: "whatsapp_number",
//     },
//     {
//       title: "Action",
//       key: "action",
//       render: (text, record) => (
//         <Menu>
//           <MenuButton as={Button} variant="ghost">
//             <BsThreeDotsVertical />
//           </MenuButton>
//           <MenuList>
//             <MenuItem>View</MenuItem>
//             <MenuItem onClick={() => handleDelete(record.First_ApplicationID)}>Delete</MenuItem>
//           </MenuList>
//         </Menu>
//       ),
//     },
//   ];

//   const onChange = (pagination, filters, sorter, extra) => {};

//   const getAllColleges = async () => {
//     try {
//       const res = await getScAppIdApi(applicationId);
//       if (res.success) {
//         setCollegeList(res.data);
//         setStudents(res.data.students);

//         // Assuming subscriptions is an array in the response data
//         if (res.data.subscriptions && res.data.subscriptions.length > 0) {
//           setSubReferenceId(res.data.subscriptions[0].subReferenceId); // Adjust as needed to get the correct subReferenceId
//         } else {
//           setSubReferenceId('');
//         }
//       } else {
//         setCollegeList([]);
//         console.error("Failed to fetch college data:", res.error);
//       }
//     } catch (error) {
//       setCollegeList([]);
//       console.error("Error fetching college data:", error);
//     }
//   };

//   const handleDelete = (applicationID) => {
//     console.log("Delete item with Application ID:", applicationID);
//     toast({
//       title: "Delete action triggered",
//       description: `Delete functionality to be implemented for Application ID: ${applicationID}`,
//       status: "info",
//       duration: 5000,
//       isClosable: true,
//       position: "top-right",
//     });
//   };

//   const downloadCSVFileOfCollegeList = () => {
//     downloadCSVFileOfCOllegeListFunctionApi()
//       .then((res) => {
//         if (res.success) {
//           const csvData = res.data
//             .map((obj) => Object.values(obj).join(","))
//             .join("\n");

//           const blob = new Blob([csvData], { type: "text/csv" });
//           const link = document.createElement("a");
//           link.href = window.URL.createObjectURL(blob);
//           link.download = "csvforcollegelist.csv";

//           document.body.appendChild(link);
//           link.click();

//           document.body.removeChild(link);
//           window.URL.revokeObjectURL(link.href);
//         } else {
//           console.error("Failed to download CSV:", res.error);
//         }
//       })
//       .catch((error) => {
//         console.error("Error downloading CSV:", error);
//       });
//   };

//   return (
//     <Base>
//       <Box py={5} px={5} bg={"text.light"} borderWidth="1px" borderRadius="lg">
//         <Flex>
//           <Box>
//             <Heading as="h4" size={"md"} my={2}>
//               PFMS Tracker
//             </Heading>

//             <Button onClick={downloadCSVFileOfCollegeList}>
//               <DownloadIcon />
//             </Button>

//             <Breadcrumb
//               spacing="8px"
//               separator={<ChevronRightIcon color="gray.500" />}
//               fontSize={15}
//             >
//               <BreadcrumbItem>
//                 <BreadcrumbLink>
//                   <NavLink to="/dashboard/admin">Dashboard</NavLink>
//                 </BreadcrumbLink>
//               </BreadcrumbItem>

//               <BreadcrumbItem>
//                 <NavLink to="/dashboard/admin/ScStudentDetails">ScStudentDetails</NavLink>
//               </BreadcrumbItem>

//               <BreadcrumbItem isCurrentPage>
//                 <BreadcrumbLink>Details</BreadcrumbLink>
//               </BreadcrumbItem>
//             </Breadcrumb>
//           </Box>
//           <Spacer />
//           <Box>
//             <Text position={"absolute"} right={180} top={205}>Total Scholarship Received : {accountSum}</Text>
//             <Button colorScheme="teal" position="absolute" right={7} top={195}>
//               Charge
//             </Button>
//           </Box>
//         </Flex>
//       </Box>
//       <Box bg="white" my={3}>
//         <AntTable
//           rowKey={"id"}
//           columns={columns}
//           dataSource={students}
//           onChange={onChange}
//           bordered={true}
//           loading={false}
//         />
//       </Box>
//       <Box py={5} px={5} bg={"text.light"} borderWidth="1px" borderRadius="lg" mt={4}>
//         <Heading as="h4" size={"md"} my={2}>
//           Application ID: {applicationId}
//         </Heading>
//         <Text>Sub Reference ID: {subReferenceId}</Text>
//       </Box>
//     </Base>
//   );
// }

// export default ScStudentDetails;
