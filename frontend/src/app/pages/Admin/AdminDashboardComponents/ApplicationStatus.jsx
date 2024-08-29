import { Box, Heading } from "@chakra-ui/layout";
import { Button } from "@chakra-ui/react";
import { DownloadIcon } from "@chakra-ui/icons";

import React, { useEffect, useState } from "react";
import ReactApexChart from "react-apexcharts";
import {
  downloadCsvForApplicationStatusFunctionApi,
  getTotalSubmitCountOfApplicationApi,
} from "../../../api/DashboardApi/DashboardApi";

function ApplicationStatus() {
  const [totalStatus, setTotalStatus] = useState({});

  const data = {
    series: [totalStatus?.submittedCountData, totalStatus?.pendingCountData],
    options: {
      chart: {
        width: 300,
        type: "pie",
      },
      labels: [
        `submitted ${totalStatus?.submittedCountData}`,
        `pending ${totalStatus?.pendingCountData}`,
      ],
      colors: ["#1d3162", "#df7135", "#f6bb61", "#e5e2dc"],
      legend: {
        show: true,

        fontSize: "16px",
        position: "bottom",
        verticalAlign: "bottom",
        offsetX: 0,
        offsetY: 0,
      },
    },
  };

  const getTotalSubmitOfApplication = () => {
    getTotalSubmitCountOfApplicationApi()
      .then((res) => {
        if (res.success) {
          setTotalStatus(res.data);
        } else {
          setTotalStatus([]);
        }
      })
      .catch((error) => {
        console.error(error);
      });
  };

  const downloadCsvForApplicationStatusFunction = () => {
    console.log("djflkdsjfldsf");
    // Call your API to fetch the CSV data
    downloadCsvForApplicationStatusFunctionApi()
      .then((res) => {
        if (res.success) {
          console.log(res.data);
          const csvData = res.data
            .map((obj) => {
              // Convert each object to a string with comma-separated values
              return Object.values(obj).join(",");
            })
            .join("\n");

          // Convert the CSV data string to a Blob
          const blob = new Blob([csvData], { type: "text/csv" });

          // Create a temporary anchor element to trigger the download
          const link = document.createElement("a");
          link.href = window.URL.createObjectURL(blob);
          link.download = "application_status.csv";

          // Simulate a click to trigger the download
          document.body.appendChild(link);
          link.click();

          // Clean up
          document.body.removeChild(link);
          window.URL.revokeObjectURL(link.href);
        } else {
          console.error("Failed to download CSV:", res.error);
          // Handle error if necessary
        }
      })
      .catch((error) => {
        console.error("Error downloading CSV:", error);
        // Handle error if necessary
      });
  };

  useEffect(() => {
    getTotalSubmitOfApplication();
  }, []);

  return (
    <Box
      h="400px"
      padding={"10px"}
      display={"flex"}
      flexDirection={"column"}
      justifyContent={"center"}
    >
      <Box
        display={"flex"}
        justifyContent={"space-between"}
        alignItems={"center"}
        mb={4}
      >
        <Heading as="h4" size="sm" ml={2}>
          Application Status
        </Heading>

        <Button
          onClick={() => {
            downloadCsvForApplicationStatusFunction();
          }}
        >
          <DownloadIcon />
        </Button>
      </Box>
      <div id="chart">
        <ReactApexChart
          options={data.options}
          series={data.series}
          type="pie"
          height={300}
        />
      </div>
    </Box>
  );
}

export default ApplicationStatus;
