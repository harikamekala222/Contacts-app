import React, { useEffect, useState } from "react";
import axios from "axios";

const API_URL = "http://localhost:5000";

function App() {
  const [contacts, setContacts] = useState([]);
  const [form, setForm] = useState({ name: "", phone: "", email: "" });
  const [editId, setEditId] = useState(null);
  const [viewContact, setViewContact] = useState(null);

  // Fetch
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

  // Input
  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  // Submit
  const handleSubmit = async () => {
    if (!form.name || !form.phone || !form.email) {
      alert("All fields required");
      return;
    }

    try {
      if (editId) {
        await axios.put(`${API_URL}/contacts/${editId}`, form);
      } else {
        await axios.post(`${API_URL}/contacts`, form);
      }

      setForm({ name: "", phone: "", email: "" });
      setEditId(null);
      fetchContacts();
    } catch (err) {
      console.error(err);
    }
  };

  // Delete
  const handleDelete = async (id) => {
    try {
      await axios.delete(`${API_URL}/contacts/${id}`);
      fetchContacts();
    } catch (err) {
      console.error(err);
    }
  };

  // Edit
  const handleEdit = (contact) => {
    setForm({
      name: contact.name,
      phone: contact.phone,
      email: contact.email,
    });
    setEditId(contact.id);
  };

  // View
  const handleView = (contact) => {
    setViewContact(contact);
  };

  return (
    <div style={styles.container}>
      <h2>📒 Contacts App</h2>

      {/* FORM */}
      <div style={styles.form}>
        <input
          name="name"
          placeholder="Name"
          value={form.name}
          onChange={handleChange}
        />
        <input
          name="phone"
          placeholder="Phone"
          value={form.phone}
          onChange={handleChange}
        />
        <input
          name="email"
          placeholder="Email"
          value={form.email}
          onChange={handleChange}
        />

        <button type="button" onClick={handleSubmit}>
          {editId ? "Update Contact" : "Add Contact"}
        </button>
      </div>

      {/* VIEW */}
      {viewContact && (
        <div style={styles.viewBox}>
          <h3>Details</h3>
          <p>{viewContact.name}</p>
          <p>{viewContact.phone}</p>
          <p>{viewContact.email}</p>

          <button onClick={() => setViewContact(null)}>Close</button>
        </div>
      )}

      {/* LIST */}
      <ul>
        {contacts.map((c) => (
          <li key={c.id} style={styles.listItem}>
            {c.name} | {c.phone}

            <div>
              <button onClick={() => handleView(c)}>View</button>
              <button onClick={() => handleEdit(c)}>Edit</button>
              <button onClick={() => handleDelete(c.id)}>Delete</button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}

const styles = {
  container: { maxWidth: "600px", margin: "auto" },
  form: { display: "flex", flexDirection: "column", gap: "10px" },
  listItem: {
    display: "flex",
    justifyContent: "space-between",
    padding: "10px",
  },
  viewBox: {
    padding: "10px",
    border: "1px solid black",
    margin: "10px 0",
  },
};

export default App;
