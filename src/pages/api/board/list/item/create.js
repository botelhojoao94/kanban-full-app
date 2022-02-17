import { ObjectId } from 'mongodb';
import { connectToDatabase } from '../../../../../database/dbConnection'

export default async function createItem(req, res) {

    let response = {}

    try {
        let { db } = await connectToDatabase();
        let collection = db.collection('board')
        await collection.updateOne( {"_id": ObjectId(req.body.board_id), "lists": {$elemMatch: {"_id": ObjectId(req.body.list_id)}}}, {$push: {"lists.$.items": {"_id": ObjectId(), "title": "Novo cartão", "description": "", color: ""}}})
        response.error = false
        response.msg = 'created'
        return res.json(response)
    } catch (error) {
        response.error = true
        response.msg = new Error(error).message
        return res.json(response)
    }
}