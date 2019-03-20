const ScheduleModel = require('../models/schedule.model')
const express = require("express")
const router = express.Router();

router.post('/',(req,res)=>{
    if(!req || !req.body){
        return res.status(400).send("Body is Missing")
    }
    //Add validation here
    let model =new ScheduleModel(req.body);
    model.save()
        .then((doc)=>{
            if(!doc || doc.length ===0){
                return res.status(500).send(doc)
            }
            res.status(201).send(doc)
        })
        .catch((err)=>{
            res.status(500).json(err)
        })
})

router.post("/:id/addslot",(req,res)=>{
    if(!req || !req.body){
        return res.status(400).send("Body is Missing")
    }
    
    let slot = {
        from:req.body.from,
        to:req.body.to,
        free:req.body.free,

    }
    if(req.body.assignedTo){
        slot.assignedTo=req.body.assignedTo
    }
    ScheduleModel.findByIdAndUpdate(req.params.id,
        {$push: {Saturday: slot}},
        {safe: true, upsert: true},
        function(err, doc) {
            if(err){
                res.status(500).json(err)
            }else{
                
                ScheduleModel.findById(req.params.id)
                    .then((doc)=>{
                        if(!doc || doc.length ===0){
                            return res.status(500).send(doc)
                        }
                        res.status(200).send(doc)
                    })
                    .catch((err)=>{
                        res.status(500).json(err)
                    })
            }
        }
    );
        
})

router.get("/:id",(req,res)=>{
    if(!req || !req.body){
        res.status(400).send("Body Is Missing")
    }
    ScheduleModel.findById(
        req.params.id)
        .then((doc)=>{
            if(!doc || doc.length===0){
                return res.status(500).send(doc)
            }
            res.status(200).send(doc)
        })
        .catch((err)=>{
            res.status(500).json(err)
        })
})

router.delete("/:id",(req,res)=>{
    if(!req || !req.body){
        res.status(400).send("Body Is Missing")
    }
    ScheduleModel.findByIdAndDelete(req.params.id)
    .then((doc)=>{
        if(!doc || doc.length===0){
            return res.status(500).send(doc)
        }
        res.status(200).send(doc)
    })
    .catch((err)=>{
        res.status(500).json(err)
    })
})


module.exports = router;