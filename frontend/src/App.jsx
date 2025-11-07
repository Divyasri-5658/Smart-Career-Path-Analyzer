import { useState } from "react";

function App() {
  const [skills, setSkills] = useState("");
  const [interests, setInterests] = useState("");
  const [result, setResult] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    const res = await fetch("http://127.0.0.1:8000/api/recommend/", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ skills, interests }),
    });
    const data = await res.json();
    setResult(data.recommendations);
  };

  return (
    <div className="p-6 max-w-xl mx-auto">
      <h1 className="text-2xl font-bold mb-4">AI Career Recommender</h1>
      <form onSubmit={handleSubmit}>
        <input
          className="border p-2 w-full mb-2"
          placeholder="Enter your skills"
          value={skills}
          onChange={(e) => setSkills(e.target.value)}
        />
        <input
          className="border p-2 w-full mb-2"
          placeholder="Enter your interests"
          value={interests}
          onChange={(e) => setInterests(e.target.value)}
        />
        <button className="bg-blue-500 text-white px-4 py-2 rounded">
          Get Recommendations
        </button>
      </form>

      {result && (
        <div className="mt-4 p-3 bg-gray-100 rounded">
          <h2 className="font-semibold">Recommendations:</h2>
          <pre>{result}</pre>
        </div>
      )}
    </div>
  );
}

export default App;