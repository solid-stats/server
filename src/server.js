const express = require('express');
const os = require('os');
const path = require('path');

const app = express();

const listsPath = path.join('sg_stats', 'lists');

app.get('/maces_list', (req, res) => {
  res.sendFile(path.join(listsPath, 'mace_list.html'), { root: os.homedir() });
});

app.get('/mission_makers_list', (req, res) => {
  res.sendFile(path.join(listsPath, 'mission_makers_list.html'), { root: os.homedir() });
});

app.listen(7001);
