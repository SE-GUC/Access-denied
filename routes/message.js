const messageModel = require("./../models/message.model");
const express = require("express");
const router = express.Router();
const axios = require("axios");
const _ = require("lodash");
let baseURL = process.env.BASEURL || "http://localhost:3000";

router.get("/", (req, res) => {
  if (!req.query.id) {
    return res.status(400).send("Missing ID");
  }
  let messages = [];
  messageModel
    .find({
      from: req.query.id
    })
    .then(doc => {
      messages = messages.concat(doc);
      return messageModel.find({ to: req.query.id });
    })
    .then(doc => {
      messages = messages.concat(doc);
      let chats = messages.map(msg => {
        if (msg.from + "" !== req.query.id) {
          return msg.from;
        }
        if (msg.to + "" !== req.query.id) {
          return msg.to;
        }
      });
      let result = [];
      chats.forEach(chat => {
        if (!result.includes(chat + "")) {
          result.push(chat + "");
        }
      });
      return res.json(result);
    })
    .catch(err => {
      return res.status(500).send(err);
    });
});

router.get("/convo", (req, res) => {
  if (!req.query.id1 || !req.query.id2) {
    return res.status(400).send("Missing ID");
  }
  let messages = [];
  messageModel
    .find({
      from: req.query.id1,
      to: req.query.id2
    })
    .then(doc => {
      messages = messages.concat(doc);
      return messageModel.find({ from: req.query.id2, to: req.query.id1 });
    })
    .then(doc => {
      messages = messages.concat(doc);
      return res.json(messages);
    })
    .catch(err => {
      return res.status(500).send(err);
    });
});
router.post("/", (req, res) => {
  if (!req.body) {
    return res.status(400).send("Missing body");
  }
  let verify = req.app.get("verifyToken");
  let ver = verify(req.body.from);
  if (!ver) return res.status(500).send("Error");
  let id = ver.profile;
  req.body.from = id;
  console.log(req.body.from);
  let model = new messageModel(req.body);
  model
    .save()
    .then(doc => {
      req.app.get("io").emit(req.body.to, req.body);
      return res.json(doc);
    })
    .catch(err => {
      res.status(500).send(err);
    });
});

router.post("/notify", (req, res) => {
  if (!req.body || !req.query.id) {
    return res.status(400).send("Missing body");
  }
  let id = req.query.id;
  req.body.to = id;
  req.body.from = null;
  let model = new messageModel(req.body);
  model
    .save()
    .then(doc => {
      req.app.get("io").emit(req.body.to, req.body);
      return res.json(doc);
    })
    .catch(err => {
      res.status(500).send(err);
    });
});
module.exports = router;
