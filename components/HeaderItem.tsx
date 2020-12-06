import React from "react"
import Button from '@material-ui/core/Button';
import { useCookies } from 'react-cookie';
import AccountCircle from '@material-ui/icons/AccountCircle';
import IconButton from '@material-ui/core/IconButton';
import { makeStyles } from '@material-ui/core/styles';
import Router from 'next/router';
import ArrowDropDownIcon from '@material-ui/icons/ArrowDropDown';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import SimpleMenu from "./SimpleMenu";
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
          <IconButton
            aria-label="account of current user"
            aria-controls="menu-appbar"
            aria-haspopup="true"
            color="inherit"
            onClick={handleClick}
          >
            <AccountCircle className={classes.icon} />
            </IconButton>
            <Menu
              id="simple-menu"
              anchorEl={anchorEl}
              // keepMounted
              open={Boolean(anchorEl)}
              onClose={handleClose}
            >
              <MenuItem onClick={() => console.log(Boolean(anchorEl))}>
                My account
              </MenuItem>
              <MenuItem onClick={handleClose}>Logout</MenuItem>
            </Menu>
        </>
      )}
    </>
  );
};

export default HeaderItem;
