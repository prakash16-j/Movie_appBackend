const express = require('express')
const router = express.Router()
const movieCtrl = require('../controllers/movieController')
const { authenticate, requireRole } = require('../middlewares/auth');


router.get('/', movieCtrl.getAll)
router.get('/sorted', movieCtrl.getSorted)
router.get('/search', movieCtrl.search)

router.post('/', authenticate, requireRole('admin'), movieCtrl.create)
router.put('/:id', authenticate, requireRole('admin'), movieCtrl.update)
router.delete('/:id', authenticate, requireRole('admin'), movieCtrl.remove)

module.exports = router
