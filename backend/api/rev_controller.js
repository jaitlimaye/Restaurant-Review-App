import { text } from "express";
import reviewsDAO from "./dao/reviewsDAO.js";

export default class revCtrl
{
    static async apiGetRev(req,res,next)
    {
        try
        {
            const ID = req.body.ID;
            const rev = req.body.text;
            const userInfo =
            {
                name : req.body.name,
                _id : req.body.user_id
            }
            const date = new Date();
            const RevRes = await reviewsDAO.addRev(ID,rev,userInfo,date);
            res.json({status : "success"})
        }  
        catch(e)
        {
            res.status(500).json({error:e.message});
        }
    }

    static async apiPutRev(req,res,next)
    {
        try
        {
            const ID = req.body.review_id;
            const rev = req.body.text;
            const date = new Date();

            const RevRes = await reviewsDAO.updateRev(ID,req.body.user_id,rev,date);

            var {error} = RevRes;
            if(error)
            {
                res.status(400).json({error});
            }

            if(RevRes.modified_count === 0)
            {
                throw new Error("unable to update review - user may not be original poster")
            }

            res.json({status : "success"})
        }  
        catch(e)
        {
            res.status(500).json({error:e.message});
        }
    }

    static async apiDelRev(req,res,next)
    {
        try
        {
            const revID = req.body.id;
            const userID = req.body.user_id;
            console.log(revID);
            const RevRes = await reviewsDAO.deleteRev(revID,userID)

            res.json({status:"success"});
        }
        catch(e)
        {
            res.status(500).json({error:e.message});
        }
    }
}