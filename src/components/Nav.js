import React from "react";

function Nav() {

  const navStyle = {
    margin: "auto",
    fontSize: "40px"
  };
  
  return (
    <ol className="breadcrumb">
      <li style={navStyle} className="breadcrumb-item active">
        Employee Directory
      </li>
    </ol>
  );
}
export default Nav;
