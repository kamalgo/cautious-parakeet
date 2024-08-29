import React, { useEffect, useState } from "react";
import Base from "../../components/Base";
import { Table as AntTable } from "antd";

import {
  Box,
  Button,
  FormControl,
  FormLabel,
  Grid,
  GridItem,
  Heading,
  Select,
  Text,
  useToast,
} from "@chakra-ui/react";

import YearAndCourseStatus from "./YearAndCoursesComponents/YearAndCourseStatus";
import YearAndCourseApplicationFailedStatus from "./YearAndCoursesComponents/YearAndCourseApplicationFailedStatus";
import {
  courseAndYearWiseApplicationStatus,
  courseAndYearWiseDataSent,
  getCourseListOptionApi,
  // getMeCoursesYears,
  getYears,
} from "../../api/YearAndCourseApi/YearAndCourse";

function YearAndCoursesDashboard() {
  const toast = useToast();
  const [yearCourseDataSent, setYearCourseDataSent] = useState({});
  const [yearAndCourseData, setYearAndCourseData] = useState([]);
  const [courseList, setCourseList] = useState([]);
  const [yearList, setYearList] = useState([]);
  const [ApplicationStatus, setApplicationStatus] = useState({});

  const getCourseListOptions = () => {
    getCourseListOptionApi()
      .then((res) => {
        if (res.success) {
          // console.log("setCourseList", res.data);
          setCourseList(res.data);
        } else {
          setCourseList([]);
        }
      })
      .catch((error) => {
        console.error(error);
      });
  };

  const getYearsListOptions = (data) => {
    getYears({ courseName: data })
      .then((res) => {
        setYearList(res.data);
      })
      .catch((error) => {
        console.log("error", error);
        setYearList([]);
      });
  };

  const columns = [
    {
      title: "ID",
      dataIndex: "id",
      filterSearch: true,
      // filters: userIdFilterList,
      // onFilter: (value, record) => record.id.toString().indexOf(value) === 0,
      sorter: (a, b) => a.id - b.id,
      sortDirections: ["descend"],
    },
    {
      title: "Candidate Name",
      dataIndex: "candidate_name",
      filterSearch: true,
      // filters: userNameFilterList,

      // onFilter: (value, record) => record.username.indexOf(value) === 0,
      sorter: (a, b) => {
        // Compare usernames as strings for alphabetical order
        return a.username.localeCompare(b.username);
      },
      sortDirections: ["ascend", "descend"],
    },

    {
      title: "Whatsapp Number",
      dataIndex: "whatsapp_number",
      filterSearch: true,
      // filters: userRoleFilterList,

      // onFilter: (value, record) => record.role.indexOf(value) === 0,
      sorter: (a, b) => {
        // Compare usernames as strings for alphabetical order
        return a.role.localeCompare(b.role);
      },
      sortDirections: ["ascend", "descend"],
    },

    {
      title: "Email",
      dataIndex: "email",
      filterSearch: true,
      // filters: userRoleFilterList,

      // onFilter: (value, record) => record.role.indexOf(value) === 0,
      sorter: (a, b) => {
        // Compare usernames as strings for alphabetical order
        return a.role.localeCompare(b.role);
      },
      sortDirections: ["ascend", "descend"],
    },
  ];

  const onChange = (pagination, filters, sorter, extra) => {};

  const handleChangeForCourseName = (param) => (event) => {
    setYearCourseDataSent({
      ...yearCourseDataSent,
      [param]: event.target.value,
    });
    getYearsListOptions(event.target.value);
  };

  const handleChangeForCourseYear = (param) => (event) => {
    setYearCourseDataSent({
      ...yearCourseDataSent,
      [param]: event.target.value,
    });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    // console.log("submit", yearCourseDataSent);

    courseAndYearWiseDataSent(yearCourseDataSent)
      .then((res) => {
        if (res.success) {
          // console.log("res", res.data);
          setYearAndCourseData(res.data);
          toast({
            title: "Operation successful!",
            description: res.message,
            status: "success",
            duration: 9000,
            isClosable: true,
            position: "top-right",
          });
        } else {
          toast({
            title: "Operation failed!",
            description: res.message,
            status: "error",
            duration: 9000,
            isClosable: true,
            position: "top-right",
          });
          onClose();
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

    courseAndYearWiseApplicationStatus(yearCourseDataSent)
      .then((res) => {
        // console.log("res--viviviviviVIVIVIVIVIV", res);
        setApplicationStatus(res.data);
      })
      .catch((error) => {
        console.log("error", error);
      });
  };

  useEffect(() => {
    getCourseListOptions();
  }, []);

  return (
    <Base>
      <Box bg={"text.light"} borderWidth="1px" borderRadius="lg">
        <Box p={5}>
          {/* <Heading as="h4" size={"md"} my={2}>
            Select Year and Course
          </Heading> */}

          <form onSubmit={handleSubmit}>
            <Box
              display={"flex"}
              // justifyContent={"center"}
              // alignItems={"center"}
            >
              <Box
                maxW="md"
                mt="8"
                display={"flex"}
                // justifyContent={"center"}
                // alignItems={"center"}
              >
                <FormControl id="course">
                  {/* <FormLabel>Course</FormLabel> */}
                  <Select
                    // multiple={2}

                    placeholder="Select Course"
                    value={yearCourseDataSent.courseName}
                    onChange={handleChangeForCourseName("courseName")}
                  >
                    {courseList.map((course, index) => {
                      // console.log("course", course.coursename);
                      return (
                        <option key={index} value={course.coursename}>
                          {course.coursename}
                        </option>
                      );
                    })}

                    {/* <option key={index} value={course}>
                        {course}
                      </option> */}
                  </Select>
                </FormControl>
                <FormControl id="year">
                  {/* <FormLabel>Year</FormLabel> */}
                  <Select
                    ml={2}
                    placeholder="Select Year"
                    value={yearCourseDataSent.courseYear}
                    onChange={handleChangeForCourseYear("courseYear")}
                  >
                    {yearList.map((year, index) => (
                      <option key={index} value={year.current_year}>
                        {year.current_year}
                      </option>
                    ))}
                  </Select>
                </FormControl>
              </Box>
              <Button
                mt={7}
                ml={7}
                color="text.light"
                type="submit"
                bg="primary.main"
                variant={"outline"}
              >
                Submit
              </Button>
            </Box>
          </form>
        </Box>
        {/* <Spacer /> */}
        {/* </Flex> */}
      </Box>
      <Box py={5} px={5} bg={"text.light"} borderWidth="1px" borderRadius="lg">
        <Grid templateColumns="repeat(2, 1fr)" gap={6}>
          <GridItem w="100%" bg={"#fff"} borderRadius={"10px"}>
            <YearAndCourseStatus ApplicationStatus={ApplicationStatus} />
          </GridItem>
          <GridItem w="100%" bg={"#FFFBF5"} borderRadius={"10px"}>
            <YearAndCourseApplicationFailedStatus />
          </GridItem>
        </Grid>
      </Box>
      <Box bg="white" my={3}>
        <AntTable
          rowKey={"id"}
          columns={columns}
          dataSource={yearAndCourseData}
          onChange={onChange}
          bordered={true}
          loading={false}
        />
      </Box>
    </Base>
  );
}

export default YearAndCoursesDashboard;
