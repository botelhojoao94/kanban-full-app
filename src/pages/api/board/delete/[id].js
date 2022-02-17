import { ObjectId } from 'mongodb'
import { connectToDatabase } from '../../../../database/dbConnection'

export default async function deleteUser(req, res) {
    try {
        const id = `${req.query.id}`
        let { db } = await connectToDatabase();
        let collection = db.collection('board')
        let data = await collection
            .deleteOne({ "_id": ObjectId(id) })
        return res.json({
            message: data,
            success: true,
        });
    } catch (error) {
        return res.json({
            message: new Error(error).message,
            success: false,
        });
    }
}