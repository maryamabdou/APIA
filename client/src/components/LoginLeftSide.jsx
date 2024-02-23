import React from 'react';
import logo from '../assets/images/robot.png';
import Group from '../assets/images/Group.png';
import './LoginLeftSide.css';

function LoginLeftSide (){
    return(
        <div className='LoginLeftSide'> 
            <div>
                <img src={logo} alt="Logo" className ="robot"/>
            </div>
            <div className='APIA'>
                <h1> APIA </h1>
            </div>
            <div className='check'>
                <h5> <img src={Group} alt="Group" className='checkimg'/> The Future of Interview Practice </h5>
                <h5> <img src={Group} alt="Group" className='checkimg'/> Your Interview Performance, Our Expertise </h5>
                <h5> <img src={Group} alt="Group" className='checkimg'/> Interview Success Starts Here </h5>
            </div>
        </div>
    );
};

export default LoginLeftSide