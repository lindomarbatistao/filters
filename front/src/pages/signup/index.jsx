import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./styles.css"
import axios from 'axios'

export default function SignUp() {
  const [user, setUser] = useState('')
  const [password, setPassword] = useState('')
  const navigate = useNavigate()

  const register = () => {
    try {
      axios.post('http://127.0.0.1:8000/api/signup/',
        {
          username: user,
          password: password
        }
      )
      console.log("usuário cadastrado com sucesso!!")
      navigate('/home')
    } catch (error) {

    }

  }


  return (
    <div className="container_login">
      <section className="section">
        <p className="user" >Sign Up</p>

        <p>Usuário</p>
        <input
          className="caixa"
          value={user}
          onChange={(e) => { setUser(e.target.value) }}
          placeholder="User"
        />

        <p>Senha:</p>
        <input
          className="caixa"
          value={password}
          onChange={(e) => { setPassword(e.target.value) }}
          placeholder="Password"
          type="password"
        />

        <button className="btn" onClick={register} >
          Cadastrar
        </button>

      </section>
    </div>
  )
}

