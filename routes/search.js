const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");

Object.defineProperty(Array.prototype, "flat", {
  value: function(depth = 1) {
    return this.reduce(function(flat, toFlatten) {
      return flat.concat(
        Array.isArray(toFlatten) && depth - 1
          ? toFlatten.flat(depth - 1)
          : toFlatten
      );
    }, []);
  }
});

const searchNames = list => {
  let models = [];
  models.push(mongoose.models.Certification);
  models.push(mongoose.models.Task);
  models.push(mongoose.models.Members);
  regex = list.map(e => new RegExp(e, "i"));
  console.log(regex);
  return Promise.all(
    models.map(model =>
      model
        .find({
          name: {
            $in: regex
          }
        })
        .select("name")
    )
  );
};

router.get("/", (req, res) => {
  let resolved = false;
  if (!req.query.keyword) {
    return res.status(400).send("Query is Missing");
  }
  let splitted = req.query.keyword.split(" ");
  let result = [];
  searchNames([req.query.keyword])
    .then(doc => {
      if (splitted.length < 2) {
        resolved = true;
        return res.status(200).send(doc.flat(Infinity));
      }
      result = doc;
      return searchNames(splitted);
    })
    .then(docs => {
      if (!docs) {
        return res.status(400).send("Bad Request");
      }
      if (!resolved) {
        result = result.concat(docs);
        res.status(200).send(result.flat(Infinity));
      }
    })
    .catch(err => res.status(500).json(err));
});

module.exports = router;
