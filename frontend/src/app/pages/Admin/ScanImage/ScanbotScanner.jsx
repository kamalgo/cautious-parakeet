// import { useEffect } from "react";
// import ScanbotSDK from 'scanbot-web-sdk/ui';

// const ScanbotScanner = () => {
//     useEffect(() => {
//         const init = async () => {
//             await ScanbotSDK.initialize({
// licenseKey: "eW1OfVfGMpNFQqUmARYm9WZrgM2kLv" +
//     "hMl06/u51XVbqnxsavptnWKPYHXAOz" +
//     "oGgm5+JajQBghQmkx1WVVg+mLmT2kg" +
//     "lNJKbuNW5f/ioeRWotLyAVWLvJ9nfF" +
//     "VSa/jAxPsU3RCtd0A9BPBnw5Ak9nkg" +
//     "z9VhBbPGjd9p15S7Ox8MkffQt3ZWD2" +
//     "+vO+LKAWEiNQqDaQGK9PW6KATCYuWd" +
//     "AWUVm2BE/VQoCvHjOztqZR7oqEDc5w" +
//     "k12NiVzTWyo16MDkRSqquJJYHI55UX" +
//     "kK+YBUdIBIO+UxbIAfDBPjuUUxyjVg" +
//     "kn2zPyfQisfpYKT2NZN08DNBFtqInI" +
//     "QpsptX592PuA==\nU2NhbmJvdFNESw" +
//     "psb2NhbGhvc3R8d3d3LmZvcnN0dS5j" +
//     "bwoxNzQ3MzUzNTk5CjgzODg2MDcKOA" +
//     "==\n",
//                 enginePath: "/wasm/"
//             });

//             // Automatically run the scanner after initialization
//             await runDocumentScanner();
//         };

//         init();
//     }, []);

// const runDocumentScanner = async () => {
//     const config = new ScanbotSDK.UI.Config.DocumentScanningFlow();

//     try {
//         const result = await ScanbotSDK.UI.createDocumentScanner(config);

//         console.log("hi"); // 👈 Print this when scan is complete
//         console.log("Scan Result:", result);


//         // You can now send this scanned document to backend or S3 etc.
//     } catch (error) {
//         console.error("Scanner failed:", error);
//     }
// };


//     return null; // or <></> if no button or UI is needed
// };

// export default ScanbotScanner;


import { useEffect, useState } from "react";
import ScanbotSDK from "scanbot-web-sdk/ui";

const ScanbotScanner = () => {
    const [scannedFile, setScannedFile] = useState(null);
    const [previewUrl, setPreviewUrl] = useState(null);
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        const init = async () => {
            try {
                await ScanbotSDK.initialize({
                    licenseKey:
                        "M+YpezSx8a2alkPMD9M3nkvmEaMHS5" +
                        "rw2gTzymieXPzZ+9Ppy1u44vWpY7Bo" +
                        "WsAphJJaPMWLnFMeOHr6aXYee/k58l" +
                        "PtHf7ru8fdXhNU9dr3tFeAZkTgzD+N" +
                        "DfsD1PjmZ7NxUqzd9eEb5RvZ2/qdZ8" +
                        "zwgbDsAvQKkX0jbknL2tuqlvcVpkcE" +
                        "fpATFIzo+1h/JVMoRJiMJrRncZ4vfT" +
                        "aoqmB+rzDuTBvmpNwuXRAOzc/HBh2V" +
                        "x8cFXA5dp7AkzWaaPCyOOlV4jgOZ4I" +
                        "cm06Q4SxLiXSV8htkauEm5fXoFN/aP" +
                        "fZmmpQuSS+fvugTut93KQaGVA4Ekyb" +
                        "/wtwdjP7jpJw==\nU2NhbmJvdFNESw" +
                        "psb2NhbGhvc3R8Zm9yc3R1LmN0Lndz" +
                        "CjE3NDgzOTAzOTkKODM4ODYwNwo4\n",
                    enginePath: "/wasm/",
                });

                await runDocumentScanner();
            } catch (error) {
                console.error("❌ Initialization failed:", error);
                alert("Failed to initialize the scanner. Please try again.");
            }
        };

        init();
    }, []);

    const runDocumentScanner = async () => {
        const config = new ScanbotSDK.UI.Config.DocumentScanningFlow();

        try {
            const result = await ScanbotSDK.UI.createDocumentScanner(config);

            if (result.pages && result.pages.length > 0) {
                const scannedImageUri = result.pages[0].documentImageFileUri;
                const response = await fetch(scannedImageUri);
                const blob = await response.blob();

                const file = new File([blob], "scanned-document.jpg", {
                    type: blob.type,
                });

                setScannedFile(file);
                setPreviewUrl(URL.createObjectURL(file));
                console.log("📄 Document scanned and ready.");
            } else {
                console.warn("⚠️ No document scanned.");
                alert("No document was scanned. Please try again.");
            }
        } catch (error) {
            console.error("❌ Scanner error:", error);
            alert("Error during scanning. Please allow camera access.");
        }
    };

    const sendToGallabox = async () => {
        if (!scannedFile) {
            alert("No scanned document found. Please scan first.");
            return;
        }

        setIsLoading(true);

        const gallaboxApiUrl = "https://api.gallabox.com/whatsapp/sendMedia";
        const recipientPhoneNumber = "917887674130";
        const gallaboxApiKey = "6824549420ef01f267799de8";

        const formData = new FormData();
        formData.append("file", scannedFile);

        const payload = {
            phone: recipientPhoneNumber,
            type: "document",
            caption: "Here is your scanned document.",
        };

        formData.append("payload", JSON.stringify(payload));

        try {
            const response = await fetch(gallaboxApiUrl, {
                method: "POST",
                headers: {
                    "api-key": gallaboxApiKey,
                },
                body: formData,
            });

            if (response.ok) {
                const data = await response.json();
                console.log("✅ Sent to WhatsApp:", data);
                alert("Document sent successfully via WhatsApp.");
            } else {
                const errorData = await response.json();
                console.error("❌ Gallabox API error:", errorData);
                alert("Failed to send the document. Check the phone format or API key.");
            }
        } catch (error) {
            console.error("❌ Network error:", error);
            alert("Network error while sending document.");
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div style={{ textAlign: "center" }}>
            <h2>Scanbot Web Scanner</h2>

            {previewUrl && (
                <div style={{ marginBottom: "20px" }}>
                    <h4>Scanned Preview:</h4>
                    <img src={previewUrl} alt="Scanned preview" style={{ maxWidth: "300px", border: "1px solid #ccc" }} />
                </div>
            )}

            <button onClick={sendToGallabox} disabled={isLoading} style={{ padding: "10px 20px", fontSize: "16px" }}>
                {isLoading ? "Submitting..." : "Submit"}
            </button>
        </div>
    );
};

export default ScanbotScanner;

