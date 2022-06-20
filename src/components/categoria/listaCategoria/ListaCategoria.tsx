import { Box, Button, Card, CardActions, CardContent, Typography } from '@material-ui/core';
import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import Categoria from '../../../models/Categoria';
import { busca } from '../../../services/Service';
import { UserState } from '../../../store/tokens/tokensReducer';

import './ListaCategoria.css';

function ListaCategoria() {

  let navigate = useNavigate();
  const [categoria, setCategoria] = useState<Categoria[]>([])
  const token = useSelector<UserState, UserState["tokens"]>(
    (state) => state.tokens
  );

  useEffect(() => {
    if (token === '') {
      toast.info('Você precisa estar logado', {
        position: "top-right",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,

      });
      navigate('/login')
    }
  }, [token])

  async function getCategoria() {
    await busca('/categoria', setCategoria, {
      headers: {
        'Authorization': token
      }
    })
  }

  useEffect(() => {
    getCategoria()
  }, [categoria.length])

  return (
    <div className='container-categoria'>
      {
        categoria.map(categoria => (

          <Box paddingTop={2} paddingLeft={2}>
            <Card className='card-tamanho'>
              <CardContent>
                <Typography className='cat-nome' gutterBottom>
                  {categoria.categoria}
                </Typography>
                <Typography className='cat-descricao' variant="body2">
                  {categoria.descricao}
                </Typography>
              </CardContent>
              <CardActions className='alinhar-botao'>
                  <Link to={`/atualizarCategoria/${categoria.id}`} className="text-decorator-none">
                    <Button variant="contained" size='small' className='botao-1'>
                      Atualizar
                    </Button>
                  </Link>
               
                  <Link to={`/deletarCategoria/${categoria.id}`} className="text-decorator-none">
                    <Button variant="contained" size='small' className='botao-2'>
                      Deletar
                    </Button>
                  </Link>
              </CardActions>
            </Card>
          </Box>

        ))}
    </div>
  );
}

export default ListaCategoria;