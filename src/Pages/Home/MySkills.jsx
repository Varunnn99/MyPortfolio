import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

export default function MySkills() {
  const [skills, setSkills] = useState([]);
  const navigate = useNavigate();

  // Form state
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [src, setSrc] = useState("");

  // Check if user is logged in
  const token = localStorage.getItem("token");

  useEffect(() => {
    fetchSkills();
  }, []);

  const fetchSkills = async () => {
    try {
      const response = await axios.get("http://localhost:5000/api/skills");
      setSkills(response.data);
    } catch (error) {
      console.error("Error fetching skills:", error);
    }
  };

  const addSkill = async (e) => {
    e.preventDefault();

    if (!token) {
      alert("You must be logged in to add a skill!");
      navigate("/login"); // Redirect to login page
      return;
    }

    if (!title || !description || !src) {
      alert("All fields are required.");
      return;
    }

    const skillData = { title, description, src };

    try {
      await axios.post("http://localhost:5000/api/skills", skillData, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`, // ✅ Fixed Syntax Error
        },
      });

      alert("Skill added successfully!");
      setTitle("");
      setDescription("");
      setSrc("");
      fetchSkills(); // Refresh skills list
    } catch (err) {
      console.error("Error adding skill:", err);
      alert(`Error adding skill: ${err.response?.data?.error || "Unknown error"}`);
    }
  };

  return (
    <section className="skills--section" id="mySkills">
      <div className="portfolio--container">
        <p className="section--title">My Skills</p>
        <h2 className="skills--section--heading">My Expertise</h2>
      </div>

      {/* Display Skills */}
      <div className="skills--section--container">
        {skills.length > 0
          ? skills.map((item, index) => (
              <div key={index} className="skills--section--card">
                <div className="skills--section--img">
                  <img src={item.src} alt="Skill" />
                </div>
                <div className="skills--section--card--content">
                  <h3 className="skills--section--title">{item.title}</h3>
                  <p className="skills--section--description">{item.description}</p>
                </div>
              </div>
            ))
          : <p>No skills added yet.</p>}
      </div>

      {/* {!token && <p className="section--title">LOGIN TO ADD MORE SKILLS</p>} */}

      {/* Show form only if user is logged in */}
      {token && (
        <div className="form-container">
          <h2 className="form-title">Add a New Skill</h2>
          <br/>
          <form onSubmit={addSkill} className="contact--form--container">
            <div className="container-other">
              <input type="text" value={title} onChange={(e) => setTitle(e.target.value)} className="contact--input text-md" placeholder="Skill Title" required />
            
              <input type="text" value={description} onChange={(e) => setDescription(e.target.value)} className="contact--input text-md" rows = "8" placeholder="Description" required />
            
              <input type="text" value={src} onChange={(e) => setSrc(e.target.value)} className="contact--input text-md" placeholder="Image URL" required />
            </div>
            <button type="submit" className="btn btn-primary">Add Skill</button>
          </form>
        </div>
      )}
    </section>
  );
}
