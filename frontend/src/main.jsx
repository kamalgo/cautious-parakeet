import ReactDOM from "react-dom/client";
import App from "./app/App.jsx";
import { ChakraProvider } from "@chakra-ui/react";
import { extendTheme } from "@chakra-ui/react";
import { BrowserRouter } from "react-router-dom";

// 2. Call `extendTheme` and pass your custom values
const theme = extendTheme({
  colors: {
    primary: {
      main: "#000033",

      200: "#25256F",
      // ...
      900: "#fff",
    },
    secondary: {
      main: "#F98E2B",
    },
    text: {
      light: "#fff",
      dark: "#333",
    },
  },
});

ReactDOM.createRoot(document.getElementById("root")).render(
  <BrowserRouter>
    <ChakraProvider theme={theme}>
      <App />
    </ChakraProvider>
  </BrowserRouter>
);
