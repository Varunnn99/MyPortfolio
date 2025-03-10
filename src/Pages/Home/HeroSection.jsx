import { useState, useEffect } from "react";

export default function HeroSection() {
  return (
    <section id="herosection" className="hero--section">
      <div className="hero--section--content--box">
        <div className="hero--section--content">
          <p className="section--title">Hey, I'm Varun Bhalla</p>
          <h1 className="hero--section--title">
            <span className="hero-section-title-color">Full Stack</span>{" "}
            <br />
            Developer
          </h1>
          {/* <p className="hero--section--description">
            Lorem ipsum dolor sir, amet consectetur adipisicing elit
            <br />
            Facere unde asperiores tempora esse impedit?
          </p> */}
           
          <a
            href="https://docs.google.com/document/d/1JDRCDSmV_Pq65LPLdfd_Kg0Zxi6-XKJ9/edit?usp=sharing&ouid=100715028749194427979&rtpof=true&sd=trueg"
            target="_blank"
            rel="noopener noreferrer"
            className="btn btn-primary"
          >
            Download CV
          </a>
        </div>
      </div>
      <div className="hero--section--image">
        <img src="./img/me.jpg" height={800}  alt="Hero Section"></img>
      </div>
    </section>
  );
}
