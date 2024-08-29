import React, { useEffect, useState } from "react";
import Base from "../../components/Base";
import {
  Box,
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  Button,
  Flex,
  Heading,
  Spacer,
  useToast,
} from "@chakra-ui/react";
import { Table as AntTable } from "antd";
import {
  executeScholarShipApplicationApi,
  getEmailsofpendingstudentsApi,
  getSubmittedStudentsViewApi,
  sendEmailToStudentMicrositeApi,
} from "../../api/Student/StudentApis";
import { NavLink } from "react-router-dom";
import { ChevronRightIcon } from "@chakra-ui/icons";

function SubmitedStudents() {
  const [getStudent, setStudent] = useState([]);
  const toast = useToast();

  const onChange = (pagination, filters, sorter, extra) => {
    // Handle table change events (pagination, filtering, sorting) here
  };

  const getAllStudents = () => {
    getSubmittedStudentsViewApi()
      .then((res) => {
        setStudent(res.data);
      })
      .catch((err) => {
        console.error("Error fetching students:", err);
      });
  };

  const executeScholarShipApplication = () => {
    executeScholarShipApplicationApi()
      .then((res) => {
        toast({
          title: "Scholarship Application Submitted Successfully!",
          status: "success",
          duration: 9000,
          isClosable: true,
          position: "top-right",
        });
      })
      .catch((err) => {
        console.error("Error executing scholarship application:", err);
        toast({
          title: "Error",
          description: "Operation Failed!",
          status: "error",
          duration: 9000,
          isClosable: true,
          position: "top-right",
        });
      });
  };

  const sendEmailToStudentMicrosite = (data) => {
    sendEmailToStudentMicrositeApi(data)
      .then((res) => {
        toast({
          title: "Email sent successfully!",
          status: "success",
          duration: 9000,
          isClosable: true,
          position: "top-right",
        });
      })
      .catch((err) => {
        console.error("Error sending email:", err);
        toast({
          title: "Error",
          description: "Operation Failed!",
          status: "error",
          duration: 9000,
          isClosable: true,
          position: "top-right",
        });
      });
  };

  const triggerFormForMicroSite = () => {
    getEmailsofpendingstudentsApi()
      .then((res) => {
        const Emails = res?.data?.map((item) => item.email);
        const data = {
          to: Emails,
          subject: "Fill The Form",
          message: "This is the microsite link - http://localhost:3000",
        };
        sendEmailToStudentMicrosite(data);
      })
      .catch((err) => {
        console.error("Error fetching emails:", err);
      });
  };

  const columns = [
    {
      title: "ID",
      dataIndex: "id",
      sorter: (a, b) => a.id - b.id,
      sortDirections: ["descend"],
    },
    {
      title: "Name",
      dataIndex: "candidate_name",
      sorter: (a, b) => a.candidate_name.localeCompare(b.candidate_name),
      sortDirections: ["ascend", "descend"],
    },
    {
      title: "Course Name",
      dataIndex: "coursename",
      sorter: (a, b) => a.coursename.localeCompare(b.coursename),
      sortDirections: ["ascend", "descend"],
    },
    {
      title: "Course Current Year",
      dataIndex: "current_year",
      sorter: (a, b) => a.current_year - b.current_year,
      sortDirections: ["ascend", "descend"],
    },
  ];

  useEffect(() => {
    getAllStudents();
  }, []);

  return (
    <Base>
      <Box py={5} px={5} bg={"text.light"} borderWidth="1px" borderRadius="lg">
        <Flex>
          <Box pb={2}>
            <Heading as="h4" size={"md"} my={2}>
              Submitted Student List
            </Heading>
            <Breadcrumb
              spacing="8px"
              separator={<ChevronRightIcon color="gray.500" />}
              fontSize={15}
            >
              <BreadcrumbItem>
                <BreadcrumbLink as={NavLink} to="/dashboard/admin">
                  Dashboard
                </BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbItem>
                <BreadcrumbLink as={NavLink} to="/dashboard/admin/student">
                  Student
                </BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbItem isCurrentPage>
                <BreadcrumbLink>List</BreadcrumbLink>
              </BreadcrumbItem>
            </Breadcrumb>
          </Box>
          <Spacer />
        </Flex>
        <Box display={"flex"}>
          <Button
            variant={"solid"}
            bg="red.500"
            color={"text.light"}
            py={4}
            onClick={executeScholarShipApplication}
          >
            Submit Scholarship Application
          </Button>
        </Box>
      </Box>
      <Box bg="white" my={3}>
        <AntTable
          rowKey={"id"}
          columns={columns}
          dataSource={getStudent}
          onChange={onChange}
          bordered={true}
          loading={false}
        />
      </Box>
    </Base>
  );
}

export default SubmitedStudents;
