import React from "react";
import { Link } from "react-router-dom";
function Card({ post }) {
  return (
    <div style={{ alignSelf: "center", margin: "0.3rem" }}>
      <Link to={`posts/${post._id}`}>
        <img
          src={post.url}
          style={{
            maxWidth: "300px",
            borderRadius: "1rem",
          }}
          alt={post.caption}
        ></img>
      </Link>
    </div>
  );
}

export default Card;
