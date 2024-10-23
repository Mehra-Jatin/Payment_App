import { useState } from "react"
import  Button  from "./Button"  
import { useNavigate } from "react-router-dom";
function Users() {
    const [users, setUsers] = useState([{
        firstName: "Xyz",
        lastName: "abc",
        _id: 1
    }]);

    const navigate = useNavigate();
    return <>
        <div className="font-bold mt-6 text-lg">
            Users
        </div>
        <div className="my-2">
            <input type="text" placeholder="Search users..." className="w-full px-2 py-1 border rounded border-slate-200"></input>
        </div>
        <div>
            {users.map(user => <User user={user} sendmoney={()=>{navigate("/send")}}/>)}
        </div>
    </>
};

function User({user,sendmoney}) {

    return <div className="flex justify-between">
        <div className="flex">
            <div className="rounded-full h-12 w-12 bg-slate-200 flex justify-center mt-1 mr-2">
                <div className="flex flex-col justify-center h-full text-xl">
                    {user.firstName[0]}
                </div>
            </div>
            <div className="flex flex-col justify-center h-ful">
                <div>
                    {user.firstName} {user.lastName}
                </div>
            </div>
        </div>
         
        <div className="flex flex-col justify-center h-ful">
            <Button label={"Send Money"} action={sendmoney} />
        </div>
    </div>
}

export default Users
