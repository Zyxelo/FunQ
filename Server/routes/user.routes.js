const express = require('express');
import User from '../models/user.models';

const router = new express.Router();

router.get('/', (req, res) => {
  res.status(200).json({
    username: req.user
  });
});

// Boolean req.body.update determines if the captcha time should update or not
// Integer req.body.delay (optional) sets how much the delay until next captcha should be. 30 minutes standard
router.put('/updateCaptcha', (req,res) => {
  let delay = 30;
  if (req.body.delay !== undefined) {
    delay = req.body.delay;
  }
  console.log(delay);
  let time = new Date().getTime() + delay*60*1000;
  console.log(time);

  if (req.body.update === true) {
    User.findOneAndUpdate(
      { email: req.body.email },
      { $set: { lastCaptcha: time } }
    ).then((response) => {
      return res.json({ lastCaptcha: time});
    })
      .catch((err) => {
        return res.send(err);
      })
  } else {
    User.findOne(
      { email: req.body.email }
    ).then((response) => {
      time = new Date(response.lastCaptcha).getTime() + delay*60*1000;
      return res.json({ lastCaptcha: time});
    })
      .catch((err) => {
        return res.send(err);
      })
  }
})

export default router;
