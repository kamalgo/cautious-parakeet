import React, { useEffect, useState } from "react";
import {
  Box,
  Button,
  FormControl,
  FormLabel,
  Select,
  Text,
  VStack,
} from "@chakra-ui/react";
import { useDisclosure } from "@chakra-ui/react";

import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
} from "@chakra-ui/react";

import { useToast } from "@chakra-ui/react";
import { MdModeEdit } from "react-icons/md";
import { getAllCollegesApi } from "../../../api/College";
import {
  getQualificationLevelDropdownApi,
  getStreamLevelDropdownApi,
  updateStreamApi,
} from "../../../api/StreamApi/StreamApi";

function ConformEditStream({ stream, getAllQualificationInfoFunction }) {
  const toast = useToast();

  const [streamData, setStreamData] = useState({});
  const [college, setCollegeList] = useState([]);
  const [qualificationLevelDropdown, setQualificationLevelDropdown] = useState(
    []
  );
  const [getStreamLevelDropdown, setStreamLevelDropdown] = useState([]);

  const { isOpen, onOpen, onClose } = useDisclosure();

  const handleSubmit = (event) => {
    event.preventDefault();
    // console.log("stream>>>>", streamData);

    // Do something with the form data, such as submit it to a backend server
    const data = {
      college_id: streamData.college_id,
      qualification_name: streamData.qualification_name,
      stream_name: streamData.stream_name,
    };
    console.log("stream>>>>", data);

    updateStreamApi(data)
      .then((res) => {
        if (res.success) {
          onClose();
          getAllQualificationInfoFunction();
          toast({
            title: "Stream Updated.",
            description: res.message,
            status: "success",
            duration: 9000,
            isClosable: true,
            position: "top-right",
          });
        } else {
          onClose();
          toast({
            title: "Operation failed!",
            description: res.message,
            status: "error",
            duration: 9000,
            isClosable: true,
            position: "top-right",
          });
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

  const getQualificationLevelDropdownFunction = () => {
    getQualificationLevelDropdownApi()
      .then((res) => {
        setQualificationLevelDropdown(res.data);
      })
      .catch((error) => {
        console.error(error);
      });
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

  const handleChange = (param) => (event) => {
    setStreamData({ ...streamData, [param]: event.target.value });
  };

  useEffect(() => {
    setStreamData(stream);
    getQualificationLevelDropdownFunction();
    getStreamLevelDropdownFunction();
  }, [stream]);

  return (
    <>
      <Button onClick={onOpen} variant={"ghost"}>
        {/* <FaUserEdit color="grey" /> */}
        <Box marginRight={3} color="gray.500">
          {" "}
          <MdModeEdit size={"15"} />
        </Box>
        <Text fontSize="xs"> Edit</Text>
      </Button>

      <Modal blockScrollOnMount={false} isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <form onSubmit={handleSubmit}>
            <ModalHeader>Update Collage</ModalHeader>
            <ModalCloseButton />
            <ModalBody>
              <Box maxW="md" mx="auto" mt="8">
                <VStack spacing="4">
                  {/* <FormControl id="institute_choice_code">
                    <FormLabel>Institute Choice Code</FormLabel>
                    <Input
                      type="text"
                      placeholder="Enter your Institute Choice Code"
                      value={collageData.institute_choice_code}
                      onChange={handleChange("institute_choice_code")}
                      required
                    />
                  </FormControl> */}

                  {/* <FormControl id="institute_name">
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
                  </FormControl> */}

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
                </VStack>
              </Box>
            </ModalBody>
            <ModalFooter>
              <Button
                color="text.light"
                type="submit"
                bg="primary.main"
                variant={"outline"}
              >
                Submit
              </Button>
              <Button
                mx={2}
                type="button"
                onClick={onClose}
                variant={"outline"}
              >
                Cancel
              </Button>
            </ModalFooter>
          </form>
        </ModalContent>
      </Modal>
    </>
  );
}

export default ConformEditStream;
