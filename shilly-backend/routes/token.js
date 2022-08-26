const express = require("express");
const tokenRoutes = express.Router();

const dbo = require("../db/conn"); // Connect to the db
const collectionName = "tokens";

// Define Token attributes here
function tokenModel(requestBody) {
    return {
        "symbol": requestBody.symbol,
        "name": requestBody.name
    };
}

function dbConnect() {
    return dbo.getDb(collectionName).collection(collectionName);
}


// CRUD Methods here

// Get all Tokens
tokenRoutes.route("/token").get(function (req, res) {
    dbConnect()
        .find({})
        .toArray(function (err, result) {
            if (err) throw err;
            res.json(result);
    });
})

// Create new Token
tokenRoutes.route("/token/add").post(function (req, res) {
    let _token = tokenModel(req.body);
    
    dbConnect().insertOne(_token, function(err, res) {
        if (err) throw err;
    })
});

// Update Token by id
tokenRoutes.route("/update/:id").post(function (req, res) {
    let queryId = { id: req.body.id };

    let _token = tokenModel(req.body);
    let updatedToken = {
      $set: { _token },
    };

    dbConnect().updateOne(queryId, updatedToken, function (err, res) {
        if (err) throw err;
        console.log("1 document updated");
    });
});

// Delete Token by id
tokenRoutes.route("/:id").delete((req, res) => {
    let queryId = { id: req.body.id };

    dbConnect().deleteOne(queryId, function (err, obj) {
      if (err) throw err;
      console.log("1 document deleted");
    });
});

module.exports = tokenRoutes;