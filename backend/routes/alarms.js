const express = require('express');
const Alarm = require('../models/Alarm');
const authMiddleware = require('../middleware/auth');
const router = express.Router();

// Log Alarm
router.post('/log', authMiddleware, async (req, res) => {
  try {
    const { alarmTime, stepsWalked, waterDropsVerified, mode, status } = req.body;

    const alarm = new Alarm({
      userId: req.user.userId,
      alarmTime,
      stepsWalked: stepsWalked || 0,
      waterDropsVerified: waterDropsVerified || false,
      mode: mode || 'free',
      status: status || 'dismissed',
      dismissedAt: status === 'dismissed' ? new Date() : null
    });

    await alarm.save();

    res.status(201).json({
      message: 'Alarm logged successfully',
      status: true,
      alarm: {
        id: alarm._id,
        alarmTime: alarm.alarmTime,
        stepsWalked: alarm.stepsWalked,
        mode: alarm.mode
      }
    });
  } catch (error) {
    res.status(500).json({
      message: 'Failed to log alarm',
      status: false,
      error: error.message
    });
  }
});

// Get Alarm History
router.get('/history', authMiddleware, async (req, res) => {
  try {
    const { days = 30 } = req.query;
    const startDate = new Date(Date.now() - days * 24 * 60 * 60 * 1000);

    const alarms = await Alarm.find({
      userId: req.user.userId,
      createdAt: { $gte: startDate }
    }).sort({ createdAt: -1 });

    res.json({
      message: 'Alarm history retrieved',
      status: true,
      count: alarms.length,
      alarms: alarms.map(alarm => ({
        id: alarm._id,
        alarmTime: alarm.alarmTime,
        stepsWalked: alarm.stepsWalked,
        waterDropsVerified: alarm.waterDropsVerified,
        mode: alarm.mode,
        status: alarm.status,
        createdAt: alarm.createdAt
      }))
    });
  } catch (error) {
    res.status(500).json({
      message: 'Failed to fetch alarm history',
      status: false,
      error: error.message
    });
  }
});

// Get User Statistics
router.get('/stats', authMiddleware, async (req, res) => {
  try {
    const stats = await Alarm.aggregate([
      { $match: { userId: require('mongoose').Types.ObjectId(req.user.userId) } },
      {
        $group: {
          _id: null,
          totalAlarms: { $sum: 1 },
          dismissedAlarms: {
            $sum: { $cond: [{ $eq: ['$status', 'dismissed'] }, 1, 0] }
          },
          totalSteps: { $sum: '$stepsWalked' },
          waterVerifiedCount: {
            $sum: { $cond: ['$waterDropsVerified', 1, 0] }
          },
          premiumUsage: {
            $sum: { $cond: [{ $eq: ['$mode', 'premium'] }, 1, 0] }
          }
        }
      }
    ]);

    const data = stats[0] || {
      totalAlarms: 0,
      dismissedAlarms: 0,
      totalSteps: 0,
      waterVerifiedCount: 0,
      premiumUsage: 0
    };

    res.json({
      message: 'Statistics retrieved',
      status: true,
      statistics: {
        totalAlarms: data.totalAlarms,
        dismissedAlarms: data.dismissedAlarms,
        dismissalRate: data.totalAlarms > 0 
          ? ((data.dismissedAlarms / data.totalAlarms) * 100).toFixed(2) + '%'
          : '0%',
        totalSteps: data.totalSteps,
        averageSteps: data.totalAlarms > 0 
          ? (data.totalSteps / data.totalAlarms).toFixed(2)
          : 0,
        waterVerifiedCount: data.waterVerifiedCount,
        premiumUsageCount: data.premiumUsage
      }
    });
  } catch (error) {
    res.status(500).json({
      message: 'Failed to fetch statistics',
      status: false,
      error: error.message
    });
  }
});

module.exports = router;
