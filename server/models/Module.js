module.exports = (sequelize, DataTypes) => {

    const Module = sequelize.define('Module', {

        module_name: {
            type: DataTypes.STRING,
            allowNull: false
        },
        coefficient: {
            type: DataTypes.FLOAT,
            allowNull: false
        }
    })


    Module.associate = models => {
        Module.hasMany(models.Student)
    }
    Module.associate = models => {
        Module.hasOne(models.Prof)
    }
    return Module
}