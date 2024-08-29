import React from 'react';
import {
  Box,
  Heading,
  Flex,
  Spacer,
  Button,
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  useToast,
} from "@chakra-ui/react";
import { Grid, GridItem } from "@chakra-ui/react";
import Base from "../../components/Base"; // Make sure this import path is correct based on your project structure
import Total from './CDashboardComponents.jsx/Total';
import T1T2 from './CDashboardComponents.jsx/T1T2';
import TotalStudents from './CDashboardComponents.jsx/TotalStudents';

const CDashboard = () => {

  return (
    <Base>
      <Grid templateColumns="repeat(3, 1fr)" gap={6}>
        <GridItem w="100%" bg={"#FFFBF5"} borderRadius={"10px"}>
          <Total />
        </GridItem>

        <GridItem w="100%" bg={"#FFFBF5"} borderRadius={"10px"}>
          <TotalStudents />
        </GridItem>

        <GridItem w="100%" bg={"#FFFBF5"} borderRadius={"10px"}>
          <T1T2 />
        </GridItem>

      </Grid>
    </Base>
  );
}

export default CDashboard;

