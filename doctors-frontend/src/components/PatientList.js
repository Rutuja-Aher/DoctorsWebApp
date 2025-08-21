// src/components/PatientList.jsx
import React, { useEffect, useState } from "react";
import axios from "axios";
import PatientForm from "./PatientForm";

function PatientList() {
  const [patients, setPatients] = useState([]);
  const [editingPatient, setEditingPatient] = useState(null);

  useEffect(() => {
    fetchPatients();
  }, []);

  const fetchPatients = async () => {
    try {
      const response = await axios.get("http://localhost:5000/api/patients");
      setPatients(response.data);
    } catch (error) {
      console.error("Error fetching patients:", error);
    }
  };

  return (
    <div className="row justify-content-center">
      {/* Single Form for Add/Edit */}
      <div className="col-md-5 mb-4">
        <div className="card p-3 bg-light shadow-sm">
          <PatientForm
            onPatientAdded={fetchPatients}
            editingPatient={editingPatient}
            clearEditing={() => setEditingPatient(null)}
          />
        </div>
      </div>

      {/* Patient List */}
      <div className="col-md-7">
        <h3 className="text-primary">Patient List</h3>
        {patients.length === 0 ? (
          <p>No patients found.</p>
        ) : (
          <table className="table table-striped table-bordered">
            <thead className="table-dark">
              <tr>
                <th>Name</th>
                <th>Gender</th>
                <th>Age</th>
                <th>Contact</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {patients.map((p) => (
                <tr key={p.id}>
                  <td>{p.name}</td>
                  <td>{p.gender}</td>
                  <td>{p.age}</td>
                  <td>{p.contactNumber}</td>
                  <td>
                    <button
                      className="btn btn-warning btn-sm"
                      onClick={() => setEditingPatient(p)}
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

export default PatientList;
