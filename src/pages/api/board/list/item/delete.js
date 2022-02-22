import { connectToDatabase } from '../../../../../database/dbConnection'
import { ObjectId } from 'mongodb'

export default async function deleteItem(req, res) {

    let response = {}

    try {
        let { db } = await connectToDatabase();
        let collection = db.collection('board')
        const resposta = await collection.updateOne(
            { "_id": ObjectId(req.body.board_id) },
            { $pull: { "lists.$[outer].items": { "_id": ObjectId(req.body.item_id) } } },
            { arrayFilters: [{ "outer._id": ObjectId(req.body.list_id) }] }
        )
        response.error = false
        response.msg = 'modified'
        return res.json(response)

    } catch (error) {
        response.error = true
        response.msg = new Error(error).message
        return res.json(response)
    }
}