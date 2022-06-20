import React, { ChangeEvent, useEffect, useState } from 'react'
import { TextField, Box} from "@material-ui/core";
import { useNavigate } from 'react-router-dom'
import User from '../../models/User'
import { buscaId } from '../../services/Service'
import './Perfil.css'
import { useSelector } from 'react-redux'
import { UserState } from '../../store/tokens/tokensReducer'
import 'materialize-css';
import {  Col, Card } from 'react-materialize';



function Perfil() {

    let navigate = useNavigate()
    const userId = useSelector < UserState, UserState["id"]>(
    (state) => state.id
    )

    const token = useSelector < UserState, UserState["tokens"]>(
        (state) => state.tokens
        )

    const [user, setUser] = useState<User>({
        id: + userId,   
        nome: '',
        usuario: '',
        senha: '',
        foto: ''
    })
    const [userResult, setUserResult] = useState<User>(
        {
            id: 0,
            nome: '',
            usuario: '',
            senha: '',
            foto:''
        })

    function updatedModel(e: ChangeEvent<HTMLInputElement>) {

        setUserResult({
            ...userResult,
            [e.target.name]: e.target.value
        })
    }

    useEffect(() => {
        if (token === "") {
            alert("Você precisa estar logado")
            navigate("/login")
        }
    }, [token])

    async function findById(id: string) {
         await buscaId(`/usuarios/${id}`, setUser, {
            headers: {
                'Authorization': token
            }
        })
    }

    useEffect(() => {
        if (userId !== undefined) {
            findById(userId )
        }
    }, [userId ])

    return (
        <Box  className='card-principal'>
             <Box className='meu-perfil'>
                    <h1>Meu Perfil</h1>
                    <hr />
                </Box>
   
      
    <Col className='card-container-info'>
        
         <Col className='card-container-imagem'>
    <img className='card-imagem'
                    src={ user.foto }
                    alt={ user.nome } />
    </Col>

               
        <Card className='card-container-texto'>
          <Box>
          <TextField value={user.nome} onChange={(e: ChangeEvent<HTMLInputElement>) => updatedModel(e)} id='nome' label='Nome' variant='outlined' name='nome' margin='normal' fullWidth placeholder='Insira seu nome completo' required/>
          <TextField value={user.usuario} onChange={(e: ChangeEvent<HTMLInputElement>) => updatedModel(e)} id='usuario' label='Usuário' variant='outlined' name='usuario' margin='normal' fullWidth placeholder='Insira um e-mail válido' required />
            <Col s={12} m={12}>
             
            </Col>
          </Box>
        </Card>
    </Col>
  </Box>
    )
}

export default Perfil;