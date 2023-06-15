import React from 'react';
import './avatar.css';
import { ImagesUrl } from '../../utils/ImageAssets';


const AddAvatar = ({ src, onClick }) => (
    <img
    className='avatarStyle'
      src={src || ImagesUrl.emptyAvatarUrl}
      alt="Avatar"
      onClick={onClick}
    />
  );
  

export default AddAvatar;