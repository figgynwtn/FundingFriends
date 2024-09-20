import { Navigate, useNavigate } from "react-router-dom";
import useToken from "src/hooks/useToken";
import { useState, useEffect, useContext } from "react";
import { APIURLContext } from 'src/contexts/APIURLContext';
import axios from "axios";
import { Link } from 'react-router-dom';
import 'src/pages/ProfilePage/ProfilePage.css';

export default function ProfilePage() {
    const { token, setToken } = useToken();
    const apiURL = useContext(APIURLContext);
    const [user, setUser] = useState(null);
    const [donations, setDonations] = useState([]);
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();

    useEffect(() => {
        async function fetchUserData() {
            try {
                const response = await axios.get(apiURL + '/users/user', {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                });
                const name = response.data.email.split('.')[0];
                response.data.name = name.charAt(0).toUpperCase() + name.slice(1);
                setUser(response.data);
            } catch (error) {
                console.error('Error fetching user data:', error);
            }
        }

        async function fetchDonations() {
            try {
                const response = await axios.get(apiURL + '/users/donations', {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                });
                setDonations(response.data);
                setLoading(false);
            } catch (error) {
                console.error('Error fetching donations:', error);
                setLoading(false);
            }
        }

        fetchUserData();
        fetchDonations();
    }, [token, apiURL]);

    const handleLogout = () => {
        localStorage.removeItem('token');
        setToken(null);
        navigate('/');
    };

    if (!token) {
        return <Navigate replace to='/login' />
    }

    return (
        <div className="profile-page-container">
            <div className="profile-details">
                <h1 className="profile-heading">Welcome, {user ? user.name : ''}</h1>
                <h2 className="profile-subheading">Email: {user ? user.email : ''}</h2>
                <button className="btn btn-danger logout-button mt-3" onClick={handleLogout}>Logout</button>
            </div>
            {loading ? (
                <p>Loading...</p>
            ) : (
                <div className="row mt-4">
                    <div className="col">
                        <h2>Your Donations</h2>
                        <div className="donations-container">
                            {donations.map((donation) => (
                                <div className="donation-card" key={donation._id}>
                                    <h3>{donation.campaign_id.name}</h3>
                                    <p>Amount: ${donation.amount}</p>
                                    <p>Date: {new Date(donation.date).toLocaleDateString()}</p>
                                    <Link to={`/campaigns/${donation.campaign_id._id}`} className="btn btn-primary">View Campaign</Link>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            )}
        </div>
    )
}

