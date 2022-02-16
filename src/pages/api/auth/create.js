import { connectToDatabase } from '../../../database/dbConnection'
import bcrypt from 'bcrypt'

export default async function createUser(req, res) {

    let response = {}

    try {
        // db connection
        let { db } = await connectToDatabase();
        // select collection
        let collection = db.collection('users')
        // fetch data
        let user = await collection
            .findOne({ "email": req.body.email })
        // return the board
        if (user != null) {
            response.error = true
            response.msg = 'email_already_exists'
            return res.json(response)
        } else {
            const hashedPassword = bcrypt.hashSync(req.body.password, 10)
            await collection.insertOne({ "name": req.body.name, "email": req.body.email, "password": hashedPassword, "my_boards": [], "shared_boards": [] })
            response.error = false
            response.msg = 'registered'
            return res.json(response)
        }

    } catch (error) {
        // return the error
        response.error = true
        response.msg = new Error(error).message
        return res.json(response)
    }
}