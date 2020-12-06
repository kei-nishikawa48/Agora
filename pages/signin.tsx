import { useEffect } from 'react';
import Router from 'next/router';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import Link from '@material-ui/core/Link';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import { useForm } from 'react-hook-form';
import Layout from '../components/Layout';
import { SIGN_IN } from '../client_hooks/users';
import { useMutation } from '@apollo/client';
import { useCookies } from 'react-cookie';
function Copyright() {
  return (
    <Typography variant="body2" color="textSecondary" align="center">
      {'Copyright © '}
      <Link color="inherit" href="https://material-ui.com/">
        Your Website
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}

const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(8),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));

export default function SignIn() {
  const [cookies, setCookie] = useCookies(['token']);
  useEffect(() => {
    cookies['token'] && Router.push('/');
  }, [cookies]);
  const [sign_in] = useMutation(SIGN_IN, {
    update: (_proxy, response) => {
      if (response.data.sign_in) {
        setCookie('token', response.data.sign_in.token);
      } else {
        alert('ログイン情報が不正です。');
      }
    },
  });

  const { register, handleSubmit } = useForm();
  const classes = useStyles();

  interface data {
    email: string;
    password: string;
  }
  const login = async (data: data) => {
    try {
      await sign_in({
        variables: {
          email: data.email,
          password: data.password,
        },
      });
      history.back();
    } catch (er) {
      console.log(er);
    }
  };
  return (
    <div style={{ backgroundColor: '#4527A0' }}>
      <Layout>
        <Container component="main" maxWidth="xs">
          <CssBaseline />
          <div className={classes.paper}>
            <Avatar className={classes.avatar}>
              <LockOutlinedIcon />
            </Avatar>
            <Typography component="h1" variant="h5" style={{ color: '#fff' }}>
              Proshare
            </Typography>
            <form
              onSubmit={handleSubmit(login)}
              className={classes.form}
              noValidate
            >
              <TextField
                style={{ color: '#EDE7F6' }}
                variant="outlined"
                margin="normal"
                required
                fullWidth
                id="email"
                label="メールアドレス"
                name="email"
                autoComplete="email"
                autoFocus
                inputRef={register}
              />
              <TextField
                style={{ color: '#EDE7F6' }}
                variant="outlined"
                margin="normal"
                required
                fullWidth
                name="password"
                label="パスワード"
                type="password"
                id="password"
                autoComplete="current-password"
                inputRef={register}
              />
              <FormControlLabel
                style={{ color: '#fff' }}
                control={
                  <Checkbox value="remember" style={{ color: '#fff' }} />
                }
                label="次から入力を省略"
              />
              <Button
                style={{ backgroundColor: '#EDE7F6', color: '#000' }}
                type="submit"
                fullWidth
                variant="contained"
                className={classes.submit}
              >
                サインイン
              </Button>
              <Grid container>
                <Grid item xs>
                  <Link href="#" variant="body2" style={{ color: '#EDE7F6' }}>
                    パスワードをお忘れですか？
                  </Link>
                </Grid>
                <Grid item>
                  <Link href="#" variant="body2" style={{ color: '#EDE7F6' }}>
                    {'新規登録はこちらです'}
                  </Link>
                </Grid>
              </Grid>
<<<<<<< HEAD
            </form>
          </div>
          <Box mt={8}>
            <Copyright />
          </Box>
        </Container>
      </Layout>
    </div>
=======
              <Grid item>
                <Link href="/signup" variant="body2">
                  {"Don't have an account? Sign Up"}
                </Link>
              </Grid>
            </Grid>
          </form>
        </div>
        <Box mt={8}>
          <Copyright />
        </Box>
      </Container>
    </Layout>
>>>>>>> develop
  );
}
