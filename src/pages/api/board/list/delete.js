import { ObjectId } from 'mongodb';
import { connectToDatabase } from '../../../../database/dbConnection'

export default async function deleteItem(req, res) {

    let response = {}

    try {
        let { db } = await connectToDatabase();
        let collection = db.collection('board')
        await collection.updateOne({ "_id": ObjectId(req.body.board_id) }, { $pull: { lists: { "_id": ObjectId(req.body.list_id) } } })
        response.error = false
        response.msg = 'deleted'
        return res.json(response)
    } catch (error) {
        response.error = true
        response.msg = new Error(error).message
        return res.json(response)
    }
}