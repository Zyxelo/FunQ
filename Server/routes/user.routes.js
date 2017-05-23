const express = require('express');
import User from '../models/user.models';
import authCheckMiddleware from '../middleware/authenticate';
const STANDARD_DELAY = 30;  //Minutes

const router = new express.Router();

// Integer req.body.delay (optional) sets how much the delay until next captcha should be. 30 minutes standard
// REFACTOR: Delay should be queue specific parameter, not in api call. NOT ACTIVE RIGHT NOW! (2017-05-23)
router.put('/updateCaptcha', authCheckMiddleware)
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
// REFACTOR: Delay should be queue specific parameter, not in api call. NOT ACTIVE RIGHT NOW! (2017-05-23)
router.get('/nextCaptcha', authCheckMiddleware)
router.get('/nextCaptcha', (req,res) => {
  let delay = STANDARD_DELAY;
  if (req.query.delay !== undefined) {
    delay = req.body.delay;
  }
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
