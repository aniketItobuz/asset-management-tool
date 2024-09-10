const express = require("express");
const router = express.Router();
const employee = require("../models/employee");

router.get("/", async (req, res) => {
  try {
    const emp = await employee.find();
    res.json(emp);
  } catch (err) {
    res.send("Error" + err);
  }
});

router.get("/:id", async (req, res) => {
  try {
    const emp = await employee.findById(req.params.id);
    res.json(emp);
  } catch (err) {
    res.send("Error" + err);
  }
});

router.post("/", async (req, res) => {
  const emp = new employee({
    name: req.body.name,
    email: req.body.email,
    phone_no: req.body.phone_no,
    team: req.body.team,
    status: req.body.status,
  });

  try {
    const a1 = await emp.save();
    res.json(a1);
  } catch (err) {
    res.send("Error" + err);
  }
});

router.delete("/:id", async (req, res) => {
    try {
      const emp = await employee.findByIdAndDelete(req.params.id)
      res.send("Employee deleted");
    } catch (err) {
      res.send("Error" + err);
    }
  });


  router.put("/:id", async (req, res) => {
    try {
      const emp = await employee.findByIdAndUpdate(
        req.params.id,
        {
          name: req.body.name,
          email: req.body.email,
          phone_no: req.body.phone_no,
          team: req.body.team,
          status: req.body.status,
        },
        { new: true } // Return the updated document
      );
  
      if (!emp) {
        return res.status(404).send("Employee not found");
      }
  
      res.json(emp);
    } catch (err) {
      res.send("Error" + err);
    }
  });
  


module.exports = router;
