const notes = require('express').Router();
// const notesData = require('../db/db.json');
const { v4: uuidv4 } = require('uuid');
const fs = require('fs');
const util = require('util');
const { timeStamp } = require('console');
const { json } = require('express');
const readFromFile = util.promisify(fs.readFile);

notes.get('/', (req, res) => {
    readFromFile('./db/db.json').then((data) => res.json(JSON.parse(data)));
});

notes.get('/:id', (req, res) => {
    const noteId = req.params.id;
    // fs.readFile('./db/db.json', 'utf8', (err, data) => {
    //     if (err) throw err;
    // })

    readFromFile('./db/db.json')
    .then((data) => JSON.parse(data))
    .then((json) => {
      const result = json.filter((note) => note.id === noteId);
      return result.length > 0
        ? res.json(result)
        : res.json('No note with that ID');
    });
});

notes.delete('/:id', (req, res) => {
    const noteId = req.params.id;
    readFromFile('./db/db.json')
        .then((data) => JSON.parse(data))
        .then((json) => {
            const result = json.filter((note) => note.id !== noteId);
            fs.writeFile('./db/db.json', JSON.stringify(result,null,4), (err) =>
            err ? console.error(err) : console.info(`\nData written to database`));
            res.json(`Item ${noteId} has been deleted`);
        })
})

notes.post('/', (req, res) => {
    console.log(req.body);

    const { title, text } = req.body;

    if (req.body) {

        const newNote = {
            id: uuidv4(),
            title,
            text,
        };

        fs.readFile("./db/db.json", "utf8", (err, data) => {
            if (err) throw err;
            const noteData = JSON.parse(data);
            // console.log(noteData);
            noteData.push(newNote);
            fs.writeFile("./db/db.json", JSON.stringify(noteData,null,4), err => {
            err ? console.error(err) : console.log("Note added to the file");
            })
            
        })
    } else {
        res.error('Error in adding note')
    }

});

module.exports = notes;