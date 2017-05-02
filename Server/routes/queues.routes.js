import {Router} from 'express';

const router = new Router();


// The route for getting all queues
router.get('/', (req,res) => {
    console.log("hej");
    res.send("hej");
});


// route for getting queues with a certain cuid
router.get("/:queueId", (req,res) => {
    const queueId = req.params.queueId;

});

export default router;