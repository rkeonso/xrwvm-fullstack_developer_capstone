import React, { useState, useEffect } from 'react';
import { getDealers } from "../../services/api"; 

import "./Dealers.css";
import "../assets/style.css";
import Header from '../Header/Header';
import review_icon from "../assets/reviewicon.png"

const Dealers = () => {
  const [dealersList, setDealersList] = useState([]);
  // let [state, setState] = useState("")
  let [states, setStates] = useState([]);

  // let root_url = window.location.origin
  // let dealer_url = "http://127.0.0.1:8000/djangoapp/dealers/";
  let dealer_url_by_state = "http://127.0.0.1:8000/djangoapp/dealers/";
 
  const filterDealers = async (state) => {
    const res = await fetch(dealer_url_by_state, {
      method: "GET"
    });
    const retobj = await res.json();
    if(retobj.status === 200) {
      let state_dealers = Array.from(retobj.dealers)
      setDealersList(state_dealers)
    }
  }

const get_dealers = async () => {
  const data = await getDealers();
  console.log("API RESPONSE:", data);
  if (data.status === 200) {
    let all_dealers = Array.from(data.dealers);
    console.log("DEALERS:", all_dealers);
    let states = [];
    all_dealers.forEach((dealer) => {
      states.push(dealer.state);
    });
    setStates(Array.from(new Set(states)));
    setDealersList(all_dealers);
  }
};
useEffect(() => {
  get_dealers();
}, []);


let isLoggedIn = sessionStorage.getItem("username") != null ? true : false;
return (
  <div>
    <Header/>

    <table className="table">
      <thead>
        <tr>
          <th>ID</th>
          <th>Dealer Name</th>
          <th>City</th>
          <th>Address</th>
          <th>Zip</th>
          <th>
            <select name="state" id="state" onChange={(e) => filterDealers(e.target.value)}>
              <option value="" disabled hidden></option>
              <option value="All">All States</option>
              {states.map((state) => (
                <option key={state} value={state}>{state}</option>
              ))}
            </select>
          </th>
          {isLoggedIn ? <th>Review Dealer</th> : null}
        </tr>
      </thead>

      <tbody>
        {dealersList.map((dealer) => (
          <tr key={dealer.id}>
            <td>{dealer.id}</td>
            <td>
              <a href={`/dealer/${dealer.id}`}>{dealer.full_name}</a>
            </td>
            <td>{dealer.city}</td>
            <td>{dealer.address}</td>
            <td>{dealer.zip}</td>
            <td>{dealer.state}</td>

            {isLoggedIn ? (
              <td>
                <a href={`/postreview/${dealer.id}`}>
                  <img src={review_icon} className="review_icon" alt="Post Review"/>
                </a>
              </td>
            ) : null}
          </tr>
        ))}
      </tbody>
    </table>
  </div>
);
}

export default Dealers;