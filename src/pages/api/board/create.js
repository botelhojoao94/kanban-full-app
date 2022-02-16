import { connectToDatabase } from '../../../database/dbConnection'
import bcrypt from 'bcrypt'

export default async function createBoard(req, res) {

    let response = {}

    try {
        // db connection
        let { db } = await connectToDatabase();
        // select collection
        let collection = db.collection('board')
        const result = await collection.insertOne({
            "name": req.body.name,
            "owner_email": req.body.email,
            "invited_emails": [],
            "lists": []
        })
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