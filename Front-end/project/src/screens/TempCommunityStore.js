import React, { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'

const TempCommunityStore = () => {
    const navigate = useNavigate();

    useEffect(() => {
        navigate('/CommunityStore');
    }, [navigate]);
    
    return (
        <div>TempPage</div>
    )
}

export default TempCommunityStore