import React, { useState } from 'react';
import Heading from '../components/Heading';
import SubHeading from '../components/Subheading';
import InputBox from '../components/InputBox';
import Button from '../components/Button';
import Warning from '../components/Warning';
import { useNavigate } from 'react-router-dom';

function SignUp() {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(""); 
  const navigate = useNavigate();

  const handleSignUp = async () => {
    setError(""); 

    try {
      const response = await fetch('http://localhost:5000/api/v1/user/signup', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          FirstName: firstName,
          LastName: lastName,
          email: email,
          password: password
        }),
      });

  
      if (!response.ok) {
        const errorData = await response.json(); 
        throw new Error(errorData.error || "Failed to sign up");
      }

    
      const data = await response.json();
      localStorage.setItem('token', data.token); 
      navigate('/dashboard');
    } catch (error) {
      console.error(error);
      setError(error.message); 
    }
  };

  return (
    <div className="bg-slate-300 h-screen flex justify-center">
      <div className="flex flex-col justify-center">
        <div className="rounded-lg bg-white w-80 text-center p-2 h-max px-4">
          <Heading label={"Sign up"} />
          <SubHeading label={"Enter your information to create an account"} />
          <InputBox action={e => setFirstName(e.target.value)} placeholder="John" label={"First Name"} />
          <InputBox action={e => setLastName(e.target.value)} placeholder="Doe" label={"Last Name"} />
          <InputBox action={e => setEmail(e.target.value)} placeholder="user@gmail.com" label={"Email"} />
          <InputBox action={e => setPassword(e.target.value)} placeholder="123456" label={"Password"} type="password" />
          
          {error && <p className="text-red-500">{error}</p>}
          
          <div className="pt-4">
            <Button action={handleSignUp} label={"Sign Up"} />
          </div>
          <Warning label={"Already have an account?"} buttonText={"Sign in"} to={"/signin"} />
        </div>
      </div>
    </div>
  );
}

export default SignUp;
