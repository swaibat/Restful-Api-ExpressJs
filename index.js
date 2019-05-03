import express from 'express'
import usersRoute from './api/routes/users'
import loansRoute from './api/routes/loans'


const app = express();
app.use(express.json());

app.use('/api/v1/users', usersRoute);
app.use('/api/v1/loans', loansRoute);

// if the page is not found
app.use((req, res, next) => {
  const error = new Error('Bad Request');
  error.status = 400;
  next(error);
});

app.use((error, req, res, next) => {
  res.status(error.status || 500).send({ error: 400, message: error.message  });
  next()
});

app.listen(4000, () => console.log('listening on port 4000'));
