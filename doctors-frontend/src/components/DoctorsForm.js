import React, { useState, useEffect } from 'react';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';

function DoctorsForm({ onDoctorsAdded, editingDoctors, clearEditing }) {
  const [form, setForm] = useState({
    name: '',
    specialization : '',
    gender: '',
    contact: ''
  });

  useEffect(() => {
    if (editingDoctors) {
      setForm(editingDoctors);
    } else {
      setForm({name: '', specialization : '', gender: '', contact: '' });
    }
  }, [editingDoctors]);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      if (editingDoctors) {
        await axios.put(`http://localhost:5000/api/doctors/${editingDoctors.id}`, {
          ...form,
        });
      } else {
        await axios.post("http://localhost:5000/api/doctors", {
          ...form,
        });
      }

      onDoctorsAdded();
      clearEditing();
    } catch (err) {
      console.error("Save failed", err);
    }
  };

  return (
    <div className="card p-4 bg-light shadow-lg">
      <h3 className="text-primary">{editingDoctors ? 'Edit Doctors' : 'Add New Doctor'}</h3>
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
          name="specialization" 
          value={form.specialization} 
          onChange={handleChange} 
          placeholder="specialization" 
          required />
        </div>

        <div className="col-md-6">
          <select className="form-select" 
          name="gender" 
          value={form.gender} 
          onChange={handleChange} required>
            <option value="">Select Gender</option>
            <option value="Male">Male</option>
            <option value="Female">Female</option>
          </select>
        </div>

        <div className="col-md-6">
          <input className="form-control" 
          name="contact" 
          value={form.contact} 
          onChange={handleChange} 
          placeholder="Contact" 
          required />
        </div>

        <div className="col-12 d-flex gap-2">
          <button className="btn btn-success w-100" 
          type="submit">
            {editingDoctors ? 'Update' : 'Add'}
          </button>

          {editingDoctors && (
            <button className="btn btn-secondary" 
            type="button" onClick={clearEditing}>
              Cancel
            </button>
          )}
        </div>
      </form>
    </div>
  );
}

export default DoctorsForm;
