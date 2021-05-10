const router = require('express').Router()
const studentController = require('../controller/studentsController')

router.get('/',studentController.getAllStudent)
router.get('/:id',studentController.getStudent)
router.get('/search/:cin',studentController.searchStudent)
router.post('/',studentController.addStudent)
router.delete('/:id',studentController.deleteStudent)
router.put('/:id',studentController.updateStudent)

module.exports = router