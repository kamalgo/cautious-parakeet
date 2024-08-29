import React, { useState } from "react";

import {
  AlertDialog,
  AlertDialogBody,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogContent,
  AlertDialogOverlay,
  Box,
  Button,
  Text,
  useDisclosure,
  Input,
  VStack,
  FormControl,
  FormLabel,
} from "@chakra-ui/react";
import { MdModeEdit } from "react-icons/md";
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
} from "@chakra-ui/react";

function AddStreamsModal() {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [streamsData, setStreamsData] = useState({});

  const handleSubmit = (event) => {
    event.preventDefault();
    console.log("Workinggg");
  };

  const handleChange = (param) => (event) => {
    setStreamsData({ ...streamsData, [param]: event.target.value });
  };

  return (
    <>
      <Button onClick={onOpen} variant={"ghost"}>
        <Box marginRight={3} color="gray.500">
          {" "}
          <MdModeEdit size={"15"} />
        </Box>
        <Text fontSize="xs" color="gray.500">
          {" "}
          Add Streams
        </Text>
      </Button>

      <Modal blockScrollOnMount={false} isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <form onSubmit={handleSubmit}>
            <ModalHeader>Add Streams</ModalHeader>
            <ModalCloseButton />
            <ModalBody>
              <Box maxW="md" mx="auto" mt="8">
                <VStack spacing="4">
                  <FormControl id="institute_choice_code">
                    <FormLabel>Select Qualification</FormLabel>
                    <Input
                      type="text"
                      placeholder="Enter your Institute Choice Code"
                      // value={collageData.institute_choice_code}
                      onChange={handleChange("institute_choice_code")}
                      required
                    />
                  </FormControl>

                  <FormControl id="institute_name">
                    <FormLabel>Multi Select Streams</FormLabel>

                    <Input
                      type="text"
                      placeholder="Enter your Institute Name"
                      // value={collageData.institute_name}
                      onChange={handleChange("institute_name")}
                      required
                    />
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
          {/* <h1>Hellooooo</h1> */}
        </ModalContent>
      </Modal>
    </>
  );
}

export default AddStreamsModal;
