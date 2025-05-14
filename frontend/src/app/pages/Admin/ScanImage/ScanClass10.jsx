// import { useEffect } from "react";
// import { initializeScanner } from "@scanbot/web-sdk";

// export default function Scan() {
//   useEffect(() => {
//     (async () => {
//       const licenseKey = "YOUR_SCANBOT_LICENSE_KEY";
//       const scanner = await initializeScanner({
//         containerId: "scanner",
//         licenseKey,
//         onDocumentDetected: (result) => {
//           console.log("Document detected:", result);
//           handleUpload(result.croppedImageBlob);
//         },
//       });
//     })();
//   }, []);

//   const handleUpload = async (blob) => {
//     // Upload blob to your backend
//     const formData = new FormData();
//     formData.append("file", blob);
//     formData.append("user_id", getUserIdFromQuery());
//     formData.append("doc_type", getDocTypeFromQuery());

//     const res = await fetch("https://your-api.com/upload", {
//       method: "POST",
//       body: formData,
//     });
//     const json = await res.json();
//     alert("Uploaded!");
//   };

//   return <div id="scanner" style={{ width: "100vw", height: "100vh" }} />;
// }
