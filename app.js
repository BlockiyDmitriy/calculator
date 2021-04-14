const PORT = process.env.PORT || 8081;

const express = require("express");
const OperationDao = require('./src/OperationDao');

const app = express();

app.use(express.static(__dirname + "/client/build"));

const dao = new OperationDao();

app.get('/api/history/all', async function(req, res) {
    res.send(await dao.getAll());
});

// Parse URL-encoded bodies (as sent by HTML forms)
app.use(express.urlencoded());

// Parse JSON bodies (as sent by API clients)
app.use(express.json());


app.post('/api/history', function(req, res) {
    if(req.body == undefined || req.body.operation == undefined) return res.sendStatus(400);
    const operation = req.body.operation;
    try {
        dao.create(operation);
    } catch (e) {
        res.sendStatus(500);
        res.send();
        return;
    }
    res.sendStatus(201);
    res.send();
});
// АЛО!?
app.listen(PORT);