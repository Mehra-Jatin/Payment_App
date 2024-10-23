import React from 'react'
import Heading from '../components/Heading'
import SubHeading from '../components/Subheading'
import InputBox from '../components/InputBox'
import Button from '../components/Button'
import Warning from '../components/Warning'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'


function SignUp() {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
    return (
        <div className="bg-slate-300 h-screen flex justify-center">
         <div className="flex flex-col justify-center">
           <div className="rounded-lg bg-white w-80 text-center p-2 h-max px-4">
             <Heading label={"Sign up"} />
             <SubHeading label={"Enter your infromation to create an account"} />
             <InputBox action={e=>{setFirstName(e.target.value)}} placeholder="John" label={"First Name"} />
             <InputBox action={e=>{setLastName(e.target.value)}} placeholder="Doe" label={"Last Name"} />
             <InputBox action={e=>{setEmail(e.target.value)}} placeholder="user@gmail.com" label={"Email"} />
             <InputBox action={e=>{setPassword(e.target.value)}} placeholder="123456" label={"Password"} />
             <div className="pt-4">
               <Button label={"Sign up"} action={async()=>{
                const response =fetch('http://localhost:5000/api/v1/user/signup', {
                  method: 'POST',
                  body: JSON.stringify({
                    firstName: firstName,
                    lastName: lastName,
                    email: email,
                    password: password
                  }),
                } )
                localStorage.setItem('token', response.data.token);
                navigate('/dashboard');
               }}/>
             </div>
             <Warning label={"Already have an account?"} buttonText={"Sign in"} to={"/signin"} />
           </div>
         </div>
       </div>
     
       )
}

export default SignUp
