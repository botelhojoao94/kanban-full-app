import { ObjectId } from 'mongodb'
import bcrypt from 'bcrypt'
import { connectToDatabase } from '../../../database/dbConnection'

export default async function changePassword(req, res) {

    console.log(req.body)

    let response = {}

    try {
        let { db } = await connectToDatabase();
        let collection = db.collection('users')
        const hash = bcrypt.hashSync(req.body.new_password, 10);
        await collection.updateOne({ "_id": ObjectId(req.body.user_id) }, { $set: { password: hash } })
        response.error = false
        response.msg = 'password_changed'
        return res.json(response)
    }

    catch (error) {
        response.error = true
        response.msg = new Error(error).message
        return res.json(response);
    }
}