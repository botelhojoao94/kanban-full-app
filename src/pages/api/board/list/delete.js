import { ObjectId } from 'mongodb';
import { connectToDatabase } from '../../../../database/dbConnection'

export default async function createList(req, res) {

    let response = {}

    try {
        // db connection
        let { db } = await connectToDatabase();
        // select collection
        let collection = db.collection('board')
        // wait for update
        await collection.updateOne({ "_id": ObjectId(req.body.board_id) }, { $pull: { lists: { "_id": ObjectId(req.body.list_id) } } })
        response.error = false
        response.msg = 'deleted'
        return res.json(response)
    } catch (error) {
        // return the error
        response.error = true
        response.msg = new Error(error).message
        return res.json(response)
    }
}