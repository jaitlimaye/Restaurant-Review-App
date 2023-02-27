import mongodb from "mongodb"
const ObjectId = mongodb.ObjectId;

let restaurants

export default class restaurantsDAO {
    static async injectDB(conn)
    {
        if(restaurants)
        {
            return
        }
        try{
            restaurants = await conn.db(process.env.REV_NS).collection("restaurants")
        }catch(err)
        {
            console.error(
                `Unable to establish a collection handle in /api/dao/restaurantsDAO.js: ${err}`,
            )
        }
    }

    static async getRestaurants({
        filters=null,page=0,perpage = 20,
    } = {})
    {
        let query;
        if(filters)
        {
            if("name" in filters)
            {
                query = {$text: {$search: filters["name"]}}
            }
            else if("cuisine" in filters)
            {
                query = {"cuisine": {$eq: filters["cuisine"]}}
            }
            else if("zipcode" in filters)
            {
                query = {"address.zipcode": {$eq: filters["zipcode"]}}
            }
        }

        let cursor;

        try
        {
            cursor= await restaurants.find(query)
        }
        catch(err)
        {
            console.error(`Unable to issue find command, ${err}`)
            return{restaurantsList: [], totalNumRestaurants: 0}
        }

        let displayCursor = cursor.limit(perpage).skip(perpage * page);

        try
        {
            const restaurantsList = await displayCursor.toArray();
            const totalNumRestaurants = await restaurants.countDocuments(query);
            return {restaurantsList, totalNumRestaurants};
        }
        catch(err)
        {
            console.error(`Unable to convert cursor to array or problem counting documents, ${err}`);
            return {restaurantsList: [],totalNumRestaurants: 0}
        }
    }

    static async getRestaurants_id(id)
    {
        try
        {
            const pipeline = [
                { 
                    $match:
                    {
                        _id : new ObjectId(id),
                    },
                },
                {
                    $lookup:
                    {
                        from: "reviews",
                        let:
                        {
                            id : "$_id",
                        },
                        pipeline:
                        [
                            {
                                $match:
                                {
                                    $expr:
                                    {
                                        $eq:["$restaurant_id","$$id"],
                                    },
                                },
                            },
                            {
                                $sort:
                                {
                                    date: -1,
                                },
                            },
                        ],
                        as: "reviews",
                    },
                },
                {
                    $addFields:
                    {
                        reviews : "$reviews",
                    },
                },
            ]

            return await restaurants.aggregate(pipeline).next();
        }
        catch(e)
        {
            console.error(`Something went wrong in getting restaurants by id: ${e}`);
            throw e;
        }
    }

    static async getCuisines()
    {
        let cuisines = [];
        try
        {
            cuisines = await restaurants.distinct("cuisine");
            return cuisines;
        }
        catch(e)
        {
            console.error(`Unable to get cuisines: ${e}`);
            throw e;

        }
    }
}

