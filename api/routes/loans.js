import express from 'express';
import short from 'short-uuid';
import querystring from 'querystring'; 
import {loans} from '../models/dummyloans';

const router = express.Router();


// post loan application
router.post('/', (req, res, next) => {
  // check if a user has a pending loan or curent loan or rejected loan  application
  const result = loans.find(a => a.user === req.body.email);
  if (result) res.status(409).send({ message: 'You already applied for a loan. you can request for ​only​ one loan at a time ' });
  next();
}, (req, res) => {
  // post the loan
  const loan = {
    status: 1,
    data: {
      id: short.generate(),
      user: req.body.user,
      createdOn: Date.now(),
      status: 'pending',
      repaid: false,
      tenor: req.body.tenor,
      amount: req.body.amount,
      paymentInstallment: (req.body.amount + req.body.interest) / req.body.tenor,
      balance: 63,
      interest: (15 / 100) * req.body.amount,
    },
  };

  loans.push(loan);
  res.status(201).send(loan);
});

// Get a specific loan application.
router.get('/',(req, res) => {
    res.send(loans);
  }
);

// Get a specific loan application
router.patch('/:id',(req, res) => {
  const loan = loans.find(a => a.data.id === req.params.id);
    res.send(loan);
  }
);


// Get all repaid loans.
// Endpoint: GET /loans?status=approved&repaid=false
// Get all current loans that are not fully repaid.

router.get('/me', (req, res, next) => {
  const result = loans.filter(a => a.data.status === req.query.status );
  
  // result.forEach(function(element) {
  //   if (Boolean(element.data.repaid)== Boolean(false)){
  //       res.send(element);
  //   }})
  // var a = 0;
  // for (const a in result) {
  //   if (result[a].data.repaid === Boolean(req.query.repaid)){
  //     console.log(result[a]);
  //   }
  // }

  next();
  })



export default router;
