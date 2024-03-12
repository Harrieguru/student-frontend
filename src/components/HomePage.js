import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Homepage.css';

const HomePage = ({ students, updateStudent, deleteStudent }) => {
  const navigate = useNavigate();
  const[searchTerm,setSearchTerm] = useState('');
  const[foundStudent,setFoundStudent] = useState(null);
  const [showDeleteConfirmation, setShowDeleteConfirmation] = useState(false);
  const [selectedStudentId, setSelectedStudentId] = useState('');

  const handleFindClick = () => {
    const found = students.find((student) => student._id === searchTerm);
    setFoundStudent(found);
    setSearchTerm('');
  }

  const handleEditClick = (studentId) => {
    //redirect to the EditStudent page with the studentId
    navigate(`/editstudent/${studentId}`);
  };

  const handleDeleteClick = (studentId) => {
    setSelectedStudentId(studentId);
    setShowDeleteConfirmation(true);
  };

  const handleDeleteConfirmation = async () => {
    await deleteStudent(selectedStudentId);
    setShowDeleteConfirmation(false);
  };

  return (
    <>
      <div className="nav">
        <label>Find student </label>
        <input type="text" placeholder="75648" onChange={(e) => setSearchTerm(e.target.value)}/>
        <button className='find-btn' type="submit" onClick={handleFindClick}>Find</button>
      </div>

      <div className="delete-confirmation" style={{ display: showDeleteConfirmation ? 'block' : 'none' }}>
        <p>You are about to delete a student record. Are you sure?</p>
        <button onClick={handleDeleteConfirmation}>Yes</button>
        <button className='no-btn' onClick={() => setShowDeleteConfirmation(false)}>No</button>
      </div>

      {foundStudent ? (
        // If a student is found, display their details
        <div className="found-student">
          <h2>Found Student</h2>
          <p>ID: {foundStudent._id}</p>
          <p>First Name: {foundStudent.firstName}</p>
          <p>Last Name: {foundStudent.lastName}</p>
          <p>Address: {foundStudent.address}</p>
          <p>Email: {foundStudent.email}</p>
          <p>Program: {foundStudent.program}</p>
        </div>
      ) : (
        // Display the student list if no student is found
        <div className="student-container">
          <div className="student-list">
            <table>
              <thead>
                <tr>
                  <th>First Name</th>
                  <th>Last Name</th>
                  <th>Address</th>
                  <th>Email</th>
                  <th>Program</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {students.map((student) => (
                  <tr key={student._id}>
                    <td>{student.firstName}</td>
                    <td>{student.lastName}</td>
                    <td>{student.address}</td>
                    <td>{student.email}</td>
                    <td>{student.program}</td>
                    <td>
                      <div className="buttons">
                        <div className="edit">
                          <button className='edit-btn' onClick={() => handleEditClick(student._id)}>Edit</button>
                        </div>
                        <div className="delete">
                            <button className='delete-btn' onClick={() => handleDeleteClick(student._id)}>Delete</button>
                        </div>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </>
  );
};

export default HomePage;
