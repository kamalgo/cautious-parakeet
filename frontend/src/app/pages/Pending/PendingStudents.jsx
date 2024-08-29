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
} from "@chakra-ui/react";
import { Table as AntTable } from "antd";
import {
  executeScholarShipApplicationApi,
  getEmailsofpendingstudentsApi,
  getPendingStudentsViewApi,
  getStudentsViewApi,
  sendEmailToStudentMicrositeApi,
  studentprofileviewApi,
} from "../../api/Student/StudentApis";
import { NavLink } from "react-router-dom/cjs/react-router-dom.min";
import { ChevronRightIcon } from "@chakra-ui/icons";
import { useToast } from "@chakra-ui/react";
import { HiCheckCircle } from "react-icons/hi";
import { BsThreeDotsVertical } from "react-icons/bs";
// import StudentDetailsModel from "./StudentComponents/StudentDetailsModel";

function PendingStudents() {
  const [getStudent, setStudent] = useState([]);
  // const [getPendingStudentEmail, setPendingStudentEmail] = useState([]);
  const toast = useToast();

  const onChange = (pagination, filters, sorter, extra) => {};

  const getAllStudents = () => {
    getPendingStudentsViewApi()
      .then((res) => {
        console.log("res", res);
        setStudent(res.data);
      })
      .catch((err) => {
        console.log("err", err);
      });
  };

  const executeScholarShipApplication = () => {
    console.log("executeScholarShipApplication");
    executeScholarShipApplicationApi()
      .then((res) => {
        console.log("res", res);

        toast({
          title: "Scholarship Application Submitted Successfully!.",
          // description: res.message,
          status: "success",
          duration: 9000,
          isClosable: true,
          position: "top-right",
        });
      })
      .catch((err) => {
        console.log("err", err);
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
    console.log("sendEmailToStudentMicrosite", data);
    sendEmailToStudentMicrositeApi(data)
      .then((res) => {
        // console.log("res", res);
        toast({
          title: "Email sent successfully!.",
          // description: res.message,
          status: "success",
          duration: 9000,
          isClosable: true,
          position: "top-right",
        });
      })
      .catch((err) => {
        console.log("err", err);
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
    // console.log("triggerFormForMicroSite");
    getEmailsofpendingstudentsApi()
      .then((res) => {
        console.log("res", res);
        const Emails = res?.data?.map((item) => item.email);
        console.log("Emails", Emails);
        const data = {
          to: Emails,
          subject: "Fill The forstu Form",
          message: "This is the microsite link - http://52.66.147.244/",
        };
        sendEmailToStudentMicrosite(data);
      })
      .catch((err) => {
        console.log("err", err);
      });
  };

  // const testMe = () => {
  //   console.log("testMe clicked");

  //   let data = {
  //     name: "test",
  //   };
  //   studentprofileviewApi(data)
  //     .then((res) => {
  //       console.log("res", res);
  //     })
  //     .catch((err) => {
  //       console.log("err", err);
  //     });
  // };

  const columns = [
    {
      title: "ID",
      dataIndex: "id",
      filterSearch: true,
      //   onFilter: (value, record) => record.id.toString().indexOf(value) === 0,
      //   sorter: (a, b) => a.id - b.id,
      sortDirections: ["descend"],
    },
    {
      title: "Name",
      dataIndex: "candidate_name",
      filterSearch: true,
      // filters: userNameFilterList,

      //   onFilter: (value, record) =>
      //     record.institute_choice_code.indexOf(value) === 0,
      //   sorter: (a, b) => {
      //     // Compare names as strings for alphabetical order
      //     return a.name.localeCompare(b.name);
      //   },
      sortDirections: ["ascend", "descend"],
    },

    {
      title: "Course Name",
      dataIndex: "coursename",
      filterSearch: true,
      // filters: userRoleFilterList,

      //   onFilter: (value, record) => record.institute_name.indexOf(value) === 0,
      //   sorter: (a, b) => {
      //     // Compare usernames as strings for alphabetical order
      //     return a.institute_name.localeCompare(b.role);
      //   },
      sortDirections: ["ascend", "descend"],
    },

    {
      title: "Course Current Year",
      dataIndex: "current_year",
      filterSearch: true,
      // filters: userRoleFilterList,

      //   onFilter: (value, record) => record.institute_state.indexOf(value) === 0,
      //   sorter: (a, b) => {
      //     // Compare usernames as strings for alphabetical order
      //     return a.institute_state.localeCompare(b.role);
      //   },
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
              Pending Student List
            </Heading>
            <Breadcrumb
              spacing="8px"
              separator={<ChevronRightIcon color="gray.500" />}
              fontSize={15}
            >
              <BreadcrumbItem>
                <BreadcrumbLink>
                  <NavLink to="/dashboard/admin">Dashboard</NavLink>
                </BreadcrumbLink>
              </BreadcrumbItem>

              <BreadcrumbItem>
                <NavLink to="/dashboard/admin/student">Student</NavLink>
              </BreadcrumbItem>

              <BreadcrumbItem isCurrentPage>
                <BreadcrumbLink>List</BreadcrumbLink>
              </BreadcrumbItem>
            </Breadcrumb>
          </Box>
          <Spacer />
        </Flex>
        <Box display={"flex"} justifyContent={"space-between"}>
          {/* <h1>Send</h1> */}
          <Button
            variant={"solid"}
            bg="primary.main"
            color={"text.light"}
            py={4}
            onClick={triggerFormForMicroSite}
          >
            Trigger Form
          </Button>

          {/* <Button
            variant={"solid"}
            bg="red.500"
            color={"text.light"}
            py={4}
            onClick={executeScholarShipApplication}
          >
            Submit Scholarship Application
          </Button> */}
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

export default PendingStudents;
