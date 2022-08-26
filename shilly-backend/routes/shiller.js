const express = require("express");
const shillerRoutes = express.Router();

const dbo = require("../db/conn"); // Connect to the db
const collectionName = "shillers";

// Define Shiller attributes here
function shillerModel(requestBody) {
    return {
        "username": requestBody.username,
        "name": requestBody.name
    };
}

function dbConnect() {
    return dbo.getDb(collectionName).collection(collectionName);
}


// CRUD Methods here

// Get all Shillers
shillerRoutes.route("/shiller").get(function (req, res) {
    dbConnect()
        .find({})
        .toArray(function (err, result) {
            if (err) throw err;
            res.json(result);
    });
})

// Create new Shiller
shillerRoutes.route("/shiller/add").post(function (req, res) {
    let _shiller = shillerModel(req.body);
    
    dbConnect().insertOne(_shiller, function(err, res) {
        if (err) throw err;
    })
});

// Update Shiller by id
shillerRoutes.route("/update/:id").post(function (req, res) {
    let queryId = { id: req.body.id };

    let _shiller = shillerModel(req.body);
    let updatedShiller = {
      $set: { _shiller },
    };

    dbConnect().updateOne(queryId, updatedShiller, function (err, res) {
        if (err) throw err;
        console.log("1 document updated");
    });
});

// Delete Shiller by id
shillerRoutes.route("/:id").delete((req, res) => {
    let queryId = { id: req.body.id };

    dbConnect().deleteOne(queryId, function (err, obj) {
      if (err) throw err;
      console.log("1 document deleted");
    });
});

module.exports = shillerRoutes;