import React from "react";

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
} from "@chakra-ui/react";

import { useToast } from "@chakra-ui/react";
import { ImBin } from "react-icons/im";
import { deleteCollageApi } from "../../../api/College";

function ConformDeleteCollage({ id, getAllColleges }) {
  const toast = useToast();

  const cancelRef = React.useRef();

  const { isOpen, onOpen, onClose } = useDisclosure();
  const deleteHandler = () => {
    deleteCollageApi({
      id,
    })
      .then((res) => {
        if (res.success) {
          onClose();
          getAllColleges();
          toast({
            title: "Collage Deleted.",
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

  return (
    <>
      <Button onClick={onOpen} variant={"ghost"}>
        <Box marginRight={3} color="red.400">
          {" "}
          <ImBin size={"10"} />
        </Box>
        <Text fontSize="xs" color={"red.400"}>
          {" "}
          Delete
        </Text>
      </Button>

      <AlertDialog
        isOpen={isOpen}
        leastDestructiveRef={cancelRef}
        onClose={onClose}
      >
        <AlertDialogOverlay>
          <AlertDialogContent>
            <AlertDialogHeader fontSize="lg" fontWeight="bold">
              Delete User
            </AlertDialogHeader>

            <AlertDialogBody>
              Are you sure? You can't undo this action afterwards.
            </AlertDialogBody>

            <AlertDialogFooter>
              <Button ref={cancelRef} onClick={onClose}>
                Cancel
              </Button>
              <Button
                bg="primary.main"
                color={"text.light"}
                onClick={deleteHandler}
                ml={3}
              >
                Delete
              </Button>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialogOverlay>
      </AlertDialog>
    </>
  );
}

export default ConformDeleteCollage;
