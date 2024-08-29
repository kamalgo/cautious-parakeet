import React, { useEffect, useState } from "react";
import { Link, NavLink } from 'react-router-dom';
import { Table as AntTable, Space, DatePicker } from "antd";
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
  useDisclosure, 
} from "@chakra-ui/react";
import Base from "../../components/Base";
import { ChevronRightIcon } from "@chakra-ui/icons";
import { getAllPaymentsApi, addStudentApi, uploadPfmsExcelApi } from "../../api/PaymentsApi/PaymentsApi";
import moment from 'moment';
import * as XLSX from 'xlsx';

const { RangePicker } = DatePicker;

const Payments = () => {
  const [payments, setPayments] = useState([]);
  const [filteredPayments, setFilteredPayments] = useState([]);
  const toast = useToast();

  useEffect(() => {
    console.log("Payments List Updated:", payments);
  }, [payments]);

  const handleDateFilter = (dates, dateStrings) => {
    if (!dates) {
      setFilteredPayments(payments);
      return;
    }

    const [start, end] = dates;
    const filteredData = payments.filter(payment => {
      const paymentDate = moment(payment.Credit_Date);
      return paymentDate.isBetween(start, end, 'days', '[]');
    });

    setFilteredPayments(filteredData);
  };

  const columns = [
    {
      title: "ID",
      dataIndex: "id",
      key: "id",
      sorter: (a, b) => a.id - b.id,
    },
    {
      title: "Beneficiary Name",
      dataIndex: "Beneficiary_Name",
      key: "Beneficiary_Name",
    },
    {
      title: "Amount",
      dataIndex: "Amount",
      key: "Amount",
    },
    {
      title: "Account Number",
      dataIndex: "AccountNumber_AsPerBank",
      key: "AccountNumber_AsPerBank",
    },
    {
      title: "Transaction ID",
      dataIndex: "Credit_Transaction_ID",
      key: "Credit_Transaction_ID",
    },
    {
      title: "Credit Date",
      dataIndex: "Credit_Date",
      key: "Credit_Date",
    },
    {
      title: "Status",
      dataIndex: "Status",
      key: "Status",
      filters: [
        { text: 'On Hold', value: 'On Hold' },
        { text: 'Payment Success', value: 'Payment Success' },
        { text: 'Payment Declined', value: 'Payment Declined' },
      ],
      onFilter: (value, record) => record.Status === value,
    },
    {
      title: "Action",
      key: "action",
      render: (text, record) => (
        <Space size="middle">
          <Link to={`/payment-details/${record.id}`}>
            View
          </Link>
          <a onClick={() => handleDelete(record.id)}>
            Delete
          </a>
        </Space>
      ),
    },
  ];

  const fetchPayments = async () => {
    try {
      const res = await getAllPaymentsApi();
      if (res.success) {
        setPayments(res.data);
        setFilteredPayments(res.data);
      } else {
        setPayments([]);
        setFilteredPayments([]);
        console.error("Failed to fetch payments data:", res.error);
      }
    } catch (error) {
      setPayments([]);
      setFilteredPayments([]);
      console.error("Error fetching payments data:", error);
    }
  };

  const handleDelete = (paymentId) => {
    // Implement your delete functionality here
    console.log("Delete item with Payment ID:", paymentId);
    toast({
      title: "Delete action triggered",
      description: `Delete functionality to be implemented for Payment ID: ${paymentId}`,
      status: "info",
      duration: 5000,
      isClosable: true,
      position: "top-right",
    });
  };

  const handleAddStudent = async (studentData) => {
    try {
      const response = await addStudentApi(studentData);
      if (response.success) {
        fetchPayments(); // Refresh the payments list
        toast({
          title: "Student added",
          description: "Student has been successfully added.",
          status: "success",
          duration: 5000,
          isClosable: true,
          position: "top-right",
        });
      } else {
        console.error("Failed to add student:", response.error);
        toast({
          title: "Error",
          description: "Failed to add student.",
          status: "error",
          duration: 5000,
          isClosable: true,
          position: "top-right",
        });
      }
    } catch (error) {
      console.error("Error adding student:", error);
      toast({
        title: "Error",
        description: "An error occurred while adding the student.",
        status: "error",
        duration: 5000,
        isClosable: true,
        position: "top-right",
      });
    }
  };

  const handleFileUpload = (event) => {
    const file = event.target.files[0];
    console.log("Selected file:", file);

    const reader = new FileReader();
    reader.onload = async (e) => {
      const binaryStr = e.target.result;
      const workbook = XLSX.read(binaryStr, { type: "binary" });
      const sheetName = workbook.SheetNames[0];
      const sheet = workbook.Sheets[sheetName];
      const data = XLSX.utils.sheet_to_json(sheet);
      console.log("File content:", data);

      try {
        const response = await uploadPfmsExcelApi(data);
        if (response.success) {
          fetchPayments(); // Refresh the payments list
          toast({
            title: "File uploaded",
            description: "File data has been successfully uploaded.",
            status: "success",
            duration: 5000,
            isClosable: true,
            position: "top-right",
          });
        } else {
          console.error("Failed to upload file data:", response.error);
          toast({
            title: "Error",
            description: "Failed to upload file data.",
            status: "error",
            duration: 5000,
            isClosable: true,
            position: "top-right",
          });
        }
      } catch (error) {
        console.error("Error uploading file data:", error);
        toast({
          title: "Error",
          description: "An error occurred while uploading the file data.",
          status: "error",
          duration: 5000,
          isClosable: true,
          position: "top-right",
        });
      }
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

  useEffect(() => {
    fetchPayments();
  }, []);

  return (
    <Base>
      <Box p={5}>
        <Breadcrumb spacing="8px" separator={<ChevronRightIcon color="gray.500" />}>
          <BreadcrumbItem>
            <BreadcrumbLink as={NavLink} to="/home">Home</BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbItem isCurrentPage>
            <BreadcrumbLink>Payments</BreadcrumbLink>
          </BreadcrumbItem>
        </Breadcrumb>
        <Flex alignItems="center" mt={4}>
          <Heading size="lg">Payments</Heading>
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
        </Flex>
        <Box mt={4}>
          <RangePicker onChange={handleDateFilter} />
        </Box>
        <Box mt={4}>
          <AntTable columns={columns} dataSource={filteredPayments} rowKey="id" />
        </Box>
      </Box>
    </Base>
  );
};

export default Payments;
