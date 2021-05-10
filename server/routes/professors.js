const router = require('express').Router()
const profController = require('../controller/professorsController')

router.get('/',profController.getAllProf)
router.get('/:id',profController.getProf)
router.get('/search/:matricule',profController.searchProf)
router.post('/',profController.addProf)
router.delete('/:id',profController.deleteProf)
router.put('/:id',profController.updateProf)

module.exports = router