// import React, { useState } from 'react';
// import {
//   Modal,
//   ModalOverlay,
//   ModalContent,
//   ModalHeader,
//   ModalFooter,
//   ModalBody,
//   ModalCloseButton,
//   Button,
//   FormControl,
//   FormLabel,
//   Input,
//   useToast,
//   VStack
// } from "@chakra-ui/react";

// import { editRenewalStudentApi } from '../../../api/RenewalStudentsApi/RenewalStudentsApi';

// const Edit_Hostel_Renewal_Modal = ({ isOpen, onClose, id }) => {
//   const toast = useToast();
//   const [formData, setFormData] = useState({
//     areYouHostellerDayScholar: '',
//     hostelType: '',
//     hostelPgName: '',
//     hostelPgAddress: '',
//     hostelPgPincode: '',
//     hostelAdmissionDate: '',
//     isMessAvailable: '',
//     rentPerMonth: ''
//   });

//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setFormData((prevData) => ({
//       ...prevData,
//       [name]: value,
//     }));
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     try {
//       const payload = {
//         id,
//         ...formData
//       };
//       await editRenewalStudentApi(payload);
//       toast({
//         title: "Hostel details updated.",
//         description: "The hostel details have been successfully updated.",
//         status: "success",
//         duration: 5000,
//         isClosable: true,
//       });
//       onClose(); // Close the modal after successful submission
//     } catch (error) {
//       toast({
//         title: "An error occurred.",
//         description: "Unable to update hostel details.",
//         status: "error",
//         duration: 5000,
//         isClosable: true,
//       });
//       console.error("Error updating hostel details:", error);
//     }
//   };

//   return (
//     <Modal isOpen={isOpen} onClose={onClose} size="xl">
//       <ModalOverlay />
//       <ModalContent>
//         <ModalHeader>Edit Hostel Details</ModalHeader>
//         <ModalCloseButton />
//         <ModalBody>
//           <VStack spacing={4}>
//             <FormControl>
//               <FormLabel>Hosteller or Day Scholar</FormLabel>
//               <Input name="areYouHostellerDayScholar" value={formData.areYouHostellerDayScholar} onChange={handleChange} />
//             </FormControl>
//             <FormControl>
//               <FormLabel>Hostel Type</FormLabel>
//               <Input name="hostelType" value={formData.hostelType} onChange={handleChange} />
//             </FormControl>
//             <FormControl>
//               <FormLabel>Hostel/PG Name</FormLabel>
//               <Input name="hostelPgName" value={formData.hostelPgName} onChange={handleChange} />
//             </FormControl>
//             <FormControl>
//               <FormLabel>Hostel/PG Address</FormLabel>
//               <Input name="hostelPgAddress" value={formData.hostelPgAddress} onChange={handleChange} />
//             </FormControl>
//             <FormControl>
//               <FormLabel>Hostel/PG Pincode</FormLabel>
//               <Input name="hostelPgPincode" value={formData.hostelPgPincode} onChange={handleChange} />
//             </FormControl>
//             <FormControl>
//               <FormLabel>Hostel Admission Date</FormLabel>
//               <Input type="date" name="hostelAdmissionDate" value={formData.hostelAdmissionDate} onChange={handleChange} />
//             </FormControl>
//             <FormControl>
//               <FormLabel>Is Mess Available</FormLabel>
//               <Input name="isMessAvailable" value={formData.isMessAvailable} onChange={handleChange} />
//             </FormControl>
//             <FormControl>
//               <FormLabel>Rent Per Month</FormLabel>
//               <Input name="rentPerMonth" value={formData.rentPerMonth} onChange={handleChange} />
//             </FormControl>
//           </VStack>
//         </ModalBody>
//         <ModalFooter>
//           <Button colorScheme="blue" mr={3} onClick={handleSubmit}>
//             Save
//           </Button>
//           <Button variant="ghost" onClick={onClose}>Cancel</Button>
//         </ModalFooter>
//       </ModalContent>
//     </Modal>
//   );
// };

// export default Edit_Hostel_Renewal_Modal;


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

const Edit_Hostel_Renewal_Modal = ({ isOpen, onClose, id }) => {
  const toast = useToast();
  const [formData, setFormData] = useState({
    areYouHostellerDayScholar: '',
    hostelType: '',
    hostelPgName: '',
    hostelPgAddress: '',
    hostelPgPincode: '',
    hostelAdmissionDate: '',
    isMessAvailable: '',
    rentPerMonth: ''
  });

  // Fetch hostel details when modal opens or id changes
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
              description: response.message || "Failed to fetch hostel details.",
              status: "error",
              duration: 5000,
              isClosable: true,
            });
          }
        } catch (error) {
          console.error("Error fetching hostel details:", error);
          toast({
            title: "Error",
            description: "An error occurred while fetching hostel details.",
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
          title: "Hostel details updated.",
          description: response.message || "The hostel details have been successfully updated.",
          status: "success",
          duration: 5000,
          isClosable: true,
        });
        onClose(); // Close the modal after successful submission
      } else {
        toast({
          title: "Error",
          description: response.message || "Unable to update hostel details.",
          status: "error",
          duration: 5000,
          isClosable: true,
        });
      }
    } catch (error) {
      toast({
        title: "Error",
        description: "An error occurred while updating hostel details.",
        status: "error",
        duration: 5000,
        isClosable: true,
      });
      console.error("Error updating hostel details:", error);
    }
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} size="xl">
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Edit Hostel Details</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <VStack spacing={4}>

            <FormControl>
              <FormLabel>Hosteller or Day Scholar</FormLabel>
              <Select name="areYouHostellerDayScholar" value={formData.areYouHostellerDayScholar} onChange={handleChange}>
              <option value="">Select</option>
              <option value="Hosteller">Hosteller</option>
              <option value="Day Scholar">Day Scholar</option>
              </Select>
            </FormControl>

            <FormControl>
              <FormLabel>Hostel Type</FormLabel>
              <Select name="hostelType" value={formData.hostelType} onChange={handleChange}>
              <option value="">Select</option>
              <option value="Non Govt. Hostel">Non Govt. Hostel</option>
              <option value="Paying Guest">Paying Guest</option>
              <option value="Rented House">Rented House</option>
              </Select>
            </FormControl>

            <FormControl>
              <FormLabel>Hostel/PG Name</FormLabel>
              <Input name="hostelPgName" value={formData.hostelPgName} onChange={handleChange} />
            </FormControl>
            <FormControl>
              <FormLabel>Hostel/PG Address</FormLabel>
              <Input name="hostelPgAddress" value={formData.hostelPgAddress} onChange={handleChange} />
            </FormControl>
            <FormControl>
              <FormLabel>Hostel/PG Pincode</FormLabel>
              <Input name="hostelPgPincode" value={formData.hostelPgPincode} onChange={handleChange} />
            </FormControl>
            <FormControl>
              <FormLabel>Hostel Admission Date</FormLabel>
              <Input type="date" name="hostelAdmissionDate" value={formData.hostelAdmissionDate} onChange={handleChange} />
            </FormControl>

            <FormControl>
              <FormLabel>Is Mess Available</FormLabel>
              <Select name="isMessAvailable" value={formData.isMessAvailable} onChange={handleChange}>
                <option value="">Select</option>
                <option value="Yes">Yes</option>
                <option value="No">No</option>
              </Select>
            </FormControl>

            <FormControl>
              <FormLabel>Rent Per Month</FormLabel>
              <Input name="rentPerMonth" value={formData.rentPerMonth} onChange={handleChange} />
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

export default Edit_Hostel_Renewal_Modal;
