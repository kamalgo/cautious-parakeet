// // //STC = Student Tracker College

// import { FaCheckCircle, FaTimesCircle } from 'react-icons/fa';
// import { Text } from '@chakra-ui/react';
// import React, { useState, useEffect } from "react";
// import { NavLink } from 'react-router-dom';
// import { Table as AntTable, Space, Modal, Button as AntButton, Input, Select } from "antd"; // Import Input and Select from Ant Design
// import {
//   Box,
//   Button,
//   Breadcrumb,
//   BreadcrumbItem,
//   BreadcrumbLink,
//   Heading,
//   Flex,
//   Spacer,
//   useToast,
// } from "@chakra-ui/react";
// import Base from "../../components/Base";
// import { ChevronRightIcon } from "@chakra-ui/icons";
// import moment from 'moment';
// import { getTtcollegeTranches, updatePaymentStatus } from "../../api/TTCollegeApi/TTCollegeApi";

// const { Option } = Select;

// const Stc = () => {
//   const [payments, setPayments] = useState([]);
//   const [showTrancheReceivedPopup, setShowTrancheReceivedPopup] = useState(false);
//   const [selectedPayment, setSelectedPayment] = useState(null);
//   const [searchText, setSearchText] = useState(''); // State for search text
//   const [selectedDateRange, setSelectedDateRange] = useState(''); // State for selected date range
//   const toast = useToast();

//   useEffect(() => {
//     fetchData();
//   }, [selectedDateRange]); // Trigger fetchData when selectedDateRange changes

//   const fetchData = async () => {
//     try {
//       const response = await getTtcollegeTranches(selectedDateRange); // Pass selectedDateRange to API call
//       setPayments(response.data);
//     } catch (error) {
//       console.error("Failed to fetch data:", error);
//       toast({
//         title: "Error",
//         description: "Failed to fetch data.",
//         status: "error",
//         duration: 5000,
//         isClosable: true,
//         position: "top-right",
//       });
//     }
//   };

//   const handleSearch = (value) => {
//     setSearchText(value);
//   };

//   const renderStatus = (status) => {
//     if (status === "Payment Success") {
//       return (
//         <Box display="flex" alignItems="center" color="green.500">
//           <Text>Payment Success</Text>
//           <FaCheckCircle size={24} style={{ marginRight: '8px' }} />
//         </Box>
//       );
//     } else if (status === "On Hold") {
//       return <Text color="orange.500">On Hold</Text>;
//     } else if (status === "Payment Declined") {
//       return (
//         <Box display="flex" alignItems="center" color="red.500">
//           <Text>Payment Declined</Text>
//           <FaTimesCircle size={24} style={{ marginRight: '8px' }} />
//         </Box>
//       );   
//     } else {
//       return <Text>{status}</Text>;
//     }
//   };

//   const columns = [
//     {
//       title: "ID",
//       dataIndex: "id",
//       key: "id",
//       sorter: (a, b) => a.id - b.id,
//     },
//     {
//       title: "Student Name",
//       dataIndex: "Name",
//       key: "Name",
//     },
//     {
//       title: "Status",
//       dataIndex: "Status",
//       key: "Status",
//       render: (text, record) => renderStatus(record.Status), // Use the renderStatus function here
//     },
//     {
//       title: "Amount",
//       dataIndex: "Amount",
//       key: "Amount",
//     },
//     {
//       title: "Application ID",
//       dataIndex: "ApplicationID",
//       key: "ApplicationID",
//     },
//     {
//       title: "Tranch",
//       dataIndex: "Tranch",
//       key: "Tranch",
//     },
//     {
//       title: "Credit Date",
//       dataIndex: "Credit_Date",
//       key: "Credit_Date",
//       render: (text, record) => moment(record.Credit_Date).format('YYYY-MM-DD HH:mm:ss'),
//     },
//     {
//       title: "Action",
//       key: "action",
//       render: (text, record) => (
//         <Space size="middle">
//           {record.Status === "Tranche Initiated" && (
//             <AntButton onClick={() => handleTrancheReceived(record)}>
//               Tranche Received
//             </AntButton>
//           )}
//         </Space>
//       ),
//     },
//   ];

//   // Filtered payments based on search text
//   const filteredPayments = searchText ? payments.filter(payment =>
//     payment.Name && payment.Name.toLowerCase().includes(searchText.toLowerCase())
//   ) : payments;

//   // Date range dropdown change handler
//   const handleDateRangeChange = (value) => {
//     setSelectedDateRange(value);
//   };

//   const handleTrancheReceived = (record) => {
//     setSelectedPayment(record);
//     setShowTrancheReceivedPopup(true);
//   };

//   const handleTrancheReceivedConfirm = async (confirmed) => {
//     if (confirmed) {
//       try {
//         const response = await updatePaymentStatus(selectedPayment.id, "Tranche Success");
//         if (response.success) {
//           const updatedPayments = payments.map(payment => {
//             if (payment.id === selectedPayment.id) {
//               return {
//                 ...payment,
//                 Status: "Tranche Success",
//               };
//             }
//             return payment;
//           });
//           setPayments(updatedPayments);
//           setShowTrancheReceivedPopup(false);

//           toast({
//             title: "Tranche Received",
//             description: `Payment ID ${selectedPayment.id} marked as Tranche Success.`,
//             status: "success",
//             duration: 5000,
//             isClosable: true,
//             position: "top-right",
//           });
//         } else {
//           throw new Error(response.error || "Failed to update payment status");
//         }
//       } catch (error) {
//         console.error("Error updating payment status:", error);
//         toast({
//           title: "Error",
//           description: "Failed to update payment status.",
//           status: "error",
//           duration: 5000,
//           isClosable: true,
//           position: "top-right",
//         });
//       }
//     } else {
//       setShowTrancheReceivedPopup(false);
//     }
//   };

//   const handleFileUpload = (event) => {
//     const file = event.target.files[0];
//     console.log("Selected file:", file);

//     const reader = new FileReader();
//     reader.onload = async (e) => {
//       const binaryStr = e.target.result;
//       console.log("File content:", binaryStr);
//       // Implement file upload logic here
//     };
//     reader.readAsBinaryString(file);

//     toast({
//       title: "File upload",
//       description: `File selected: ${file.name}`,
//       status: "info",
//       duration: 5000,
//       isClosable: true,
//       position: "top-right",
//     });
//   };

//   return (
//     <Base>
//       <Box p={5}>
//         <Breadcrumb spacing="8px" separator={<ChevronRightIcon color="gray.500" />}>
//           <BreadcrumbItem>
//             <BreadcrumbLink as={NavLink} to="/home">Home</BreadcrumbLink>
//           </BreadcrumbItem>
//           <BreadcrumbItem isCurrentPage>
//             <BreadcrumbLink>STC</BreadcrumbLink>
//           </BreadcrumbItem>
//         </Breadcrumb>
//         <Flex alignItems="center" mt={4}>
//           <Heading size="lg">Student Tranch Tracker</Heading>
//           <Spacer />
//           <Button as="label" colorScheme="blue">
//             Upload
//             <input
//               type="file"
//               accept=".csv, .xlsx, .xls"
//               hidden
//               onChange={handleFileUpload}
//             />
//           </Button>
//           <Select
//             value={selectedDateRange}
//             onChange={handleDateRangeChange}
//             style={{ width: 150, marginLeft: 10 }}
//           >
//             <Option value="today">Today</Option>
//             <Option value="yesterday">Yesterday</Option>
//             <Option value="thisWeek">This Week</Option>
//             <Option value="thisMonth">This Month</Option>
//           </Select>
//           <Input
//             placeholder="Search by student name"
//             value={searchText}
//             onChange={(e) => handleSearch(e.target.value)}
//             style={{ width: 200, marginLeft: 10 }}
//           />
//         </Flex>
//         <Box mt={4}>
//           <AntTable columns={columns} dataSource={filteredPayments} rowKey="id" />
//         </Box>
//       </Box>
//       <Modal
//         title={`Did you receive the payment for ${selectedPayment ? selectedPayment.Name : ''}?`}
//         visible={showTrancheReceivedPopup}
//         onCancel={() => setShowTrancheReceivedPopup(false)}
//         footer={[
//           <Button key="no" onClick={() => handleTrancheReceivedConfirm(false)} style={{ marginRight: '10px' }}>
//             No
//           </Button>,
//           <Button key="yes" type="primary" onClick={() => handleTrancheReceivedConfirm(true)}>
//             Yes
//           </Button>,
//         ]}
//       >
//         Please confirm if the payment was received.
//       </Modal>
//     </Base>
//   );
// };

// export default Stc;


import { Text } from '@chakra-ui/react';
import React, { useState, useEffect } from "react";
import { NavLink } from 'react-router-dom';
import { Table as AntTable, Space, Modal, Button as AntButton, Input, DatePicker, Select } from "antd";
import {
  Box,
  Button,
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  Heading,
  Flex,
  Spacer,
  useToast,
} from "@chakra-ui/react";
import Base from "../../components/Base";
import { ChevronRightIcon } from "@chakra-ui/icons";
import moment from 'moment';
// import { getTtcollegeTranches, updatePaymentStatus } from "../../api/TTCollegeApi/TTCollegeApi";

import { getTtcollegeTranches, updatePaymentStatus } from '../../api/StcApi/StcApi';

const { RangePicker } = DatePicker;
const { Option } = Select;

const Stc = () => {
  const [payments, setPayments] = useState([]);
  const [showTrancheReceivedPopup, setShowTrancheReceivedPopup] = useState(false);
  const [selectedPayment, setSelectedPayment] = useState(null);
  const [searchText, setSearchText] = useState('');
  const [dateRange, setDateRange] = useState([moment().startOf('day'), moment().endOf('day')]);
  const [dateFilterType, setDateFilterType] = useState('today');
  const toast = useToast();

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const response = await getTtcollegeTranches();
      setPayments(response.data);
    } catch (error) {
      console.error("Failed to fetch data:", error);
      toast({
        title: "Error",
        description: "Failed to fetch data.",
        status: "error",
        duration: 5000,
        isClosable: true,
        position: "top-right",
      });
    }
  };

  const handleSearch = (value) => {
    setSearchText(value);
  };

  const renderStatus = (status) => {
    if (status === "Tranche Initiated") {
      return <Text>Tranche Initiated</Text>;
    } else if (status === "On Hold") {
      return <Text>On Hold</Text>;
    } else if (status === "Tranche Success") {
      return <Text>Tranche Success</Text>;
    } else {
      return <Text>{status}</Text>;
    }
  };

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
      title: "Status",
      dataIndex: "Status",
      key: "Status",
      filters: [
        { text: 'Tranche Initiated', value: 'Tranche Initiated' },
        { text: 'On Hold', value: 'On Hold' },
        { text: 'Tranche Success', value: 'Tranche Success' },
      ],
      onFilter: (value, record) => record.Status.includes(value),
      render: (text, record) => renderStatus(record.Status),
      sorter: (a, b) => a.Status.localeCompare(b.Status),
    },
    {
      title: "Amount",
      dataIndex: "Amount",
      key: "Amount",
    },
    {
      title: "Application ID",
      dataIndex: "ApplicationID",
      key: "ApplicationID",
    },
    {
      title: "Tranch",
      dataIndex: "Tranch",
      key: "Tranch",
    },
    {
      title: "Credit Date",
      dataIndex: "Credited_Date",
      key: "Credited_Date",
      render: (text, record) => moment(record.Credited_Date).format('YYYY-MM-DD HH:mm:ss'),
    },
    {
      title: "Action",
      key: "action",
      render: (text, record) => (
        <Space size="middle">
          {record.Status === "Tranche Initiated" && (
            <AntButton onClick={() => handleTrancheReceived(record)}>
              Tranche Received
            </AntButton>
          )}
        </Space>
      ),
    },
  ];

  const handleDateFilterChange = (value) => {
    setDateFilterType(value);
    let startDate, endDate;

    switch (value) {
      case 'today':
        startDate = moment().startOf('day');
        endDate = moment().endOf('day');
        break;
      case 'yesterday':
        startDate = moment().subtract(1, 'day').startOf('day');
        endDate = moment().subtract(1, 'day').endOf('day');
        break;
      case 'this_week':
        startDate = moment().startOf('week');
        endDate = moment().endOf('week');
        break;
      case 'this_month':
        startDate = moment().startOf('month');
        endDate = moment().endOf('month');
        break;
      case 'all_time':
        startDate = null;
        endDate = null;
        break;
      case 'custom':
        startDate = null;
        endDate = null;
        break;
      default:
        startDate = null;
        endDate = null;
        break;
    }

    setDateRange([startDate, endDate]);
  };

  const handleCustomDateRangeChange = (dates) => {
    setDateRange(dates);
  };

  const filteredPayments = payments.filter(payment => {
    const matchesSearchText = searchText
      ? payment.Name && payment.Name.toLowerCase().includes(searchText.toLowerCase())
      : true;

    const matchesDateRange = dateRange[0] && dateRange[1]
      ? moment(payment.Credited_Date).isBetween(dateRange[0], dateRange[1], undefined, '[]')
      : true;

    return matchesSearchText && (dateFilterType === 'all_time' ? true : matchesDateRange);
  });

  const handleTrancheReceived = (record) => {
    setSelectedPayment(record);
    setShowTrancheReceivedPopup(true);
  };

  const handleTrancheReceivedConfirm = async (confirmed) => {
    if (confirmed) {
      try {
        const response = await updatePaymentStatus(selectedPayment.id, "Tranche Success");
        if (response.success) {
          const updatedPayments = payments.map(payment => {
            if (payment.id === selectedPayment.id) {
              return {
                ...payment,
                Status: "Tranche Success",
              };
            }
            return payment;
          });
          setPayments(updatedPayments);
          setShowTrancheReceivedPopup(false);

          toast({
            title: "Tranche Received",
            description: `Payment ID ${selectedPayment.id} marked as Tranche Success.`,
            status: "success",
            duration: 5000,
            isClosable: true,
            position: "top-right",
          });
        } else {
          throw new Error(response.error || "Failed to update payment status");
        }
      } catch (error) {
        console.error("Error updating payment status:", error);
        toast({
          title: "Error",
          description: "Failed to update payment status.",
          status: "error",
          duration: 5000,
          isClosable: true,
          position: "top-right",
        });
      }
    } else {
      setShowTrancheReceivedPopup(false);
    }
  };

  const handleFileUpload = (event) => {
    const file = event.target.files[0];
    console.log("Selected file:", file);

    const reader = new FileReader();
    reader.onload = async (e) => {
      const binaryStr = e.target.result;
      console.log("File content:", binaryStr);
      // Implement file upload logic here
    };
    reader.readAsBinaryString(file);

    toast({
      title: "File upload",
      description: `File selected: ${file.name}`,
      status: "info",
      duration: 5000,
      isClosable: true,
      position: "top-right",
    });
  };

  return (
    <Base>
      <Box p={5}>
        <Breadcrumb spacing="8px" separator={<ChevronRightIcon color="gray.500" />}>
          <BreadcrumbItem>
            <BreadcrumbLink as={NavLink} to="/home">Home</BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbItem isCurrentPage>
            <BreadcrumbLink>STC</BreadcrumbLink>
          </BreadcrumbItem>
        </Breadcrumb>
        <Flex alignItems="center" mt={4}>
          <Heading size="lg">Student Tranch Tracker</Heading>
          <Spacer />
          <Button as="label" colorScheme="blue">
            Upload
            <input
              type="file"
              accept=".csv, .xlsx, .xls"
              hidden
              onChange={handleFileUpload}
            />
          </Button>
          <Input
            placeholder="Search by student name"
            value={searchText}
            onChange={(e) => handleSearch(e.target.value)}
            style={{ width: 200, marginLeft: 10 }}
          />
          <Select
            value={dateFilterType}
            onChange={handleDateFilterChange}
            style={{ width: 150, marginLeft: 10 }}
          >
            <Option value="today">Today</Option>
            <Option value="yesterday">Yesterday</Option>
            <Option value="this_week">This Week</Option>
            <Option value="this_month">This Month</Option>
            <Option value="all_time">All Time</Option>
            <Option value="custom">Custom</Option>
          </Select>
          {dateFilterType === 'custom' && (
            <RangePicker
              value={dateRange}
              onChange={handleCustomDateRangeChange}
              style={{ marginLeft: 10 }}
            />
          )}
        </Flex>
        <AntTable
          dataSource={filteredPayments}
          columns={columns}
          rowKey="id"
          pagination={{ pageSize: 10 }}
          scroll={{ x: 'max-content' }}
          style={{ marginTop: 20 }}
        />
        <Modal
          title={`Confirm Tranche Received for Payment ID ${selectedPayment ? selectedPayment.id : ''}`}
          visible={showTrancheReceivedPopup}
          onOk={() => handleTrancheReceivedConfirm(true)}
          onCancel={() => handleTrancheReceivedConfirm(false)}
        >
          <p>Are you sure you want to confirm the tranche received for this payment?</p>
        </Modal>
      </Box>
    </Base>
  );
};

export default Stc;

