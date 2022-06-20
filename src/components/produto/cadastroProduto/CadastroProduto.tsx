import React, { ChangeEvent, useEffect, useState } from 'react'
import { Container, Typography, TextField, Button, Select, InputLabel, MenuItem, FormControl, FormHelperText } from "@material-ui/core"
import './CadastroProduto.css';
import { useNavigate, useParams } from 'react-router-dom';
import Categoria from '../../../models/Categoria';
import Produto from '../../../models/Produto';
import { busca, buscaId, post, put } from '../../../services/Service';
import { useSelector } from 'react-redux';
import { UserState } from '../../../store/tokens/tokensReducer';
import { toast } from 'react-toastify';
import { Link } from 'react-router-dom';

function CadastroProduto() {
    let navigate = useNavigate();
    const { id } = useParams<{ id: string }>();
    const [categoria, setCategoria] = useState<Categoria[]>([])
    const token = useSelector<UserState, UserState["tokens"]>(
        (state) => state.tokens
    );

    useEffect(() => {
        if (token == "") {
            toast.info('Você precisa estar logado', {
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

    const [categorias, setCategorias] = useState<Categoria>(
        {
            id: 0,
            categoria: '',
            descricao: ''
        })
    const [produtos, setProduto] = useState<Produto>({
        id: 0,
        produto: '',
        valor: 0.0,
        descricao: '',
        foto: '',
        tipo: '',
        categoria: null
    })

    useEffect(() => {
        setProduto({
            ...produtos,
            categoria: categorias
        })
    }, [categorias])

    useEffect(() => {
        getCategorias()
        if (id !== undefined) {
            findByIdProduto(id)
        }
    }, [id])

    async function getCategorias() {
        await busca("/categoria", setCategoria, {
            headers: {
                'Authorization': token
            }
        })
    }

    async function findByIdProduto(id: string) {
        await buscaId(`produtos/${id}`, setProduto, {
            headers: {
                'Authorization': token
            }
        })
    }

    function updatedProduto(e: ChangeEvent<HTMLInputElement>) {

        setProduto({
            ...produtos,
            [e.target.name]: e.target.value,
            categoria: categorias
        })

    }

    async function onSubmit(e: ChangeEvent<HTMLFormElement>) {
        e.preventDefault()

        if (id !== undefined) {
            put(`/produtos`, produtos, setProduto, {
                headers: {
                    'Authorization': token
                }
            })
            toast.success('Produto atualizado com sucesso', {
                position: "top-right",
                autoClose: 2000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,

            });
        } else {
            post(`/produtos`, produtos, setProduto, {
                headers: {
                    'Authorization': token
                }
            })
            toast.success('Produto cadastrado com sucesso', {
                position: "top-right",
                autoClose: 2000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,

            });
        }
        back()
    }

    function back() {
        navigate('/produtosadmin/all')
    }

    return (
        <Container maxWidth="sm" className="topo">
            <form onSubmit={onSubmit}>
                <Typography variant="h3" color="textSecondary" component="h1" align="center" >Formulário de cadastro produto</Typography>
                <TextField value={produtos.produto} onChange={(e: ChangeEvent<HTMLInputElement>) => updatedProduto(e)} id="produto" label="Produto" variant="outlined" name="produto" margin="normal" fullWidth />
                <TextField value={produtos.valor} onChange={(e: ChangeEvent<HTMLInputElement>) => updatedProduto(e)} id="valor" label="Valor" name="valor" variant="outlined" margin="normal" fullWidth />
                <TextField value={produtos.descricao} onChange={(e: ChangeEvent<HTMLInputElement>) => updatedProduto(e)} id="descricao" label="Descrição" variant="outlined" name="descricao" margin="normal" fullWidth />
                <TextField value={produtos.foto} onChange={(e: ChangeEvent<HTMLInputElement>) => updatedProduto(e)} id="foto" label="Foto" variant="outlined" name="foto" margin="normal" fullWidth />
                <TextField value={produtos.tipo} onChange={(e: ChangeEvent<HTMLInputElement>) => updatedProduto(e)} id="tipo" label="Descrição - Foto" variant="outlined" name="tipo" margin="normal" fullWidth />

                <FormControl >
                    <InputLabel id="demo-simple-select-helper-label">Categoria </InputLabel>
                    <Select
                        labelId="demo-simple-select-helper-label"
                        id="demo-simple-select-helper"
                        onChange={(e) => buscaId(`/categoria/${e.target.value}`, setCategorias, {
                            headers: {
                                'Authorization': token
                            }
                        })}>
                        {
                            categoria.map(categorias => (
                                <MenuItem value={categorias.id}>{categorias.categoria}</MenuItem>
                            ))
                        }
                    </Select>
                    <FormHelperText>Escolha uma categoria para o produto</FormHelperText>
                        <Button type="submit" variant="contained" className='finalizar'>
                            Finalizar
                        </Button>
                </FormControl>
            </form>
        </Container>
    )
}
export default CadastroProduto;