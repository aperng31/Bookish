import React, { useState } from 'react'
import Modal from './Modal'
import { CURRENT_SCREEN_MAP } from '../App'

const CreateUser = (props) => {
  const [name, setName] = useState('')
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')

  const createUserRequest = async () => {
    const requestBody = {
      name,
      username,
      password,
    }
    try {
      const response = await fetch('WHATEVERENDPOINT', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(requestBody),
      })
      const data = await response.json()
      if (data) {
        props.setCurrentScreen(CURRENT_SCREEN_MAP.login)
      }
    } catch (err) {
      console.log(err)
      window.alert(err)
    }
  }

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
        <button
          // button is disabled unless user has entered all three required fields
          disabled={!name || !username || !password}
          onClick={createUserRequest}
        >
          Submit & Create Account
        </button>
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
