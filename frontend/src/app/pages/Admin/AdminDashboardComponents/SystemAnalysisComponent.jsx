import { Box, Heading } from "@chakra-ui/layout";
import React, { useState } from "react";
import ReactApexChart from "react-apexcharts";
import { downloadCSVFileforPendingReasonFunctionApi } from "../../../api/DashboardApi/DashboardApi";
import { Button } from "@chakra-ui/react";
import { DownloadIcon } from "@chakra-ui/icons";

function SystemAnalysisComponent() {
  //   const [chartData, setChartData] = useState();

  const optionsForPie = {
    series: [
      {
        data: [12, 22, 7],
      },
    ],

    options: {
      chart: {
        type: "bar",
        height: 350,
      },
      plotOptions: {
        bar: {
          borderRadius: 4,
          horizontal: true,
        },
      },
      dataLabels: {
        enabled: false,
      },
      xaxis: {
        categories: ["System Error", "Adhar Card Link", "Login Failed"],
      },
    },
  };

  const downloadCSVFileforPendingReasonFunction = () => {
    console.log("djflkdsjfldsf");
    // Call your API to fetch the CSV data
    downloadCSVFileforPendingReasonFunctionApi()
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
          link.download = "CSVFileforPendingReason.csv";

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

  return (
    <Box
      h="400px"
      //   bg={"#fff"}
      // padding={"10px"}
      display={"flex"}
      flexDirection={"column"}
      justifyContent={"center"}
    >
      {/* <Heading as="h4" size="sm" mb={3} ml={2} mt={4}>
        Application submition failed status
      </Heading> */}
      <Box
        display={"flex"}
        justifyContent={"space-between"}
        alignItems={"center"}
        pt={"20px"}
        // mb={4}
      >
        <Heading as="h4" size="sm" ml={2}>
          Application submition failed status
        </Heading>

        <Button
          onClick={() => {
            downloadCSVFileforPendingReasonFunction();
          }}
        >
          <DownloadIcon />
        </Button>
      </Box>
      <div id="chart">
        <ReactApexChart
          //   options={optionsForPie}
          //   series={optionsForPie.series}
          //   type="bar"
          options={optionsForPie.options}
          series={optionsForPie.series}
          type="bar"
          height={350}
        />
      </div>
    </Box>
  );
}

export default SystemAnalysisComponent;
