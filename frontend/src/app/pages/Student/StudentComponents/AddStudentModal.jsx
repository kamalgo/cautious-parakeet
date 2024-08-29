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
  FormControl,
  FormLabel,
  Input,
} from '@chakra-ui/react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { addStudent } from '../../../api/Student/StudentApis';

const AddStudentModal = ({ isOpen, onOpen, onClose }) => {
  const [formData, setFormData] = useState({
    id: '',
    candidate_name: '',
    coursename: '',
    current_year: '',
    incomeIssuedDate: '',
    bankaccName: '',
    bankIfsc: '',
    isFatherAlive: '',
    fatherName: '',
    fatherOccupation: '',
    isMotherSalaried: '',
    guardianName: '',
    guardianRelationType: '',
    admissionType: '',
    cetPercentAge: '',
    class10PassingYear: '',
    class10Result: '',
    class10Attempts: '',
    class12AdmissionYear: '',
    email: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleDateChange = (date) => {
    setFormData({
      ...formData,
      incomeIssuedDate: date,
    });
  };

  const handleSubmit = () => {
    console.log('Form Data:', formData);
    addStudent(formData)
      .then((response) => {
        console.log('API response:', response.data);
        onClose();
      })
      .catch((error) => {
        console.error('Error submitting form:', error);
      });
  };

  const pageSize = 7; // Number of fields to display per page
  const totalPages = Math.ceil(Object.keys(formData).length / pageSize);
  const [currentPage, setCurrentPage] = useState(1);

  // Calculate start and end index for the fields to display
  const startIndex = (currentPage - 1) * pageSize;
  const endIndex = Math.min(startIndex + pageSize, Object.keys(formData).length);
  const slicedFormData = Object.entries(formData).slice(startIndex, endIndex);

  const handleNext = () => {
    setCurrentPage((prevPage) => prevPage + 1);
  };

  const handlePrev = () => {
    setCurrentPage((prevPage) => prevPage - 1);
  };

  return (
    <>
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Add a new student</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            {slicedFormData.map(([fieldName, fieldValue]) => (
              <FormControl key={fieldName} id={fieldName} mb={4}>
                <FormLabel>{fieldName}</FormLabel>
                {fieldName === 'incomeIssuedDate' ? (
                  <DatePicker
                    selected={fieldValue}
                    onChange={handleDateChange}
                    dateFormat="yyyy-MM-dd"
                    customInput={<Input />}
                  />
                ) : (
                  <Input
                    name={fieldName}
                    value={fieldValue}
                    onChange={handleChange}
                  />
                )}
              </FormControl>
            ))}
          </ModalBody>

          <ModalFooter>
            {currentPage > 1 && (
              <Button colorScheme="blue" mr={3} onClick={handlePrev}>
                Previous
              </Button>
            )}
            {currentPage < totalPages && (
              <Button colorScheme="blue" mr={3} onClick={handleNext}>
                Next
              </Button>
            )}
            {currentPage === totalPages && (
              <Button colorScheme="blue" mr={3} onClick={handleSubmit}>
                Submit
              </Button>
            )}
            <Button variant="ghost" onClick={onClose}>Cancel</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};

export default AddStudentModal;
