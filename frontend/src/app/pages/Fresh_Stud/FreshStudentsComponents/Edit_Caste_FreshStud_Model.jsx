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
  Select
} from '@chakra-ui/react';
import { editRenewalStudentApi } from '../../../api/RenewalStudentsApi/RenewalStudentsApi';

//updateMahadbtFreshProfile this is the backend route to update the field
import { fetchRecordDetails, editFreshStudentApi } from '../../../api/FreshStudApi/FreshStudApi';

const Edit_Caste_FreshStud_Model = ({ isOpen, onClose, id }) => {
  
  const toast = useToast(); // Initialize toast
  const [formData, setFormData] = useState({
    casteCategory: '',
    subCaste: '',
    doYouHaveCasteCertificate: '',
    casteCertificateNumber: '',
    casteIssuedDistrict: '',
    casteApplicantName: '',
    casteIssAuthority: '',
    casteDoc: '',
    casteIssuedDate: ''
  });

  // Fetch student data when modal opens or id changes
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
              description: response.message || "Failed to fetch student data.",
              status: "error",
              duration: 5000,
              isClosable: true,
              position: "top-right",
            });
          }
        } catch (error) {
          console.error("Error fetching student data:", error);
          toast({
            title: "Error",
            description: "An error occurred while fetching student data.",
            status: "error",
            duration: 5000,
            isClosable: true,
            position: "top-right",
          });
        }
      };
      fetchData();
    }
  }, [isOpen, id, toast]);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({ 
      ...formData,
      [name]: type === 'checkbox' ? checked : value,
    });
  };

  const handleSave = async () => {
    try {
      const response = await editFreshStudentApi(formData);
      if (response.success) {
        toast({
          title: "Success",
          description: response.message || "Personal information updated successfully!",
          status: "success",
          duration: 5000,
          isClosable: true,
          position: "top-right",
        });
        onClose(); // Close the modal on successful update
      } else {
        toast({
          title: "Error",
          description: response.message || "An error occurred while updating personal information.",
          status: "error",
          duration: 5000,
          isClosable: true,
          position: "top-right",
        });
      }
    } catch (error) {
      console.error("Error updating personal information:", error);
      toast({
        title: "Error",
        description: "An error occurred while updating personal information.",
        status: "error",
        duration: 5000,
        isClosable: true,
        position: "top-right",
      });
    }
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} size="xl">
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Edit Caste Dertails</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
        <FormControl id="casteCategory" mb={4}>
                <FormLabel>Caste Category</FormLabel>
                <Select 
                    name="casteCategory" 
                    value={formData.casteCategory} 
                    onChange={handleChange}
                    placeholder="Select Caste Category"
                >
                <option value="(OBC) Other Backward Class">(OBC) Other Backward Class</option>
                <option value="(SBC) Special Backward Class">(SBC) Special Backward Class</option>
                <option value="(SC) Scheduled Caste">(SC) Scheduled Caste</option>
                <option value="(ST) Scheduled Tribes">(ST) Scheduled Tribes</option>
                <option value="(VJNT) Vimukta Jat Nomadic Tribes">(VJNT) Vimukta Jat Nomadic Tribes</option>
                <option value="General">General</option>
                <option value="SEBC">SEBC</option>
                </Select>
        </FormControl>

          <FormControl id="email" mb={4}>
            <FormLabel>Email</FormLabel>
            <Input name="email" type="email" value={formData.email} onChange={handleChange} />
          </FormControl>

          <FormControl id="whatsappNumber" mb={4}>
            <FormLabel>Mobile Number (Student WhatsApp Number)</FormLabel>
            <Input name="whatsappNumber" type="tel" value={formData.whatsappNumber} onChange={handleChange} />
          </FormControl>

          <FormControl id="refCode" mb={4}>
            <FormLabel>College Reference Id</FormLabel>
            <Input name="refCode" type="tel" value={formData.refCode} onChange={handleChange} />
          </FormControl>

          <FormControl id="alternateMobileNumber" mb={4}>
            <FormLabel>Alternate Mobile Number</FormLabel>
            <Input name="alternateMobileNumber" type="tel" value={formData.alternateMobileNumber} onChange={handleChange} />
          </FormControl>

          <FormControl id="mahabdtUsername" mb={4}>
            <FormLabel>MahaDBT Username</FormLabel>
            <Input name="mahabdtUsername" type="tel" value={formData.mahabdtUsername} onChange={handleChange} />
          </FormControl>

          <FormControl id="mahabdtPassword" mb={4}>
            <FormLabel>MahaDBT Password</FormLabel>
            <Input name="mahabdtPassword" type="tel" value={formData.mahabdtPassword} onChange={handleChange} />
          </FormControl>

        </ModalBody>
        <ModalFooter>
          <Button colorScheme="blue" mr={3} onClick={onClose}>
            Close
          </Button>
          <Button variant="ghost" onClick={handleSave}>Submit</Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default Edit_Caste_FreshStud_Model;
