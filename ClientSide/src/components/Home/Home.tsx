
// import React from 'react';
// import { useNavigate } from 'react-router-dom';
// import NavBar from '../NavBar/NavBar';
// import './Home.scss';
// import Announcement from '../Announcement/Announcement'

// const Home: React.FC = () => {
//   const navigate = useNavigate();

//   return (
//     <div className="home">
//             <Announcement /> {/* הצגת המודעה */}

//       <header className="hero">
//         <div className="hero-content">
//           <h1>היו שותפים בעשיית חסד</h1>
//           <p>עזרו לנו להמשיך לתמוך במשפחות, בלומדי תורה ובקהילה</p>
//           <button onClick={() => navigate('/donation')} className='cta-button'>לתרומה עכשיו</button>
//         </div>
//         <img src="images/front-view-couple-hands-concept.jpg" alt="רקע העמותה" className="hero-background" />
//       </header>

//       {/* <section className="about">
//         <h2 className="about-title">דעת מאיר – נתינה מכל הלב</h2>
//         <h2 className="about-description">
//           עמותת דעת מאיר מזמינה אתכם להיות שותפים אמיתיים במפעל אדיר של תורה וחסד. כל תרומה שלכם אינה רק צדקה – אלא השקעה רוחנית שתעמוד לכם ולזרעכם לעד.
//         </h2>
//         <p className="about-text">העמותה פועלת לחיזוק התורה, עזרה לנזקקים ותמיכה בקהילה.</p>
//       </section> */}

//       <section className="about">
//         <div className="about-container">
//           <h2 className="about-title">דעת מאיר – נתינה מכל הלב</h2>
//           <p className="about-description">
//             עמותת דעת מאיר פועלת במסירות למען תמיכה במשפחות, סיוע ללומדי תורה וחיזוק הקהילה.
//             אנו מאמינים שנתינה היא לא רק מעשה טוב – אלא שליחות אמיתית.
//           </p>
//           <div className="about-content">
//             <p className="about-text">
//               העמותה מפעילה מערך סיוע רחב הכולל חלוקת סלי מזון, סיוע כלכלי למשפחות במצוקה
//               ותמיכה בלומדי תורה. בזכותכם, אנו מצליחים להגיע לעוד ועוד אנשים שזקוקים לעזרה
//             </p>
//             <p className="about-text">
//               יחד, נוכל להמשיך ולהעניק אור ותקווה לכל מי שצריך. הצטרפו אלינו והיו חלק ממעשה החסד
//             </p>
//           </div>
//         </div>
//       </section>

//       <section className="features">
//         <div className="feature">
//           <img src="images/toraHome.jpg" alt="תמיכה בתורה" />
//           <h3>תמיכה בלומדי תורה</h3>
//           <p>סיוע לאברכים ולתלמידי חכמים ברחבי הארץ.</p>
//         </div>
//         <div className="feature">
//           <img src="images/mazonBaket.jpg" alt="עזרה למשפחות" />
//           <h3>סיוע למשפחות נזקקות</h3>
//           <p>חלוקת סלי מזון ותמיכה כספית למשפחות במצוקה.</p>
//         </div>
//         <div className="feature">
//           <img src="images/SL-091823-63290-23.jpg" alt="חיזוק הקהילה" />
//           <h3>חיזוק הקהילה</h3>
//           <p>תכניות סיוע, ליווי ותמיכה קהילתית.</p>
//         </div>
//       </section>

//       <section className="call-to-action">
//         <h2>הצטרפו אלינו בעשיית חסד</h2>
//         <button className='cta-button' onClick={() => navigate('/donation')}  >לתרומה עכשיו</button>
//       </section>
//     </div>
//   );
// };

// export default Home;


import React from 'react';
import { useNavigate } from 'react-router-dom';
import NavBar from '../NavBar/NavBar';
import './Home.scss';
import Announcement from '../Announcement/Announcement';

const Home: React.FC = () => {
  const navigate = useNavigate();
  const publicUrl = process.env.PUBLIC_URL;

  return (
    <div className="home">
      <Announcement /> {/* הצגת המודעה */}

      <header className="hero">
        <div className="hero-content">
          <h1>היו שותפים בעשיית חסד</h1>
          <p>עזרו לנו להמשיך לתמוך במשפחות, בלומדי תורה ובקהילה</p>
          {/* <button onClick={() => navigate('/donation')} className="cta-button">
            לתרומה עכשיו
          </button> */}

<button className="cta-button" onClick={() => navigate('/donation')}>
          לתרומה עכשיו
        </button>
        </div>
        <img
          src={`${publicUrl}/images/front-view-couple-hands-concept.jpg`}
          alt="רקע העמותה"
          className="hero-background"
        />
      </header>

      <section className="about">
        <div className="about-container">
          <h2 className="about-title">דעת מאיר – נתינה מכל הלב</h2>
          <p className="about-description">
            עמותת דעת מאיר פועלת במסירות למען תמיכה במשפחות, סיוע ללומדי תורה וחיזוק הקהילה.
            אנו מאמינים שנתינה היא לא רק מעשה טוב – אלא שליחות אמיתית.
          </p>
          <div className="about-content">
            <p className="about-text">
              העמותה מפעילה מערך סיוע רחב הכולל חלוקת סלי מזון, סיוע כלכלי למשפחות במצוקה
              ותמיכה בלומדי תורה. בזכותכם, אנו מצליחים להגיע לעוד ועוד אנשים שזקוקים לעזרה
            </p>
            <p className="about-text">
              יחד, נוכל להמשיך ולהעניק אור ותקווה לכל מי שצריך. הצטרפו אלינו והיו חלק ממעשה החסד
            </p>
          </div>
        </div>
      </section>

      <section className="features">
        <div className="feature">
          <img
            src={`${publicUrl}/images/toraHome.jpg`}
            alt="תמיכה בתורה"
          />
          <h3>תמיכה בלומדי תורה</h3>
          <p>סיוע לאברכים ולתלמידי חכמים ברחבי הארץ.</p>
        </div>
        <div className="feature">
          <img
            src={`${publicUrl}/images/mazonBaket.jpg`}
            alt="עזרה למשפחות"
          />
          <h3>סיוע למשפחות נזקקות</h3>
          <p>חלוקת סלי מזון ותמיכה כספית למשפחות במצוקה.</p>
        </div>
        <div className="feature">
          <img
            src={`${publicUrl}/images/SL-091823-63290-23.jpg`}
            alt="חיזוק הקהילה"
          />
          <h3>חיזוק הקהילה</h3>
          <p>תכניות סיוע, ליווי ותמיכה קהילתית.</p>
        </div>
      </section>

      <section className="call-to-action">
        <h2>הצטרפו אלינו בעשיית חסד</h2>
        <button className="cta-button" onClick={() => navigate('/donation')}>
          לתרומה עכשיו
        </button>
      </section>
    </div>
  );
};

export default Home;
