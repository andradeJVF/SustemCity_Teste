import React from 'react';
import { Typography, Box, Grid } from '@material-ui/core';
import GitHubIcon from '@material-ui/icons/GitHub';
import EmailIcon from '@material-ui/icons/Email';
import './Footer.css'
import { useSelector } from 'react-redux';
import { UserState } from '../../../store/tokens/tokensReducer';

function Footer() {

    const token = useSelector<UserState, UserState["tokens"]>(
        (state) => state.tokens
    );

    return (
        <>
            <Grid container direction="row" justifyContent="space-between" alignItems="center" xs={12} className='box1' >
                <Box><img src="https://i.imgur.com/f509CGu.png" className='imagem' /></Box>
                <Box className='box3'>
                    <Typography variant="subtitle2" align="center" gutterBottom className='box3'>© 2022 Copyright:</Typography>
                    <a target="_blank" href="mailto:sustemcity@gmail.com"><Typography variant="subtitle2" gutterBottom align="center" className='box3'>Sustem City</Typography></a>
                </Box>
                <Box>
                    <a href="https://github.com/Projeto-SustemCity" target="_blank"><GitHubIcon className='redes' /></a>
                    <a href="sustemcity@gmail.com" target="_blank"><EmailIcon className='redes' /></a>
                </Box>

            </Grid>
        </>
    )
}

export default Footer