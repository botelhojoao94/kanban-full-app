import { connectToDatabase } from '../../../database/dbConnection'
import jwt from "jsonwebtoken"
import bcrypt from "bcrypt"

export default async function checkUser(req, res) {

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
            const match = await bcrypt.compare(req.body.password, user.password)
            if (match) {
                response.error = false
                response.msg = 'connected'
                response.username = user.name
                response.email = user.email
                response.id = user._id
                response.token = jwt.sign({
                    exp: Math.floor(Date.now() / 1000) + (60 * 60), //1h
                    subject: user._id,
                    email: user.email
                }, process.env.SECRET_JWT_KEY)
            }
            else {
                response.error = true
                response.msg = 'bad_credentials'
            }
            return res.json(response)
        } else {
            response.error = true
            response.msg = 'bad_credentials'
            return res.json(response);
        }

    } catch (error) {
        // return the error
        response.error = true
        response.msg = new Error(error).message
        return res.json(response);
    }
}