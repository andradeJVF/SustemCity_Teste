import { Box, Grid, Typography } from '@material-ui/core';
import react, { useEffect } from 'react'
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { UserState } from '../../store/tokens/tokensReducer';
import './Sobre.css'
import GitHubIcon from '@mui/icons-material/GitHub';
import LinkedInIcon from '@material-ui/icons/LinkedIn';

function Sobre() {
  let navigate = useNavigate();
  const token = useSelector<UserState, UserState["tokens"]>(
    (state) => state.tokens
  );

  return (
    <Grid className='back'>
      <Grid className='alinhar'>
        <Box className='box2'>
          <Box><img src="https://i.imgur.com/9UV9Zsq.jpg?1" alt="Criador 1" className='foto' /></Box>
          <Typography className='nomes'>Alecsander G.</Typography>
          <a href="https://www.linkedin.com/in/alecsander-gomes/" target="_blank"><LinkedInIcon className='icones' /></a>
          <a href="https://github.com/Alecsg09" target="_blank"><GitHubIcon className='icones' /></a>
        </Box>
        <Box className='box2'>
          <Box><img src="https://i.imgur.com/eUa3L5i.jpg?1" alt="Criador 1" className='foto' /></Box>
          <Typography className='nomes'>Angela D.</Typography>
          <a href="https://www.linkedin.com/in/angela-daniela-guacaran-regalado-17805a1b8/" target="_blank"><LinkedInIcon className='icones' /></a>
          <a href="https://github.com/1575314" target="_blank"><GitHubIcon className='icones' /></a>
        </Box>
        <Box className='box2'>
          <Box><img src="https://i.imgur.com/UBQv52E.jpg?1" alt="Criador 1" className='foto' /></Box>
          <Typography className='nomes'>Edenilson N.</Typography>
          <a href="https://www.linkedin.com/in/edenilson-nascimento-09635b150/" target="_blank"><LinkedInIcon className='icones' /></a>
          <a href="https://github.com/Edenilson-Nascimento" target="_blank"><GitHubIcon className='icones' /></a>
        </Box>
      </Grid>

      <Grid className='alinhar'>
        <Box className='box2'>
          <Box><img src="https://i.imgur.com/acnMYpJ.jpg?1" alt="Criador 1" className='foto' /></Box>
          <Typography className='nomes'>Filipe S.</Typography>
          <a href="https://www.linkedin.com/in/filipesanatana/" target="_blank"><LinkedInIcon className='icones' /></a>
          <a href="https://github.com/Filipesssantana" target="_blank"><GitHubIcon className='icones' /></a>
        </Box>
        <Box className='box2'>
          <Box><img src="https://i.imgur.com/Pet5QrT.jpg?1" alt="Criador 1" className='foto' /></Box>
          <Typography className='nomes'>João A.</Typography>
          <a href="https://www.linkedin.com/in/joao-andrade-/" target="_blank"><LinkedInIcon className='icones' /></a>
          <a href="https://github.com/andradeJVF" target="_blank"><GitHubIcon className='icones' /></a>
        </Box>
        <Box className='box2'>
          <Box><img src="https://i.imgur.com/y5loWlZ.jpg?1" alt="Criador 1" className='foto' /></Box>
          <Typography className='nomes'>Nayara R.</Typography>
          <a href="https://www.linkedin.com/in/nayara-rocha-1a0982205/" target="_blank"><LinkedInIcon className='icones' /></a>
          <a href="https://github.com/Nay-rch" target="_blank"><GitHubIcon className='icones' /></a>
        </Box>
      </Grid>

    </Grid>
  );
}


export default Sobre;