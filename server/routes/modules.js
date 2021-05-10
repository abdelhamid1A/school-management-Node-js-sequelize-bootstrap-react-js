const router = require('express').Router()
const modulesController = require('../controller/modulesController')

router.get('/',modulesController.getAllModules)
router.post('/',modulesController.addModule)
router.get('/:id',modulesController.getModule)
router.get('/search/:name',modulesController.searchModule)
router.delete('/:id',modulesController.deleteModule)
router.put('/:id',modulesController.updateModule)

module.exports = router