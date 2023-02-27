import React, {useState} from 'react'
import { Link, useParams, useLocation} from 'react-router-dom'
import RestaurantData from '../utils/restaurant_getter'

const AddReview = ({user}) => {
  const location = useLocation();
  const params = useParams();
  let initialReviewState = ""
  let editing = false;
  
  if (location.state && location.state.currentReview) {
    editing = true;
    initialReviewState = location.state.currentReview.text
  }
  else{console.log(location)}
  const [review, setReview] = useState(initialReviewState);
  const [submitted, setSubmitted] = useState(false);
  
  const handleInputChange = (event) => {
    setReview(event.target.value);
  };

  const saveReview = (event) => {
    var data = {
      text: review,
      name: user.name,
      user_id: user.id,
      ID: params.id
    };

    if (editing) {
      data.review_id = location.state.currentReview._id
      console.log(data.review_id)
      RestaurantData.updateReview(data)
        .then(response => {
          setSubmitted(true);
          console.log(response.data);
        })
        .catch(e => {
          console.log(e);
        });
    }
    else
    {
      console.log(data)
      RestaurantData.createReview(data)
      .then(response => {
        setSubmitted(true);
        console.log(response.data);
      })
      .catch(e => {
        console.log(e);
      });
    }
  };
  
  return (
    <div>
     
     
      {user.loggedin ? (
      <div className="submit-form">
        {submitted ? (<div>
            <h4>You submitted successfully!</h4>
            <Link to={"/restaurants/" + params.id} className="btn btn-success">
              Back to Restaurant
            </Link>
          </div>) :
        (<div>
            <div className="form-group">
              <label htmlFor="description">{ editing ? "Edit" : "Create" } Review</label>
              <input
                type="text"
                className="form-control"
                id="text"
                required
                value={review}
                onChange={handleInputChange}
                name="text"
              />
            </div>
             <button onClick={saveReview} className="btn btn-success">
             Submit
           </button>
         </div>)}
      </div>): (
      <div>
        Please log in.
      </div>
      )} 
    </div>
    
  )
}

export default AddReview