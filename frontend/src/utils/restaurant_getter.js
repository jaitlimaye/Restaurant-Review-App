import axios from "axios";

const baseURL = "http://localhost:5000/api/v1/restaurants";
class Restaurantdata
{
    
    getAll(page = 0)
    {
        return axios.get(baseURL +`?page=${page}`);
    }

    get(id)
    {
        return axios.get(baseURL +`/id/${id}`);
    }

    find(query,by= "name",page = 0)
    {
        return axios.get(baseURL + `?${by}=${query}&page=${page}`);
    }

    createReview(data)
    {
        return axios.post(baseURL + '/reviews',data);
    }

    updateReview(data)
    {
        console.log(data)
        return axios.put(baseURL + "/reviews",data)
    }

    deleteReview(data)
    {
        console.log(data)
        return axios.delete(baseURL +`/reviews`,{data});
    }

    getCuisines(id)
    {
        return axios.get(baseURL +`/cuisines`);
    }
    
}

export default new Restaurantdata();