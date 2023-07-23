const { PlanUserNames } = require("../db.js")

const dataUserPlan_function = async (req, res) => {
        const { userId } = req.params;
    try {
        const dataUserPlan = await PlanUserNames.findOne({
            where: {SportsInstitutionID : userId}
        })
        
        res.status(200).send(dataUserPlan)
    } catch (error) {
        res.status(404).send({msg: "an error has occurred in the database"}, error)
    }

}


module.exports = {dataUserPlan_function}