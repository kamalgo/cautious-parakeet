import { Box } from "@chakra-ui/layout";
import React, { useEffect } from "react";
import {
  Stat,
  StatLabel,
  StatNumber,
  StatHelpText,
  StatArrow,
  StatGroup,
} from "@chakra-ui/react";
import {
  getTotalEligibleStudentsApi,
  getTotalStudentsApi,
} from "../../../api/DashboardApi/DashboardApi";

function TotalStudentsComponent() {
  const [totalStudent, setTotalStudent] = React.useState(0);
  const [totalEligible, setTotalEligible] = React.useState(0);

  const getTotalEligibleStudents = () => {
    getTotalEligibleStudentsApi()
      .then((res) => {
        if (res.success) {
          // console.log("getTotalEligibleStudentsApi", res.data);
          setTotalEligible(res.data);
        } else {
          setTotalEligible([]);
        }
      })
      .catch((error) => {
        console.error(error);
      });
  };

  const getTotalStudents = () => {
    getTotalStudentsApi()
      .then((res) => {
        if (res.success) {
          // console.log("getTotalStudentsApi", res.data);
          setTotalStudent(res.data);
        } else {
          setTotalStudent([]);
        }
      })
      .catch((error) => {
        console.error(error);
      });
  };

  useEffect(() => {
    getTotalStudents();
    getTotalEligibleStudents();
  }, []);

  return (
    <Box
      h="400px"
      //   bg={"#fff"}
      padding={"10px"}
      display={"flex"}
      flexDirection={"column"}
      justifyContent={"center"}
      //   alignItems={"center"}
      //   paddingLeft={"20px"}
      //   margin={"20px"}
    >
      <Box mb={"20px"} bg={"#FFE7C1"} p={"20px"} borderRadius={"20px"}>
        <Stat>
          <StatLabel>Total Students</StatLabel>
          <StatNumber>{totalStudent}</StatNumber>
        </Stat>
      </Box>

      <Box bg={"#FFE7C1"} p={"20px"} borderRadius={"20px"}>
        <Stat>
          <StatLabel>Total Eligible</StatLabel>
          <StatNumber>{totalEligible}</StatNumber>
        </Stat>
      </Box>
    </Box>
  );
}

export default TotalStudentsComponent;
