/**
 * Midterm API Project - COMP229
 * Implement the six equipment API endpoints described in README.md.
 * Use the array index as the ID: index 0 is the first equipment item.
 * Add exactly two personalized items to the five supplied below.
 */
import express from "express";

const app = express();
app.use(express.json());

let equipment = [
  { name: "USB Microphone", category: "audio", brand: "AudioLab", year: 2021, quantity: 5 },
  { name: "LED Panel", category: "lighting", brand: "BrightWorks", year: 2022, quantity: 4 },
  { name: "Network Switch", category: "networking", brand: "NetCore", year: 2020, quantity: 3 },
  { name: "Cable Tester", category: "tools", brand: "TestPro", year: 2019, quantity: 6 },
  { name: "Studio Headphones", category: "audio", brand: "SoundCraft", year: 2023, quantity: 8 },
  { name: "Ipad", category: "visual", brand: "Apple", year: 2001, quantity: 2 },
  { name: "Keyboard", category: "accessories", brand: "Microsoft", year: 2005, quantity: 10 },
];

app.get("/api/equipment", (req, res) => {
  // TODO: Return the full equipment array.
  if (!equipment) {
    return res.status(501).send("Array of equipment not found");
  }
  res.json(equipment);
});

// Keep the filter route before /:id.
app.get("/api/equipment/filter", (req, res) => {
  // TODO: Return equipment matching the category query.
  const { category } = req.query;
  const filtered = equipment.filter((item) => item.category === category);
  if (!category) {
    return res.status(400).json({ error: "Category not found" });
  } // Category check

  res.json(filtered);
});

app.get("/api/equipment/:id", (req, res) => {
  // TODO: Return the equipment at this array index.
  const index = parseInt(req.params.id);
  const found = equipment[index];

  if (!found) {
    return res.status(404).json({ error: "Equipment not found" });
  } // Checking if the index id is valid, if it is not valid, return error.

  res.json(found);
});

app.post("/api/equipment", (req, res) => {
  // TODO: Add an equipment item to the array.
  const newEquipment = req.body;
  if (!newEquipment || !newEquipment.name || !newEquipment.category || !newEquipment.brand || !newEquipment.year || !newEquipment.quantity) {
    return res.status(400).json({ error: "Invalid equipment data" });
  } // Error handling that checks fields for missing data. If missing, return error.
  equipment.push(newEquipment);
  res.json(newEquipment);
});

app.put("/api/equipment/:id", (req, res) => {
  // TODO: Update the equipment at this array index.
  const index = parseInt(req.params.id);
  if (index < 0 || index >= equipment.length) {
    return res.status(404).json({ error: "Equipment not found" });
  } //Checking if the index id is valid, if it is not valid, return error.
  const putEquipment = req.body;
  equipment[index] = putEquipment;
  res.json(putEquipment);
});

app.delete("/api/equipment/:id", (req, res) => {
  // TODO: Remove the equipment at this array index.
  const index = parseInt(req.params.id);
  if (index < 0 || index >= equipment.length) {
    return res.status(404).json({ error: "Equipment not found" });
  } //Checking if the index id is valid, if it is not valid, return error.
  const deletedEquipment = equipment.splice(index, 1);
  res.json(deletedEquipment[0]);
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, "127.0.0.1", (err) => {
  if (err) {
    console.error(`Cannot start on port ${PORT}: ${err.message}`);
    process.exitCode = 1;
    return;
  }
  console.log(`Server is running on http://localhost:${PORT}`);
});
