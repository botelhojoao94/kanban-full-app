import { connectToDatabase } from '../../../database/dbConnection'
import { ObjectId } from 'mongodb';

export default async function addSharedBoard (req, res) {

    let response = {}

    try {
        let { db } = await connectToDatabase();
        let collection = db.collection('users')
        let user = await collection
            .findOne({ "email": req.body.email })
        if (user != null) {
            collection = db.collection('board')
            const result = await collection.updateOne({ "_id": ObjectId(req.body.board_id) }, { $addToSet: { "invited_emails": req.body.email } })
            if (result.modifiedCount != 1) {
                response.error = true
                response.msg = 'email_already_added'
            } else {
                response.error = false
                response.msg = 'email_added'
            }
        }
        else {
            response.error = false
            response.msg = 'not_a_valid_email'
        }
        return res.json(response)
    }
    catch (error) {
        response.error = true
        response.msg = new Error(error).message
        return res.json(response);
    }
}