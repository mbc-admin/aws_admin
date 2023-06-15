import React from 'react';

import './dotQuantity.css';

const DotQuantity = ({style, size, focus}) => {

    return (
        <div style={style} className={[size === 'little' && (focus) ? 'containerDotQuantityLittleFocus' : 'containerDotQuantityLittleNoFocus']}>
            8
        </div>
    )
}

export default DotQuantity;
