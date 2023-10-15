const Router = require('express');
const path = require('path');

const { getRotationFolderName, isGameTypeWithRotations } = require('../utils/funcs');
const { allTimeFolderName, resultsPath } = require('../utils/consts');

const router = new Router();

function getPlayerFileName(name) {
  return `${name}.json`;
}

const otherPlayersStatisticsFolderName = 'other_players_statistics';

router.get('/:game_type/other_players_statistics/:player_name', (req, res) => {
  const filePath = isGameTypeWithRotations(req.params.game_type)
    ? path.join(
        resultsPath,
        req.params.game_type,
        allTimeFolderName,
        otherPlayersStatisticsFolderName,
        getPlayerFileName(req.params.player_name),
      )
    : path.join(
        resultsPath,
        req.params.game_type,
        otherPlayersStatisticsFolderName,
        getPlayerFileName(req.params.player_name),
      );

  res.sendFile(filePath);
});

router.get(
  '/:game_type/other_players_statistics/:player_name/rotation/:rotation_number',
  (req, res) => {
    res.sendFile(
      path.join(
        resultsPath,
        req.params.game_type,
        getRotationFolderName(req.params.rotation_number),
        otherPlayersStatisticsFolderName,
        getPlayerFileName(req.params.player_name),
      ),
    );
  },
);

const weaponStatisticsFoldername = 'weapons_statistics';

router.get('/:game_type/weapons_statistics/:player_name', (req, res) => {
  const filePath = isGameTypeWithRotations(req.params.game_type)
    ? path.join(
        resultsPath,
        req.params.game_type,
        allTimeFolderName,
        weaponStatisticsFoldername,
        getPlayerFileName(req.params.player_name),
      )
    : path.join(
        resultsPath,
        req.params.game_type,
        weaponStatisticsFoldername,
        getPlayerFileName(req.params.player_name),
      );

  res.sendFile(filePath);
});

router.get('/:game_type/weapons_statistics/:player_name/rotation/:rotation_number', (req, res) => {
  res.sendFile(
    path.join(
      resultsPath,
      req.params.game_type,
      getRotationFolderName(req.params.rotation_number),
      weaponStatisticsFoldername,
      getPlayerFileName(req.params.player_name),
    ),
  );
});

const weeksStatisticsFolderName = 'weeks_statistics';

router.get('/:game_type/weeks_statistics/:player_name', (req, res) => {
  const filePath = isGameTypeWithRotations(req.params.game_type)
    ? path.join(
        resultsPath,
        req.params.game_type,
        allTimeFolderName,
        weeksStatisticsFolderName,
        getPlayerFileName(req.params.player_name),
      )
    : path.join(
        resultsPath,
        req.params.game_type,
        weeksStatisticsFolderName,
        getPlayerFileName(req.params.player_name),
      );

  res.sendFile(filePath);
});

router.get('/:game_type/weeks_statistics/:player_name/rotation/:rotation_number', (req, res) => {
  res.sendFile(
    path.join(
      resultsPath,
      req.params.game_type,
      getRotationFolderName(req.params.rotation_number),
      weeksStatisticsFolderName,
      getPlayerFileName(req.params.player_name),
    ),
  );
});

module.exports = router;
