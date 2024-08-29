import React, { useState } from "react";
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
import { addCollageApi } from "../../../api/College";

// const roles = ROLES.DB_ROLE_ENUM;
// const handleShowClick = () => setShowPassword(!showPassword);
const AddCollageForm = ({ getAllColleges, onClose }) => {
  const toast = useToast();

  const [collageData, setCollageData] = useState({});

  const handleSubmit = (event) => {
    event.preventDefault();

    const data = {
      institute_choice_code: collageData.institute_choice_code,
      institute_name: collageData.institute_name,
      institute_state: collageData.institute_state,
      institute_district: collageData.institute_district,
      institute_taluka: collageData.institute_taluka,
    };

    // Do something with the form data, such as submit it to a backend server

    addCollageApi({
      data,
    })
      .then((res) => {
        if (res.success) {
          toast({
            title: "New collage profile created.",
            description: res.message,
            status: "success",
            duration: 9000,
            isClosable: true,
            position: "top-right",
          });
          onClose();
          getAllColleges();
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
    setCollageData({ ...collageData, [param]: event.target.value });
  };

  return (
    <>
      <Box maxW="md" mx="auto" mt="8">
        <form onSubmit={handleSubmit}>
          <VStack spacing="4">
            <FormControl id="institute_choice_code">
              <FormLabel>Institute Choice Code</FormLabel>
              <Input
                type="text"
                placeholder="Enter your Institute Choice Code"
                value={collageData.institute_choice_code}
                onChange={handleChange("institute_choice_code")}
                required
              />
            </FormControl>
            <FormControl id="institute_name">
              <FormLabel>Institute Name</FormLabel>

              <Input
                type="text"
                placeholder="Enter your Institute Name"
                value={collageData.institute_name}
                onChange={handleChange("institute_name")}
                required
              />
            </FormControl>
            <FormControl id="institute_state">
              <FormLabel>Institute State</FormLabel>

              <Input
                type="text"
                placeholder="Enter your Institute State"
                value={collageData.institute_state}
                onChange={handleChange("institute_state")}
                required
              />
            </FormControl>

            <FormControl id="institute_district">
              <FormLabel>Institute District</FormLabel>

              <Input
                type="text"
                placeholder="Enter your Institute District"
                value={collageData.institute_district}
                onChange={handleChange("institute_district")}
                required
              />
            </FormControl>

            <FormControl id="institute_taluka">
              <FormLabel>Institute Taluka</FormLabel>

              <Input
                type="text"
                placeholder="Enter your Institute Taluka"
                value={collageData.institute_taluka}
                onChange={handleChange("institute_taluka")}
                required
              />
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

export default AddCollageForm;
