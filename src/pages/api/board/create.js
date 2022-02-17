import { connectToDatabase } from '../../../database/dbConnection'

export default async function createBoard(req, res) {

    let response = {}

    try {
        let { db } = await connectToDatabase();
        let collection = db.collection('board')
        await collection.insertOne({
            "name": req.body.name,
            "owner_email": req.body.email,
            "invited_emails": [],
            "lists": []
        })
        response.error = false
        response.msg = 'created'
        return res.json(response)

    } catch (error) {
        response.error = true
        response.msg = new Error(error).message
        return res.json(response)
    }
}