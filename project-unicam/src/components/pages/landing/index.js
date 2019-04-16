import React from 'react';
import { Link } from 'react-router-dom';

function Landing(){
    return(
        <div>
            ciao, registrate stupetu
            <Link to={'/signup'}> Pigia qui</Link>
            
        </div>
    )
}

export default Landing;