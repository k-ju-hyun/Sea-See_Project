import React, { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'

const TempCommunityPhoto = () => {
    const navigate = useNavigate();

    useEffect(() => {
        navigate('/CommunityPhoto');
    }, [navigate]);
    
    return (
        <div>TempPage</div>
    )
}

export default TempCommunityPhoto