import { connectToDatabase } from '../../../../database/dbConnection'

export default async function myBoard(req, res) {
    try {
        const email = `${req.query.email}`
        let { db } = await connectToDatabase()
        let collection = db.collection('board')
        let data = await collection
            .find({ "owner_email": email }).project({ "_id": 1, "name": 1 }).toArray()
        return res.json({
            boards: data,
            success: true,
        });
    } catch (error) {
        return res.json({
            message: new Error(error).message,
            success: false,
        });
    }
}