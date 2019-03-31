const partnerModel = require("../models/partner.model")
const express = require("express")
const router = express.Router()
const validator = require("../validations/partnerValidations")
const axios =require("axios")
const reviewModel = require("../models/review.model")


// router.post('/reviewMember', (req, res) => {
//     if (!req.body) {
//       return res.status(400).send('Body is missing')
//     }
//     axios
//       .post(`${baseURL}/api/review/newPostPartner`, {
//         reviewer: req.body.reviewer,
//         reviewee: req.body.reviewee,
//         rating: req.body.rating,
//         review: req.body.review,
//         reviewerModel: 'Partners',
//         revieweeModel: 'Members',
//         task: req.body.task
//       })
//       .then(doc => {
//         if (!doc || doc.data.length === 0) {
//           return res.send('Your review can not be posted')
//         }
//         res.status(201).json(doc.data)
//       })
//       .catch(err => {
//         res.send('Error occured')
//       })
//   })

router.post('/partnerReview', (request, response) => {
    let requestAssigner= request.body.reviewer
    let requestAssignee= request.body.reviewee
    let taskid=request.body.task
    axios.get('http://localhost:3000/api/task/Done',{
      params:{

        owner:requestAssigner,
        assignee:requestAssignee,
        task:taskid

      }
     })
      .then( (doc) => {
     if(!doc ){
         console.log("null")
       return response.status(500).send(doc);
     }else{ 
        if(!request.body){
            console.log("mafesh body")
            return response.status(400).send("Body is missing")
        }
        console.log("reqbody is :"+request.body)
    
        const isValidated = reviewvalidator.createValidation(request.body)
        if (isValidated.error) return response.status(400).send({ error: isValidated.error.details[0].message })
        let model = new reviewModel(request.body)
        console.log("20")
        model.save()
            .then((doc) => {
                if(!doc || doc.length ===0){
                    return response.status(500).send(doc)
                }
    
                response.status(201).send(doc)
            })
            .catch((err) => {
                response.status(500).json(err)
            })
     }
    })
})



router.post('/', (req, res) => {
    if (!req.body) {
      return res.status(400).send('Body is missing')
    }
    const isValidated = validator.createValidation(req.body)
    if (isValidated.error)
      return res.status(400).send({ error: isValidated.error.details[0].message })
    let model = new partnerModel(req.body)
  
    model
      .save()
      .then(doc => {
        if (!doc || doc.length === 0) {
          return res.status(500).send(doc)
        }
  
        res.status(200).send(doc)
      })
      .catch(err => {
        res.status(500).json(err)
      })
  })


router.get("/", (req, res) => {
    if(!req.query.email){
        return res.status(400).send("Email is mising.")
    }
    partnerModel.findOne({
        email: req.query.email
    })
        .then((doc) => {
            res.json(doc)
        })
        .catch((err) => {
            res.status(500).json(err)
        })
})


router.get('/all', (request, response) => {

    let key = {}

    partnerModel.find(key).then((document) => {

        if (!document || document.length == 0) {
            return response.status(500).json(document)
        }

        response.status(200).json(document)

    }).catch((error) => {
        response.status(500).json(error)
    })
})



router.put("/", (req, res) => {
    if(!req.query.email){
        return res.status(400).send("Email is mising.")
    }
    const isValidated = validator.updateValidation(req.body)
    if (isValidated.error) return res.status(400).send({ error: isValidated.error.details[0].message })
    partnerModel.findOneAndUpdate({
        email: req.query.email},
        req.body, {
        new: true
    })
        .then((doc) => {
            res.json(doc)
        })
        .catch((err) => {
            res.status(500).json(err)
        })
})


router.put("/review", (req, res) => {
    if(!req.query.email && !req.query.name){
        return res.status(400).send("Email is mising.")
    }
    const isValidated = validator.updateValidation(req.body)
    if (isValidated.error) return res.status(400).send({ error: isValidated.error.details[0].message })
    partnerModel.findOneAndUpdate({
        email: req.query.email},
        req.body, {
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
    partnerModel.findOneAndDelete({
        email: req.query.email
    })
        .then((doc) => {
            res.json(doc)
        })
        .catch((err) => {
            res.status(500).json(err)
        })
})

  router.get("/getFeedback", (req, res) => {
    if (!req.query.id) {
      return res.status(400).send("Reviewee ID is missing.");
    }
    reviewModel
      .find({
        reviewee: req.query.id
      })
      .populate("reviewer", "name")
      .populate("reviewee", "name")
      .populate("task", "title")
      .then(doc => {
        res.json(doc);
      })
      .catch(err => {
        res.status(500).json(err);
      });
  });

module.exports = router;