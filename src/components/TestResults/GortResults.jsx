import { useParams, useHistory } from "react-router-dom";
import { useEffect, useReducer } from "react";
import { useDispatch, useSelector } from "react-redux";
import { formatDate } from "../../lib/utils";
import MiniStudentCard from "../Cards/MiniStudentCard";
import { Button, Table, TableBody, TableCell, TableHead, TableRow, Paper, Typography } from "@mui/material";
import { GetCompositeScoreDescription } from "../../lib/GetCompositeScoreDescription";
import { GetScaledScoreDescription } from "../../lib/GetScaledScoreDescription";
import EditIcon from "@mui/icons-material/Edit";

const GortResults = () => {
  const testId = useParams();
  const dispatch = useDispatch();
  const history = useHistory();
  const examiners = useSelector((store) => store.allUsersReducer.users);

  useEffect(() => {
    console.log("useEffect selected test, expect empty", selectedTest);
    dispatch({ type: "FETCH_GORT_RESULTS", payload: testId.id });
    console.log("GORT TEST ID", testId);
  }, [dispatch]);

  const selectedTest = useSelector((store) => store.gortReducer.selectedTest[0]);

  if (!selectedTest || Object.keys(selectedTest).length === 0) {
    return <h1>Loading...</h1>;
  }

  // Find the examiner based on examiner_id
  const examiner = examiners.find((user) => user.id === selectedTest.examiner_id);

  const goBack = () => history.push(`/students/${selectedTest.student_id}`);

  return (
    <div style={{ padding: "20px" }}>
      <Button variant="contained" color="primary" onClick={goBack} style={{ marginRight: "20px" }}>
        Back to Tests List
      </Button>
      {/* <h1 className="text-3xl text-center mb-4">Gort Results </h1> */}
      <h1 className="text-4xl font-bold text-center text-primary-500 my-4">GORT Results </h1>

      <div style={{ display: "flex", justifyContent: "center", gap: "50px" }}>
        <div
          style={{
            display: "flex",
            justifyContent: "center",

            alignItems: "center",
            marginBottom: "20px",
          }}
        >
          <MiniStudentCard />
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
              <Typography variant="h6" style={{ marginBottom: "10px" }}>
                Date: {formatDate(selectedTest.date)} &nbsp;
              </Typography>

              {examiner ? (
                <Typography variant="h6" style={{ marginBottom: "10px" }}>
                  Examiner: {examiner.first_name} {examiner.last_name}
                </Typography>
              ) : (
                <Typography variant="h6" style={{ marginBottom: "10px" }}>
                  Examiner ID: {selectedTest.examiner_id}
                </Typography>
              )}
              <Typography variant="h6" style={{ marginBottom: "10px" }}>
                Grade When Test Given: {selectedTest.grade} &nbsp;
              </Typography>
            </div>
          </Paper>
        </div>
      </div>
      <div
        style={{
          display: "flex",
          gap: "350px",
          justifyContent: "center",
          // paddingRight: "150px",
        }}
      >
        <h2
          style={{
            textAlign: "center",

            fontWeight: "bold",
            fontSize: "20px",
          }}
        >
          Performance Summary
        </h2>
        <div>
          <Button
            variant="contained"
            color="primary"
            onClick={() => history.push(`/EditGortResults/${selectedTest.id}`)}
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
          <Table>
            <TableHead>
              <TableRow style={{ backgroundColor: "lightgrey" }}>
                <TableCell style={{ fontWeight: "bold", fontSize: "16px" }}>Assessment Area</TableCell>
                <TableCell align="right" style={{ fontWeight: "bold", fontSize: "16px" }}>
                  Raw Total
                </TableCell>
                <TableCell align="right" style={{ fontWeight: "bold", fontSize: "16px" }}>
                  Percentile Rank
                </TableCell>
                <TableCell align="right" style={{ fontWeight: "bold", fontSize: "16px" }}>
                  Scaled Score
                </TableCell>
                <TableCell align="right" style={{ fontWeight: "bold", fontSize: "16px" }}>
                  Descriptive Term
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              <TableRow>
                <TableCell>Rate Raw Total</TableCell>
                <TableCell align="right">{selectedTest.rate_raw_total}</TableCell>
                <TableCell align="right">{selectedTest.rate_percentile_rank}</TableCell>
                <TableCell align="right">{selectedTest.rate_scaled_score}</TableCell>
                <TableCell align="right" style={{ fontWeight: "bold" }}>
                  <GetScaledScoreDescription scaledScore={selectedTest.rate_scaled_score} />
                </TableCell>
              </TableRow>
              <TableRow>
                <TableCell>Accuracy Raw Total</TableCell>
                <TableCell align="right">{selectedTest.accuracy_raw_total}</TableCell>
                <TableCell align="right">{selectedTest.accuracy_percentile_rank}</TableCell>
                <TableCell align="right">{selectedTest.accuracy_scaled_score}</TableCell>
                <TableCell align="right" style={{ fontWeight: "bold" }}>
                  <GetScaledScoreDescription scaledScore={selectedTest.accuracy_scaled_score} />
                </TableCell>
              </TableRow>
              <TableRow>
                <TableCell>Fluency Raw Total</TableCell>
                <TableCell align="right">{selectedTest.fluency_raw_total}</TableCell>
                <TableCell align="right">{selectedTest.fluency_percentile_rank}</TableCell>
                <TableCell align="right">{selectedTest.fluency_scaled_score}</TableCell>
                <TableCell align="right" style={{ fontWeight: "bold" }}>
                  <GetScaledScoreDescription scaledScore={selectedTest.fluency_scaled_score} />
                </TableCell>
              </TableRow>
              <TableRow>
                <TableCell>Comprehension Raw Total</TableCell>
                <TableCell align="right">{selectedTest.comprehension_raw_total}</TableCell>
                <TableCell align="right">{selectedTest.comprehension_percentile_rank}</TableCell>
                <TableCell align="right">{selectedTest.comprehension_scaled_score}</TableCell>
                <TableCell align="right" style={{ fontWeight: "bold" }}>
                  <GetScaledScoreDescription scaledScore={selectedTest.comprehension_scaled_score} />
                </TableCell>
              </TableRow>
            </TableBody>
          </Table>
          <Typography variant="h6" align="center" style={{ marginBottom: "10px", marginTop: "10px" }}>
            Summary
          </Typography>
          <Table>
            <TableHead
              style={{
                backgroundColor: "#e0e0e0",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <TableRow>
                <TableCell align="center">Sum of Scaled Score</TableCell>
                <TableCell align="center">Oral Reading %ile Rank</TableCell>
                <TableCell align="center">Oral Reading Index (ORI)</TableCell>
                <TableCell align="center">Descriptive Term</TableCell>
              </TableRow>
            </TableHead>
            <TableRow>
              <TableCell align="center">{selectedTest.sum_scaled_score}</TableCell>
              <TableCell align="center">{selectedTest.oral_reading_percentile_rank}</TableCell>
              <TableCell align="center">{selectedTest.oral_reading_index}</TableCell>
              <TableCell align="center" style={{ fontWeight: "bold" }}>
                <GetCompositeScoreDescription compositeScore={selectedTest.oral_reading_index} />
              </TableCell>
            </TableRow>
          </Table>
        </Paper>
      </div>
    </div>
  );
};

export default GortResults;
