import { Box } from "@chakra-ui/layout";
import React, { useState } from "react";
import ReactApexChart from "react-apexcharts";

function YearAndCourseStatus({ ApplicationStatus }) {
  function getCounts(data) {
    if (!Array.isArray(data)) {
      return [0, 0];
    } else {
      // let main = [data];
      // console.log("data", data);
      let pendingCount = 0;
      let submittedCount = 0;

      // data?.map((item) => {
      //   // console.log("item>>>>>>", item.pending_count);
      //   pendingCount += item.pending_count;
      //   submittedCount += item.submitted_count;
      //   // if (item.pending_count) {
      //   //   pendingCount += item.pending_count;
      //   // }
      //   // if (item.submitted_count) {
      //   //   submittedCount += item.submitted_count;
      //   // }
      // });

      data.forEach((item) => {
        if (item.pending_count) {
          pendingCount += parseInt(item.pending_count);
        }
        if (item.submitted_count) {
          submittedCount += parseInt(item.submitted_count);
        }
      });

      // console.log("LOLOLOLOO", [pendingCount, submittedCount]);
      return [pendingCount, submittedCount];

      // return [pendingCount, submittedCount];
    }
  }

  // getCounts(ApplicationStatus) || [0, 0];

  const optionsForPie = {
    series: getCounts(ApplicationStatus) || [0, 0],
    options: {
      chart: {
        width: 300,
        type: "pie",
      },
      labels: [`submitted `, `pending `],
      colors: ["#1d3162", "#df7135", "#f6bb61", "#e5e2dc"],
      legend: {
        show: true,
        fontSize: "16px",
        position: "bottom",
        verticalAlign: "bottom",
        offsetX: 0,
        offsetY: 0,
      },

      title: {
        text:
          getCounts(ApplicationStatus)[0] === 0 &&
          getCounts(ApplicationStatus)[1] === 0
            ? "No Data For Application Status"
            : "Application Status",
        align: "center",
      },
    },
  };

  // console.log("ApplicationStatusBYBYEYEBYBYBYEYE--", ApplicationStatus);

  return (
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
          //   type="bar"
          type="donut"
          // width={380}
          height={350}
        />
      </div>
    </Box>
  );
}

export default YearAndCourseStatus;
