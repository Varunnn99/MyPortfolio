import React, { useState } from "react";
import axios from "axios";

export default function ContactMe() {
  const [formData, setFormData] = useState({
    first_name: "",
    last_name: "",
    email: "",
    phone_number: "",
    topic: "General Inquiry",
    message: "",
  });

  const [status, setStatus] = useState("");

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await axios.post("http://localhost:5000/api/contact", formData);
      setStatus("Message Sent Successfully ✅");
      setFormData({ first_name: "", last_name: "", email: "", phone_number: "", topic: "General Inquiry", message: "" });
    } catch (error) {
      console.error("Error sending email:", error);
      setStatus("Failed to send message ❌");
    }
  };

  return (
    <section id="Contact" className="contact--section">
      <div>
        <p className="sub--title">Get In Touch</p>
        <h2>Contact Me</h2>
      </div>

      <form className="contact--form--container" onSubmit={handleSubmit}>
        <div className="container">
          <label className="contact--label">
            <span className="text-md">First Name</span>
            <input type="text" className="contact--input text-md" name="first_name" value={formData.first_name} onChange={handleChange} required />
          </label>

          <label className="contact--label">
            <span className="text-md">Last Name</span>
            <input type="text" className="contact--input text-md" name="last_name" value={formData.last_name} onChange={handleChange} required />
          </label>

          <label className="contact--label">
            <span className="text-md">Email</span>
            <input type="email" className="contact--input text-md" name="email" value={formData.email} onChange={handleChange} required />
          </label>

          <label className="contact--label">
            <span className="text-md">Phone Number</span>
            <input type="number" className="contact--input text-md" name="phone_number" value={formData.phone_number} onChange={handleChange} required />
          </label>
        </div>

        <label className="contact--label">
          <span className="text-md">Choose a topic</span>
          <select name="topic" className="contact--input text-md" value={formData.topic} onChange={handleChange}>
            <option value="General Inquiry">General Inquiry</option>
            <option value="Project Collaboration">Project Collaboration</option>
            <option value="Hiring">Hiring</option>
          </select>
        </label>

        <label className="contact--label">
          <span className="text-md">Message</span>
          <textarea name="message" className="contact--input text-md" rows="4" placeholder="Type your message..." value={formData.message} onChange={handleChange} required />
        </label>

        <label className="checkbox--label">
          <input type="checkbox" required name="checkbox" />
          <span className="text-sm">I accept the terms</span>
        </label>

        <div>
          <button type="submit" className="btn btn-primary contact--form--btn">Submit</button>
        </div>

        <p>{status}</p> {/* Status Message */}
      </form>
    </section>
  );
}
