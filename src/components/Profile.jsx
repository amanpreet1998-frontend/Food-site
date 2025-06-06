import React, { useEffect, useState } from "react";
import { auth, db } from "../firebase/firebaseConfig";
import { doc, getDoc } from "firebase/firestore";
import '../components/style/Login.css';
import { Link, useNavigate } from "react-router-dom";
import cross_icon from '../assets/cross_icon.png';

function Profile() {

  const navigate = useNavigate();

  const [userDetails, setUserDetails] = useState(null);
  const fetchUserData = async () => {
    auth.onAuthStateChanged(async (user) => {
      console.log(user);

      const docRef = doc(db, "Users", user.uid);
      const docSnap = await getDoc(docRef);
      if (docSnap.exists()) {
        setUserDetails(docSnap.data());
        console.log(docSnap.data());
      } else {
        console.log("User is not logged in");
      }
    });
  };
  useEffect(() => {
    fetchUserData();
  }, []);

  async function handleLogout() {
    try {
      await auth.signOut();
      window.location.href = "/login";
      console.log("User logged out successfully!");
    } catch (error) {
      console.error("Error logging out:", error.message);
    }
  }
  return (
    <div className="login">
      <div className="login-container">
        <div className="login-title">
          <img onClick={() => navigate('/')} src={cross_icon} alt='' />
        </div>
        {userDetails ? (
          <>

            <div className=" mt-5" style={{ display: "flex", justifyContent: "center", margin: "50px" }}>
              <img src={userDetails.photo}
                width={"40%"}
                style={{ borderRadius: "50%" }}
              />
            </div>
            <h3 className="login-title">Welcome {userDetails.firstName} 🙏🙏</h3>
            <div>
              <p>Email: {userDetails.email}</p>
              <p>First Name: {userDetails.firstName}</p>

            </div>
            <button className="btn btn-primary" onClick={handleLogout}>
              Logout
            </button>
          </>
        ) : (
          <p>Loading...</p>
        )}
      </div>
    </div>
  );
}
export default Profile;