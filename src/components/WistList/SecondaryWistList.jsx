import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { formatDate } from "../../lib/utils";
import { useParams, useHistory } from "react-router-dom";
import { Button } from "../ui/button";
import { TableRow, TableCell } from "@mui/material";


const SecondaryWistList = () => {
  const dispatch = useDispatch();
  const history = useHistory();
  const tests = useSelector((state) => state.secondaryWistReducer.list);
  const student = useParams();

  // const studentId = useSelector((state) => state.studentId);
  const isLoading = useSelector(
    (state) => state.secondaryWistReducer.isLoading
  );

  console.log(tests);
  useEffect(() => {
    //need to get student id and pass it in somehow in the dispatch, with a payload: studentId
    dispatch({ type: "FETCH_SECONDARY_WIST", payload: student.id });
  }, [dispatch]);

  //if loading tests, display a loading message
  if (isLoading) return <p>Loading tests...</p>;
  //if (error) return <p>Error: {error}</p>;

  //if there are no tests, display none available for now
  if (tests.length === 0) {
    return <p>No WIST 11-18 tests available.</p>;
  }

  const moreDetails = (testId) => {
    history.push(`/SecondaryWistResults/${testId}`);
  };

  return (
    <div>
      {tests.map((test) => (
        <div key={test.id} onClick={() => moreDetails(test.id)}>
         <TableRow>
          <TableCell style={{width: 275}}>
          <p>
            Wist Age 11-18 Date: {formatDate(test.date)}
          </p>
          </TableCell>
          <TableCell>
          <Button
                variant="outline"
                className=" text-xs px-2 py-1 col-span-1 lg:col-span-5 bg-primary-500 hover:bg-primary-100 text-white font-bold rounded focus:outline-none focus:shadow-outline m-2 transition duration-300 ease-in-out flex items-center justify-center space-x-2"
                onClick={() => moreDetails(test.id)}
              >
                Details
              </Button>
            </TableCell>
            <TableCell>
           
          </TableCell>
          </TableRow>
        </div>
      ))}
            <hr />

    </div>
  );
};

export default SecondaryWistList;
