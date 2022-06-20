import { Button, Container, TextField, Typography } from '@material-ui/core'
import React, { ChangeEvent, useEffect, useState } from 'react'
import { useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom'
import { toast } from 'react-toastify';
import Categoria from '../../../models/Categoria';
import { buscaId, post, put } from '../../../services/Service';
import { UserState } from '../../../store/tokens/tokensReducer';

import './CadastrarCategoria.css';

function CadastrarCategoria() {

    let navigate = useNavigate();
    const { id } = useParams<{ id: string }>();
    const token = useSelector<UserState, UserState["tokens"]>(
        (state) => state.tokens
    );
    const [categoria, setCategoria] = useState<Categoria>({
        id: 0,
        categoria: '',
        descricao: '',
    });

    useEffect(() => {
        if (token == "") {
            toast.error('Você precisa estar logado', {
                position: "top-right",
                autoClose: 2000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
            });
            navigate("/login")

        }
    }, [token])

    useEffect(() => {
        if (id !== undefined) {
            findById(id)
        }
    }, [id])

    async function findById(id: string) {
        buscaId(`/categoria/${id}`, setCategoria, {
            headers: {
                'Authorization': token
            }
        })
    }

    function updatedCategoria(e: ChangeEvent<HTMLInputElement>) {

        setCategoria({
            ...categoria,
            [e.target.name]: e.target.value,
        })

    }

    async function onSubmit(e: ChangeEvent<HTMLFormElement>) {
        e.preventDefault()

        console.log("categoria" + JSON.stringify(categoria)) //

        if (id !== undefined) {
            console.log(categoria) //
            try {
                await put(`/categoria`, categoria, setCategoria, {
                    headers: {
                        'Authorization': token
                    }
                })
                toast.success('Categoria atualizada com sucesso', {
                    position: "top-right",
                    autoClose: 2000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    
                });
            } catch (error) {
                console.log(`Error: ${error}`)
                toast.error('Erro, por favor verifique a quantidaede minima de caracteres', {
                    position: "top-right",
                    autoClose: 2000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    
                })
            }
        } else {
            try {
                await post(`/categoria`, categoria, setCategoria, {
                    headers: {
                        'Authorization': token
                    }
                })
                toast.success('Categoria cadastrada com sucesso', {
                    position: "top-right",
                    autoClose: 2000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    
                    });
            } catch (error) {
                console.log(`Error: ${error}`)
                toast.success('Erro, por favor verifique a quantidade minima de caracteres', {
                    position: "top-right",
                    autoClose: 2000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    
                    });
            }
        }
        back()
    }

    function back() {
        navigate('/categoria')
    }

    return (
        <Container maxWidth="sm" className="topo" >
            <form onSubmit={onSubmit}>
                <Typography variant="h3" color="textSecondary" component="h1" align="center" >
                    Cadastrar categoria
                </Typography>
                <TextField value={categoria.categoria} onChange={(e: ChangeEvent<HTMLInputElement>) => updatedCategoria(e)} id="categoria" label="Nome" name="categoria" margin="normal" fullWidth />
                <TextField value={categoria.descricao} onChange={(e: ChangeEvent<HTMLInputElement>) => updatedCategoria(e)} id="descricao" label="Descrição" name="descricao" margin="normal" fullWidth />
                <Button type="submit" variant="contained" className='cadastrar'>
                    Cadastrar
                </Button>

            </form>

        </Container>
    )
}

export default CadastrarCategoria