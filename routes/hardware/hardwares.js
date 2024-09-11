const express = require("express");
const router = express.Router();
const { z } = require("zod");
const hardware = require("../../models/hardware/hardware");

router.get("/", async (req, res) => {
  try {
    const hard = await hardware.find();
    res.json(hard);
  } catch (err) {
    res.send("Error" + err);
  }
});

// Define the Zod schema for employee validation
const hardwareSchema = z.object({
  name: z.string().min(1, "Name is required"),
  description: z.string().min(1, "Description is required"),
  type: z.string().min(1, "Type is required"),
  serial_no: z.string().min(1, "Serial no is required"),
  assignee: z.string().min(1, "Assignee is required"),
});

router.post("/", async (req, res) => {
  const result = hardwareSchema.safeParse(req.body);
  if (!result.success) {
    return res.status(400).json(result.error.issues);
  }
  const hard = new hardware(result.data);

  try {
    const b1 = await hard.save();
    res.json(b1);
  } catch (err) {
    res.status(500).send("Error: " + err);
  }
});

module.exports = router;

