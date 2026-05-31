import React from 'react';
import "../assets/style.css";


const Header = () => {
    const logout = async (e) => {
    e.preventDefault();
    let logout_url = window.location.origin+"/djangoapp/logout";
    const res = await fetch(logout_url, {
      method: "GET",
    });
  
    const json = await res.json();
    if (json) {
      let username = sessionStorage.getItem('username');
      sessionStorage.removeItem('username');
      window.location.href = window.location.origin;
      window.location.reload();
      alert("Logging out "+username+"...")
    }
    else {
      alert("The user could not be logged out.")
    }
  };
    
    let curr_user = sessionStorage.getItem('username');

let home_page_items;

if (curr_user !== null && curr_user !== "") {
  // Logged in view
  home_page_items = (
    <div className="input_panel">
      <span className='username'>{curr_user}</span>
      <a className="nav_item" href="/" onClick={logout}>Logout</a>
    </div>
  );
} else {
  //   NOT logged in view
  home_page_items = (
    <div className="input_panel">
      <a className="nav_item" href="/login">Login</a>
      <a className="nav_item" href="/register" style={{marginLeft: "10px"}}>Register</a>
    </div>
  );
}


    return (
  <nav
    style={{
      backgroundColor: "darkturquoise",
      padding: "15px 30px",
      display: "flex",
      justifyContent: "space-between",
      alignItems: "center"
    }}
  >

    {/* LEFT SIDE */}
    <div style={{ display: "flex", alignItems: "center", gap: "20px" }}>

      <h2
        style={{ cursor: "pointer", margin: 0 }}
        onClick={() => (window.location.href = "/")}
      >
        Dealerships
      </h2>

      <a href="/">Home</a>
      <a href="/about">About Us</a>
      <a href="/contact">Contact Us</a>

    </div>

    {/* RIGHT SIDE */}
    <div>
      {home_page_items}
    </div>

  </nav>
);
}

export default Header;

    