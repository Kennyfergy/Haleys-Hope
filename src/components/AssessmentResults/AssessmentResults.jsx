import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { formatDate } from "../../lib/utils";
import { useParams, useHistory } from "react-router-dom/";
import { Button } from "../ui/button";
import {
  Table,
  TableHead,
  TableBody,
  TableRow,
  TableCell,
  Typography,
} from "@mui/material";
import CombinedGraph from "../Graph/CombinedGraph";

const AssessmentResults = () => {
  const olderAssessment = useSelector(
    (store) => store.assessmentReducer.olderAssessment
  );
  const youngerAssessment = useSelector(
    (store) => store.assessmentReducer.youngerAssessment
  );
  const history = useHistory();

  console.log("younger assessment ", youngerAssessment);
  console.log("older assessment ", olderAssessment);

  const studentId = useParams();
  const dispatch = useDispatch();
  useEffect(() => {
    console.log("theStudentId ISSSS", studentId.id);
  }, []);
  // NEW CODE TO FIX ASSESSMENTS!!!!!
  const allGort = useSelector((store) => store.gortReducer.list);
  const allCtoppY = useSelector((store) => store.youngerCtoppReducer.list);
  const allCtoppO = useSelector((store) => store.olderCtoppReducer.list);
  const allWistE = useSelector((store) => store.elementaryWistReducer.list);
  const allWistS = useSelector((store) => store.secondaryWistReducer.list);

  const moreDetails = (test) => {
    console.log("this is not a test", test);
    history.push(`/AssessmentResults/${test.date}`);
  };
  // Create an object to group assessments by date
  const groupedAssessments = {};

  // Combine assessments from Gort and Wist
  const allAssessments = [];
  if (allGort) {
    allAssessments.push(...allGort);
  }

  if (allWistE) {
    allAssessments.push(...allWistE);
  }

  if (allWistS) {
    allAssessments.push(...allWistS);
  }

  if (allCtoppO) {
    allAssessments.push(...allCtoppO);
  }

  if (allCtoppY) {
    allAssessments.push(...allCtoppY);
  }

  // Group assessments by date
  allAssessments.forEach((assessment) => {
    const dateKey = formatDate(assessment.date);

    if (!groupedAssessments[dateKey]) {
      groupedAssessments[dateKey] = [];
    }

    groupedAssessments[dateKey].push(assessment);
  });

  console.log("Grouped assessments", groupedAssessments);

  

  // map through all of the tests and based on date add to a new object. then
  // pass each test.id to component to render that section of the assessment?
  return (
    <div>
    
      <div>
        <Table>
          {Object.keys(groupedAssessments).map((dateKey) => (
            <div key={dateKey}>
              {groupedAssessments[dateKey].length > 0 && (
                <TableRow>
                  <TableCell>Assessment Date: {dateKey}</TableCell>
                  <TableCell>
                    <Button
                      variant="outline"
                      className=" text-xs px-2 py-1 col-span-1 lg:col-span-5 bg-primary-500 hover:bg-primary-100 text-white font-bold rounded focus:outline-none focus:shadow-outline m-2 transition duration-300 ease-in-out flex items-center justify-center space-x-2"
                      onClick={() =>
                        moreDetails(groupedAssessments[dateKey][0])
                      }
                    >
                      Details
                    </Button>
                  </TableCell>
                  {groupedAssessments[dateKey].map((test) => (
                    <div key={test.id}>
                      <p></p>
                    </div>
                  ))}
                </TableRow>
              )}
            </div>
          ))}
        </Table>
      </div>
      
    </div>
  );
};

export default AssessmentResults;
