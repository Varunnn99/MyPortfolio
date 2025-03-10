import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom"; // Import for redirection
import axios from "axios";
import data from "../../data/index.json";

export default function MyPortfolio() {
  const [projects, setProjects] = useState([]);
  const navigate = useNavigate();
  
  // State for form inputs
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [link, setLink] = useState("");
  const [src, setSrc] = useState("");

  // Check if user is logged in
  const token = localStorage.getItem("token");

  useEffect(() => {
    fetchProjects();
  }, []);

  const fetchProjects = async () => {
    try {
      const response = await axios.get("http://localhost:5000/api/projects");
      setProjects(response.data);
    } catch (error) {
      console.error("Error fetching projects:", error);
    }
  };

  const addProject = async (e) => {
    e.preventDefault();

    if (!token) {
      alert("You must be logged in to add a project!");
      navigate("/login"); // Redirect to login page
      return;
    }

    if (!title || !description || !link || !src) {
      alert("All fields are required.");
      return;
    }

    const projectData = { title, description, link, src };

    try {
      await axios.post("http://localhost:5000/api/projects", projectData, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });

      alert("Project added successfully!");

      // Clear form after submission
      setTitle("");
      setDescription("");
      setLink("");
      setSrc("");

      // Fetch updated projects
      fetchProjects();
    } catch (err) {
      console.error("Error adding project:", err);
      alert(`Error adding project: ${err.response?.data?.error || "Unknown error"}`);
    }
  };

  return (
    <section className="portfolio--section" id="MyPortfolio">
      <div className="portfolio--container-box">
        <div className="portfolio--container">
          <p className="section--title">Recent Projects</p>
          <h2 className="skills--section--heading">My Portfolio</h2>
        </div>
      </div>

      {/* Display Projects First */}
      <div className="portfolio--section--container">
        {projects.length > 0
          ? projects.map((item, index) => (
              <div key={index} className="portfolio--section--card">
                <div className="portfolio--section--img">
                  <img src={item.src} alt="Project Image" />
                </div>
                <div className="portfolio--section--card--content">
                  <div>
                    <h3 className="portfolio--section--title">{item.title}</h3>
                    <p className="text-md">{item.description}</p>
                  </div>
                  <p className="text-sm portfolio--link">
                    <a href={item.link} target="_blank" rel="noopener noreferrer">
                      Visit Project
                    </a>
                  </p>
                </div>
              </div>
            ))
          : data.portfolio.map((item, index) => (
              <div key={index} className="portfolio--section--card">
                <div className="portfolio--section--img">
                  <img src={item.src} alt="Placeholder" />
                </div>
                <div className="portfolio--section--card--content">
                  <div>
                    <h3 className="portfolio--section--title">{item.title}</h3>
                    <p className="text-md">{item.description}</p>
                  </div>
                  <p className="text-sm portfolio--link">
                    <a href={item.link} target="_blank" rel="noopener noreferrer">
                      Visit Project
                    </a>
                  </p>
                </div>
              </div>
            ))}
      </div>

      {/* Show Login Message */}
      {/* {!token && <p className="section--title">LOGIN TO ADD MORE PROJECTS</p>} */}

      {/* Show form only if user is logged in */}
      {token && (
        <div className="form-container">
          <h2 className="form-title">Add a New Project</h2>
          <br/>
          <form onSubmit={addProject} className="contact--form--container">
            <div className="container-other">
              <input type="text" value={title} onChange={(e) => setTitle(e.target.value)} className="contact--input text-md" placeholder="Project Title" required />
            
              <input type="text" value={description} onChange={(e) => setDescription(e.target.value)} className="contact--input text-md" placeholder="Description" required />
            
              <input type="text" value={link} onChange={(e) => setLink(e.target.value)} className="contact--input text-md" placeholder="Project Link" required />
            
              <input type="text" value={src} onChange={(e) => setSrc(e.target.value)} className="contact--input text-md" placeholder="Image URL" required />
            </div>
            <button type="submit" className="btn btn-primary">Add Project</button>
          </form>
        </div>
      )}
    </section>
  );
}
