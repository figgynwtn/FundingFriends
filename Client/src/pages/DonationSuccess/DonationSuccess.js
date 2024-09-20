import { useState, useEffect, useContext } from "react";
import { useSearchParams } from "react-router-dom";
import { APIURLContext } from "src/contexts/APIURLContext";
import useGetOneCampaign from "src/hooks/useGetOneCampaign";

function DonationSuccess() {
    //Setup state
    const[campaign, setCampaign] = useState({});
    //Get the apiurl from context
    const apiURL = useContext(APIURLContext);
    //get the campaignid
    const[searchParams, setSearchParams] = useSearchParams();
    const campaignId = searchParams.get('campaign_id');
    const donationAmount = searchParams.get('donation_amount');

    //use custom hook to get data about a campaign
    const[loading, error, campaigndata] = useGetOneCampaign(`${apiURL}/campaigns/${campaignId}`);
    //use effect hook
    useEffect(() => {
        setCampaign(campaigndata)
    },[campaigndata]);
    //return
    return(
        <div>
            Donation Success! You donated ${donationAmount} to the campaign{' '}
                <strong>{campaign.campaign?.name}</strong>!        
        </div>
    )
}

export default DonationSuccess