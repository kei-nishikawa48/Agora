import mysql from 'mysql';

export const connect = () => {
  mysql
    .createConnection({
      host: 'localhost',
      user: 'root',
      password: 'root',
      database: 'proshare',
    })
    .connect((err) => {
      if (err) {
        console.error('error connecting: ' + err.stack);
        return;
      }
      console.log('connected!');
    });
};
