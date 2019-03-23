const memberModel = require("./../models/member.Model")
const express = require("express")
const router = express.Router()
const validator = require('../validations/memberValidations.js')
const app = express()
var request = require('request')
const axios = require('axios');
router.get("/tasks",(req,res)=>{
      console.log("in tasks")
      var propertiesObject = { email :'hi@com' }
    request({url:'http://localhost:3000/api/partner', qs:propertiesObject}, function (error, response, body) {
        if (!error && response.statusCode == 200) {
            var data = JSON.parse(body)
            console.log(data.email) // Print the google web page.
            res.send(body)
            return
         }
         res.send(error.statusCode)
    })
    
    
    console.log('finish')
    })
   
   
   
 router.get("/cert",(req,res)=>{
     
     console.log(req.query.email)
     axios.get("http://localhost:3000/api/Member",{
        params: {
            email:req.query.email,
        }
      }).then(response =>{
        objid = response.data._id
        console.log(response.data._id)
       //get certifcate array 
       axios.get("http://localhost:3000/api/certification",{
        params: {
            id_of_certification:req.query.id,
        }
      }).then(response =>{
        var memberModel=response.data[0].membersapplied
        memberModel.forEach(function(value) {
            if(value._id == objid) {
                memberModel.push({
                    MEMBERS:objid,
                    finished : "false"})
            }
        })
        
        console.log(response.data)
       console.log(memberModel.tostring)
       //update certifcate array
       axios.put("http://localhost:3000/api/certification?id_of_certification=5001",{
        "membersapplied":memberModel
        })
        .then(function(response){
            console.log('saved successfully')
            console.log(response.data)
            res.send(response.data)
    })



    
        })
     .catch(error => {
        console.log(error);
      })







      //
        })
     .catch(error => {
        console.log(error);
      })


    })
    
  
      
      



    router.get("/ax",(req,res)=>{


        axios.get('http://localhost:3000/api/partner/all')
  .then(response =>{
      var obj = response.data
      obj.forEach(element => {
         console.log(element.email) 
      });
   console.log(response.data)
   res.send(response.data)
   
  })
  .catch(error => {
    console.log(error);
  })
      
      })







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
    const isValidated = validator.updateValidation(req.body)
    if (isValidated.error) return res.status(400).send({ error: isValidated.error.details[0].message })
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

module.exports = router;