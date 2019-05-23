const Message = require('../../../models/Message');

const getAllByUser = (req, res) =>{
    Message.find({"user": "ikke"}, (err, doc) => {
        if(!err) {
            res.json({
                "status": "succes",
                "data": {
                    "message": doc
                }
            })
        }
    })
    // res.json({
    //     "status": "succes",
    //     "data": {
    //         "message": []
    //     }
    // });
}

const create = (req, res, next) => {
    let message = new Message();
    message.text = req.body.text;
    message.user = req.body.user;
    message.save((err, doc) => {
        if(err) {
           res.json({
               "status": "failed",
               "message": "could not save message"
           })
        }

        if(!err) {
            res.json({
                "status": "succes",
                "data": {
                    "message": doc
                }
            })
        }
    });

    // res.json({
    //     "status": "succes",
    //     "data": {
    //         "message": "POSTING a new message"
    //     }
    // });
}

module.exports.getAll = getAllByUser;
module.exports.create = create;