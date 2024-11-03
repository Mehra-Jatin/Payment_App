import React, { useState, useEffect } from 'react';
import AppBar from '../components/AppBar';

function History() {
  const [history, setHistory] = useState([]);

 
  const fetchHistory = async () => {
    try {
      const response = await fetch('http://localhost:5000/api/v1/user/history', {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': 'Bearer ' + localStorage.getItem('token'),
        },
      });

      const data = await response.json();
      setHistory(data.history);
      console.log(history);
    } catch (error) {
      console.error('Error fetching history:', error);
    }
  };

  useEffect(() => {
    fetchHistory();
  }, []);


  return (
    <div>
      <AppBar />
      <div className="container mx-auto p-4">
        <h2 className="font-bold mt-6 text-xl text-gray-800">Users</h2>
        <div className="my-4">
          {history.length > 0 ? (
            history.map(user => <User key={user.RecipentID} user={user} />)
          ) : (
            <p className="text-gray-500">No history found</p>
          )}
        </div>
      </div>
    </div>
  );
}

function User({user }) {
  const id = user.RecipentID;
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const amount = user.amount;

  useEffect(() => {
    findUser(id);
  }, [id]);

  const findUser = async (id) => {
    try {
      const response = await fetch(`http://localhost:5000/api/v1/user/about?id=${id}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        }
      });

      const data = await response.json();
      setFirstName(data.FirstName);
      setLastName(data.LastName);
    } catch (error) {
      console.error('Error fetching user:', error);
    }
  };

  return (
    <div className="flex items-center justify-between my-3 p-4 border border-gray-300 rounded-lg shadow-sm bg-white">
      <div className="flex items-center">
        {/* Avatar */}
        <div className="rounded-full h-12 w-12 bg-blue-200 flex items-center justify-center text-white font-semibold mr-3">
          {firstName ? firstName[0] : ""}
        </div>
        {/* User Info */}
        <div>
          <p className="font-medium text-gray-700">{firstName} {lastName}</p>
          <p className="text-gray-500 text-sm">ID: {id}</p>
        </div>
      </div>
      {/* Amount */}
      <div>
        <p className="text-gray-700 font-semibold">₨{amount}</p>
      </div>
    </div>
  );
}

export default History;
