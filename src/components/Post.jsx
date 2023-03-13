import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { COMMENT_ROUTE, LIKE_ROUTE, PHOTOS_ROUTE } from "../constants";
import { useAuthContext } from "../hooks/useAuthContext";
import Comment from "./Comment";
import { FcLike } from "react-icons/fc";
import { BsFillSendFill } from "react-icons/bs";
import { AiOutlineEdit, AiTwotoneDelete } from "react-icons/ai";

function Post() {
  const navigate = useNavigate();
  const { id } = useParams();
  const { user } = useAuthContext();
  const [post, setPost] = useState();
  const [comments, setComments] = useState([]);
  const [likes, setLikes] = useState(0);
  const [comment, setComment] = useState("");

  useEffect(() => {
    async function fetchPost() {
      const response = await fetch(PHOTOS_ROUTE + `/${id}`);
      const json = await response.json();
      if (response.ok) {
        setPost(json);
        setComments(json.comments.reverse());
        setLikes(json.likes.length);
      }
    }
    fetchPost();
  }, [id]);

  async function handleDelete() {
    const response = await fetch(PHOTOS_ROUTE + `/${id}`, {
      method: "DELETE",
      headers: { Authorization: `Bearer ${user.token}` },
    });
    const json = await response.json();

    console.log(json);
    navigate("/");
  }
  async function handleEdit() {
    navigate(`/posts/${id}/edit`);
  }
  async function handleLike() {
    const response = await fetch(LIKE_ROUTE + `/${id}`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${user.token}`,
      },
    });
    const json = await response.json();
    console.log(json);
    setLikes(likes + 1);
  }
  async function handleComment() {
    let body = JSON.stringify({ text: comment });
    const response = await fetch(COMMENT_ROUTE + `/${id}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${user.token}`,
      },
      body,
    });
    let json = await response.json();
    json.author = {
      name: user.name,
      _id: user.id,
    };

    setComments([json, ...comments]);
    setComment("");
  }
  async function delComment() {}
  return (
    <div
      style={{
        height: "90vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      {post && (
        <div
          className="post-container"
          style={{
            display: "flex",
            border: "1px solid gray",
            borderRadius: "1rem",
            padding: "50px",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <div
            style={{
              padding: "5px",
              margin: "10px auto",
              paddingRight: "50px",
              borderRight: "1px solid black",
            }}
          >
            <img
              src={post.url}
              style={{
                maxWidth: "400px",
                borderRadius: "1rem",
                marginBottom: "1rem",
              }}
              alt={post.caption}
            ></img>

            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                width: "20vw",
              }}
            >
              <p>{post.author.name} </p>
              <div
                style={{
                  width: "10vw",
                  display: "flex",
                  justifyContent: "space-around",
                }}
              >
                {user && (
                  <button onClick={handleLike} style={{ display: "flex" }}>
                    <FcLike />
                    &nbsp;
                    <p>({likes}) </p>
                  </button>
                )}

                {user && user.id === post.author._id && (
                  <>
                    <button onClick={handleEdit}>
                      <AiOutlineEdit />
                    </button>
                    <button onClick={handleDelete}>
                      <AiTwotoneDelete />
                    </button>
                  </>
                )}
              </div>
            </div>
            <hr style={{ color: "gray", margin: "5px 0" }} />
            <p>{post.caption}</p>
          </div>
          <div
            className="comments"
            style={{
              margin: "10px auto",
              paddingLeft: "50px",
              display: "flex",
              height: "28rem",
              flexDirection: "column",
              padding: "20px",

              overflowY: "auto",
            }}
          >
            <h4 style={{ alignSelf: "flex-start", marginTop: "5px" }}>
              Comments ({comments.length})
            </h4>
            {user && (
              <div
                className="add-comment"
                style={{
                  marginBottom: "10px",
                  display: "flex",
                  alignItems: "center",
                }}
              >
                <input
                  type="text"
                  style={{ width: "18rem", marginRight: "0.5rem" }}
                  value={comment}
                  onChange={(e) => setComment(e.target.value)}
                />
                <button
                  style={{
                    cursor: "pointer",
                    paddign: "5px",
                  }}
                  onClick={handleComment}
                >
                  <BsFillSendFill />
                </button>
              </div>
            )}
            {comments.map((comment) => (
              <Comment
                key={comment._id}
                comment={comment}
                delComment={delComment}
              />
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

export default Post;
