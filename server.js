const express = require('express');

const app = express();
app.use(express.json());

let todos = [];

app.get('/todos', (req, res) => {
  res.send(todos);
});

app.put('/todos', (req, res) => {
  todos = req.body;

  res.send({success: true});
});

app.listen(8081, () => console.log('Listening on port 8081'));
