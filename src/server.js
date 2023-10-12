const express = require('express');
const os = require("os");

const app = express();

app.get('/maces_list', (req, res) => {
  res.sendFile('sg-replay-parser/mace_list.html', { root: os.homedir() })
});

app.get('/mission_makers_list', (req, res) => {
  res.sendFile('sg-replay-parser/mission_makers_list.html', { root: os.homedir() })
});

app.listen(7001);
