import { useState ,useEffect} from "react"
import  Button  from "./Button"  
import { useNavigate } from "react-router-dom";
function Users() {
    const [users, setUsers] = useState([]);
    const [filter, setFilter] = useState("");

    useEffect(() => {
        fetch('http://localhost:5000/api/v1/user/bulk?filter='+filter)
            .then(response => response.json())
            .then(data => {
                setUsers(data.USER);
            })
    }, [filter])

    return (<>
        <div className="font-bold mt-6 text-lg">
            Users
        </div>
        <div className="my-2">
            <input type="text"  placeholder="Search users..." className="w-full px-2 py-1 border rounded border-slate-200" onChange={
                e =>{ setFilter(e.target.value)}
            }></input>
        </div>
        <div>
                {
                    users.map(user => <User  user={user} />)
                }
            </div>
        </>
    );
}

function User({ user }) {
    const navigate = useNavigate();
    return (
        <div className="flex justify-between my-2 border-b py-2">
            <div className="flex">
                <div className="rounded-full h-12 w-12 bg-slate-200 flex justify-center mt-1 mr-2">
                    <div className="flex flex-col justify-center h-full text-xl">
                        {user.FirstName ? user.FirstName[0] : ""}
                    </div>
                </div>
                <div className="flex flex-col justify-center">
                    <div>
                        {user.FirstName} {user.LastName}
                    </div>
                </div>
            </div>
            <div className="flex flex-col justify-center">
                <Button
                    label={"Send Money"}
                    action={() => {
                        navigate(`/send?id=${user._id}&name=${user.FirstName}`);
                    }}
                />
            </div>
        </div>
    );
}

export default Users;