import React, { useState } from "react";
import { Link } from "react-router-dom";
import LogOutButton from "../LogOutButton/LogOutButton";
import { useSelector } from "react-redux";
import { Menu, MenuItem } from "@mui/material";
import { Button } from "../ui/button";
import "./Nav.css";

function Nav() {
  const user = useSelector((store) => store.user);
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <div className="smallPrint flex-between background-light900_dark200 w-full gap-5 p-6 dark:shadow-none sm:px-12 bg-primary-500 navBar navPrint">
      <Link to="/students" className="flex items-center gap-1">
        <img
          src="/assets/images/site-logo.png"
          width={180}
          height={180}
          className="logo-image noPrint"
          alt="Haley's Hope Logo"
        />
      </Link>
      <div className="flex gap-4">
        {/* {!user.id && (
          <Link className="px-4 py-2 text-white hover:bg-blue-500 bg-primary-100 shadow-lg mr-4" to="/login">
            Login / Register
          </Link>
        )} */}

        {user.id && (
          <>
            <Link
              className="noPrint px-4 py-2 text-white hover:bg-blue-500 bg-primary-100 shadow-lg mr-4"
              to="/students"
            >
              Students
            </Link>

            {/* <Link
              className="px-4 py-2 text-primary-500 hover:bg-blue-500 bg-primary-100 shadow-lg mr-4"
              to="/info"
            >
              Info Page
            </Link> */}

            {/* Adjust LogOutButton styling as needed */}
            <LogOutButton
              className=" noPrint px-4 py-2 text-white hover:bg-blue-500 bg-primary-100 shadow-lg mr-4"
              to="/login"
            />
          </>
        )}

        {/* <Link
          className="px-4 py-2 text-primary-500 hover:bg-blue-500 bg-primary-100 shadow-lg"
          to="/about"
        >
          About
        </Link> */}
        {user.role_id === 6 && (
          <>
            <Link
              aria-controls="admin-menu"
              aria-haspopup="true"
              aria-expanded={open ? "true" : undefined}
              onClick={handleClick}
              className="noPrint px-5 py-2 text-white hover:bg-blue-500 bg-primary-100 shadow-lg mr-4"
              to="/login"
              //className="bg-primary-100"
            >
              Admin
            </Link>
            <Menu
              id="admin-menu"
              anchorEl={anchorEl}
              open={open}
              onClose={handleClose}
              MenuListProps={{
                "aria-labelledby": "admin-button",
              }}
              className="customMenu"
            >
              <MenuItem
                onClick={handleClose}
                component={Link}
                to="/admin/manageUsers"
                className="customMenuItem"
              >
                Manage Users
              </MenuItem>

              <MenuItem
                onClick={handleClose}
                component={Link}
                to="/admin/coaches"
                className="customMenuItem"
              >
                Coaches
              </MenuItem>
              <MenuItem
                onClick={handleClose}
                component={Link}
                to="/admin/incrementGrade"
                className="customMenuItem"
              >
                Increment Grade{" "}
              </MenuItem>
              {/* <MenuItem
                onClick={handleClose}
                component={Link}
                to="/admin/link4"
                className="customMenuItem"
              >
                Generate Report
              </MenuItem> */}
            </Menu>
          </>
        )}
      </div>
    </div>
  );
}

export default Nav;
