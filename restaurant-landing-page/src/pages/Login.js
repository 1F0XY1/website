import React, { useState } from 'react';
import './Login.css';
import { Link, useNavigate } from 'react-router-dom';

const Login = () => {
 const [email, setEmail] = useState('');
 const [password, setPassword] = useState('');
 const [error, setError] = useState('');
 const [isLoading, setIsLoading] = useState(false);
 const navigate = useNavigate();
  const handleSubmit = async (e) => {
   e.preventDefault();
    if (!email || !password) {
     setError('Please fill in both fields.');
     return;
   }
    setIsLoading(true);
   setError('');
    try {
     const response = await fetch('http://localhost:8080/api/users/login', {
       method: 'POST',
       headers: {
         'Content-Type': 'application/json',
       },
       body: JSON.stringify({
         email: email,
         password: password
       })
     });
      console.log('Response status:', response.status); // Debug log
      const data = await response.json();
     console.log('Response data:', data); // Debug log
      if (response.ok) {
       // Store user data in localStorage
       localStorage.setItem('user', JSON.stringify(data));
       
       // Show success message
       alert('Login successful!');
       
       // Navigate to home page or dashboard
       navigate('/order'); // or wherever you want to redirect after login
     } else {
       throw new Error(data.message || 'Invalid email or password');
     }
   } catch (err) {
     console.error('Login error:', err);
     setError('Invalid email or password.');
   } finally {
     setIsLoading(false);
   }
 };
  return (
   <div className="login-container">
     <form className="login-form" onSubmit={handleSubmit}>
       <br />
       <br />
       <br />
       <h2>Login</h2>
       {error && <p className="error-message">{error}</p>}
       <div className="form-group">
         <label htmlFor="email">Email</label>
         <input
           type="email"
           id="email"
           placeholder="Enter your email"
           value={email}
           onChange={(e) => setEmail(e.target.value)}
           required
         />
       </div>
       <div className="form-group">
         <label htmlFor="password">Password</label>
         <input
           type="password"
           id="password"
           placeholder="Enter your password"
           value={password}
           onChange={(e) => setPassword(e.target.value)}
           required
         />
       </div>
       <button type="submit" disabled={isLoading}>
         {isLoading ? 'Logging in...' : 'Login'}
       </button>
       <p className="switch-auth">
         Don't have an account? <Link to="/register">Register</Link>
       </p>
     </form>
   </div>
 );
};
export default Login;