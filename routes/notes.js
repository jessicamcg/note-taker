const notes = require('express').Router();
const noteData = require('../db/db.json')
const fs = require('fs');


notes.get('/', (req, res) => res.json(noteData));

notes.post('/notes', (req, res) => {
    console.log(req.body);
  

    fs.readFile("./db/db.json", "utf8", (err, data) => {
        if (err) throw err;
        const noteData = JSON.parse(data);
        // console.log(noteData);
        noteData.push(newNote);
        fs.writeFile("./db/db.json", JSON.stringify(noteData,null,4), err => {
          console.log("added to the file");
        })
  
    })

});

module.exports = notes;