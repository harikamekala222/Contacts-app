const express = require("express");
const cors = require("cors");
const db = require("./db");

const app = express();

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
    res.send("Backend is running");
});

// Create
app.post("/contacts", (req, res) => {

    const { name, phone, email } = req.body;

    db.query(
        "INSERT INTO contacts(name,phone,email) VALUES(?,?,?)",
        [name, phone, email],
        (err) => {

            if (err) {
                return res.status(500).json(err);
            }

            res.json({
                message: "Contact Added"
            });

        }
    );

});

// Read
app.get("/contacts", (req, res) => {

    db.query("SELECT * FROM contacts", (err, result) => {

        if (err) {
            return res.status(500).json(err);
        }

        res.json(result);

    });

});

// Update
app.put("/contacts/:id", (req, res) => {

    const { id } = req.params;
    const { name, phone, email } = req.body;

    db.query(
        "UPDATE contacts SET name=?,phone=?,email=? WHERE id=?",
        [name, phone, email, id],
        (err) => {

            if (err) {
                return res.status(500).json(err);
            }

            res.json({
                message: "Updated"
            });

        }
    );

});

// Delete
app.delete("/contacts/:id", (req, res) => {

    db.query(
        "DELETE FROM contacts WHERE id=?",
        [req.params.id],
        (err) => {

            if (err) {
                return res.status(500).json(err);
            }

            res.json({
                message: "Deleted"
            });

        }
    );

});

app.listen(5000, () => {
    console.log("Server running on port 5000");
});
