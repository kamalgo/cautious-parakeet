// import Base from "../../components/Base";
// import { SimpleGrid, Box } from "@chakra-ui/react";
// import Welcome from "../../components/DashboardComponents/Welcome";
// import UserUpdates from "../../components/DashboardComponents/UserUpdates";
// import Donut from "../../components/DashboardComponents/Donut";
// // import BarGraph from "../../components/DashboardComponents/BarGraph";
// import UserDistCard from "./UserDistCard";
// import RecentVideos from "../../components/DashboardComponents/RecentVideos";

// export default function AdminDashboard() {
//   return (
//     <>
//       <Base>
//         <SimpleGrid
//           columns={{
//             sm: 1,
//             md: 1,
//             lg: 1,
//           }}
//           spacing="2.5vh"
//           mx={1}
//         >
//           <Box
//             border={" 0.5px solid lightgray"}
//             padding={5}
//             bg={"white"}
//             borderRadius="xl"
//             _hover={{
//               boxShadow: "2xl",
//               transitionDuration: "0.3s",
//             }}
//           >
//             <Welcome />
//           </Box>
//         </SimpleGrid>
//         <SimpleGrid
//           columns={{
//             sm: 1,
//             md: 2,
//             lg: 3,
//           }}
//           spacing="2.5vh"
//           mx={1}
//           mt={5}
//         >
//           <Box
//             border={" 0.5px solid lightgray"}
//             padding={5}
//             bg={"white"}
//             borderRadius="xl"
//             _hover={{
//               boxShadow: "2xl",
//               transitionDuration: "0.3s",
//             }}
//           >
//             <RecentVideos />
//           </Box>

//           <Box
//             border={" 0.5px solid lightgray"}
//             padding={5}
//             bg={"white"}
//             borderRadius="xl"
//             _hover={{
//               boxShadow: "2xl",
//               transitionDuration: "0.3s",
//             }}
//           >
//             <Donut />
//           </Box>

//           <Box
//             border={" 0.5px solid lightgray"}
//             padding={5}
//             bg={"white"}
//             borderRadius="xl"
//             _hover={{
//               boxShadow: "2xl",
//               transitionDuration: "0.3s",
//             }}
//           >
//             <UserUpdates />
//           </Box>

//           <Box
//             border={" 0.5px solid lightgray"}
//             padding={5}
//             bg={"white"}
//             borderRadius="xl"
//             _hover={{
//               boxShadow: "2xl",
//               transitionDuration: "0.3s",
//             }}
//           >
//             <UserDistCard />
//           </Box>
//           {/* <Box
//             border={" 0.5px solid lightgray"}
//             padding={5}
//             bg={"white"}
//             borderRadius="xl"
//             _hover={{
//               boxShadow: "2xl",
//               transitionDuration: "0.3s",
//             }}
//           >
//             <BarGraph />
//           </Box> */}
//         </SimpleGrid>
//       </Base>
//     </>
//   );
// }

import React from "react";
import Base from "../../components/Base";
import TotalStudentsComponent from "./AdminDashboardComponents/TotalStudentsComponent";
import { Grid, GridItem } from "@chakra-ui/react";
import ApplicationStatus from "./AdminDashboardComponents/ApplicationStatus";
import CasteWiseApplicationSubmit from "./AdminDashboardComponents/CasteWiseApplicationSubmit";
import SystemAnalysisComponent from "./AdminDashboardComponents/SystemAnalysisComponent";
import Analysis from "./AdminDashboardComponents/Analysis";

const AdminDashboard = () => {
  return (
    <Base>
      {/* <h1>Helloooooo</h1> */}
      <Grid templateColumns="repeat(3, 1fr)" gap={6}>
        <GridItem w="100%" bg={"#FFFBF5"} borderRadius={"10px"}>
          <TotalStudentsComponent />
        </GridItem>
        <GridItem w="100%" bg={"#FFFBF5"} borderRadius={"10px"}>
          <ApplicationStatus />
        </GridItem>
        <GridItem w="100%" bg={"#FFFBF5"} borderRadius={"10px"}>
          <CasteWiseApplicationSubmit />
        </GridItem>
        {/* <GridItem w="100%" h="10" bg="blue.500" />
        <GridItem w="100%" h="10" bg="blue.500" /> */}
      </Grid>
      <Grid templateColumns="repeat(2, 1fr)" mt={"10px"} gap={6}>
        <GridItem w="100%" bg={"#FFFBF5"} borderRadius={"10px"}>
          <Analysis />
        </GridItem>
        <GridItem w="100%" bg={"#FFFBF5"} borderRadius={"10px"}>
          <SystemAnalysisComponent />
        </GridItem>
      </Grid>
    </Base>
  );
};

export default AdminDashboard;
