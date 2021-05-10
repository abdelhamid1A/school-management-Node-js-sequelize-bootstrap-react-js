const db = require('../models')
const { QueryTypes,Sequelize } = require('sequelize');
const Op = Sequelize.Op;

class studentController{
    getAllStudent(req,res){
        const sql = "SELECT  students.*, modules.module_name FROM students INNER JOIN modules ON students.moduleId = modules.id"
        db.sequelize.query(sql,{ type: Sequelize.QueryTypes.SELECT } )
            .then(result => {
                res.status(200).send(result)
            })
            .catch(err => console.log(err))
    }

    // creat Student 

    addStudent(req, res) {
        const { name, cin, date_naissance, filiere ,niveau, ModuleId } = req.body
        db.Student.create({
            name,
            cin,
            date_naissance,
            filiere,
            niveau,
            ModuleId

        })
            .then(result => {
                res.status(200).send(result)
            })
            .catch(err => console.log(err))

    }

     // get One Student 
     getStudent(req,res){
        const id = req.params.id
        db.Student.findByPk(id)
        .then(result => {
            res.status(200).send(result)
        })
        .catch(err => console.log(err))
    }

    // search with CIN 
    
    searchStudent(req,res){
        const cin = req.params.cin
        db.Student.findAll({
            where: {
                cin: {
                    [Op.like]: '%'+cin+'%'
                }
            }
        })
        .then(result => {
            res.status(200).send(result)
        })
        .catch(err => console.log(err))
    }

    // delete Student 

    deleteStudent(req, res) {
        const id = req.params.id
        db.Student.destroy({
            where: { id }
        })
            .then(result => {
                res.status(201).send('Student deleted')
            })
            .catch(err => console.log(err))
    }

    // update Student 

    async updateStudent(req, res) {
        const id = req.params.id
        const {name,ModuleId,niveau,filiere} = req.body
        try {
            const Student = await db.Student.findOne({ where: { id } })
            if (Student) {
                console.log(Student);
                db.Student.update(
                    {
                        name,
                        ModuleId,
                        filiere,
                        niveau
                    },
                    { where: { id } }
                )
                    
                    .then(result => {
                        res.status(200).send(result)
                    })
                    .catch(err => console.log(err))
            }else{
                res.status(404).send('Student not found')
            }
        } catch (error) {
            console.log(error);
        }

    }
}

module.exports = new studentController()