import { Box, Heading } from "@chakra-ui/layout";
import React, { useEffect, useState } from "react";
import { Button } from "@chakra-ui/react";

import ReactApexChart from "react-apexcharts";
import {
  downloadCsvForCastewiseApplicationStatusApi,
  getTotalSubmitCountOfApplicationByCasteApi,
} from "../../../api/DashboardApi/DashboardApi";
import { DownloadIcon } from "@chakra-ui/icons";

function CasteWiseApplicationSubmit() {
  // const [
  //   totalSubmitCountOfApplicationByItsCaste,
  //   setTotalSubmitCountOfApplicationByItsCaste,
  // ] = useState(0);

  const [countPerCategory, setCountPerCategory] = useState([]);
  const [categories, setCategories] = useState([]);

  console.log("categories:::::::", categories);

  const getTotalSubmitCountByCaste = () => {
    getTotalSubmitCountOfApplicationByCasteApi()
      .then((res) => {
        if (res.success) {
          console.log("getTotalSubmitCountOfApplicationApi", res.data);
          const counts = res.data.map((item) => item.count_per_category);
          const CasteCategoryList = res.data.map((item) => item.CasteCategory);
          console.log("counts", counts);
          console.log("CasteCategoryList", CasteCategoryList);
          setCountPerCategory(counts);
          setCategories(CasteCategoryList);

          console.log("counts", counts);
        } else {
          console.log("getTotalSubmitCountOfApplicationApi", res.message);
          // setTotalSubmitCountOfApplicationByItsCaste([]);
        }
      })
      .catch((error) => {
        console.error(error);
      });
  };

  const downloadCsvForCastewiseApplicationStatusFunction = () => {
    console.log("djflkdsjfldsf");
    // Call your API to fetch the CSV data
    downloadCsvForCastewiseApplicationStatusApi()
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
          link.download = "CastewiseApplicationStatus.csv";

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
    getTotalSubmitCountByCaste();
    console.log("countPerCategory", countPerCategory);
  }, []);

  const optionsForPie = {
    series: countPerCategory,
    options: {
      chart: {
        width: 300,
        type: "pie",
      },
      labels: categories,
      colors: ["#1d3162", "#df7135", "#f6bb61", "#e5e2dc"],
      legend: {
        fontSize: "13px",
        position: "bottom",
        verticalAlign: "bottom",
        offsetX: 0,
        offsetY: 0,
      },
    },
  };

  return (
    <Box
      h="400px"
      //   bg={"#fff"}
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
          Caste Wise Application Submission
        </Heading>

        <Button
          onClick={() => {
            downloadCsvForCastewiseApplicationStatusFunction();
          }}
        >
          <DownloadIcon />
        </Button>
      </Box>
      <div id="chart">
        <ReactApexChart
          options={optionsForPie.options}
          series={optionsForPie.series}
          type="pie"
          height={300}
        />
      </div>
    </Box>
  );
}

export default CasteWiseApplicationSubmit;
