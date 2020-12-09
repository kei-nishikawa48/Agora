import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import HeaderItem from "./HeaderItem"
import Link from "next/link"

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      flexGrow: 1,
    },
    menuButton: {
      marginRight: theme.spacing(2),
    },
    title: {
      flexGrow: 1,
      fontSize:30,
      color:"#fff",
      textDecoration:"none"
    },
    bar: { 
      backgroundColor: '#4527A0',
      height:"8vh" 
    }
    
  }),
);


const Header = ()=> {
  const classes = useStyles();
  return (
    <div className={classes.root}>
      <AppBar position="static">
        <Toolbar className={classes.bar}>
          <Link href="/">
            <a className={classes.title}>Proshare</a>
          </Link>
          <HeaderItem />
        </Toolbar>
      </AppBar>
    </div>
  );
}
export default Header