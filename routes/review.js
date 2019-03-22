const reviewModel = require("../models/review.model");
const express = require("express");
const router = express.Router();
const validator = require("../validations/reviewValidations");

router.post("/", (req, res) => {
  if (!req.body) {
    return res.status(400).send("Body is missing");
  }

  const isValidated = validator.createValidation(req.body);
  if (isValidated.error)
    return res
      .status(400)
      .send({ error: isValidated.error.details[0].message });

  let model = new reviewModel(req.body);
  model
    .save()
    .then(doc => {
      if (!doc || doc.length === 0) {
        return res.status(500).send(doc);
      }

      res.status(201).send(doc);
    })
    .catch(err => {
      res.status(500).json(err);
    });
});

router.get("/", (req, res) => {
  if (!req.query.reviewee) {
    return res.status(400).send("Reviewee ID is missing.");
  }
  reviewModel
    .findOne({
      reviewee: req.query.reviewee
    })
    .populate("reviewer", "name")
    .populate("reviewee", "name")
    .then(doc => {
      res.json(doc);
    })
    .catch(err => {
      res.status(500).json(err);
    });
});

router.get("/all", (req, res) => {
  reviewModel
    .find({})
    .then(doc => {
      res.json(doc);
    })
    .catch(err => {
      res.status(500).json(err);
    });
});

router.put("/", (req, res) => {
  if (!req.query.id) {
    return res.status(400).send("Review ID is missing.");
  }
  const isValidated = validator.updateValidation(req.body);
  if (isValidated.error)
    return res
      .status(400)
      .send({ error: isValidated.error.details[0].message });
  reviewModel
    .findOneAndUpdate(
      {
        _id: req.query.id
      },
      req.body,
      {
        new: true
      }
    )
    .then(doc => {
      res.json(doc);
    })
    .catch(err => {
      res.status(500).json(err);
    });
});

router.delete("/", (req, res) => {
  if (!req.query.id) {
    return res.status(400).send("Review ID is missing.");
  }
  reviewModel
    .findOneAndDelete({
      _id: req.query.id
    })
    .then(doc => {
      res.json(doc);
    })
    .catch(err => {
      res.status(500).json(err);
    });
});

module.exports = router;
