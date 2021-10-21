const notes = require('express').Router();
const noteData = require('../db/db.json')
const fs = require('fs');


notes.get('/', (req, res) => res.json(noteData));

notes.post('/', (req, res) => {
    console.log(req.body);

    const { title, text } = req.body;

    if (req.body) {

        const newNote = {
            title,
            text,
        };

        fs.readFile("./db/db.json", "utf8", (err, data) => {
            if (err) throw err;
            const noteData = JSON.parse(data);
            // console.log(noteData);
            noteData.push(newNote);
            fs.writeFile("./db/db.json", JSON.stringify(noteData,null,4), err => {
            console.log("Note added to the file");
            })
        })
    } else {
        res.error('Error in adding note')
    }

});

module.exports = notes;