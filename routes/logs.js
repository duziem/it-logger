const express = require('express');
const router = express.Router();

const Log = require('../models/Log');

router.get('/', async (req, res)=>{
    // console.log(req.query);
    if(Object.keys(req.query).length !== 0){
        if(req.query.q && req.query.q.length !== 0){
            const q= req.query.q.toLowerCase();
            const logs= await Log.find({
                $or: [
                    { message: {$regex: q} },
                    { tech: {$regex: q} }
                ]
            });
            if(!logs) res.status('404').send('Log empty');
            res.json(logs);
        }else{
            res.json([]);
        }
    }else{
        const logs= await Log.find();
        if(!logs) res.status('404').send('Log empty');
        res.json(logs);
    }
        
    
})
router.get('/', async (req, res)=>{
    const logs= await Log.find();
    if(!logs) res.status('404').send('Log empty');
    res.json(logs);
})

router.post('/', async (req, res)=>{
    const {attention, date}= req.body;
    const message= req.body.message.toLowerCase();
    const tech= req.body.tech.toLowerCase();

    const newLog= new Log({
        message,
        attention,
        tech,
        date
    });
    if(!newLog) console.log('logs empty')
    const log= await newLog.save()
    res.json(log);
})

router.put('/:id', async (req, res)=>{
    const { message, attention, tech, date } = req.body;

    // Build contact object
    const logFields = {};
    if (message) logFields.message = message.toLowerCase();
    logFields.attention = attention;
    if (tech) logFields.tech = tech.toLowerCase();
    if (date) logFields.date = date;

    // let log= Log.findById(req.params.id);
    // if(!log) return res.status(404).json({ msg: 'log not found' });

    const log = await Log.findByIdAndUpdate(
        req.params.id,
        { $set: logFields },
        { new: true }
      );
  
    res.json(log);
})

router.delete('/:id', async (req, res)=>{
    try{
        await Log.findByIdAndRemove(req.params.id);
  
        res.json({msg: 'log removed'});
    }catch(err){
        console.error(err.message);
        res.status(500).send('Server Error');
    }
    
})

module.exports = router;
