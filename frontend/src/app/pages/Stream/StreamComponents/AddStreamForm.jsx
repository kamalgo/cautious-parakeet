import React, { useEffect, useState } from "react";
import {
  FormControl,
  FormLabel,
  Input,
  Select,
  Button,
  Box,
  VStack,
  InputGroup,
  InputRightElement,
} from "@chakra-ui/react";
import { ViewIcon, ViewOffIcon } from "@chakra-ui/icons";

import { useToast } from "@chakra-ui/react";
import { addCollageApi, getAllCollegesApi } from "../../../api/College";
import {
  addQualificationInfoApi,
  getQualificationLevelDropdownApi,
  getStreamLevelDropdownApi,
} from "../../../api/StreamApi/StreamApi";

const AddStreamForm = ({ getAllQualificationInfoFunction, onClose }) => {
  const toast = useToast();

  const [streamData, setStreamData] = useState({});
  const [qualificationLevelDropdown, setQualificationLevelDropdown] = useState(
    []
  );
  const [getStreamLevelDropdown, setStreamLevelDropdown] = useState([]);
  const [college, setCollegeList] = useState([]);

  const getQualificationLevelDropdownFunction = () => {
    getQualificationLevelDropdownApi()
      .then((res) => {
        // console.log("ress::::vvv", res.data);
        setQualificationLevelDropdown(res.data);
      })
      .catch((error) => {
        console.error(error);
      });
  };

  const getAllColleges = async () => {
    const res = await getAllCollegesApi();
    if (res.success) {
      console.log("MMMM:::", res.data);
      setCollegeList(res.data);
    } else {
      setCollegeList([]);
    }
  };

  const getStreamLevelDropdownFunction = () => {
    getStreamLevelDropdownApi()
      .then((res) => {
        // console.log("getStreamLevelDropdownFunction::::vvv", res.data);
        setStreamLevelDropdown(res.data);
      })
      .catch((error) => {
        console.error(error);
      });
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    const data = {
      college_id: streamData.institute_name,
      qualification_name: streamData.qualification_name,
      stream_name: streamData.stream_name,
    };

    console.log("dataaaa:::", data);
    // Do something with the form data, such as submit it to a backend server

    addQualificationInfoApi({
      data,
    })
      .then((res) => {
        if (res.success) {
          toast({
            title: "New stream created.",
            description: res.message,
            status: "success",
            duration: 9000,
            isClosable: true,
            position: "top-right",
          });
          onClose();
          getAllQualificationInfoFunction();
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
  };

  const handleChange = (param) => (event) => {
    setStreamData({ ...streamData, [param]: event.target.value });
  };

  useEffect(() => {
    getAllColleges();
    getQualificationLevelDropdownFunction();
    getStreamLevelDropdownFunction();
  }, []);

  return (
    <>
      <Box maxW="md" mx="auto" mt="8">
        <form onSubmit={handleSubmit}>
          <VStack spacing="4">
            <FormControl id="institute_name">
              <FormLabel>Institute Name</FormLabel>
              <Select
                placeholder="Select your Institute Name"
                value={streamData.institute_name}
                onChange={handleChange("institute_name")}
              >
                {college?.map((status, index) => (
                  <option key={index} value={status.id}>
                    {status.institute_name}
                  </option>
                ))}
              </Select>
            </FormControl>
            <FormControl id="qualification_name">
              <FormLabel>Qualification Name</FormLabel>
              <Select
                placeholder="Select your qualification name"
                value={streamData.qualification_name}
                onChange={handleChange("qualification_name")}
              >
                {qualificationLevelDropdown?.map((status, index) => (
                  <option key={index} value={status.qualification_name}>
                    {status.qualification_name}
                  </option>
                ))}
              </Select>
            </FormControl>

            <FormControl id="stream_name">
              <FormLabel>Stream Name</FormLabel>
              <Select
                placeholder="Select your Stream name"
                value={streamData.stream_name}
                onChange={handleChange("stream_name")}
              >
                {getStreamLevelDropdown?.map((status, index) => (
                  <option key={index} value={status.stream_name}>
                    {status.stream_name}
                  </option>
                ))}
              </Select>
            </FormControl>

            <Button
              color="text.light"
              type="submit"
              bg="primary.main"
              variant={"outline"}
            >
              Submit
            </Button>
          </VStack>
        </form>
      </Box>
    </>
  );
};

export default AddStreamForm;
