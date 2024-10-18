import React from 'react'
import SignUp from './pages/SignUp'
import SignIn from './pages/SignIn'
import {BrowserRouter as Router, Route,Routes} from 'react-router-dom'
const App = () => {
  return (
     <Router>
        <Routes>
          <Route path="/" element={<h1>Hello World</h1>} />
          <Route path="/signup" element={<SignUp/>} />
          <Route path="/signin" element={<SignIn/>} />
        </Routes>
      </Router>
  )
}

export default App