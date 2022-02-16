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
        await collection.updateOne({ "_id": ObjectId(req.body.id) }, { $push: { lists: { "_id": ObjectId(), "title": req.body.title, "items": [] } } })
        response.error = false
        response.msg = 'created'
        return res.json(response)
    } catch (error) {
        // return the error
        response.error = true
        response.msg = new Error(error).message
        return res.json(response)
    }
}