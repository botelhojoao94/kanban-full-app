import { ObjectId } from 'mongodb';
import { connectToDatabase } from '../../../../database/dbConnection'

export default async function addEmail(req, res) {

    let response = {}

    console.log(req.body)
    try {
        // db connection
        let { db } = await connectToDatabase();
        // select collection
        let collection = db.collection('board')
        await collection.updateOne({"_id": ObjectId(req.body.board_id)}, { $push: { 'invited_emails': req.body.email } })
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