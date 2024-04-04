import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory, useParams } from "react-router-dom/cjs/react-router-dom.min";
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
import "./AddElementaryWist.css";

//component to add a new elementary wist test
const AddElementaryWist = () => {
  const dispatch = useDispatch();
  const history = useHistory();
  const student = useParams();
  const users = useSelector((store) => store.allUsersReducer.users);
  const studentGrade = useSelector((store) => store.studentReducer.Details.grade);
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
  // useEffect(() => {
  //   handleGoBack;
  // })[handleGoBack];

  const [newWist, setNewWist] = useState({
    student_id: student.id,
    grade: studentGrade,
    date: "",
    examiner_id: "",
    read_regular_words: null,
    read_irregular_words: null,
    word_identification: null,
    word_identification_percentile: null,
    word_identification_standard_score: null,
    spell_regular_words: null,
    spell_irregular_words: null,
    spelling: null,
    spelling_percentile: null,
    spelling_standard_score: null,
    fundamental_literacy: null,
    fundamental_literacy_percentile: null,
    fundamental_literacy_standard_score: null,
    pseudo_words: null,
    letter_sounds: null,
    sound_symbol_knowledge: null,
    sound_symbol_knowledge_percentile: null,
    sound_symbol_knowledge_standard_score: null,

    read_regular_words_descriptor: null,
    read_irregular_words_descriptor: null,
    spell_regular_words_descriptor: null,
    spell_irregular_words_descriptor: null,
    pseudo_words_descriptor: null,
    letter_sounds_descriptor: null,
  });

  const handleExaminerChange = (event) => {
    const examinerId = event.target.value;
    setSelectedExaminerId(examinerId);
    setNewWist((prevWist) => ({
      ...prevWist,
      examiner_id: examinerId,
    }));
  };

  const handleGoBack = () => {
    history.push(`/students/${student.id}`);
  };

  //function to handle inputs changing
  const handleChange = (e) => {
    const { name, value } = e.target;
    let updatedValue = { ...newWist };
    // Handle date field separately
    if (name === "date") {
      updatedValue[name] = value;
    } else {
      // Convert to number if the field is numeric
      updatedValue[name] = value ? parseInt(value, 10) : 0;

      // Convert to number if the field is numeric
      updatedValue[name] = value ? parseInt(value, 10) : 0;

      // Calculate word identification
      if (name === "read_regular_words" || name === "read_irregular_words") {
        updatedValue.word_identification =
          (updatedValue.read_regular_words || 0) + (updatedValue.read_irregular_words || 0);
      }

      // Calculate spelling
      if (name === "spell_regular_words" || name === "spell_irregular_words") {
        updatedValue.spelling =
          (updatedValue.spell_regular_words || 0) + (updatedValue.spell_irregular_words || 0);
      }

      // Calculate fundamental literacy
      if (
        name === "read_regular_words" ||
        name === "read_irregular_words" ||
        name === "spell_regular_words" ||
        name === "spell_irregular_words"
      ) {
        updatedValue.fundamental_literacy =
          (updatedValue.word_identification || 0) + (updatedValue.spelling || 0);
      }

      // Calculate sound symbol knowledge
      if (name === "pseudo_words" || name === "letter_sounds") {
        updatedValue.sound_symbol_knowledge =
          (updatedValue.pseudo_words || 0) + (updatedValue.letter_sounds || 0);
      }
    }
    setValidationErrors((prevErrors) => {
      const newErrors = { ...prevErrors };

      // Validate date
      if (name === "date") {
        if (!value) {
          newErrors.date = "Date is required";
        } else if (new Date(value) > new Date()) {
          newErrors.date = "Date cannot be in the future";
        } else {
          newErrors.date = "";
        }
      }
      //validate examiner id
      if (name === "examiner_id") {
        if (!value) {
          newErrors.examiner_id = "Examiner is required";
        } else {
          newErrors.examiner_id = "";
        }
      }

      return newErrors;
    });
    setNewWist(updatedValue);
  }; //end handle change

  //function to handle click of submit button and send newWist data
  const handleSubmit = (e) => {
    e.preventDefault();

    // Validate all inputs before submission
    const newErrors = {};
    if (!newWist.date) {
      newErrors.date = "Date is required";
    } else if (new Date(newWist.date) < new Date()) {
      newErrors.date = "Date cannot be in the past";
    }

    if (!newWist.examiner_id) {
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
      ...newWist,
      examiner_id: selectedExaminerId,
    };
    console.log("add el wist submission data:", submissionData);

    dispatch({
      type: "ADD_ELEMENTARY_WIST",
      payload: submissionData,
    });
    dispatch({ type: "SHOW_SNACKBAR", payload: { message: "Test added", severity: "success" } });

    history.push(`/students/${student.id}`);
    //history.push back to student details
  };

  // Function to open snackbar
  const openSnackbar = (message, severity = "info") => {
    setSnackbarMessage(message);
    setSnackbarSeverity(severity);
    setSnackbarOpen(true);
  };
  // Function to handle snackbar close
  const handleSnackbarClose = () => {
    setSnackbarOpen(false);
  };

  return (
    <>
      {/* <h1 className="text-3xl text-center mb-4 bg-primary-100">ELEMENTARY WIST </h1> */}

      <Button variant="outlined" onClick={handleGoBack} className="mb-4">
        GO BACK
      </Button>
      <h1 className="text-4xl font-bold text-center text-primary-500 my-4">Add WIST 7-11</h1>

      <Paper elevation={3} className="p-8">
        {/* <form onSubmit={handleSubmit} className="space-y-6">
          <Grid container spacing={3}>
            <Grid item xs={12} md={4}>
              <FormControl fullWidth>
                <FormLabel>Date:</FormLabel>
                <TextField
                  type="date"
                  id="date"
                  name="date"
                  value={newWist.date}
                  onChange={handleChange}
                  variant="outlined"
                />
                {validationErrors.date && (
                  <div className="text-red-500 text-xs italic">{validationErrors.date}</div>
                )}
              </FormControl>
            </Grid>

            <Grid item xs={12} md={4}>
              <FormControl fullWidth>
                <FormLabel>Examiner</FormLabel>
                <Select value={selectedExaminerId} onChange={handleExaminerChange}>
                  {users.map((user) => (
                    <MenuItem key={user.id} value={user.id}>
                      {user.first_name} {user.last_name}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={12} md={4}>
              <FormControl fullWidth>
                <FormLabel>Grade:</FormLabel>
                <TextField
                  type="number"
                  id="grade"
                  name="grade"
                  value={newWist.grade}
                  onChange={handleChange}
                  variant="outlined"
                />
              </FormControl>
            </Grid>

            <Grid item xs={12} md={4}>
              <FormControl fullWidth>
                <FormLabel> &lt; or &gt; for Read Regular Words</FormLabel>

                <Select
                  labelId="read-regular-words-label"
                  id="read_regular_words_descriptor"
                  value={newWist.read_regular_words_descriptor || ""}
                  label="read_regular_words_descriptor"
                  onChange={(event) =>
                    setNewWist({ ...newWist, read_regular_words_descriptor: event.target.value })
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
            </Grid>
            <Grid item xs={12} md={4}>
              <FormControl fullWidth>
                <FormLabel>Read Regular Words:</FormLabel>
                <TextField
                  type="number"
                  id="read_regular_words"
                  name="read_regular_words"
                  value={newWist.read_regular_words}
                  onChange={handleChange}
                  variant="outlined"
                />
              </FormControl>
            </Grid>
            <Grid item xs={12} md={4}>
              <FormControl fullWidth>
                <FormLabel> &lt; or &gt; for Read Irregular Words</FormLabel>

                <Select
                  labelId="read-irregular-words-label"
                  id="read_irregular_words_descriptor"
                  value={newWist.read_irregular_words_descriptor || ""}
                  label="read_irregular_words_descriptor"
                  onChange={(event) =>
                    setNewWist({ ...newWist, read_irregular_words_descriptor: event.target.value })
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
            </Grid>

            <Grid item xs={12} md={4}>
              <FormControl fullWidth>
                <FormLabel>Read Irregular Words:</FormLabel>
                <TextField
                  type="number"
                  id="read_irregular_words"
                  name="read_irregular_words"
                  value={newWist.read_irregular_words}
                  onChange={handleChange}
                  variant="outlined"
                />
              </FormControl>
            </Grid>

            <Grid item xs={12} md={4}>
              <FormControl fullWidth>
                <FormLabel>Word Identification:</FormLabel>
                <TextField
                  type="number"
                  id="word_identification"
                  name="word_identification"
                  value={newWist.word_identification}
                  onChange={handleChange}
                  variant="filled"
                  disabled
                  InputProps={{
                    readOnly: true,
                  }}
                  sx={{
                    "& .MuiInputBase-input.Mui-disabled": {
                      WebkitTextFillColor: "#000000",
                    },
                  }}
                />
              </FormControl>
            </Grid>

            <Grid item xs={12} md={4}>
              <FormControl fullWidth>
                <FormLabel>Word Identification Percentile:</FormLabel>
                <TextField
                  type="number"
                  id="word_identification_percentile"
                  name="word_identification_percentile"
                  value={newWist.word_identification_percentile}
                  onChange={handleChange}
                  variant="outlined"
                />
              </FormControl>
            </Grid>

            <Grid item xs={12} md={4}>
              <FormControl fullWidth>
                <FormLabel>Word Identification Standard Score:</FormLabel>
                <TextField
                  type="number"
                  id="word_identification_standard_score"
                  name="word_identification_standard_score"
                  value={newWist.word_identification_standard_score}
                  onChange={handleChange}
                  variant="outlined"
                />
              </FormControl>
            </Grid>
            <Grid item xs={12} md={4}>
              <FormControl fullWidth>
                <FormLabel> &lt; or &gt; for Spell Regular Words</FormLabel>

                <Select
                //  style={{ width: '50%'}} TODO: DELETE THIS OR USE THIS!
                  labelId="spell-regular-words-label"
                  id="spell_regular_words_descriptor"
                  value={newWist.spell_regular_words_descriptor || ""}
                  label="spell_regular_words_descriptor"
                  onChange={(event) =>
                    setNewWist({ ...newWist, spell_regular_words_descriptor: event.target.value })
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
            </Grid>

            <Grid item xs={12} md={4}>
              <FormControl fullWidth>
                <FormLabel>Spell Regular Words:</FormLabel>
                <TextField
                  type="number"
                  id="spell_regular_words"
                  name="spell_regular_words"
                  value={newWist.spell_regular_words}
                  onChange={handleChange}
                  variant="outlined"
                />
              </FormControl>
            </Grid>
            <Grid item xs={12} md={4}>
              <FormControl fullWidth>
                <FormLabel> &lt; or &gt; for Spell Irregular Words</FormLabel>

                <Select
                  labelId="spell-irregular-words-label"
                  id="spell_irregular_words_descriptor"
                  value={newWist.spell_irregular_words_descriptor || ""}
                  label="spell_irregular_words_descriptor"
                  onChange={(event) =>
                    setNewWist({ ...newWist, spell_irregular_words_descriptor: event.target.value })
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
            </Grid>
            <Grid item xs={12} md={4}>
              <FormControl fullWidth>
                <FormLabel>Spell Irregular Words:</FormLabel>
                <TextField
                  type="number"
                  id="spell_irregular_words"
                  name="spell_irregular_words"
                  value={newWist.spell_irregular_words}
                  onChange={handleChange}
                  variant="outlined"
                />
              </FormControl>
            </Grid>

            <Grid item xs={12} md={4}>
              <FormControl fullWidth>
                <FormLabel>Spelling:</FormLabel>
                <TextField
                  type="number"
                  id="spelling"
                  name="spelling"
                  value={newWist.spelling}
                  onChange={handleChange}
                  variant="filled"
                  disabled
                  InputProps={{
                    readOnly: true,
                  }}
                  sx={{
                    "& .MuiInputBase-input.Mui-disabled": {
                      WebkitTextFillColor: "#000000",
                    },
                  }}
                />
              </FormControl>
            </Grid>

            <Grid item xs={12} md={4}>
              <FormControl fullWidth>
                <FormLabel>Spelling Percentile:</FormLabel>
                <TextField
                  type="number"
                  id="spelling_percentile"
                  name="spelling_percentile"
                  value={newWist.spelling_percentile}
                  onChange={handleChange}
                  variant="outlined"
                />
              </FormControl>
            </Grid>

            <Grid item xs={12} md={4}>
              <FormControl fullWidth>
                <FormLabel>Spelling Standard Score:</FormLabel>
                <TextField
                  type="number"
                  id="spelling_standard_score"
                  name="spelling_standard_score"
                  value={newWist.spelling_standard_score}
                  onChange={handleChange}
                  variant="outlined"
                />
              </FormControl>
            </Grid>

            <Grid item xs={12} md={4}>
              <FormControl fullWidth>
                <FormLabel>Fundamental Literacy:</FormLabel>
                <TextField
                  type="number"
                  id="fundamental_literacy"
                  name="fundamental_literacy"
                  value={newWist.fundamental_literacy}
                  onChange={handleChange}
                  variant="filled"
                  disabled
                  InputProps={{
                    readOnly: true,
                  }}
                  sx={{
                    "& .MuiInputBase-input.Mui-disabled": {
                      WebkitTextFillColor: "#000000",
                    },
                  }}
                />
              </FormControl>
            </Grid>

            <Grid item xs={12} md={4}>
              <FormControl fullWidth>
                <FormLabel>Fundamental Literacy Percentile:</FormLabel>
                <TextField
                  type="number"
                  id="fundamental_literacy_percentile"
                  name="fundamental_literacy_percentile"
                  value={newWist.fundamental_literacy_percentile}
                  onChange={handleChange}
                  variant="outlined"
                />
              </FormControl>
            </Grid>

            <Grid item xs={12} md={4}>
              <FormControl fullWidth>
                <FormLabel>Fundamental Literacy Standard Score:</FormLabel>
                <TextField
                  type="number"
                  id="fundamental_literacy_standard_score"
                  name="fundamental_literacy_standard_score"
                  value={newWist.fundamental_literacy_standard_score}
                  onChange={handleChange}
                  variant="outlined"
                />
              </FormControl>
            </Grid>

            <Grid item xs={12} md={4}>
              <FormControl fullWidth>
                <FormLabel> &lt; or &gt; for Pseudo Words</FormLabel>

                <Select
                  labelId="pseudo-words-label"
                  id="pseudo_words_descriptor"
                  value={newWist.pseudo_words_descriptor || ""}
                  label="pseudo_words_descriptor"
                  onChange={(event) =>
                    setNewWist({ ...newWist, pseudo_words_descriptor: event.target.value })
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
            </Grid>
            <Grid item xs={12} md={4}>
              <FormControl fullWidth>
                <FormLabel>Pseudo Words:</FormLabel>
                <TextField
                  type="number"
                  id="pseudo_words"
                  name="pseudo_words"
                  value={newWist.pseudo_words}
                  onChange={handleChange}
                  variant="outlined"
                />
              </FormControl>
            </Grid>

            <Grid item xs={12} md={4}>
              <FormControl fullWidth>
                <FormLabel> &lt; or &gt; for Letter Sounds</FormLabel>

                <Select
                  labelId="letter-sounds-descriptor"
                  id="letter_sounds_descriptor"
                  value={newWist.letter_sounds_descriptor || ""}
                  label="letter_sounds_descriptor"
                  onChange={(event) =>
                    setNewWist({ ...newWist, letter_sounds_descriptor: event.target.value })
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
            </Grid>
            <Grid item xs={12} md={4}>
              <FormControl fullWidth>
                <FormLabel>Letter Sounds:</FormLabel>
                <TextField
                  type="number"
                  id="letter_sounds"
                  name="letter_sounds"
                  value={newWist.letter_sounds}
                  onChange={handleChange}
                  variant="outlined"
                />
              </FormControl>
            </Grid>

            <Grid item xs={12} md={4}>
              <FormControl fullWidth>
                <FormLabel>Sound Symbol Knowledge:</FormLabel>
                <TextField
                  type="number"
                  id="sound_symbol_knowledge"
                  name="sound_symbol_knowledge"
                  value={newWist.sound_symbol_knowledge}
                  onChange={handleChange}
                  variant="filled"
                  disabled
                  InputProps={{
                    readOnly: true,
                  }}
                  sx={{
                    "& .MuiInputBase-input.Mui-disabled": {
                      WebkitTextFillColor: "#000000",
                    },
                  }}
                />
              </FormControl>
            </Grid>

            <Grid item xs={12} md={4}>
              <FormControl fullWidth>
                <FormLabel>Sound Symbol Knowledge Percentile:</FormLabel>
                <TextField
                  type="number"
                  id="sound_symbol_knowledge_percentile"
                  name="sound_symbol_knowledge_percentile"
                  value={newWist.sound_symbol_knowledge_percentile}
                  onChange={handleChange}
                  variant="outlined"
                />
              </FormControl>
            </Grid>

            <Grid item xs={12} md={4}>
              <FormControl fullWidth>
                <FormLabel>Sound Symbol Knowledge Standard Score:</FormLabel>
                <TextField
                  type="number"
                  id="sound_symbol_knowledge_standard_score"
                  name="sound_symbol_knowledge_standard_score"
                  value={newWist.sound_symbol_knowledge_standard_score}
                  onChange={handleChange}
                  variant="outlined"
                />
              </FormControl>
            </Grid>
          </Grid>
          <Button type="submit" variant="contained" color="primary" className="mt-4">
            Submit
          </Button>
        </form> */}

<form>
          <Table size="small">
            <TableRow>
              <TableCell>
                <FormControl fullWidth>
                  <FormLabel>Date:</FormLabel>
                  <TextField
                    type="date"
                    id="date"
                    name="date"
                    value={newWist.date}
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
                    value={newWist.grade}
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
              <TableCell>Wist 7-11</TableCell>
            </TableRow>
            <TableRow>
              <TableCell>Word Identification</TableCell>
              <TableCell>
                {" "}
                <FormControl fullWidth>
                  <FormLabel>Read Regular Words:</FormLabel>
                  <TextField
                    type="number"
                    id="read_regular_words"
                    name="read_regular_words"
                    value={newWist.read_regular_words}
                    onChange={handleChange}
                    variant="outlined"
                  />
                </FormControl>
              </TableCell>
              <TableCell>
                {" "}
                <FormControl fullWidth>
                  <FormLabel>Read Irregular Words:</FormLabel>
                  <TextField
                    type="number"
                    id="read_irregular_words"
                    name="read_irregular_words"
                    value={newWist.read_irregular_words}
                    onChange={handleChange}
                    variant="outlined"
                  />
                </FormControl>
              </TableCell>
              <TableCell>
                <FormControl fullWidth>
                  <FormLabel>Word Identification:</FormLabel>
                  <TextField
                    type="number"
                    id="word_identification"
                    name="word_identification"
                    value={newWist.word_identification}
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
                {" "}
                <FormControl fullWidth>
                  <FormLabel>Word Identification Standard Score:</FormLabel>
                  <TextField
                    type="number"
                    id="word_identification_standard_score"
                    name="word_identification_standard_score"
                    value={newWist.word_identification_standard_score}
                    onChange={handleChange}
                    variant="outlined"
                  />
                </FormControl>
              </TableCell>
              <TableCell>
                <FormControl fullWidth>
                  <FormLabel>Word Identification Percentile:</FormLabel>
                  <TextField
                    type="number"
                    id="word_identification_percentile"
                    name="word_identification_percentile"
                    value={newWist.word_identification_percentile}
                    onChange={handleChange}
                    variant="outlined"
                  />
                </FormControl>
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell>Spelling</TableCell>
              <TableCell>
                {" "}
                <FormControl fullWidth>
                  <FormLabel>Spell Regular Words:</FormLabel>
                  <TextField
                    type="number"
                    id="spell_regular_words"
                    name="spell_regular_words"
                    value={newWist.spell_regular_words}
                    onChange={handleChange}
                    variant="outlined"
                  />
                </FormControl>
              </TableCell>
              <TableCell>
                {" "}
                <FormControl fullWidth>
                  <FormLabel>Spell Irregular Words:</FormLabel>
                  <TextField
                    type="number"
                    id="spell_irregular_words"
                    name="spell_irregular_words"
                    value={newWist.spell_irregular_words}
                    onChange={handleChange}
                    variant="outlined"
                  />
                </FormControl>
              </TableCell>
              <TableCell>
                <FormControl fullWidth>
                  <FormLabel>Spelling:</FormLabel>
                  <TextField
                    type="number"
                    id="spelling"
                    name="spelling"
                    value={newWist.spelling}
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
                  <FormLabel>Spelling Standard Score:</FormLabel>
                  <TextField
                    type="number"
                    id="spelling_standard_score"
                    name="spelling_standard_score"
                    value={newWist.spelling_standard_score}
                    onChange={handleChange}
                    variant="outlined"
                  />
                </FormControl>
              </TableCell>
              <TableCell>
                <FormControl fullWidth>
                  <FormLabel>Spelling Percentile:</FormLabel>
                  <TextField
                    type="number"
                    id="spelling_percentile"
                    name="spelling_percentile"
                    value={newWist.spelling_percentile}
                    onChange={handleChange}
                    variant="outlined"
                  />
                </FormControl>
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell>Fundamental Literacy Skills</TableCell>
              <TableCell>
                <FormControl fullWidth>
                  <FormLabel>Word Identification:</FormLabel>
                  <TextField
                    type="number"
                    id="word_identification"
                    name="word_identification"
                    value={newWist.word_identification}
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
                  <FormLabel>Spelling:</FormLabel>
                  <TextField
                    type="number"
                    id="spelling"
                    name="spelling"
                    value={newWist.spelling}
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
                  <FormLabel>Fundamental Literacy:</FormLabel>
                  <TextField
                    type="number"
                    id="fundamental_literacy"
                    name="fundamental_literacy"
                    value={newWist.fundamental_literacy}
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
                  <FormLabel>Fundamental Literacy Standard Score:</FormLabel>
                  <TextField
                    type="number"
                    id="fundamental_literacy_standard_score"
                    name="fundamental_literacy_standard_score"
                    value={newWist.fundamental_literacy_standard_score}
                    onChange={handleChange}
                    variant="outlined"
                  />
                </FormControl>
              </TableCell>
              <TableCell>
                {" "}
                <FormControl fullWidth>
                  <FormLabel>Fundamental Literacy Percentile:</FormLabel>
                  <TextField
                    type="number"
                    id="fundamental_literacy_percentile"
                    name="fundamental_literacy_percentile"
                    value={newWist.fundamental_literacy_percentile}
                    onChange={handleChange}
                    variant="outlined"
                  />
                </FormControl>
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell>Sound Symbol Knowledge</TableCell>
              <TableCell>
                {" "}
                <FormControl fullWidth>
                  <FormLabel>Pseudo Words:</FormLabel>
                  <TextField
                    type="number"
                    id="pseudo_words"
                    name="pseudo_words"
                    value={newWist.pseudo_words}
                    onChange={handleChange}
                    variant="outlined"
                  />
                </FormControl>
              </TableCell>
              <TableCell>
                <FormControl fullWidth>
                  <FormLabel>Letter Sounds:</FormLabel>
                  <TextField
                    type="number"
                    id="letter_sounds"
                    name="letter_sounds"
                    value={newWist.letter_sounds}
                    onChange={handleChange}
                    variant="outlined"
                  />
                </FormControl>
              </TableCell>
              <TableCell>
                <FormControl fullWidth>
                  <FormLabel>Sound Symbol Knowledge:</FormLabel>
                  <TextField
                    type="number"
                    id="sound_symbol_knowledge"
                    name="sound_symbol_knowledge"
                    value={newWist.sound_symbol_knowledge}
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
                {" "}
                <FormControl fullWidth>
                  <FormLabel>Sound Symbol Knowledge Standard Score:</FormLabel>
                  <TextField
                    type="number"
                    id="sound_symbol_knowledge_standard_score"
                    name="sound_symbol_knowledge_standard_score"
                    value={newWist.sound_symbol_knowledge_standard_score}
                    onChange={handleChange}
                    variant="outlined"
                  />
                </FormControl>
              </TableCell>
              <TableCell>
                {" "}
                <FormControl fullWidth>
                  <FormLabel>Sound Symbol Knowledge Percentile:</FormLabel>
                  <TextField
                    type="number"
                    id="sound_symbol_knowledge_percentile"
                    name="sound_symbol_knowledge_percentile"
                    value={newWist.sound_symbol_knowledge_percentile}
                    onChange={handleChange}
                    variant="outlined"
                  />
                </FormControl>
              </TableCell>
            </TableRow>
          </Table>
          <Button
            type="submit"
            variant="contained"
            color="primary"
            className="mt-4"
          >
            Submit
          </Button>
        </form>
      </Paper>
    </>
  );
};

export default AddElementaryWist;
