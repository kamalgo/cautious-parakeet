// import React, { useState } from "react";
// import Base from "../../components/Base";
// import {
//   Box,
//   Button,
//   FormControl,
//   Icon,
//   Input,
//   useToast,
//   Heading,
// } from "@chakra-ui/react";
// import { InboxOutlined } from "@ant-design/icons";
// import { AiOutlineCloudUpload } from "react-icons/ai";

// const Bulkupload = () => {
//   const toast = useToast();
//   const [file, setFile] = useState(null);
//   const [buttonLoading, setButtonLoading] = useState(false);

//   const handleCSVUpload = (event) => {
//     setFile(event.target.files[0]);
//   };

//   const handleFileRead = async (event) => {
//     const content = event.target.result;
//     console.log("CSV File Content:", content);

//     try {
//       const response = await fetch("http://localhost:4004/csv/upload", {
//         method: "POST",
//         body: formData,
//       });
      

//       if (response.ok) {
//         toast({
//           title: "File Uploaded.",
//           description: "CSV file uploaded successfully",
//           status: "success",
//           duration: 9000,
//           isClosable: true,
//           position: "top-right",
//         });
//       } else {
//         throw new Error("Failed to upload CSV file");
//       }
//     } catch (error) {
//       console.error("Error:", error);
//       toast({
//         title: "Error",
//         description: "Failed to upload CSV file",
//         status: "error",
//         duration: 9000,
//         isClosable: true,
//         position: "top-right",
//       });
//     } finally {
//       setButtonLoading(false);
//     }
//   };

//   const handleUpload = async () => {
//     if (!file) {
//       console.error("No file selected.");
//       return;
//     }

//     setButtonLoading(true);

//     const reader = new FileReader();
//     reader.onload = handleFileRead;
//     reader.readAsText(file);
//   };

//   return (
//     <div>
//       <Base>
//         <Box>
//           <Box>
//             <Heading>Upload File(s)</Heading>
//           </Box>
//           <FormControl>
//             <label htmlFor="csvFormId">
//               <Box
//                 padding={1}
//                 display={"flex"}
//                 justifyItems={"center"}
//                 borderRadius={6}
//                 alignItems={"center"}
//                 marginBottom={4}
//                 justifyContent={"center"}
//               >
//                 <Input
//                   type="file"
//                   accept=".csv"
//                   onChange={handleCSVUpload}
//                   placeholder="0 file selected"
//                   required
//                   name="csv"
//                   id="csvFormId"
//                   marginLeft={2}
//                   hidden
//                   disabled={buttonLoading}
//                 />

//                 <Box
//                   border="2px dashed #ccc"
//                   textAlign="center"
//                   padding="10"
//                   borderRadius="md"
//                   marginBottom="4"
//                   cursor="pointer"
//                   onDrop={(e) => {
//                     e.preventDefault();
//                     e.stopPropagation();
//                     handleCSVUpload(e);
//                   }}
//                   onDragOver={(e) => {
//                     e.preventDefault();
//                     e.stopPropagation();
//                   }}
//                 >
//                   <InboxOutlined
//                     style={{ fontSize: "36px", color: "#ccc" }}
//                   />
//                   <p style={{ fontSize: "17px" }}>
//                     {file ? (
//                       <span style={{ color: "green" }}>
//                         Click on Upload button to upload selected file
//                       </span>
//                     ) : (
//                       <span style={{ color: "blue" }}>
//                         Click here to select your CSV file{" "}
//                       </span>
//                     )}
//                   </p>
//                 </Box>
//               </Box>
//             </label>
//           </FormControl>
//           <Box display={"flex"} justifyContent={"center"} alignItems={"center"}>
//             <Button
//               w={"70%"}
//               variant={"solid"}
//               disabled={!file || buttonLoading}
//               isLoading={buttonLoading}
//               loadingText="Upload"
//               onClick={handleUpload}
//               leftIcon={<Icon as={AiOutlineCloudUpload} />}
//               bg={"primary.main"}
//               color={"text.light"}
//               mr={3}
//             >
//               Upload
//             </Button>
//           </Box>
//         </Box>
//       </Base>
//     </div>
//   );
// };

// export default Bulkupload;



// //below is simple code to upload the csv file and print it on console

// // import React, { useState } from "react";
// // import Base from "../../components/Base";
// // import {
// //   Box,
// //   Button,
// //   FormControl,
// //   Icon,
// //   Input,
// //   useToast,
// //   Heading,
// // } from "@chakra-ui/react";
// // import { InboxOutlined } from "@ant-design/icons";
// // import { AiOutlineCloudUpload } from "react-icons/ai";

// // const Bulkupload = () => {
// //   const toast = useToast();
// //   const [file, setFile] = useState(null);
// //   const [buttonLoading, setButtonLoading] = useState(false);

// //   const handleCSVUpload = (event) => {
// //     setFile(event.target.files[0]);
// //   };

// //   const handleFileRead = (event) => {
// //     const content = event.target.result;
// //     console.log("CSV File Content:", content);
// //   };

// //   const handleUpload = async () => {
// //     if (!file) {
// //       console.error("No file selected.");
// //       return;
// //     }

// //     setButtonLoading(true);

// //     try {
// //       const reader = new FileReader();
// //       reader.onload = handleFileRead;
// //       reader.readAsText(file);

// //       toast({
// //         title: "File Uploaded.",
// //         description: "CSV file uploaded successfully",
// //         status: "success",
// //         duration: 9000,
// //         isClosable: true,
// //         position: "top-right",
// //       });
// //     } catch (error) {
// //       console.error("Error:", error);
// //       toast({
// //         title: "Error",
// //         description: "Failed to upload CSV file",
// //         status: "error",
// //         duration: 9000,
// //         isClosable: true,
// //         position: "top-right",
// //       });
// //     } finally {
// //       setButtonLoading(false);
// //     }
// //   };

// //   return (
// //     <div>
// //       <Base>
// //         <Box>
// //           <Box>
// //             <Heading>Upload File(s)</Heading>
// //           </Box>
// //           <FormControl>
// //             <label htmlFor="csvFormId">
// //               <Box
// //                 padding={1}
// //                 display={"flex"}
// //                 justifyItems={"center"}
// //                 borderRadius={6}
// //                 alignItems={"center"}
// //                 marginBottom={4}
// //                 justifyContent={"center"}
// //               >
// //                 <Input
// //                   type="file"
// //                   accept=".csv"
// //                   onChange={handleCSVUpload}
// //                   placeholder="0 file selected"
// //                   required
// //                   name="csv"
// //                   id="csvFormId"
// //                   marginLeft={2}
// //                   hidden
// //                   disabled={buttonLoading}
// //                 />

// //                 <Box
// //                   border="2px dashed #ccc"
// //                   textAlign="center"
// //                   padding="10"
// //                   borderRadius="md"
// //                   marginBottom="4"
// //                   cursor="pointer"
// //                   onDrop={(e) => {
// //                     e.preventDefault();
// //                     e.stopPropagation();
// //                     handleCSVUpload(e);
// //                   }}
// //                   onDragOver={(e) => {
// //                     e.preventDefault();
// //                     e.stopPropagation();
// //                   }}
// //                 >
// //                   <InboxOutlined
// //                     style={{ fontSize: "36px", color: "#ccc" }}
// //                   />
// //                   <p style={{ fontSize: "17px" }}>
// //                     {file ? (
// //                       <span style={{ color: "green" }}>
// //                         Click on Upload button to upload selected file
// //                       </span>
// //                     ) : (
// //                       <span style={{ color: "blue" }}>
// //                         Click here to select your CSV file{" "}
// //                       </span>
// //                     )}
// //                   </p>
// //                 </Box>
// //               </Box>
// //             </label>
// //           </FormControl>
// //           <Box display={"flex"} justifyContent={"center"} alignItems={"center"}>
// //             <Button
// //               w={"70%"}
// //               variant={"solid"}
// //               disabled={!file || buttonLoading}
// //               isLoading={buttonLoading}
// //               loadingText="Upload"
// //               onClick={handleUpload}
// //               leftIcon={<Icon as={AiOutlineCloudUpload} />}
// //               bg={"primary.main"}
// //               color={"text.light"}
// //               mr={3}
// //             >
// //               Upload
// //             </Button>
// //           </Box>
// //         </Box>
// //       </Base>
// //     </div>
// //   );
// // };

// // export default Bulkupload;


// // import React, { useState } from "react";
// // import Base from "../../components/Base";
// // import {
// //   Box,
// //   Button,
// //   FormControl,
// //   Icon,
// //   Input,
// //   useToast,
// //   Heading,
// // } from "@chakra-ui/react";
// // import { InboxOutlined } from "@ant-design/icons";
// // import { AiOutlineCloudUpload } from "react-icons/ai";
// // import { uploadCSVApi } from "../../api/uploadCSV/uploadCSV";

// // const Bulkupload = () => {
// //   const toast = useToast();
// //   const [file, setFile] = useState(null);
// //   const [buttonLoading, setButtonLoading] = useState(false);

// //   const handleCSVUpload = (event) => {
// //     setFile(event.target.files[0]);
// //   };

// //   const handleSubmit = async (e) => {
// //     e.preventDefault();

// //     if (!file) {
// //       console.error("No file selected.");
// //       return;
// //     }

// //     setButtonLoading(true);

// //     try {
// //       const formData = new FormData();
// //       formData.append('csv', file);

// //       const response = await uploadCSVApi(formData);

// //       if (response.success) {
// //         toast({
// //           title: "File Uploaded.",
// //           description: response.message,
// //           status: "success",
// //           duration: 9000,
// //           isClosable: true,
// //           position: "top-right",
// //         });
// //       } else {
// //         toast({
// //           title: "Operation failed!",
// //           description: response.message,
// //           status: "error",
// //           duration: 9000,
// //           isClosable: true,
// //           position: "top-right",
// //         });
// //       }
// //     } catch (error) {
// //       console.error("Error:", error);
// //       toast({
// //         title: "Error",
// //         description: "Failed to upload CSV file",
// //         status: "error",
// //         duration: 9000,
// //         isClosable: true,
// //         position: "top-right",
// //       });
// //     } finally {
// //       setButtonLoading(false);
// //     }
// //   };

// //   return (
// //     <div>
// //       <Base>
// //         <Box>
// //           <Box>
// //             <Heading>Upload File(s)</Heading>
// //           </Box>
// //           <form onSubmit={handleSubmit} encType="multipart/form-data">
// //             <FormControl>
// //               <label htmlFor="csvFormId">
// //                 <Box
// //                   padding={1}
// //                   display={"flex"}
// //                   justifyItems={"center"}
// //                   borderRadius={6}
// //                   alignItems={"center"}
// //                   marginBottom={4}
// //                   justifyContent={"center"}
// //                 >
// //                   <Input
// //                     type="file"
// //                     accept=".csv"
// //                     onChange={handleCSVUpload}
// //                     placeholder="0 file selected"
// //                     required
// //                     name="csv"
// //                     id="csvFormId"
// //                     marginLeft={2}
// //                     hidden
// //                     disabled={buttonLoading}
// //                   />

// //                   <Box
// //                     border="2px dashed #ccc"
// //                     textAlign="center"
// //                     padding="10"
// //                     borderRadius="md"
// //                     marginBottom="4"
// //                     cursor="pointer"
// //                     onDrop={(e) => {
// //                       e.preventDefault();
// //                       e.stopPropagation();
// //                       handleCSVUpload(e);
// //                     }}
// //                     onDragOver={(e) => {
// //                       e.preventDefault();
// //                       e.stopPropagation();
// //                     }}
// //                   >
// //                     <InboxOutlined
// //                       style={{ fontSize: "36px", color: "#ccc" }}
// //                     />
// //                     <p style={{ fontSize: "17px" }}>
// //                       {file ? (
// //                         <span style={{ color: "green" }}>
// //                           Click on Upload button to upload selected file
// //                         </span>
// //                       ) : (
// //                         <span style={{ color: "blue" }}>
// //                           Click here to select your CSV file{" "}
// //                         </span>
// //                       )}
// //                     </p>
// //                   </Box>
// //                 </Box>
// //               </label>
// //             </FormControl>
// //             <Box
// //               display={"flex"}
// //               justifyContent={"center"}
// //               alignItems={"center"}
// //             >
// //               <Button
// //                 w={"70%"}
// //                 variant={"solid"}
// //                 disabled={!file || buttonLoading}
// //                 isLoading={buttonLoading}
// //                 loadingText="Upload"
// //                 type="submit"
// //                 leftIcon={<Icon as={AiOutlineCloudUpload} />}
// //                 bg={"primary.main"}
// //                 color={"text.light"}
// //                 mr={3}
// //               >
// //                 Upload
// //               </Button>
// //             </Box>
// //           </form>
// //         </Box>
// //       </Base>
// //     </div>
// //   );
// // };

// // export default Bulkupload;



// // import React, { useState } from "react";
// // import Base from "../../components/Base";
// // import {
// //   Box,
// //   Button,
// //   FormControl,
// //   Icon,
// //   Input,
// //   useToast,
// //   Heading,
// // } from "@chakra-ui/react";
// // import { InboxOutlined } from "@ant-design/icons";
// // import { AiOutlineCloudUpload } from "react-icons/ai";
// // import { uploadCSVApi } from "../../api/uploadCSV/uploadCSV"; // Import CSV upload API function

// // const Bulkupload = () => {
// //   const toast = useToast();
// //   const [file, setFile] = useState(null); // State for CSV file
// //   const [buttonLoading, setButtonLoading] = useState(false);

// //   // Event handler for CSV file upload
// //   const handleCSVUpload = (event) => {
// //     const selectedFile = event.target.files[0];
// //     console.log("Selected File:", selectedFile); // Check the selected file
// //     setFile(selectedFile);
// //   };

// //   // Event handler for form submission
// //   const handleSubmit = async (e) => {
// //     e.preventDefault();
    
// //     // Check if CSV file is selected
// //     if (!file) {
// //       console.error("No file selected.");
// //       return; // Exit early if no file is selected
// //     }
// //     setButtonLoading(true);

// //     try {
// //       const formData = new FormData();
// //       formData.append('csv', file);

// //       const response = await uploadCSVApi(formData);

// //       if (response.success) {
// //         toast({
// //           title: "File Uploaded.",
// //           description: response.message,
// //           status: "success",
// //           duration: 9000,
// //           isClosable: true,
// //           position: "top-right",
// //         });
// //       } else {
// //         toast({
// //           title: "Operation failed!",
// //           description: response.message,
// //           status: "error",
// //           duration: 9000,
// //           isClosable: true,
// //           position: "top-right",
// //         });
// //       }
// //     } catch (error) {
// //       console.error("Error:", error);
// //       toast({
// //         title: "Error",
// //         description: "Failed to upload CSV file",
// //         status: "error",
// //         duration: 9000,
// //         isClosable: true,
// //         position: "top-right",
// //       });
// //     } finally {
// //       setButtonLoading(false);
// //     }
// //   };

// //   return (
// //     <div>
// //       <Base>
// //         <Box>
// //           <Box>
// //             <Heading>Upload File(s)</Heading>
// //           </Box>
// //           <form onSubmit={handleSubmit} encType="multipart/form-data">
// //             <FormControl>
// //               {/* CSV file input field */}
// //               <label htmlFor="csvFormId">
// //                 <Box
// //                   padding={1}
// //                   display={"flex"}
// //                   justifyItems={"center"}
// //                   borderRadius={6}
// //                   alignItems={"center"}
// //                   marginBottom={4}
// //                   justifyContent={"center"}
// //                 >
// //                   <Input
// //                     type="file"
// //                     accept=".csv"
// //                     onChange={handleCSVUpload}
// //                     placeholder="0 file selected"
// //                     required
// //                     name="csv"
// //                     id="csvFormId"
// //                     marginLeft={2}
// //                     hidden
// //                     disabled={buttonLoading}
// //                   />

// //                   <Box
// //                     border="2px dashed #ccc"
// //                     textAlign="center"
// //                     padding="10"
// //                     borderRadius="md"
// //                     marginBottom="4"
// //                     cursor="pointer"
// //                     onDrop={(e) => {
// //                       e.preventDefault();
// //                       e.stopPropagation();
// //                       handleCSVUpload(e);
// //                     }}
// //                     onDragOver={(e) => {
// //                       e.preventDefault();
// //                       e.stopPropagation();
// //                     }}
// //                   >
// //                     <InboxOutlined
// //                       style={{ fontSize: "36px", color: "#ccc" }}
// //                     />
// //                     <p style={{ fontSize: "17px" }}>
// //                       {file ? (
// //                         <span style={{ color: "green" }}>
// //                           Click on Upload button to upload selected file
// //                         </span>
// //                       ) : (
// //                         <span style={{ color: "blue" }}>
// //                           Click here to select your CSV file{" "}
// //                         </span>
// //                       )}
// //                     </p>
// //                   </Box>
// //                 </Box>
// //               </label>
// //             </FormControl>
// //             <Box
// //               display={"flex"}
// //               justifyContent={"center"}
// //               alignItems={"center"}
// //             >
// //               <Button
// //                 w={"70%"}
// //                 variant={"solid"}
// //                 disabled={!file}
// //                 isLoading={buttonLoading}
// //                 loadingText="Upload"
// //                 type="submit"
// //                 leftIcon={<Icon as={AiOutlineCloudUpload} />}
// //                 bg={"primary.main"}
// //                 color={"text.light"}
// //                 mr={3}
// //               >
// //                 Upload
// //               </Button>
// //             </Box>
// //           </form>
// //         </Box>
// //       </Base>
// //     </div>
// //   );
// // };

// // export default Bulkupload;













// // import React, { useState } from "react";
// // import Base from "../../components/Base";
// // import {
// //   Box,
// //   Button,
// //   FormControl,
// //   Icon,
// //   Input,
// //   useToast,
// //   Heading,
// // } from "@chakra-ui/react";
// // import { Tag, TagLabel, TagCloseButton } from "@chakra-ui/react";
// // import { InboxOutlined } from "@ant-design/icons";
// // import { AiOutlineCloudUpload } from "react-icons/ai";
// // import { uploadExcelApi } from "../../api/uploadExcel/uploadExcel";
// // import { uploadCSVApi } from "../../api/uploadCSV/uploadCSV"; // Import CSV upload API function

// // const Bulkupload = () => {
// //   const toast = useToast();
// //   const [file, setFile] = useState(null); // State for CSV file
// //   const [excelFile, setExcelFile] = useState([]); // State for Excel files
// //   const [buttonLoading, setButtonLoading] = useState(false);

// //   // Event handler for CSV file upload
// //   const handleCSVUpload = (event) => {
// //     setFile(event.target.files[0]);
// //   };

// //   const handleSubmit = (e) => {
// //     e.preventDefault();
// //     const formData = new FormData();

// //     // Check if CSV file is selected
// //     if (file) {
// //       formData.append('csv', file); // Append CSV file to FormData
// //     } else {
// //       // If no CSV file is selected, append Excel files
// //       excelFile.forEach((item) => {
// //         formData.append(`vivek`, item[1]);
// //       });
// //     }

// //     // Choose API function based on file type
// //     const uploadApi = file ? uploadCSVApi : uploadExcelApi;

// //     // Call respective API function
// //     uploadApi(formData)
// //       .then((res) => {
// //         if (res.success) {
// //           setButtonLoading(false);
// //           toast({
// //             title: "File Uploded.",
// //             description: res.message,
// //             status: "success",
// //             duration: 9000,
// //             isClosable: true,
// //             position: "top-right",
// //           });
// //         } else {
// //           setButtonLoading(false);
// //           toast({
// //             title: "Operation failed!",
// //             description: res.message,
// //             status: "error",
// //             duration: 9000,
// //             isClosable: true,
// //             position: "top-right",
// //           });
// //         }
// //       })
// //       .catch((error) => {
// //         toast({
// //           title: "Error",
// //           description: "Operation Failed!",
// //           status: "error",
// //           duration: 9000,
// //           isClosable: true,
// //           position: "top-right",
// //         });

// //         console.error(error);
// //       });
// //   };

// //   const handleVideoUpload = (event) => {
// //     setExcelFile(Object.entries(event.target.files));
// //   };

// //   const removeVideo = (index) => {
// //     let temp = [...excelFile];
// //     temp.splice(index, 1);
// //     setExcelFile(temp || []);
// //   };

// //   return (
// //     <div>
// //       <Base>
// //         <Box>
// //           <Box>
// //             <Heading>Upload File(s)</Heading>
// //           </Box>
// //           <form onSubmit={handleSubmit} encType="multipart/form-data">
// //             <FormControl>
// //               {/* CSV file input field */}
// //               <label htmlFor="csvFormId">
// //                 <Box
// //                   padding={1}
// //                   display={"flex"}
// //                   justifyItems={"center"}
// //                   borderRadius={6}
// //                   alignItems={"center"}
// //                   marginBottom={4}
// //                   justifyContent={"center"}
// //                 >
// //                   <Input
// //                     type="file"
// //                     accept=".csv"
// //                     onChange={handleCSVUpload}
// //                     placeholder="0 file selected"
// //                     required
// //                     name="csv"
// //                     id="csvFormId"
// //                     marginLeft={2}
// //                     hidden
// //                     disabled={buttonLoading}
// //                   />

// //                   <Box
// //                     border="2px dashed #ccc"
// //                     textAlign="center"
// //                     padding="10"
// //                     borderRadius="md"
// //                     marginBottom="4"
// //                     cursor="pointer"
// //                     onDrop={(e) => {
// //                       e.preventDefault();
// //                       e.stopPropagation();
// //                       handleCSVUpload(e);
// //                     }}
// //                     onDragOver={(e) => {
// //                       e.preventDefault();
// //                       e.stopPropagation();
// //                     }}
// //                   >
// //                     <InboxOutlined
// //                       style={{ fontSize: "36px", color: "#ccc" }}
// //                     />
// //                     <p style={{ fontSize: "17px" }}>
// //                       {file ? (
// //                         <span style={{ color: "green" }}>
// //                           Click on Upload button to upload selected file
// //                         </span>
// //                       ) : (
// //                         <span style={{ color: "blue" }}>
// //                           Click here to select your CSV file{" "}
// //                         </span>
// //                       )}
// //                     </p>
// //                   </Box>
// //                 </Box>
// //               </label>
// //               {/* Excel file input field */}
// //               <label htmlFor="excelFormId">
// //                 <Box
// //                   padding={1}
// //                   display={"flex"}
// //                   justifyItems={"center"}
// //                   borderRadius={6}
// //                   alignItems={"center"}
// //                   marginBottom={4}
// //                   justifyContent={"center"}
// //                 >
// //                   {/* <Input
// //                     type="file"
// //                     accept=".xlsx,.xls"
// //                     onChange={handleVideoUpload}
// //                     placeholder="0 file selected"
// //                     required
// //                     name="excel"
// //                     id="excelFormId"
// //                     marginLeft={2}
// //                     hidden
// //                     disabled={buttonLoading}
// //                   /> */}

// //                   <Box
// //                     border="2px dashed #ccc"
// //                     textAlign="center"
// //                     padding="10"
// //                     borderRadius="md"
// //                     marginBottom="4"
// //                     cursor="pointer"
// //                     onDrop={(e) => {
// //                       e.preventDefault();
// //                       e.stopPropagation();
// //                       handleVideoUpload(e);
// //                     }}
// //                     onDragOver={(e) => {
// //                       e.preventDefault();
// //                       e.stopPropagation();
// //                     }}
// //                   >
// //                     <InboxOutlined
// //                       style={{ fontSize: "36px", color: "#ccc" }}
// //                     />
// //                     <p style={{ fontSize: "17px" }}>
// //                       {excelFile.length === 0 ? (
// //                         <span style={{ color: "blue" }}>
// //                           Click here to select your Excel file{" "}
// //                         </span>
// //                       ) : (
// //                         <span style={{ color: "green" }}>
// //                           Click on Upload button to upload selected file
// //                         </span>
// //                       )}
// //                     </p>
// //                   </Box>
// //                 </Box>
// //               </label>
// //               {/* Render selected Excel files as tags */}
// //               <div
// //                 style={{
// //                   display: "flex",
// //                   justifyContent: "center",
// //                   padding: 5,
// //                 }}
// //               >
// //                 {excelFile &&
// //                   excelFile.map((item, index) => {
// //                     return (
// //                       <Tag
// //                         size={"sm"}
// //                         key={index}
// //                         borderRadius="full"
// //                         variant="solid"
// //                         colorScheme="green"
// //                         mr={2}
// //                         mt={2}
// //                       >
// //                         <TagLabel>{item[1]?.name}</TagLabel>
// //                         {!buttonLoading && (
// //                           <TagCloseButton onClick={() => removeVideo(index)} />
// //                         )}
// //                       </Tag>
// //                     );
// //                   })}
// //               </div>
// //             </FormControl>
// //             <Box
// //               display={"flex"}
// //               justifyContent={"center"}
// //               alignItems={"center"}
// //             >
// //               <Button
// //                 w={"70%"}
// //                 variant={"solid"}
// //                 disabled={!file && excelFile.length === 0}
// //                 isLoading={buttonLoading}
// //                 loadingText="Upload"
// //                 type="submit"
// //                 leftIcon={<Icon as={AiOutlineCloudUpload} />}
// //                 bg={"primary.main"}
// //                 color={"text.light"}
// //                 mr={3}
// //               >
// //                 Upload
// //               </Button>
// //             </Box>
// //           </form>
// //         </Box>
// //       </Base>
// //     </div>
// //   );
// // };

// // export default Bulkupload;



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
import { uploadCSVApi } from "../../api/uploadCSVAPI/uploadCSV";
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

    uploadCSVApi(formData)
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


















