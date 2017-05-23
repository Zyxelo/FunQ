const express = require('express');
import User from '../models/user.models';
const STANDARD_DELAY = 30;

const router = new express.Router();

router.get('/', (req, res) => {
  res.status(200).json({
    username: req.user
  });
});

// Integer req.body.delay (optional) sets how much the delay until next captcha should be. 30 minutes standard
router.put('/updateCaptcha', (req,res) => {
  let delay = STANDARD_DELAY;
  if (req.body.delay !== undefined) {
    delay = req.body.delay;
  }
  let time = new Date().getTime() + delay*60*1000;

  User.findOneAndUpdate(
    { _id: req.user._id },
    { $set: { nextCaptcha: time } }
  ).then(() => {
    return res.json({ nextCaptcha: time});
  })
    .catch((err) => {
      return res.send(err);
    });
})

// Integer req.query.delay (optional) sets how much the delay until next captcha should be. 30 minutes standard
router.get('/nextCaptcha', (req,res) => {
  let delay = STANDARD_DELAY;
  if (req.query.delay !== undefined) {
    delay = req.body.delay;
  }
  console.log('hej');
  User.findById(req.user._id)
    .then((response) => {
      let time = new Date(response.nextCaptcha).getTime() + delay*60*1000;
      return res.json({ nextCaptcha: time});
    })
    .catch((err) => {
      return res.send(err);
    });
})

export default router;
