module.exports = (sequelize, DataTypes) => {

    const Prof = sequelize.define('Prof', {

        name: {
            type: DataTypes.STRING,
            allowNull: false
        },
        matricule: {
            type: DataTypes.STRING,
            allowNull: false
        },
        date_inscription: {
            type: DataTypes.DATE,
            allowNull: false
        }
    })
    
    Prof.associate = models=>{
        Prof.belongsTo(models.Module,
            {
            foreignKey:'ModuleId'
        })
      }
    return Prof
}