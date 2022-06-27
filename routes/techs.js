const express = require('express');
const router = express.Router();

const Tech = require('../models/Tech');

// const getTech= (req, res, next)=>{
//     if(req.tech){
//         req.tech= 
//     }
// }

router.get('/', async (req, res)=>{
    const techs= await Tech.find();
    if(!techs) res.status('404').send('Log empty');
    res.json(techs);
})

router.post('/', async (req, res)=>{
    const firstName= req.body.firstName.toLowerCase();
    const lastName= req.body.lastName.toLowerCase();

    const newTech= new Tech({
        firstName,
        lastName
      });

    if(!newTech) console.log('logs empty')
    const tech= await newTech.save()
    res.json(tech);
})

// router.put('/:id', async (req, res)=>{
//     const { message, attention, tech, date } = req.body;

//     // Build contact object
//     const logFields = {};
//     if (message) logFields.message = message;
//     if (attention) logFields.attention = attention;
//     if (tech) logFields.tech = tech;
//     if (date) logFields.date = date;

//     // let log= Log.findById(req.params.id);
//     // if(!log) return res.status(404).json({ msg: 'log not found' });

//     const log = await Log.findByIdAndUpdate(
//         req.params.id,
//         { $set: logFields },
//         { new: true }
//       );
  
//     res.json(log);
// })

router.delete('/:id', async (req, res)=>{
    try{
        await Tech.findByIdAndRemove(req.params.id);
  
        res.json({msg: 'Tech removed'});
    }catch(err){
        console.error(err.message);
        res.status(500).send('Server Error');
    }
    
})

module.exports = router;
