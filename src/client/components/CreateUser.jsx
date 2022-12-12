import React, { useState } from 'react'
import Modal from './Modal'
import { CURRENT_SCREEN_MAP } from '../App'

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
        <div className="divider" />
        <button
          onClick={() => {
            props.setCurrentScreen(CURRENT_SCREEN_MAP.login)
          }}
        >
          Click here to go back to Login
        </button>
      </div>
    </Modal>
  )
}

export default CreateUser
