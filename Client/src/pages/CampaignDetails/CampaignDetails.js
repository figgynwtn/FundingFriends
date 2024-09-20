import { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import useToken from 'src/hooks/useToken';
import { APIURLContext } from 'src/contexts/APIURLContext';
import 'src/pages/CampaignDetails/CampaignDetails.css';

function CampaignDetail() {
  const { id } = useParams();
  const [campaign, setCampaign] = useState({ campaign: {}, donations: [] });
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const { token } = useToken();
  const apiURL = useContext(APIURLContext);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const campaignResponse = await axios.get(`${apiURL}/campaigns/${id}`);
        setCampaign(campaignResponse.data);
      } catch (error) {
        console.error("Error fetching campaign data:", error);
      }
    };

    fetchData();
  }, [id, apiURL]);

  useEffect(() => {
    setIsLoggedIn(!!token);
  }, [token]);

  const totalDonations = campaign.donations.reduce((total, donation) => total + donation.amount, 0);
  const progress = (totalDonations / campaign.campaign.goal) * 100;

  const handleEmailShare = () => {
    const subject = 'Check out this donation campaign!';
    const body = `Hi there,\n\nI found this donation campaign that I think you might be interested in. \n\nHere's the link: ${window.location.href}\n\nBest regards,\n[Your Name]`;
    window.location.href = `mailto:?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
  };

  const handleSmsShare = () => {
    const message = `Check out this donation campaign: ${window.location.href}`;
    window.location.href = `sms:?body=${encodeURIComponent(message)}`;
  };

  return (
    <div className="details-page-container">
      <div className="row">
        <div className="col-md-6 d-flex flex-column justify-content-between">
          <div>
            <h1>{campaign.campaign.name}</h1>
            <p>{campaign.campaign.description}</p>
            <p>
              <span className="donation-amount">${totalDonations} </span>
              raised of ${campaign.campaign.goal}
            </p>
            <p>{campaign.donations.length} donations</p>
            <p className={`funded-status ${progress >= 100 ? 'funded' : ''}`}>
              {`This campaign is ${progress.toFixed(2)}% funded!`}
              <div className="progress">
                <div className="progress-bar" role="progressbar" style={{ width: `${(totalDonations / campaign.campaign.goal) * 100}%` }} aria-valuenow={(totalDonations / campaign.campaign.goal) * 100} aria-valuemin="0" aria-valuemax="100"></div>
              </div>
            </p>
          </div>
          <div className="mt-3">
            {isLoggedIn && (
              <form action={`${apiURL}/donations/create_checkout`} method='POST'>
                <input type='hidden' name='campaign_id' value={campaign.campaign._id} />
                <input type='hidden' name='campaign_name' value={campaign.campaign.name} />
                <input
                  type='number'
                  id='donation_amount'
                  name='donation_amount'
                  min='0'
                  step='0.01'
                  defaultValue='30.00'
                />
                {token && <input type='hidden' name='token' value={token} />}
                <button type='submit' className="donate-button">Donate</button>
              </form>
            )}
            <button className="share-button" onClick={handleEmailShare}>Share via Email</button>
            <button className="share-button" onClick={handleSmsShare}>Share via SMS</button>
          </div>
        </div>
      </div>
      <div className="row mt-5">
        <div className="col">
          <h3>Donations</h3>
          <div className="donations-container">
            {campaign.donations.map((donation, index) => (
              <div key={index} className="donation-card">
                <p><strong>Amount:</strong> ${donation.amount}</p>
                {donation.payment_id && <p><strong>Payment ID:</strong> {donation.payment_id}</p>}
                <p><strong>Message:</strong> {donation.message}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default CampaignDetail;

