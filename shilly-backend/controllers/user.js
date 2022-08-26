const User = require("../models/User");
const ErrorResponse = require("../utils/errorResponse");

exports.getAllUsers = async ( req, res, next ) => {
    try {
      const users = await User.find();
      res.json({success: true, users: users});
    } catch (error) {
      res.status(404).json({ success: false, error: error.message})
    }
}

exports.getUserByUsername = async ( req, res, next ) => {
    const username = req.query.username;
    try {
        const user = await User.findOne({ username });
        if (user) {
        res.json({success: true, user: user});
        } else {
        res.status(404).json({ success: false, error: "No such user!"})
        }
    } catch (error) {
        res.status(404).json({ success: false, error: error.message})
    }
}

exports.getUserById = async ( req, res, next ) => {
    const _id = req.body.userId;
    try {
        const user = await User.findOne({ _id });
        if (user) {
        res.json({success: true, user: user});
        } else {
        res.status(404).json({ success: false, error: "No such user!"})
        }
    } catch (error) {
        res.status(404).json({ success: false, error: error.message})
    }
}

exports.updateUser = async ( req, res, next ) => {
    try {
        const updatedUser = req.body;
        var user = await User.findOne({_id: updatedUser._id});

        if (!user) {
            return next(new ErrorResponse("No such user", 400));
        }

        User.updateOne({_id: updatedUser._id}, updatedUser).then(
            () => {
                res.status(201).json({
                    success: true,
                    data: "Updated successfully",
                    user: updatedUser
                })
            }
        ).catch(
            (error) => {
                res.status(400).json({
                    error: error
                });
            }
        )
    } catch (error) {
        next(error);
    }
}

exports.likeUser = async(req, res, next) => {
    var likeeId = req.body.likeeId;
    var likerId = req.body.likerId;

    User.findById(likerId).then(function(user) {
        if (!user) { return next(new ErrorResponse("No such user, 401"))};

        return user.likeUser(likeeId).then(
            () => { res.status(201).json({ success: true }) }
        );
    }).catch(next);
}

exports.unlikeUser = async(req, res, next) => {
    var likeeId = req.body.likeeId;
    var likerId = req.body.likerId;

    User.findById(likerId).then(function(user) {
        if (!user) { return next(new ErrorResponse("No such user, 401"))};

        return user.unlikeUser(likeeId).then(
            () => { res.status(201).json({ success: true }) }    
        );
    }).catch(next);
}

exports.hasLiked = async(req, res, next) => {
    var likeeId = req.body.likeeId;
    var likerId = req.body.likerId;

    User.findById(likerId).then(function(user) {
        if (!user) { return next(new ErrorResponse("No such user, 401"))};
        res.status(201).json({ success: true, data: user.hasLiked(likeeId)});
        
    }).catch(next);

}