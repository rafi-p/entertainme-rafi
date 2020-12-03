const db = require("../config/config.js")
const Movie = db.collection('Movies')
const { ObjectId } = require("mongodb")

class MovieModel {
    static find(){
        return Movie.find().toArray()
    }

    static findById(id){
        return Movie.findOne({_id: ObjectId(id)})
    }
    static create(newMovie){
        return Movie.insertOne(newMovie)
    }
    static update(id, updatedData){
        return Movie.findOneAndUpdate({
            _id: ObjectId(id)}, {
                $set : updatedData
            }, {
                returnOriginal: false
            })
    }
    static remove(id){
        return Movie.deleteOne({_id: ObjectId(id)})

    }
}


module.exports = MovieModel