import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useUser,SignIn } from "@clerk/clerk-react";

function Signin() {
    const navigate = useNavigate();
    const { isSignedIn } = useUser();
    useEffect(() => {
    if (isSignedIn) {
      navigate("/profile"); // ✅ Redirect to profile when signed in
    }
  }, [isSignedIn, navigate]);
  return (
    <div
      className="d-flex justify-content-center align-items-center"
      style={{
        height: "100vh",
        background: "linear-gradient(135deg, #1B3C53, #D2C1B6)", // background
      }}
    >
      <div className="shadow-lg rounded-4 p-3 bg-white">
        <SignIn />
      </div>
    </div>
  );
}

export default Signin;
