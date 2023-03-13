import { useEffect } from "react";
import Card from "../components/Card";
import { useAuthContext } from "../hooks/useAuthContext";
import { usePhotosContext } from "../hooks/usePhotosContext";
import { useNavigate } from "react-router-dom";
import { PHOTOS_ROUTE } from "../constants";

const Home = () => {
  const navigate = useNavigate();
  const { photos, dispatch } = usePhotosContext();
  const { user, loading } = useAuthContext();

  useEffect(() => {
    const fetchPhotos = async () => {
      const response = await fetch(PHOTOS_ROUTE, {
        headers: { Authorization: `Bearer ${user.token}` },
      });
      const json = await response.json();

      if (response.ok) {
        dispatch({ type: "SET_PHOTOS", payload: json });
      }
    };

    if (user) {
      fetchPhotos();
    }
  }, [dispatch, user]);

  return (
    <>
      {loading ? (
        <>Loading</>
      ) : (
        <>
          {user ? (
            <div className="home">
              <div
                className="photos"
                style={{
                  margin: "1rem auto",

                  display: "flex",
                  flexWrap: "wrap",
                  justifyContent: "space-around",
                }}
              >
                {photos &&
                  photos.map((post) => <Card key={post._id} post={post} />)}
              </div>
            </div>
          ) : (
            <>send to login{navigate("/login")}</>
          )}
        </>
      )}
    </>
  );
};

export default Home;
