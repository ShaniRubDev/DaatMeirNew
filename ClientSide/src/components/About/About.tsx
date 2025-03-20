
 

// export default About;
import React, { FC } from 'react';
import './About.scss';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import { FaShoppingCart } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import * as Icon from 'react-bootstrap-icons';
import NavBar from '../NavBar/NavBar';
import Announcement from '../Announcement/Announcement';

interface AboutProps {}

const About: FC<AboutProps> = () => {
  const navigate = useNavigate(); // פונקציה שמקבלת את הניווט

  // פונקציה שמבצעת את הניווט
  const handleNavigation = () => {
    navigate("/donation");
  };

  return  <div className="About">
       <div className="about-container">
          <h1 id="about-title" className = "varela-round">דעת מאיר</h1>
          <p className="about-text">
            החיים היהודיים נשענים על שלושה עמודים: תורה, עבודה וגמילות חסדים. עמותת דעת מאיר נוסדה מתוך חזון להעמיד את שלושת היסודות הללו במרכז חיינו, בדגש על החזקת לומדי התורה, תמיכה בנזקקים והפצת אור התורה בעם ישראל
          </p>

          <h2 className="about-subtitle">החזקת התורה – יסוד קיומנו</h2>
          <p className="about-text">
            "חז"ל לימדו אותנו כי "אם לא בריתי יומם ולילה חוקות שמים וארץ לא שמתי (ירמיהו לג, כה). לימוד התורה הוא הערובה לקיומו של עם ישראל, ואלפי שנים ידענו שדווקא בזכות מסירותם של לומדי התורה עומדים אנו כאומה נצחית
          </p>

          <h2 className="about-subtitle">גמילות חסדים – הערבות ההדדית שמחזיקה את העם</h2>
          <p className="about-text">
            "כל ישראל ערבים זה לזה" - לכל יהודי יש אחריות לדאוג לרעהו. עמותת דעת מאיר עוסקת בהושטת יד לאלמנות, יתומים, משפחות במצוקה ואברכים הזקוקים לסיוע, כדי שיוכלו לחיות בכבוד ובשלווה
          </p>

          <h2 className="about-subtitle">שמחה של מצווה – חגי ישראל עם כל יהודי</h2>
          <p className="about-text">
            בכל חג ומועד אנו מתגייסים להבטיח שלכל משפחה תהיה סעודה מכובדת, שמחת חג אמיתית ותמיכה בלומדי התורה.
          </p>

          <h2 className="about-subtitle">הזכות שלכם – החסד שלנו</h2>
          <p className="about-text">
            עמותת דעת מאיר מזמינה אתכם להיות שותפים אמיתיים במפעל אדיר של תורה וחסד. כל תרומה שלכם אינה רק צדקה – אלא השקעה רוחנית שתעמוד לכם ולזרעכם לעד.
          </p>

          <div className="donation-box">
            <button className="donation-button" onClick={() => window.location.href = "/donation"}>
              לתרומה עכשיו
            </button>
          </div>
        </div>
      </div> 
     
    
}
 

export default About;
