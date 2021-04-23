const fs = require("fs");
const path = require("path");
const notesArray = require("../db/db.json");
const router = require("express").Router();
//const mylogic = require("../db/mylogicalfile.js");
//https://stackoverflow.com/questions/23327010/how-to-generate-unique-id-with-node-js
const { v4: uuidv4 } = require("uuid");
const { json } = require("express");

router.get("/api/notes", (req, res) => {
  res.json(notesArray);
});
// Add new notes
router.post("/api/notes", (req, res) => {
  //move to logic file. call in here
  const file = path.join(__dirname, "../db/db.json");
  const newNote = req.body;

  newNote.id = uuidv4();
  notesArray.push(newNote);

  updateDb();

  fs.writeFile(file, json.stringify(notesArray, null, 4), (err) => {
    if (err) throw err;
    console.log("Note saved");

    return json.parse(newNote);
  });
  //keep this
  res.send(newNote);
});
// delete notes
router.delete("/api/notes/:id", (req, res) => {
  //move to logic file. call in here
  const id = req.params.id;
  const file = path.join(__dirname, "../db/db.json");

  updateDb();
  console.log("Deleted note with id " + req.params.id);
});
var your_uuid = uuidv4();
console.log(your_uuid);

//https://stackoverflow.com/questions/23327010/how-to-generate-unique-id-with-node-js

module.exports = router;
