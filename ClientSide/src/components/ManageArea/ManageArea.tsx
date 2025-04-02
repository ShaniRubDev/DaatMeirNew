import React, { FC } from 'react';
import './ManageArea.scss';
import { useNavigate } from 'react-router-dom';


interface ManageAreaProps { }

const ManageArea: FC<ManageAreaProps> = () => {
    const navigate = useNavigate();
    return <div className="ManageArea">
        <div className="manage-area">
            {/* <header className="hero">
        <div className="hero-content">
          <h1 >אזור ניהול אישי</h1>
          <p>בחרו את האפשרות הרצויה לניהול העמותה.</p>
        </div>
      </header> */}

            <section className="manage-options">
                <div className="option">
                    <button onClick={() => navigate('/DonorsList')} className="cta-button">
                        קבלת פרטי תורמים
                    </button>
                </div>
                <div className="option">
                    <button onClick={() => navigate('/DonationsList')} className="cta-button">
                        קבלת פרטי תרומות
                    </button>

                </div>
                <div className="option">
                    <button onClick={() => navigate('/manage-basket')} className="cta-button">
                        ניהול הסלים
                    </button>
                </div>
                <div className="option">
                    <button onClick={() => navigate('/manageAn')} className="cta-button">
                        ניהול ההודעות
                    </button>
                </div>
            </section>
        </div>
    </div>
}



export default ManageArea;
