const db = require('../models')
const { QueryTypes,Sequelize } = require('sequelize');
const Op = Sequelize.Op;

class professorController {

    // get all Prof 

    getAllProf(req, res) {
        const sql = "SELECT  profs.*, modules.module_name FROM profs INNER JOIN modules ON profs.moduleId = modules.id"
        db.sequelize.query(sql,{ type: Sequelize.QueryTypes.SELECT } )
            .then(result => {
                res.status(200).send(result)
            })
            .catch(err => console.log(err))
    }

    // get One Prof 
    getProf(req,res){
        const id = req.params.id
        db.Prof.findByPk(id)
        .then(result => {
            res.status(200).send(result)
        })
        .catch(err => console.log(err))
    }

    // search with matricule 
    
    searchProf(req,res){
        const matricule = req.params.matricule
        db.Prof.findAll({
            where: {
                matricule: {
                    [Op.like]: '%'+matricule+'%'
                }
            }
        })
        .then(result => {
            res.status(200).send(result)
        })
        .catch(err => console.log(err))
    }

    // creat Prof 

    addProf(req, res) {
        const { name, matricule, date_inscription, ModuleId } = req.body
        db.Prof.create({
            name,
            matricule,
            date_inscription,
            ModuleId

        })
            .then(result => {
                res.status(200).send(result)
            })
            .catch(err => console.log(err))

    }

    // delete Prof 

    deleteProf(req, res) {
        const id = req.params.id
        db.Prof.destroy({
            where: { id }
        })
            .then(result => {
                res.status(201).send('prof deleted')
            })
            .catch(err => console.log(err))
    }

    // update Prof 

    async updateProf(req, res) {
        const id = req.params.id
        const {name,ModuleId} = req.body
        try {
            const prof = await db.Prof.findOne({ where: { id } })
            if (prof) {
                console.log(prof);
                db.Prof.update(
                    {
                        name,
                        ModuleId
                    },
                    { where: { id } }
                )
                    
                    .then(result => {
                        res.status(200).send(result)
                    })
                    .catch(err => console.log(err))
            }else{
                res.status(404).send('Prof not found')
            }
        } catch (error) {
            console.log(error);
        }

    }
}

module.exports = new professorController()