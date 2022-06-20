import * as React from 'react';
import Button from '@mui/material/Button';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import useLocalStorage from 'react-use-localstorage';
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';
import { IconButton, Typography } from '@material-ui/core';
import PersonIcon from '@mui/icons-material/Person';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import AddShoppingCartIcon from '@mui/icons-material/AddShoppingCart';
import MenuIcon from '@mui/icons-material/Menu';
import "./Menu.css"
import { useDispatch, useSelector } from 'react-redux';
import { addToken } from '../../../store/tokens/actions';
import { toast } from 'react-toastify';
import { UserState } from '../../../store/tokens/tokensReducer';
import User from '../../../models/User';

export default function Menus() {
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };



  const navigate = useNavigate();
  const [usuario, setUsuario] = React.useState<User[]>([])
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


  return (
    <div>
      <Button
        id="basic-button"
        aria-controls={open ? 'basic-menu' : undefined}
        aria-haspopup="true"
        aria-expanded={open ? 'true' : undefined}
        onClick={handleClick}
      >
     <MenuIcon className="menu"/>
      </Button>
      <Menu

        id="basic-menu"
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        MenuListProps={{
          'aria-labelledby': 'basic-button',
        }}
      >
        <MenuItem onClick={handleClose} className='text-decorator-none'>  <IconButton  edge="start" aria-label="menu">
              <Link to='/perfil' className='text-decorator-none'>
                <PersonIcon />
              </Link>
            </IconButton>

        </MenuItem>

        <MenuItem onClick={handleClose}> <IconButton className='text-decorator-none' edge="start" color="inherit" aria-label="menu">
              <Link to='/cart' className='text-decorator-none'>
                <AddShoppingCartIcon />
              </Link>
            </IconButton></MenuItem>


        <MenuItem >
         <IconButton className='text-decorator-none' edge="start" color="inherit" aria-label="menu" onClick={goLogout}>
              <Link to='/login' className='text-decorator-none'>
                <ExitToAppIcon />
              </Link>
            </IconButton>
        </MenuItem>
      </Menu>
    </div>
  );
}