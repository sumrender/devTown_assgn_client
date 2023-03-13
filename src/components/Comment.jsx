import { useAuthContext } from "../hooks/useAuthContext";

export default function Comment({ comment, delComment }) {
  const {user} = useAuthContext();
  return (
    <div
      style={{
        margin: "5px",
        borderBottom: "1px solid gray",
        width: "20vw",
        display: "flex",
        justifyContent: "space-between",
        padding: "5px 10px",
      }}
    >
      <p>{comment.author.name}</p>
      <p>{comment.text}</p>
      <span>
        {user.id === comment.author._id && (
          <button onClick={delComment}>del</button>
        )}
      </span>
    </div>
  );
}
