import { useLocation } from "react-router-dom";

function Recommendations() {
  const location = useLocation();
  const recommendations = location.state?.recommendations || "No recommendations available";

  return (
    <div className="container mt-5">
      <h3 className="text-center mb-4">🎯 Your Recommendations</h3>
      <pre
        style={{
          whiteSpace: "pre-wrap",
          fontFamily: "inherit",
          fontSize: "1rem",
          color: "#333",
          background: "#f8f9fa",
          padding: "1rem",
          borderRadius: "10px",
        }}
      >
      {recommendations.replace(/[#*`]/g, "")}

      </pre>
    </div>
  );
}

export default Recommendations;
