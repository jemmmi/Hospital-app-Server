const express = require('express');
const app = new express();
const fs = require('fs');
const data = require('./dataset.json');
app.use(express.json());

app.get('/hospital', (req, res) => {
    res.send(data);
})

app.post('/hospital', (req, res) => {
    data.push(req.body);
    fs.writeFile('dataset.json', JSON.stringify(data), (err, resp) => {
        if (err) {
            res.send("Data can not be written");
        }
        else {
            res.send("Data written successfully");
        }

    })
})
app.put('/hospital/:name', (req, res) => {
    let name = req.params.name;
    data.forEach((item) => {
        if (item.hospitalName == name) {
            item.hospitalLocation = req.body.hospitalLocation;
            item.patientCount = req.body.patientCount;
        }
    })
    fs.writeFile('dataset.json', JSON.stringify(data), (err, resp) => {
        if (err) {
            res.send("Data can not be  updated");
        }
        else {
            res.send("Data updated successfully");
        }
    })
})
app.delete('/hospital/:name', (req, res) => {
    let name = req.params.name;

    let value = data.filter(item => item.hospitalName !== name);
    fs.writeFile('dataset.json', JSON.stringify(value), (err, resp) => {
        if (err) {
            res.send("Data can not be deleted");

        }
        else {
            res.send("Data deleted");
        }
    })
})
app.listen(3000);
console.log("server listening to port 3000");
