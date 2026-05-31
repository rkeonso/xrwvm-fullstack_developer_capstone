import React, { useState, useEffect } from 'react';
import { addReview } from "../../services/api";
import { useParams } from 'react-router-dom';
import "./Dealers.css";
import "../assets/style.css";
import Header from '../Header/Header';

const PostReview = () => {
  const [dealer, setDealer] = useState({});
  const [review, setReview] = useState("");
  const [reviews, setReviews] = useState([]);
  const [model, setModel] = useState("");
  const [year, setYear] = useState("");
  const [date, setDate] = useState("");
  const [carmodels, setCarmodels] = useState([]);

  let root_url = "http://127.0.0.1:8000/";
  let params = useParams();
  let id =params.id;
  let dealer_url = "http://127.0.0.1:8000/djangoapp/dealer/" + id;
  let review_url = "http://127.0.0.1:8000/djangoapp/add_review";
  let carmodels_url = "http://127.0.0.1:8000/djangoapp/get_cars";


  const postreview = async ()=>{
    console.log("POST REVIEW CLICKED");
    let name = sessionStorage.getItem("firstname")+" "+sessionStorage.getItem("lastname");
    //If the first and second name are stores as null, use the username
    if(name.includes("null")) {
      name = sessionStorage.getItem("username");
    }
    if(review === "" || date === "" || year === "" || model === "") {
      alert("All details are mandatory")
      return;
    }

    let make_chosen = model.split(" ")[0];
    let model_chosen = model.split(" ").slice(1).join(" ");

    let jsoninput = JSON.stringify({
      "name": name,
      "dealership": id,
      "review": review,
      "purchase": true,
      "purchase_date": date,
      "car_make": make_chosen,
      "car_model": model_chosen,
      "car_year": year,
    });
    console.log("ABOUT TO POST:", jsoninput);
    //console.log(jsoninput);
    const res = await fetch(review_url, {
      method: "POST",
      headers: {
          "Content-Type": "application/json",
      },
      body: jsoninput,
  });

  const json = await res.json();
  if (res.status === 200) {
    window.location.href = "/dealer/" + id;
}

  }
  const get_reviews = async () => {
    const res = await fetch("http://127.0.0.1:8000/djangoapp/get_dealer_reviews/" + id);
    const data = await res.json();

    console.log("REVIEWS:", data);
    setReviews(data.reviews);
  };

  const get_dealer = async ()=>{
    const res = await fetch(dealer_url, {
      method: "GET"
    });
    const retobj = await res.json();

    if (retobj.status === 200) {
      setDealer(retobj.dealer);
    }
  };

 const get_cars = async () => {
  const res = await fetch(carmodels_url, {
    method: "GET"
  });

  const retobj = await res.json();

  console.log("RET OBJ:", retobj);
  console.log("CAR MODELS:", retobj.CarModels);

  setCarmodels(retobj.CarModels);
}

useEffect(() => {
  get_dealer();
  get_cars();
  get_reviews();
}, []);

  return (
    <div>
      <Header/>
      <div  style={{margin:"5%"}}>
      <h1 style={{color:"darkblue"}}>{dealer.full_name}</h1>
      <textarea id='review' cols='50' rows='7' onChange={(e) => setReview(e.target.value)}></textarea>
      <div className='input_field'>
      Purchase Date <input type="date" onChange={(e) => setDate(e.target.value)}/>
      </div>
    
      <div className='input_field'>
      Car Make 
      <select
        name="cars"
        id="cars"
        value = {model}
        onChange={(e) => setModel(e.target.value)}
    >
      <option value="">
        Choose Car Make and Model
      </option>

      {carmodels.map((carmodel, index) => (
        <option
          key={index}
          value={carmodel.CarMake + " " + carmodel.CarModel}
        >
          {carmodel.CarMake} {carmodel.CarModel}
        </option>
      ))}
    </select>  
      </div >

      <div className='input_field'>
      Car Year <input type="number" onChange={(e) => setYear(e.target.value)} max={2023} min={2015}/>
      </div>
      <div>
      </div>
      <div>
      <button className='postreview' onClick={postreview}>Post Review</button>
      </div>
      <div style={{marginTop: "2em"}}>
        <h3>Reviews</h3>
        {reviews.map((r, index) => (
          <div key={index}>
            <p>{r.review}</p>
            </div>
        ))}
    </div>
  </div>
</div>
  )
}
export default PostReview
