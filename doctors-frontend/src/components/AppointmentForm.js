import React, { useEffect, useState } from "react";
import axios from "axios";
import 'bootstrap/dist/css/bootstrap.min.css';

function AppointmentForm({onAppointmentSaved,editingAppointment,clearEditing,}) {
  const [form, setForm] = useState({
    patientName: "",
    doctorName: "",
    date: "",
    time: "",
  });
  const currentYear = new Date().getFullYear(); // Will return 2025
  const minDate = `${currentYear}-01-01`;
  //const today = new Date().toISOString().split("T")[0]; // gives "2025-07-27"
  //const minDate = today;
  
  useEffect(() => {
    if (editingAppointment) {
      setForm(editingAppointment); // 🟨 Prefill form
    }
  }, [editingAppointment]);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const getDoctors = async () => {
    try {
      const response = await axios.get("http://localhost:5000/api/doctors");
      console.log("???", response);
    } catch (error) {
      console.log(error);
    }
  };

  getDoctors()

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (editingAppointment) {
        // 🟨 Edit
        await axios.put(
          `http://localhost:5000/api/appointments/${editingAppointment.id}`,
          form
        );
      } else {
        // Create new
        await axios.post("http://localhost:5000/api/appointments", form);
      }

      setForm({ patientName: "", doctorName: "", date: "", time: "" });
      onAppointmentSaved();
      clearEditing(); // 🟨 Reset editing state
    } catch (error) {
      console.error("Error saving appointment:", error);
    }
  };

  return (
    <div className="card p-4 bg-light shadow-lg">
      <h4>{editingAppointment ? "Edit Appointment" : "Add New Appointment"}</h4>
      <form onSubmit={handleSubmit}>
        <input
          className="form-control mb-2"
          name="patientName"
          placeholder="Patient Name"
          value={form.patientName}
          onChange={handleChange}
          required
        />
        <input
          className="form-control mb-2"
          name="doctorName"
          placeholder="Doctor Name"
          value={form.doctorName}
          onChange={handleChange}
          required
        />
        <input
          className="form-control mb-2"
          type="date"
          name="date"
          value={form.date}
          onChange={handleChange}
          min={minDate} 
        />
        <input
          className="form-control mb-2"
          type="time"
          name="time"
          value={form.time}
          onChange={handleChange}
          required
        />

        <button className="btn btn-success" onClick={handleSubmit}>
          {editingAppointment ? "Update" : "Add"}
        </button>
        
        {editingAppointment && (
          <button
            type="button"
            className="btn btn-secondary ms-2"
            onClick={clearEditing}
          >
            Cancel
          </button>
        )}
      </form>
    </div>
  );
}

export default AppointmentForm;
