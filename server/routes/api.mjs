import express from 'express';

const router = express.Router();

router.get('/servers', (req, res, next) => {
  res.send({
    servers: 'a lot of servers',
  });

  next();
});

router.delete('/servers/:id', (req, res, next) => {
  res.send({
    delete: req.params.id
  });

  next();
});

export default router;
