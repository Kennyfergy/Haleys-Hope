const express = require("express");
const { rejectUnauthenticated } = require("../modules/authentication-middleware");
const encryptLib = require("../modules/encryption");
const pool = require("../modules/pool");
const userStrategy = require("../strategies/user.strategy");

const router = express.Router();

// Handles Ajax request for user information if user is authenticated
router.get("/", rejectUnauthenticated, (req, res) => {
  // Send back user object from the session (previously queried from the database)
  res.send(req.user);
});

// GET route to fetch all users who are not deactivated
router.get("/allUsers", (req, res) => {
  const queryText = 'SELECT * FROM "user" WHERE "role_id" > 1 OR "role_id" IS NULL ORDER BY "role_id" DESC';
  pool
    .query(queryText)
    .then((result) => res.send(result.rows))
    .catch((err) => {
      console.error("Error in GET all users", err);
      res.sendStatus(500);
    });
});

// GET route to fetch all users who are archived/deactivated
router.get("/archivedUsers", rejectUnauthenticated, (req, res) => {
  const queryText = 'SELECT * FROM "user" WHERE "role_id" < 2';
  pool
    .query(queryText)
    .then((result) => res.send(result.rows))
    .catch((err) => {
      console.error("Error in GET all users", err);
      res.sendStatus(500);
    });
});

// Handles POST request with new user data
// The only thing different from this and every other post we've seen
// is that the password gets encrypted before being inserted
router.post("/register", (req, res) => {
  const username = req.body.username;
  const password = encryptLib.encryptPassword(req.body.password);

  const queryText = `INSERT INTO "user" (username, password) VALUES ($1, $2) RETURNING id`;

  pool
    .query(queryText, [username, password])
    .then((result) => {
      const newUserId = result.rows[0].id;

      // Check if the new user's ID is 1
      if (newUserId === 1) {
        // Update the user's role_id to 6 (admin)
        const updateQuery = 'UPDATE "user" SET role_id = 6 WHERE id = $1';
        pool
          .query(updateQuery, [newUserId])
          .then(() => {
            res.status(201).send(`User created with ID: ${newUserId} and role set to admin`);
          })
          .catch((err) => {
            console.error("Error in updating role to admin", err);
            res.sendStatus(500);
          });
      } else {
        // If the user's ID is not 1, just send the response
        res.status(201).send(`User created with ID: ${newUserId}`);
      }
    })
    .catch((err) => {
      console.error("User registration failed: ", err);
      res.sendStatus(500);
    });
});

// Handles login form authenticate/login POST
// userStrategy.authenticate('local') is middleware that we run on this route
// this middleware will run our POST if successful
// this middleware will send a 404 if not successful
router.post("/login", userStrategy.authenticate("local"), (req, res) => {
  res.sendStatus(200);
});

// clear all server session information about this user
router.post("/logout", (req, res) => {
  // Use passport's built-in method to log out the user
  req.logout();
  res.sendStatus(200);
});

// PUT route to update user information via ADMIN
router.put("/:userId", rejectUnauthenticated, async (req, res) => {
  const userId = req.params.userId;
  const { first_name, last_name, role_id } = req.body;
  const queryText = `
      UPDATE "user"
      SET first_name = $2, last_name = $3, role_id = $4
      WHERE id = $1
  `;

  try {
    await pool.query(queryText, [userId, first_name, last_name, role_id]);
    res.sendStatus(200);
  } catch (err) {
    console.log("Error in updating user information:", err);
    res.sendStatus(500);
  }
});

module.exports = router;
