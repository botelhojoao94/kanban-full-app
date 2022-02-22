import { connectToDatabase } from '../../../database/dbConnection'
import { ObjectId } from 'mongodb';

export default async function editTitleBoard(req, res) {

    let response = {}

    try {
        let { db } = await connectToDatabase();
        let collection = db.collection('board')
        await collection.updateOne({"_id": ObjectId(req.body.board_id)}, {$set: {"name": req.body.new_title || "Título"}})
        response.error = false
        response.msg = 'modified'
        return res.json(response)

    } catch (error) {
        response.error = true
        response.msg = new Error(error).message
        return res.json(response)
    }
}