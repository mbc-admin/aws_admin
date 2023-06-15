// NavBar.js
import React from 'react';
import './topNavBar.css';
import {useNavigate} from 'react-router-dom';
import {IconAssets, ImageAssets} from '../../utils/ImageAssets';

const TopNavBar = ({text}) => {
  const navigate = useNavigate();

  const goBack = () => {
    console.log("goback")
    navigate(-1);
  };

  return (
    <div className="navBar">
      <button className="backButton" onClick={() => goBack()}>
      <img className={'iconBackChat'} src={IconAssets.backBlack}/>
      </button>
      <p className='textItem'>{text}</p>

    </div>
  );
};


export default TopNavBar
