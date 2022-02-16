import MongoDB, { ObjectId } from 'mongodb'
import { connectToDatabase } from '../../../../database/dbConnection'

export default async function findOne(req, res) {
    try {
        const id = `${req.query.id}`
        // db connection
        let { db } = await connectToDatabase();
        // select collection
        let collection = db.collection('board')
        // fetch data
        let data = await collection
            .deleteOne({ "_id": ObjectId(id) })
        // return the board
        return res.json({
            message: data,
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