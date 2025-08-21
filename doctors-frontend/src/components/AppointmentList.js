// src/components/AppointmentList.jsx
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import AppointmentForm from './AppointmentForm';

function AppointmentList() {
  const [appointments, setAppointments] = useState([]);
  const [editingAppointment, setEditingAppointment] = useState(null);

  useEffect(() => {
    fetchAppointments();
  }, []);

  const fetchAppointments = async () => {
    try {
      const response = await axios.get('http://localhost:5000/api/appointments');
      setAppointments(response.data);
    } catch (error) {
      console.error('Error fetching appointments:', error);
    }
  };

  const handleEditClick = (appointment) => {
    setEditingAppointment(appointment);
  };

  return (
    <div className="row">
      {/* Appointment Form */}
      <div className="col-md-4 mb-4">
        <div className="card p-3 bg-white shadow-sm">
          <AppointmentForm
            onAppointmentSaved={fetchAppointments}
            editingAppointment={editingAppointment}
            clearEditing={() => setEditingAppointment(null)}
          />
        </div>
      </div>

      {/* Appointment List */}
      <div className="col-md-8">
        <h2>Appointment List</h2>
        <table className="table table-bordered">
          <thead className="table-dark">
            <tr>
              <th>Patient</th>
              <th>Doctor</th>
              <th>Date</th>
              <th>Time</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {appointments.map((appt) => (
              <tr key={appt.id}>
                <td>{appt.patientName}</td>
                <td>{appt.doctorName}</td>
                <td>{appt.date}</td>
                <td>{appt.time}</td>
                <td>
                  <button
                    className="btn btn-warning btn-sm"
                    onClick={() => handleEditClick(appt)}
                  >
                    Edit
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default AppointmentList;
