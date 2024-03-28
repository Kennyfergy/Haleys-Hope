import { useParams, useHistory } from "react-router-dom";
import { useEffect, useReducer } from "react";
import { useDispatch, useSelector } from "react-redux";
import { formatDate } from "../../lib/utils";
import MiniStudentCard from "../Cards/MiniStudentCard";
import WistETable from "../WistTables/WistETable";
import PrintButton from "../PrintButton/PrintButton";
import {
  Button,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Paper,
  Typography,
} from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import MicroStudentCard from "..//Cards/MicroStudentCard";
import PrintButton2 from "../PrintButton/PrintButton2";
import DescriptiveTable from "../DescriptiveTable/DescriptiveTable";

import { GetCompositeScoreDescription } from "../../lib/GetCompositeScoreDescription";

const ElementaryWistResults = () => {
  const testId = useParams();
  const dispatch = useDispatch();
  const history = useHistory();
  const examiners = useSelector((store) => store.allUsersReducer.users);

  useEffect(() => {
    dispatch({ type: "FETCH_ELEMENTARY_WIST_RESULTS", payload: testId.id });
  }, [dispatch]);

  const selectedTest = useSelector(
    (store) => store.elementaryWistReducer.selectedTest[0]
  );
  if (!selectedTest || Object.keys(selectedTest).length === 0) {
    return <h1>Loading...</h1>;
  }
  // Find the examiner based on examiner_id
  const examiner = examiners.find(
    (user) => user.id === selectedTest.examiner_id
  );

  const goBack = () => history.push(`/students/${selectedTest.student_id}`);

  return (
    <div style={{ padding: "20px" }}>
      <div style={{ display: "flex" }}>
        <Button
          className="noPrint"
          variant="contained"
          color="primary"
          onClick={goBack}
          style={{ marginRight: "20px" }}
        >
          Back to Tests List
        </Button>
        <PrintButton2 />
      </div>
      {/* <h1 className="text-3xl text-center mb-4">WIST Age 7-11 Results </h1> */}
      <h1 className="text-4xl test-name-print font-bold text-center text-primary-500 my-4">
        <img
          src="/assets/images/site-logo.png"
          width={180}
          height={180}
          className="logo-image print-logo"
          alt="Haley's Hope Logo"
        />{" "}
        WIST Age 7-11 Results{" "}
      </h1>

      <div style={{ display: "flex", justifyContent: "center", gap: "50px" }}>
        <div
          style={{
            display: "flex",
            justifyContent: "center",

            alignItems: "center",
            marginBottom: "20px",
          }}
        >
          <div className="screen-view">
            <MiniStudentCard />
          </div>
          <div className="print-view">
            <MicroStudentCard />
          </div>{" "}
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
              <Typography variant="h6" style={{ marginBottom: "0px" }}>
                Date: {formatDate(selectedTest.date)} &nbsp;
              </Typography>

              {/* {examiner ? (
                <Typography variant="h6" style={{ marginBottom: "10px" }}>
                  Examiner: {examiner.first_name} {examiner.last_name}
                </Typography>
              ) : (
                <Typography variant="h6" style={{ marginBottom: "10px" }}>
                  Examiner ID: {selectedTest.examiner_id}
                </Typography>
              )} */}
              <Typography variant="h6" style={{ marginBottom: "10px" }}>
                Grade Given: {selectedTest.grade} &nbsp;
              </Typography>
            </div>
          </Paper>
        </div>
      </div>
      {/* <div
        style={{
          display: "flex",
          alignItems: "flexStart",
          justifyContent: "left",
          paddingLeft: "150px",
        }}
      ></div> */}
      <div
        style={{
          display: "flex",
          gap: "350px",
          justifyContent: "center",
          // paddingRight: "150px",
        }}
      >
        <h2
          className="noPrint"
          style={{
            textAlign: "center",

            fontWeight: "bold",
            fontSize: "20px",
          }}
        >
          Record of Scores: Norm-Referenced Assessment
        </h2>
        <div>
          <Button
            className="noPrint"
            variant="contained"
            color="primary"
            onClick={() =>
              history.push(`/EditElementaryWistResults/${selectedTest.id}`)
            }
            // style={{ marginTop: "20px", marginRight: "50px" }}
          >
            <EditIcon /> &nbsp; Edit Test
          </Button>
        </div>
      </div>
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          marginTop: "10px",
        }}
      >
        <Paper
          style={{
            width: "100%",
            maxWidth: "1000px",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <Table size="small">
            <TableHead>
              <TableRow style={{ backgroundColor: "lightgrey" }}>
                <TableCell
                  style={{
                    fontWeight: "bold",
                    fontSize: "16px",
                    textAlign: "center",
                  }}
                >
                  Assessment Area
                </TableCell>
                <TableCell
                  align="right"
                  style={{
                    fontWeight: "bold",
                    fontSize: "16px",
                    textAlign: "center",
                  }}
                >
                  Raw Score
                </TableCell>
                <TableCell
                  align="right"
                  style={{
                    fontWeight: "bold",
                    fontSize: "16px",
                    textAlign: "center",
                  }}
                >
                  Percentile Rank
                </TableCell>
                <TableCell
                  align="right"
                  style={{
                    fontWeight: "bold",
                    fontSize: "16px",
                    textAlign: "center",
                  }}
                >
                  Standard Score
                </TableCell>
                <TableCell
                  align="right"
                  style={{
                    fontWeight: "bold",
                    fontSize: "16px",
                    textAlign: "center",
                  }}
                >
                  Descriptive Rating
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              <TableRow>
                <TableCell>Read Regular Words</TableCell>
                <TableCell align="center">
                  {selectedTest.read_regular_words_descriptor}&nbsp;
                  {selectedTest.read_regular_words}
                </TableCell>
                <TableCell align="center">-</TableCell>
                <TableCell align="center">-</TableCell>
                <TableCell align="center">-</TableCell>
              </TableRow>
              <TableRow>
                <TableCell>Read Irregular Words</TableCell>
                <TableCell align="center">
                  {selectedTest.read_irregular_words_descriptor}&nbsp;
                  {selectedTest.read_irregular_words}
                </TableCell>
                <TableCell align="center" style={{ fontWeight: "bold" }}>
                  -
                </TableCell>
                <TableCell align="center">-</TableCell>
                <TableCell align="center">-</TableCell>
              </TableRow>
              <TableRow
                style={{ fontWeight: "bold", backgroundColor: "#F5F5F5" }}
              >
                <TableCell style={{ fontWeight: "bold" }}>
                  Word Identification
                </TableCell>
                <TableCell align="center" style={{ fontWeight: "bold" }}>
                  {selectedTest.word_identification}
                </TableCell>
                <TableCell align="center" style={{ fontWeight: "bold" }}>
                  {selectedTest.word_identification_percentile}
                </TableCell>
                <TableCell align="center" style={{ fontWeight: "bold" }}>
                  {selectedTest.word_identification_percentile}
                </TableCell>
                <TableCell align="center" style={{ fontWeight: "bold" }}>
                  <GetCompositeScoreDescription
                    compositeScore={
                      selectedTest.word_identification_standard_score
                    }
                  />
                </TableCell>
              </TableRow>
              <TableRow>
                <TableCell>Spell Regular Words</TableCell>
                <TableCell align="center">
                  {selectedTest.spell_regular_words_descriptor}&nbsp;
                  {selectedTest.spell_regular_words}
                </TableCell>
                <TableCell align="center">-</TableCell>
                <TableCell align="center">-</TableCell>
                <TableCell align="center">-</TableCell>
              </TableRow>
              <TableRow>
                <TableCell>Spell Irregular Words</TableCell>
                <TableCell align="center">
                  {selectedTest.spell_irregular_words_descriptor}&nbsp;
                  {selectedTest.spell_irregular_words}
                </TableCell>
                <TableCell align="center">-</TableCell>
                <TableCell align="center">-</TableCell>
                <TableCell align="center">-</TableCell>
              </TableRow>
              <TableRow
                style={{ fontWeight: "bold", backgroundColor: "#F5F5F5" }}
              >
                <TableCell style={{ fontWeight: "bold" }}>Spelling</TableCell>
                <TableCell align="center" style={{ fontWeight: "bold" }}>
                  {selectedTest.spelling}
                </TableCell>
                <TableCell align="center" style={{ fontWeight: "bold" }}>
                  {selectedTest.spelling_percentile}
                </TableCell>
                <TableCell align="center" style={{ fontWeight: "bold" }}>
                  {selectedTest.spelling_standard_score}
                </TableCell>
                <TableCell align="center" style={{ fontWeight: "bold" }}>
                  <GetCompositeScoreDescription
                    compositeScore={selectedTest.spelling_standard_score}
                  />
                </TableCell>
              </TableRow>
              <TableRow>
                <TableCell>Word Identification</TableCell>
                <TableCell align="center">
                  {selectedTest.word_identification}
                </TableCell>
                <TableCell align="center">-</TableCell>
                <TableCell align="center">-</TableCell>
                <TableCell align="center">-</TableCell>
              </TableRow>
              <TableRow>
                <TableCell>Spelling</TableCell>
                <TableCell align="center">{selectedTest.spelling}</TableCell>
                <TableCell align="center">-</TableCell>
                <TableCell align="center">-</TableCell>
                <TableCell align="center">-</TableCell>
              </TableRow>
              <TableRow
                style={{ fontWeight: "bold", backgroundColor: "#F5F5F5" }}
              >
                <TableCell style={{ fontWeight: "bold" }}>
                  Fundamental Literacy Ability Index
                </TableCell>
                <TableCell align="center" style={{ fontWeight: "bold" }}>
                  {selectedTest.fundamental_literacy}
                </TableCell>
                <TableCell align="center" style={{ fontWeight: "bold" }}>
                  {selectedTest.fundamental_literacy_percentile}
                </TableCell>
                <TableCell align="center" style={{ fontWeight: "bold" }}>
                  {selectedTest.fundamental_literacy_standard_score}
                </TableCell>
                <TableCell align="center" style={{ fontWeight: "bold" }}>
                  <GetCompositeScoreDescription
                    compositeScore={
                      selectedTest.fundamental_literacy_standard_score
                    }
                  />
                </TableCell>
              </TableRow>
              <TableRow>
                <TableCell>Pseudo Words</TableCell>
                <TableCell align="center">
                  {selectedTest.pseudo_words_descriptor}&nbsp;
                  {selectedTest.pseudo_words}
                </TableCell>
                <TableCell align="center">-</TableCell>
                <TableCell align="center">-</TableCell>
                <TableCell align="center">-</TableCell>
              </TableRow>
              <TableRow>
                <TableCell>Letter Sounds</TableCell>
                <TableCell align="center">
                  {selectedTest.letter_sounds_descriptor}&nbsp;
                  {selectedTest.letter_sounds}
                </TableCell>
                <TableCell align="center">-</TableCell>
                <TableCell align="center">-</TableCell>
                <TableCell align="center">-</TableCell>
              </TableRow>
              <TableRow
                style={{ fontWeight: "bold", backgroundColor: "#F5F5F5" }}
              >
                <TableCell style={{ fontWeight: "bold" }}>
                  Sound Symbol Knowledge
                </TableCell>
                <TableCell align="center" style={{ fontWeight: "bold" }}>
                  {selectedTest.sound_symbol_knowledge}
                </TableCell>
                <TableCell align="center" style={{ fontWeight: "bold" }}>
                  {selectedTest.sound_symbol_knowledge_percentile}
                </TableCell>
                <TableCell align="center" style={{ fontWeight: "bold" }}>
                  {selectedTest.sound_symbol_knowledge_standard_score}
                </TableCell>
                <TableCell align="center" style={{ fontWeight: "bold" }}>
                  <GetCompositeScoreDescription
                    compositeScore={
                      selectedTest.sound_symbol_knowledge_standard_score
                    }
                  />
                </TableCell>
              </TableRow>
              {/* Repeat for other test items */}
              {/* ... */}
            </TableBody>
          </Table>
        </Paper>
      </div>
      <DescriptiveTable />
      <div style={{ breakBefore: "page" }}></div>

      <h2
        className="break .print-margin"
        style={{
          textAlign: "center",
          fontWeight: "bold",
          fontSize: "20px",
          marginTop: "75px",
        }}
      >
        Record of Informal Assessment
      </h2>
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          marginTop: "30px",
        }}
      >
        <WistETable test={selectedTest} />
      </div>
    </div>
  );
};

export default ElementaryWistResults;
