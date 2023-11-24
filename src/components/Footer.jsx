import "../style/Footer.css";

const Footer = () => {
  return (
    <div className="footer-container">
      <div className="footer">
        <p>
          Made with {""}
          <a href="https://fr.legacy.reactjs.org/" target="_blank">
            React{" "}
          </a>
          by{" "}
          <a href="https://github.com/J-De-Laclos" target="_blank">
            Jonathan Fruteau de Laclos
          </a>
        </p>
      </div>
    </div>
  );
};

export default Footer;
