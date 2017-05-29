import express from 'express';
import Queues from '../models/queues.models';
import authCheckMiddleware from '../middleware/authenticate';

const router = new express.Router();

//Validate create queue form
function validateQueueForm(payload) {
  const errors = {};
  let isFormValid = true;
  let message = '';

  if (!payload || typeof payload.thumbnail !== 'string' || payload.thumbnail.trim().length === 0) {
    isFormValid = false;
    errors.thumbnail = 'Please provide a picture.';
  }
  if (!payload || typeof payload.queueTitle !== 'string' || payload.queueTitle.trim().length === 0) {
    isFormValid = false;
    errors.queueTitle = 'Please provide a title.';
  }
  if (!payload || typeof payload.location !== 'string' || payload.location.trim().length === 0) {
    isFormValid = false;
    errors.location = 'Please provide a location.';
  }
  if (!payload || typeof payload.queueShortDescription !== 'string' || payload.queueShortDescription.trim().length === 0) {
    isFormValid = false;
    errors.queueShortDescription = 'Please provide a short description.';
  }
  if (!payload || typeof payload.queueLongDescription !== 'string' || payload.queueLongDescription.trim().length === 0) {
    isFormValid = false;
    errors.queueLongDescription = 'Please provide a long description.';
  }
  if (!payload || typeof payload.queueCategory !== 'string' || payload.queueCategory.trim().length === 0) {
    isFormValid = false;
    errors.queueCategory = 'Please provide a category.';
  }
  if (!payload || typeof payload.numberOfQueuers !== 'number' || payload.numberOfQueuers === 0) {
    isFormValid = false;
    errors.numberOfQueuers = 'Please provide total number of queuers.';
  }
  if (!payload || typeof payload.privacy !== 'string' || !(payload.privacy === 'private' || payload.privacy === 'public')) {
    isFormValid = false;
    errors.numberOfQueuers = 'A queue must be either private or public.';
  }

  if (!isFormValid) {
    message = 'Check the form for errors.';
  }

  return {
    success: isFormValid,
    message,
    errors
  };
}

// The route for getting all queues, no auth required
router.get('/', (req,res) => {

  // If a user query is sent, only the queues that is created by the specific user is sent in the response
  if(req.query.user) {
    Queues.find({'queueCompanyID': req.query.user }, (err,queues) => {
      if (err) {
        return res.send(err);
      }
      return res.json(queues);
    });
  }
  else {
    // Send all queues that are public
    Queues.find({'privacy': 'public'}, (err, queues) => {
      if (err) {
        return res.send(err);
      }
      return res.json(queues);
    });
  }
});

// Route for creating a new queue, user must be logged in
router.post('/', authCheckMiddleware);
router.post('/',(req,res) => {

  // Validate the form
  const validationResult = validateQueueForm(req.body);
  if (!validationResult.success) {
    console.log(typeof req.body.privacy);
    return res.status(400).json({
      success: false,
      message: validationResult.message,
      errors: validationResult.errors
    });
  }

  // Retrieve the info needed to create the object
  const queueData = {
    thumbnail: req.body.thumbnail.trim(),
    queueTitle: req.body.queueTitle.trim(),
    queueCompany: req.user.name, //Set the company to the user name
    queueCompanyID: req.user._id, //Set the ID of the user
    queueEventDate:  req.body.queueEventDate.trim(),
    queueEndDate: req.body.queueEndDate.trim(),
    location: req.body.location.trim(),
    queueShortDescription: req.body.queueShortDescription.trim(),
    queueLongDescription: req.body.queueLongDescription.trim(),
    queueCategory: req.body.queueCategory.trim(),
    numberOfQueuers: req.body.numberOfQueuers,
    privacy: req.body.privacy,
  };

  // Create a queue object
  const newQueue = new Queues(queueData);

  // Save
  newQueue.save((err) => {
    if (err) {
      return res.send(err);
    }

    return res.json({ message: 'Queue created!' });
  });

});

// route for getting queues with a certain queue id
router.get('/:id', (req,res) => {
  Queues.findById(req.params.id, (err, queue) => {
    if (err) {
      return res.send(err);
    }

    return res.json(queue);
  });
});

// Route for updating a queue with a certain queue id, user must be logged in and only the user that created the queue should be able to update it
router.put('/:id', authCheckMiddleware);
router.put('/:id', (req,res) => {

  Queues.findById(req.params.id, (err, queue) => {
    if (err) {
      return res.send(err);
    }

    // Check if the user is the same as the user who created the queue
    if (req.user._id.toString() !== queue.queueCompanyID) {
      return res.status(401).end();
    }

    // Validate the form
    const validationResult = validateQueueForm(req.body);

    if (!validationResult.success) {
      console.info(validationResult);
      return res.status(400).json({
        success: false,
        message: validationResult.message,
        errors: validationResult.errors
      });
    }

    //Change everything except queueCompany and _id
    queue.queueTitle = req.body.queueTitle.trim();
    queue.queueShortDescription = req.body.queueShortDescription.trim();
    queue.queueLongDescription = req.body.queueLongDescription.trim();
    queue.numberOfQueuers = req.body.numberOfQueuers;
    queue.thumbnail = req.body.thumbnail.trim();
    queue.queueEventDate = req.body.queueEventDate.trim();
    queue.queueEndDate = req.body.queueEndDate.trim();
    queue.location = req.body.location.trim();
    queue.queueCategory = req.body.queueCategory.trim();
    queue.privacy = req.body.privacy;

    // Save the updated queue
    queue.save((err) => {
      if (err) {
        return res.send(err);
      }
      return res.json({ message: 'Queue updated!' })
    });
  });
});

// Route for deleting a queue, user must be signed in and be the same as the queue creator
router.delete('/:id', authCheckMiddleware);
router.delete('/:id', (req,res) => {

  Queues.findById(req.params.id, (err, queue) => {

    if (err) {
      return res.send(err);
    }

    // Check if the user is the same as the user who created the queue
    if (req.user._id.toString() !== queue.queueCompanyID) {
      return res.status(401).end();
    }

    else {

      Queues.findByIdAndRemove(req.params.id, (err) => {
        if (err) {
          return res.send(err);
        }

        return res.json({message: 'Queue deleted'})
      })
    }

  });

});


export default router;