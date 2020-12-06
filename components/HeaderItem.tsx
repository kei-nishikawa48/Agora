import React from 'react';
import Button from '@material-ui/core/Button';
import Link from 'next/link';
import { useCookies } from 'react-cookie';
import AccountCircle from '@material-ui/icons/AccountCircle';
import IconButton from '@material-ui/core/IconButton';
import { makeStyles } from '@material-ui/core/styles';
import Router from 'next/router';
import ArrowDropDownIcon from '@material-ui/icons/ArrowDropDown';
import { useQuery } from '@apollo/client';
import { GET_CURRENT_USER } from '../client_hooks/users';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';

const useStyles = makeStyles({
  button: {
    textTransform: 'none',
    fontSize: '24px',
    color: '#fff',
  },
  icon: {
    marginleft: '10rem',
    '&.MuiSvgIcon-root ': {
      fontSize: '40px',
    },
  },
  toukou: {
    marginRight: '5rem',
  },
});

const HeaderItem = () => {
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };
  const classes = useStyles();
  const [cookies] = useCookies(['token']);
  const { data } = useQuery(GET_CURRENT_USER);
  const userId = `${data && data.current_user.id}`;
  return (
    <>
      {!Object.keys(cookies).length ? (
        <>
          <Button
            className={classes.button}
            onClick={() => Router.push('/signin')}
            color="inherit"
          >
            Signin
          </Button>
          <Button
            className={classes.button}
            onClick={() => Router.push('/signup')}
            color="inherit"
          >
            Signup
          </Button>
        </>
      ) : (
        <>
          <IconButton
            className={classes.button + ' ' + classes.toukou}
            onClick={() => Router.push('/form')}
          >
            投稿
            <ArrowDropDownIcon />
          </IconButton>
          <Link href="/users/[id]" as={`/users/${userId}`}>
            <IconButton className={classes.button}>マイページ</IconButton>
          </Link>
          <IconButton
            aria-label="account of current user"
            aria-controls="menu-appbar"
            aria-haspopup="true"
            color="inherit"
            onClick={handleClick}
          >
            <AccountCircle className={classes.icon} />
            <Menu
              id="simple-menu"
              anchorEl={anchorEl}
              keepMounted
              open={Boolean(anchorEl)}
              onClose={handleClose}
            >
              <MenuItem onClick={handleClose}>Profile</MenuItem>
              <MenuItem onClick={handleClose}>My account</MenuItem>
              <MenuItem onClick={handleClose}>Logout</MenuItem>
            </Menu>
          </IconButton>
        </>
      )}
    </>
  );
};

export default HeaderItem;
