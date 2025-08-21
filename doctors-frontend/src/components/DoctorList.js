// src/components/DoctorList.js
import React, { useEffect, useState } from "react";
import axios from "axios";
import DoctorsForm from "./DoctorsForm";

function DoctorList() {
  const [doctors, setDoctors] = useState([]);
  const [editingDoctor, setEditingDoctor] = useState(null);

  useEffect(() => {
    fetchDoctors();
  }, []);

  const fetchDoctors = async () => {
    try {
      const response = await axios.get("http://localhost:5000/api/doctors");
      setDoctors(response.data);
    } catch (error) {
      console.error("Error fetching doctors:", error);
    }
  };

  return (
    <div className="row justify-content-center">
      {/* Doctor Form (Add/Edit) */}
      <div className="col-md-5 mb-4">
        <div className="card p-3 bg-light shadow-sm">
          <DoctorsForm
            onDoctorsAdded={fetchDoctors}
            editingDoctors={editingDoctor}
            clearEditing={() => setEditingDoctor(null)}
          />
        </div>
      </div>

      {/* Doctors List */}
      <div className="col-md-7">
        <h3 className="text-primary">Doctors List</h3>
        {doctors.length === 0 ? (
          <p>No doctors found.</p>
        ) : (
          <table className="table table-striped table-bordered">
            <thead className="table-dark">
              <tr>
                <th>Name</th>
                <th>Specialization</th>
                <th>Gender</th>
                <th>Contact</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {doctors.map((doc) => (
                <tr key={doc.id}>
                  <td>{doc.name}</td>
                  <td>{doc.specialization}</td>
                  <td>{doc.gender}</td>
                  <td>{doc.contact}</td>
                  <td>
                    <button
                      className="btn btn-warning btn-sm"
                      onClick={() => setEditingDoctor(doc)}
                    >
                      Edit
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
}

export default DoctorList;
