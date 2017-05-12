const express = require('express');
import User from '../models/user.models';

const router = new express.Router();

router.get('/', (req, res) => {
  res.status(200).json({
    username: req.user
  });
});

export default router;
