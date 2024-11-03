import React from 'react'
import SignUp from './pages/SignUp'
import SignIn from './pages/SignIn'
import DashBoard from './pages/DashBoard'
import {BrowserRouter as Router, Route,Routes, Navigate} from 'react-router-dom'
import SendMoney from './components/SendMoney'
import History from './pages/History'

const App = () => {
  return (
    <> 
     <Router>
        <Routes>
          <Route path="/" element={<Navigate to="/signup"/>} />
          <Route path="/signup" element={<SignUp/>} />
          <Route path="/signin" element={<SignIn/>} />
          <Route path="/dashboard" element={<DashBoard/>} />
          <Route path="/send" element={<SendMoney/>}/>
          <Route path="/history" element={<History/>}/>
        </Routes> 
      </Router>
      </>
  )
}

export default App