const express = require("express");
const app = express();
require("./config");
const Ticket = require("./Tickets");
var cors = require('cors')
app.use(cors()) ;
app.use(express.json());

app.get("/tickets/:number", async (req, res) => {
  console.log(req.params.number);
  let data = await Ticket.findOne({
    number: req.params.number,
  });
  console.log(data);
  res.send(data);
});

app.put("/tickets/:number", async (req, res) => {
  console.log(req.params);
  console.log(req+"  :reqBody");
  let rData = await Ticket.findOne({
    number: req.params.number,
  });

  var stateInitital = rData.state;
  console.log(stateInitital + "  :previous state");
  var stateReq = req.body.state;
  console.log(stateReq+"  :requested state");
  try {
    if (stateReq == stateInitital + 1 || stateReq == stateInitital - 1) {
      let data = await Ticket.updateOne(req.params, {
        $set: req.body,
      });
      console.log(data);
      res.send(data);
    } else {
      res.send("error");
    }
  } catch {
    console.log("error");
  }
});

app.listen(3001);
