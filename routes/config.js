const express = require('express');
const { Configuration } = require('../models');

const router = express.Router();

// Create configuration
router.post('/create_configuration', async (req, res) => {
  try {
    const { country_code, requirements } = req.body;
    const config = await Configuration.create({ country_code, requirements });
    res.status(201).json(config);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// Get configuration
router.get('/get_configuration/:country_code', async (req, res) => {
  try {
    const config = await Configuration.findOne({ where: { country_code: req.params.country_code } });
    if (!config) {
      return res.status(404).json({ error: 'Configuration not found' });
    }
    res.status(200).json(config);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// Update configuration
router.post('/update_configuration/:country_code', async (req, res) => {
  try {
    const { country_code } = req.params;
    const { requirements } = req.body;
    const config = await Configuration.findOne({ where: { country_code } });
    if (!config) {
      return res.status(404).json({ error: 'Configuration not found' });
    }
    config.requirements = requirements;
    await config.save();
    res.status(200).json(config);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// Delete configuration
router.delete('/delete_configuration/:country_code', async (req, res) => {
  try {
    const { country_code } = req.params;
    const config = await Configuration.findOne({ where: { country_code } });
    if (!config) {
      return res.status(404).json({ error: 'Configuration not found' });
    }
    await config.destroy();
    res.status(200).json({ message: 'Configuration deleted successfully' });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

module.exports = router;
