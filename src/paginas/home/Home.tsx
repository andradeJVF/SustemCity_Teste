import React, { useEffect } from 'react';
import { Typography, Box, Grid, Button } from '@material-ui/core';
import './Home.css';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { UserState } from '../../store/tokens/tokensReducer';
import { toast } from 'react-toastify';
import ListaProduto from '../../components/produto/listaProduto/ListaProduto';
import CarouselComponent from '../../components/carousel/Carousel';

function Home() {
  let navigate = useNavigate();
  const token = useSelector<UserState, UserState["tokens"]>(
    (state) => state.tokens
  );

  return (
    <div className='back'>
      <>
        <Grid xs={12} direction="row" >
          <Grid className='container-carousel-home'>
            <Grid xs={8} container item className='grid-home' >
              <CarouselComponent />
            </Grid>
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