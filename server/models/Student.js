module.exports = (sequelize, DataTypes) => {

    const Student = sequelize.define('Student', {

        name: {
            type: DataTypes.STRING,
            allowNull: false
        },
        cin: {
            type: DataTypes.STRING,
            allowNull: false
        },
        date_naissance: {
            type: DataTypes.DATE,
            allowNull: false
        },
        filiere: {
            type: DataTypes.STRING,
            allowNull: false
        },
        niveau: {
            type: DataTypes.STRING,
            allowNull: false
        }
    })
    
    Student.associate = models=>{
        Student.belongsTo(models.Module,{
            foreignKey:{
                allowNull:false
            }
        })
      }
    return Student
}