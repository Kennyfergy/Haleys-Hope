import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  TextField,
  Button,
  Grid,
  Paper,
  FormControl,
  FormLabel,
  RadioGroup,
  FormControlLabel,
  Radio,
  Checkbox,
  InputLabel,
  Select as MuiSelect,
  MenuItem,
} from "@mui/material";
import { useHistory } from "react-router-dom";
import CloudifyUploadForm from "../Cloudinary/CloudinaryUploadForm";

const StudentForm = () => {
  const dispatch = useDispatch();
  const history = useHistory();
  const coach = useSelector((store) => store.coachReducer.list);
  console.log(coach);
  useEffect(() => {
    dispatch({ type: "FETCH_COACHES" });
  }, []);

  const [studentData, setStudentData] = useState({
    first_name: "",
    last_name: "",
    grade: "",
    gender: "",
    dob: "",
    city: "",
    state: "",
    picture: "",
    school: "",
    on_site: true,
    barton_c: false,
    barton_c_date: null,
    coach_id: "",
    is_active: true,
    intake_grade: null,
  });
  const handleGoBack = () => {
    history.push(`/students`);
  };

  const handleChange = (e) => {
    const { name, value, checked, type } = e.target;
    if (type === "radio" && name === "barton_c") {
      setStudentData({ ...studentData, [name]: value === "B" });
    } else if (type === "checkbox") {
      setStudentData({ ...studentData, [name]: checked });
    } else {
      setStudentData({ ...studentData, [name]: value });
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch({ type: "ADD_STUDENT", payload: studentData });
    // Reset form
    setStudentData({
      first_name: "",
      last_name: "",
      grade: "",
      gender: "",
      dob: "",
      city: "",
      state: "",
      picture: "",
      school: "",
      on_site: null,
      barton_c: null,
      barton_c_date: null,
      coach_id: "",
      is_active: true,
      intake_grade: null,
    });
    dispatch({ type: "SHOW_SNACKBAR", payload: { message: "Student Added", severity: "success" } });

    history.push(`/students`);
    //history.push back to student details
  };

  return (
    <>
      <Button variant="outlined" onClick={handleGoBack} className="mb-4">
        GO BACK
      </Button>
      <h1 className="text-3xl text-center mb-4 ">Add Student </h1>
      <Paper style={{ padding: "20px", marginTop: "20px" }}>
        <form onSubmit={handleSubmit}>
          <Grid container spacing={2}>
            {/* Include CloudifyUploadForm for Image Upload */}
            {/* <Grid item xs={12}>
              <CloudifyUploadForm onImageUpload={(url) => setStudentData({ ...studentData, picture: url })} />
            </Grid> */}
            <Grid item xs={12} md={6}>
              <TextField
                label="First Name"
                variant="outlined"
                fullWidth
                name="first_name"
                value={studentData.first_name}
                onChange={handleChange}
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <TextField
                label="Last Name"
                variant="outlined"
                fullWidth
                name="last_name"
                value={studentData.last_name}
                onChange={handleChange}
              />
            </Grid>
            {/* Current Grade Field */}
            <Grid item xs={12} md={6}>
              <TextField
                label="Current Grade"
                variant="outlined"
                fullWidth
                name="grade"
                type="number"
                value={studentData.grade}
                onChange={handleChange}
              />
            </Grid>
            {/* Intake Grade Field */}
            <Grid item xs={12} md={6}>
              <TextField
                label="Intake Grade"
                variant="outlined"
                fullWidth
                name="intake_grade"
                type="number"
                value={studentData.intake_grade}
                onChange={handleChange}
              />
            </Grid>

            {/* Date of Birth Field */}
            <Grid item xs={12} md={6}>
              <TextField
                label="Date of Birth"
                variant="outlined"
                fullWidth
                name="dob"
                type="date"
                InputLabelProps={{ shrink: true }}
                value={studentData.dob}
                onChange={handleChange}
              />
            </Grid>

            {/* City Field */}
            <Grid item xs={12} md={6}>
              <TextField
                label="City"
                variant="outlined"
                fullWidth
                name="city"
                value={studentData.city}
                onChange={handleChange}
              />
            </Grid>
            {/* State Field */}
            <Grid item xs={12} md={6}>
              <TextField
                label="State"
                variant="outlined"
                fullWidth
                name="state"
                value={studentData.state}
                onChange={handleChange}
              />
            </Grid>

            {/* Gender Field - Using Radio Buttons */}
            <Grid item xs={12} md={6}>
              <FormControl component="fieldset">
                <FormLabel component="legend">Gender</FormLabel>
                <RadioGroup row name="gender" value={studentData.gender} onChange={handleChange}>
                  <FormControlLabel value="M" control={<Radio />} label="Male" />
                  <FormControlLabel value="F" control={<Radio />} label="Female" />
                  <FormControlLabel value="O" control={<Radio />} label="Other" />
                </RadioGroup>
              </FormControl>
            </Grid>

            {/* School Field */}
            <Grid item xs={12} md={6}>
              <TextField
                label="School"
                variant="outlined"
                fullWidth
                name="school"
                value={studentData.school}
                onChange={handleChange}
              />
            </Grid>

            {/* Barton C Field - Using Radio Buttons */}
            <Grid item xs={12} md={6}>
              <FormControl component="fieldset">
                <FormLabel component="legend">Program Start</FormLabel>
                <RadioGroup
                  row
                  name="barton_c"
                  value={studentData.barton_c ? "B" : "F"}
                  onChange={handleChange}
                >
                  <FormControlLabel value="F" control={<Radio />} label="Foundations" />
                  <FormControlLabel value="B" control={<Radio />} label="Barton" />
                </RadioGroup>
              </FormControl>
            </Grid>

            {/* On-site Field - Using Checkbox */}
            <Grid item xs={12} md={6}>
              <FormControlLabel
                control={<Checkbox checked={studentData.on_site} onChange={handleChange} name="on_site" />}
                label="On-site"
              />
            </Grid>
            {/* Barton C Date Field - Conditionally Rendered */}
            {studentData.barton_c && (
              <Grid item xs={12} md={6}>
                <TextField
                  label="Barton C Date"
                  variant="outlined"
                  fullWidth
                  name="barton_c_date"
                  type="date"
                  InputLabelProps={{ shrink: true }}
                  value={studentData.barton_c_date}
                  onChange={handleChange}
                />
              </Grid>
            )}
            {/* Barton C Date Field */}
            <Grid item xs={12} md={6}>
              <TextField
                label="Intake Date"
                variant="outlined"
                fullWidth
                name="start_date"
                type="date"
                InputLabelProps={{ shrink: true }}
                value={studentData.start_date}
                onChange={handleChange}
              />
            </Grid>

            {/* Coach ID Field */}
            <Grid item xs={12} md={6}>
              <FormControl fullWidth variant="outlined">
                <InputLabel id="coach-select-label">Coach</InputLabel>
                <MuiSelect
                  labelId="coach-select-label"
                  id="coach_id"
                  name="coach_id"
                  value={studentData.coach_id}
                  onChange={handleChange}
                  label="Coach"
                >
                  {coach.map((c) => (
                    <MenuItem key={c.id} value={c.id}>
                      {c.first_name} {c.last_name}
                    </MenuItem>
                  ))}
                </MuiSelect>
              </FormControl>
            </Grid>
          </Grid>
          <Button type="submit" variant="contained" color="primary" style={{ marginTop: "20px" }}>
            Add Student
          </Button>
        </form>
      </Paper>
    </>
  );
};

export default StudentForm;
