import express from 'express';
import Asset from '../models/Assets.js';
const router = express.Router();

/**
 * @route   GET /
 * @desc    Get all assets
 * @access  Public
 */

router.get('/', async (req,res) => {
     try {
    const assets = await Asset.findAll({
      attributes: { exclude: [] } 
    });
    res.json({
      status: 'success',
      data: assets
    });
  } catch (err) {
    console.error('Query error:', err);
    res.status(500).json({
      status: 'error',
      message: 'Failed to fetch assets',
      error: process.env.NODE_ENV === 'development' ? err.message : undefined
    });
  }
})


/**
 * @route   GET /:id
 * @desc    Get a specific asset by id
 * @access  Public
 * @params  id (integer) - The id of the asset to get
 */
router.get('/:id', async (req,res) => {
     try {
    const asset = await Asset.findByPk(req.params.id);
    res.json({
      status: 'success',
      data: asset
    });
  } catch (err) {
    console.error('Query error:', err);
    res.status(500).json({
      status: 'error',
      message: 'Failed to fetch asset',
      error: process.env.NODE_ENV === 'development' ? err.message : undefined
    });
  }
})

/**
 * @route   POST /
 * @desc    Create a new asset
 * @access  Public
 * @body    { name (string), description (string), location (string), status (string) }
 */
router.post('/', async (req,res) => {
     try {
    const asset = await Asset.create(req.body);
    res.json({
      status: 'success',
      data: asset
    });
  } catch (err) {
    console.error('Query error:', err);
    res.status(500).json({
      status: 'error',
      message: 'Failed to create asset',
      error: process.env.NODE_ENV === 'development' ? err.message : undefined
    });
  }
})

/**
 * @route   PUT /:id
 * @desc    Update an asset by id
 * @access  Public
 * @params  id (integer) - The id of the asset to update
 * @body    { name (string), description (string), location (string), status (string) }
 */
router.put('/:id', async (req,res) => {
     try {
    const asset = await Asset.update(req.body, {
      where: {
        id: req.params.id
      }
    });
    res.json({
      status: 'success',
      data: asset
    });
  } catch (err) {
    console.error('Query error:', err);
    res.status(500).json({
      status: 'error',
      message: 'Failed to update asset',
      error: process.env.NODE_ENV === 'development' ? err.message : undefined
    });
  }
})

/**
 * @route DELETE /:id
 * @desc Delete an asset by id
 * @access Public
 * @params id (integer) - The id of the asset to delete
 */
router.delete('/:id', async (req,res) => {
     try {
    const asset = await Asset.destroy({
      where: {
        id: req.params.id
      }
    });
    res.json({
      status: 'success',
      data: asset
    });
  } catch (err) {
    console.error('Query error:', err);
    res.status(500).json({
      status: 'error',
      message: 'Failed to delete asset',
      error: process.env.NODE_ENV === 'development' ? err.message : undefined
    });
  }
})

/**
 * @route PATCH /:id
 * @desc Update an asset by id
 * @access Public
 * @params id (integer) - The id of the asset to update
 * @body { name (string), description (string), location (string), status (string) }
 */
router.patch('/:id', async (req,res) => {
     try {
    const asset = await Asset.update(req.body, {
      where: {
        id: req.params.id
      }
    });
    res.json({
      status: 'success',
      data: asset
    });
  } catch (err) {
    console.error('Query error:', err);
    res.status(500).json({
      status: 'error',
      message: 'Failed to update asset',
      error: process.env.NODE_ENV === 'development' ? err.message : undefined
    });
  }
})

export default router;