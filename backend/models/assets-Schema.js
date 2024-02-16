const mongoose = require('mongoose');

const assetsSchema = mongoose.Schema({
    key: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "employee"
    },
    email: {
        type: String,
        required: true
    },
    assets: {
        type: Array
    },
    assetsid: {
        type: Array
    },
    dateArray: {
        type: [Date], // Array of Date objects
        default: [Date.now()]
            //function () {
        //     return [Date.now()];
        // }// Default value is an array containing the current date
    }

})

const AssetsModel = mongoose.model("assets", assetsSchema);
module.exports = AssetsModel;
