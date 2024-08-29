import React, { useState, useEffect } from 'react';
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  Button,
  FormControl,
  FormLabel,
  Input,
  useToast,
  VStack,
  Select
} from "@chakra-ui/react";

import { editRenewalStudentApi, fetchRecordDetails } from '../../../api/RenewalStudentsApi/RenewalStudentsApi';

const Edit_Scheme_Renewal_Modal = ({ isOpen, onClose, id }) => {
  const toast = useToast();
  const [formData, setFormData] = useState({
    previousYearApplicationId: '',
    numberOfBeneficiaryInFamily: '',
    howManyBoysChild: '',
    isYourParentAlphabhudarak: '',
    isRegisteredLabour: '',
    admittedUnderEws: ''
  });

  // Fetch scheme details when modal opens or id changes
  useEffect(() => {
    if (isOpen && id) {
      const fetchData = async () => {
        try {
          const response = await fetchRecordDetails(id);
          if (response.success) {
            setFormData(response.data);
          } else {
            toast({
              title: "Error",
              description: response.message || "Failed to fetch scheme details.",
              status: "error",
              duration: 5000,
              isClosable: true,
            });
          }
        } catch (error) {
          console.error("Error fetching scheme details:", error);
          toast({
            title: "Error",
            description: "An error occurred while fetching scheme details.",
            status: "error",
            duration: 5000,
            isClosable: true,
          });
        }
      };
      fetchData();
    }
  }, [isOpen, id, toast]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const payload = {
        id,
        ...formData
      };
      const response = await editRenewalStudentApi(payload);
      if (response.success) {
        toast({
          title: "Scheme details updated.",
          description: response.message || "The scheme details have been successfully updated.",
          status: "success",
          duration: 5000,
          isClosable: true,
        });
        onClose(); // Close the modal after successful submission
      } else {
        toast({
          title: "Error",
          description: response.message || "Unable to update scheme details.",
          status: "error",
          duration: 5000,
          isClosable: true,
        });
      }
    } catch (error) {
      toast({
        title: "Error",
        description: "An error occurred while updating scheme details.",
        status: "error",
        duration: 5000,
        isClosable: true,
      });
      console.error("Error updating scheme details:", error);
    }
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} size="xl">
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Edit Scheme Details</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <VStack spacing={4}>
            <FormControl>
              <FormLabel>Previous Year Application ID</FormLabel>
              <Input name="previousYearApplicationId" value={formData.previousYearApplicationId} onChange={handleChange} />
            </FormControl>

            <FormControl>
              <FormLabel>Number of Beneficiary in Family</FormLabel>
              <Input name="numberOfBeneficiaryInFamily" value={formData.numberOfBeneficiaryInFamily} onChange={handleChange} />
            </FormControl>

            <FormControl>
              <FormLabel>How Many Boys Child</FormLabel>
              <Input name="howManyBoysChild" value={formData.howManyBoysChild} onChange={handleChange} />
            </FormControl>

            <FormControl>
              <FormLabel>Is Your Parent Alphabhudarak</FormLabel>
                <Select name="isYourParentAlphabhudarak" value={formData.isYourParentAlphabhudarak} onChange={handleChange}>
                  <option value="">Select</option>
                  <option value="Yes">Yes</option>
                  <option value="No">No</option>
               </Select>
            </FormControl>

            <FormControl>
              <FormLabel>Is Registered Labour</FormLabel>
                <Select name="isRegisteredLabour" value={formData.isRegisteredLabour} onChange={handleChange}>
                  <option value="">Select</option>
                  <option value="Yes">Yes</option>
                  <option value="No">No</option>
                </Select>
            </FormControl>

            <FormControl>
              <FormLabel>Admitted Under EWS</FormLabel>
                <Select name="admittedUnderEws" value={formData.admittedUnderEws} onChange={handleChange}>
                  <option value="">Select</option>
                  <option value="Yes">Yes</option>
                  <option value="No">No</option>
                </Select>
            </FormControl>

          </VStack>
        </ModalBody>
        <ModalFooter>
          <Button colorScheme="blue" mr={3} onClick={handleSubmit}>
            Save
          </Button>
          <Button variant="ghost" onClick={onClose}>Cancel</Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default Edit_Scheme_Renewal_Modal;
