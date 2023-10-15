const Router = require('express');
const path = require('path');

const { getRotationFolderName } = require('../utils/funcs');
const { allTimeFolderName, resultsPath } = require('../utils/consts');

const router = new Router();

const playersGlobalStatisticsFileName = 'global_statistics.json';
const squadsGlobalStatisticsFileName = 'squad_statistics.json';

router.get('/players/:game_type', (req, res) => {
  res.sendFile(
    path.join(
      resultsPath,
      req.params.game_type,
      allTimeFolderName,
      playersGlobalStatisticsFileName,
    ),
  );
});

router.get('/players/:game_type/rotation/:rotation_number', (req, res) => {
  res.sendFile(
    path.join(
      resultsPath,
      req.params.game_type,
      getRotationFolderName(req.params.rotation_number),
      playersGlobalStatisticsFileName,
    ),
  );
});

router.get('/squads/:game_type', (req, res) => {
  res.sendFile(
    path.join(resultsPath, req.params.game_type, allTimeFolderName, squadsGlobalStatisticsFileName),
  );
});

router.get('/squads/:game_type/rotation/:rotation_number', (req, res) => {
  res.sendFile(
    path.join(
      resultsPath,
      req.params.game_type,
      getRotationFolderName(req.params.rotation_number),
      squadsGlobalStatisticsFileName,
    ),
  );
});

module.exports = router;
