
// import React, { useState, useEffect } from "react";
// import { Table, Input, Button, Modal, Upload, message } from "antd";
// import { UploadOutlined } from "@ant-design/icons";
// import Base from "../../components/Base";
// import { FreshStudentApi, castecertS3Fresh, fetchRecordDetails } from "../../api/FreshStudentApi/FreshStudentApi.js";

// const { Search } = Input;

// const FreshStudents = () => {
//   const [data, setData] = useState([]);
//   const [searchText, setSearchText] = useState("");
//   const [selectedRecord, setSelectedRecord] = useState(null);
//   const [isModalVisible, setIsModalVisible] = useState(false);
//   const [recordDetails, setRecordDetails] = useState(null);

//   const fetchData = async (query = "") => {
//     try {
//       const response = await FreshStudentApi(query);
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

//   const handleUpload = async ({ file, onSuccess, onError }) => {
//     const formData = new FormData();
//     formData.append('file', file);
//     formData.append('id', selectedRecord.id);

//     try {
//       const response = await castecertS3Fresh(formData);
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
//         <Button onClick={() => handleUploadDocuments(record)}>Upload Documents</Button>
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
//               <div style={{ marginTop: 20 }}>
//                 <Upload
//                   customRequest={(options) => handleUpload(options)}
//                   showUploadList={false}
//                 >
//                   <Button icon={<UploadOutlined />}>Upload Caste Certificate</Button>
//                 </Upload>
//                 {recordDetails.casteDoc && (
//                   <Button
//                     style={{ marginLeft: 10 }}
//                     onClick={() => window.open(recordDetails.casteDoc, "_blank")}
//                   >
//                     View Caste Certificate
//                   </Button>
//                 )}
//               </div>
//               {/* Add more sections for other document types as needed */}
//             </div>
//           ) : (
//             <p>No details available</p>
//           )}
//         </Modal>
//       </div>
//     </Base>
//   );
// };

// export default FreshStudents;



// import React, { useState, useEffect } from "react";
// import { Table, Input, Button, Modal, Upload, message } from "antd";
// import { UploadOutlined } from "@ant-design/icons";
// import Base from "../../components/Base";
// import { FreshStudentApi, castecertS3Fresh, fetchRecordDetails, incomeDocS3Fresh, feeReceiptS3Fresh, hostelCertS3Fresh, 
//   alpabudharakCertS3Fresh, declarationCertS3Fresh, registeredLabourCertS3Fresh, studentPanCardS3Fresh, fatherPanCardS3Fresh, 
//   fatherAadharCardS3Fresh, casteValidityS3Fresh } from "../../api/FreshStudentApi/FreshStudentApi.js";

// const { Search } = Input;

// const FreshStudents = () => {
//   const [data, setData] = useState([]);
//   const [searchText, setSearchText] = useState("");
//   const [selectedRecord, setSelectedRecord] = useState(null);
//   const [isModalVisible, setIsModalVisible] = useState(false);
//   const [recordDetails, setRecordDetails] = useState(null);

//   const fetchData = async (query = "") => {
//     try {
//       const response = await FreshStudentApi(query);
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
//         case "caste":
//           uploadFunction = castecertS3Fresh;
//           break;
//         case "income":
//           uploadFunction = incomeDocS3Fresh;
//           break;
//         case "fee":
//           uploadFunction = feeReceiptS3Fresh;
//           break;
//         case "hostel":
//           uploadFunction = hostelCertS3Fresh;
//           break;
//         case "alpabudharak":
//           uploadFunction = alpabudharakCertS3Fresh;
//           break;
//         case "declaration":
//           uploadFunction = declarationCertS3Fresh;
//           break;
//         case "registeredLabour":
//           uploadFunction = registeredLabourCertS3Fresh;
//           break;
//         case "studentPanCard":
//           uploadFunction = studentPanCardS3Fresh;
//           break;
//         case "fatherPanCard":
//           uploadFunction = fatherPanCardS3Fresh;
//           break;
//         case "fatherAadharCard":
//           uploadFunction = fatherAadharCardS3Fresh;
//           break;
//         case "casteValidity":
//           uploadFunction = casteValidityS3Fresh;
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
//         <Button onClick={() => handleUploadDocuments(record)}>Upload Documents</Button>

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
//               <div style={{ marginTop: 20 }}>
//                 <Upload
//                   customRequest={(options) => handleUpload(options, "caste")}
//                   showUploadList={false}
//                 >
//                   <Button icon={<UploadOutlined />}>Upload Caste Certificate</Button>
//                 </Upload>
//                 {recordDetails.casteDoc && (
//                   <Button
//                     style={{ marginLeft: 10 }}
//                     onClick={() => window.open(recordDetails.casteDoc, "_blank")}
//                   >
//                     View Caste Certificate
//                   </Button>
//                 )}
//               </div>
//               <div style={{ marginTop: 20 }}>
//                 <Upload
//                   customRequest={(options) => handleUpload(options, "income")}
//                   showUploadList={false}
//                 >
//                   <Button icon={<UploadOutlined />}>Upload Income Document</Button>
//                 </Upload>
//                 {recordDetails.incomeDoc && (
//                   <Button
//                     style={{ marginLeft: 10 }}
//                     onClick={() => window.open(recordDetails.incomeDoc, "_blank")}
//                   >
//                     View Income Document
//                   </Button>
//                 )}
//               </div>
//               <div style={{ marginTop: 20 }}>
//                 <Upload
//                   customRequest={(options) => handleUpload(options, "fee")}
//                   showUploadList={false}
//                 >
//                   <Button icon={<UploadOutlined />}>Upload Fee Receipt</Button>
//                 </Upload>
//                 {recordDetails.feeReceiptDoc && (
//                   <Button
//                     style={{ marginLeft: 10 }}
//                     onClick={() => window.open(recordDetails.feeReceiptDoc, "_blank")}
//                   >
//                     View Fee Receipt
//                   </Button>
//                 )}
//               </div>
//               <div style={{ marginTop: 20 }}>
//                 <Upload
//                   customRequest={(options) => handleUpload(options, "hostel")}
//                   showUploadList={false}
//                 >
//                   <Button icon={<UploadOutlined />}>Upload Hostel Certificate</Button>
//                 </Upload>
//                 {recordDetails.hostelDoc && (
//                   <Button
//                     style={{ marginLeft: 10 }}
//                     onClick={() => window.open(recordDetails.hostelDoc, "_blank")}
//                   >
//                     View Hostel Certificate
//                   </Button>
//                 )}
//               </div>
//               <div style={{ marginTop: 20 }}>
//                 <Upload
//                   customRequest={(options) => handleUpload(options, "alpabudharak")}
//                   showUploadList={false}
//                 >
//                   <Button icon={<UploadOutlined />}>Upload Alpabudharak Certificate</Button>
//                 </Upload>
//                 {recordDetails.alpabhudharakDoc && (
//                   <Button
//                     style={{ marginLeft: 10 }}
//                     onClick={() => window.open(recordDetails.alpabhudharakDoc, "_blank")}
//                   >
//                     View Alpabudharak Certificate
//                   </Button>
//                 )}
//               </div>
//               <div style={{ marginTop: 20 }}>
//                 <Upload
//                   customRequest={(options) => handleUpload(options, "declaration")}
//                   showUploadList={false}
//                 >
//                   <Button icon={<UploadOutlined />}>Upload Declaration Certificate</Button>
//                 </Upload>
//                 {recordDetails.declarationCertificateDoc && (
//                   <Button
//                     style={{ marginLeft: 10 }}
//                     onClick={() => window.open(recordDetails.declarationCertificateDoc, "_blank")}
//                   >
//                     View Declaration Certificate
//                   </Button>
//                 )}
//               </div>
//               <div style={{ marginTop: 20 }}>
//                 <Upload
//                   customRequest={(options) => handleUpload(options, "registeredLabour")}
//                   showUploadList={false}
//                 >
//                   <Button icon={<UploadOutlined />}>Upload Registered Labour Certificate</Button>
//                 </Upload>
//                 {recordDetails.labourDoc && (
//                   <Button
//                     style={{ marginLeft: 10 }}
//                     onClick={() => window.open(recordDetails.labourDoc, "_blank")}
//                   >
//                     View Registered Labour Certificate
//                   </Button>
//                 )}
//               </div>
//               <div style={{ marginTop: 20 }}>
//                 <Upload
//                   customRequest={(options) => handleUpload(options, "studentPanCard")}
//                   showUploadList={false}
//                 >
//                   <Button icon={<UploadOutlined />}>Upload Student PAN Card</Button>
//                 </Upload>
//                 {recordDetails.studentPanCard && (
//                   <Button
//                     style={{ marginLeft: 10 }}
//                     onClick={() => window.open(recordDetails.studentPanCard, "_blank")}
//                   >
//                     View Student PAN Card
//                   </Button>
//                 )}
//               </div>
//               <div style={{ marginTop: 20 }}>
//                 <Upload
//                   customRequest={(options) => handleUpload(options, "fatherPanCard")}
//                   showUploadList={false}
//                 >
//                   <Button icon={<UploadOutlined />}>Upload Father PAN Card</Button>
//                 </Upload>
//                 {recordDetails.fatherPanCard && (
//                   <Button
//                     style={{ marginLeft: 10 }}
//                     onClick={() => window.open(recordDetails.fatherPanCard, "_blank")}
//                   >
//                     View Father PAN Card
//                   </Button>
//                 )}
//               </div>
//               <div style={{ marginTop: 20 }}>
//                 <Upload
//                   customRequest={(options) => handleUpload(options, "fatherAadharCard")}
//                   showUploadList={false}
//                 >
//                   <Button icon={<UploadOutlined />}>Upload Father Aadhar Card</Button>
//                 </Upload>
//                 {recordDetails.fatherAadhaarCard && (
//                   <Button
//                     style={{ marginLeft: 10 }}
//                     onClick={() => window.open(recordDetails.fatherAadhaarCard, "_blank")}
//                   >
//                     View Father Aadhar Card
//                   </Button>
//                 )}
//               </div>
//               <div style={{ marginTop: 20 }}>
//                 <Upload
//                   customRequest={(options) => handleUpload(options, "casteValidity")}
//                   showUploadList={false}
//                 >
//                   <Button icon={<UploadOutlined />}>Upload Caste Validity Certificate</Button>
//                 </Upload>
//                 {recordDetails.casteValidityDoc && (
//                   <Button
//                     style={{ marginLeft: 10 }}
//                     onClick={() => window.open(recordDetails.casteValidityDoc, "_blank")}
//                   >
//                     View Caste Validity Certificate
//                   </Button>
//                 )}
//               </div>
//             </div>
//           ) : (
//             <p>No details available</p>
//           )}
//         </Modal>
//       </div>
//     </Base>
//   );
// };

// export default FreshStudents;
  
import { NavLink } from 'react-router-dom';
import React, { useState, useEffect } from "react";
import { Table, Input, Button, Modal, Upload, message } from "antd";
import { UploadOutlined } from "@ant-design/icons";
import Base from "../../components/Base";
import {
  FreshStudentApi, castecertS3Fresh, fetchRecordDetails, incomeDocS3Fresh, feeReceiptS3Fresh, hostelCertS3Fresh, 
  alpabudharakCertS3Fresh, declarationCertS3Fresh, registeredLabourCertS3Fresh, studentPanCardS3Fresh, fatherPanCardS3Fresh, 
  fatherAadharCardS3Fresh, casteValidityS3Fresh
} from "../../api/FreshStudentApi/FreshStudentApi.js";

import viewFreshStudents from "./FreshStudentsComponents/viewFreshStudents.jsx";

const { Search } = Input;

const FreshStudents = () => {
  const [data, setData] = useState([]);
  const [searchText, setSearchText] = useState("");
  const [selectedRecord, setSelectedRecord] = useState(null);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [recordDetails, setRecordDetails] = useState(null);

  const fetchData = async (query = "") => {
    try {
      const response = await FreshStudentApi(query);
      setData(response.data); // Adjust according to your API response structure
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleSearch = (value) => {
    setSearchText(value);
    fetchData(value);
  };

  const handleUploadDocuments = async (record) => {
    setSelectedRecord(record);
    try {
      const response = await fetchRecordDetails(record.id); // Fetch record details from the database
      setRecordDetails(response.data); // Adjust according to your API response structure
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
        case "caste":
          uploadFunction = castecertS3Fresh;
          break;
        case "income":
          uploadFunction = incomeDocS3Fresh;
          break;
        case "fee":
          uploadFunction = feeReceiptS3Fresh;
          break;
        case "hostel":
          uploadFunction = hostelCertS3Fresh;
          break;
        case "alpabudharak":
          uploadFunction = alpabudharakCertS3Fresh;
          break;
        case "declaration":
          uploadFunction = declarationCertS3Fresh;
          break;
        case "registeredLabour":
          uploadFunction = registeredLabourCertS3Fresh;
          break;
        case "studentPanCard":
          uploadFunction = studentPanCardS3Fresh;
          break;
        case "fatherPanCard":
          uploadFunction = fatherPanCardS3Fresh;
          break;
        case "fatherAadharCard":
          uploadFunction = fatherAadharCardS3Fresh;
          break;
        case "casteValidity":
          uploadFunction = casteValidityS3Fresh;
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
      title: "Gender",
      dataIndex: "gender",
      key: "gender",
    },
    {
      title: 'Actions',
      key: 'actions',
      render: (_, record) => (
        <>
          <Button onClick={() => handleUploadDocuments(record)} style={{ marginRight: 10 }}>
            Upload Documents
          </Button>
          <NavLink to={`/coworker/viewFreshStudents/${record.id}`}>
          <Button>View Fresh Students</Button>
          </NavLink>
        </>
      ),
    },
  ];

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
          footer={[
            <Button key="cancel" onClick={handleModalCancel}>
              Cancel
            </Button>
          ]}
        >
          {selectedRecord && recordDetails ? (
            <div>
              <p><strong>ID:</strong> {selectedRecord.id}</p>
              <p><strong>Name:</strong> {selectedRecord.candidateName}</p>
              <div style={{ marginTop: 20 }}>
                <Upload
                  customRequest={(options) => handleUpload(options, "caste")}
                  showUploadList={false}
                >
                  <Button icon={<UploadOutlined />}>Upload Caste Certificate</Button>
                </Upload>
                {recordDetails.casteDoc && (
                  <Button
                    style={{ marginLeft: 10 }}
                    onClick={() => window.open(recordDetails.casteDoc, "_blank")}
                  >
                    View Caste Certificate
                  </Button>
                )}
              </div>
              <div style={{ marginTop: 20 }}>
                <Upload
                  customRequest={(options) => handleUpload(options, "income")}
                  showUploadList={false}
                >
                  <Button icon={<UploadOutlined />}>Upload Income Document</Button>
                </Upload>
                {recordDetails.incomeDoc && (
                  <Button
                    style={{ marginLeft: 10 }}
                    onClick={() => window.open(recordDetails.incomeDoc, "_blank")}
                  >
                    View Income Document
                  </Button>
                )}
              </div>
              <div style={{ marginTop: 20 }}>
                <Upload
                  customRequest={(options) => handleUpload(options, "fee")}
                  showUploadList={false}
                >
                  <Button icon={<UploadOutlined />}>Upload Fee Receipt</Button>
                </Upload>
                {recordDetails.feeReceiptDoc && (
                  <Button
                    style={{ marginLeft: 10 }}
                    onClick={() => window.open(recordDetails.feeReceiptDoc, "_blank")}
                  >
                    View Fee Receipt
                  </Button>
                )}
              </div>
              <div style={{ marginTop: 20 }}>
                <Upload
                  customRequest={(options) => handleUpload(options, "hostel")}
                  showUploadList={false}
                >
                  <Button icon={<UploadOutlined />}>Upload Hostel Certificate</Button>
                </Upload>
                {recordDetails.hostelDoc && (
                  <Button
                    style={{ marginLeft: 10 }}
                    onClick={() => window.open(recordDetails.hostelDoc, "_blank")}
                  >
                    View Hostel Certificate
                  </Button>
                )}
              </div>
              <div style={{ marginTop: 20 }}>
                <Upload
                  customRequest={(options) => handleUpload(options, "alpabudharak")}
                  showUploadList={false}
                >
                  <Button icon={<UploadOutlined />}>Upload Alpabudharak Certificate</Button>
                </Upload>
                {recordDetails.alpabhudharakDoc && (
                  <Button
                    style={{ marginLeft: 10 }}
                    onClick={() => window.open(recordDetails.alpabhudharakDoc, "_blank")}
                  >
                    View Alpabudharak Certificate
                  </Button>
                )}
              </div>
              <div style={{ marginTop: 20 }}>
                <Upload
                  customRequest={(options) => handleUpload(options, "declaration")}
                  showUploadList={false}
                >
                  <Button icon={<UploadOutlined />}>Upload Declaration Certificate</Button>
                </Upload>
                {recordDetails.declarationCertificateDoc && (
                  <Button
                    style={{ marginLeft: 10 }}
                    onClick={() => window.open(recordDetails.declarationCertificateDoc, "_blank")}
                  >
                    View Declaration Certificate
                  </Button>
                )}
              </div>
              <div style={{ marginTop: 20 }}>
                <Upload
                  customRequest={(options) => handleUpload(options, "registeredLabour")}
                  showUploadList={false}
                >
                  <Button icon={<UploadOutlined />}>Upload Registered Labour Certificate</Button>
                </Upload>
                {recordDetails.registeredLabourCertificateDoc && (
                  <Button
                    style={{ marginLeft: 10 }}
                    onClick={() => window.open(recordDetails.registeredLabourCertificateDoc, "_blank")}
                  >
                    View Registered Labour Certificate
                  </Button>
                )}
              </div>
              <div style={{ marginTop: 20 }}>
                <Upload
                  customRequest={(options) => handleUpload(options, "studentPanCard")}
                  showUploadList={false}
                >
                  <Button icon={<UploadOutlined />}>Upload Student Pan Card</Button>
                </Upload>
                {recordDetails.studentPanCardDoc && (
                  <Button
                    style={{ marginLeft: 10 }}
                    onClick={() => window.open(recordDetails.studentPanCardDoc, "_blank")}
                  >
                    View Student Pan Card
                  </Button>
                )}
              </div>
              <div style={{ marginTop: 20 }}>
                <Upload
                  customRequest={(options) => handleUpload(options, "fatherPanCard")}
                  showUploadList={false}
                >
                  <Button icon={<UploadOutlined />}>Upload Father Pan Card</Button>
                </Upload>
                {recordDetails.fatherPanCardDoc && (
                  <Button
                    style={{ marginLeft: 10 }}
                    onClick={() => window.open(recordDetails.fatherPanCardDoc, "_blank")}
                  >
                    View Father Pan Card
                  </Button>
                )}
              </div>
              <div style={{ marginTop: 20 }}>
                <Upload
                  customRequest={(options) => handleUpload(options, "fatherAadharCard")}
                  showUploadList={false}
                >
                  <Button icon={<UploadOutlined />}>Upload Father Aadhar Card</Button>
                </Upload>
                {recordDetails.fatherAadharCardDoc && (
                  <Button
                    style={{ marginLeft: 10 }}
                    onClick={() => window.open(recordDetails.fatherAadharCardDoc, "_blank")}
                  >
                    View Father Aadhar Card
                  </Button>
                )}
              </div>
              <div style={{ marginTop: 20 }}>
                <Upload
                  customRequest={(options) => handleUpload(options, "casteValidity")}
                  showUploadList={false}
                >
                  <Button icon={<UploadOutlined />}>Upload Caste Validity</Button>
                </Upload>
                {recordDetails.casteValidityDoc && (
                  <Button
                    style={{ marginLeft: 10 }}
                    onClick={() => window.open(recordDetails.casteValidityDoc, "_blank")}
                  >
                    View Caste Validity
                  </Button>
                )}
              </div>
            </div>
          ) : (
            <p>Loading...</p>
          )}
        </Modal>
      </div>
    </Base>
  );
};

export default FreshStudents;




