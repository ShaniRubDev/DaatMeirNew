import React from "react";
import { useNavigate } from "react-router-dom";
import "./ThankYou.scss";

const ThankYou: React.FC = () => {
  const navigate = useNavigate();

  return (
    <div className="thank-you">
      <header className="hero">
        <div className="hero-content">
          <h1>תודה רבה על תרומתך!</h1>
          <p>בזכותך, אנו יכולים להמשיך לתמוך במשפחות נזקקות ולומדי תורה.</p>
          <button onClick={() => navigate("/")} className="cta-button">
            חזרה לעמוד הבית
          </button>
        </div>
        <img src="/images/front-view-couple-hands-concept.jpg" alt="תודה" className="hero-background" />
      </header>

      <section className="about">
        <div className="about-container">
          <h2 className="about-title">התרומה שלך יוצרת שינוי</h2>
          <p className="about-description">
            כל שקל שתרמת מופנה ישירות למשפחות, לומדי תורה ויוזמות קהילתיות.
          </p>
          <p className="about-text">
            אנו מעריכים את נדיבותך ומודים לך מקרב לב על היותך חלק מעשייה של חסד אמיתי.
          </p>
        </div>
      </section>

      <section className="call-to-action">
        <h2>רוצה לעזור עוד?</h2>
        <button className="cta-button" onClick={() => navigate("/donation")}>
          תרומה נוספת
        </button>
      </section>
    </div>
  );
};

export default ThankYou;
