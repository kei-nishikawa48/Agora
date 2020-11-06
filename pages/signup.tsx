import React from 'react';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import Link from '@material-ui/core/Link';
import Grid from '@material-ui/core/Grid';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import Layout from '../components/Layout';
import { useForm } from 'react-hook-form';
import firebase from '../utils/Firebase';
import Router from "next/router"
import styled from 'styled-components';
// import { CREATE_USER } from '../client_hooks/users';
// import { useMutation } from '@apollo/client';


const Error =styled.p`
  color:red;
`

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
    marginTop: theme.spacing(3),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));

interface Data {
  name: string;
  email: string;
  pass: string;
  confirm_pass: string;
}

export default function SignUp() {
  const [error, setError] = React.useState('');
  const classes = useStyles();
  const { register, handleSubmit, errors, getValues } = useForm<Data>();
  const emailReg = new RegExp(
    '^([a-zA-Z0-9])+([a-zA-Z0-9_-])*@([a-zA-Z0-9._-])+([a-zA-Z0-9._-]+)+$'
  );
  const passReg = new RegExp(
    '^(((?=.*[a-z])(?=.*[A-Z]))|((?=.*[a-z])(?=.*[0-9]))|((?=.*[A-Z])(?=.*[0-9])))(?=.{6,})'
  );
  const signup_submit = async (data: Data) => {
    await firebase
      .auth()
      .createUserWithEmailAndPassword(data.email, data.pass)
      .then(({ user }) => {
        user!.updateProfile({
          displayName: data.name,
        });
        Router.push("/")
      })
      .catch((er) => {
        switch (er.code) {
          case 'auth/email-already-in-use':
            setError('このemailはすでに使用されています');
            break;
          default:
        }
      });
    console.table(data);

  };

  return (
    <Layout>
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <div className={classes.paper}>
          <Avatar className={classes.avatar}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            新規登録
          </Typography>
            <Error>{error}</Error>
          <form className={classes.form} onSubmit={handleSubmit(signup_submit)}>
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <TextField
                  name="name"
                  variant="outlined"
                  inputRef={register({ required: '名前を入力してください' })}
                  fullWidth
                  label="お名前"
                />
                {errors.name && <Error>{errors.name.message}</Error>}
              </Grid>
              <Grid item xs={12}>
                <TextField
                  variant="outlined"
                  fullWidth
                  label="メールアドレス"
                  name="email"
                  inputRef={register({
                    required: 'メールアドレス入力してください',
                    pattern: {
                      value: emailReg,
                      message: '正しいメールアドレスを入力してください',
                    },
                  })}
                />
                {errors.email && <Error>{errors.email.message}</Error>}
              </Grid>
              <Grid item xs={12}>
                <TextField
                  variant="outlined"
                  fullWidth
                  name="pass"
                  label="パスワード"
                  type="password"
                  inputRef={register({
                    required: 'パスワードを入力してください',
                    pattern: {
                      value: passReg,
                      message:
                        'パスワードは6文字以上かつ１つの小文字と１つの大文字のアルファベット文字、１つの英数字を含む必要性があります。',
                    },
                  })}
                />
                {errors.pass && <Error>{errors.pass.message}</Error>}
              </Grid>
              <Grid item xs={12}>
                <TextField
                  variant="outlined"
                  fullWidth
                  name="confirm_pass"
                  label="確認用パスワード"
                  type="password"
                  inputRef={register({
                    required: '確認用パスワードを入力してください',
                    validate: (value) => {
                      if (value === getValues()['pass']) {
                        return true;
                      } else {
                        return 'パスワードと一致しません';
                      }
                    },
                  })}
                />
                {errors.confirm_pass && <Error>{errors.confirm_pass.message}</Error>}
              </Grid>
            </Grid>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              color="primary"
              className={classes.submit}
            >
              新規登録
            </Button>
            <Grid container justify="flex-end">
              <Grid item>
                <Link href="#" variant="body2">
                  もうすでにアカウントをお持ちですか？ サインイン
                </Link>
              </Grid>
            </Grid>
          </form>
        </div>
      </Container>
    </Layout>
  );
}
