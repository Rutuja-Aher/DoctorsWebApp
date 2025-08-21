import React, { useState, useEffect } from 'react';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';

function PatientForm({ onPatientAdded, editingPatient, clearEditing }) {
  const [form, setForm] = useState({
    name: '',
    age: '',
    gender: '',
    contactNumber: ''
  });

  useEffect(() => {
    if (editingPatient) {
      setForm(editingPatient);
    } else {
      setForm({ name: '', age: '', gender: '', contactNumber: '' });
    }
  }, [editingPatient]);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      if (editingPatient) {
        await axios.put(`http://localhost:5000/api/patients/${editingPatient.id}`, {
          ...form,
          age: parseInt(form.age)
        });
      } else {
        await axios.post("http://localhost:5000/api/patients", {
          ...form,
          age: parseInt(form.age)
        });
      }

      onPatientAdded();
      clearEditing();
    } catch (err) {
      console.error("Save failed", err);
    }
  };

  return (
    <div className="card p-4 bg-light shadow-lg">
      <h3 className="text-primary">{editingPatient ? 'Edit Patient' : 'Add New Patient'}</h3>
      <form onSubmit={handleSubmit} className="row g-3">
        <div className="col-md-6">
          <input className="form-control"
          name="name" 
          value={form.name} 
          onChange={handleChange} 
          placeholder="Name" 
          required />
        </div>

        <div className="col-md-6">
          <input className="form-control" 
          name="age" value={form.age} 
          onChange={handleChange} 
          placeholder="Age" 
          required type="number" />
        </div>

        <div className="col-md-6">
          <select className="form-select" 
          name="gender" 
          value={form.gender} 
          onChange={handleChange} 
          required>
            <option value="">Select Gender</option>
            <option value="Male">Male</option>
            <option value="Female">Female</option>
          </select>
        </div>

        <div className="col-md-6">
          <input className="form-control" 
          name="contactNumber" 
          value={form.contactNumber} 
          onChange={handleChange} 
          placeholder="Contact Number" 
          required />
        </div>

        <div className="col-12 d-flex gap-2">
          <button className="btn btn-success w-100" 
          type="submit">
            {editingPatient ? 'Update' : 'Add'}
          </button>

          {editingPatient && (
            <button className="btn btn-secondary" 
            type="button" 
            onClick={clearEditing}>
              Cancel
            </button>
          )}
        </div>
      </form>
    </div>
  );
}

export default PatientForm;
