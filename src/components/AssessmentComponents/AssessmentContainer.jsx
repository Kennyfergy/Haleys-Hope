import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { formatDate } from "../../lib/utils";
import { useParams, useHistory } from "react-router-dom/";
import AssessmentGort from "./AssessmentGort";
import AssessmentCtoppE from "./AssessmentCtoppE";
import AssessmentCtoppS from "./AssessmentCtoppS";
import AssessmentWistE from "./AssessmentWistE";
import AssessmentWistS from "./AssessmentWistS";
import { Button } from "../ui/button";
import MicroStudentCard from "../Cards/MicroStudentCard";
import { Paper, Typography } from "@mui/material";
import PrintButton from "../PrintButton/PrintButton";
import CombinedGraph from "../Graph/CombinedGraph";

const AssessmentContainer = () => {
  const { date } = useParams();
  const allGort = useSelector((store) => store.gortReducer.list);
  const allCtoppY = useSelector((store) => store.youngerCtoppReducer.list);
  const allCtoppO = useSelector((store) => store.olderCtoppReducer.list);
  const allWistE = useSelector((store) => store.elementaryWistReducer.list);
  const allWistS = useSelector((store) => store.secondaryWistReducer.list);
  console.log("allwistE", allWistE);
  console.log("assessment date", date);
  const selectedTest = useSelector((store) => store);
  console.log(selectedTest);
  useEffect(() => {}, []);
  const history = useHistory();
  const goBack = () => history.goBack();

  const transformedData = allCtoppO?.map((test) => ({
    date: test.date,
    phonological_awareness_percentile: test.phonological_awareness_percentile,
    phonological_memory_percentile: test.phonological_memory_percentile,
    rapid_symbolic_naming_percentile: test.rapid_symbolic_naming_percentile,
    word_identification_percentile: test.word_identification_percentile,
    spelling_percentile: test.spelling_percentile,
    fundamental_literacy_percentile: test.fundamental_literacy_percentile,
  }));
  const youngerCtopp = allCtoppY?.map((test) => ({
    date: test.date,
    phonological_awareness_percentile: test.phonological_awareness_percentile,
    phonological_memory_percentile: test.phonological_memory_percentile,
    rapid_symbolic_naming_percentile: test.rapid_symbolic_naming_percentile,
    word_identification_percentile: test.word_identification_percentile,
    spelling_percentile: test.spelling_percentile,
    fundamental_literacy_percentile: test.fundamental_literacy_percentile,
  }));

  const elwistData = allWistE?.map((test) => ({
    date: test.date,
    word_identification_percentile: test.word_identification_percentile,
    spelling_percentile: test.spelling_percentile,
    fundamental_literacy_percentile: test.fundamental_literacy_percentile,
    sound_symbol_knowledge_percentile: test.sound_symbol_knowledge_percentile,
  }));

  const wistData = allWistS?.map((test) => ({
    date: test.date,
    word_identification_percentile: test.word_identification_percentile,
    spelling_percentile: test.spelling_percentile,
    fundamental_literacy_percentile: test.fundamental_literacy_percentile,
    sound_symbol_knowledge_percentile: test.sound_symbol_knowledge_percentile,
  }));
  const gortData = allGort?.map((test) => ({
    date: test.date,
    rate_percentile_rank: test.rate_percentile_rank,
    accuracy_percentile_rank: test.accuracy_percentile_rank,
    fluency_percentile_rank: test.fluency_percentile_rank,
    comprehension_percentile_rank: test.comprehension_percentile_rank,
    oral_reading_percentile_rank: test.oral_reading_percentile_rank,
  }));
  return (
    <>
    
      <div style={{ display: "flex" }}>

        {/* FIGURE OUT HOW TO GET BACK TO THE STUDENT DETAIL VIEW */}
        <Button
          onClick={goBack}
          variant="outline"
          className=" text-xs px-2 py-1 col-span-1 lg:col-span-5 bg-primary-500 hover:bg-primary-100 text-white font-bold rounded focus:outline-none focus:shadow-outline m-2 transition duration-300 ease-in-out flex items-center justify-center space-x-2 noPrint"
        >
          Back to Student
        </Button>
        <PrintButton />
        
      </div>
      <img
            src="/assets/images/site-logo.png"
            width={180}
            height={180}
            className="logo-image print-logo"
            alt="Haley's Hope Logo"
          />
      <div style={{ display: "flex", justifyContent: "center", gap: "50px" }}>
        
        <div
          style={{
            display: "flex",
            justifyContent: "center",

            alignItems: "center",
            marginBottom: "20px",
          }}
        >
          <MicroStudentCard />
        </div>
        <div>
          <Paper
            style={{
              fontSize: "18px",
              alignItems: "center",
              justifyContent: "center",

              padding: "10px",
              maxWidth: "400px",
              backgroundColor: "#fff",
              borderRadius: "8px",
              boxShadow: "0 2px 10px rgba(0, 0, 0, 0.1)",
            }}
          >
            <div
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                flexDirection: "column",
                padding: "28px",
              }}
            >
              <Typography variant="h6" style={{ marginBottom: "10px", textAlign: "center" }}>
                Date of Assessment: <br /> {formatDate(date)} &nbsp;
              </Typography>
            </div>
          </Paper>
        </div>
      </div>
      <div className="assessmentContainer">
        <div className="assessmentCards">
          <AssessmentCtoppE />
        </div>{" "}
        <div className="assessmentCards">
          <AssessmentCtoppS />
        </div>{" "}
        <div className="assessmentCards">
          <AssessmentWistE />
        </div>{" "}
        <div className="assessmentCards">
          <AssessmentWistS />
        </div>{" "}
        <div className="assessmentCards">
          <AssessmentGort />
        </div>
        <CombinedGraph
          wistData={wistData}
          olderCtoppData={transformedData}
          gort5Data={gortData}
          elwistData={elwistData}
          youngerCtoppData={youngerCtopp}
        />
      </div>
    </>
  );
};
export default AssessmentContainer;
