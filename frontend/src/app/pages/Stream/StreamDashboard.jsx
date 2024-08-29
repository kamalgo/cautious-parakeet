import React, { useEffect, useState } from "react";
import { Table as AntTable } from "antd";

import {
  Box,
  Button,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
  Spacer,
  Text,
  useDisclosure,
} from "@chakra-ui/react";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  Heading,
  Flex,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
} from "@chakra-ui/react";

import Base from "../../components/Base";

import { HiCheckCircle } from "react-icons/hi";
import {
  ChevronDownIcon,
  ChevronRightIcon,
  DownloadIcon,
} from "@chakra-ui/icons";
import { NavLink } from "react-router-dom/cjs/react-router-dom";
import { IoMdAdd } from "react-icons/io";
import { BsThreeDotsVertical } from "react-icons/bs";
import { isAuthenticated } from "../../helpers/AuthHelpers";

import AddStreamForm from "./StreamComponents/AddStreamForm";
import { getAllQualificationInfoApi } from "../../api/StreamApi/StreamApi";
import ConformEditStream from "./StreamComponents/ConformEditStream";
import ConformDeleteStream from "./StreamComponents/ConformDeleteStream";

function StreamDashboard() {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [streams, setStreamList] = useState([]);
  const currentUser = isAuthenticated().user.username;

  const columns = [
    {
      title: "College ID",
      dataIndex: "college_id",
      filterSearch: true,
      onFilter: (value, record) => record.id.toString().indexOf(value) === 0,
      sorter: (a, b) => a.id - b.id,
      sortDirections: ["descend"],
    },
    {
      title: "Qualification Name",
      dataIndex: "qualification_name",
      filterSearch: true,

      onFilter: (value, record) =>
        record.qualification_name.indexOf(value) === 0,
      sorter: (a, b) => {
        // Compare names as strings for alphabetical order
        return a.name.localeCompare(b.name);
      },
      sortDirections: ["ascend", "descend"],
    },

    {
      title: "Stream Name",
      dataIndex: "stream_name",
      filterSearch: true,

      onFilter: (value, record) => record.stream_name.indexOf(value) === 0,
      sorter: (a, b) => {
        // Compare usernames as strings for alphabetical order
        return a.stream_name.localeCompare(b.role);
      },
      sortDirections: ["ascend", "descend"],
    },

    {
      title: "Action",
      // key: 'action',
      render: (_, record) => {
        return (
          <>
            {currentUser == record.name ? (
              <div
                style={{
                  color: "green",
                  alignSelf: "center",
                  display: "flex",
                  marginLeft: 15,
                }}
              >
                <HiCheckCircle size={"20"} />
              </div>
            ) : (
              <Menu>
                <MenuButton
                  as={Button}
                  variant={"ghost"}
                  // rightIcon={<ChevronDownIcon />}
                >
                  <BsThreeDotsVertical />
                </MenuButton>
                <MenuList minWidth="50px">
                  <>
                    <MenuItem py={"-0.3"}>
                      <ConformEditStream
                        stream={record}
                        getAllQualificationInfoFunction={
                          getAllQualificationInfoFunction
                        }
                      />
                    </MenuItem>
                    <MenuItem py={"-0.3"}>
                      <ConformDeleteStream
                        id={record.id}
                        getAllQualificationInfoFunction={
                          getAllQualificationInfoFunction
                        }
                      />
                    </MenuItem>
                    <MenuItem py={"-0.3"}>
                      {/* <AddStreamsModal id={record.id} /> */}
                    </MenuItem>
                  </>
                </MenuList>
              </Menu>
            )}
          </>
        );
      },
    },
  ];

  const onChange = (pagination, filters, sorter, extra) => {};

  const getAllQualificationInfoFunction = async () => {
    const res = await getAllQualificationInfoApi();
    if (res.success) {
      // console.log("dddvvviii", res.data);
      setStreamList(res.data);
    } else {
      setStreamList([]);
    }
  };

  useEffect(() => {
    getAllQualificationInfoFunction();
  }, []);

  return (
    <>
      <Base>
        <Box
          py={5}
          px={5}
          bg={"text.light"}
          borderWidth="1px"
          borderRadius="lg"
        >
          <Flex>
            <Box>
              <Heading as="h4" size={"md"} my={2}>
                Streams List
              </Heading>

              {/* <Button
                onClick={() => {
                  downloadCSVFileOfCollegeListFunctionFunction();
                }}
              >
                <DownloadIcon />
              </Button> */}

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
                  <NavLink to="/dashboard/admin/streams">Streams</NavLink>
                </BreadcrumbItem>

                <BreadcrumbItem isCurrentPage>
                  <BreadcrumbLink>List</BreadcrumbLink>
                </BreadcrumbItem>
              </Breadcrumb>
            </Box>
            <Spacer />
            <Box p="4">
              <Button
                variant={"solid"}
                bg="primary.main"
                color={"text.light"}
                px={4}
                onClick={onOpen}
              >
                <IoMdAdd
                  style={{
                    marginRight: "5px",
                  }}
                />
                New Stream
              </Button>

              <Modal
                blockScrollOnMount={false}
                isOpen={isOpen}
                onClose={onClose}
              >
                <ModalOverlay />
                <ModalContent>
                  <ModalHeader>Add Stream</ModalHeader>
                  <ModalCloseButton />
                  <ModalBody>
                    <AddStreamForm
                      onClose={onClose}
                      getAllQualificationInfoFunction={
                        getAllQualificationInfoFunction
                      }
                    />
                  </ModalBody>
                  <ModalFooter></ModalFooter>
                </ModalContent>
              </Modal>
            </Box>
          </Flex>
        </Box>
        {/* <TriStatss userList={userList} statsData={statsData} /> */}
        <Box bg="white" my={3}>
          <AntTable
            rowKey={"id"}
            columns={columns}
            dataSource={streams}
            onChange={onChange}
            bordered={true}
            loading={false}
          />
        </Box>
      </Base>
    </>
  );
}

export default StreamDashboard;
