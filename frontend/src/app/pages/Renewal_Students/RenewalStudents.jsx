// import { NavLink } from 'react-router-dom';
// import React, { useState, useEffect } from "react";
// import { Table, Input, Button, Modal, Upload, message } from "antd";
// import { UploadOutlined } from "@ant-design/icons";
// import Base from "../../components/Base";
// import {
//   RenewalStudentApi, fetchRecordDetails,
//   incomeDocS3Renewal, feeReceiptS3Renewal, hostelCertS3Renewal, alpabudharakCertS3Renewal,
//   declarationCertS3Renewal, registeredLabourCertS3Renewal, studentPanCardS3Renewal, fatherPanCardS3Renewal,
//   fatherAadharCardS3Renewal, casteValidityS3Renewal
// } from "../../api/RenewalStudentsApi/RenewalStudentsApi";

// const { Search } = Input;

// const RenewalStudents = () => {
//   const [data, setData] = useState([]);
//   const [searchText, setSearchText] = useState("");
//   const [selectedRecord, setSelectedRecord] = useState(null);
//   const [isModalVisible, setIsModalVisible] = useState(false);
//   const [recordDetails, setRecordDetails] = useState(null);

//   const fetchData = async (query = "") => {
//     try {
//       const response = await RenewalStudentApi(query);
//       setData(response.data); // Adjust according to your API response structure
//     } catch (error) {
//       console.error("Error fetching data:", error);
//     }
//   };

//   useEffect(() => {
//     fetchData();
//   }, []);

//   const handleSearch = (value) => {
//     setSearchText(value);
//     fetchData(value);
//   };

//   const handleUploadDocuments = async (record) => {
//     setSelectedRecord(record);
//     try {
//       const response = await fetchRecordDetails(record.id); // Fetch record details from the database
//       setRecordDetails(response.data); // Adjust according to your API response structure
//       setIsModalVisible(true);
//     } catch (error) {
//       console.error("Error fetching record details:", error);
//     }
//   };

//   const handleModalOk = () => {
//     setIsModalVisible(false);
//     setSelectedRecord(null);
//     setRecordDetails(null);
//   };

//   const handleModalCancel = () => {
//     setIsModalVisible(false);
//     setSelectedRecord(null);
//     setRecordDetails(null);
//   };

//   const handleUpload = async ({ file, onSuccess, onError }, documentType) => {
//     const formData = new FormData();
//     formData.append('file', file);
//     formData.append('id', selectedRecord.id);

//     try {
//       let uploadFunction;
//       switch (documentType) {
//         case "income":
//           uploadFunction = incomeDocS3Renewal;
//           break;
//         case "fee":
//           uploadFunction = feeReceiptS3Renewal;
//           break;
//         case "hostel":
//           uploadFunction = hostelCertS3Renewal;
//           break;
//         case "alpabudharak":
//           uploadFunction = alpabudharakCertS3Renewal;
//           break;
//         case "declaration":
//           uploadFunction = declarationCertS3Renewal;
//           break;
//         case "registeredLabour":
//           uploadFunction = registeredLabourCertS3Renewal;
//           break;
//         case "studentPanCard":
//           uploadFunction = studentPanCardS3Renewal;
//           break;
//         case "fatherPanCard":
//           uploadFunction = fatherPanCardS3Renewal;
//           break;
//         case "fatherAadharCard":
//           uploadFunction = fatherAadharCardS3Renewal;
//           break;
//         case "casteValidity":
//           uploadFunction = casteValidityS3Renewal;
//           break;
//         default:
//           throw new Error("Unknown document type");
//       }

//       const response = await uploadFunction(formData);
//       if (response.success) {
//         message.success(`${file.name} file uploaded successfully.`);
//         onSuccess();
//         setIsModalVisible(false);
//         setSelectedRecord(null);
//         setRecordDetails(null);
//       } else {
//         message.error("Upload failed. Please try again.");
//         onError(new Error("Upload failed"));
//       }
//     } catch (error) {
//       message.error("Upload failed. Please try again.");
//       console.error("Error uploading file:", error);
//       onError(error);
//     }
//   };

//   const columns = [
//     {
//       title: "ID",
//       dataIndex: "id",
//       key: "id",
//     },
//     {
//       title: "Name",
//       dataIndex: "candidateName",
//       key: "candidateName",
//     },
//     {
//       title: "Gender",
//       dataIndex: "gender",
//       key: "gender",
//     },
//     {
//       title: 'Actions',
//       key: 'actions',
//       render: (_, record) => (
//         <>
//           <Button onClick={() => handleUploadDocuments(record)} style={{ marginRight: 10 }}>
//             Upload Documents
//           </Button>
//           <NavLink to={`/coworker/viewRenewalStudents/${record.id}`}>
//             <Button>View Renewal Students</Button>
//           </NavLink>
//         </>
//       ),
//     },
//   ];

//   return (
//     <Base>
//       <div style={{ padding: "20px" }}>
//         <Search
//           placeholder="Search students"
//           onSearch={handleSearch}
//           style={{ marginBottom: "20px" }}
//           enterButton
//         />
//         <Table
//           dataSource={data}
//           columns={columns}
//           rowKey="id"
//         />
//         <Modal
//           title="Upload Documents"
//           visible={isModalVisible}
//           onOk={handleModalOk}
//           onCancel={handleModalCancel}
//           width={600}
//           footer={[
//             <Button key="cancel" onClick={handleModalCancel}>
//               Cancel
//             </Button>
//           ]}
//         >
//           {selectedRecord && recordDetails ? (
//             <div>
//               <p><strong>ID:</strong> {selectedRecord.id}</p>
//               <p><strong>Name:</strong> {selectedRecord.candidateName}</p>
//               <div style={{ display: 'flex', alignItems: 'center', marginBottom: 10 }}>
//                 <Upload
//                   customRequest={(options) => handleUpload(options, "income")}
//                   showUploadList={false}
//                 >
//                   <Button icon={<UploadOutlined />}>Upload Income Document</Button>
//                 </Upload>
//                 {recordDetails.incomeDoc && (
//                   <Button
//                     style={{ marginLeft: 65 }}
//                     onClick={() => window.open(recordDetails.incomeDoc, "_blank")}
//                   >
//                     View Income Document
//                   </Button>
//                 )}
//               </div>
//               <div style={{ display: 'flex', alignItems: 'center', marginBottom: 10 }}>
//                 <Upload
//                   customRequest={(options) => handleUpload(options, "fee")}
//                   showUploadList={false}
//                 >
//                   <Button icon={<UploadOutlined />}>Upload Fee Receipt</Button>
//                 </Upload>
//                 {recordDetails.feeReceiptDoc && (
//                   <Button
//                     style={{ marginLeft: 110 }}
//                     onClick={() => window.open(recordDetails.feeReceiptDoc, "_blank")}
//                   >
//                     View Fee Receipt
//                   </Button>
//                 )}
//               </div>
//               <div style={{ display: 'flex', alignItems: 'center', marginBottom: 10 }}>
//                 <Upload
//                   customRequest={(options) => handleUpload(options, "hostel")}
//                   showUploadList={false}
//                 >
//                   <Button icon={<UploadOutlined />}>Upload Hostel Certificate</Button>
//                 </Upload>
//                 {recordDetails.hostelCertificate && (
//                   <Button
//                     style={{ marginLeft: 75 }}
//                     onClick={() => window.open(recordDetails.hostelCertificate, "_blank")}
//                   >
//                     View Hostel Certificate
//                   </Button>
//                 )}
//               </div>
//               <div style={{ display: 'flex', alignItems: 'center', marginBottom: 10 }}>
//                 <Upload
//                   customRequest={(options) => handleUpload(options, "alpabudharak")}
//                   showUploadList={false}
//                 >
//                   <Button icon={<UploadOutlined />}>Upload Alpabudharak Certificate</Button>
//                 </Upload>
//                 {recordDetails.alphabhudharakDoc && (
//                   <Button
//                     style={{ marginLeft: 30 }}
//                     onClick={() => window.open(recordDetails.alphabhudharakDoc, "_blank")}
//                   >
//                     View Alpabudharak Certificate
//                   </Button>
//                 )}
//               </div>
//               <div style={{ display: 'flex', alignItems: 'center', marginBottom: 10 }}>
//                 <Upload
//                   customRequest={(options) => handleUpload(options, "declaration")}
//                   showUploadList={false}
//                 >
//                   <Button icon={<UploadOutlined />}>Upload Declaration Certificate</Button>
//                 </Upload>
//                 {recordDetails.declarationCertDoc && (
//                   <Button
//                     style={{ marginLeft: 45 }}
//                     onClick={() => window.open(recordDetails.declarationCertDoc, "_blank")}
//                   >
//                     View Declaration Certificate
//                   </Button>
//                 )}
//               </div>
//               <div style={{ display: 'flex', alignItems: 'center', marginBottom: 10 }}>
//                 <Upload
//                   customRequest={(options) => handleUpload(options, "registeredLabour")}
//                   showUploadList={false}
//                 >
//                   <Button icon={<UploadOutlined />}>Upload Registered Labour Certificate</Button>
//                 </Upload>
//                 {recordDetails.labourDoc && (
//                   <Button
//                     style={{ marginLeft: 6 }}
//                     onClick={() => window.open(recordDetails.labourDoc, "_blank")}
//                   >
//                     View Registered Labour Certificate
//                   </Button>
//                 )}
//               </div>
//               <div style={{ display: 'flex', alignItems: 'center', marginBottom: 10 }}>
//                 <Upload
//                   customRequest={(options) => handleUpload(options, "studentPanCard")}
//                   showUploadList={false}
//                 >
//                   <Button icon={<UploadOutlined />}>Upload Student PAN Card</Button>
//                 </Upload>
//                 {recordDetails.studentPancardDoc && (
//                   <Button
//                     style={{ marginLeft: 75 }}
//                     onClick={() => window.open(recordDetails.studentPancardDoc, "_blank")}
//                   >
//                     View Student PAN Card
//                   </Button>
//                 )}
//               </div>
//               <div style={{ display: 'flex', alignItems: 'center', marginBottom: 10 }}>
//                 <Upload
//                   customRequest={(options) => handleUpload(options, "fatherPanCard")}
//                   showUploadList={false}
//                 >
//                   <Button icon={<UploadOutlined />}>Upload Father's PAN Card</Button>
//                 </Upload>
//                 {recordDetails.fatherPancardDoc && (
//                   <Button
//                     style={{ marginLeft: 52 }}
//                     onClick={() => window.open(recordDetails.fatherPancardDoc, "_blank")}
//                   >
//                     View Father's PAN Card
//                   </Button>
//                 )}
//               </div>
//               <div style={{ display: 'flex', alignItems: 'center', marginBottom: 10 }}>
//                 <Upload
//                   customRequest={(options) => handleUpload(options, "fatherAadharCard")}
//                   showUploadList={false}
//                 >
//                   <Button icon={<UploadOutlined />}>Upload Father's Aadhar Card</Button>
//                 </Upload>
//                 {recordDetails.fatherAadharcardDoc && (
//                   <Button
//                     style={{ marginLeft: 52 }}
//                     onClick={() => window.open(recordDetails.fatherAadharcardDoc, "_blank")}
//                   >
//                     View Father's Aadhar Card
//                   </Button>
//                 )}
//               </div>
//               <div style={{ display: 'flex', alignItems: 'center', marginBottom: 10 }}>
//                 <Upload
//                   customRequest={(options) => handleUpload(options, "casteValidity")}
//                   showUploadList={false}
//                 >
//                   <Button icon={<UploadOutlined />}>Upload Caste Validity</Button>
//                 </Upload>
//                 {recordDetails.casteValidityDoc && (
//                   <Button
//                     style={{ marginLeft: 52 }}
//                     onClick={() => window.open(recordDetails.casteValidityDoc, "_blank")}
//                   >
//                     View Caste Validity
//                   </Button>
//                 )}
//               </div>
//             </div>
//           ) : (
//             <p>Loading...</p>
//           )}
//         </Modal>
//       </div>
//     </Base>
//   );
// };

// export default RenewalStudents;


import { NavLink } from 'react-router-dom';
import { CheckCircleOutlined, CloseCircleOutlined } from "@ant-design/icons";
import React, { useState, useEffect } from "react";
import { Table, Input, Button, Modal, Upload, message } from "antd";
import { UploadOutlined } from "@ant-design/icons";
import Base from "../../components/Base";
import { useToast } from "@chakra-ui/react";
import {
  docValidApi, docInValidApi,
  getAllRenewalStudentsForPageLoad, getRenewalStudentsBySearch, RenewalStudentApi, fetchRecordDetails,
  incomeDocS3Renewal, feeReceiptS3Renewal, hostelCertS3Renewal, alpabudharakCertS3Renewal,
  declarationCertS3Renewal, registeredLabourCertS3Renewal, studentPanCardS3Renewal, fatherPanCardS3Renewal,
  fatherAadharCardS3Renewal, casteValidityS3Renewal, allotmentLetterS3Renewal, leavingCertS3Renewal,
  rationCardS3Renewal, previousYearMarksheetS3Renewal, gapCertS3Renewal
} from "../../api/RenewalStudentsApi/RenewalStudentsApi";

const { Search } = Input;

const RenewalStudents = () => {
  const toast = useToast();

  const [data, setData] = useState([]);
  const [searchText, setSearchText] = useState("");
  const [selectedRecord, setSelectedRecord] = useState(null);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [recordDetails, setRecordDetails] = useState(null);
  const [referid, setReferid] = useState(null);

  useEffect(() => {
    const userData = JSON.parse(localStorage.getItem('forstu'));
    if (userData && userData.user && userData.user.ref_code) {
      setReferid(userData.user.ref_code);
    }
  }, []);

  useEffect(() => {
    if (referid) {
      loadInitialData(referid);
    }
  }, [referid]);

  const loadInitialData = async (refId) => {
    try {
      const response = await getAllRenewalStudentsForPageLoad(refId);
      setData(response.data || []);
    } catch (error) {
      console.error("Error loading initial data:", error);
    }
  };

  const handleSearch = async (value) => {
    setSearchText(value);
    try {
      const response = await getRenewalStudentsBySearch(value, referid);
      setData(response.data || []);
    } catch (error) {
      console.error("Error performing search:", error);
    }
  };



  const handleUploadDocuments = async (record) => {
    setSelectedRecord(record);
    try {
      const response = await fetchRecordDetails(record.id);
      console.log("Record Details:", response.data);
      setRecordDetails(response.data);
      setIsModalVisible(true);
    } catch (error) {
      console.error("Error fetching record details:", error);
    }
  };


  const handleModalOk = () => {
    setIsModalVisible(false);
    setSelectedRecord(null);
    setRecordDetails(null);
  };

  const handleModalCancel = () => {
    setIsModalVisible(false);
    setSelectedRecord(null);
    setRecordDetails(null);
  };

  const handleUpload = async ({ file, onSuccess, onError }, documentType) => {
    const formData = new FormData();
    formData.append('file', file);
    formData.append('id', selectedRecord.id);

    try {
      let uploadFunction;
      switch (documentType) {
        case "income":
          uploadFunction = incomeDocS3Renewal;
          break;
        case "fee":
          uploadFunction = feeReceiptS3Renewal;
          break;
        case "hostel":
          uploadFunction = hostelCertS3Renewal;
          break;
        case "alpabudharak":
          uploadFunction = alpabudharakCertS3Renewal;
          break;
        case "declaration":
          uploadFunction = declarationCertS3Renewal;
          break;
        case "registeredLabour":
          uploadFunction = registeredLabourCertS3Renewal;
          break;
        case "studentPanCard":
          uploadFunction = studentPanCardS3Renewal;
          break;
        case "fatherPanCard":
          uploadFunction = fatherPanCardS3Renewal;
          break;
        case "fatherAadharCard":
          uploadFunction = fatherAadharCardS3Renewal;
          break;
        case "casteValidity":
          uploadFunction = casteValidityS3Renewal;
          break;
        case "allotmentLetter":
          uploadFunction = allotmentLetterS3Renewal;
          break;
        case "leavingCert":
          uploadFunction = leavingCertS3Renewal;
          break;
        case "rationCard":
          uploadFunction = rationCardS3Renewal;
          break;
        case "previousYearMarksheet":
          uploadFunction = previousYearMarksheetS3Renewal;
          break;
        case "gapCert":
          uploadFunction = gapCertS3Renewal;
          break;
        default:
          throw new Error("Unknown document type");
      }

      const response = await uploadFunction(formData);
      if (response.success) {
        message.success(`${file.name} file uploaded successfully.`);
        onSuccess();
        setIsModalVisible(false);
        setSelectedRecord(null);
        setRecordDetails(null);
      } else {
        message.error("Upload failed. Please try again.");
        onError(new Error("Upload failed"));
      }
    } catch (error) {
      message.error("Upload failed. Please try again.");
      console.error("Error uploading file:", error);
      onError(error);
    }
  };

  const columns = [
    {
      title: "ID",
      dataIndex: "id",
      key: "id",
    },
    {
      title: "Name",
      dataIndex: "candidateName",
      key: "candidateName",
    },
    {
      title: "Ref Code",
      dataIndex: "referenceId",
      key: "referenceId",
    },
    {
      title: 'Actions',
      key: 'actions',
      render: (_, record) => (
        <>
          <Button onClick={() => handleUploadDocuments(record)} style={{ marginRight: 10 }}>
            Upload Documents
          </Button>

          <NavLink to={`/coworker/viewRenewalStudents/${record.id}`}>
            <Button>View Renewal Students</Button>
          </NavLink>
        </>
      ),
    },
  ];

  // const handleValidDocument = async (documentType, recordDetails) => {
  //   console.log(`Marking ${documentType} as valid for record:`, recordDetails);
  //   // Add logic to mark the document as valid (e.g., make an API call)
  //   try {
  //     const response = await docValidApi(recordDetails.id, `${documentType}`); // Assuming `record.id` should be `recordDetails.id`
  //     console.log("Record Details:", response.data);
  //   } catch (error) {
  //     console.error("Error fetching record details:", error);
  //   }
  // };

  const handleValidDocument = async (documentType, recordDetails) => {
    console.log(`Marking ${documentType} as valid for record:`, recordDetails);

    try {
      const response = await docValidApi(recordDetails.id, `${documentType}`);

      if (response.success) {
        // Show success toast
        toast({
          title: "Valid Document!",
          description: `Document marked as valid for ${documentType}.`,
          status: "success",
          duration: 5000,
          isClosable: true,
          position: "top-right",
        });
        console.log("Document validation successful:", response.data);
      } else {
        // Show failure toast
        toast({
          title: "Failed!",
          description: `Could not validate document for ${documentType}.`,
          status: "error",
          duration: 5000,
          isClosable: true,
          position: "top-right",
        });
      }
    } catch (error) {
      console.error("Error validating document:", error);

      // Show error toast
      toast({
        title: "Error!",
        description: "There was an error processing the request.",
        status: "error",
        duration: 5000,
        isClosable: true,
        position: "top-right",
      });
    }
  };



  const handleInvalidDocument = async (documentType, recordDetails) => {
    console.log(`Marking ${documentType} as invalid for record:`, recordDetails);

    try {
      const response = await docInValidApi(recordDetails.id, `${documentType}`);

      if (response.success) {
        // Show success toast
        toast({
          title: "Invalid Document!",
          description: `Document marked as invalid for ${documentType}.`,
          status: "error",
          duration: 5000,
          isClosable: true,
          position: "top-right",
        });
        console.log("Document invalidation successful:", response.data);
      } else {
        // Show failure toast
        toast({
          title: "Failed!",
          description: `Could not mark document as invalid for ${documentType}.`,
          status: "error",
          duration: 5000,
          isClosable: true,
          position: "top-right",
        });
      }
    } catch (error) {
      console.error("Error marking document as invalid:", error);

      // Show error toast
      toast({
        title: "Error!",
        description: "There was an error processing the request.",
        status: "error",
        duration: 5000,
        isClosable: true,
        position: "top-right",
      });
    }
  };


  return (
    <Base>
      <div style={{ padding: "20px" }}>
        <Search
          placeholder="Search students"
          onSearch={handleSearch}
          style={{ marginBottom: "20px" }}
          enterButton
        />
        <Table
          dataSource={data}
          columns={columns}
          rowKey="id"
        />
        <Modal
          title="Upload Documents"
          visible={isModalVisible}
          onOk={handleModalOk}
          onCancel={handleModalCancel}
          width={1000}
          footer={[
            <Button key="back" onClick={handleModalCancel}>
              Cancel
            </Button>,
            <Button key="submit" type="primary" onClick={handleModalOk}>
              OK
            </Button>,
          ]}
        >
          {recordDetails && (
            <>

              <div style={{ display: 'flex', alignItems: 'center', marginBottom: 10 }}>
                <Upload
                  customRequest={(options) => handleUpload(options, "income")}
                  showUploadList={false}
                >
                  <Button icon={<UploadOutlined />}>Upload Income Document</Button>
                </Upload>
                {recordDetails.incomeDoc && (
                  <>
                    <Button
                      style={{ marginLeft: 70 }}
                      onClick={() => window.open(recordDetails.incomeDoc, "_blank")}
                    >
                      View Income Document
                    </Button>

                    <Button
                      style={{ marginLeft: 10 }}
                      onClick={() => handleValidDocument("is_Income_Valid", recordDetails)}
                    >
                      Valid Document
                    </Button>
                    <Button
                      style={{ marginLeft: 10 }}
                      onClick={() => handleInvalidDocument("is_Income_Valid", recordDetails)}
                    >
                      Invalid Document
                    </Button>

                    {/* Verified/Not Verified Icon */}
                    <span style={{ marginLeft: 10 }}>
                      {recordDetails.is_Income_Valid === "Valid" ? (
                        <CheckCircleOutlined style={{ color: "green" }} />
                      ) : (
                        <CloseCircleOutlined style={{ color: "red" }} />
                      )}
                    </span>
                  </>
                )}
              </div>

              <div style={{ display: 'flex', alignItems: 'center', marginBottom: 10 }}>
                <Upload
                  customRequest={(options) => handleUpload(options, "fee")}
                  showUploadList={false}
                >
                  <Button icon={<UploadOutlined />}>Upload Fee Receipt</Button>
                </Upload>
                {recordDetails.feeReceiptDoc && (
                  <Button
                    style={{ marginLeft: 112 }}
                    onClick={() => window.open(recordDetails.feeReceiptDoc, "_blank")}
                  >
                    View Fee Receipt
                  </Button>

                )}
                <Button
                  style={{ marginLeft: 10 }}
                  onClick={() => handleValidDocument("is_FeeReceipt_Valid", recordDetails)}
                >
                  Valid Document
                </Button>
                <Button
                  style={{ marginLeft: 10 }}
                  onClick={() => handleInvalidDocument("is_FeeReceipt_Valid", recordDetails)}
                >
                  Invalid Document
                </Button>
                <span style={{ marginLeft: 10 }}>
                  {recordDetails.is_FeeReceipt_Valid === "Valid" ? (
                    <CheckCircleOutlined style={{ color: "green" }} />
                  ) : (
                    <CloseCircleOutlined style={{ color: "red" }} />
                  )}
                </span>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', marginBottom: 10 }}>
                <Upload
                  customRequest={(options) => handleUpload(options, "hostel")}
                  showUploadList={false}
                >
                  <Button icon={<UploadOutlined />}>Upload Hostel Certificate</Button>
                </Upload>
                {recordDetails.hostelCertificate && (
                  <Button
                    style={{ marginLeft: 75 }}
                    onClick={() => window.open(recordDetails.hostelCertificate, "_blank")}
                  >
                    View Hostel Certificate
                  </Button>
                )}
                <Button
                  style={{ marginLeft: 10 }}
                  onClick={() => handleValidDocument("is_HostelCert_Valid", recordDetails)}
                >
                  Valid Document
                </Button>
                <Button
                  style={{ marginLeft: 10 }}
                  onClick={() => handleInvalidDocument("is_HostelCert_Valid", recordDetails)}
                >
                  Invalid Document
                </Button>
                <span style={{ marginLeft: 10 }}>
                  {recordDetails.is_HostelCert_Valid === "Valid" ? (
                    <CheckCircleOutlined style={{ color: "green" }} />
                  ) : (
                    <CloseCircleOutlined style={{ color: "red" }} />
                  )}
                </span>
              </div>


              <div style={{ display: 'flex', alignItems: 'center', marginBottom: 10 }}>
                <Upload
                  customRequest={(options) => handleUpload(options, "alpabudharak")}
                  showUploadList={false}
                >
                  <Button icon={<UploadOutlined />}>Upload Alpa Budharak Certificate</Button>
                </Upload>
                {recordDetails.alphabhudharakDoc && (
                  <Button
                    style={{ marginLeft: 30 }}
                    onClick={() => window.open(recordDetails.alphabhudharakDoc, "_blank")}
                  >
                    View Alpa Budharak Certificate
                  </Button>
                )}
                <Button
                  style={{ marginLeft: 10 }}
                  onClick={() => handleValidDocument("is_Alpabhudarak_Valid", recordDetails)}
                >
                  Valid Document
                </Button>
                <Button
                  style={{ marginLeft: 10 }}
                  onClick={() => handleInvalidDocument("is_Alpabhudarak_Valid", recordDetails)}
                >
                  Invalid Document
                </Button>
                <span style={{ marginLeft: 10 }}>
                  {recordDetails.is_Alpabhudarak_Valid === "Valid" ? (
                    <CheckCircleOutlined style={{ color: "green" }} />
                  ) : (
                    <CloseCircleOutlined style={{ color: "red" }} />
                  )}
                </span>
              </div>


              <div style={{ display: 'flex', alignItems: 'center', marginBottom: 10 }}>
                <Upload
                  customRequest={(options) => handleUpload(options, "declaration")}
                  showUploadList={false}
                >
                  <Button icon={<UploadOutlined />}>Upload Declaration Certificate</Button>
                </Upload>
                {recordDetails.declarationCertDoc && (
                  <Button
                    style={{ marginLeft: 52 }}
                    onClick={() => window.open(recordDetails.declarationCertDoc, "_blank")}
                  >
                    View Declaration Certificate
                  </Button>
                )}
                <Button
                  style={{ marginLeft: 10 }}
                  onClick={() => handleValidDocument("is_DeclarationCert_Valid", recordDetails)}
                >
                  Valid Document
                </Button>
                <Button
                  style={{ marginLeft: 10 }}
                  onClick={() => handleInvalidDocument("is_DeclarationCert_Valid", recordDetails)}
                >
                  Invalid Document
                </Button>
                <span style={{ marginLeft: 10 }}>
                  {recordDetails.is_DeclarationCert_Valid === "Valid" ? (
                    <CheckCircleOutlined style={{ color: "green" }} />
                  ) : (
                    <CloseCircleOutlined style={{ color: "red" }} />
                  )}
                </span>
              </div>

              <div style={{ display: 'flex', alignItems: 'center', marginBottom: 10 }}>
                <Upload
                  customRequest={(options) => handleUpload(options, "registeredLabour")}
                  showUploadList={false}
                >
                  <Button icon={<UploadOutlined />}>Upload Labour Certificate</Button>
                </Upload>
                {recordDetails.labourDoc && (
                  <Button
                    style={{ marginLeft: 80 }}
                    onClick={() => window.open(recordDetails.labourDoc, "_blank")}
                  >
                    View Labour Certificate
                  </Button>
                )}
                <Button
                  style={{ marginLeft: 10 }}
                  onClick={() => handleValidDocument("is_LabourCert_Valid", recordDetails)}
                >
                  Valid Document
                </Button>
                <Button
                  style={{ marginLeft: 10 }}
                  onClick={() => handleInvalidDocument("is_LabourCert_Valid", recordDetails)}
                >
                  Invalid Document
                </Button>
                <span style={{ marginLeft: 10 }}>
                  {recordDetails.is_LabourCert_Valid === "Valid" ? (
                    <CheckCircleOutlined style={{ color: "green" }} />
                  ) : (
                    <CloseCircleOutlined style={{ color: "red" }} />
                  )}
                </span>
              </div>

              <div style={{ display: 'flex', alignItems: 'center', marginBottom: 10 }}>
                <Upload
                  customRequest={(options) => handleUpload(options, "studentPanCard")}
                  showUploadList={false}
                >
                  <Button icon={<UploadOutlined />}>Upload Student Pan Card</Button>
                </Upload>
                {recordDetails.studentPancardDoc && (
                  <Button
                    style={{ marginLeft: 80 }}
                    onClick={() => window.open(recordDetails.studentPancardDoc, "_blank")}
                  >
                    View Student Pan Card
                  </Button>
                )}
                <Button
                  style={{ marginLeft: 10 }}
                  onClick={() => handleValidDocument("is_StudentPan_Valid", recordDetails)}
                >
                  Valid Document
                </Button>
                <Button
                  style={{ marginLeft: 10 }}
                  onClick={() => handleInvalidDocument("is_StudentPan_Valid", recordDetails)}
                >
                  Invalid Document
                </Button>
                <span style={{ marginLeft: 10 }}>
                  {recordDetails.is_StudentPan_Valid === "Valid" ? (
                    <CheckCircleOutlined style={{ color: "green" }} />
                  ) : (
                    <CloseCircleOutlined style={{ color: "red" }} />
                  )}
                </span>
              </div>

              <div style={{ display: 'flex', alignItems: 'center', marginBottom: 10 }}>
                <Upload
                  customRequest={(options) => handleUpload(options, "fatherPanCard")}
                  showUploadList={false}
                >
                  <Button icon={<UploadOutlined />}>Upload Father Pan Card</Button>
                </Upload>
                {recordDetails.fatherPancardDoc && (
                  <Button
                    style={{ marginLeft: 90 }}
                    onClick={() => window.open(recordDetails.fatherPancardDoc, "_blank")}
                  >
                    View Father Pan Card
                  </Button>
                )}
                <Button
                  style={{ marginLeft: 10 }}
                  onClick={() => handleValidDocument("is_FatherPan_Valid", recordDetails)}
                >
                  Valid Document
                </Button>
                <Button
                  style={{ marginLeft: 10 }}
                  onClick={() => handleInvalidDocument("is_FatherPan_Valid", recordDetails)}
                >
                  Invalid Document
                </Button>
                <span style={{ marginLeft: 10 }}>
                  {recordDetails.is_FatherPan_Valid === "Valid" ? (
                    <CheckCircleOutlined style={{ color: "green" }} />
                  ) : (
                    <CloseCircleOutlined style={{ color: "red" }} />
                  )}
                </span>
              </div>

              <div style={{ display: 'flex', alignItems: 'center', marginBottom: 10 }}>
                <Upload
                  customRequest={(options) => handleUpload(options, "fatherAadharCard")}
                  showUploadList={false}
                >
                  <Button icon={<UploadOutlined />}>Upload Father Aadhar Card</Button>
                </Upload>
                {recordDetails.fatherAadharcardDoc && (
                  <Button
                    style={{ marginLeft: 70 }}
                    onClick={() => window.open(recordDetails.fatherAadharcardDoc, "_blank")}
                  >
                    View Father Aadhar Card
                  </Button>
                )}
                <Button
                  style={{ marginLeft: 10 }}
                  onClick={() => handleValidDocument("is_FatherAadhaar_Valid", recordDetails)}
                >
                  Valid Document
                </Button>
                <Button
                  style={{ marginLeft: 10 }}
                  onClick={() => handleInvalidDocument("is_FatherAadhaar_Valid", recordDetails)}
                >
                  Invalid Document
                </Button>
                <span style={{ marginLeft: 10 }}>
                  {recordDetails.is_FatherAadhaar_Valid === "Valid" ? (
                    <CheckCircleOutlined style={{ color: "green" }} />
                  ) : (
                    <CloseCircleOutlined style={{ color: "red" }} />
                  )}
                </span>
              </div>


              <div style={{ display: 'flex', alignItems: 'center', marginBottom: 10 }}>
                <Upload
                  customRequest={(options) => handleUpload(options, "casteValidity")}
                  showUploadList={false}
                >
                  <Button icon={<UploadOutlined />}>Upload Caste Validity Certificate</Button>
                </Upload>
                {recordDetails.casteValidityDoc && (
                  <Button
                    style={{ marginLeft: 40 }}
                    onClick={() => window.open(recordDetails.casteValidityDoc, "_blank")}
                  >
                    View Caste Validity Certificate
                  </Button>
                )}
                <Button
                  style={{ marginLeft: 10 }}
                  onClick={() => handleValidDocument("is_CasteValidity_Valid", recordDetails)}
                >
                  Valid Document
                </Button>
                <Button
                  style={{ marginLeft: 10 }}
                  onClick={() => handleInvalidDocument("is_CasteValidity_Valid", recordDetails)}
                >
                  Invalid Document
                </Button>
                <span style={{ marginLeft: 10 }}>
                  {recordDetails.is_CasteValidity_Valid === "Valid" ? (
                    <CheckCircleOutlined style={{ color: "green" }} />
                  ) : (
                    <CloseCircleOutlined style={{ color: "red" }} />
                  )}
                </span>
              </div>

              <div style={{ display: 'flex', alignItems: 'center', marginBottom: 10 }}>
                <Upload
                  customRequest={(options) => handleUpload(options, "allotmentLetter")}
                  showUploadList={false}
                >
                  <Button icon={<UploadOutlined />}>Upload Allotment Letter</Button>
                </Upload>
                {recordDetails.allotmentLetterDoc && (
                  <Button
                    style={{ marginLeft: 90 }}
                    onClick={() => window.open(recordDetails.allotmentLetterDoc, "_blank")}
                  >
                    View Allotment Letter
                  </Button>
                )}
                <Button
                  style={{ marginLeft: 10 }}
                  onClick={() => handleValidDocument("is_AllotmentCert_Valid", recordDetails)}
                >
                  Valid Document
                </Button>
                <Button
                  style={{ marginLeft: 10 }}
                  onClick={() => handleInvalidDocument("is_AllotmentCert_Valid", recordDetails)}
                >
                  Invalid Document
                </Button>
                <span style={{ marginLeft: 10 }}>
                  {recordDetails.is_AllotmentCert_Valid === "Valid" ? (
                    <CheckCircleOutlined style={{ color: "green" }} />
                  ) : (
                    <CloseCircleOutlined style={{ color: "red" }} />
                  )}
                </span>
              </div>

              <div style={{ display: 'flex', alignItems: 'center', marginBottom: 10 }}>
                <Upload
                  customRequest={(options) => handleUpload(options, "leavingCert")}
                  showUploadList={false}
                >
                  <Button icon={<UploadOutlined />}>Upload Leaving Certificate</Button>
                </Upload>
                {recordDetails.leavingCertDoc && (
                  <Button
                    style={{ marginLeft: 80 }}
                    onClick={() => window.open(recordDetails.leavingCertDoc, "_blank")}
                  >
                    View Leaving Certificate
                  </Button>
                )}
                <Button
                  style={{ marginLeft: 10 }}
                  onClick={() => handleValidDocument("is_LeavingCert_Valid", recordDetails)}
                >
                  Valid Document
                </Button>
                <Button
                  style={{ marginLeft: 10 }}
                  onClick={() => handleInvalidDocument("is_LeavingCert_Valid", recordDetails)}
                >
                  Invalid Document
                </Button>
                <span style={{ marginLeft: 10 }}>
                  {recordDetails.is_LeavingCert_Valid === "Valid" ? (
                    <CheckCircleOutlined style={{ color: "green" }} />
                  ) : (
                    <CloseCircleOutlined style={{ color: "red" }} />
                  )}
                </span>
              </div>

              <div style={{ display: 'flex', alignItems: 'center', marginBottom: 10 }}>
                <Upload
                  customRequest={(options) => handleUpload(options, "rationCard")}
                  showUploadList={false}
                >
                  <Button icon={<UploadOutlined />}>Upload Ration Card</Button>
                </Upload>
                {recordDetails.rationCardDoc && (
                  <Button
                    style={{ marginLeft: 120 }}
                    onClick={() => window.open(recordDetails.rationCardDoc, "_blank")}
                  >
                    View Ration Card
                  </Button>
                )}
                <Button
                  style={{ marginLeft: 10 }}
                  onClick={() => handleValidDocument("is_RationCard_Valid", recordDetails)}
                >
                  Valid Document
                </Button>
                <Button
                  style={{ marginLeft: 10 }}
                  onClick={() => handleInvalidDocument("is_RationCard_Valid", recordDetails)}
                >
                  Invalid Document
                </Button>
                <span style={{ marginLeft: 10 }}>
                  {recordDetails.is_RationCard_Valid === "Valid" ? (
                    <CheckCircleOutlined style={{ color: "green" }} />
                  ) : (
                    <CloseCircleOutlined style={{ color: "red" }} />
                  )}
                </span>
              </div>

              <div style={{ display: 'flex', alignItems: 'center', marginBottom: 10 }}>
                <Upload
                  customRequest={(options) => handleUpload(options, "previousYearMarksheet")}
                  showUploadList={false}
                >
                  <Button icon={<UploadOutlined />}>Upload Previous Year Marksheet</Button>
                </Upload>
                {recordDetails.previousYearMarksheetDoc && (
                  <Button
                    style={{ marginLeft: 52 }}
                    onClick={() => window.open(recordDetails.previousYearMarksheetDoc, "_blank")}
                  >
                    View Previous Year Marksheet
                  </Button>
                )}
                <Button
                  style={{ marginLeft: 10 }}
                  onClick={() => handleValidDocument("is_PreviousYearMarksheet_Valid", recordDetails)}
                >
                  Valid Document
                </Button>
                <Button
                  style={{ marginLeft: 10 }}
                  onClick={() => handleInvalidDocument("is_PreviousYearMarksheet_Valid", recordDetails)}
                >
                  Invalid Document
                </Button>
                <span style={{ marginLeft: 10 }}>
                  {recordDetails.is_PreviousYearMarksheet_Valid === "Valid" ? (
                    <CheckCircleOutlined style={{ color: "green" }} />
                  ) : (
                    <CloseCircleOutlined style={{ color: "red" }} />
                  )}
                </span>
              </div>

              <div style={{ display: 'flex', alignItems: 'center', marginBottom: 10 }}>
                <Upload
                  customRequest={(options) => handleUpload(options, "gapCert")}
                  showUploadList={false}
                >
                  <Button icon={<UploadOutlined />}>Upload GAP Certificate</Button>
                </Upload>
                {recordDetails.gapCertDoc && (
                  <Button
                    style={{ marginLeft: 100 }}
                    onClick={() => window.open(recordDetails.gapCertDoc, "_blank")}
                  >
                    View GAP Certificate
                  </Button>
                )}
                <Button
                  style={{ marginLeft: 10 }}
                  onClick={() => handleValidDocument("is_GapCert_Valid", recordDetails)}
                >
                  Valid Document
                </Button>
                <Button
                  style={{ marginLeft: 10 }}
                  onClick={() => handleInvalidDocument("is_GapCert_Valid", recordDetails)}
                >
                  Invalid Document
                </Button>
                <span style={{ marginLeft: 10 }}>
                  {recordDetails.is_GapCert_Valid === "Valid" ? (
                    <CheckCircleOutlined style={{ color: "green" }} />
                  ) : (
                    <CloseCircleOutlined style={{ color: "red" }} />
                  )}
                </span>
              </div>
            </>
          )}

        </Modal>
      </div>
    </Base>
  );
};

export default RenewalStudents;








