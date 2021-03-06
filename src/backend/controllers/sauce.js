const Sauce = require("../models/sauces");
const fs = require("fs");

exports.createSauce = (req, res, next) => {
    const url = req.protocol + '://' + req.get('host');
    req.body.sauce = JSON.parse(req.body.sauce);
    const sauce = new Sauce({
        userId: req.body.sauce.userId,
        name: req.body.sauce.name,
        manufacturer: req.body.sauce.manufacturer,
        description: req.body.sauce.description,
        mainPepper: req.body.sauce.mainPepper,
        heat: req.body.sauce.heat,
        imageUrl: url + '/images/' + req.file.filename,
        likes: 0,
        dislikes: 0,
        usersLiked: [],
        usersDisliked: [],
    });
    sauce.save().then(
        () => {
            res.status(201).json({
                message: 'Saved successfully'
            })
        }
    )
    .catch((error) => {
        res.status(400).json({
            error: error
        });
    })
}; 

exports.getOneSauce = (req, res, next) => {
    Sauce.findOne({
        _id: req.params.id
    }).then(
        (sauce) => {
            res.status(200).json(sauce);
        }
    ).catch(
        (error) => {
            res.status(404).json(error)
        }
    )
};

exports.modifySauce = (req, res, next) => {
    let sauce = new Sauce ({_id: req.params._id});
    if (req.file) {
        const url = req.protocol + '://' + req.get('host');
        req.body.sauce = JSON.parse(req.body.sauce);
        sauce = {
            userId: req.body.userId,
            name: req.body.name,
            manufacturer: req.body.manufacturer,
            description: req.body.description,
            mainPepper: req.body.mainPepper,
            heat: req.body.heat,
            imageUrl: url + '/images/' + req.file.filename,
        };
    } else {
        sauce = {
            userId: req.body.userId,
            name: req.body.name,
            manufacturer: req.body.manufacturer,
            description: req.body.description,
            mainPepper: req.body.mainPepper,
            heat: req.body.heat,
            imageUrl: req.body.imageUrl,
        };
    };
    Sauce.updateOne({_id: req.params.id}, sauce).then(
    () => {
        res.status(201).json({
            message: 'Updated'
        });
    })
    .catch(
        (error) => {
            res.status(400).json({
                error: error
            });
        }
    )
};

exports.deleteSauce = (req, res, next) => {
    Sauce.findOne({_id: req.params.id}).then(
        (sauce) => {
            const filename = sauce.imageUrl.split("/images/")[1];
            fs.unlink("images/" + filename, () => {
                Sauce.deleteOne({_id: req.params.id}).then(
                    () => {
                        res.status(200).json({
                            message: 'Successfully Deleted'
                        });
                    }
                )
            })
        }
    ).catch(
        (error) => {
            res.status(400).json({
                error: error
            });
        }
    )
};

exports.getAllSauce = (req, res, next) => {
    Sauce.find().then(
        (sauces) => {
            res.status(200).json(sauces)
        }
    )
    .catch(
        (error) => {
            res.status(400).json(error);
        }
    )
};

exports.likedSauce = (req, res) => {
    Sauce.findOne({ _id: req.params.id}).then(
        (sauce) => {
            if (req.body.like === 1) {
                sauce.usersLiked.push(req.body.userId)
                const ssauce = new Sauce({
                    _id: sauce._id,
                    userId: sauce.userId,
                    name: sauce.name,
                    manufacturer: sauce.manufacturer,
                    description: sauce.description,
                    mainPepper: sauce.mainPepper,
                    imageUrl: sauce.imageUrl,
                    heat: sauce.heat,
                    likes: sauce.likes += 1,
                    dislikes: sauce.dislikes,
                    usersLiked: sauce.usersLiked,
                    usersDisliked: sauce.usersDisliked 
                })
                Sauce.updateOne({_id: req.params.id}, ssauce).then(
                    () => {
                        res.status(200).json({
                            message: "Sauce Liked"
                        });
                    }
                )
            } else if (req.body.like === 0) {
                for (n = 0; n < sauce.likes; n++) {
                    if ( sauce.usersLiked[n] == req.body.userId ) {
                        sauce.usersLiked.splice(n, 1)
                        const ssauce = new Sauce({
                            _id: sauce._id,
                            userId: sauce.userId,
                            name: sauce.name,
                            manufacturer: sauce.manufacturer,
                            description: sauce.description,
                            mainPepper: sauce.mainPepper,
                            imageUrl: sauce.imageUrl,
                            heat: sauce.heat,
                            likes: sauce.likes -= 1,
                            dislikes: sauce.dislikes,
                            usersLiked: sauce.usersLiked,
                            usersDisliked: sauce.usersDisliked 
                        })
                        Sauce.updateOne({_id: req.params.id}, ssauce).then(
                            () => {
                                res.status(200).json({
                                    message: "Sauce Liked Removed"
                                });
                            }
                        )
                    }
                }
                for (a = 0; a < sauce.dislikes; a++) {
                    if (sauce.usersDisliked[a]  == req.body.userId ) {
                        sauce.usersDisliked.splice(a, 1)
                        const ssauce = new Sauce({
                            _id: sauce._id,
                            userId: sauce.userId,
                            name: sauce.name,
                            manufacturer: sauce.manufacturer,
                            description: sauce.description,
                            mainPepper: sauce.mainPepper,
                            imageUrl: sauce.imageUrl,
                            heat: sauce.heat,
                            likes: sauce.likes,
                            dislikes: sauce.dislikes -= 1,
                            usersLiked: sauce.usersLiked,
                            usersDisliked: sauce.usersDisliked 
                        })
                        Sauce.updateOne({_id: req.params.id}, ssauce).then(
                            () => {
                                res.status(200).json({
                                    message: "Sauce Liked"
                                });
                            }
                        )
                    }
                }
            } else if (req.body.like === -1) {
                sauce.usersDisliked.push(req.body.userId);
                const ssauce = new Sauce({
                    _id: sauce._id,
                    userId: sauce.userId,
                    name: sauce.name,
                    manufacturer: sauce.manufacturer,
                    description: sauce.description,
                    mainPepper: sauce.mainPepper,
                    imageUrl: sauce.imageUrl,
                    heat: sauce.heat,
                    likes: sauce.likes,
                    dislikes: sauce.dislikes += 1,
                    usersLiked: sauce.usersLiked,
                    usersDisliked: sauce.usersDisliked 
                })
                Sauce.updateOne({_id: req.params.id}, ssauce).then(
                    () => {
                        res.status(200).json({
                            message: "Sauce Liked"
                        });
                    }
                )
            };
        }
    ).catch(
        () => {
            res.status(400).json({
                error: "An error as occured"
            });
        }
    )
};