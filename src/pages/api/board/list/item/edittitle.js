import { connectToDatabase } from '../../../../../database/dbConnection'
import { ObjectId } from 'mongodb';

export default async function editTitle(req, res) {

    let response = {}
    console.log(req.body)

    try {
        // db connection
        let { db } = await connectToDatabase();
        // select collection
        let collection = db.collection('board')
        const resposta = await collection.updateOne( {"_id": ObjectId(req.body.board_id), "lists[].items": {$elemMatch: {"_id": ObjectId(req.body.item_id)}}}, {$set: {"lists.items.$.title": req.body.new_title}})
        console.log(resposta)
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