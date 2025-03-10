import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const Dashboard = () => {
  const navigate = useNavigate();
  const [projects, setProjects] = useState([]);

  useEffect(() => {
    fetchProjects();
  }, []);

  const fetchProjects = async () => {
    try {
      const token = localStorage.getItem("token");
      const response = await axios.get("http://localhost:5000/api/projects", {
        headers: { Authorization: `Bearer ${token}` },
      });
      setProjects(response.data);
    } catch (error) {
      console.error("Error fetching projects:", error);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };
  const addProject = async () => {
    const title = prompt("Enter project title:");
    if (!title) return;
  
    try {
      const token = localStorage.getItem("token");
      await axios.post("http://localhost:5000/api/projects", { title }, {
        headers: { Authorization: `Bearer ${token}` },
      });
      fetchProjects(); // Refresh list
    } catch (error) {
      console.error("Error adding project:", error);
    }
  };

  return (
    <div>
      <h2>CMS Dashboard</h2>
      <button onClick={handleLogout}>Logout</button>
      <h3>Projects</h3>
      <ul>
        {projects.map((project) => (
          <li key={project.id}>{project.title}</li>
        ))}
      </ul>
    </div>
  );
};


  

export default Dashboard;
