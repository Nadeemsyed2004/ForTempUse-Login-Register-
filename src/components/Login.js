import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';

function Login({onSuccess}) {
    const navigate = useNavigate();
    const [formData,setFormData] = useState({
        email : '',
        password : ''
    });
    const [messege,setMessege] = useState(false);
    const [res,setRes] = useState();
    const [color,setColor] = useState(false);

    const handleChange =(e) =>{
        setFormData({...formData,[e.target.name]:e.target.value});
    };

    const handleSubmit = async(e)=>{
        e.preventDefault();

        try{
            const response = await fetch('http://localhost:5000/api/auth/login',{
                method:'POST',
                headers:{'Content-Type':'application/json'},
                body:JSON.stringify({email : formData.email,password : formData.password})
            });

            const data = await response.json();

            if(response.ok){
                setRes(true);
                onSuccess();
                setTimeout(()=>navigate('/profile'),1000);
                setMessege("Login Succesfull!");
                console.log('Token:', data.token);
                console.log('User:', data.user);
            }
            else{
                setMessege(data.message);
                setRes(false);
            }
        }
        catch(err){
            setRes(false);
            setMessege("Error in Login");
            console.log(err);
        }
    }

  return (
    <div style={{ maxWidth: '400px', margin: '20px auto', padding: '20px', border: '1px solid #ccc', borderRadius: '10px' }}>
      <h2 style={{ textAlign: 'center' }}>Login</h2>
      <form onSubmit={handleSubmit}>
        <label htmlFor="email" style={{textAlign:'left',marginLeft:'-360px'}}>Email:</label>
        <input
          type="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          required
          style={{ display: 'block', margin: '10px 0', padding: '8px', width: '90%' }}
        />

        <label htmlFor="password" style={{textAlign:'left',marginLeft:'-330px'}}>Password:</label>
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
          Login
        </button>

        {messege && <p style={{ color: res ? 'green' : 'red', marginTop: '10px', textAlign: 'center' }}>{messege}</p>}
        <p>Don't have an account? <button onClick={()=> navigate('/')} style={buttonStyle}>Register</button></p>
      </form>
    </div>
  )
}
const buttonStyle = {
    backgroundColor: 'transparent',
    color: 'blue',
    borderColor: 'transparent',
    cursor: 'pointer',
  };
  
export default Login