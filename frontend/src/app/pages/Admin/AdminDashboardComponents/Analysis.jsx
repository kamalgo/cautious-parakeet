import { Box, Heading } from "@chakra-ui/layout";
import React, { useEffect, useState } from "react";
import ReactApexChart from "react-apexcharts";
import { Button, FormControl, FormLabel, Select } from "@chakra-ui/react";
import {
  downloadCSVFileforDailySubmittedApplicationFunctionApi,
  getDailySubmitCountApi,
  getMonthlySubmitCountApi,
  getYearlySubmitCountApi,
} from "../../../api/DashboardApi/DashboardApi";
import { DownloadIcon } from "@chakra-ui/icons";

function Analysis() {
  const [filter, setFilter] = useState("Day");
  const [chartData, setChartData] = useState({
    series: [],
    categories: [],
  });

  const handleChange = (param) => (event) => {
    setFilter({ ...filter, [param]: event.target.value });
    console.log("filter", event.target.value);
    if (event.target.value === "Day") {
      console.log("Day");
      getDailySubmitCount();
    } else if (event.target.value === "Month") {
      console.log("Month");
      getMonthlySubmitCount();
    } else if (event.target.value === "Year") {
      console.log("Year");
      getYearlySubmitCount();
    }
  };

  const downloadCSVFileforDailySubmittedApplicationFunction = () => {
    console.log("djflkdsjfldsf");
    // Call your API to fetch the CSV data
    downloadCSVFileforDailySubmittedApplicationFunctionApi()
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
          link.download = "dailysubmittedApplication.csv";

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

  const optionsForPie = {
    series: [
      {
        name: "Application Submission",
        data: chartData.series,
      },
    ],
    options: {
      chart: {
        width: 300,
        type: "line",
      },

      dataLabels: {
        enabled: false,
      },
      stroke: {
        curve: "straight",
      },

      xaxis: {
        categories: chartData.categories,
      },
    },
  };

  const getMonthlySubmitCount = () => {
    getMonthlySubmitCountApi()
      .then((res) => {
        const monthMapping = {
          1: "Jan",
          2: "Feb",
          3: "Mar",
          4: "Apr",
          5: "May",
          6: "Jun",
          7: "Jul",
          8: "Aug",
          9: "Sep",
          10: "Oct",
          11: "Nov",
          12: "Dec",
        };
        // console.log("getMonthlySubmitCountApi", res);
        const Month = res?.monthCount?.map((item) => item.Month);
        const count = res?.monthCount?.map((item) => item.count);
        const monthNames = Month.map(
          (monthNumber) => monthMapping[monthNumber]
        );
        // console.log("monthNames", monthNames);
        setChartData({
          series: count,
          categories: monthNames,
        });

        // console.log("count", count);
      })
      .catch((error) => {
        console.error(error);
      });
  };

  const getYearlySubmitCount = () => {
    getYearlySubmitCountApi()
      .then((res) => {
        const Year = res?.yearCount?.map((item) => item.Year);
        const count = res?.yearCount?.map((item) => item.YearCount);

        setChartData({
          series: count,
          categories: Year,
        });
      })
      .catch((error) => {
        console.error(error);
      });
  };

  const getDailySubmitCount = () => {
    console.log("getDaylySubmitCountApi");
    getDailySubmitCountApi()
      .then((res) => {
        const formatted_date = res?.map((item) => item.formatted_date);
        const count = res?.map((item) => item.daily_count);

        setChartData({
          series: count,
          categories: formatted_date,
        });
      })
      .catch((error) => {
        console.error(error);
      });
  };

  const data = ["Day", "Month", "Year"];

  return (
    <>
      <Box>
        <form onSubmit={""} style={{ display: "flex", padding: "10px" }}>
          <FormControl id="select">
            {/* <Heading as="h4" size="sm" mb={4} ml={2} mt={4}>
              Graphical Analysis Of Application Submission
            </Heading> */}
            <Box
              display={"flex"}
              justifyContent={"space-between"}
              alignItems={"center"}
              mb={4}
            >
              <Heading as="h4" size="sm" ml={2}>
                Graphical Analysis Of Application Submission
              </Heading>

              <Button
                onClick={() => {
                  downloadCSVFileforDailySubmittedApplicationFunction();
                }}
              >
                <DownloadIcon />
              </Button>
            </Box>
            <Select
              placeholder="Select Filters"
              onChange={handleChange("Month")}
              required
            >
              {data.map((role, index) => (
                <option key={index} value={role}>
                  {role}
                </option>
              ))}
            </Select>
          </FormControl>
        </form>
      </Box>
      <Box
        h="400px"
        //   bg={"#fff"}
        padding={"10px"}
        display={"flex"}
        flexDirection={"column"}
        justifyContent={"center"}
      >
        <div id="chart">
          <ReactApexChart
            options={optionsForPie.options}
            series={optionsForPie.series}
            type="line"
            height={350}
          />
        </div>
      </Box>
    </>
  );
}

export default Analysis;
