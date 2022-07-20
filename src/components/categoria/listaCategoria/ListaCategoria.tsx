import { Button, Card, CardActions, CardContent, Grid, Typography } from '@material-ui/core';
import { Box } from '@mui/material'
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
      <Grid xs={12} className='lista-container'>
        <table>
          <thead>
            <tr>
              <th>Categoria</th>
              <th>Descrição</th>
            </tr>
          </thead>
          <tbody>
            {categoria.map(categoria => {
              return (
                <tr key={categoria.id}>
                  <td>{categoria.categoria}</td>
                  <td>{categoria.descricao}</td>
                  <td><Link to={`/atualizarCategoria/${categoria.id}`} className="text-decorator-none">
                    <Button variant="contained" size='small' className='botao-1'>
                      Atualizar
                    </Button>
                  </Link></td>
                  <td><Link to={`/deletarCategoria/${categoria.id}`} className="text-decorator-none">
                    <Button variant="contained" size='small' className='botao-2'>
                      Excluir
                    </Button>
                  </Link></td>
                </tr>
              )
            })}

          </tbody>
        </table>
      </Grid>
  );
}

export default ListaCategoria;