import React from 'react'
import AppBar from '../components/AppBar'
import Balance from '../components/Balance'
import  Users  from '../components/Users'
import { useEffect, useState } from 'react'

function DashBoard() {
  const [balance, setBalance] = useState(0);
  const [name, setName] = useState('');
  useEffect(() => {
    const fetchBalance = async () => {
      try {
        const response = await fetch('http://localhost:5000/api/v1/account/balance', {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + localStorage.getItem('token'),
          },
        });

        const data = await response.json();
        setBalance(data.balance);
        setName(data.name);
      } catch (error) {
        console.error('Error fetching balance:', error);
      
      }
    };

    fetchBalance();
  }, []);

  
  return (
    <div>
       <AppBar firstName={name} />
        <div className="m-8">
            <Balance value={balance} />
            <Users />
       </div>
    </div>
  )
}

export default DashBoard
