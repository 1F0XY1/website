import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './Register.css';
const Register = () => {
 const [username, setUsername] = useState('');
 const [email, setEmail] = useState('');
 const [password, setPassword] = useState('');
 const [confirmPassword, setConfirmPassword] = useState('');
 const [error, setError] = useState('');
 const [isLoading, setIsLoading] = useState(false);
 const navigate = useNavigate();
  // Function to generate random ID
 const generateRandomId = () => {
   // Generate a random number between 1 and 10000
   return Math.floor(Math.random() * 10000) + 1;
 };
  const handleSubmit = async (e) => {
   e.preventDefault();
    // Validation
   if (!username || !email || !password || !confirmPassword) {
     setError('Please fill in all fields.');
     return;
   }
    if (password !== confirmPassword) {
     setError('Passwords do not match.');
     return;
   }
    setIsLoading(true);
   setError('');
    // Create user data object with random ID
   const userData = {
     id: generateRandomId(),
     username: username,
     email: email,
     password: password
   };
    try {
     console.log('Sending registration data:', userData);
      const response = await fetch('http://localhost:8080/api/users/register', {
       method: 'POST',
       headers: {
         'Content-Type': 'application/json',
       },
       body: JSON.stringify(userData)
     });
      console.log('Response status:', response.status);
     const data = await response.text();
     console.log('Server response:', data);
      if (!response.ok) {
       throw new Error(data || 'Registration failed');
     }
      alert('Registration successful!');
     navigate('/login');
   } catch (err) {
     console.error('Registration error:', err);
     setError(err.message || 'Registration failed. Please try again.');
   } finally {
     setIsLoading(false);
   }
 };
  return (
   <div className="register-container">
     <form className="register-form" onSubmit={handleSubmit}>
       <br />
       <br />
       <br />
       <br />
       <h2>Register</h2>
       {error && <p className="error-message">{error}</p>}
       <div className="form-group">
         <label htmlFor="username">Username</label>
         <input
           type="text"
           id="username"
           placeholder="Enter your username"
           value={username}
           onChange={(e) => setUsername(e.target.value)}
           required
         />
       </div>
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
       <div className="form-group">
         <label htmlFor="confirmPassword">Confirm Password</label>
         <input
           type="password"
           id="confirmPassword"
           placeholder="Confirm your password"
           value={confirmPassword}
           onChange={(e) => setConfirmPassword(e.target.value)}
           required
         />
       </div>
       <button type="submit" disabled={isLoading}>
         {isLoading ? 'Registering...' : 'Register'}
       </button>
       <p className="redirect-message">
         Already have an account? <Link to="/login">Login here</Link>
       </p>
     </form>
   </div>
 );
};
export default Register;