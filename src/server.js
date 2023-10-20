const fs = require('fs-extra');
const express = require('express');
const path = require('path');
const cors = require('cors');

const { rootFolderName, listsPath, resultsPath } = require('./utils/consts');

const app = express();

const corsOptions = {
  origin: 'https://solid-stats.web.app/',
};

app.use(cors(corsOptions));

app.get('/maces_list', (req, res) => {
  res.sendFile(path.join(listsPath, 'mace_list.html'));
});

app.get('/mission_makers_list', (req, res) => {
  res.sendFile(path.join(listsPath, 'mission_makers_list.html'));
});

app.get('/parsing_status', async (req, res) => {
  const exists = fs.pathExistsSync(path.join(rootFolderName, 'temp_results'));

  res.json({
    status: exists ? 'parsing' : 'not_parsing',
    update_date: fs.statSync(path.join(resultsPath, 'stats.zip')).birthtime,
  });
});

app.get('/stats_archive', (req, res) => {
  res.sendFile(path.join(resultsPath, 'stats.zip'));
});

app.get('/rotations_info/:game_type', (req, res) => {
  res.sendFile(path.join(resultsPath, req.params.game_type, 'rotations_info.json'));
});

app.use('/global_stats', require('./routes/globalStats'));

app.use('/player_stats', require('./routes/playerStats'));

app.listen(7001);
