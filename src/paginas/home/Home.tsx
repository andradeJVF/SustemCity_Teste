import React, { useEffect } from 'react';
import { Typography, Box, Grid, Button } from '@material-ui/core';
import './Home.css';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { UserState } from '../../store/tokens/tokensReducer';
import { toast } from 'react-toastify';
import CarouselComponent from '../../components/carousel2/Carousel2';
import ListaProduto from '../../components/produto/listaProduto/ListaProduto';

function Home() {
  let navigate = useNavigate();
  const token = useSelector<UserState, UserState["tokens"]>(
    (state) => state.tokens
  );

  return (
<div className='back'>
    <>
      <Grid xs={12} direction="row" justifyContent="center" alignItems="center" >
        <Grid container item className='grid-home' >
          <CarouselComponent />
        </Grid>
        <Grid>
          <ListaProduto />
        </Grid>
      </Grid>
    </>
    </div>
  );
}

export default Home;