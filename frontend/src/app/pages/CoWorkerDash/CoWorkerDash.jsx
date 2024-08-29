// import React from 'react'
// import Base from '../../components/Base'

// const CoWorkerDash = () => {
//   return (
//     <Base>
//             <div>Hi Vaishnavi</div>
//             <div>Currently you are on CoWorker Dashboard</div>

//     </Base>
//   )
// }

// export default CoWorkerDash
import React, { useEffect, useState } from "react";
import { useHistory, useLocation } from "react-router-dom";
import Base from '../../components/Base';

const CoworkerDashboard = () => {
  const [username, setUsername] = useState('');
  const history = useHistory();
  const location = useLocation();

  useEffect(() => {
    if (location.state && location.state.username) {
      setUsername(location.state.username); // Set username from location state
      // history.push("/coworker/RenewalStudents", { username: location.state.username }); // Navigate with username
    } else {
      // Handle the case where username is not available in location state
      // For example, redirect to login page or show an error
      // history.replace('/login'); // Uncomment if you want to redirect when username is missing
    }
  }, [location.state, history]);

  return (
    <Base>
      <div>
        <h1>Welcome to Coworker Dashboard</h1>
        {username ? (
          <div>Hi {username}</div>
        ) : (
          <div>Hi Guest</div>
        )}
        {/* Other content */}
      </div>
    </Base>
  );
};

export default CoworkerDashboard;

