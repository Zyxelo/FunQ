import express from 'express';
import QueueList from '../models/queueList.models';

const router = new express.Router();

// Returns if user is in the queue or not
// q_id = id for queue, u_id = user id to query for
// api call should look like (BASE_URL + '?q_id=QID&u_id=UID')
router.get('/', (req,res) => {
  QueueList.findOne({
    'q_id': req.query.q_id,
    'u_id': req.query.u_id
  }, (err, queueListDoc) => {
    if (err) {
      return res.send(err);
    }
    return res.json(queueListDoc);
  });
})


// The route for adding user to queue
router.post('/enterQueue', (req,res) => {
  const time = new Date().getTime();
  const queueListData = {
    q_id: req.body.q_id,
    u_id: req.body.u_id,
    enterTime: time,
    expired: false
  }
  console.log(req.body.q_id);
  const queueListDoc = new QueueList(queueListData);

  queueListDoc.save((err) => {
    if (err) {
      return res.send(err);
    }

    return res.json({ message: 'Entered queue' });
  });
});

// Set expired = true or false
router.put('/updateQueue/:u_id/:q_id/:expired', (req,res) => {

});


router.get('/queueLength/', (req, res) => {
  QueueList.find({
    'q_id': req.query.q_id,
    'expired': false
  }, (err, queueList) => {
    if (err) {
      return res.send(err);
    }
    return res.json({ queueLength: queueList.length});
  });
})

// Need user authentication (u_id must be same as logged in user)
router.delete('/leaveQueue', (req,res) => {
  QueueList.findOneAndRemove({
    'q_id': req.body.q_id,
    'u_id': req.body.u_id
  }, (err, offer) => {
    if(err) {
      return res.send(err);
    }
    return res.json({ message: 'User left queue' });
  })
})

router.get('/position', (req,res) => {
  QueueList.find({
    'q_id': req.query.q_id,
    'expired': false
  })
    .sort({enterTime: 'ascending'})
    .exec((err, queueList) => {
      if (err) {
        return res.send(err);
      }

      let index = queueList.findIndex(x => x.u_id == req.query.u_id) + 1;
      return res.json({position: index});

    })
})


export default router;