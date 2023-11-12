import { takeLatest, put, call } from "redux-saga/effects";
import axios from "axios";

// Saga to fetch all students
function* fetchStudents() {
  try {
    const response = yield call(axios.get, "/api/students");
    yield put({ type: "SET_STUDENTS", payload: response.data });
  } catch (error) {
    console.log("Error fetching students", error);
    // Optionally, dispatch a failure action
  }
}

// Saga to fetch a specific student
function* fetchStudent(action) {
  try {
    const response = yield call(axios.get, `/api/students/${action.payload}`);
    yield put({ type: "SET_CURRENT_STUDENT", payload: response.data });
  } catch (error) {
    console.log("Error fetching specific student", error);
    // Optionally, dispatch a failure action
  }
}

// Saga to add a new student
function* addStudent(action) {
  try {
    yield call(axios.post, "/api/students", action.payload);
    yield put({ type: "FETCH_STUDENTS" });
  } catch (error) {
    console.log("Error adding student", error);
    // Optionally, dispatch a failure action
  }
}

// Saga to update a student's information
function* updateStudent(action) {
  try {
    yield call(axios.put, `/api/students/${action.payload.id}`, action.payload);
    yield put({ type: "FETCH_STUDENTS" });
  } catch (error) {
    console.log("Error updating student", error);
    // Optionally, dispatch a failure action
  }
}

// Saga to soft delete (archive) a student
function* deleteStudent(action) {
  try {
    yield call(axios.delete, `/api/students/${action.payload}`);
    yield put({ type: "FETCH_STUDENTS" });
  } catch (error) {
    console.log("Error deleting student", error);
    // Optionally, dispatch a failure action
  }
}

function* studentSaga() {
  yield takeLatest("FETCH_STUDENTS", fetchStudents);
  yield takeLatest("FETCH_STUDENT", fetchStudent);
  yield takeLatest("ADD_STUDENT", addStudent);
  yield takeLatest("UPDATE_STUDENT", updateStudent);
  yield takeLatest("DELETE_STUDENT", deleteStudent);
}

export default studentSaga;
