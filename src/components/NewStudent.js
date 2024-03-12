import React, { useState } from 'react';
import {useNavigate } from 'react-router-dom';
import './Form.css';

const NewStudent = ({ addStudent }) => {
  const [studentData, setStudentData] = useState({
    studentNumber: '',
    firstName: '',
    lastName: '',
    address: '',
    city: '',
    phoneNumber: '',
    email: '',
    program: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setStudentData((prevData) => ({
      ...prevData,
      [name]: value
    }));
  };

  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    addStudent(
      studentData.studentNumber,
      studentData.firstName,
      studentData.lastName,
      studentData.address,
      studentData.city,
      studentData.phoneNumber,
      studentData.email,
      studentData.program
    );
    setStudentData({
      studentNumber: '',
      firstName: '',
      lastName: '',
      address: '',
      city: '',
      phoneNumber: '',
      email: '',
      program: ''
    });
    navigate('/');
  };
  

  return (
    <div>
      <form className="form-container" onSubmit={handleSubmit}>
        <label htmlFor="studentNumber">Student Number</label>
        <input
          type="text"
          id="studentNumber"
          name="studentNumber"
          value={studentData.studentNumber}
          onChange={handleChange}
          required
        />
        <br />

        <label htmlFor="firstName">First Name</label>
        <input
          type="text"
          id="firstName"
          name="firstName"
          value={studentData.firstName}
          onChange={handleChange}
          required
        />
        <br />

        <label htmlFor="lastName">Last Name</label>
        <input
          type="text"
          id="lastName"
          name="lastName"
          value={studentData.lastName}
          onChange={handleChange}
          required
        />
        <br />

        <label htmlFor="address">Address</label>
        <input
          type="text"
          id="address"
          name="address"
          value={studentData.address}
          onChange={handleChange}
          required
        />
        <br />

        <label htmlFor="city">City</label>
        <input
          type="text"
          id="city"
          name="city"
          value={studentData.city}
          onChange={handleChange}
          required
        />
        <br />

        <label htmlFor="phoneNumber">Phone Number</label>
        <input
          type="text"
          id="phoneNumber"
          name="phoneNumber"
          value={studentData.phoneNumber}
          onChange={handleChange}
          required
        />
        <br />

        <label htmlFor="email">Email</label>
        <input
          type="email"
          id="email"
          name="email"
          value={studentData.email}
          onChange={handleChange}
          required
        />
        <br />

        <label htmlFor="program">Program</label>
        <input
          type="text"
          id="program"
          name="program"
          value={studentData.program}
          onChange={handleChange}
          required
        />
        <br />

        <button className='add-student-btn' type="submit">Add Student</button>
      </form>
    </div>
  );
};

export default NewStudent;
