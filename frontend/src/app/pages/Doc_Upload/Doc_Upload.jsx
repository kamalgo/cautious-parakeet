import React, { useEffect, useState } from "react";
import { Table, Input, Button, Modal, Upload, message } from "antd";
import { UploadOutlined } from "@ant-design/icons";
import Base from "../../components/Base";
import {
  fetchstud,
  castecertS3,
  sendFeeReceiptToS3,
  sendHostelCertificateToS3,
  sendAlpabudharakCertificateToS3,
  sendLabourCertificateToS3,
  sendFamilyMemberBeneficiaryCertificateToS3,
  sendStudentPanCardToS3,
  sendFatherPanCardToS3,
  sendFatherAadhaarCardToS3,
  sendCasteValidityToS3,
  sendLeavingCertificateToS3,
  sendRationCardToS3,
  sendPreviousYearMarksheetToS3
} from "../../api/Doc_Upload/Doc_UploadApi";

const { Search } = Input;

function Doc_Upload() {
  const [dataSource, setDataSource] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedRecord, setSelectedRecord] = useState(null);
  const [isModalVisible, setIsModalVisible] = useState(false);

  useEffect(() => {
    const getData = async () => {
      try {
        const response = await fetchstud();
        if (response.success) {
          setDataSource(response.data);
          setFilteredData(response.data); // Initialize filteredData
        } else {
          console.error("Failed to fetch data");
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setLoading(false);
      }
    };

    getData();
  }, []);

  const handleSearch = (value) => {
    if (!value) {
      setFilteredData(dataSource);
      return;
    }

    const lowercasedValue = value.toLowerCase();
    const filtered = dataSource.filter((item) =>
      Object.values(item).some((val) =>
        String(val).toLowerCase().includes(lowercasedValue)
      )
    );
    setFilteredData(filtered);
  };

  const handleUploadDocuments = (record) => {
    setSelectedRecord(record);
    setIsModalVisible(true);
  };

  const handleModalOk = () => {
    setIsModalVisible(false);
    setSelectedRecord(null); // Clear selected record after closing the modal
  };

  const handleModalCancel = () => {
    setIsModalVisible(false);
    setSelectedRecord(null); // Clear selected record after closing the modal
  };

  const handleUpload = async ({ file, onSuccess, onError }, type) => {
    const formData = new FormData();
    formData.append(type, file);  // Use the type parameter to distinguish between different file uploads
    formData.append('id', selectedRecord.id);

    try {
      let response;
      if (type === 'video') {
        response = await castecertS3(formData);
      } else if (type === 'feereceipt') {
        response = await sendFeeReceiptToS3(formData);
      } else if (type === 'hostelcertificate') {
        response = await sendHostelCertificateToS3(formData);
      } else if (type === 'alpabudharakcertificate') {
        response = await sendAlpabudharakCertificateToS3(formData);
      } else if (type === 'labourcertificate') {
        response = await sendLabourCertificateToS3(formData);
      } else if (type === 'familymemberbeneficiarycertificate') {
        response = await sendFamilyMemberBeneficiaryCertificateToS3(formData);
      } else if (type === 'studentpancard') {
        response = await sendStudentPanCardToS3(formData);
      } else if (type === 'fatherpancard') {
        response = await sendFatherPanCardToS3(formData);
      } else if (type === 'fatheraadhaarcard') {
        response = await sendFatherAadhaarCardToS3(formData);
      } else if (type === 'castevalidity') {
        response = await sendCasteValidityToS3(formData);
      } else if (type === 'leavingcertificate') {
        response = await sendLeavingCertificateToS3(formData);
      } else if (type === 'rationcard') {
        response = await sendRationCardToS3(formData);
      } else if (type === 'previousyearmarksheet') {
        response = await sendPreviousYearMarksheetToS3(formData);
      }

      if (response.success) {
        message.success(`${file.name} file uploaded successfully.`);
        onSuccess();
        setIsModalVisible(false);
        setSelectedRecord(null); // Clear selected record after successful upload
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
      title: 'ID',
      dataIndex: 'id',
      key: 'id',
    },
    {
      title: 'Name',
      dataIndex: 'candidateName',
      key: 'candidateName',
    },
    {
      title: 'Aadhaar',
      dataIndex: 'aadhaar',
      key: 'aadhaar',
    },
    {
      title: 'Actions',
      key: 'actions',
      render: (_, record) => (
        <Button onClick={() => handleUploadDocuments(record)}>Upload Documents</Button>
      ),
    },
  ];

  return (
    <Base>
      <div>
        <h2>Upload Document Section</h2>
        <Search
          placeholder="Search..."
          onSearch={handleSearch}
          enterButton
          style={{ marginBottom: 20 }}
        />
        <Table
          dataSource={filteredData}
          columns={columns}
          loading={loading}
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
          {selectedRecord && (
            <div>
              <p><strong>ID:</strong> {selectedRecord.id}</p>
              <p><strong>Name:</strong> {selectedRecord.candidateName}</p>
              <div style={{ marginTop: 20 }}>
                <p><strong>Caste Certificate:</strong></p>
                <Upload
                  customRequest={(options) => handleUpload(options, 'video')}  // Use type 'castedocument'
                  showUploadList={false}
                >
                  <Button icon={<UploadOutlined />}>Upload Caste Certificate</Button>
                </Upload>
              </div>
              <div style={{ marginTop: 20 }}>
                <p><strong>Fee Receipt:</strong></p>
                <Upload
                  customRequest={(options) => handleUpload(options, 'feereceipt')}  // Use type 'feereceipt'
                  showUploadList={false}
                >
                  <Button icon={<UploadOutlined />}>Upload Fee Receipt</Button>
                </Upload>
              </div>
              <div style={{ marginTop: 20 }}>
                <p><strong>Hostel Certificate:</strong></p>
                <Upload
                  customRequest={(options) => handleUpload(options, 'hostelcertificate')}  // Use type 'hostelcertificate'
                  showUploadList={false}
                >
                  <Button icon={<UploadOutlined />}>Upload Hostel Certificate</Button>
                </Upload>
              </div>
              <div style={{ marginTop: 20 }}>
                <p><strong>Alpabudharak Certificate:</strong></p>
                <Upload
                  customRequest={(options) => handleUpload(options, 'alpabudharakcertificate')}  // Use type 'alpabudharakcertificate'
                  showUploadList={false}
                >
                  <Button icon={<UploadOutlined />}>Upload Alpabudharak Certificate</Button>
                </Upload>
              </div>
              <div style={{ marginTop: 20 }}>
                <p><strong>Registered Labour Certificate:</strong></p>
                <Upload
                  customRequest={(options) => handleUpload(options, 'labourcertificate')}  // Use type 'labourcertificate'
                  showUploadList={false}
                >
                  <Button icon={<UploadOutlined />}>Upload Registered Labour Certificate</Button>
                </Upload>
              </div>
              <div style={{ marginTop: 20 }}>
                <p><strong>Family Member Beneficiary Undertaking Certificate:</strong></p>
                <Upload
                  customRequest={(options) => handleUpload(options, 'familymemberbeneficiarycertificate')}  // Use type 'familymemberbeneficiarycertificate'
                  showUploadList={false}
                >
                  <Button icon={<UploadOutlined />}>Upload Family Member Beneficiary Undertaking Certificate</Button>
                </Upload>
              </div>
              <div style={{ marginTop: 20 }}>
                <p><strong>Student PAN Card:</strong></p>
                <Upload
                  customRequest={(options) => handleUpload(options, 'studentpancard')}  // Use type 'studentpancard'
                  showUploadList={false}
                >
                  <Button icon={<UploadOutlined />}>Upload Student PAN Card</Button>
                </Upload>
              </div>
              <div style={{ marginTop: 20 }}>
                <p><strong>Father's PAN Card:</strong></p>
                <Upload
                  customRequest={(options) => handleUpload(options, 'fatherpancard')}  // Use type 'fatherpancard'
                  showUploadList={false}
                >
                  <Button icon={<UploadOutlined />}>Upload Father's PAN Card</Button>
                </Upload>
              </div>
              <div style={{ marginTop: 20 }}>
                <p><strong>Father's Aadhaar Card:</strong></p>
                <Upload
                  customRequest={(options) => handleUpload(options, 'fatheraadhaarcard')}  // Use type 'fatheraadhaarcard'
                  showUploadList={false}
                >
                  <Button icon={<UploadOutlined />}>Upload Father's Aadhaar Card</Button>
                </Upload>
              </div>
              <div style={{ marginTop: 20 }}>
                <p><strong>Caste Validity Certificate:</strong></p>
                <Upload
                  customRequest={(options) => handleUpload(options, 'castevalidity')}  // Use type 'castevalidity'
                  showUploadList={false}
                >
                  <Button icon={<UploadOutlined />}>Upload Caste Validity Certificate</Button>
                </Upload>
              </div>
              <div style={{ marginTop: 20 }}>
                <p><strong>Leaving Certificate:</strong></p>
                <Upload
                  customRequest={(options) => handleUpload(options, 'leavingcertificate')}  // Use type 'leavingcertificate'
                  showUploadList={false}
                >
                  <Button icon={<UploadOutlined />}>Upload Leaving Certificate</Button>
                </Upload>
              </div>
              <div style={{ marginTop: 20 }}>
                <p><strong>Ration Card:</strong></p>
                <Upload
                  customRequest={(options) => handleUpload(options, 'rationcard')}  // Use type 'rationcard'
                  showUploadList={false}
                >
                  <Button icon={<UploadOutlined />}>Upload Ration Card</Button>
                </Upload>
              </div>
              <div style={{ marginTop: 20 }}>
                <p><strong>Previous Year Marksheet:</strong></p>
                <Upload
                  customRequest={(options) => handleUpload(options, 'previousyearmarksheet')}  // Use type 'previousyearmarksheet'
                  showUploadList={false}
                >
                  <Button icon={<UploadOutlined />}>Upload Previous Year Marksheet</Button>
                </Upload>
              </div>
            </div>
          )}
        </Modal>
      </div>
    </Base>
  );
}

export default Doc_Upload;
