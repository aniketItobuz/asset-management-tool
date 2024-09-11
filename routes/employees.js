const express = require("express");
const router = express.Router();
const { z } = require("zod");
const employee = require("../models/employee");

// Define the Zod schema for employee validation
const employeeSchema = z.object({
  name: z.string().min(1, "Name is required"),
  email: z.string().email("Invalid email format"),
  phone_no: z.number().positive("Phone number must be a positive number"),
  team: z.string().min(1, "Team is required"),
  status: z.boolean().default(true),
});

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
  const result = employeeSchema.safeParse(req.body);
  if (!result.success) {
    return res.status(400).json(result.error.issues);
  }
  const emp = new employee(result.data);

  try {
    const a1 = await emp.save();
    res.json(a1);
  } catch (err) {
    res.status(500).send("Error: " + err);
  }
});

router.delete("/:id", async (req, res) => {
  try {
    const emp = await employee.findByIdAndDelete(req.params.id);
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
