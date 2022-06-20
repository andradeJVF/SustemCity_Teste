import React, { ChangeEvent, useEffect, useState } from "react";
import { Grid, Box, Typography, Button, TextField } from "@material-ui/core";
import { Link, useNavigate } from 'react-router-dom'
import UserLogin from "../../models/UserLogin";
import { login } from "../../services/Service";
import './Login.css';
import { useDispatch } from "react-redux";
import { addId, addToken, addUser } from "../../store/tokens/actions";
import { toast } from "react-toastify";

function Login() {

    let navigate = useNavigate();
    const dispatch = useDispatch();
    const [token, setToken] = useState('')
    const [userLogin, setUserLogin] = useState<UserLogin>(
        {
            id: 0,
            nome: "",
            usuario: "",
            senha: "",
            foto: "",
            token: ""
        })

    const [respUserLogin, setRespUserLogin] = useState<UserLogin>({
        id: 0,
        nome: '',
        usuario: '',
        senha: '',
        token: '',
        foto: ""
    })

    useEffect(() => {
        if (token !== '') {
            dispatch(addToken(token));
            navigate('/home')
        }
    }, [token])

    function updatedModel(e: ChangeEvent<HTMLInputElement>) {

        setUserLogin({
            ...userLogin,
            [e.target.name]: e.target.value
        })
    }

    useEffect(() => {
        if (respUserLogin.token !== "") {

            console.log("Token: " + respUserLogin.token)
            console.log("ID: " + respUserLogin.id)

            dispatch(addToken(respUserLogin.token))
            dispatch(addUser(respUserLogin.usuario))
            dispatch(addId(respUserLogin.id.toString()))
            navigate('/home')
        }
    }, [respUserLogin.token])

    async function onSubmit(e: ChangeEvent<HTMLFormElement>) {
        e.preventDefault();
        try {
            await login(`/usuarios/logar`, userLogin, setRespUserLogin)
            toast.success('Usuário Logado com Sucesso!', {
                position: "top-right",
                autoClose: 2000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: false,
                draggable: false,
                progress: undefined,
            });
        } catch (error) {
            toast.error('Dados do Usuário inconsistentes. Erro ao logar!', {
                position: "top-right",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: false,
                draggable: false,
                progress: undefined,
            });
        }
    }

    return (
        <Grid className="fundo">
        <Grid container direction='row' justifyContent="center" alignItems="center" >
            <Grid alignItems="center" xs={6}>
                <Box paddingX={20} paddingY={20}>
                    <form onSubmit={onSubmit}>
                        <Typography variant="h3" gutterBottom color="textPrimary" component='h3' align='center' className='textos1'>Entrar</Typography>
                        <TextField value={userLogin.usuario} onChange={(e: ChangeEvent<HTMLInputElement>) => updatedModel(e)} id='usuario' label='Usuário' variant='outlined' name='usuario' margin='normal' fullWidth placeholder='Insira seu e-mail cadastrado' required />
                        <TextField value={userLogin.senha} onChange={(e: ChangeEvent<HTMLInputElement>) => updatedModel(e)} id='senha' label='Senha' variant='outlined' name='senha' margin='normal' type='password' fullWidth placeholder='Insira sua senha cadastrada' required />

                        <Box marginTop={2} textAlign='center'>
                            <Button type='submit' variant='contained' color='primary' className='textos cor-botao'>
                                Logar
                            </Button>
                        </Box>
                    </form>
                    <Box display='flex' justifyContent='center' marginTop={2}>
                        <Box marginRight={1}>
                            <Typography variant="subtitle1" gutterBottom align="center">Não tem uma conta ?</Typography>
                        </Box>
                        <Link to='/cadastrousuario' className="text-decorator-none">
                            <Typography variant="subtitle1" gutterBottom align="center" className='textos1'>Cadastre-se</Typography>
                        </Link>
                    </Box>
                </Box>
            </Grid>
            <Grid xs={6} className='image'>
            <img src="https://imgur.com/I37M5dQ.png"></img>
            </Grid>
        </Grid>
        </Grid>
    );

}

export default Login;