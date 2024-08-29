import { Box, Container } from "@chakra-ui/react";
import React from "react";
import { Tabs, TabList, TabPanels, Tab, TabPanel } from "@chakra-ui/react";
import Login from "../pages/Login/Login";
import MicrositeLogin from "../pages/MicroiteLogin/MicrositeLogin";

function MainLogin() {
  return (
    <>
      <Box bg="primary.main">
        <Container>
          <Box height={"100vh"} pt="120px">
            <Box
              py={"80px"}
              bg="primary.900"
              borderRadius={"20px"}
              display="flex"
              flexDirection="column"
              alignItems="center"
              justifyContent="center"
              // mt="30px"
            >
              <Box>
                <Tabs isFitted variant="enclosed">
                  <TabList mb="1em">
                    <Tab>Login</Tab>
                    <Tab>Student Login</Tab>
                    {/* <Tab></Tab> */}
                  </TabList>

                  <TabPanels>
                    <TabPanel>
                      <Login />
                    </TabPanel>
                    <TabPanel>
                      <MicrositeLogin />
                    </TabPanel>
                  </TabPanels>
                </Tabs>
              </Box>
            </Box>
          </Box>
        </Container>
      </Box>
    </>
  );
}

export default MainLogin;
