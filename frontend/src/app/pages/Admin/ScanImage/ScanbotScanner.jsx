import { useEffect } from "react";
import ScanbotSDK from 'scanbot-web-sdk/ui';

const ScanbotScanner = () => {
    useEffect(() => {
        const init = async () => {
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
                enginePath: "/wasm/"
            });

            // Automatically run the scanner after initialization
            await runDocumentScanner();
        };

        init();
    }, []);

const runDocumentScanner = async () => {
    const config = new ScanbotSDK.UI.Config.DocumentScanningFlow();

    try {
        const result = await ScanbotSDK.UI.createDocumentScanner(config);
        
        console.log("hi"); // 👈 Print this when scan is complete
        console.log("Scan Result:", result);

        // You can now send this scanned document to backend or S3 etc.
    } catch (error) {
        console.error("Scanner failed:", error);
    }
};


    return null; // or <></> if no button or UI is needed
};

export default ScanbotScanner;
