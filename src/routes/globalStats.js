const Router = require('express');
const path = require('path');

const { getRotationFolderName, isGameTypeWithRotations } = require('../utils/funcs');
const { allTimeFolderName, resultsPath } = require('../utils/consts');

const router = new Router();

const playersGlobalStatisticsFileName = 'global_statistics.json';
const squadsGlobalStatisticsFileName = 'squad_statistics.json';
const squadsFullRotationFileName = 'squad_full_rotation_statistics.json';

router.get('/players/:game_type', (req, res) => {
  const filePath = isGameTypeWithRotations(req.params.game_type)
    ? path.join(
        resultsPath,
        req.params.game_type,
        allTimeFolderName,
        playersGlobalStatisticsFileName,
      )
    : path.join(resultsPath, req.params.game_type, playersGlobalStatisticsFileName);

  res.sendFile(filePath);
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
  const filePath = isGameTypeWithRotations(req.params.game_type)
    ? path.join(
        resultsPath,
        req.params.game_type,
        allTimeFolderName,
        squadsGlobalStatisticsFileName,
      )
    : path.join(resultsPath, req.params.game_type, squadsGlobalStatisticsFileName);

  res.sendFile(filePath);
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

router.get('/squads_full_rotation/:game_type/rotation/:rotation_number', (req, res) => {
  res.sendFile(
    path.join(
      resultsPath,
      req.params.game_type,
      getRotationFolderName(req.params.rotation_number),
      squadsFullRotationFileName,
    ),
  );
});

module.exports = router;
