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
        errors.queueShortDescription = 'Please provide a description.';
    }
    if (!payload || typeof payload.queueCategory !== 'string' || payload.queueCategory.trim().length === 0) {
        isFormValid = false;
        errors.queueCategory = 'Please provide a category.';
    }
    if (!payload || typeof payload.numberOfQueuers !== 'number' || payload.numberOfQueuers === 0) {
        isFormValid = false;
        errors.numberOfQueuers = 'Please provide total number of queuers.';
    }
    if (!payload || typeof payload.queueID !== 'string' || payload.queueShortDescription.trim().length === 0) {
        isFormValid = false;
        errors.queueID = 'Please provide a queue ID.';
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

    // If user filtering is needed
    if(req.query.user) {
        Queues.find({'queueCompanyID': req.query.user }, (err,queues) => {
            if (err) {
                return res.send(err);
            }
            return res.json(queues);
        });
    }
    else {
        Queues.find((err, queues) => {
            if (err) {
                return res.send(err);
            }
            return res.json(queues);
        });
    }
});

router.post("/", authCheckMiddleware);

// Auth required
router.post('/',(req,res) => {
    const validationResult = validateQueueForm(req.body);
    if (!validationResult.success) {
        return res.status(400).json({
            success: false,
            message: validationResult.message,
            errors: validationResult.errors
        });
    }

    const queueData = {
        thumbnail: req.body.thumbnail.trim(),
        queueTitle: req.body.queueTitle.trim(),
        queueCompany: req.user.name, //Set the company to the user name
        queueCompanyID: req.user._id, //Set the ID of the user
        queueEventDate:  req.body.queueEventDate.trim(),
        queEndDate: req.body.queEndDate.trim(),
        location: req.body.location.trim(),
        queueShortDescription: req.body.queueShortDescription.trim(),
        queueCategory: req.body.queueCategory.trim(),
        numberOfQueuers: req.body.numberOfQueuers,
        queueID: req.body.queueID.trim()
    };

    const newQueue = new Queues(queueData);

    newQueue.save((err) => {
        if (err) {
            return res.send(err);
        }

        return res.json({ message: 'Queue created!' });
    });

});


// route for getting queues with a certain queue id, no Auth required
router.get("/:id", (req,res) => {
    Queues.findOne({'queueID':req.params.id}, (err, queue) => {
        if (err) {
            return res.send(err);
        }

        return res.json(queue);
    });
});


// Only allow if user is signed in (a valid token is sent)
router.put("/:id", authCheckMiddleware);

// route for updating a queue with a certain queue id, auth required (only the user that created it should be able to delete it)
router.put("/:id", (req,res) => {

    Queues.findOne({'queueID':req.params.id}, (err, queue) => {
        if (err) {
            return res.send(err);
        }

        // Check if the user is the same as the user who created the queue
        if (req.user._id != queue.queueCompanyID) {
            return res.status(401).end();
        }

        const validationResult = validateQueueForm(req.body);

        if (!validationResult.success) {
            return res.status(400).json({
                success: false,
                message: validationResult.message,
                errors: validationResult.errors
            });
        }

        //Change everything except queueCompany and queueID
        queue.queueTitle = req.body.queueTitle.trim();
        queue.queueShortDescription = req.body.queueShortDescription.trim();
        queue.numberOfQueuers = req.body.numberOfQueuers;
        queue.thumbnail = req.body.thumbnail.trim();
        queue.queueEventDate = req.body.queueEventDate.trim();
        queue.queEndDate = req.body.queEndDate.trim();
        queue.location = req.body.location.trim();
        queue.queueCategory = req.body.queueCategory.trim();

        queue.save((err) => {
            if (err) {
                return res.send(err);
            }

            return res.json({ message: 'Queue updated!' })
        });
    });

});

// Only allow if user is signed in (a valid token is sent)
router.delete("/:id", authCheckMiddleware);

// Route for deleting a queue,
router.delete("/:id", (req,res) => {

    // Check if the user is the same as the user who created the queue
    if (req.user._id != queue.queueCompanyID) {
        return res.status(401).end();
    }

    Queues.remove({'queueID':req.params.id}, (err, queue) => {
        if (err) {
            return res.send(err);
        }
        return res.json({message: 'Queue deleted'})
    });
});


export default router;