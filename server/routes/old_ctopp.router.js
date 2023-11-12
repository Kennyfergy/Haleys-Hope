const express = require("express");
const router = express.Router();
const pool = require("../modules/pool");

// GET route to fetch old_ctopp tests for a specific student
router.get("/:student_id", (req, res) => {
  const studentId = req.params.student_id;
  const queryText = 'SELECT * FROM "older_ctopp" WHERE "student_id" = $1';

  pool
    .query(queryText, [studentId])
    .then((result) => res.send(result.rows))
    .catch((err) => {
      console.error("Error completing SELECT older_ctopp query", err);
      res.sendStatus(500);
    });
});

// POST route to add a new record for a specific student
router.post("/", (req, res) => {
  const newOCtopp = req.body;
  // Check if student_id is provided
  if (!newOCtopp.student_id) {
    return res.status(400).send("Student ID is required");
  }
  const queryText = `INSERT INTO "older_ctopp" (
      "student_id", "date", "examiner_id", 
      "elison_scaled_score", "blending_words_scaled_score", "phoneme_isolation_scaled_score", 
      "memory_for_digits_scaled_score", "nonword_repetition_scaled_score", 
      "rapid_digit_naming_scaled_score", "rapid_letter_naming_scaled_score", 
      "blending_nonwords_scaled_score", "segmenting_nonwords_scaled_score", 
      "phonological_awareness_composite", "phonological_memory_composite", 
      "rapid_symbolic_naming_composite", "alt_phonological_awareness"
    ) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14, $15, $16)`;

  const values = [
    newOCtopp.student_id,
    newOCtopp.date,
    newOCtopp.examiner_id,
    newOCtopp.elison_scaled_score,
    newOCtopp.blending_words_scaled_score,
    newOCtopp.phoneme_isolation_scaled_score,
    newOCtopp.memory_for_digits_scaled_score,
    newOCtopp.nonword_repetition_scaled_score,
    newOCtopp.rapid_digit_naming_scaled_score,
    newOCtopp.rapid_letter_naming_scaled_score,
    newOCtopp.blending_nonwords_scaled_score,
    newOCtopp.segmenting_nonwords_scaled_score,
    newOCtopp.phonological_awareness_composite,
    newOCtopp.phonological_memory_composite,
    newOCtopp.rapid_symbolic_naming_composite,
    newOCtopp.alt_phonological_awareness,
  ];

  pool
    .query(queryText, values)
    .then(() => res.sendStatus(201))
    .catch((err) => {
      console.error("Error completing INSERT older_ctopp query", err);
      res.sendStatus(500);
    });
});

// UPDATE route to modify a specific record for a given student
router.put("/:student_id/:id", (req, res) => {
  const studentId = req.params.student_id;
  const recordId = req.params.id;
  const updatedOCtopp = req.body;

  // Constructing the query dynamically based on the fields provided in the body
  let querySet = [];
  for (let key in updatedOCtopp) {
    if (
      updatedOCtopp.hasOwnProperty(key) &&
      key !== "student_id" &&
      key !== "id"
    ) {
      querySet.push(`"${key}" = '${updatedOCtopp[key]}'`);
    }
  }
  if (querySet.length === 0) {
    return res.status(400).send("No update fields provided");
  }

  const queryText = `UPDATE "older_ctopp" SET ${querySet.join(
    ", "
  )} WHERE "student_id" = $1 AND "id" = $2`;

  pool
    .query(queryText, [studentId, recordId])
    .then(() => {
      res.sendStatus(200);
    })
    .catch((err) => {
      console.error("Error completing UPDATE older_ctopp query", err);
      res.sendStatus(500);
    });
}); // end router.put

module.exports = router;
