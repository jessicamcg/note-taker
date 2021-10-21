const notes = require('express').Router();



notes.post('/notes', (req, res) => {

  

    fs.readFile("./db/db.json", "utf8", (err, data) => {
        if (err) throw err;
        const bookData = JSON.parse(data);
        // console.log(noteData);
        bookData.push(newNote);
        fs.writeFile("./db/db.json", JSON.stringify(noteData,null,4), err => {
          console.log("added to the file");
        })
  
    })

});