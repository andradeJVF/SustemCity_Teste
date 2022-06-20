import React, { useState } from "react";
import { AppBar, IconButton, Toolbar, Typography, Avatar, Box } from "@material-ui/core";
import { Link, useNavigate } from "react-router-dom"
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import { toast } from 'react-toastify';
import "./Navbar.css";
import { useDispatch, useSelector } from "react-redux";
import { UserState } from "../../../store/tokens/tokensReducer";
import { addToken } from "../../../store/tokens/actions";
import AddShoppingCartIcon from '@mui/icons-material/AddShoppingCart';
import PersonIcon from '@mui/icons-material/Person';
import { Stack } from "@mui/material";
import User from "../../../models/User";
import Menus from "../menu/Menu";



function Navbar() {

  const navigate = useNavigate();
  const [usuario, setUsuario] = useState<User[]>([])
  const token = useSelector<UserState, UserState["tokens"]>(
    (state) => state.tokens
  );

  const user = useSelector<UserState, UserState["user"]>(
    (state) => state.user
  );

  const dispatch = useDispatch();
  function goLogout() {
    if (token != '') {
      dispatch(addToken(''))
      toast.info('Usuário Deslogado!', {
        position: "top-right",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: false,
        draggable: false,
        progress: undefined,
      });
      navigate('/login')
    }
  }

  var navbarComponent;

  if (user === 'admin@admin.com.br' && token != '') {
    navbarComponent =
      <AppBar position="static" className="fontenavbar" >
        <Toolbar className="navbar" variant="dense">

          <Box paddingTop={1.5}>
            <Typography variant="h5" color="inherit">
              <img src="https://imgur.com/9iPD6Js.png" alt="Logo SustemCity" width='100vw' height='80vh' />
            </Typography>
          </Box>

          <Box className="links" display="flex" justifyContent="start">
            <Link to='/home' className="text-decorator-none"><Typography variant="h6" className="fontenavbar" color="inherit">Home</Typography></Link>
            <Link to="/produtosadmin/all" className="text-decorator-none"> <Typography variant="h6" className="fontenavbar" color="inherit">Produtos</Typography></Link>
            <Link to='/categoria' className="text-decorator-none"><Typography variant="h6" className="fontenavbar" color="inherit">Categorias</Typography></Link>
            <Link to='/cadastrarCategoria' className="text-decorator-none"><Typography variant="h6" className="fontenavbar" color="inherit">Cadastrar Categoria</Typography></Link>
            <Link to='/cadastroProduto' className="text-decorator-none"><Typography variant="h6" className="fontenavbar " color="inherit">Cadastrar Produto</Typography></Link>
            <Link to="/sobre" className="text-decorator-none"><Typography variant="h6" className="fontenavbar" color="inherit">Sobre Nós</Typography></Link>

            <IconButton className="menu-navbar">
              <Menus/>
            </IconButton>

           

           
          </Box>

        </Toolbar>
      </AppBar>
  } else if (user !== 'admin@admin.com.br' && token != '') {
    navbarComponent =
      <AppBar position="static" className="fontenavbar" >
        <Toolbar className="navbar" variant="dense">

          <Box paddingTop={1.5}>
            <Typography variant="h5" color="inherit">
              <img src="https://imgur.com/9iPD6Js.png" alt="Logo SustemCity" width='100vw' height='80vh' />
            </Typography>
          </Box>

          <Box className="links" display="flex" justifyContent="start">
            <Link to='/home' className="text-decorator-none"><Typography variant="h6" className="fontenavbar" color="inherit">Home</Typography></Link>
            <Link to="/produtos/all" className="text-decorator-none"> <Typography variant="h6" className="fontenavbar" color="inherit">Produtos</Typography></Link>

            <Link to="/sobre" className="text-decorator-none"><Typography variant="h6" className="fontenavbar" color="inherit">Sobre Nós</Typography></Link>

            <IconButton className="menu-navbar">
                
                <Menus/>
                
            </IconButton>
          </Box>

        </Toolbar>
      </AppBar>
  } else {
    navbarComponent =
      <AppBar position="static" className="fontenavbar" >
        <Toolbar className="navbar" variant="dense">

          <Box paddingTop={1.5}>
            <Typography variant="h5" color="inherit">
              <img src="https://imgur.com/9iPD6Js.png" alt="Logo SustemCity" width='100vw' height='80vh' />
            </Typography>
          </Box>

          <Box className="links" display="flex" justifyContent="start">
            <Link to='/home' className="text-decorator-none"><Typography variant="h6" className="fontenavbar" color="inherit">Home</Typography></Link>
            <Link to="/produtos/all" className="text-decorator-none"> <Typography variant="h6" className="fontenavbar" color="inherit">Produtos</Typography></Link>

            <Link to="/sobre" className="text-decorator-none"><Typography variant="h6" className="fontenavbar" color="inherit">Sobre Nós</Typography></Link>

            <IconButton className='text-decorator-none' edge="start" color="inherit" aria-label="menu" onClick={goLogout}>
              <Link to='/login' className='logout'>
                <ExitToAppIcon />
              </Link>
            </IconButton>
          </Box>

        </Toolbar>
      </AppBar>
  }

  return (
    <>
      {navbarComponent}
    </>
  )
}

export default Navbar;