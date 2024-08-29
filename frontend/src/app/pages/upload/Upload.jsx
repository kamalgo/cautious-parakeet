import React, { useState } from "react";
import Base from "../../components/Base";
import {
  Box,
  Button,
  FormControl,
  Icon,
  Input,
  useToast,
} from "@chakra-ui/react";
import { Tag, TagLabel, TagCloseButton, Select } from "@chakra-ui/react";
import { InboxOutlined } from "@ant-design/icons";
import { AiOutlineCloudUpload } from "react-icons/ai";
import { uploadExcelApi } from "../../api/uploadExcel/uploadExcel";
import { Heading } from "@chakra-ui/react";

function Upload() {
  const toast = useToast();
  const [excelFile, setExcelFile] = useState([]);
  const [buttonLoading, setButtonLoading] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    const formData = new FormData();

    console.log("excelFile", excelFile);

    let test = [];

    excelFile.map((item, index) => {
      test.push(item);
      formData.append(`vivek`, item[1]);
    });
    console.log("formData::::::", formData);

    uploadExcelApi(formData)
      .then((res) => {
        console.log("res", res);
        if (res.success) {
          setButtonLoading(false);
          toast({
            title: "Excel Uploded.",
            description: res.message,
            status: "success",
            duration: 9000,
            isClosable: true,
            position: "top-right",
          });
        } else {
          setButtonLoading(false);
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

  const handleVideoUpload = (event) => {
    setExcelFile(Object.entries(event.target.files));
    setMyTestFile(event.target.files[0]);
  };

  const removeVideo = (index) => {
    let temp = [...excelFile];
    temp.splice(index, 1);
    setExcelFile(temp || []);
  };

  return (
    <div>
      <Base>
        <Box>
          <Box>
            <Heading>Upload the Excel File</Heading>
          </Box>
          <form onSubmit={handleSubmit} encType="multipart/form-data">
            <FormControl>
              <label htmlFor="formId">
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
                    accept=".xlsx,.xls"
                    onChange={handleVideoUpload}
                    placeholder="0 file selected"
                    required
                    name="video"
                    id="formId"
                    marginLeft={2}
                    hidden
                    isDisabled={buttonLoading}
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
                      handleVideoUpload(e);
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
                      {excelFile.length == 0 ? (
                        <p style={{ color: "blue" }}>
                          Click here to select your excel file{" "}
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
                {excelFile &&
                  excelFile.map((item, index) => {
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
                          <TagCloseButton onClick={() => removeVideo(index)} />
                        )}
                      </Tag>
                    );
                  })}
              </div>
            </FormControl>
            <Box
              display={"flex"}
              justifyContent={"center"}
              alignItems={"center"}
            >
              <Button
                w={"70%"}
                variant={"solid"}
                // disabled={true}
                isDisabled={excelFile.length == 0}
                isLoading={buttonLoading}
                loadingText="Upload"
                type="submit"
                leftIcon={<Icon as={AiOutlineCloudUpload} />}
                bg={"primary.main"}
                color={"text.light"}
                mr={3}
              >
                Upload
              </Button>
            </Box>
          </form>
        </Box>
      </Base>
    </div>
  );
}

export default Upload;
