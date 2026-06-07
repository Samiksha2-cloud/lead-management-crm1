const express = require('express');
const router = express.Router();
const { body, validationResult } = require('express-validator');
const Lead = require('../models/Lead');

// Validation rules
const leadValidation = [
  body('name').notEmpty().withMessage('Name is required').trim(),
  body('email').isEmail().withMessage('Valid email is required').normalizeEmail(),
  body('phone').notEmpty().withMessage('Phone is required').trim(),
  body('company').notEmpty().withMessage('Company is required').trim(),
  body('status')
    .optional()
    .isIn(['New', 'Contacted', 'Qualified', 'Converted', 'Lost'])
    .withMessage('Invalid status value'),
];

const validate = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ success: false, errors: errors.array() });
  }
  next();
};

// GET /api/leads/stats
router.get('/stats', async (req, res) => {
  try {
    const stats = await Lead.aggregate([
      { $group: { _id: '$status', count: { $sum: 1 } } },
    ]);
    const total = await Lead.countDocuments();
    const statusCounts = stats.reduce((acc, item) => {
      acc[item._id] = item.count;
      return acc;
    }, {});

    res.json({
      success: true,
      data: {
        total,
        New: statusCounts.New || 0,
        Contacted: statusCounts.Contacted || 0,
        Qualified: statusCounts.Qualified || 0,
        Converted: statusCounts.Converted || 0,
        Lost: statusCounts.Lost || 0,
      },
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

// GET /api/leads
router.get('/', async (req, res) => {
  try {
    const { search, status, sort = '-createdAt', page = 1, limit = 10 } = req.query;
    const query = {};

    if (search) {
      query.$or = [
        { name: { $regex: search, $options: 'i' } },
        { email: { $regex: search, $options: 'i' } },
        { company: { $regex: search, $options: 'i' } },
      ];
    }

    if (status) query.status = status;

    const pageNum = parseInt(page);
    const limitNum = parseInt(limit);
    const skip = (pageNum - 1) * limitNum;

    const [leads, total] = await Promise.all([
      Lead.find(query).sort(sort).skip(skip).limit(limitNum),
      Lead.countDocuments(query),
    ]);

    res.json({
      success: true,
      data: leads,
      pagination: {
        total,
        page: pageNum,
        limit: limitNum,
        totalPages: Math.ceil(total / limitNum),
      },
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

// GET /api/leads/:id
router.get('/:id', async (req, res) => {
  try {
    const lead = await Lead.findById(req.params.id);
    if (!lead) return res.status(404).json({ success: false, message: 'Lead not found' });
    res.json({ success: true, data: lead });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

// POST /api/leads
router.post('/', leadValidation, validate, async (req, res) => {
  try {
    const { name, email, phone, company, status, notes } = req.body;
    const lead = await Lead.create({ name, email, phone, company, status, notes });
    res.status(201).json({ success: true, data: lead });
  } catch (error) {
    if (error.code === 11000) {
      return res.status(400).json({ success: false, message: 'A lead with this email already exists' });
    }
    res.status(500).json({ success: false, message: error.message });
  }
});

// PUT /api/leads/:id
router.put('/:id', leadValidation, validate, async (req, res) => {
  try {
    const lead = await Lead.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });
    if (!lead) return res.status(404).json({ success: false, message: 'Lead not found' });
    res.json({ success: true, data: lead });
  } catch (error) {
    if (error.code === 11000) {
      return res.status(400).json({ success: false, message: 'A lead with this email already exists' });
    }
    res.status(500).json({ success: false, message: error.message });
  }
});

// DELETE /api/leads/:id
router.delete('/:id', async (req, res) => {
  try {
    const lead = await Lead.findByIdAndDelete(req.params.id);
    if (!lead) return res.status(404).json({ success: false, message: 'Lead not found' });
    res.json({ success: true, message: 'Lead deleted successfully' });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

module.exports = router;