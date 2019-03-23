require("dotenv").config();
bodyParser = require("body-parser");
express = require("express");
const mongoose = require("mongoose");
const coworkingspaceModel = require("../models/coworkingspace.model");
const validator = require("../validations/coworkingspaceValidations.js");
const axios = require("axios");
const router = express.Router();
var baseURL = process.env.BASEURL || "http://localhost:3000";

router.post("/", (req, res) => {
  console.log(req.body);
  const isValidated = validator.createValidation(req.body);
  if (isValidated.error)
    return res
      .status(400)
      .send({ error: isValidated.error.details[0].message });
  axios
    .post(`${baseURL}/api/schedule`, {})
    .then(response => {
      let schedule = response.data._id;
      req.body.schedule = schedule;
      let model = new coworkingspaceModel(req.body);
      model
        .save()
        .then(doc => {
          if (!doc || doc.length === 0) {
            return res.status(500).send(doc);
          }
          res.status(201).send(doc);
        })
        .catch(err => {
          return res.status(500).send(err);
        });
    })
    .catch(err => {
      return res.status(500).send(err);
    });
});

router.get("/", (req, res) => {
  console.log(req.body);
  if (!req.body.email) return res.status(400).send("Email is missing.");
  coworkingspaceModel
    .findOne({
      email: req.body.email
    })
    .then(doc => {
      res.json(doc);
    })
    .catch(err => {
      res.status(500).json(err);
    });
});

router.put("/", (req, res) => {
  if (!req.query.email) {
    return res.status(400).send("Email is missing.");
  }
  const isValidated = validator.updateValidation(req.body);
  if (isValidated.error)
    return res
      .status(400)
      .send({ error: isValidated.error.details[0].message });
  coworkingspaceModel
    .findOneAndUpdate(
      {
        email: req.query.email
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
  if (!req.query.email) {
    return res.status(400).send("Email is missing.");
  }
  coworkingspaceModel
    .findOneAndDelete({
      email: req.query.email
    })
    .then(doc => {
      res.json(doc);
    })
    .catch(err => {
      res.status(500).json(err);
    });
});

router.post("/schedule", (req, res) => {
  if (!req || !req.body) {
    return res.status(400).send("Body Is Missing");
  }
  if (!req.query.id)
    return res.status(400).send("Coowrking Space Id Is Missing");
  let id = req.query.id;
  coworkingspaceModel
    .findById(id)
    .then(doc => {
      if (!doc || doc.length === 0) {
        return res.status(500).send(doc);
      }
      let scheduleId = doc.schedule;
      res.redirect(307, `../schedule/${scheduleId}/slot`);
    })
    .catch(err => {
      res.status(500).json(err);
    });
});

router.get("/schedule", (req, res) => {
  if (!req || !req.body) {
    return res.status(400).send("Body Is Missing");
  }
  if (!req.query.id)
    return res.status(400).send("Coworking Space Id is Missing");
  let id = req.query.id;
  coworkingspaceModel
    .findById(id)
    .then(doc => {
      if (!doc || doc.length === 0) {
        return res.status(500).send(doc);
      }
      let scheduleId = doc.schedule;
      if (!req.query.slot) {
        res.redirect(307, `../schedule/${scheduleId}`);
      } else {
        res.redirect(
          307,
          `../schedule/${scheduleId}/slot?id=${req.query.slot}`
        );
      }
    })
    .catch(err => {
      res.status(500).json(err);
    });
});

router.put("/schedule", (req, res) => {
  if (!req || !req.body) {
    return res.status(400).send("Body Is Missing");
  }
  if (!req.query.id)
    return res.status(400).send("Coworking Space Id is Missing");
  if (!req.query.slot) return res.status(400).send("Slot Id Is Missing");
  let id = req.query.id;
  coworkingspaceModel
    .findById(id)
    .then(doc => {
      if (!doc || doc.length === 0) {
        return res.status(500).send(doc);
      }
      let scheduleId = doc.schedule;
      res.redirect(307, `../schedule/${scheduleId}/slot?id=${req.query.slot}`);
    })
    .catch(err => {
      res.status(500).json(err);
    });
});
router.delete("/schedule", (req, res) => {
  if (!req || !req.body) {
    return res.status(400).send("Body Is Missing");
  }
  if (!req.query.id)
    return res.status(400).send("Coworking Space Id is Missing");
  if (!req.query.slot) return res.status(400).send("Slot Id Is Missing");
  let id = req.query.id;
  coworkingspaceModel
    .findById(id)
    .then(doc => {
      if (!doc || doc.length === 0) {
        return res.status(500).send(doc);
      }
      let scheduleId = doc.schedule;
      res.redirect(307, `../schedule/${scheduleId}/slot?id=${req.query.slot}`);
    })
    .catch(err => {
      res.status(500).json(err);
    });
});

router.get("/all", (req, res) => {
  coworkingspaceModel
    .find()
    .then(doc => {
      res.json(doc);
    })
    .catch(err => {
      res.status(500).json(err);
    });
});

module.exports = router;
