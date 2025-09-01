import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import './ForgotPassword';

const LoginForm = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({ email: '', password: '' });
  const [errors, setErrors] = useState({});
  const [generalError, setGeneralError] = useState('');


  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    setErrors({ ...errors, [e.target.name]: '' }); // Clear error on input change
    setGeneralError('');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrors({});
    setGeneralError('');

    try {
      const response = await fetch('/login', { // Or '/auth/login' depending on your backend setup
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        // Successful login
        navigate('/'); // Redirect to main page
      } else {
        // Handle login errors
        const errorData = await response.json();


        if (response.status === 401) {
          // Display user-friendly error message
          setGeneralError(errorData.message || 'Invalid credentials');
        } else {
           // Generic error handling
           console.error('Login failed:', errorData);
           setGeneralError('An error occurred during login.');
        }


      }
    } catch (error) {
      console.error('An error occurred:', error);
      setGeneralError('An error occurred during login.');
    }
  };



  return (
    <form onSubmit={handleSubmit}>
      <label htmlFor="email">Email:</label>
      <input type="email" id="email" name="email" onChange={handleChange} value={formData.email} />
      {errors.email && <p style={{ color: 'red' }}>{errors.email}</p>}
      <label htmlFor="password">Password:</label>
      <input type="password" id="password" name="password" onChange={handleChange} value={formData.password} />
      {errors.password && <p style={{ color: 'red' }}>{errors.password}</p>}

      {generalError && <p style={{ color: 'red' }}>{generalError}</p>}

      <button type="submit">Login</button>

      <Link to="/register">Don't have an account? Register here</Link>
      <Link to="/forgot-password">Forgot Password?</Link>
    </form>
  );
};

export default LoginForm;
