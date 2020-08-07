import React, { Component } from 'react'
import { Link, withRouter } from 'react-router-dom'
import firebase from '../../firebase'
import './register.css'

class Register extends Component {

    constructor(props) {
        super(props)
        this.state = {
            nome: '',
            email: '',
            password: ''
        }
        this.register = this.register.bind(this)
        this.onRegister = this.onRegister.bind(this)
    }

    register(e) {
        e.preventDefault()

        this.onRegister()
    }

    onRegister = async () => {
        try {
            const { nome, email, password } = this.state

            await firebase.register(nome, email, password)
            this.props.history.replace('/dashboard')

        } catch (error) {
            alert(error.message)
        }
    }
  
    render() {
        return (
            <div>
                <h1 className="register-h1">Novo Usuário</h1>
                <form onSubmit={this.registrar} id="Register">
                    <label>Nome: </label>
                    <input type="text" value={this.state.nome} autoFocus autoComplete="off" placeholder="Pedro"
                    onChange={(e) => this.setState({nome: e.target.value})} /> <br />

                    <label>Email: </label> 
                    <input type="text" value={this.state.email} autoComplete="off" placeholder="pedro@dev.io"
                    onChange={(e) => this.setState({email: e.target.value})} />  <br />

                    <label>Senha: </label>
                    <input type="text" value={this.state.password} autoComplete="off" placeholder="*******"
                    onChange={(e) => this.setState({password: e.target.value})} />

                    <button type="submit">Cadastrar</button>
                </form>
            </div>
        )
    }
}


export default withRouter(Register)