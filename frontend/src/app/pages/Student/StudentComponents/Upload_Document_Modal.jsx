import React, { useState } from 'react';
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  Button,
  useDisclosure,
  FormControl,
  FormLabel,
  Input,
} from '@chakra-ui/react';

const Upload_Document_Modal = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [file, setFile] = useState(null);

  const handleFileChange = (event) => {
    setFile(event.target.files[0]);
  };

  const handleUpload = () => {
    // Handle the file upload logic here
    console.log('Uploading file:', file);
    // Reset the file input and close the modal after upload
    setFile(null);
    onClose();
  };

  return (
    <>
      <Button onClick={onOpen}>Upload Document</Button>

      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Upload Document</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <FormControl>
              <FormLabel>Document</FormLabel>
              <Input type="file" onChange={handleFileChange} />
            </FormControl>
          </ModalBody>

          <ModalFooter>
            <Button colorScheme="blue" mr={3} onClick={handleUpload}>
              Upload
            </Button>
            <Button variant="ghost" onClick={onClose}>Cancel</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};

export default Upload_Document_Modal;
