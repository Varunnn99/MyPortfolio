import { useState, useEffect } from "react";
import axios from "axios";

export default function AboutMe() {
  const [content, setContent] = useState("");
  const [editMode, setEditMode] = useState(false);
  const [newContent, setNewContent] = useState("");
  const token = localStorage.getItem("token"); // Check if user is logged in

  useEffect(() => {
    fetchAboutMe();
  }, []);

  const fetchAboutMe = async () => {
    try {
      const response = await axios.get("http://localhost:5000/api/about");
      setContent(response.data.content);
      setNewContent(response.data.content);
    } catch (error) {
      console.error("Error fetching About Me:", error);
    }
  };

  const updateAboutMe = async (e) => {
    e.preventDefault();
    
    if (!token) {
      alert("You must be logged in to edit About Me.");
      return;
    }

    try {
      await axios.put(
        "http://localhost:5000/api/about",
        { content: newContent },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      alert("About Me updated successfully!");
      setContent(newContent);
      setEditMode(false);
    } catch (err) {
      console.error("Error updating About Me:", err);
      alert("Failed to update About Me");
    }
  };

  return (
    <section id="AboutMe" className="about--section">
      <div className="about--section--img">
        <img src="./img/aboutme.jpg" alt="About Me" />
      </div>
      <div className="hero--section--content--box about--section--box">
        <div className="hero--section--content">
          <p className="section--title">About</p>
          <h1 className="skills-section--heading">About Me</h1>
          
          {!editMode ? (
            <>
              <p className="hero--section-description">{content}</p>
              {token && (
                <button className="btn btn-primary" onClick={() => setEditMode(true)}>
                  Edit About Me
                </button>
              )}
            </>
          ) : (
            <form onSubmit={updateAboutMe} className="styled-form">
              <textarea
                value={newContent}
                onChange={(e) => setNewContent(e.target.value)}
                className="contact--input text-md"
                rows="5"
                required
              />
              <button type="submit" className="btn btn-primary">Save Changes</button>
              <button type="button" className="btn btn-secondary" onClick={() => setEditMode(false)}>
                Cancel
              </button>
            </form>
          )}
        </div>
      </div>
    </section>
  );
}
