import React from "react";

const Footer = (props) => {
  return (
    <section style={{ display: props.hideFooter ? "none" : "" }} id="footerSec">
      <div className="footerWrapper">
        <h4>Copyright&copy; 2021 | Created By M.Fatih Unal </h4>
        <h6>All Rights Reserved&reg;</h6>
        <div className="socialMed_cont">
          <a
            href="mailto:fatihissf0@gmail.com"
            target="_blank"
            rel="noopener noreferrer"
          >
            <i style={{ margin: "1rem" }} className="fas fa-envelope"></i>
          </a>

          <a
            href="https://www.linkedin.com/in/munal92/"
            target="_blank"
            rel="noopener noreferrer"
          >
            <i style={{ margin: "1rem" }} className="fab fa-linkedin"></i>
          </a>
          <a
            href="https://github.com/munal92"
            target="_blank"
            rel="noopener noreferrer"
          >
            <i style={{ margin: "1rem" }} className="fab fa-github"></i>
          </a>
        </div>
      </div>
    </section>
  );
};

export default Footer;
