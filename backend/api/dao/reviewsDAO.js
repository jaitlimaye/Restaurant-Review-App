import mongodb from "mongodb"
const ObjectId = mongodb.ObjectId;

let reviews;

export default class reviewsDAO
{
    static async injectDB(conn)
    {
        if(reviews)
        {
            return;
        }
        try{
            reviews = await conn.db(process.env.REV_NS).collection("reviews")
        }catch(err)
        {
            console.error(
                `Unable to establish a collection handle in /api/dao/reviewsDAO.js: ${err}`,
            )
        }
    }

    static async addRev(ID,review,user,date)
    {
        try
        {
            const reviewDoc = 
            {
                name : user.name,
                user_id  : user._id,
                text : review,
                restaurant_id : ObjectId(ID),
                date : date
            }

            return await reviews.insertOne(reviewDoc);
        }
        catch(e)
        {
            console.error(`Unable to post review: ${e}`);
            return { error : e};
        }
    }

    static async updateRev(ID,user_id,review,date)
    {
        try
        {
            const updateResponse = await reviews.updateOne({user_id : user_id, _id : ObjectId(ID)},{$set : {text: review,date: date}});
            return updateResponse;
        }
        catch(e)
        {
            console.error(`Unable to update review: ${e}`);
            return { error : e};
        }
    }

    static async deleteRev(reviewID,userID)
    {
        try
        {
            const deleteResponse = await reviews.deleteOne({ _id : ObjectId(reviewID),user_id : userID,});
            return deleteResponse;
        }
        catch(e)
        {
            console.error(`Unable to delete review: ${e}`);
            return { error : e};
        }
    }
}