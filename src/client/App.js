import React from 'react'
import Login from './components/login'
import CreateUser from './components/CreateUser'
import './stylesheets/styles.scss'

const App = () => {
  return (
    <div className="app-page">
      {/* <Login /> */}
      <CreateUser />
    </div>
  )
}

export default App
