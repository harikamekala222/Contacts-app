import React, { useEffect, useState } from "react";
import axios from "axios";

const API_URL = "http://localhost:5000";

function App() {
  const [contacts, setContacts] = useState([]);
  const [form, setForm] = useState({
    name: "",
    phone: "",
    email: ""
  });
  const [editId, setEditId] = useState(null);

  // 👉 New: View state
  const [viewContact, setViewContact] = useState(null);

  // Fetch contacts
  const fetchContacts = async () => {
    try {
      const res = await axios.get(`${API_URL}/contacts`);
      setContacts(res.data);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    fetchContacts();
  }, []);

  // Handle input
  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  // Add / Update
  const handleSubmit = async () => {
    if (!form.name || !form.phone || !form.email) {
      alert("All fields required");
      return;
    }

    try {
      if (editId) {
        await axios.put(`${API_URL}/contacts/${editId}`, form);
        setEditId(null);
      } else {
        await axios.post(`${API_URL}/contacts`, form);
      }

      setForm({ name: "", phone: "", email: "" });
      fetchContacts();
    } catch (err) {
      console.error(err);
    }
  };

  // Delete
  const handleDelete = async (id) => {
    await axios.delete(`${API_URL}/contacts/${id}`);
    fetchContacts();
  };

  // Edit
  const handleEdit = (contact) => {
    setForm(contact);
    setEditId(contact.id);
  };

  // 👉 View
  const handleView = (contact) => {
    setViewContact(contact);
  };

  return (
    <div style={styles.container}>
      <h2 style={styles.title}>📒 Contacts App</h2>

      {/* FORM */}
      <div style={styles.form}>
        <input
          name="name"
          placeholder="Name"
          value={form.name}
          onChange={handleChange}
          style={styles.input}
        />
        <input
          name="phone"
          placeholder="Phone"
          value={form.phone}
          onChange={handleChange}
          style={styles.input}
        />
        <input
          name="email"
          placeholder="Email"
          value={form.email}
          onChange={handleChange}
          style={styles.input}
        />

        <button onClick={handleSubmit} style={styles.button}>
          {editId ? "Update Contact" : "Add Contact"}
        </button>
      </div>

      {/* VIEW SECTION */}
      {viewContact && (
        <div style={styles.viewBox}>
          <h3>Contact Details</h3>
          <p><b>Name:</b> {viewContact.name}</p>
          <p><b>Phone:</b> {viewContact.phone}</p>
          <p><b>Email:</b> {viewContact.email}</p>

          <button onClick={() => setViewContact(null)} style={styles.closeBtn}>
            Close
          </button>
        </div>
      )}

      {/* LIST */}
      <ul style={styles.list}>
        {Array.isArray(contacts) &&
          contacts.map((c) => (
            <li key={c.id} style={styles.listItem}>
              <span>
                <strong>{c.name}</strong> | {c.phone}
              </span>

              <div>
                <button
                  onClick={() => handleView(c)}
                  style={styles.viewBtn}
                >
                  View
                </button>

                <button
                  onClick={() => handleEdit(c)}
                  style={styles.editBtn}
                >
                  Edit
                </button>

                <button
                  onClick={() => handleDelete(c.id)}
                  style={styles.deleteBtn}
                >
                  Delete
                </button>
              </div>
            </li>
          ))}
      </ul>
    </div>
  );
}

// 🎨 Styles
const styles = {
  container: {
    maxWidth: "600px",
    margin: "40px auto",
    fontFamily: "Arial"
  },
  title: {
    textAlign: "center"
  },
  form: {
    display: "flex",
    flexDirection: "column",
    gap: "10px",
    marginBottom: "20px"
  },
  input: {
    padding: "8px"
  },
  button: {
    padding: "10px",
    backgroundColor: "green",
    color: "white",
    border: "none"
  },
  list: {
    listStyle: "none",
    padding: 0
  },
  listItem: {
    display: "flex",
    justifyContent: "space-between",
    padding: "10px",
    borderBottom: "1px solid #ccc"
  },
  viewBox: {
    border: "1px solid #ccc",
    padding: "15px",
    marginBottom: "20px",
    background: "#f9f9f9"
  },
  viewBtn: {
    backgroundColor: "#673ab7",
    color: "white",
    marginRight: "5px"
  },
  editBtn: {
    backgroundColor: "#2196f3",
    color: "white",
    marginRight: "5px"
  },
  deleteBtn: {
    backgroundColor: "#f44336",
    color: "white"
  },
  closeBtn: {
    marginTop: "10px"
  }
};

export default App;
