import express from 'express';
import WorkOrder from '../models/WorkOrders.js';
import Asset from '../models/Assets.js';
import { Op } from 'sequelize';

const router = express.Router();

/**
 * @route   GET /
 * @desc    Get all work orders
 * @access  Public
 */
router.get('/', async (req,res) => {
  console.log('\ngot hit all\n');
     try {
    const workOrders = await WorkOrder.findAll({
      attributes: { exclude: [] } 
    });
    console.log("all work orders",workOrders);
    res.json({
      status: 'success',
      data: workOrders
    });
  } catch (err) {
    console.error('Query error:', err);
    res.status(500).json({
      status: 'error',
      message: 'Failed to fetch work orders',
      error: process.env.NODE_ENV === 'development' ? err.message : undefined
    });
  }
})

/**
 * @route   GET /stats
 * @desc    Get dashboard KPI statistics
 * @access  Public
 */
router.get('/stats', async (req, res) => {
  try {
    const now = new Date();
    const startOfMonth = new Date(now.getFullYear(), now.getMonth(), 1, 0, 0, 0, 0);
    const endOfMonth = new Date(now.getFullYear(), now.getMonth() + 1, 0, 23, 59, 59, 999);

    const [totalAssets, openWorkOrders, completedThisMonth, scheduledPM] = await Promise.all([
      Asset.count(),
      WorkOrder.count({
        where: {
          status: { [Op.in]: ['Open', 'In Progress', 'Pending'] }
        }
      }),
      WorkOrder.count({
        where: {
          status: 'Completed',
          updatedAt: { [Op.between]: [startOfMonth, endOfMonth] }
        }
      }),
      WorkOrder.count({
        where: {
          type: 'Preventive',
          status: { [Op.in]: ['Open', 'In Progress', 'Pending'] }
        }
      })
    ]);

    res.json({
      status: 'success',
      data: { totalAssets, openWorkOrders, completedThisMonth, scheduledPM }
    });
  } catch (err) {
    console.error('Query error (stats):', err);
    res.status(500).json({
      status: 'error',
      message: 'Failed to fetch KPI stats',
      error: process.env.NODE_ENV === 'development' ? err.message : undefined
    });
  }
});

/**
 * @route   GET /recent
 * @desc    Get recent work orders
 * @access  Public
 */

router.get('/recent', async (req,res) => {
  console.log('\ngot hit recent\n');
  
  try {
    const workOrders = await WorkOrder.findAll({
      limit: 5,
      order: [['createdAt',   'DESC']],
      attributes: { exclude: [] },
      raw: true
    });
    // console.log("recent work orders",workOrders);
    res.json({
      status: 'success',
      data: workOrders
    });
  } catch (err) {
    console.error('Query error:', err);
    res.status(500).json({
      status: 'error',
      message: 'Failed to fetch work orders',
      error: process.env.NODE_ENV === 'development' ? err.message : undefined
    });
  }
})

/**
 * @route   GET /:id
 * @desc    Get a specific work order by id
 * @access  Public
 * @params  id (integer) - The id of the work order to get
 */

router.get('/:id', async (req,res) => {
  console.log('\ngot hit specific\n');
     try {
    const workOrders = await WorkOrder.findOne({
      where: {
        id: req.params.id
      },
      attributes: { exclude: [] } 
    });
    res.json({
      status: 'success',
      data: workOrders
    });
  } catch (err) {
    console.error('Query error:', err);
    res.status(500).json({
      status: 'error',
      message: 'Failed to fetch work order',
      error: process.env.NODE_ENV === 'development' ? err.message : undefined
    });
  }
})

/**
 * @route   GET /:id/maintenance
 * @desc    Get maintenance history for a specific asset
 * @access  Public
 * @params  id (integer) - The id of the asset to get maintenance history for
 */
router.get('/:id/maintenance', async (req,res) => {
  console.log('\ngot hit maintenance\n');
     try {
    const workOrders = await WorkOrder.findAll({
      where: {
        assetId: req.params.id
      },
      attributes: { exclude: [] } 
    });
    res.json({
      status: 'success',
      data: workOrders
    });
  } catch (err) {
    console.error('Query error:', err);
    res.status(500).json({
      status: 'error',
      message: 'Failed to fetch work orders',
      error: process.env.NODE_ENV === 'development' ? err.message : undefined
    });
  }
})

/**
 * @route   POST /
 * @desc    Create a new work order
 * @access  Public
 * @body    workOrder (object) - The work order to create
 */
router.post('/', async (req,res) => {
  console.log('\ngot hit create\n');
     try {
    const workOrders = await WorkOrder.create(req.body);
    res.json({
      status: 'success',
      data: workOrders
    });
  } catch (err) {
    console.error('Query error:', err);
    res.status(500).json({
      status: 'error',
      message: 'Failed to create work order',
      error: process.env.NODE_ENV === 'development' ? err.message : undefined
    });
  }
})

/**
 * @route   PUT /:id
 * @desc    Update a specific work order by id
 * @access  Public
 * @params  id (integer) - The id of the work order to update
 * @body    workOrder (object) - The work order to update
 */
router.put('/:id', async (req,res) => {
  console.log('\ngot hit update\n');
     try {
    const workOrders = await WorkOrder.update(req.body, {
      where: {
        id: req.params.id
      }
    });
    res.json({
      status: 'success',
      data: workOrders
    });
  } catch (err) {
    console.error('Query error:', err);
    res.status(500).json({
      status: 'error',
      message: 'Failed to update work order',
      error: process.env.NODE_ENV === 'development' ? err.message : undefined
    });
  }
})

/**
 * @route   DELETE /:id
 * @desc    Delete a specific work order by id
 * @access  Public
 * @params  id (integer) - The id of the work order to delete
 */
router.delete('/:id', async (req,res) => {
  console.log('\ngot hit delete\n');
     try {
    const workOrders = await WorkOrder.destroy({
      where: {
        id: req.params.id
      }
    });
    res.json({
      status: 'success',
      data: workOrders
    });
  } catch (err) {
    console.error('Query error:', err);
    res.status(500).json({
      status: 'error',
      message: 'Failed to delete work order',
      error: process.env.NODE_ENV === 'development' ? err.message : undefined
    });
  }
})


export default router;