// import React from "react";

// import { Redirect, Route } from "react-router-dom";

// export default function MicroRoute({ component: Component, ...rest }) {
//   // console.log("role", isAuthenticated()?.user?.role);
//   return (
//     <Route
//       {...rest}
//       render={(props) => {
//         console.log("props", props);
//         <Redirect
//           to={{
//             pathname: "/signin/micrologin",
//             // state: { from: props.location },
//           }}
//         />;
//       }}
//     />
//   );
// }

import React from "react";
import { Redirect, Route } from "react-router-dom";
import { useHistory } from "react-router-dom";

export default function MicroRoute({ component: Component, ...rest }) {
  const navigate = useHistory();
  // Check authentication or any other conditions here if needed

  return (
    <Route
      {...rest}
      render={(props) => {
        // Redirect to "/signin/micrologin"
        return navigate.replace("/microsite/login");
      }}
    />
  );
}
