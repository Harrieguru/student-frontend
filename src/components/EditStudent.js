import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';

const EditStudent = ({ updateStudent }) => {
  const { studentId } = useParams();
  const [editedStudentData, setEditedStudentData] = useState({
    studentNumber: '',
    firstName: '',
    lastName: '',
    address: '',
    city: '',
    phoneNumber: '',
    email: '',
    program: ''
  });
  const navigate = useNavigate();

  // Fetch single student details
  useEffect(() => {
    const fetchStudentDetails = async () => {
      try {
        const response = await axios.get(`http://localhost:4000/students/${studentId}`);
        setEditedStudentData(response.data);
      } catch (error) {
        console.error('Error fetching student details', error);
      }
    };

    fetchStudentDetails();
  }, [studentId]);

  const handleEditSubmit = (e) => {
    e.preventDefault();
    updateStudent(studentId, editedStudentData)
      .then(() => {
        navigate('/');
      })
      .catch((error) => {
        console.error('Error updating student', error);
      });
  };
  

  const handleChange = (e) => {
    const { name, value } = e.target;
    setEditedStudentData((prevData) => ({
      ...prevData,
      [name]: value
    }));
  };

  return (
    <div>
      <form className="form-container" onSubmit={handleEditSubmit}>
        <label htmlFor="studentNumber">Student Number</label>
        <input
          type="number"
          id="studentNumber"
          name="studentNumber"
          value={editedStudentData.studentNumber}
          onChange={handleChange}
        />
        <br />

        <label htmlFor="firstName">First Name</label>
        <input
          type="text"
          id="firstName"
          name="firstName"
          value={editedStudentData.firstName}
          onChange={handleChange}
        />
        <br />

        <label htmlFor="lastName">Last Name</label>
        <input
          type="text"
          id="lastName"
          name="lastName"
          value={editedStudentData.lastName}
          onChange={handleChange}
        />
        <br />

        <label htmlFor="address">Address</label>
        <input
          type="text"
          id="address"
          name="address"
          value={editedStudentData.address}
          onChange={handleChange}
        />
        <br />

        <label htmlFor="city">City</label>
        <input
          type="text"
          id="city"
          name="city"
          value={editedStudentData.city}
          onChange={handleChange}
        />
        <br />

        <label htmlFor="phoneNumber">Phone Number</label>
        <input
          type="number"
          id="phoneNumber"
          name="phoneNumber"
          value={editedStudentData.phoneNumber}
          onChange={handleChange}
        />
        <br />

        <label htmlFor="email">Email</label>
        <input
          type="email"
          id="email"
          name="email"
          value={editedStudentData.email}
          onChange={handleChange}
        />
        <br />

        <label htmlFor="program">Program</label>
        <input
          type="text"
          id="program"
          name="program"
          value={editedStudentData.program}
          onChange={handleChange}
        />
        <br />

        <button className='update-student-btn' type="submit">Update Student</button>
      </form>
    </div>
  );
};

export default EditStudent;
