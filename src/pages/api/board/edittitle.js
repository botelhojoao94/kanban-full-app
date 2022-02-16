import { connectToDatabase } from '../../../database/dbConnection'
import { ObjectId } from 'mongodb';

export default async function editTitle(req, res) {

    let response = {}

    try {
        console.log(req.body)
        // db connection
        let { db } = await connectToDatabase();
        // select collection
        let collection = db.collection('board')
        await collection.updateOne({"_id": ObjectId(req.body.board_id)}, {$set: {"name": req.body.new_title}})
        response.error = false
        response.msg = 'modified'
        return res.json(response)

    } catch (error) {
        // return the error
        response.error = true
        response.msg = new Error(error).message
        return res.json(response)
    }
}