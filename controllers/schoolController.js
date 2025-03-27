const db = require('../config/db');
const {haversine}  = require('../services')
const {SCHOOLTABLE} = require('../constants')

const addSchool = (req, res) => {
  const { name, address, latitude, longitude } = req.body;

  if(!name)
    return res.status(400).json({ error: 'school name required' })

  if(!address)
    return res.status(400).json({ error: 'school address are required' });

  if (latitude == null || longitude == null) 
    return res.status(400).json({ error: 'Latitude and Longitude  are required' });
  
  if (typeof latitude !== 'number' || typeof longitude !== 'number') {
    return res.status(400).json({ error: 'Latitude and longitude must be numbers' });
  }

  const sql = `INSERT INTO ${SCHOOLTABLE} (name, address, latitude, longitude) VALUES (?, ?, ?, ?)`;
  db.query(sql, [name, address, latitude, longitude], (err, result) => {
    if (err) {
      console.error('Error inserting data:', err);
      return res.status(500).json({ error: 'Database error' });
    }
    res.status(201).json({ message: 'School added successfully', schoolId: result.insertId });
  });
};

const listSchools = (req, res) => {
  const { latitude, longitude } = req.query;

  if (!latitude || !longitude) {
    return res.status(400).json({ error: 'Latitude and longitude are required' });
  }

  const userLat = parseFloat(latitude);
  const userLon = parseFloat(longitude);
  if (isNaN(userLat) || isNaN(userLon)) {
    return res.status(400).json({ error: 'Invalid latitude or longitude' });
  }

  db.query(`SELECT id, name, address, latitude, longitude FROM ${SCHOOLTABLE}`, (err, results) => {
    if (err) {
      console.error('Error fetching schools:', err);
      return res.status(500).json({ error: 'Database error' });
    }

    const schools = results.map(school => ({
      ...school,
      distance: haversine(userLat, userLon, school.latitude, school.longitude)
    })).sort((a, b) => a.distance - b.distance);

    res.json(schools);
  });
};


module.exports={addSchool,listSchools}