import React, { useEffect, useState, ChangeEvent } from 'react'
import { Box, Button, Card, Grid, TextField, Typography } from '@material-ui/core'
import { Link, useNavigate, useParams } from 'react-router-dom'

import Produto from '../../models/Produto'
import { buscaId } from '../../services/Service'

import './Cart.css'
import { UserState } from '../../store/tokens/tokensReducer'
import { useSelector } from 'react-redux'
import { toast } from 'react-toastify'

function Cart() {

    let navigate = useNavigate()
    const { id } = useParams<{ id: string }>()
    const token = useSelector<UserState, UserState["tokens"]>(
        (state) => state.tokens
    );
    const [quantidadeFinal, setQuantidadeFinal] = useState(0)

    const [produto, setProduto] = useState<Produto>({
        id: 0,
        produto: '',
        valor: 0,
        descricao: '',
        foto: '',
        tipo: '',
        categoria: null
    })

    useEffect(() => {
        if (token === "") {
            alert("Você precisa estar logado")
            navigate("/login")
        }
    }, [token])

    useEffect(() => {
        if (id !== undefined) {
            findByIdProduto(id)
        }
    }, [id])

    async function findByIdProduto(id: string) {
        await buscaId(`produtos/${id}`, setProduto, {
            headers: {
                'Authorization': token
            }
        })
    }

    function handleChange(e: ChangeEvent<HTMLInputElement>) {
        let preco = +e.target.value
        setQuantidadeFinal(preco);
    }

    function valorTotal() {
        return quantidadeFinal * produto.valor
    }

    function confirmSales() {
        toast.success('Compra confirmada com sucesso! Verifique seu e-mail!', {
            position: "top-right",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
    
          });
        navigate("/home")
    }
    return (
        <div className='div-back'>
        <div className='container-cart'>
            <Grid className='grid-cart'>
                <Grid >
                    <Box className='img'>
                        <Typography><img src={produto.foto} alt="Img" /></Typography>
                    </Box>
                </Grid>

                <Grid>

                    <Card variant="outlined" className='cardContainer'>

                        <div className='cardProduct'>
                            <div className='cardProductInfo'>
                                <Typography variant="h5" component="h2">
                                    {produto.produto}
                                </Typography>
                                <Typography variant="body2" component="p">
                                    R${produto.valor}
                                </Typography>
                                <TextField
                                    value={quantidadeFinal}
                                    onChange={(e: ChangeEvent<HTMLInputElement>) => handleChange(e)}
                                    InputProps={{ inputProps: { min: 1, max: 10 } }}
                                    id="quantidade" label="quantidade" type="number" variant="outlined"
                                    name="quantidade" margin="normal" fullWidth
                                />
                                <Typography variant="body2" component="p">
                                    Total: R$ {valorTotal()}
                                </Typography>
                            </div>
                        </div>
                    </Card>
                </Grid>

                <Grid className='grid botao'>
                        <Box className="cardProductButton">
                            <Box mx={1}>
                                <Button onClick={confirmSales} variant="contained" size='small' className='cart-botao-1'>Confimar Compra</Button>
                            </Box>
                            <Link to="/produtos/all" className="cardProductButton">
                                <Box mx={1}>
                                    <Button variant="contained" size='small' className='cart-botao-2'>Cancelar</Button>
                                </Box>
                            </Link>
                        </Box>
                </Grid>
            </Grid>
        </div>
        </div>
    )
}

export default Cart