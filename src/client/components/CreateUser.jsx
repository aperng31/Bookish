import React, { useState } from 'react'
import Modal from './Modal'
const CreateUser = (props) => {
  const [name, setName] = useState('')
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')

  return (
    <Modal>
      <div className="login">
        <label>
          Name
          <input
            value={name}
            onChange={(event) => {
              setName(event.target.value)
            }}
            type="text"
          />
        </label>
        <label>
          Username
          <input
            value={username}
            onChange={(event) => {
              setUsername(event.target.value)
            }}
            type="text"
          />
        </label>
        <label>
          Password
          <input
            value={password}
            onChange={(event) => {
              setPassword(event.target.value)
            }}
            type="password"
          />
        </label>
        <button>Submit & Create Account</button>
        {/* <button className="create-user">Sign Up</button> */}
      </div>
    </Modal>
  )
}

export default CreateUser
