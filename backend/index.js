import app from "./server.js"
import mongodb from "mongodb"
import dotenv from "dotenv"
import restaurantsDAO from "./api/dao/restaurantsDAO.js"
import reviewsDAO from "./api/dao/reviewsDAO.js"

dotenv.config()

const Mongodb_Client = mongodb.MongoClient;

const port = process.env.PORT || 8000;

Mongodb_Client.connect(
    process.env.REV_DB_URI,
    {
        maxpoolSize: 50,
        wtimeoutMS: 250,
        useNewUrlParser: true
    }
    
).catch(err => {
    console.error(err.stack)
    process.exit(1)
})
.then(async client => {
    await restaurantsDAO.injectDB(client);
    await reviewsDAO.injectDB(client);
    app.listen(port,() => {
        console.log(`listening on port ${port}`)
    }
    )
})
