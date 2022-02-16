import MongoDB, { ObjectId } from 'mongodb'
import { connectToDatabase } from '../../../../database/dbConnection'

export default async function findMine(req, res) {
    try {
        const email = `${req.query.email}`
        // db connection
        let { db } = await connectToDatabase();
        // select collection
        let collection = db.collection('board')
        // fetch data
        let data = await collection
            .find({ "invited_emails": email }).project({ "_id": 1, "name": 1 }).toArray()
        // return the board
        return res.json({
            boards: data,
            success: true,
        });
    } catch (error) {
        // return the error
        return res.json({
            message: new Error(error).message,
            success: false,
        });
    }
}