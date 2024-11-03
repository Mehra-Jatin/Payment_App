import React from 'react'
import  Button  from "./Button"  
import { useNavigate } from "react-router-dom";
function Balance({value}) {
  const navigate = useNavigate();
  const handleHistory = () => {
    navigate('/history')
}
  return (
<div className=" flex align-middle justify-between">
        <div  className="flex">
        <div className="font-bold text-lg">
            Your balance
        </div>
        <div className="font-semibold ml-4 text-lg">
            Rs {value}
        </div>
       </div> 
        <div className="  h-full mx-4 mt-1">
                    <Button label={"History"} action={handleHistory} />
            </div>
    </div>
  )
}

export default Balance
