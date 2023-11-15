{
  /* <ProtectedRoute exact path="/SecondaryWistResults/:id">
            <SecondaryWistResults />
          </ProtectedRoute> */
}
import { useParams, useHistory } from "react-router-dom";
import { useEffect, useReducer } from "react";
import { useDispatch, useSelector } from "react-redux";
import { formatDate } from "../../lib/utils";
import MiniStudentCard from "../Cards/MiniStudentCard";

const SecondaryWistResults = () => {
  const testId = useParams();
  const dispatch = useDispatch();
  const history = useHistory();

  useEffect(() => {
    console.log("useEffect selected test, expect empty", selectedTest);
    dispatch({ type: "FETCH_SECONDARY_WIST_RESULTS", payload: testId.id });
  }, [dispatch]);

  const selectedTest = useSelector(
    (store) => store.secondaryWistReducer.selectedTest[0]
  );

  console.log("##########", selectedTest);

  if (!selectedTest || Object.keys(selectedTest).length === 0) {
    return <h1>Loading...</h1>;
  }
  console.log("selectedtestybooi", selectedTest);

  const goBack = () => history.push("/students/:id");

  return (
    <div>
      {/* <MiniStudentCard /> */}
      <div>
        <div>
          <h2>Test Details:</h2>
          <p>Date: {formatDate(selectedTest.date)}</p>
          <p>Examiner ID: {selectedTest.examiner_id}</p>
          <p>Fundamental Literacy: {selectedTest.fundamental_literacy}</p>
          <p>
            Fundamental Literacy Percentile:{" "}
            {selectedTest.fundamental_literacy_percentile}
          </p>
          <p>
            Fundamental Literacy Standard Score:{" "}
            {selectedTest.fundamental_literacy_standard_score}
          </p>
          <p>Letter Sounds: {selectedTest.letter_sounds}</p>
          <p>Pseudo Words: {selectedTest.pseudo_words}</p>
          <p>Read Irregular Words: {selectedTest.read_irregular_words}</p>
          <p>Read Regular Words: {selectedTest.read_regular_words}</p>
          <p>Sound Symbol Knowledge: {selectedTest.sound_symbol_knowledge}</p>
          <p>
            Sound Symbol Knowledge Percentile:{" "}
            {selectedTest.sound_symbol_knowledge_percentile}
          </p>
          <p>
            Sound Symbol Knowledge Standard Score:{" "}
            {selectedTest.sound_symbol_knowledge_standard_score}
          </p>
          <p>Spell Irregular Words: {selectedTest.spell_irregular_words}</p>
          <p>Spell Regular Words: {selectedTest.spell_regular_words}</p>
          <p>Spelling: {selectedTest.spelling}</p>
          <p>Spelling Percentile: {selectedTest.spelling_percentile}</p>
          <p>Spelling Standard Score: {selectedTest.spelling_standard_score}</p>
          <p>Student ID: {selectedTest.student_id}</p>
          <p>Word Identification: {selectedTest.word_identification}</p>
          <p>
            Word Identification Percentile:{" "}
            {selectedTest.word_identification_percentile}
          </p>
          <p>
            Word Identification Standard Score:{" "}
            {selectedTest.word_identification_standard_score}
          </p>
        </div>
      </div>
    </div>
  );
};

export default SecondaryWistResults;
