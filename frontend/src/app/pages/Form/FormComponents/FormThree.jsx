import React, { useContext, useEffect, useState } from "react";
// import { formContext } from "../FormDashboard";
import {
  Box,
  Button,
  FormControl,
  FormLabel,
  Input,
  Select,
  VStack,
  useToast,
} from "@chakra-ui/react";
import {
  getOtherInfoApi,
  submitFormDataApi,
} from "../../../api/FormApi/FormApi";
import { getOTPSecret } from "../../../helpers/AuthHelpers";
import { getOccpationListApi } from "../../../api/FormApi/FormDropdownApi";

function FormThree() {
  const [stateOfIsFatherAlive, setStateOfIsFatherAlive] = useState(false);
  const [stateOfIsMotherAlive, setStateOfIsMotherAlive] = useState(false);
  const [stateOfIsGuardianAlive, setStateOfIsGuardianAlive] = useState(false);

  const isFatherAlive = ["Yes", "No"];
  const isMotherAlive = ["Yes", "No"];

  // const getStatusOfBothParents = (status) => {
  //   if(stateOfIsFatherAlive === false && stateOfIsMotherAlive === false){
  //     setStateOfIsGuardianAlive(true);
  //     // return "Both Parents are Alive";
  //   }
  // }

  const [formData, setFormData] = useState({});
  const [occupationList, setOccupationList] = useState([]);

  const toast = useToast();

  const handleChangeisFatherAliveDropDown = (param) => (event) => {
    // if (formData.isFatherAlive === "Yes") {
    //   setStateOfIsFatherAlive(false);
    // } else {
    //   setStateOfIsFatherAlive(true);
    // }
    const newValue = event.target.value;
    setStateOfIsFatherAlive(newValue === "Yes");
    // setStateOfCasteCertificate(newValue === "Yes");
    setFormData({ ...formData, [param]: newValue });
  };

  const handleChangeisMotherAliveDropDown = (param) => (event) => {
    // console.log("event.target.value", event.target.value);
    // if (formData.motherAlive === "Yes") {
    //   // console.log("inside if");
    //   setStateOfIsMotherAlive(false);
    // } else {
    //   // console.log("inside else");
    //   setStateOfIsMotherAlive(true);
    // }
    const newValue = event.target.value;
    setStateOfIsMotherAlive(newValue === "Yes");
    setFormData({ ...formData, [param]: newValue });
  };

  const handleChange = (param) => (event) => {
    setFormData({ ...formData, [param]: event.target.value });
  };

  const getOtherInfo = () => {
    const studentMail = getOTPSecret().to;
    const data = {
      email: studentMail,
    };
    getOtherInfoApi(data)
      .then((res) => {
        console.log("res getOtherInfo", res.data[0]);
        setFormData(res.data[0]);
      })
      .catch((error) => {
        console.error(error);
      });
  };

  const getoccpationlistData = () => {
    getOccpationListApi()
      .then((res) => {
        // console.log("res getOccpationListApi", res);
        setOccupationList(res.data);
      })
      .catch((error) => {
        console.error(error);
      });
  };

  useEffect(() => {
    getOtherInfo();
    getoccpationlistData();
  }, []);

  useEffect(() => {
    console.log("stateOfIsFatherAlive", stateOfIsFatherAlive);
    console.log("stateOfIsMotherAlive", stateOfIsMotherAlive);
    console.log("here we are in useeffect condition");
    if (stateOfIsFatherAlive || stateOfIsMotherAlive) {
      console.log("inside if condition");
      setStateOfIsGuardianAlive(false);
    } else {
      console.log("inside else condition");
      setStateOfIsGuardianAlive(true);
    }
  }, [stateOfIsFatherAlive, stateOfIsMotherAlive]);

  const handleSubmit = (event) => {
    event.preventDefault();
    // console.log("formData", formData);
    const data = {
      id: formData.id,
      isFatherAlive: formData.isFatherAlive,
      fatherName: formData.fatherName,
      fatherOccupation: formData.fatherOccupation,
      fatherSalaried: formData.fatherSalaried,
      motherAlive: formData.motherAlive,
      motherName: formData.motherName,
      motherOccupation: formData.motherOccupation,
      isMotherSalaried: formData.isMotherSalaried,
      guardianName: formData.guardianName,
      guardianAddress: formData.guardianAddress,
      guardianOccupation: formData.guardianOccupation,
      isGuardianSalaried: formData.isGuardianSalaried,
      guardianRelationType: formData.guardianRelationType,
    };

    // console.log("data", data);
    submitFormDataApi(data)
      .then((res) => {
        if (res.success) {
          toast({
            title: "OtherInfo Details Updated.",
            description: res.message,
            status: "success",
            duration: 9000,
            isClosable: true,
            position: "top-right",
          });
        } else {
          // onClose();
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
      <form onSubmit={handleSubmit}>
        <Box maxW="md" mx="auto" mt="8">
          <VStack spacing="4">
            <FormControl id="id" display={"none"}>
              <FormLabel>id</FormLabel>
              <Input
                type="text"
                placeholder="Enter your id"
                value={formData.id}
                onChange={handleChange("id")}
              />
            </FormControl>
            {/* <FormControl id="isFatherAlive">
              <FormLabel>Is Father Alive?</FormLabel>
              <Input
                type="text"
                placeholder="Is Father Alive?"
                value={formData.isFatherAlive}
                onChange={handleChange("isFatherAlive")}
              />
            </FormControl> */}
            <FormControl id="isFatherAlive">
              <FormLabel>Is Father Alive?</FormLabel>

              <Select
                placeholder="Select your Value"
                value={formData.isFatherAlive}
                onChange={handleChangeisFatherAliveDropDown("isFatherAlive")}
              >
                {isFatherAlive?.map((status, index) => {
                  // console.log("status", status);
                  return (
                    <option key={index} value={status}>
                      {status}
                    </option>
                  );
                })}
              </Select>
            </FormControl>

            {stateOfIsFatherAlive && (
              <>
                <FormControl id="fatherName">
                  <FormLabel>Father Name</FormLabel>
                  <Input
                    type="text"
                    placeholder="Father Name"
                    value={formData.fatherName}
                    onChange={handleChange("fatherName")}
                  />
                </FormControl>

                {/* <FormControl id="fatherOccupation">
              <FormLabel>Father Occupation</FormLabel>
              <Input
                type="text"
                placeholder="Father Occupation"
                value={formData.fatherOccupation}
                onChange={handleChange("fatherOccupation")}
              />
            </FormControl> */}

                <FormControl id="fatherOccupation">
                  <FormLabel>Father Occupation</FormLabel>
                  <Select
                    placeholder="Select your Father Occupation"
                    value={formData.fatherOccupation}
                    onChange={handleChange("fatherOccupation")}
                    required
                  >
                    {occupationList?.map((status, index) => (
                      <option key={index} value={status.occu_name}>
                        {status.occu_name}
                      </option>
                    ))}
                  </Select>
                </FormControl>

                <FormControl id="fatherSalaried">
                  <FormLabel>Father Is Salaried?</FormLabel>
                  <Input
                    type="text"
                    placeholder="Father Is Salaried?"
                    value={formData.fatherSalaried}
                    onChange={handleChange("fatherSalaried")}
                  />
                </FormControl>

                {/* <FormControl id="motherAlive">
              <FormLabel>Is Mother Alive?</FormLabel>
              <Input
                type="text"
                placeholder="Is Mother Alive?"
                value={formData.motherAlive}
                onChange={handleChange("motherAlive")}
              />
            </FormControl> */}
              </>
            )}

            <FormControl id="motherAlive">
              <FormLabel>Is Mother Alive?</FormLabel>

              <Select
                placeholder="Select your Value"
                value={formData.motherAlive}
                onChange={handleChangeisMotherAliveDropDown("motherAlive")}
              >
                {isMotherAlive?.map((status, index) => {
                  // console.log("status mommmmm", status);
                  return (
                    <option key={index} value={status}>
                      {status}
                    </option>
                  );
                })}
              </Select>
            </FormControl>
            {stateOfIsMotherAlive && (
              <>
                <FormControl id="motherName">
                  <FormLabel>Mother Name</FormLabel>
                  <Input
                    type="text"
                    placeholder="motherName"
                    value={formData.motherName}
                    onChange={handleChange("motherName")}
                  />
                </FormControl>

                {/* <FormControl id="motherOccupation">
              <FormLabel>mother Occupation</FormLabel>
              <Input
                type="text"
                placeholder="motherOccupation"
                value={formData.motherOccupation}
                onChange={handleChange("motherOccupation")}
              />
            </FormControl> */}

                <FormControl id="motherOccupation">
                  <FormLabel>Mother Occupation</FormLabel>
                  <Select
                    placeholder="Select your Mother Occupation"
                    value={formData.motherOccupation}
                    onChange={handleChange("motherOccupation")}
                    required
                  >
                    {occupationList?.map((status, index) => (
                      <option key={index} value={status.occu_name}>
                        {status.occu_name}
                      </option>
                    ))}
                  </Select>
                </FormControl>

                <FormControl id="isMotherSalaried">
                  <FormLabel>Is Mother Salaried</FormLabel>
                  <Input
                    type="text"
                    placeholder="isMotherSalaried"
                    value={formData.isMotherSalaried}
                    onChange={handleChange("isMotherSalaried")}
                  />
                </FormControl>
              </>
            )}
            {stateOfIsGuardianAlive && (
              <>
                <FormControl id="guardianName">
                  <FormLabel>Guardian Name</FormLabel>
                  <Input
                    type="text"
                    placeholder="guardianName"
                    value={formData.guardianName}
                    onChange={handleChange("guardianName")}
                  />
                </FormControl>
                <FormControl id="guardianAddress">
                  <FormLabel>Guardian Address</FormLabel>
                  <Input
                    type="text"
                    placeholder="guardianAddress"
                    value={formData.guardianAddress}
                    onChange={handleChange("guardianAddress")}
                  />
                </FormControl>
                <FormControl id="guardianOccupation">
                  <FormLabel>Guardian Occupation</FormLabel>
                  <Input
                    type="text"
                    placeholder="guardianOccupation"
                    value={formData.guardianOccupation}
                    onChange={handleChange("guardianOccupation")}
                  />
                </FormControl>

                <FormControl id="isGuardianSalaried">
                  <FormLabel>Is Guardian Salaried</FormLabel>
                  <Input
                    type="text"
                    placeholder="isGuardianSalaried"
                    value={formData.isGuardianSalaried}
                    onChange={handleChange("isGuardianSalaried")}
                  />
                </FormControl>
                <FormControl id="guardianRelationType">
                  <FormLabel>Relation Type</FormLabel>
                  <Input
                    type="text"
                    placeholder="guardianRelationType"
                    value={formData.guardianRelationType}
                    onChange={handleChange("guardianRelationType")}
                  />
                </FormControl>
              </>
            )}
          </VStack>
          <Button
            color="text.light"
            type="submit"
            bg="primary.main"
            variant={"outline"}
            mt={2}
          >
            Submit
          </Button>
        </Box>
      </form>
    </>
  );
}

export default FormThree;
