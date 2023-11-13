import React from "react";
import LogOutButton from "../LogOutButton/LogOutButton";
import { useSelector } from "react-redux";
import StudentCard from "../Cards/StudentCard";
function UserPage() {
  const user = useSelector((store) => store.user);
  console.log(user);
  return (
    <div className="container">
      <h2>Welcome, {user.username}!</h2>
      <p>Your ID is: {user.id}</p>
      <LogOutButton className="btn" />
      <StudentCard />
    </div>
  );
}

// this allows us to use <App /> in index.js
export default UserPage;
