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
// import { editRenewalStudentApi, fetchRecordDetails } from '../../../api/RenewalStudentsApi/RenewalStudentsApi';
import { fetchRecordDetails, editFreshStudentApi } from '../../../api/FreshStudApi/FreshStudApi';


const Edit_10th_FreshStud_Modal = ({ isOpen, onClose, id }) => {
  const toast = useToast();
  const [formData, setFormData] = useState({
    class10Qualification: '',
    class10Stream: '',
    class10State: '',
    class10District: '',
    class10Taluka: '',
    class10Course: '',
    class10Board: '',
    class10Mode: '',
    class10AdmissionYear: '',
    class10PassingYear: '',
    class10Result: '',
    class10Percentage: '',
    class10Attempt: '',
    class10SeatNumber: '',
    class10MonthOfExam: '',
    class10MarksObtained: '',
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
      const response = await editFreshStudentApi(payload);
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
        <ModalHeader>Edit Class 10th Details</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <VStack spacing={4}>

            <FormControl>
              <FormLabel>Qualification Level  </FormLabel>
              <Input name="class10Qualification" value={formData.class10Qualification} onChange={handleChange} />
            </FormControl>

            <FormControl>
              <FormLabel>Class 10th stream</FormLabel>
              <Input name="class10Stream" value={formData.class10Stream} onChange={handleChange}>
              </Input>
            </FormControl>
            
            <FormControl>
              <FormLabel>Class 10th State</FormLabel>
              <Select name="class10State" value={formData.class10State} onChange={handleChange}>
              <option value="">Select</option>
                <option value="ANDAMAN & NIKOBAR ISLANDS">ANDAMAN & NIKOBAR ISLANDS</option>
                <option value="ANDHRA PRADESH">ANDHRA PRADESH</option>
                <option value="ARUNACHAL PRADESH">ARUNACHAL PRADESH</option>
                <option value="ASSAM">ASSAM</option>
                <option value="BIHAR">BIHAR</option>
                <option value="CHANDIGARH">CHANDIGARH</option>
                <option value="CHHATTISGARH">CHHATTISGARH</option>
                <option value="DADRA & NAGAR HAVELI">DADRA & NAGAR HAVELI</option>
                <option value="DAMAN & DIU">DAMAN & DIU</option>
                <option value="GOA">GOA</option>
                <option value="GUJARAT">GUJARAT</option>
                <option value="HARYANA">HARYANA</option>
                <option value="HIMACHAL PRADESH">HIMACHAL PRADESH</option>
                <option value="JAMMU & KASHMIR">JAMMU & KASHMIR</option>
                <option value="JHARKHAND">JHARKHAND</option>
                <option value="KARNATAKA">KARNATAKA</option>
                <option value="KERALA">KERALA</option>
                <option value="LAKSHADWEEP">LAKSHADWEEP</option>
                <option value="MADHYA PRADESH">MADHYA PRADESH</option>
                <option value="Maharashtra">Maharashtra</option>
                <option value="MANIPUR">MANIPUR</option>
                <option value="MEGHALAYA">MEGHALAYA</option>
                <option value="MIZORAM">MIZORAM</option>
                <option value="NAGALAND">NAGALAND</option>
                <option value="NCT OF DELHI">NCT OF DELHI</option>
                <option value="ODISHA">ODISHA</option>
                <option value="PUDUCHERRY">PUDUCHERRY</option>
                <option value="PUNJAB">PUNJAB</option>
                <option value="RAJASTHAN">RAJASTHAN</option>
                <option value="SIKKIM">SIKKIM</option>
                <option value="TAMIL NADU">TAMIL NADU</option>
                <option value="TELANGANA">TELANGANA</option>
                <option value="TRIPURA">TRIPURA</option>
                <option value="UTTAR PRADESH">UTTAR PRADESH</option>
                <option value="UTTARAKHAND">UTTARAKHAND</option>
                <option value="WEST BENGAL">WEST BENGAL</option>
              </Select>
            </FormControl>
            
            <FormControl>
              <FormLabel>Class 10th District</FormLabel>
              <Select name="class10District" value={formData.class10District} onChange={handleChange}>
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
              <FormLabel>Class 10th Taluka</FormLabel>
              <Select name="class10Taluka" value={formData.class10Taluka} onChange={handleChange}>
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
              <FormLabel>Class 10th Course</FormLabel>
              <Input name="class10Course" value={formData.class10Course} onChange={handleChange}>
              </Input>
            </FormControl>
            
            <FormControl>
              <FormLabel>Course Name</FormLabel>
              <Input name="courseName" value={formData.courseName} onChange={handleChange}>
              </Input>
            </FormControl>

            <FormControl>
              <FormLabel>Class 10th Board</FormLabel>
              <Select name="class10Board" value={formData.class10Board} onChange={handleChange}>
              <option value="">Select</option>
              <option value="MAHARASHTRA STATE BOARD OF SECONDARY AND HIGHER SECONDARY EDUCATION">MAHARASHTRA STATE BOARD OF SECONDARY AND HIGHER SECONDARY EDUCATION</option>
              <option value="CBSE">CBSE</option>
              <option value="ICSE">ICSE</option>
              <option value="Others">Others</option>
              </Select>
            </FormControl>


            <FormControl>
              <FormLabel>Class 10th Mode</FormLabel>
              <Select name="class10Mode" value={formData.class10Mode} onChange={handleChange}>
              <option value="">Select</option>
              <option value="Regular">Regular</option>
              <option value="Distance / Correspondence">Distance / Correspondence</option>
              </Select>
            </FormControl>
            
            
            <FormControl>
              <FormLabel>Class 10th Admission Year</FormLabel>
              <Select name="class10AdmissionYear" value={formData.class10AdmissionYear} onChange={handleChange}>
              <option value="">Select</option>
              <option value="2014">2014</option>
              <option value="2015">2015</option>
              <option value="2016">2016</option>
              <option value="2017">2017</option>
              <option value="2018">2018</option>
              <option value="2019">2019</option>
              <option value="2020">2020</option>
              <option value="2021">2021</option>
              <option value="2022">2022</option>
              </Select>
            </FormControl>

            <FormControl>
              <FormLabel>Class 10th Passing Year</FormLabel>
              <Select name="class10PassingYear" value={formData.class10PassingYear} onChange={handleChange}>
              <option value="">Select</option>
              <option value="2014">2014</option>
              <option value="2015">2015</option>
              <option value="2016">2016</option>
              <option value="2017">2017</option>
              <option value="2018">2018</option>
              <option value="2019">2019</option>
              <option value="2020">2020</option>
              <option value="2021">2021</option>
              <option value="2022">2022</option>
              </Select>
            </FormControl>
            
            <FormControl>
              <FormLabel>Class 10th Result</FormLabel>
              <Select name="class10Result" value={formData.class10Result} onChange={handleChange}>
              <option value="">Select</option>
              <option value="Passed">Passed</option>
              <option value="Failed">Failed</option>
              </Select>
            </FormControl>
            
            <FormControl>
              <FormLabel>Class 10th Percentage</FormLabel>
              <Input name="class10Percentage" value={formData.class10Percentage} onChange={handleChange}>
              </Input>
            </FormControl>

            <FormControl>
              <FormLabel>Class 10th Attempt</FormLabel>
              <Input name="class10Attempt" value={formData.class10Attempt} onChange={handleChange}>
              </Input>
            </FormControl>

            <FormControl>
              <FormLabel>Class 10th Seat Number</FormLabel>
              <Input name="class10SeatNumber" value={formData.class10SeatNumber} onChange={handleChange}>
              </Input>
            </FormControl>

            <FormControl>
              <FormLabel>Class 10th Month of Exam</FormLabel>
              <Select name="class10MonthOfExam" value={formData.class10MonthOfExam} onChange={handleChange}>
              <option value="">Select</option>
              <option value="FEB/MAR">FEB/MAR</option>
              <option value="OCT">OCT</option>
              <option value="JUNE">JUNE</option>
              <option value="JULY">JULY</option>
              </Select>
            </FormControl>
            
            <FormControl>
              <FormLabel>Class 10th Marks Obtained</FormLabel>
              <Input name="class10MarksObtained" value={formData.class10MarksObtained} onChange={handleChange}>
              </Input>
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

export default Edit_10th_FreshStud_Modal;

