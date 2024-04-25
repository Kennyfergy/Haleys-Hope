import React from "react";
import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useParams, Link } from "react-router-dom";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import EditIcon from "@mui/icons-material/Edit";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "../ui/sheet";
import "./StudentCard.css";

const StudentCard = () => {
  const dispatch = useDispatch();
  const student = useSelector((store) => store.studentReducer.Details);
  const coach = useSelector((store) => store.coachReducer.list);
  console.log("Student card coach reducer:", coach);
  // const studentId = useParams();
  const { id: studentId } = useParams();
  console.log(coach);
  //find the coach that matches a students coach id
  const studentCoachId = Number(student.coach_id);

  //setting state to open and close sheet
  const [isSheetOpen, setIsSheetOpen] = useState(false);

  // setting original data so if user doesn't save, or just exits the window, it reverts back to original data
  const [originalData, setOriginalData] = useState({});

  //state for validation errors
  const [validationErrors, setValidationErrors] = useState({});

  //function to check for empty inputs and display an error if left empty
  const validateForm = () => {
    let errors = {};
    let isValid = true;

    if (!formData.first_name) {
      errors.first_name = "Please enter a first name";
    }
    // Validate last name
    if (!formData.last_name) {
      errors.last_name = "Please enter a last name";
    }

    // Validate grade
    if (!formData.grade) {
      errors.grade = "Please enter a grade";
    }

    // Validate intake grade
    if (!formData.intake_grade) {
      errors.intake_grade = "Please enter an intake grade";
    }

    // Validate dob, wont work with a date input, need better error display for this
    // if (!formData.dob) {
    //   errors.dob = "Please enter Date of Birth";
    // }

    // Validate start date, this wont work with date field, need a better error for this
    // if (!formData.start_date) {
    //   errors.start_date = "Start Date is required";
    // }
    setValidationErrors(errors);
    return isValid;
  };
  //if date not entered for barton c, displaying this
  const isDateValid = (dateString) => {
    if (!dateString) return false;

    const date = new Date(dateString);
    return date.getFullYear() >= 1980;
  };
  //looping and finding a coach for the student
  const matchingCoach = coach.find((c) => c.id === student.coach_id);
  //combining first name and last name
  const coachName = matchingCoach?.first_name + " " + matchingCoach?.last_name;

  useEffect(() => {
    dispatch({ type: "FETCH_STUDENT", payload: studentId });
    dispatch({ type: "FETCH_COACHES", payload: studentId });
  }, [dispatch, studentId]);

  // State to hold form data
  const [formData, setFormData] = useState({
    first_name: "",
    last_name: "",
    grade: "",
    intake_grade: "",
    school: "",
    gender: "",
    dob: "",
    city: "",
    state: "",
    barton_c_date: null,
    barton_c: true,
    on_site: true,
    start_date: "",
    is_active: "",
    coach_id: "",
  });

  useEffect(() => {
    if (student) {
      console.log("Incoming student data:", student);
      const studentData = {
        first_name: student.first_name || "",
        last_name: student.last_name || "",
        grade: student.grade || "",
        intake_grade: student.intake_grade || "",
        school: student.school || "",
        gender: student.gender || "",
        dob: student.dob ? student.dob.split("T")[0] : "",
        city: student.city || "",
        state: student.state || "",
        barton_c_date: student.barton_c_date ? student.barton_c_date.split("T")[0] : "",
        barton_c: student.barton_c || true,
        on_site: student.on_site || true,
        start_date: student.start_date ? student.start_date.split("T")[0] : "",
        is_active: student.is_active || true,
        coach_id: student.coach_id || "",
      };
      setFormData(studentData);
      setOriginalData(studentData); //store original data
      console.log("Updated formData state:", formData);
    }
  }, [student]);

  const handleInputChange = (e) => {
    console.log("Input changed:", e.target.id, e.target.value);
    const { id, value } = e.target;
    setFormData({ ...formData, [id]: value });

    // Clear error message for this field when user starts typing
    if (validationErrors[id]) {
      setValidationErrors({ ...validationErrors, [id]: "" });
    }
  };

  const handleSubmit = () => {
    if (validateForm()) {
      dispatch({
        type: "UPDATE_STUDENT",
        payload: { id: studentId, ...formData },
      });
      dispatch({ type: "SHOW_SNACKBAR", payload: { message: "Student Updated", severity: "success" } });

      setIsSheetOpen(false); // Close the sheet if form is valid
    } else {
      console.log("Validation failed");
    }
  };
  // function to reset for to original data when cancelled or sheet closed
  const handleCancel = () => {
    // if (JSON.stringify(formData) !== JSON.stringify(originalData)) {
    //   if (window.confirm("You have unsaved changes. Are you sure you want to close?")) {
    //     setFormData(originalData);
    //     setValidationErrors({});
    setIsSheetOpen(false);
  };
  // } else {
  //   setIsSheetOpen(false); // This will close the form if there are no unsaved changes
  // }
  // }; // end handleCancel

  const sheetStyle = {
    backgroundColor: "white",
    boxShadow: "0 2px 10px rgba(0, 0, 0, 0.1)",
    maxHeight: "80vh", // Example: 80% of the viewport height
    overflowY: "auto", // Enables vertical scrolling
  };

  const calculateAge = (dob) => {
    const today = new Date();
    const birthDate = new Date(dob);

    // Calculate the difference in years
    let ageYears = today.getFullYear() - birthDate.getFullYear();

    // Calculate the difference in months
    let ageMonths = today.getMonth() - birthDate.getMonth();

    // Adjust years and months if the current month is before the birth month
    if (ageMonths < 0 || (ageMonths === 0 && today.getDate() < birthDate.getDate())) {
      ageYears--;
      ageMonths = 12 + ageMonths; // This will give the remaining months after adjusting the year
    }

    // Calculate the difference in days
    let ageDays = today.getDate() - birthDate.getDate();
    if (ageDays < 0) {
      // Calculate the number of days in the previous month
      const lastMonth = new Date(today.getFullYear(), today.getMonth(), 0);
      ageDays = lastMonth.getDate() + ageDays; // This will give the remaining days after adjusting the month
    }

    // Return the age in format "years months days"
    return `${ageYears} years, ${ageMonths} months, ${ageDays} days`;
  };

  /// calculate the intake age using intake date and current age
  const calculateIntakeAge = (dob, intakeDate) => {
    const intake = new Date(intakeDate);
    const birthDate = new Date(dob);
    let ageYears = intake.getFullYear() - birthDate.getFullYear();
    let ageMonths = intake.getMonth() - birthDate.getMonth();

    if (ageMonths < 0 || (ageMonths === 0 && intake.getDate() < birthDate.getDate())) {
      ageYears--;
      ageMonths = 12 + ageMonths;
    }

    let ageDays = intake.getDate() - birthDate.getDate();
    if (ageDays < 0) {
      const lastMonth = new Date(intake.getFullYear(), intake.getMonth(), 0);
      ageDays = lastMonth.getDate() + ageDays;
    }

    return `${ageYears} years, ${ageMonths} months, ${ageDays} days`;
  }; //end calculateIntakeAge
  const intakeAge = calculateIntakeAge(student.dob, student.start_date);

  return (
    <article className="background-light900_dark200 light-border rounded-2xl border p-8 shadow-md relative flex flex-col items-center">
      {/* <h2 className="h2-bold text-dark100_light900 text-center mb-4">{`${student.first_name} ${student.last_name}`}</h2> */}
      <h1 className="text-3xl font-bold text-center text-primary-500 my-4">
        {`${student.first_name} ${student.last_name}`}
      </h1>

      <div className="flex flex-col w-full md:flex-row items-start md:items-center justify-between">
        <img
          src={student.picture}
          alt={`${student.first_name} ${student.last_name}`}
          width={140}
          height={140}
          className="rounded-full object-cover mr-4 mb-4 md:mb-0"
        />

        <Sheet>
          <SheetTrigger asChild onClick={() => setIsSheetOpen(true)}>
            <Button
              variant="outline"
              className="absolute top-2 right-2 text-xs px-2 py-1 col-span-1 lg:col-span-5 bg-primary-500 hover:bg-primary-100 text-white font-bold rounded focus:outline-none focus:shadow-outline m-2 transition duration-300 ease-in-out flex items-center justify-center space-x-2"
            >
              {/* <img src="/assets/icons/edit.svg" alt="Edit Icon" className="w-4 h-4" /> */}
              <EditIcon />
              <span>Edit Student</span>
            </Button>
          </SheetTrigger>
          <SheetContent side="top" style={sheetStyle}>
            <SheetHeader>
              <SheetTitle>Edit Student</SheetTitle>
              <SheetDescription>Make changes to the student's profile here.</SheetDescription>
            </SheetHeader>
            <div className="p-4">
              <div className="grid grid-cols-2 gap-4">
                <Label htmlFor="firstName">First Name</Label>
                <Input
                  id="first_name"
                  value={formData.first_name}
                  onChange={handleInputChange}
                  placeholder={validationErrors.first_name || "First Name"}
                  className={validationErrors.first_name ? "error-input" : ""}
                />

                <Label htmlFor="lastName">Last Name</Label>
                <Input
                  id="last_name"
                  value={formData.last_name}
                  onChange={handleInputChange}
                  placeholder={validationErrors.last_name || "Last Name"}
                  className={validationErrors.last_name ? "error-input" : ""}
                />

                <Label htmlFor="currentGrade">Current Grade</Label>
                <Input
                  id="grade"
                  type="number"
                  value={formData.grade}
                  onChange={handleInputChange}
                  placeholder={validationErrors.grade || "Grade"}
                  className={validationErrors.grade ? "error-input" : null}
                />

                <Label htmlFor="intakeGrade">Intake Grade</Label>
                <Input
                  id="intake_grade"
                  type="number"
                  value={formData.intake_grade}
                  onChange={handleInputChange}
                  placeholder={validationErrors.intake_grade || "Intake Grade"}
                  className={validationErrors.intake_grade ? "error-input" : null}
                />

                <Label htmlFor="school">School</Label>
                <Input id="school" value={formData.school} onChange={handleInputChange} />

                <Label htmlFor="gender">Gender</Label>
                <Input id="gender" value={formData.gender} onChange={handleInputChange} />

                <Label htmlFor="dob">Date of Birth</Label>
                <Input
                  id="dob"
                  type="date"
                  value={formData.dob}
                  onChange={handleInputChange}
                  placeholder={validationErrors.dob || "Date of Birth"}
                  className={validationErrors.dob ? "error-input" : null}
                />

                <Label htmlFor="city">City</Label>
                <Input id="city" value={formData.city} onChange={handleInputChange} />

                <Label htmlFor="state">State</Label>
                <Input id="state" value={formData.state} onChange={handleInputChange} />

                <Label htmlFor="bartonDate">Barton C Date</Label>
                <Input
                  id="barton_c_date"
                  type="date"
                  value={formData.barton_c_date}
                  onChange={handleInputChange}
                />

                <Label htmlFor="bartonC">Barton C</Label>
                <select id="barton_c" value={formData.barton_c} onChange={handleInputChange}>
                  <option value="true">Foundations</option>
                  <option value="false">Barton</option>
                </select>

                <Label htmlFor="onSite">On Site</Label>
                <select id="on_site" value={formData.on_site} onChange={handleInputChange}>
                  <option value="true">Yes</option>
                  <option value="false">No</option>
                </select>

                <Label htmlFor="startDate">Intake Date</Label>
                <Input
                  id="start_date"
                  type="date"
                  value={formData.start_date}
                  onChange={handleInputChange}
                  placeholder={validationErrors.start_date || "Intake Date"}
                  className={validationErrors.start_date ? "error-input" : null}
                />

                <Label htmlFor="is active">Current or Archive</Label>
                <select id="is_active" value={formData.is_active} onChange={handleInputChange}>
                  <option value="true">Current</option>
                  <option value="false">Archive</option>
                </select>
                <Label htmlFor="coach">Coach</Label>
                <select id="coach_id" value={formData.coach_id} onChange={handleInputChange}>
                  {coach.map((c) => (
                    <option key={c.id} value={c.id}>
                      {c.first_name} {c.last_name}
                    </option>
                  ))}
                </select>
              </div>
            </div>
            <SheetFooter>
              <Button onClick={handleSubmit} type="submit" className="bg-primary-500 text-white">
                Save Changes
              </Button>
              {/* <SheetClose asChild> */}
              {/* <Button onClick={handleCancel} className="bg-primary-500 text-white">
                Close
              </Button> */}
              {/* </SheetClose> */}
            </SheetFooter>
          </SheetContent>
        </Sheet>

        <div className="grid grid-cols-2 md:grid-cols-2 gap-x-8 gap-y-4 mt-4">
          <p className="body-regular text-dark500_light500">Intake Grade: {student.intake_grade}</p>
          <p className="body-regular text-dark500_light500">Gender: {student.gender}</p>
          <p className="body-regular text-dark500_light500">Intake Age: {intakeAge}</p>
          <p className="body-regular text-dark500_light500">School: {student.school}</p>
          <p className="body-regular text-dark500_light500">
            Date of Birth: {new Date(student.dob).toLocaleDateString()}
          </p>
          <p className="body-regular text-dark500_light500">City: {student.city}</p>
          <p className="body-regular text-dark500_light500">Current Grade: {student.grade}</p>
          <p className="body-regular text-dark500_light500">State: {student.state}</p>
          <p className="body-regular text-dark500_light500">Current Age: {calculateAge(student.dob)}</p>
          <p className="body-regular text-dark500_light500">Coach: {coachName}</p>

          {/* <p className="body-regular text-dark500_light500">
            On Site: ***Change to onsite or virtual {student.on_site ? "Yes" : "No"}
          </p> */}
          <p className="body-regular text-dark500_light500">
            Site: {student.on_site ? "Haley's Hope" : "Virtual"}
          </p>

          <p className="body-regular text-dark500_light500">
            Barton C: {student.barton_c ? "Foundations" : "Barton"}
          </p>
          <p className="body-regular text-dark500_light500">
            Intake Date: {new Date(student.start_date).toLocaleDateString()}
          </p>
          <p className="body-regular text-dark500_light500">
            Barton C Date:{" "}
            {isDateValid(student.barton_c_date)
              ? new Date(student.barton_c_date).toLocaleDateString()
              : "No date entered or test not given"}
          </p>
        </div>
      </div>
    </article>
  );
};

export default StudentCard;
