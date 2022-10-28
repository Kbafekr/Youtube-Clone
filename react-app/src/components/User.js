import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import './User.css'

function User({sidePanel}) {
  const [user, setUser] = useState({});
  const { userId }  = useParams();

  useEffect(() => {
    if (!userId) {
      return;
    }
    (async () => {
      const response = await fetch(`/api/users/${userId}`);
      const user = await response.json();
      setUser(user);
    })();
  }, [userId]);

  if (!user) {
    return null;
  }

  return (
    <>
     <div className={sidePanel == true ? "homeContainer" : "homeContainerClosed"}>

    <ul>
      <li>
        <strong>User Id</strong> {userId}
      </li>
      <li>
        <strong>First Name</strong> {user.first_name}
      </li>
      <li>
        <strong>Last Name</strong> {user.last_name}
      </li>
      <li>
        <strong>Email</strong> {user.email}
      </li>
    </ul>
     </div>
     </>
  );
}
export default User;
