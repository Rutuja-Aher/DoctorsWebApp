// src/App.js
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";

import PatientList from "./components/PatientList";
import AppointmentList from "./components/AppointmentList";
import DoctorList from "./components/DoctorList";

function App() {
  return (
    <Router>
      <div className="page-container container-fluid py-4">
        <h1 className="text-center text-primary mb-4">
          <i className="bi bi-stethoscope"></i> Doctors Web App
        </h1>

        {/* Navigation */}
        <div className="d-flex justify-content-center mb-4">
          <Link className="btn btn-outline-success mx-2" to="/patients">
            Patients
          </Link>
          <Link className="btn btn-outline-info mx-2" to="/appointments">
            Appointments
          </Link>
          <Link className="btn btn-outline-primary mx-2" to="/doctors">
            Doctors
          </Link>
        </div>

        <Routes>
          <Route path="/patients" element={<PatientList />} />
          <Route path="/appointments" element={<AppointmentList />} />
          <Route path="/doctors" element={<DoctorList />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
