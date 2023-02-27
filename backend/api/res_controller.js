import restaurantsDAO from "./dao/restaurantsDAO.js";

export default class resCtrl
{
    static async apiGetRes(req,res,next)
    {
        const perpage = req.query.perpage ? parseInt(req.query.perpage,10): 20;
        const page = req.query.page ? parseInt(req.query.page,10) : 0;

        let filters = {}
        if(req.query.cuisine)
        {
            filters.cuisine = req.query.cuisine
        }
        else if(req.query.zipcode)
        {
            filters.zipcode = req.query.zipcode
        }
        else if(req.query.name)
        {
            filters.name = req.query.name
        }

        const {restaurantsList, totalNumRestaurants} = await restaurantsDAO.getRestaurants(
            {
                filters,
                page,
                perpage,
            }
        )
            
        let response = 
        {
            restaurants: restaurantsList,
            page: page,
            filters, filters,
            perpage : perpage,
            total: totalNumRestaurants,
        }

        res.json(response)
    }
    
    static async apiGetRes_id(req,res,next)
    {
        try
        {
            let id = req.params.id || {};
            let restaurants = await restaurantsDAO.getRestaurants_id(id);
            if(!restaurants)
            {
                res.status(404).json({error:"not found"});
                return;
            }
            res.json(restaurants);
        }
        catch(e)
        {
            res.status(500).json({error:e.message});
        }
    }
    static async apiGetRes_cuisine(req,res,next)
    {
        try
        {
            let cuisines = await restaurantsDAO.getCuisines();
            res.json(cuisines);
        }
        catch(e)
        {
            res.status(500).json({error:e.message});
        }
    }
}