const memberModel = require("./../models/member.Model")
const express = require("express")
const router = express.Router()
const validator = require('../validations/memberValidations.js');
const axios = require("axios")
//basic CRUD op
router.post("/", (req, res) => {
    if(!req.body){
        return res.status(400).send("Body is missing")
    }
    const isValidated = validator.createValidation(req.body)
    if (isValidated.error) {
        return res.status(400).send({ error: isValidated.error.details[0].message })
    }
    let model = new memberModel(req.body)
    model.save()
        .then((doc) => {
            if(!doc || doc.length ===0){
                return res.status(500).send(doc)
            }

            res.status(201).send(doc)
        })
        .catch((err) => {
            res.status(500).json(err)
        })
})

router.get("/", (req, res) => {
    if(!req.query.email){
        return res.status(400).send("Email is missing.")
    }
    memberModel.findOne({
        email: req.query.email
    })
        .then((doc) => {
            res.json(doc)
        })
        .catch((err) => {
            res.status(500).json(err)
        })
})

router.put("/", (req, res) => {
    if(!req.query.email){
        return res.status(400).send("Email is missing.")
    }
    // const isValidated = validator.updateValidation(req.body)
    // if (isValidated.error) return res.status(400).send({ error: isValidated.error.details[0].message })
    memberModel.findOneAndUpdate({
        email: req.query.email
    }, req.body, {
        new: true
    })
        .then((doc) => {
            res.json(doc)
        })
        .catch((err) => {
            res.status(500).json(err)
        })
})

router.delete("/", (req, res) => {
    if(!req.query.email){
        return res.status(400).send("Email is mising.")
    }
    memberModel.findOneAndDelete({
        email: req.query.email
    })
        .then((doc) => {
            res.json(doc)
        })
        .catch((err) => {
            res.status(500).json(err)
        })
})

//user stories
router.get("/all", (req, res) => {
    memberModel.find({})
        .then((doc) => {
            res.json(doc)
        })
        .catch((err) => {
            res.status(500).json(err)
        })
})

router.get("/tasksAvilable", (req, res) => {


//  axios.get("http://localhost:3000/api/task/all")
//        .then(tasks =>{
//            data = ""
           axios.get("http://localhost:3000/api/Member", {
            params: {
              email: req.query.email
            }})
            . then(member => {
               let Certification= member.data.Certification
                let save =[]
               Certification.forEach(function(element) {
                save = element.skills +","+save                  });               
                  let m= {
               skills : save
               } 

            //    res.json(m)
            // var arrStr = JSON.parse(m);
                // console.log(arrStr)
                    axios.get('http://localhost:3000/api/task/filterTasks',{
                        params: {
                            skills:m
                          }})
                        
                       
                      .then(m =>
                        {
                            res.json(m.data)
                        }

                      )

       })

    })
    router.get('/applyonTask', (request, response) => { 
        let email =request.query.email
        let taskemail =request.query.contactEmail
        axios.get("http://localhost:3000/api/Member/tasksAvilable", {
            params: {
              email: email
            }})
            .then(tasks=>{
                axios.get("http://localhost:3000/api/task", {
                    params: {
                        contactEmail: taskemail
                      }})
                      .then(thetask=>{
                        tasks.data.forEach(function(atask){
                            if(atask.title==thetask.data.title){
                                axios.put("http://localhost:3000/api/task?contactEmail="+taskemail, {
                                    assignee: email
                                    }).then(p=>{
                                           response.status(200).json(p.data)
                                                         })
                               
                            }
                      })
               
                    })

                })
            })
    


module.exports = router;