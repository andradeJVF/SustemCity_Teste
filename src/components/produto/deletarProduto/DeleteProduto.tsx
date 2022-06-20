import React, { useEffect, useState } from 'react'
import { Button, Box, Card, CardActions, CardContent, Typography } from '@material-ui/core';
import { useNavigate, useParams } from 'react-router-dom';
import { buscaId, deleteId } from '../../../services/Service';
import './DeleteProduto.css';
import Produto from '../../../models/Produto';
import { useSelector } from 'react-redux';
import { UserState } from '../../../store/tokens/tokensReducer';
import { toast } from 'react-toastify';


function DeletarProduto() {

    let navigate = useNavigate();

    const { id } = useParams<{ id: string }>();

    const token = useSelector<UserState, UserState["tokens"]>(
        (state) => state.tokens
    );

    const [produtos, setProdutos] = useState<Produto>()

    useEffect(() => {
        if (token === "") {
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

    useEffect(() => {
        if (id !== undefined) {
            findById(id)
        }
    }, [id])

    async function findById(id: string) {
        await buscaId(`/produtos/${id}`, setProdutos, {
            headers: {
                'Authorization': token
            }
        })
    }

    async function sim() {
        navigate('/produtosadmin/all')

        await deleteId(`/produtos/${id}`, {
            headers: {
                'Authorization': token
            }
        });

        toast.success('produto deletado com sucesso', {
            position: "top-right",
            autoClose: 2000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
        });
    }

    function nao() {
        navigate('/produtosadmin/all')
    }

    return (
        <div className='container-deletar-produto'>
            <Box m={2}>
                <Card className='card-deletar-produto'>
                    <CardContent>
                        <Box justifyContent="center">
                            <Typography color="textSecondary" gutterBottom>
                                Deseja deletar o Produto:
                            </Typography>
                            <Typography className='nome-produto-del' color="textSecondary" >
                                {produtos?.produto}
                            </Typography>
                        </Box>

                    </CardContent>
                    <CardActions>
                        <Box display="flex" justifyContent="start" ml={1.0} mb={2} >
                            <Box mx={2}>
                                <Button onClick={sim} variant="contained" className='del-botao-1' size='large'>
                                    Sim
                                </Button>
                            </Box>
                            <Box>
                                <Button onClick={nao} variant="contained" size='large' className='del-botao-2'>
                                    Não
                                </Button>
                            </Box>
                        </Box>
                    </CardActions>
                </Card>
            </Box>
        </div>
    )
}

export default DeletarProduto;