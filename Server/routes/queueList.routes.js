import express from 'express';
import QueueList from '../models/queueList.models';
import authCheckMiddleware from '../middleware/authenticate';

const router = new express.Router();

// Returns if user is in the queue or not
// q_id = id for queue, u_id = user id to query for
// api call should look like (BASE_URL + '?q_id=QID&u_id=UID')

router.get('/all', authCheckMiddleware);
router.get('/all', (req, res) => {
  QueueList.find({'u_id': req.user._id}, (err, queueListDoc) => {
    if (err) {
      return res.send(err);
    }
    // Return queueTitle, q_id, endDate, position
    return res.json(queueListDoc);
  })
});

router.get('/currentQueues', authCheckMiddleware);
router.get('/currentQueues', (req, res) => {
  QueueList
    .find({'u_id':req.user._id})
    .populate('q_id')
    .exec( (err, queueList) => {

      if (err) {
        return res.send(err);
      }

      return res.json(queueList)
    });
});

router.get('/isInQueue', authCheckMiddleware);
router.get('/isInQueue', (req,res) => {
  QueueList.findOne({
    'q_id': req.query.q_id,
    'u_id': req.user._id
  }, (err, queueListDoc) => {
    if (err) {
      return res.send(err);
    }
    return res.json(queueListDoc);
  });
});

// The route for adding user to queue
router.post('/enterQueue', authCheckMiddleware);
router.post('/enterQueue', (req,res) => {
  const time = new Date().getTime();
  const queueListData = {
    q_id: req.body.q_id,
    u_id: req.user._id,
    enterTime: time,
    expired: false
  };
  const queueListDoc = new QueueList(queueListData);

  queueListDoc.save((err) => {
    if (err) {
      return res.send(err);
    }

    return res.json({ message: 'Entered queue' });
  });
});

// Set expired = true or false for user id
router.put('/updateQueue/:q_id/:expired', (req,res) => {

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
});

// Need user authentication (u_id must be same as logged in user)
router.delete('/leaveQueue', authCheckMiddleware);
router.delete('/leaveQueue', (req,res) => {
  QueueList.findOneAndRemove({
    'q_id': req.body.q_id,
    'u_id': req.user._id
  }, (err) => {
    if(err) {
      return res.send(err);
    }
    return res.json({ message: 'User left queue' });
  })
});

router.get('/position', authCheckMiddleware);
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

      let index = queueList.findIndex(x => x.u_id === req.user._id) + 1;
      return res.json({position: index});

    })
});


export default router;