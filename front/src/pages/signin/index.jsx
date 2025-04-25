import React, { useState } from "react";
import "./styles.css"
import axios from 'axios'
import { useNavigate } from "react-router-dom";

export default function SignIn() {
  const [user, setUser] = useState('')
  const [password, setPassword] = useState('')
  const [mesage, setMesage] = useState('')
  const navigate = useNavigate()

  const logar = async () => {
    try {
      const response = await axios.post(
        'http://127.0.0.1:8000/api/token/',
        {
          username: user,
          password: password
        }
      )
      console.log("TokenLogin: ", response.data.access)
      localStorage.setItem('token', response.data.access)
      navigate('/patrimonios')
    } catch (error) {
      console.error(error)
      console.log("Erro: ", error.response.request.status)
      if(error.response.request.status==401){
        setMesage("Usuário ou senha inválido!")
      }
    }
  }

  return (
    <div className="container_login">
        <section className="section_l">
          <p className="user" >Login</p>

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
          <div className="text_l">
            <p>{mesage}</p>
          </div>
          

          <button className="btn_l" onClick={logar}>
            Enter
          </button>
          <div className="footer_l">
            <div className="footer_ll">
              <div>Ainda não tem conta?</div>
            <button className="btn_f" onClick={()=>navigate("/signup")}>Cadastre-se</button>
            </div>
            
          </div>
        </section>
    </div>
  )
}

