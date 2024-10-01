const mongoose = require("mongoose");
const { allIITGHostels } = require("../../helpers/constants");

const messSchema = new mongoose.Schema({
  messName: {
    type: String,
    required: true,
    enum: allIITGHostels,
  },
  incoming: {
    // emails of all users who have subscribed to this mess
    type: [String],
    default: [],
  },
  outgoing: {
    // emails of all users who have unsubscribed to this mess
    type: [String],
    default: [],
  },
  messIncomingCapacity : {
    type: Number,
    required: true,
    default: 150,
  },
  messOutgoingCapacity :{
    type: Number,
    required: true,
    default: 150,
  }
});

const Mess = mongoose.model("Mess", messSchema);

module.exports = { Mess };