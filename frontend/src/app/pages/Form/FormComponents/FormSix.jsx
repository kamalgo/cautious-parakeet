import React, { useContext, useEffect, useState } from "react";
import {
  Box,
  Button,
  FormControl,
  FormLabel,
  Input,
  Select,
  Tag,
  TagCloseButton,
  TagLabel,
  VStack,
  useToast,
} from "@chakra-ui/react";
import {
  getHostelDetailsInfoApi,
  submitFormDataApi,
  submitHostelDocumentApi,
} from "../../../api/FormApi/FormApi";
import { getOTPSecret } from "../../../helpers/AuthHelpers";
import { getHostelTypeApi } from "../../../api/FormApi/FormDropdownApi";
import { InboxOutlined } from "@ant-design/icons";

function FormSix() {
  const [formData, setFormData] = useState({});
  const [buttonLoading, setButtonLoading] = useState(false);

  const [hostelDocFile, setHostelDocFile] = useState([]);
  const [hostelTypeList, setHostelTypeList] = useState([]);
  const [
    stateOfAreYouHostelleOrrDayScholar,
    setStateOfAreYouHostellerOrDayScholar,
  ] = useState(false);

  const toast = useToast();
  const listForHostellerOrDayScholar = ["Hosteller", "Day Scholar"];

  const handleChange = (param) => (event) => {
    setFormData({ ...formData, [param]: event.target.value });
  };

  const handleHostelDocUpload = (event) => {
    // console.log("event from caste", event);
    setHostelDocFile(Object.entries(event.target.files));
  };

  const removeHostelDoc = (index) => {
    let temp = [...hostelDocFile];
    temp.splice(index, 1);
    setHostelDocFile(temp || []);
  };

  const uploadHosteDocument = () => {
    console.log("uploadHosteDocument");

    const formDataMain = new FormData();

    const data = { id: formData.id };

    for (const key in data) {
      formDataMain.append(key, data[key]);
    }

    hostelDocFile.map((item, index) => {
      // test.push(item);
      console.log("item-hostelDocument", item);
      formDataMain.append(`hosteldocument`, item[1]);
    });

    submitHostelDocumentApi(formDataMain)
      .then((res) => {
        console.log("res", res);
        if (res.success) {
          // onClose();
          // getAllColleges();
          toast({
            title: "Hostel Document uploaded.",
            description: res.message,
            status: "success",
            duration: 9000,
            isClosable: true,
            position: "top-right",
          });
          setHostelDocFile([]);
          // setDisplayCasteLink(res.url);
          // setFormData({ ...formData, casteDoc: res.url });
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

  const handleChangeAreYouHostellerDayScholarDropDown = (param) => (event) => {
    // if (formData.isFatherAlive === "Yes") {
    //   setStateOfIsFatherAlive(false);
    // } else {
    //   setStateOfIsFatherAlive(true);
    // }
    const newValue = event.target.value;
    setStateOfAreYouHostellerOrDayScholar(newValue === "Hosteller");
    // setStateOfCasteCertificate(newValue === "Yes");
    setFormData({ ...formData, [param]: newValue });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    // console.log("formData", formData);
    const data = {
      id: formData.id,
      areYouHostellerDayScholar: formData.areYouHostellerDayScholar,
      hostelState: formData.hostelState,
      hostelDistrict: formData.hostelDistrict,
      hostelTaluka: formData.hostelTaluka,
      hostelType: formData.hostelType,
      hostelName: formData.hostelName,
      hostelAddress: formData.hostelAddress,
      hostelPincode: formData.hostelPincode,
      hostelAdmissionDate: formData.hostelAdmissionDate,
      hostelDoc: formData.hostelDoc,
    };

    console.log("data", data);
    submitFormDataApi(data)
      .then((res) => {
        if (res.success) {
          toast({
            title: "Hostel Details Info Details Updated.",
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

  const getHostelDetailsInfo = () => {
    const studentMail = getOTPSecret().to;
    const data = {
      email: studentMail,
    };
    getHostelDetailsInfoApi(data)
      .then((res) => {
        console.log("res  -- getHostelDetailsInfo", res.data[0]);
        setFormData(res.data[0]);
      })
      .catch((error) => {
        console.error(error);
      });
  };

  const getHostelTypeData = () => {
    getHostelTypeApi()
      .then((res) => {
        // console.log("res getHostelTypeApi", res);
        setHostelTypeList(res.data);
      })
      .catch((error) => {
        console.error(error);
      });
  };

  useEffect(() => {
    getHostelDetailsInfo();
    getHostelTypeData();
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
            {/* <FormControl id="areYouHostellerDayScholar">
              <FormLabel>Are you a Hosteller or Day Scholar</FormLabel>
              <Input
                type="text"
                placeholder="Are you a Hosteller or Day Scholar"
                value={formData.areYouHostellerDayScholar}
                onChange={handleChange("areYouHostellerDayScholar")}
              />
            </FormControl> */}
            <FormControl id="areYouHostellerDayScholar">
              <FormLabel>Are you a Hosteller or Day Scholar</FormLabel>

              <Select
                placeholder="Select your Hosteller or Day Scholar"
                value={formData.areYouHostellerDayScholar}
                onChange={handleChangeAreYouHostellerDayScholarDropDown(
                  "areYouHostellerDayScholar"
                )}
              >
                {listForHostellerOrDayScholar?.map((status, index) => {
                  // console.log("status", status);
                  return (
                    <option key={index} value={status}>
                      {status}
                    </option>
                  );
                })}
              </Select>
            </FormControl>

            {stateOfAreYouHostelleOrrDayScholar && (
              <>
                <FormControl id="hostelState">
                  <FormLabel>Hostel State</FormLabel>
                  <Input
                    type="text"
                    placeholder="Hostel State"
                    value={formData.hostelState}
                    onChange={handleChange("hostelState")}
                  />
                </FormControl>

                <FormControl id="hostelDistrict">
                  <FormLabel>Hostel District</FormLabel>
                  <Input
                    type="text"
                    placeholder="Hostel District"
                    value={formData.hostelDistrict}
                    onChange={handleChange("hostelDistrict")}
                  />
                </FormControl>

                <FormControl id="hostelTaluka">
                  <FormLabel>Hostel Taluka</FormLabel>
                  <Input
                    type="text"
                    placeholder="Hostel Taluka"
                    value={formData.hostelTaluka}
                    onChange={handleChange("hostelTaluka")}
                  />
                </FormControl>

                <FormControl id="hostelType">
                  <FormLabel>Hostel Type</FormLabel>
                  <Select
                    placeholder="Select your Hostel Type"
                    value={formData.hostelType}
                    onChange={handleChange("hostelType")}
                    required
                  >
                    {hostelTypeList?.map((status, index) => (
                      <option key={index} value={status.hostel_type_name}>
                        {status.hostel_type_name}
                      </option>
                    ))}
                  </Select>
                </FormControl>

                <FormControl id="hostelName">
                  <FormLabel>Hostel/ P.G/Rented House Name</FormLabel>
                  <Input
                    type="text"
                    placeholder="Hostel/ P.G/Rented House Name"
                    value={formData.hostelName}
                    onChange={handleChange("hostelName")}
                  />
                </FormControl>

                <FormControl id="hostelAddress">
                  <FormLabel>Hostel/ P.G/Rented House Address</FormLabel>
                  <Input
                    type="text"
                    placeholder="Hostel/ P.G/Rented House Address"
                    value={formData.hostelAddress}
                    onChange={handleChange("hostelAddress")}
                  />
                </FormControl>

                <FormControl id="hostelPincode">
                  <FormLabel>Hostel Pin Code</FormLabel>
                  <Input
                    type="text"
                    placeholder="Hostel Pin Code"
                    value={formData.hostelPincode}
                    onChange={handleChange("hostelPincode")}
                  />
                </FormControl>

                <FormControl id="hostelAdmissionDate">
                  <FormLabel>Hostel Admission Date</FormLabel>
                  <Input
                    type="text"
                    placeholder="Hostel Admission Date"
                    value={formData.hostelAdmissionDate}
                    onChange={handleChange("hostelAdmissionDate")}
                  />
                </FormControl>

                {/* <FormControl id="hostelDoc">
                  <FormLabel>Hostel Docs</FormLabel>
                  <Input
                    type="text"
                    placeholder="Hostel Docs"
                    value={formData.hostelDoc}
                    onChange={handleChange("hostelDoc")}
                  />
                </FormControl> */}
                <FormControl id="hostelDoc">
                  <FormLabel>Hostel Docs</FormLabel>
                  <label htmlFor="formIdHostelDoc">
                    <Box
                      padding={1}
                      display={"flex"}
                      justifyItems={"center"}
                      borderRadius={6}
                      alignItems={"center"}
                      marginBottom={4}
                      justifyContent={"center"}
                    >
                      <Input
                        type="file"
                        accept="*"
                        onChange={handleHostelDocUpload}
                        placeholder="0 file selected"
                        // required
                        name="HostelDoc"
                        id="formIdHostelDoc"
                        marginLeft={2}
                        hidden
                        // isDisabled={buttonLoading}
                      />

                      <Box
                        border="2px dashed #ccc"
                        textAlign="center"
                        padding="10"
                        borderRadius="md"
                        marginBottom="4"
                        cursor="pointer"
                        onDrop={(e) => {
                          e.preventDefault();
                          e.stopPropagation();
                          handleHostelDocUpload(e);
                        }}
                        onDragOver={(e) => {
                          e.preventDefault();
                          e.stopPropagation();
                        }}
                      >
                        <InboxOutlined
                          style={{ fontSize: "36px", color: "#ccc" }}
                        />
                        <p style={{ fontSize: "17px" }}>
                          {hostelDocFile.length == 0 ? (
                            <p style={{ color: "blue" }}>
                              Click here to select your zip file{" "}
                            </p>
                          ) : (
                            <p style={{ color: "green" }}>
                              Click on Upload button to upload selected file
                            </p>
                          )}
                        </p>
                      </Box>
                    </Box>
                  </label>
                  <div
                    style={{
                      display: "flex",
                      justifyContent: "center",
                      padding: 5,
                    }}
                  >
                    {hostelDocFile &&
                      hostelDocFile.map((item, index) => {
                        return (
                          <Tag
                            size={"sm"}
                            key={index}
                            borderRadius="full"
                            variant="solid"
                            colorScheme="green"
                            mr={2}
                            mt={2}
                          >
                            <TagLabel>{item[1]?.name}</TagLabel>
                            {!buttonLoading && (
                              <TagCloseButton
                                onClick={() => removeHostelDoc(index)}
                              />
                            )}
                          </Tag>
                        );
                      })}
                    <Button onClick={() => uploadHosteDocument()}>Save</Button>
                  </div>
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

export default FormSix;
