
// import { useEffect, useState } from "react";
// import ScanbotSDK from "scanbot-web-sdk/ui";
// import axios from "axios";

// const ScanbotScanner = () => {
//   const [previewUrl, setPreviewUrl] = useState(null);
//   const [uploadStatus, setUploadStatus] = useState("");

//   useEffect(() => {

//     const init = async () => {
//       try {
//         await ScanbotSDK.initialize({
//           licenseKey:
// "Kkx916wthTWs475O+e4b1Acv15njNd" +
// "GH7GUbW3g+CpcNPO6cDjOl1d70nxF0" +
// "2sj1YPlyn/CydD5hPSW3giQu7awjxX" +
// "4WOblZa0JCXKuIWkhLFOBxtkW00TCs" +
// "k92nipxu9Wu9CfGyfhz7PIn0qBVtK9" +
// "WkBxO6rvfZ/lIchFN9YchuDvYD5X/y" +
// "rGPe7A6yuTvX1Kw2kL8MIlqURiL/Ut" +
// "OMY+gegg/fwOW7KPtYxsV0GvWV6Zvo" +
// "50EyhjnzGo/mzTu5I9BJgSnKzPjLq9" +
// "utn+dVoW2e0LTLeYQxel8dNzRyi09U" +
// "y+r5aidR4aDoe/iI190UNpicfgFtYC" +
// "LSVS/2BiUyHQ==\nU2NhbmJvdFNESw" +
// "psb2NhbGhvc3R8Ym90LmZvcnN0dS5j" +
// "bwoxNzUxNTg3MTk5CjgzODg2MDcKOA" +
// "==\n",
//           enginePath: "/wasm/",
//         });

//         await runDocumentScanner();
//       } catch (error) {
//         console.error("❌ Initialization failed:", error);
//         alert("Failed to initialize the scanner.");
//       }
//     };

//     init();
//   }, []);

//   const runDocumentScanner = async () => {
//     const config = new ScanbotSDK.UI.Config.DocumentScanningFlow();

//     try {
//       const result = await ScanbotSDK.UI.createDocumentScanner(config);

//       console.log("📸 Scanner Result:", result);

//       const scannedPage = result?.document?._pages?.[0];

//       if (!scannedPage) {
//         alert("No valid page found. Please scan again.");
//         return;
//       }

//       const scannedImageUrl = await scannedPage.finalImageUrl();

//       if (!scannedImageUrl) {
//         alert("Scanned document has no image.");
//         return;
//       }

//       const response = await fetch(scannedImageUrl);
//       const blob = await response.blob();

//       const fileName = `scanned-${Date.now()}.jpg`;
//       const file = new File([blob], fileName, { type: blob.type });

//       setPreviewUrl(URL.createObjectURL(file));

//       // Now upload it
//       await uploadToS3(file, fileName);

//     } catch (error) {
//       console.error("❌ Scanner error:", error);
//       alert("Error during scanning. Please allow camera access.");
//     }
//   };

//   const uploadToS3 = async (file, fileName) => {
//     try {
//       setUploadStatus("🔄 Generating upload URL...");

//       const contentType = file.type;
//       const id = "user-id-123"; // Replace this with real ID if needed

//       // Uncomment the next line if you want to use a different endpoint
//       // const res = await axios.get("http://localhost:4004/api/get-presigned-url", {
//        const res = await axios.get("https://bot.forstu.co/api/get-presigned-url", {
//         params: {
//           id,
//           fileName,
//           contentType,
//           type: "incomedocument",
//         },
//       });

//       const { url, key } = res.data;

//       setUploadStatus("⬆️ Uploading to S3...");

//       await axios.put(url, file, {
//         headers: { "Content-Type": contentType },
//       });

//       setUploadStatus("✅ Upload successful!");
//       console.log("📂 File uploaded to S3:", key);
//     } catch (err) {
//       console.error("❌ Upload failed:", err);
//       setUploadStatus("❌ Upload failed");
//     }
//   };

//   return (
//     <div style={{ textAlign: "center" }}>
//       {previewUrl && (
//         <div>
//           <img
//             src={previewUrl}
//             alt="Scanned preview"
//             style={{ maxWidth: "300px", border: "1px solid #ccc" }}
//           />
//         </div>
//       )}
//       <p>{uploadStatus}</p>
//     </div>
//   );
// };

// export default ScanbotScanner;


import { useEffect, useState } from "react";
import ScanbotSDK from "scanbot-web-sdk/ui";
import axios from "axios";
import { sendDocToOCR } from "../../../api/ScanbotScanner/sendtoOCR"; // ✅ Import your new API helper

const ScanbotScanner = () => {
  const [previewUrl, setPreviewUrl] = useState(null);
  const [uploadStatus, setUploadStatus] = useState("");

  // 📦 Capture aadhaar, doctype, userid from query string
  const urlParams = new URLSearchParams(window.location.search);
  const aadhaar = urlParams.get("aadhaar");
  const doctype = urlParams.get("doctype"); // e.g. incomeDoc, casteDoc
  const userId = urlParams.get("userid") || "user-id-123";

  useEffect(() => {
    const init = async () => {
      try {
        await ScanbotSDK.initialize({
          licenseKey: "Kkx916wthTWs475O+e4b1Acv15njNd" +
"GH7GUbW3g+CpcNPO6cDjOl1d70nxF0" +
"2sj1YPlyn/CydD5hPSW3giQu7awjxX" +
"4WOblZa0JCXKuIWkhLFOBxtkW00TCs" +
"k92nipxu9Wu9CfGyfhz7PIn0qBVtK9" +
"WkBxO6rvfZ/lIchFN9YchuDvYD5X/y" +
"rGPe7A6yuTvX1Kw2kL8MIlqURiL/Ut" +
"OMY+gegg/fwOW7KPtYxsV0GvWV6Zvo" +
"50EyhjnzGo/mzTu5I9BJgSnKzPjLq9" +
"utn+dVoW2e0LTLeYQxel8dNzRyi09U" +
"y+r5aidR4aDoe/iI190UNpicfgFtYC" +
"LSVS/2BiUyHQ==\nU2NhbmJvdFNESw" +
"psb2NhbGhvc3R8Ym90LmZvcnN0dS5j" +
"bwoxNzUxNTg3MTk5CjgzODg2MDcKOA" +
"==\n",
          enginePath: "/wasm/",
        });

        await runDocumentScanner();
      } catch (error) {
        console.error("❌ Initialization failed:", error);
        alert("Failed to initialize the scanner.");
      }
    };

    init();
  }, []);

  const runDocumentScanner = async () => {
    const config = new ScanbotSDK.UI.Config.DocumentScanningFlow();

    try {
      const result = await ScanbotSDK.UI.createDocumentScanner(config);
      const scannedPage = result?.document?._pages?.[0];

      if (!scannedPage) {
        alert("No valid page found. Please scan again.");
        return;
      }

      const scannedImageUrl = await scannedPage.finalImageUrl();
      const response = await fetch(scannedImageUrl);
      const blob = await response.blob();

      const fileName = `scanned-${Date.now()}.jpg`;
      const file = new File([blob], fileName, { type: blob.type });

      setPreviewUrl(URL.createObjectURL(file));

      // Upload to S3 and send to backend
      await uploadToS3AndSendToBackend(file, fileName);
    } catch (error) {
      console.error("❌ Scanner error:", error);
      alert("Error during scanning. Please allow camera access.");
    }
  };

  const uploadToS3AndSendToBackend = async (file, fileName) => {
    try {
      setUploadStatus("🔄 Generating upload URL...");

      const contentType = file.type;

      const presignedRes = await axios.get(
        "http://localhost:4004/api/get-presigned-url",
        // "https://bot.forstu.co/api/get-presigned-url",
        {
          params: {
            id: userId,
            fileName,
            contentType,
            type: doctype, // Optional: use dynamic if needed
          },
        }
      );

      const { url, key } = presignedRes.data;

      setUploadStatus("⬆️ Uploading to S3...");

      await axios.put(url, file, {
        headers: { "Content-Type": contentType },
      });
      
const imageUrl = url; // Full pre-signed URL with all query params

      // const imageUrl = `https://scanbotdemo.s3.ap-south-1.amazonaws.com/${key}`;
      setUploadStatus("📤 Sending to backend for OCR...");

      // ✅ Send image URL and aadhaar to backend
      const payload = {
        aadhaar_number: aadhaar,
        [doctype]: imageUrl, // dynamic field like incomeDoc, casteDoc
      };

      await sendDocToOCR(payload);
      setUploadStatus("✅ Uploaded and sent to backend successfully!");
    } catch (error) {
      console.error("❌ Upload or backend error:", error);
      setUploadStatus("❌ Upload or backend sync failed");
    }
  };

  return (
    <div style={{ textAlign: "center" }}>
      {previewUrl && (
        <div>
          <img
            src={previewUrl}
            alt="Scanned preview"
            style={{ maxWidth: "300px", border: "1px solid #ccc" }}
          />
        </div>
      )}
      <p>{uploadStatus}</p>
    </div>
  );
};

export default ScanbotScanner;
