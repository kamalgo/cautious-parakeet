import {
  Box,
  Button,
  FormControl,
  FormLabel,
  Input,
  VStack,
  useToast,
} from "@chakra-ui/react";
import React, { useContext, useEffect, useState } from "react";
import {
  getAddressInfoApi,
  submitFormDataApi,
} from "../../../api/FormApi/FormApi";
import { getOTPSecret } from "../../../helpers/AuthHelpers";

function FormTwo() {
  const [formData, setFormData] = useState({});
  const toast = useToast();

  const handleChange = (param) => (event) => {
    setFormData({ ...formData, [param]: event.target.value });
  };

  // const handlePrev = () => {
  //   setFormState({ ...formState, currentTabIndex: 0 });
  // };

  const handleSubmit = (event) => {
    event.preventDefault();
    // console.log("formData", formData);
    const data = {
      id: formData.id,
      permanentVillage: formData.permanentVillage,
      correspoAddressSameAsPermanent: formData.correspoAddressSameAsPermanent,
      correspondanceDistrict: formData.correspondanceDistrict,
      correspondanceTaluka: formData.correspondanceTaluka,
      correspondanceAddress: formData.correspondanceAddress,
      correspondanceState: formData.correspondanceState,
      correspondanceVillage: formData.correspondanceVillage,
      correspondancePincode: formData.correspondancePincode,
    };
    console.log("data", data);

    submitFormDataApi(data)
      .then((res) => {
        if (res.success) {
          toast({
            title: "AddressInfo Details Updated.",
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

  const getAddressInfo = () => {
    const studentMail = getOTPSecret().to;
    const data = {
      email: studentMail,
    };
    getAddressInfoApi(data)
      .then((res) => {
        console.log("res -- getAddressInfo", res.data[0]);
        setFormData(res.data[0]);
      })
      .catch((error) => {
        console.error(error);
      });
  };

  useEffect(() => {
    getAddressInfo();
  }, []);

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
            <FormControl id="permanentVillage">
              <FormLabel>Enter your permanent Village</FormLabel>
              <Input
                type="text"
                placeholder="Enter your permanent Village"
                value={formData.permanentVillage}
                onChange={handleChange("permanentVillage")}
              />
            </FormControl>

            <FormControl id="correspoAddressSameAsPermanent">
              <FormLabel>
                Is Correspondence Address same as Permanent Address?
              </FormLabel>
              <Input
                type="text"
                placeholder=" Is Correspondence Address same as Permanent?"
                value={formData.correspoAddressSameAsPermanent}
                onChange={handleChange("correspoAddressSameAsPermanent")}
              />
            </FormControl>

            <FormControl id="correspondanceDistrict">
              <FormLabel>Enter your Correspondance Address District</FormLabel>
              <Input
                type="text"
                placeholder="Enter your Correspondance District"
                value={formData.correspondanceDistrict}
                onChange={handleChange("correspondanceDistrict")}
              />
            </FormControl>

            <FormControl id="correspondanceTaluka">
              <FormLabel>Enter your correspondance Address Taluka</FormLabel>
              <Input
                type="text"
                placeholder="Enter your correspondance Taluka"
                value={formData.correspondanceTaluka}
                onChange={handleChange("correspondanceTaluka")}
              />
            </FormControl>

            <FormControl id="correspondanceAddress">
              <FormLabel>Enter your correspondance Address</FormLabel>
              <Input
                type="text"
                placeholder="Enter your correspondance Address"
                value={formData.correspondanceAddress}
                onChange={handleChange("correspondanceAddress")}
              />
            </FormControl>

            <FormControl id="correspondanceState">
              <FormLabel>Enter your correspondance Address State</FormLabel>
              <Input
                type="text"
                placeholder="Enter your correspondance State"
                value={formData.correspondanceState}
                onChange={handleChange("correspondanceState")}
              />
            </FormControl>

            <FormControl id="correspondanceVillage">
              <FormLabel>Enter your correspondance Address Village</FormLabel>
              <Input
                type="text"
                placeholder="Enter your correspondance Village"
                value={formData.correspondanceVillage}
                onChange={handleChange("correspondanceVillage")}
              />
            </FormControl>

            <FormControl id="correspondancePincode">
              <FormLabel>Enter your correspondance Address Pin code</FormLabel>
              <Input
                type="text"
                placeholder="Enter your correspondance Pin code"
                value={formData.correspondancePincode}
                onChange={handleChange("correspondancePincode")}
              />
            </FormControl>
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

export default FormTwo;
