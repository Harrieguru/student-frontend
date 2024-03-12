import React,{useState, useEffect} from 'react'
import './App.css';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import HomePage from './components/HomePage';
import axios from 'axios';
import NewStudent from './components/NewStudent';
import EditStudent from './components/EditStudent';

function App() {
  const [students,setStudents] = useState([]);

  useEffect(() => {
    fetchStudents();
  },[]);

  const fetchStudents = async() => {
      const response = await axios.get('http://localhost:4000/students');
      setStudents(response.data);
  }

  // add students
  const addStudents = async(studentNumber, firstName, lastName, address, city, phoneNumber, email, program) => {
    await axios.post('http://localhost:4000/students', {
      studentNumber,
      firstName,
      lastName,
      address,
      city,
      phoneNumber,
      email,
      program
    });
    fetchStudents();
  };
  

  // update student
  const updateStudent = async(id,studentNumber,firstName,lastName,address,city,phoneNumber,email,program) => {
    await axios.put(`http://localhost:4000/students/${id}`,{studentNumber,firstName,lastName,address,city,phoneNumber,email,program});
    fetchStudents();
  }

  // delete student
  const deleteStudent = async(id) => {
    await axios.delete(`http://localhost:4000/students/${id}`);
    fetchStudents();
  }


  return (
    <Router>
        <div className="App">
            <Link to='/addstudent' style={{ textDecoration: 'none' }}>
              <div className="register">
                <button type='submit'>Register Student</button>
              </div>
            </Link>
            <Routes>
              <Route path="/" element={<HomePage students={students} updateStudent={updateStudent} deleteStudent={deleteStudent} />} />
              <Route path="/editstudent/:studentId" element={<EditStudent updateStudent={updateStudent} />} />
              <Route path="/addstudent" element={<NewStudent addStudent={addStudents} />} />
            </Routes>
        </div>
    </Router>   
  );
}

export default App;
