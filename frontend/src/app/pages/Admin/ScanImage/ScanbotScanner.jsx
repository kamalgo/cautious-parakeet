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

    useEffect(() => {
        const init = async () => {
            try {
                await ScanbotSDK.initialize({
                    licenseKey: "eW1OfVfGMpNFQqUmARYm9WZrgM2kLv" +
                        "hMl06/u51XVbqnxsavptnWKPYHXAOz" +
                        "oGgm5+JajQBghQmkx1WVVg+mLmT2kg" +
                        "lNJKbuNW5f/ioeRWotLyAVWLvJ9nfF" +
                        "VSa/jAxPsU3RCtd0A9BPBnw5Ak9nkg" +
                        "z9VhBbPGjd9p15S7Ox8MkffQt3ZWD2" +
                        "+vO+LKAWEiNQqDaQGK9PW6KATCYuWd" +
                        "AWUVm2BE/VQoCvHjOztqZR7oqEDc5w" +
                        "k12NiVzTWyo16MDkRSqquJJYHI55UX" +
                        "kK+YBUdIBIO+UxbIAfDBPjuUUxyjVg" +
                        "kn2zPyfQisfpYKT2NZN08DNBFtqInI" +
                        "QpsptX592PuA==\nU2NhbmJvdFNESw" +
                        "psb2NhbGhvc3R8d3d3LmZvcnN0dS5j" +
                        "bwoxNzQ3MzUzNTk5CjgzODg2MDcKOA" +
                        "==\n",
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

                console.log("📄 Document scanned.");
                setScannedFile(file); // Save it to state
            } else {
                console.warn("⚠️ No pages scanned.");
                alert("No document was scanned. Please press 'Submit' after scanning.");
            }
        } catch (error) {
            console.error("❌ Document scanning failed:", error);
            alert("Error during scanning. Please ensure camera access is allowed.");
        }
    };

    const sendToGallabox = async () => {
        if (!scannedFile) {
            alert("No scanned file found. Please scan a document first.");
            return;
        }

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
                console.log("✅ Document sent to WhatsApp:", data);
                alert("Document sent successfully via WhatsApp.");
            } else {
                const errorData = await response.json();
                console.error("❌ Gallabox API error:", errorData);
                alert("Failed to send the document. Check API key and phone format.");
            }
        } catch (error) {
            console.error("❌ Network error:", error);
            alert("Network error while sending document.");
        }
    };

    return (
        <div>
            <button onClick={sendToGallabox}>Submit</button>
        </div>
    );
};

export default ScanbotScanner;
