const db = require('../models')
const { QueryTypes,Sequelize } = require('sequelize');
const Op = Sequelize.Op;

class modulesController {
    getAllModules(req, res) {
        db.Module.findAll()
        .then(result => {
            res.status(200).send(result)
        })
        .catch(err => console.log(err))
    }

    addModule(req, res) {
        const { module_name, coefficient } = req.body
        db.Module.create({
            module_name,
            coefficient
        })
            .then(result => {
                res.status(200).send(result)
            })
            .catch(err => console.log(err))

    }

    getModule(req,res){
        const id = req.params.id
        db.Module.findByPk(id)
        .then(result => {
            res.status(200).send(result)
        })
        .catch(err => console.log(err))
    }

    // search with name 
    
    searchModule(req,res){
        const name = req.params.name
        console.log(name);
        // return
        db.Module.findAll({
            where: {
                module_name: {
                    [Op.like]: '%'+name+'%'
                }
            }
        })
        .then(result => {
            res.status(200).send(result)
        })
        .catch(err => console.log(err))
    }

     // delete Module 

     deleteModule(req, res) {
        const id = req.params.id
        db.Module.destroy({
            where: { id }
        })
            .then(result => {
                res.status(201).send('Module deleted')
            })
            .catch(err => console.log(err))
    }


    // update Module 

    async updateModule(req, res) {
        const id = parseInt(req.params.id)
        const {module_name,coefficient} = req.body
        parseFloat(coefficient)
        try {
            const module = await db.Module.findOne({ where: { id } })
            if (module) {
                db.Module.update(
                    {
                        module_name,
                        coefficient
                    },
                    { where: { id } }
                )
                    
                    .then(result => {
                        res.status(200).send(result)
                    })
                    .catch(err => console.log(err))
            }else{
                res.status(404).send('Module not found')
            }
        } catch (error) {
            console.log(error);
        }

    }

}

module.exports = new modulesController()