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

// const Edit_Current_Course_Renewal_Modal = ({ isOpen, onClose, id }) => {
//   const toast = useToast();
//   const [formData, setFormData] = useState({
//     admissionYear: '',
//     instituteState: '',
//     instituteDistrict: '',
//     instituteTaluka: '',
//     qualificationLevel: '',
//     courseStream: '',
//     instituteName: '',
//     courseName: '',
//     admissionType: '',
//     cetPercent: '',
//     admissionApplicationId: '',
//     pastYearOfStudy: '',
//     pastYearCompletedPursuing: '',
//     presentYearOfStudy: '',
//     presentYearCompletedPursuing: '',
//     admissionYearOfThatCourse: '',
//     previousYearPercentage: '',
//     resultPassedAtkt: '',
//     admissionCasteCateogary: '',
//     admissionDateCurrentCourse: '',
//     feesPaidCurrentCourse: '',
//     isThereAnyGap: '',
//     gapReason: ''
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
//         title: "Current course details updated.",
//         description: "The current course details have been successfully updated.",
//         status: "success",
//         duration: 5000,
//         isClosable: true,
//       });
//       onClose(); // Close the modal after successful submission
//     } catch (error) {
//       toast({
//         title: "An error occurred.",
//         description: "Unable to update current course details.",
//         status: "error",
//         duration: 5000,
//         isClosable: true,
//       });
//       console.error("Error updating current course details:", error);
//     }
//   };

//   return (
//     <Modal isOpen={isOpen} onClose={onClose} size="xl">
//       <ModalOverlay />
//       <ModalContent>
//         <ModalHeader>Edit Current Course Details</ModalHeader>
//         <ModalCloseButton />
//         <ModalBody>
//           <VStack spacing={4}>
//             <FormControl>
//               <FormLabel>Admission Year</FormLabel>
//               <Input name="admissionYear" value={formData.admissionYear} onChange={handleChange} />
//             </FormControl>
//             <FormControl>
//               <FormLabel>Institute State</FormLabel>
//               <Input name="instituteState" value={formData.instituteState} onChange={handleChange} />
//             </FormControl>
//             <FormControl>
//               <FormLabel>Institute District</FormLabel>
//               <Input name="instituteDistrict" value={formData.instituteDistrict} onChange={handleChange} />
//             </FormControl>
//             <FormControl>
//               <FormLabel>Institute Taluka</FormLabel>
//               <Input name="instituteTaluka" value={formData.instituteTaluka} onChange={handleChange} />
//             </FormControl>
//             <FormControl>
//               <FormLabel>Qualification Level</FormLabel>
//               <Input name="qualificationLevel" value={formData.qualificationLevel} onChange={handleChange} />
//             </FormControl>
//             <FormControl>
//               <FormLabel>Course Stream</FormLabel>
//               <Input name="courseStream" value={formData.courseStream} onChange={handleChange} />
//             </FormControl>
//             <FormControl>
//               <FormLabel>Institute Name</FormLabel>
//               <Input name="instituteName" value={formData.instituteName} onChange={handleChange} />
//             </FormControl>
//             <FormControl>
//               <FormLabel>Course Name</FormLabel>
//               <Input name="courseName" value={formData.courseName} onChange={handleChange} />
//             </FormControl>
//             <FormControl>
//               <FormLabel>Admission Type</FormLabel>
//               <Input name="admissionType" value={formData.admissionType} onChange={handleChange} />
//             </FormControl>
//             <FormControl>
//               <FormLabel>CET Percentage</FormLabel>
//               <Input name="cetPercent" value={formData.cetPercent} onChange={handleChange} />
//             </FormControl>
//             <FormControl>
//               <FormLabel>Admission Application ID</FormLabel>
//               <Input name="admissionApplicationId" value={formData.admissionApplicationId} onChange={handleChange} />
//             </FormControl>
//             <FormControl>
//               <FormLabel>Past Year Of Study</FormLabel>
//               <Input name="pastYearOfStudy" value={formData.pastYearOfStudy} onChange={handleChange} />
//             </FormControl>
//             <FormControl>
//               <FormLabel>Past Year Completed Pursuing</FormLabel>
//               <Input name="pastYearCompletedPursuing" value={formData.pastYearCompletedPursuing} onChange={handleChange} />
//             </FormControl>
//             <FormControl>
//               <FormLabel>Present Year Of Study</FormLabel>
//               <Input name="presentYearOfStudy" value={formData.presentYearOfStudy} onChange={handleChange} />
//             </FormControl>
//             <FormControl>
//               <FormLabel>Present Year Completed Pursuing</FormLabel>
//               <Input name="presentYearCompletedPursuing" value={formData.presentYearCompletedPursuing} onChange={handleChange} />
//             </FormControl>
//             <FormControl>
//               <FormLabel>Admission Year Of That Course</FormLabel>
//               <Input name="admissionYearOfThatCourse" value={formData.admissionYearOfThatCourse} onChange={handleChange} />
//             </FormControl>
//             <FormControl>
//               <FormLabel>Previous Year Percentage</FormLabel>
//               <Input name="previousYearPercentage" value={formData.previousYearPercentage} onChange={handleChange} />
//             </FormControl>
//             <FormControl>
//               <FormLabel>Result Passed/ATKT</FormLabel>
//               <Input name="resultPassedAtkt" value={formData.resultPassedAtkt} onChange={handleChange} />
//             </FormControl>
//             <FormControl>
//               <FormLabel>Admission Caste Category</FormLabel>
//               <Input name="admissionCasteCateogary" value={formData.admissionCasteCateogary} onChange={handleChange} />
//             </FormControl>
//             <FormControl>
//               <FormLabel>Admission Date Current Course</FormLabel>
//               <Input type="date" name="admissionDateCurrentCourse" value={formData.admissionDateCurrentCourse} onChange={handleChange} />
//             </FormControl>
//             <FormControl>
//               <FormLabel>Fees Paid Current Course</FormLabel>
//               <Input name="feesPaidCurrentCourse" value={formData.feesPaidCurrentCourse} onChange={handleChange} />
//             </FormControl>
//             <FormControl>
//               <FormLabel>Is There Any Gap</FormLabel>
//               <Input name="isThereAnyGap" value={formData.isThereAnyGap} onChange={handleChange} />
//             </FormControl>
//             <FormControl>
//               <FormLabel>Gap Reason</FormLabel>
//               <Input name="gapReason" value={formData.gapReason} onChange={handleChange} />
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

// export default Edit_Current_Course_Renewal_Modal;


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

const Edit_Current_Course_Renewal_Modal = ({ isOpen, onClose, id }) => {
  const toast = useToast();
  const [formData, setFormData] = useState({
    admissionYear: '',
    instituteState: '',
    instituteDistrict: '',
    instituteTaluka: '',
    qualificationLevel: '',
    courseStream: '',
    instituteName: '',
    courseName: '',
    admissionType: '',
    cetPercent: '',
    admissionApplicationId: '',
    pastYearOfStudy: '',
    pastYearCompletedPursuing: '',
    presentYearOfStudy: '',
    presentYearCompletedPursuing: '',
    admissionYearOfThatCourse: '',
    previousYearPercentage: '',
    resultPassedAtkt: '',
    admissionCasteCateogary: '',
    admissionDateCurrentCourse: '',
    feesPaidCurrentCourse: '',
    isThereAnyGap: '',
    gapReason: ''
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
              description: response.message || "Failed to fetch current course details.",
              status: "error",
              duration: 5000,
              isClosable: true,
            });
          }
        } catch (error) {
          console.error("Error fetching current course details:", error);
          toast({
            title: "Error",
            description: "An error occurred while fetching current course details.",
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
    const { name, value, type } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: type === 'checkbox' ? e.target.checked : value,
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
          title: "Success",
          description: response.message || "Current course details updated successfully!",
          status: "success",
          duration: 5000,
          isClosable: true,
        });
        onClose(); // Close the modal on successful update
      } else {
        toast({
          title: "Error",
          description: response.message || "An error occurred while updating current course details.",
          status: "error",
          duration: 5000,
          isClosable: true,
        });
      }
    } catch (error) {
      console.error("Error updating current course details:", error);
      toast({
        title: "Error",
        description: "An error occurred while updating current course details.",
        status: "error",
        duration: 5000,
        isClosable: true,
      });
    }
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} size="xl">
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Edit Current Course Details</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <VStack spacing={4}>
            <FormControl>
              <FormLabel>Admission Year</FormLabel>
              <Select name="admissionYear" value={formData.admissionYear} onChange={handleChange} >
              <option value="">Select</option>
              <option value="2023">2023</option>
              <option value="2022">2022</option>
              <option value="2021">2021</option>
              <option value="2020">2020</option>
              <option value="2019">2019</option>
              <option value="2018">2018</option>
              <option value="2017">2017</option>
              <option value="2016">2016</option>
              <option value="2015">2015</option>
              <option value="2014">2014</option>
              <option value="2013">2013</option>
              <option value="2012">2012</option>
              <option value="2011">2011</option>
              <option value="2010">2010</option>
              <option value="2009">2009</option>
              <option value="2008">2008</option>
              <option value="2007">2007</option>
              <option value="2006">2006</option>
              <option value="2005">2005</option>
              <option value="2004">2004</option>
            </Select>
            </FormControl>
            
            <FormControl>
              <FormLabel>Institute State</FormLabel>
              <Select name="instituteState" value={formData.instituteState} onChange={handleChange}>
              <option value="">Select</option>
              <option value="Maharashtra">Maharashtra</option>
            </Select>  
            </FormControl>
            
            <FormControl>
              <FormLabel>Institute District</FormLabel>
              <Select name="instituteDistrict" value={formData.instituteDistrict} onChange={handleChange}>
              <option value="">Select</option>
                <option value="Ahmednagar">Ahmednagar</option>
                <option value="Akola">Akola</option>
                <option value="Amravati">Amravati</option>
                <option value="Chhatrapati Sambhaji Nagar">Chhatrapati Sambhaji Nagar</option>
                <option value="Beed">Beed</option>
                <option value="Bhandara">Bhandara</option>
                <option value="Buldhana">Buldhana</option>
                <option value="Chandrapur">Chandrapur</option>
                <option value="Dhule">Dhule</option>
                <option value="Gadchiroli">Gadchiroli</option>
                <option value="Gondiya">Gondiya</option>
                <option value="Hingoli">Hingoli</option>
                <option value="Jalgaon">Jalgaon</option>
                <option value="Jalna">Jalna</option>
                <option value="Kolhapur">Kolhapur</option>
                <option value="Latur">Latur</option>
                <option value="Mumbai City">Mumbai City</option>
                <option value="Mumbai Subarban">Mumbai Subarban</option>
                <option value="Nagpur">Nagpur</option>
                <option value="Nanded">Nanded</option>
                <option value="Nandurbar">Nandurbar</option>
                <option value="Nashik">Nashik</option>
                <option value="Osmanabad">Osmanabad</option>
                <option value="Palghar">Palghar</option>
                <option value="Parbhani">Parbhani</option>
                <option value="Pune">Pune</option>
                <option value="Raigarh">Raigarh</option>
                <option value="Ratnagiri">Ratnagiri</option>
                <option value="Sangli">Sangli</option>
                <option value="Satara">Satara</option>
                <option value="Sindhudurg">Sindhudurg</option>
                <option value="Solapur">Solapur</option>
                <option value="Thane">Thane</option>
                <option value="Wardha">Wardha</option>
                <option value="Washim">Washim</option>
                <option value="Yavatmal">Yavatmal</option>
            </Select>  
            </FormControl>

            <FormControl>
              <FormLabel>Institute Taluka</FormLabel>
              <Select name="instituteTaluka" value={formData.instituteTaluka} onChange={handleChange}>
              <option value="">Select</option>
              <option value="Aheri">Aheri</option>
              <option value="Armori">Armori</option>
              <option value="Bhamragad">Bhamragad</option>
              <option value="Chamorshi">Chamorshi</option>
              <option value="Desaiganj (Vadasa)">Desaiganj (Vadasa)</option>
              <option value="Dhanora">Dhanora</option>
              <option value="Etapalli">Etapalli</option>
              <option value="Gadchiroli">Gadchiroli</option>
              <option value="Korchi">Korchi</option>
              <option value="Kurkheda">Kurkheda</option>
              <option value="Mulchera">Mulchera</option>
              <option value="Sironcha">Sironcha</option>
              <option value="Alibag">Alibag</option>
              <option value="Karjat">Karjat</option>
              <option value="Khalapur">Khalapur</option>
              <option value="Mahad">Mahad</option>
              <option value="Mangaon">Mangaon</option>
              <option value="Mhasla">Mhasla</option>
              <option value="Murud">Murud</option>
              <option value="Panvel">Panvel</option>
              <option value="Pen">Pen</option>
              <option value="Poladpur">Poladpur</option>
              <option value="Roha">Roha</option>
              <option value="Shrivardhan">Shrivardhan</option>
              <option value="Sudhagad">Sudhagad</option>
              <option value="Tala">Tala</option>
              <option value="Uran">Uran</option>
              <option value="Akkalkot">Akkalkot</option>
              <option value="Barshi">Barshi</option>
              <option value="Karmala">Karmala</option>
              <option value="Madha">Madha</option>
              <option value="Malshiras">Malshiras</option>
              <option value="Mangalvedhe">Mangalvedhe</option>
              <option value="Mohol">Mohol</option>
              <option value="Pandharpur">Pandharpur</option>
              <option value="Sangole">Sangole</option>
              <option value="Solapur North">Solapur North</option>
              <option value="Solapur South">Solapur South</option>
              <option value="Dhule">Dhule</option>
              <option value="Sakri">Sakri</option>
              <option value="Shirpur">Shirpur</option>
              <option value="Sindkhede">Sindkhede</option>
              <option value="Achalpur">Achalpur</option>
              <option value="Amravati">Amravati</option>
              <option value="Anjangaon Surji">Anjangaon Surji</option>
              <option value="Bhatkuli">Bhatkuli</option>
              <option value="Chandur Railway">Chandur Railway</option>
              <option value="Chandurbazar">Chandurbazar</option>
              <option value="Chikhaldara">Chikhaldara</option>
              <option value="Daryapur">Daryapur</option>
              <option value="Dhamangaon Railway">Dhamangaon Railway</option>
              <option value="Dharni">Dharni</option>
              <option value="Morshi">Morshi</option>
              <option value="Nandgaon-Khandeshwar">Nandgaon-Khandeshwar</option>
              <option value="Teosa">Teosa</option>
              <option value="Warud">Warud</option>
              <option value="Akola">Akola</option>
              <option value="Akot">Akot</option>
              <option value="Balapur">Balapur</option>
              <option value="Barshitakli">Barshitakli</option>
              <option value="Murtijapur">Murtijapur</option>
              <option value="Patur">Patur</option>
              <option value="Telhara">Telhara</option>
              <option value="Aurangabad">Aurangabad</option>
              <option value="Gangapur">Gangapur</option>
              <option value="Kannad">Kannad</option>
              <option value="Khultabad">Khultabad</option>
              <option value="Paithan">Paithan</option>
              <option value="Phulambri">Phulambri</option>
              <option value="Sillod">Sillod</option>
              <option value="Soygaon">Soygaon</option>
              <option value="Vaijapur">Vaijapur</option>
              <option value="Ambejogai">Ambejogai</option>
              <option value="Ashti">Ashti</option>
              <option value="Beed">Beed</option>
              <option value="Dharur">Dharur</option>
              <option value="Georai">Georai</option>
              <option value="Kaij">Kaij</option>
              <option value="Manjlegaon">Manjlegaon</option>
              <option value="Parli">Parli</option>
              <option value="Patoda">Patoda</option>
              <option value="Shirur (Kasar)">Shirur (Kasar)</option>
              <option value="Wadwani">Wadwani</option>
              <option value="Chiplun">Chiplun</option>
              <option value="Dapoli">Dapoli</option>
              <option value="Guhagar">Guhagar</option>
              <option value="Khed">Khed</option>
              <option value="Lanja">Lanja</option>
              <option value="Mandangad">Mandangad</option>
              <option value="Rajapur">Rajapur</option>
              <option value="Ratnagiri">Ratnagiri</option>
              <option value="Sangameshwar">Sangameshwar</option>
              <option value="Ardhapur">Ardhapur</option>
              <option value="Bhokar">Bhokar</option>
              <option value="Biloli">Biloli</option>
              <option value="Deglur">Deglur</option>
              <option value="Dharmabad">Dharmabad</option>
              <option value="Hadgaon">Hadgaon</option>
              <option value="Himayatnagar">Himayatnagar</option>
              <option value="Kandhar">Kandhar</option>
              <option value="Kinwat">Kinwat</option>
              <option value="Loha">Loha</option>
              <option value="Mahoor">Mahoor</option>
              <option value="Mudkhed">Mudkhed</option>
              <option value="Mukhed">Mukhed</option>
              <option value="Naigaon (Khairgaon)">Naigaon (Khairgaon)</option>
              <option value="Nanded">Nanded</option>
              <option value="Umri">Umri</option>
              <option value="Akole">Akole</option>
              <option value="Jamkhed">Jamkhed</option>
              <option value="Karjat">Karjat</option>
              <option value="Kopargaon">Kopargaon</option>
              <option value="Nagar">Nagar</option>
              <option value="Nevasa">Nevasa</option>
              <option value="Parner">Parner</option>
              <option value="Pathardi">Pathardi</option>
              <option value="Rahta">Rahta</option>
              <option value="Rahuri">Rahuri</option>
              <option value="Sangamner">Sangamner</option>
              <option value="Shevgaon">Shevgaon</option>
              <option value="Shrigonda">Shrigonda</option>
              <option value="Shrirampur">Shrirampur</option>
              <option value="Akkalkuwa">Akkalkuwa</option>
              <option value="Akrani">Akrani</option>
              <option value="Nandurbar">Nandurbar</option>
              <option value="Nawapur">Nawapur</option>
              <option value="Shahade">Shahade</option>
              <option value="Talode">Talode</option>
              <option value="Ambarnath">Ambarnath</option>
              <option value="Bhiwandi">Bhiwandi</option>
              <option value="Kalyan">Kalyan</option>
              <option value="Murbad">Murbad</option>
              <option value="Shahapur">Shahapur</option>
              <option value="Thane">Thane</option>
              <option value="Ulhasnagar">Ulhasnagar</option>
              <option value="Arvi">Arvi</option>
              <option value="Ashti">Ashti</option>
              <option value="Deoli">Deoli</option>
              <option value="Hinganghat">Hinganghat</option>
              <option value="Karanja">Karanja</option>
              <option value="Samudrapur">Samudrapur</option>
              <option value="Seloo">Seloo</option>
              <option value="Wardha">Wardha</option>
              <option value="Karanja">Karanja</option>
              <option value="Malegaon">Malegaon</option>
              <option value="Mangrulpir">Mangrulpir</option>
              <option value="Manora">Manora</option>
              <option value="Risod">Risod</option>
              <option value="Washim">Washim</option>
              <option value="Amgaon">Amgaon</option>
              <option value="Arjuni Morgaon">Arjuni Morgaon</option>
              <option value="Deori">Deori</option>
              <option value="Gondiya">Gondiya</option>
              <option value="Goregaon">Goregaon</option>
              <option value="Sadak-Arjuni">Sadak-Arjuni</option>
              <option value="Salekasa">Salekasa</option>
              <option value="Tirora">Tirora</option>
              <option value="Bhoom">Bhoom</option>
              <option value="Kalamb">Kalamb</option>
              <option value="Lohara">Lohara</option>
              <option value="Osmanabad">Osmanabad</option>
              <option value="Paranda">Paranda</option>
              <option value="Tuljapur">Tuljapur</option>
              <option value="Umarga">Umarga</option>
              <option value="Washi">Washi</option>
              <option value="Bhandara">Bhandara</option>
              <option value="Lakhandur">Lakhandur</option>
              <option value="Lakhani">Lakhani</option>
              <option value="Mohadi">Mohadi</option>
              <option value="Pauni">Pauni</option>
              <option value="Sakoli">Sakoli</option>
              <option value="Tumsar">Tumsar</option>
              <option value="Ajra">Ajra</option>
              <option value="Bavda">Bavda</option>
              <option value="Bhudargad">Bhudargad</option>
              <option value="Chandgad">Chandgad</option>
              <option value="Gadhinglaj">Gadhinglaj</option>
              <option value="Hatkanangle">Hatkanangle</option>
              <option value="Kagal">Kagal</option>
              <option value="Karvir">Karvir</option>
              <option value="Panhala">Panhala</option>
              <option value="Radhanagari">Radhanagari</option>
              <option value="Shahuwadi">Shahuwadi</option>
              <option value="Shirol">Shirol</option>
              <option value="Arni">Arni</option>
              <option value="Babulgaon">Babulgaon</option>
              <option value="Darwha">Darwha</option>
              <option value="Digras">Digras</option>
              <option value="Ghatanji">Ghatanji</option>
              <option value="Kalamb">Kalamb</option>
              <option value="Kelapur">Kelapur</option>
              <option value="Mahagaon">Mahagaon</option>
              <option value="Maregaon">Maregaon</option>
              <option value="Ner">Ner</option>
              <option value="Pusad">Pusad</option>
              <option value="Ralegaon">Ralegaon</option>
              <option value="Umarkhed">Umarkhed</option>
              <option value="Wani">Wani</option>
              <option value="Yavatmal">Yavatmal</option>
              <option value="Zari-Jamani">Zari-Jamani</option>
              <option value="Aundha (Nagnath)">Aundha (Nagnath)</option>
              <option value="Basmath">Basmath</option>
              <option value="Hingoli">Hingoli</option>
              <option value="Kalamnuri">Kalamnuri</option>
              <option value="Sengaon">Sengaon</option>
              <option value="Devgad">Devgad</option>
              <option value="Dodamarg">Dodamarg</option>
              <option value="Kankavli">Kankavli</option>
              <option value="Kudal">Kudal</option>
              <option value="Malwan">Malwan</option>
              <option value="Sawantwadi">Sawantwadi</option>
              <option value="Vaibhavvadi">Vaibhavvadi</option>
              <option value="Vengurla">Vengurla</option>
              <option value="Ambegaon">Ambegaon</option>
              <option value="Baramati">Baramati</option>
              <option value="Bhor">Bhor</option>
              <option value="Daund">Daund</option>
              <option value="Haveli">Haveli</option>
              <option value="Indapur">Indapur</option>
              <option value="Junnar">Junnar</option>
              <option value="Khed">Khed</option>
              <option value="Mawal">Mawal</option>
              <option value="Mulshi">Mulshi</option>
              <option value="Pune City">Pune City</option>
              <option value="Purandhar">Purandhar</option>
              <option value="Shirur">Shirur</option>
              <option value="Velhe">Velhe</option>
              <option value="Ward ABCD">Ward ABCD</option>
              <option value="Ward E">Ward E</option>
              <option value="Ward FNorth">Ward FNorth</option>
              <option value="Ward FSouth">Ward FSouth</option>
              <option value="Ward GNorth">Ward GNorth</option>
              <option value="Ward GSouth">Ward GSouth</option>
              <option value="Jaoli">Jaoli</option>
              <option value="Karad">Karad</option>
              <option value="Khandala">Khandala</option>
              <option value="Khatav">Khatav</option>
              <option value="Koregaon">Koregaon</option>
              <option value="Mahabaleshwar">Mahabaleshwar</option>
              <option value="Man">Man</option>
              <option value="Patan">Patan</option>
              <option value="Phaltan">Phaltan</option>
              <option value="Satara">Satara</option>
              <option value="Wai">Wai</option>
              <option value="Andheri">Andheri</option>
              <option value="Borivali">Borivali</option>
              <option value="Kurla">Kurla</option>
              <option value="Mumbai Suburban">Mumbai Suburban</option>
              <option value="Ambad">Ambad</option>
              <option value="Badnapur">Badnapur</option>
              <option value="Bhokardan">Bhokardan</option>
              <option value="Ghansawangi">Ghansawangi</option>
              <option value="Jafferabad">Jafferabad</option>
              <option value="Jalna">Jalna</option>
              <option value="Mantha">Mantha</option>
              <option value="Partur">Partur</option>
              <option value="Baglan">Baglan</option>
              <option value="Chandvad">Chandvad</option>
              <option value="Deola">Deola</option>
              <option value="Dindori">Dindori</option>
              <option value="Igatpuri">Igatpuri</option>
              <option value="Kalwan">Kalwan</option>
              <option value="Malegaon">Malegaon</option>
              <option value="Nandgaon">Nandgaon</option>
              <option value="Nashik">Nashik</option>
              <option value="Niphad">Niphad</option>
              <option value="Peint">Peint</option>
              <option value="Sinnar">Sinnar</option>
              <option value="Surgana">Surgana</option>
              <option value="Trimbakeshwar">Trimbakeshwar</option>
              <option value="Yeola">Yeola</option>
              <option value="Amalner">Amalner</option>
              <option value="Bhadgaon">Bhadgaon</option>
              <option value="Bhusawal">Bhusawal</option>
              <option value="Bodwad">Bodwad</option>
              <option value="Chalisgaon">Chalisgaon</option>
              <option value="Chopda">Chopda</option>
              <option value="Dharangaon">Dharangaon</option>
              <option value="Erandol">Erandol</option>
              <option value="Jalgaon">Jalgaon</option>
              <option value="Jamner">Jamner</option>
              <option value="Muktainagar (Edlabad)">Muktainagar (Edlabad)</option>
              <option value="Pachora">Pachora</option>
              <option value="Parola">Parola</option>
              <option value="Raver">Raver</option>
              <option value="Yawal">Yawal</option>
              <option value="Atpadi">Atpadi</option>
              <option value="Jat">Jat</option>
              <option value="Kadegaon">Kadegaon</option>
              <option value="Kavathemahankal">Kavathemahankal</option>
              <option value="Khanapur">Khanapur</option>
              <option value="Miraj">Miraj</option>
              <option value="Palus">Palus</option>
              <option value="Shirala">Shirala</option>
              <option value="Tasgaon">Tasgaon</option>
              <option value="Walwa">Walwa</option>
              <option value="Ahmadpur">Ahmadpur</option>
              <option value="Ausa">Ausa</option>
              <option value="Chakur">Chakur</option>
              <option value="Deoni">Deoni</option>
              <option value="Jalkot">Jalkot</option>
              <option value="Latur">Latur</option>
              <option value="Nilanga">Nilanga</option>
              <option value="Renapur">Renapur</option>
              <option value="Shirur-Anantpal">Shirur-Anantpal</option>
              <option value="Udgir">Udgir</option>
              <option value="Buldana">Buldana</option>
              <option value="Chikhli">Chikhli</option>
              <option value="Deolgaon Raja">Deolgaon Raja</option>
              <option value="Jalgaon (Jamod)">Jalgaon (Jamod)</option>
              <option value="Khamgaon">Khamgaon</option>
              <option value="Lonar">Lonar</option>
              <option value="Malkapur">Malkapur</option>
              <option value="Mehkar">Mehkar</option>
              <option value="Motala">Motala</option>
              <option value="Nandura">Nandura</option>
              <option value="Sangrampur">Sangrampur</option>
              <option value="Shegaon">Shegaon</option>
              <option value="Sindkhed Raja">Sindkhed Raja</option>
              <option value="Ballarpur">Ballarpur</option>
              <option value="Bhadravati">Bhadravati</option>
              <option value="Brahmapuri">Brahmapuri</option>
              <option value="Chandrapur">Chandrapur</option>
              <option value="Chimur">Chimur</option>
              <option value="Gondpipri">Gondpipri</option>
              <option value="Jiwati">Jiwati</option>
              <option value="Korpana">Korpana</option>
              <option value="Mul">Mul</option>
              <option value="Nagbhir">Nagbhir</option>
              <option value="Pombhurna">Pombhurna</option>
              <option value="Rajura">Rajura</option>
              <option value="Sawali">Sawali</option>
              <option value="Sindewahi">Sindewahi</option>
              <option value="Warora">Warora</option>
              <option value="Bhiwapur">Bhiwapur</option>
              <option value="Hingna">Hingna</option>
              <option value="Kalameshwar">Kalameshwar</option>
              <option value="Kamptee">Kamptee</option>
              <option value="Katol">Katol</option>
              <option value="Kuhi">Kuhi</option>
              <option value="Mauda">Mauda</option>
              <option value="Nagpur (Rural)">Nagpur (Rural)</option>
              <option value="Nagpur (Urban)">Nagpur (Urban)</option>
              <option value="Narkhed">Narkhed</option>
              <option value="Parseoni">Parseoni</option>
              <option value="Ramtek">Ramtek</option>
              <option value="Savner">Savner</option>
              <option value="Umred">Umred</option>
              <option value="Gangakhed">Gangakhed</option>
              <option value="Jintur">Jintur</option>
              <option value="Manwath">Manwath</option>
              <option value="Parbhani">Parbhani</option>
              <option value="Pathri">Pathri</option>
              <option value="Purna">Purna</option>
              <option value="Sailu">Sailu</option>
              <option value="Sonpeth">Sonpeth</option>
              <option value="Dahanu">Dahanu</option>
              <option value="Jawhar">Jawhar</option>
              <option value="Mokhada">Mokhada</option>
              <option value="Palghar">Palghar</option>
              <option value="Talasari">Talasari</option>
              <option value="Vada">Vada</option>
              <option value="Vasai">Vasai</option>
              <option value="Vikramgad">Vikramgad</option>
              </Select>
            </FormControl>

            <FormControl>
              <FormLabel>Qualification Level</FormLabel>
              <Select name="qualificationLevel" value={formData.qualificationLevel} onChange={handleChange}>
                <option value="">Select</option>
                <option value="Certificate Courses">Certificate Courses</option>
                <option value="Diploma Course">Diploma Course</option>
                <option value="Dual Degree">Dual Degree</option>
                <option value="Ph.D">Ph.D</option>
                <option value="Postgraduate Certificate Course">Postgraduate Certificate Course</option>
                <option value="Postgraduate Course">Postgraduate Course</option>
                <option value="Postgraduate Diploma Course">Postgraduate Diploma Course</option>
                <option value="Undergraduate Course">Undergraduate Course</option>
                <option value="Undergraduate Course for Sainiki">Undergraduate Course for Sainiki</option>
                <option value="Vocational Course">Vocational Course</option>
                <option value="F.Y.J.C(11th Std)">F.Y.J.C(11th Std)</option>
                <option value="H.S.C(12th Std)">H.S.C(12th Std)</option>
              </Select>
            </FormControl>

            <FormControl>
              <FormLabel>Course Stream</FormLabel>
              <Select name="courseStream" value={formData.courseStream} onChange={handleChange}>
                <option value="">Select</option>
                <option value="Agriculture">Agriculture</option>
                <option value="ARCHITECTURE AND TOWN PLANNING">ARCHITECTURE AND TOWN PLANNING</option>
                <option value="Arts">Arts</option>
                <option value="Commerce">Commerce</option>
                <option value="Commerce & Management">Commerce & Management</option>
                <option value="Commerce Management">Commerce Management</option>
                <option value="Design">Design</option>
                <option value="Education">Education</option>
                <option value="Engineering">Engineering</option>
                <option value="Engineering Machine Group">Engineering Machine Group</option>
                <option value="Engineering Non Machine Group">Engineering Non Machine Group</option>
                <option value="Eye Care Optometrists">Eye Care Optometrists</option>
                <option value="Fine Art(Visual Art)">Fine Art(Visual Art)</option>
                <option value="Health Science">Health Science</option>
                <option value="Hotel Management and Catering">Hotel Management and Catering</option>
                <option value="Humanities and Social Sciences">Humanities and Social Sciences</option>
                <option value="Interdisciplinary">Interdisciplinary</option>
                <option value="Law">Law</option>
                <option value="Management">Management</option>
                <option value="MCA">MCA</option>
                <option value="Non Engineering Group">Non Engineering Group</option>
                <option value="Non-AICTE">Non-AICTE</option>
                <option value="Nursing">Nursing</option>
                <option value="Other">Other</option>
                <option value="Pharmacy">Pharmacy</option>
                <option value="Physical Education">Physical Education</option>
                <option value="Science">Science</option>
                <option value="Science Technology">Science Technology</option>
                <option value="Social Work">Social Work</option>
                <option value="Veterinary">Veterinary</option>
            </Select>
            </FormControl>


            <FormControl>
              <FormLabel>Institute Name</FormLabel>
              <Input name="instituteName" value={formData.instituteName} onChange={handleChange} />
            </FormControl>

            <FormControl>
              <FormLabel>Course Name</FormLabel>
              <Input name="courseName" value={formData.courseName} onChange={handleChange} />
            </FormControl>

            <FormControl>
              <FormLabel>Admission Type</FormLabel>
              <Select name="admissionType" value={formData.admissionType} onChange={handleChange} >
                <option value="">Select</option>
                <option value="Through CAP/Govt. Quota">Through CAP/Govt. Quota</option>
                <option value="Through TFWS">Through TFWS</option>
                <option value="Through Spot Admission/Institute Level">Through Spot Admission/Institute Level</option>
                <option value="Through Management Quota">Through Management Quota</option>
                <option value="Through CLAT">Through CLAT</option>
               </Select>
            </FormControl>

            <FormControl>
              <FormLabel>CET Percentage</FormLabel>
              <Input name="cetPercent" value={formData.cetPercent} onChange={handleChange} />
            </FormControl>
            <FormControl>
              <FormLabel>Admission Application ID</FormLabel>
              <Input name="admissionApplicationId" value={formData.admissionApplicationId} onChange={handleChange} />
            </FormControl>
            <FormControl>
              <FormLabel>Past Year Of Study</FormLabel>
              <Input name="pastYearOfStudy" value={formData.pastYearOfStudy} onChange={handleChange} />
            </FormControl>
            <FormControl>
              <FormLabel>Past Year Completed Pursuing</FormLabel>
              <Input name="pastYearCompletedPursuing" value={formData.pastYearCompletedPursuing} onChange={handleChange} />
            </FormControl>
            <FormControl>
              <FormLabel>Present Year Of Study</FormLabel>
              <Input name="presentYearOfStudy" value={formData.presentYearOfStudy} onChange={handleChange} />
            </FormControl>
            <FormControl>
              <FormLabel>Present Year Completed Pursuing</FormLabel>
              <Input name="presentYearCompletedPursuing" value={formData.presentYearCompletedPursuing} onChange={handleChange} />
            </FormControl>
            <FormControl>

              <FormLabel>Admission Year Of That Course</FormLabel>
              <Select name="admissionYearOfThatCourse" value={formData.admissionYearOfThatCourse} onChange={handleChange} >
                <option value="">Select</option>
                <option value="2023">2023</option>
                <option value="2022">2022</option>
                <option value="2021">2021</option>
                <option value="2020">2020</option>
                <option value="2019">2019</option>
                <option value="2018">2018</option>
            </Select>
            </FormControl>
            <FormControl>
              <FormLabel>Previous Year Percentage</FormLabel>
              <Input name="previousYearPercentage" value={formData.previousYearPercentage} onChange={handleChange} />
            </FormControl>
            <FormControl>

              <FormLabel>Result Passed/ATKT</FormLabel>
              <Select name="resultPassedAtkt" value={formData.resultPassedAtkt} onChange={handleChange}>
              <option value="">Select</option>
              <option value="Passed">Passed</option>
              <option value="Passed With ATKT">Passed With ATKT</option>
              </Select>
            </FormControl>

            <FormControl>
              <FormLabel>Admission Caste Category</FormLabel>
              <Select name="admissionCasteCateogary" value={formData.admissionCasteCateogary} onChange={handleChange}>
                <option value="">Select</option>
                <option value="OBC">OBC (Other Backward Class)</option>
                <option value="SBC">SBC (Special Backward Class)</option>
                <option value="SC">SC (Scheduled Castes)</option>
                <option value="ST">ST (Scheduled Tribes)</option>
                <option value="VJNT">VJNT (Vikmukta Jat Nomadic Tribes)</option>
                <option value="General">General</option>
                <option value="SEBC">SEBC (Socially and Educationally Backward Class)</option>
              </Select>
            </FormControl>

            <FormControl>
              <FormLabel>Admission Date Current Course</FormLabel>
              <Input type="date" name="admissionDateCurrentCourse" value={formData.admissionDateCurrentCourse} onChange={handleChange} />
            </FormControl>
            <FormControl>
              <FormLabel>Fees Paid Current Course</FormLabel>
              <Input name="feesPaidCurrentCourse" value={formData.feesPaidCurrentCourse} onChange={handleChange} />
            </FormControl>
            <FormControl>
              <FormLabel>Is There Any Gap</FormLabel>
              <Select name="isThereAnyGap" value={formData.isThereAnyGap} onChange={handleChange}>
                <option value="">Select</option>
                <option value="Yes">Yes</option>
                <option value="No">No</option>
              </Select>

            </FormControl>
            <FormControl>
              <FormLabel>Gap Reason</FormLabel>
              <Input name="gapReason" value={formData.gapReason} onChange={handleChange} />
            </FormControl>
          </VStack>
        </ModalBody>
        <ModalFooter>
          <Button colorScheme="blue" mr={3} onClick={handleSubmit}>
            Save
          </Button>
          <Button variant="ghost" onClick={onClose}>
            Cancel
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default Edit_Current_Course_Renewal_Modal;
