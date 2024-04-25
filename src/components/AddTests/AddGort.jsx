import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  useHistory,
  useParams,
} from "react-router-dom/cjs/react-router-dom.min";
import {
  TextField,
  Button,
  Grid,
  FormControl,
  FormLabel,
  Paper,
  InputLabel,
  Select,
  MenuItem,
  Table,
  TableRow,
  TableCell,
} from "@mui/material";

//component to add a new Gort test
const AddGort = () => {
  const dispatch = useDispatch();
  const history = useHistory();
  const student = useParams();
  const studentGrade = useSelector(
    (store) => store.studentReducer.Details.grade
  );

  const users = useSelector((store) => store.allUsersReducer.users);

  const [validationErrors, setValidationErrors] = useState({
    //state for validation errors
    date: "",
    examiner_id: "",
  });

  const [selectedExaminerId, setSelectedExaminerId] = useState("");

  useEffect(() => {
    if (student) {
      dispatch({ type: "FETCH_STUDENT", payload: student });
    }
  });
  useEffect(() => {
    dispatch({ type: "FETCH_USERS" });
  });
  useEffect(() => {
    handleGoBack;
  });

  const [newGort, setNewGort] = useState({
    student_id: student.id,
    date: "",
    grade: studentGrade,
    examiner_id: "",
    sum_scaled_score: null,
    oral_reading_percentile_rank: null,
    oral_reading_index: null,
    rate_raw_total: null,
    accuracy_raw_total: null,
    fluency_raw_total: null,
    rate_percentile_rank: null,
    accuracy_percentile_rank: null,
    fluency_percentile_rank: null,
    comprehension_percentile_rank: null,
    comprehension_raw_total: null,
    rate_scaled_score: null,
    accuracy_scaled_score: null,
    fluency_scaled_score: null,
    comprehension_scaled_score: null,
    ori_descriptor: null,
  });

  const handleExaminerChange = (event) => {
    const examinerId = event.target.value;
    setSelectedExaminerId(examinerId);
    setNewGort((prevGort) => ({
      ...prevGort,
      examiner_id: examinerId,
    }));
  };

  const handleGoBack = () => {
    history.push(`/students/${student.id}`);
  };

  //function to handle inputs changing
  const handleChange = (e) => {
    const { name, value } = e.target; // Destructure the name and value from the event target

    setValidationErrors((prevErrors) => {
      const newErrors = { ...prevErrors };

      return newErrors;
    });
    // setNewGort((prevCtopp) => ({
    //   ...prevCtopp,
    //   [name]: value === "" ? null : Number(value),
    // }));
    // setNewGort((prevGort) => ({
    //   ...prevGort,
    //   [name]: value, // Use computed property name to update the state
    // }));
    setNewGort((prevGort) => {
      // Update values based on input type
      let updatedValue;

      if (name === "date") {
        updatedValue = value; // For non-numeric fields like date
      } else {
        updatedValue = value === "" ? null : Number(value); // Convert to number for numeric fields
      }

      const updatedValues = {
        ...prevGort,
        [name]: updatedValue, //Changed updatedValue to just value
      };

      // Update sum scaled score for relevant changes
      if (
        ["fluency_scaled_score", "comprehension_scaled_score"].includes(name)
      ) {
        const sum = [
          "fluency_scaled_score",
          "comprehension_scaled_score",
        ].reduce((acc, field) => acc + (updatedValues[field] || 0), 0); // Calculate sum

        updatedValues.sum_scaled_score = sum; // Update sum scaled score
      }

      return updatedValues;
    });
  };

  //function to handle click of submit button
  const handleSubmit = (e) => {
    e.preventDefault();
    // Validate all inputs before submission
    const newErrors = {};
    if (!newGort.date) {
      newErrors.date = "Date is required";
    } else if (new Date(newGort.date) > new Date()) {
      newErrors.date = "Date cannot be in the future";
    }

    if (!newGort.examiner_id) {
      newErrors.examiner_id = "Examiner is required";
    }

    setValidationErrors(newErrors);

    // Check if there are any errors
    if (Object.keys(newErrors).length > 0) {
      console.log("Validation failed");
      return;
    }

    // Ensure the examiner_id is updated
    const submissionData = {
      ...newGort,
      examiner_id: selectedExaminerId,
    };
    console.log("this is the new gort!!!!!", newGort);
    console.log("!!!!!!!!Submission data", submissionData);
    dispatch({
      type: "ADD_GORT",
      payload: submissionData,
    });
    dispatch({
      type: "SHOW_SNACKBAR",
      payload: { message: "Test added", severity: "success" },
    });

    history.push(`/students/${student.id}`);
    //history.push back to student details
  };

  return (
    <>
      <Button variant="outlined" onClick={handleGoBack} className="mb-4">
        GO BACK
      </Button>
      <h1 className="text-4xl font-bold text-center text-primary-500 my-4">
        Add GORT{" "}
      </h1>
      {/* PROTOTYPE TABLE STARTS HERE!!!!!!!!!!!!!!!!!!!!!!!!!!!! */}

      <Paper elevation={3} className="p-8">
      <form onSubmit={handleSubmit} className="space-y-6">

        <Table size="small">
          <TableRow>
            <TableCell>
              <FormControl fullWidth>
                <FormLabel>Date:</FormLabel>
                <TextField
                  type="date"
                  id="date"
                  name="date"
                  value={newGort.date}
                  onChange={handleChange}
                  variant="outlined"
                />
                {validationErrors.date && (
                  <div className="text-red-500 text-xs italic">
                    {validationErrors.date}
                  </div>
                )}
              </FormControl>
            </TableCell>
            <TableCell>
              <FormControl fullWidth>
                <FormLabel>Grade:</FormLabel>
                <TextField
                  type="number"
                  id="grade"
                  name="grade"
                  value={newGort.grade}
                  onChange={handleChange}
                  variant="outlined"
                />
              </FormControl>
            </TableCell>
            <TableCell>
              <FormControl fullWidth>
                <FormLabel>Examiner</FormLabel>
                <Select
                  value={selectedExaminerId}
                  onChange={handleExaminerChange}
                >
                  {users.map((user) => (
                    <MenuItem key={user.id} value={user.id}>
                      {user.first_name} {user.last_name}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </TableCell>
          </TableRow>
          <TableRow>
            <TableCell>GORT-5</TableCell>
          </TableRow>
          <TableRow>
            <TableCell>Assessment Area</TableCell>
            <TableCell>Raw Score</TableCell>
            <TableCell>Percentile</TableCell>
            <TableCell>Scaled Score</TableCell>
          </TableRow>
          <TableRow>
            <TableCell>Rate</TableCell>
            <TableCell>
              <FormControl fullWidth>
                <FormLabel>Rate Raw Total:</FormLabel>
                <TextField
                  type="number"
                  id="rate_raw_total"
                  name="rate_raw_total"
                  value={newGort.rate_raw_total}
                  onChange={handleChange}
                  variant="outlined"
                />
              </FormControl>{" "}
            </TableCell>
            <TableCell>
              <FormControl fullWidth>
                <FormLabel>Rate Percentile Rank:</FormLabel>
                <TextField
                  type="number"
                  id="rate_percentile_rank"
                  name="rate_percentile_rank"
                  value={newGort.rate_percentile_rank}
                  onChange={handleChange}
                  variant="outlined"
                />
              </FormControl>
            </TableCell>
            <TableCell>
              <FormControl fullWidth>
                <FormLabel>Rate Scaled Score:</FormLabel>
                <TextField
                  type="number"
                  id="rate_scaled_score"
                  name="rate_scaled_score"
                  value={newGort.rate_scaled_score}
                  onChange={handleChange}
                  variant="outlined"
                />
              </FormControl>
            </TableCell>
          </TableRow>
          <TableRow>
            <TableCell>Accuracy</TableCell>
            <TableCell>
              <FormControl fullWidth>
                <FormLabel>Accuracy Raw Total:</FormLabel>
                <TextField
                  type="number"
                  id="accuracy_raw_total"
                  name="accuracy_raw_total"
                  value={newGort.accuracy_raw_total}
                  onChange={handleChange}
                  variant="outlined"
                />
              </FormControl>
            </TableCell>
            <TableCell>
              <FormControl fullWidth>
                <FormLabel>Accuracy Percentile Rank:</FormLabel>
                <TextField
                  type="number"
                  id="accuracy_percentile_rank"
                  name="accuracy_percentile_rank"
                  value={newGort.accuracy_percentile_rank}
                  onChange={handleChange}
                  variant="outlined"
                />
              </FormControl>
            </TableCell>
            <TableCell>
              <FormControl fullWidth>
                <FormLabel>Accuracy Scaled Score:</FormLabel>
                <TextField
                  type="number"
                  id="accuracy_scaled_score"
                  name="accuracy_scaled_score"
                  value={newGort.accuracy_scaled_score}
                  onChange={handleChange}
                  variant="outlined"
                />
              </FormControl>
            </TableCell>
          </TableRow>
          <TableRow>
            <TableCell>Fluency</TableCell>
            <TableCell>
              <FormControl fullWidth>
                <FormLabel>Fluency Raw Total:</FormLabel>
                <TextField
                  type="number"
                  id="fluency_raw_total"
                  name="fluency_raw_total"
                  value={newGort.fluency_raw_total}
                  onChange={handleChange}
                  variant="outlined"
                />
              </FormControl>
            </TableCell>
            <TableCell>
              <FormControl fullWidth>
                <FormLabel>Fluency Percentile Rank:</FormLabel>
                <TextField
                  type="number"
                  id="fluency_percentile_rank"
                  name="fluency_percentile_rank"
                  value={newGort.fluency_percentile_rank}
                  onChange={handleChange}
                  variant="outlined"
                />
              </FormControl>
            </TableCell>
            <TableCell>
              <FormControl fullWidth>
                <FormLabel>Fluency Scaled Score:</FormLabel>
                <TextField
                  type="number"
                  id="fluency_scaled_score"
                  name="fluency_scaled_score"
                  value={newGort.fluency_scaled_score}
                  onChange={handleChange}
                  variant="outlined"
                />
              </FormControl>
            </TableCell>
          </TableRow>
          <TableRow>
            <TableCell>Comprehension</TableCell>
            <TableCell>
              <FormControl fullWidth>
                <FormLabel>Comprehension Raw Total:</FormLabel>
                <TextField
                  type="number"
                  id="comprehension_raw_total"
                  name="comprehension_raw_total"
                  value={newGort.comprehension_raw_total}
                  onChange={handleChange}
                  variant="outlined"
                />
              </FormControl>
            </TableCell>
            <TableCell>
              <FormControl fullWidth>
                <FormLabel>Comprehension Percentile Rank:</FormLabel>
                <TextField
                  type="number"
                  id="comprehension_percentile_rank"
                  name="comprehension_percentile_rank"
                  value={newGort.comprehension_percentile_rank}
                  onChange={handleChange}
                  variant="outlined"
                />
              </FormControl>
            </TableCell>
            <TableCell>
              <FormControl fullWidth>
                <FormLabel>Comprehension Scaled Score:</FormLabel>
                <TextField
                  type="number"
                  id="comprehension_scaled_score"
                  name="comprehension_scaled_score"
                  value={newGort.comprehension_scaled_score}
                  onChange={handleChange}
                  variant="outlined"
                />
              </FormControl>
            </TableCell>
          </TableRow>
          <TableRow></TableRow>
          <TableRow>
          <TableCell>
          
          </TableCell>
            <TableCell>SUM SS</TableCell>
            <TableCell>ORI %ile</TableCell>
            <TableCell>ORI</TableCell>
            <TableCell></TableCell>
          </TableRow>
          <TableRow>
          <TableCell>

          </TableCell>

            <TableCell>
              <FormControl fullWidth>
                <FormLabel>Sum Scaled Score:</FormLabel>
                <TextField
                  type="number"
                  id="sum_scaled_score"
                  name="sum_scaled_score"
                  value={newGort.sum_scaled_score || ""} // Handle null or undefined
                  onChange={handleChange}
                  variant="filled"
                  disabled
                  InputProps={{
                    readOnly: true, // Make the field read-only
                  }}
                  sx={{
                    "& .MuiInputBase-input.Mui-disabled": {
                      WebkitTextFillColor: "#000000",
                    },
                  }}
                />
              </FormControl>
            </TableCell>
            <TableCell>
              <FormControl fullWidth>
                <FormLabel>Oral Reading Percentile Rank:</FormLabel>
                <TextField
                  type="number"
                  id="oral_reading_percentile_rank"
                  name="oral_reading_percentile_rank"
                  value={newGort.oral_reading_percentile_rank}
                  onChange={handleChange}
                  variant="outlined"
                />
              </FormControl>
            </TableCell>
            <TableCell>
              <FormControl style={{ width: "50%" }}>
                <FormLabel>&lt; or &gt;</FormLabel>
                <Select
                  labelId="ori-descriptor-label"
                  id="ori_descriptor"
                  value={newGort.ori_descriptor || ""}
                  label="ori_descriptor"
                  onChange={(event) =>
                    setNewGort({
                      ...newGort,
                      ori_descriptor: event.target.value,
                    })
                  }
                  variant="outlined"
                >
                  <MenuItem value="">
                    <em>None</em>
                  </MenuItem>{" "}
                  <MenuItem value="<">&lt;</MenuItem>
                  <MenuItem value=">">&gt;</MenuItem>
                </Select>
              </FormControl>
              <FormControl style={{ width: "50%" }}>
                <FormLabel>Oral Reading Index:</FormLabel>
                <TextField
                  type="number"
                  id="oral_reading_index"
                  name="oral_reading_index"
                  value={newGort.oral_reading_index}
                  onChange={handleChange}
                />
              </FormControl>
            </TableCell>
            <TableCell>
            <Button
            type="submit"
            variant="contained"
            color="primary"
            className="mt-4"
          >
            Submit
          </Button>            </TableCell>
          </TableRow>
        </Table>
        </form>
      </Paper>
    </>
  );
};

export default AddGort;
