const { Mess } = require("../../models/habModels/messModel");
const  onestopuser  = require("../../models/userModel");

const messChange = async () => {
  try {
    const allMess = await Mess.find({});
    for (const mess of allMess) {
      for (const userEmail of mess.incoming) {
        const user = await onestopuser.findOne({ outlookEmail: userEmail });
        if (user) {
          console.log(mess);
          user.subscribedMess = mess.messName;
          await user.save();
        }
      }
      mess.incoming = [];
      mess.outgoing = [];
      await mess.save();
    }
    console.log("All Incoming Cleared");
  } catch (err) {
    console.log("Changing not completed", err);
  }
};

const messResponseChange = async (req, res) => {
  const reqMessName = req.body.subscribedMess;
  const userEmail = req.body.outlookEmail;
  const user = await onestopuser.findOne({ outlookEmail: userEmail });
  const hostel = user.hostel;

  const messName = await Mess.findOne({ messName: reqMessName });
  const currMess = await Mess.findOne({ messName: hostel });
  console.log(messName, currMess);
  if (messName && currMess) {
    if (
      messName.incoming.length < messName.messIncomingCapacity &&
      currMess.outgoing.length < currMess.messOutgoingCapacity
    ) {
      messName.incoming.push(userEmail);
      currMess.outgoing.push(userEmail);
      await messName.save();
      await currMess.save();
      res.status(200).json({success:false , message :"User successfully subscribed to the mess."});
    } else {
      res.status(404).json({success:false , message:`Maximum Incoming reached ${messName.messIncomingCapacity} or Maximum Outgoing reached ${currMess.messOutgoingCapacity}`});
    }
  } else {
    res.status(404).json({success:false, message: "Bad request error" , error: "Mess Not Found" });
  }
};

module.exports = { messChange, messResponseChange };
