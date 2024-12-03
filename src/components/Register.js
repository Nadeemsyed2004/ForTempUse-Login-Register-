import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function Register() {
    const navigate = useNavigate();
    const[res,setRes] = useState(true);
    const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
  });
  const [mess, setMess] = useState('');
  const [color,setColor] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
        const response = await fetch('http://localhost:5000/api/auth/register',{
            method:'POST',
            headers:{'Content-Type':'application/json'},
            body:JSON.stringify({name:formData.name, email : formData.email,password : formData.password})
        });

      const data = await response.json();

      if (response.ok) {
        setRes(true);
        // onSuccess();
        setMess(data.messege || 'Registration Successful');
        setTimeout(()=>(navigate('/login'),10000));
        
      } else {
        setRes(false);
        setMess(data.message || 'Registration failed. Please try again.');
      }
    } catch (err) {
        setRes(false);
      console.error(err);
      setMess('An error occurred during registration. Please try again later.');
    }
  };

  return (
    <div style={{ maxWidth: '400px', margin: '20px auto', padding: '20px', border: '1px solid #ccc', borderRadius: '10px' }}>
      <h2 style={{ textAlign: 'center' }}>Register</h2>
      <form onSubmit={handleSubmit}>
        <label htmlFor="name">Name:</label>
        <input
          type="text"
          name="name"
          value={formData.name}
          onChange={handleChange}
          required
          style={{ display: 'block', margin: '10px 0', padding: '8px', width: '90%' }}
        />

        <label htmlFor="email">Email:</label>
        <input
          type="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          required
          style={{ display: 'block', margin: '10px 0', padding: '8px', width: '90%' }}
        />

        <label htmlFor="password">Password:</label>
        <input
          type="password"
          name="password"
          value={formData.password}
          onChange={handleChange}
          required
          style={{ display: 'block', margin: '10px 0', padding: '8px', width: '90%' }}
        />

        <button onMouseEnter={()=>setColor(true)} onMouseLeave={()=>setColor(false)}

          type="submit"
          style={{
            padding: '10px 20px',
            backgroundColor: color? '#5499e8':'#007BFF',
            color: '#fff',
            border: 'none',
            borderRadius: '5px',
            cursor: 'pointer',
            width: '60%',
          }}
        >
          Register
        </button>

        {mess && <p style={{ color: res ? 'green' : 'red', marginTop: '10px', textAlign: 'center' }}>{mess}</p>}
        <p>Already have an Account <button onClick={()=> navigate('/login')}style={buttonStyle}>Login</button></p>
      </form>
    </div>
  );
}

const buttonStyle = {
    backgroundColor: 'transparent',
    color: 'blue',
    borderColor: 'transparent',
    cursor: 'pointer',
  };
  
export default Register;
