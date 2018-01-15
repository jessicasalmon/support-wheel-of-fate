const pool = require('../build/db_connect');

const updateEngineers = (engineer, callback) => {
  const query = `INSERT INTO engineers (
    name,
    shifts_worked
  )
  VALUES
  ($1,$2),
  ($3,$4),
  ($5,$6),
  ($7,$8),
  ($9,$10),
  ($11,$12),
  ($13,$14),
  ($15,$16),
  ($17,$18),
  ($19,$20)
  ON CONFLICT (name) DO UPDATE SET shifts_worked = EXCLUDED.shifts_worked`;


  const params = [
    engineer[0].name,
    engineer[0].shifts_worked,
    engineer[1].name,
    engineer[1].shifts_worked,
    engineer[2].name,
    engineer[2].shifts_worked,
    engineer[3].name,
    engineer[3].shifts_worked,
    engineer[4].name,
    engineer[4].shifts_worked,
    engineer[5].name,
    engineer[5].shifts_worked,
    engineer[6].name,
    engineer[6].shifts_worked,
    engineer[7].name,
    engineer[7].shifts_worked,
    engineer[8].name,
    engineer[8].shifts_worked,
    engineer[9].name,
    engineer[9].shifts_worked,
  ];

  pool.query(query, params, (err, res) => {
    if(err) {
      return callback(err);
    }
    else {
      return callback(null, res);
    }
  })
};

module.exports = updateEngineers;
