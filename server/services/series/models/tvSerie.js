const db = require("../config/config.js")
const TV = db.collection('TV_Series')
const { ObjectId } = require("mongodb")

class TV_Series {
    static find(){
        return TV.find().toArray()
    }

    static findById(id){
        return TV.findOne({_id: ObjectId(id)})
    }
    static create(newTV){
        return TV.insertOne(newTV)
    }
    static update(id, updatedData){
        return TV.findOneAndUpdate({
            _id: ObjectId(id)}, {
                $set : updatedData
            }, {
                returnOriginal: false
            })
    }
    static remove(id){
        return TV.deleteOne({_id: ObjectId(id)})

    }
}


module.exports = TV_Series