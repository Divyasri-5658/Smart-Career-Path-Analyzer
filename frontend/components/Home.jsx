import React, { useState } from 'react'
import { useUser } from '@clerk/clerk-react'
import { useNavigate } from 'react-router-dom'

function Home() {
  const { isSignedIn, user } = useUser()
  const [skills, setSkills] = useState('')
  const [interests, setInterests,] = useState('')
  const [submitted, setSubmitted] = useState(false)
  const [result, setResult] = useState("");
  const navigate = useNavigate()

const handleSubmit = async (e) => {
  e.preventDefault()
  console.log("Sending request to backend...")   // ✅ for frontend console
  try {
    const res = await fetch("http://127.0.0.1:8000/api/recommend/", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ skills, interests }),
    })
    console.log("Response status:", res.status)   // ✅ shows 200 or 500
    const data = await res.json()
    console.log("Data received:", data)           // ✅ shows backend output
    setResult(data.recommendations)
    navigate("/recommendations", { state: { recommendations: data.recommendations } });
  } catch (err) {
    console.error("Error:", err)
  }
  
}


  return (
    <div className="container mt-5">
      {/* --- When user is NOT signed in --- */}
      {
        !isSignedIn && (
          <div className="write text-center">
            <p>Discover stories, share thoughts, and explore creativity in one place.</p>
            <p>Every blog here is more than just words — it’s a journey, a perspective, a spark of inspiration.</p>
            <p>Whether you’re here to read, write, or reflect, this is your corner of the internet to connect and grow.</p>
            <p>📚 Dive into articles that matter.</p>
            <p>✍️ Share your voice with the world.</p>
            <p>🌍 Join a community of curious minds.</p>
          </div>
        )
      }

      {/* --- When user IS signed in --- */}
      {
        isSignedIn && (
          <div className="card shadow p-4 mx-auto" style={{ maxWidth: "600px" }}>
            <h3 className="text-center mb-4">Welcome, {user?.firstName || "User"} 👋</h3>
            <p className="text-center text-muted mb-4">
              Tell us a bit about your <strong>skills</strong> and <strong>interests</strong>.
            </p>

            {
              !submitted ? (
                <form onSubmit={handleSubmit}>
                  <div className="mb-3">
                    <label className="form-label fw-bold">Skills</label>
                    <input
                      type="text"
                      className="form-control"
                      placeholder="e.g. Python, React, Design..."
                      value={skills}
                      onChange={(e) => setSkills(e.target.value)}
                      required
                    />
                  </div>

                  <div className="mb-3">
                    <label className="form-label fw-bold">Interests</label>
                    <input
                      type="text"
                      className="form-control"
                      placeholder="e.g. AI, Web Dev, Blogging..."
                      value={interests}
                      onChange={(e) => setInterests(e.target.value)}
                      required
                    />
                  </div>

                  <button type="submit" className="btn btn-primary w-100">
                    Save
                  </button>
                </form>
              ) : (
                <div className="text-center mt-4">
                  <h5 className="text-success">✅ Your details have been saved!</h5>
                  <p><strong>Skills:</strong> {skills}</p>
                  <p><strong>Interests:</strong> {interests}</p>
                </div>
              )
            }
          </div>
        )
      }
    </div>
  )
}

export default Home
