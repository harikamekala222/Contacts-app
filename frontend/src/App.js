import React, { useEffect, useState } from "react";
import axios from "axios";

// Backend URL
const API_URL = "http://13.232.163.12:5000";

function App() {
  const [contacts, setContacts] = useState([]);
  const [form, setForm] = useState({
    name: "",
    phone: "",
    email: "",
  });

  const [editId, setEditId] = useState(null);
  const [viewContact, setViewContact] = useState(null);

  // Fetch Contacts
  const fetchContacts = async () => {
    try {
      const res = await axios.get(`${API_URL}/contacts`);
      setContacts(res.data);
    } catch (err) {
      console.error("Fetch Error:", err);
      alert("Unable to fetch contacts.");
    }
  };

  useEffect(() => {
    fetchContacts();
  }, []);

  // Input Change
  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  // Add / Update Contact
  const handleSubmit = async () => {
    if (!form.name || !form.phone || !form.email) {
      alert("Please fill all fields.");
      return;
    }

    try {
      if (editId) {
        await axios.put(`${API_URL}/contacts/${editId}`, form);
        alert("Contact Updated");
        setEditId(null);
      } else {
        await axios.post(`${API_URL}/contacts`, form);
        alert("Contact Added");
      }

      setForm({
        name: "",
        phone: "",
        email: "",
      });

      fetchContacts();
    } catch (err) {
      console.error("Submit Error:", err);
      alert("Something went wrong.");
    }
  };

  // Delete Contact
  const handleDelete = async (id) => {
    if (!window.confirm("Delete this contact?")) return;

    try {
      await axios.delete(`${API_URL}/contacts/${id}`);
      alert("Contact Deleted");
      fetchContacts();
    } catch (err) {
      console.error("Delete Error:", err);
    }
  };

  // Edit Contact
  const handleEdit = (contact) => {
    setForm({
      name: contact.name,
      phone: contact.phone,
      email: contact.email,
    });

    setEditId(contact.id);
  };

  // View Contact
  const handleView = (contact) => {
    setViewContact(contact);
  };

  return (
    <div style={styles.container}>
      <h1 style={styles.title}>📒 Contacts App</h1>

      <div style={styles.form}>
        <input
          type="text"
          name="name"
          placeholder="Enter Name"
          value={form.name}
          onChange={handleChange}
          style={styles.input}
        />

        <input
          type="text"
          name="phone"
          placeholder="Enter Phone"
          value={form.phone}
          onChange={handleChange}
          style={styles.input}
        />

        <input
          type="email"
          name="email"
          placeholder="Enter Email"
          value={form.email}
          onChange={handleChange}
          style={styles.input}
        />

        <button onClick={handleSubmit} style={styles.addButton}>
          {editId ? "Update Contact" : "Add Contact"}
        </button>
      </div>

      {viewContact && (
        <div style={styles.viewBox}>
          <h3>Contact Details</h3>

          <p>
            <strong>Name :</strong> {viewContact.name}
          </p>

          <p>
            <strong>Phone :</strong> {viewContact.phone}
          </p>

          <p>
            <strong>Email :</strong> {viewContact.email}
          </p>

          <button
            style={styles.closeButton}
            onClick={() => setViewContact(null)}
          >
            Close
          </button>
        </div>
      )}

      <ul style={styles.list}>
        {contacts.map((contact) => (
          <li key={contact.id} style={styles.listItem}>
            <div>
              <strong>{contact.name}</strong>
              <br />
              {contact.phone}
            </div>

            <div>
              <button
                style={styles.viewButton}
                onClick={() => handleView(contact)}
              >
                View
              </button>

              <button
                style={styles.editButton}
                onClick={() => handleEdit(contact)}
              >
                Edit
              </button>

              <button
                style={styles.deleteButton}
                onClick={() => handleDelete(contact.id)}
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

const styles = {
  container: {
    maxWidth: "700px",
    margin: "40px auto",
    fontFamily: "Arial",
    padding: "20px",
  },

  title: {
    textAlign: "center",
    color: "#333",
  },

  form: {
    display: "flex",
    flexDirection: "column",
    gap: "10px",
    marginBottom: "20px",
  },

  input: {
    padding: "10px",
    fontSize: "16px",
  },

  addButton: {
    padding: "10px",
    background: "green",
    color: "#fff",
    border: "none",
    cursor: "pointer",
    fontSize: "16px",
  },

  list: {
    listStyle: "none",
    padding: 0,
  },

  listItem: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    border: "1px solid #ddd",
    padding: "10px",
    marginBottom: "10px",
    borderRadius: "5px",
  },

  viewBox: {
    border: "1px solid #ccc",
    padding: "15px",
    marginBottom: "20px",
    borderRadius: "5px",
    background: "#f8f8f8",
  },

  viewButton: {
    background: "#673ab7",
    color: "white",
    border: "none",
    padding: "6px 10px",
    marginRight: "5px",
    cursor: "pointer",
  },

  editButton: {
    background: "#2196f3",
    color: "white",
    border: "none",
    padding: "6px 10px",
    marginRight: "5px",
    cursor: "pointer",
  },

  deleteButton: {
    background: "#f44336",
    color: "white",
    border: "none",
    padding: "6px 10px",
    cursor: "pointer",
  },

  closeButton: {
    marginTop: "10px",
    padding: "8px 15px",
    background: "#555",
    color: "white",
    border: "none",
    cursor: "pointer",
  },
};

export default App;
