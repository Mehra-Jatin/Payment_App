import React from 'react'
import Heading from '../components/Heading'
import SubHeading from '../components/Subheading'
import InputBox from '../components/InputBox'
import Button from '../components/Button'
import Warning from '../components/Warning'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'


function SignIn() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  return (
   <div className="bg-slate-300 h-screen flex justify-center">
    <div className="flex flex-col justify-center">
      <div className="rounded-lg bg-white w-80 text-center p-2 h-max px-4">
        <Heading label={"Sign In"} />
        <SubHeading label={"Enter your credentials to access your account"}  />
        <InputBox action={e=>{setEmail(e.target.value)}} placeholder="user@gmail.com" label={"Email"} />

        <InputBox action={e=>{setPassword(e.target.value)}}  placeholder="123456" label={"Password"} />
        <div className="pt-4">
          <Button label={"Sign In"} action={async()=>{
            const response = await fetch('http://localhost:5000/api/v1/user/signin', {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json'
              },
              body: JSON.stringify({
                email: email,
                password: password
              }),
            })
            const data = await response.json();
            localStorage.setItem('token', data.token);
            navigate('/dashboard');
          }}/>
        </div>
        <Warning label={"Don't have an account?"} buttonText={"Sign up"} to={"/signup"} />
      </div>
    </div>
  </div>

  )
}

export default SignIn
