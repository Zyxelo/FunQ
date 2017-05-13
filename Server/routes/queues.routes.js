import express from 'express';
import Queues from '../models/queues.models';

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
    if (!payload || typeof payload.queueCompany !== 'string' || payload.queueCompany.trim().length === 0) {
        isFormValid = false;
        errors.queueCompany = 'Please provide a user.';
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

// The route for getting all queues
router.get('/', (req,res) => {
    Queues.find((err, queues) => {
        if (err) {
            return res.send(err);
        }
        return res.json(queues);
    })
});

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
        queueCompany: req.body.queueCompany.trim(), //We should change this to userObject i guess
        queueEventDate:  req.body.queueEventDate.trim(),
        queEndDate: req.body.queEndDate.trim(),
        location: req.body.location.trim(),
        queueShortDescription: req.body.queueShortDescription.trim(),
        queueCategory: req.body.queueCategory.trim(), //Maybe an object of a certain category instead of String
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


// route for getting queues with a certain queue id
router.get("/:queue_id", (req,res) => {
    Queues.findOne({queueID:req.params.queue_id}, (err, queue) => {
        if (err) {
            return res.send(err);
        }

        return res.json(queue);
    });
});

// route for updating a queue with a certain queue id
router.put("/:queue_id", (req,res) => {
    Queues.findOne({queueID:req.params.queue_id}, (err, queue) => {
        if (err) {
            return res.send(err);
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

router.delete("/:queue_id", (req,res) => {
    console.info('deleting user');
    Queues.remove({queueID:req.params.queue_id}, (err, queue) => {
        if (err) {
            return res.send(err);
        }
        return res.json({message: 'Queue deleted'})
    });
});


export default router;