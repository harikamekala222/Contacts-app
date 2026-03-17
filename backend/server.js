const express = require("express");
const cors = require("cors");
const db = require("./db");

const app = express();
app.use(cors());
app.use(express.json());
app.get("/", (req, res) => {
  res.send("Backend is running ");
});

app.post("/contacts", (req, res) => {
  const { name, phone, email } = req.body;
  db.query(
    "INSERT INTO contacts (name, phone, email) VALUES (?, ?, ?)",
    [name, phone, email],
    (err) => {
      if (err) return res.status(500).send(err);
      res.send("Added");
    }
  );
});

app.get("/contacts", (req, res) => {
  db.query("SELECT * FROM contacts", (err, result) => {
    res.json(result);
  });
});

app.put("/contacts/:id", (req, res) => {
  const { id } = req.params;
  const { name, phone, email } = req.body;

  db.query(
    "UPDATE contacts SET name=?, phone=?, email=? WHERE id=?",
    [name, phone, email, id],
    () => res.send("Updated")
  );
});

app.delete("/contacts/:id", (req, res) => {
  db.query("DELETE FROM contacts WHERE id=?", [req.params.id], () =>
    res.send("Deleted")
  );
});

app.listen(5000, () => console.log("Backend running on 5000"));