import React, { useState, useRef, useMemo } from 'react';
import { ColorPicker, Space, theme } from 'antd';

// import './input.css';

const AppColorPicker = ({name, changeValue}) => {
    const { token } = theme.useToken();
    const [color, setColor] = useState(token.colorPrimary);
    const bgColor = useMemo(() => (typeof color === 'string' ? color : color.toHexString()), [color]);
  
    const styleColor = {
        width: token.sizeMD,
        height: token.sizeMD,
        borderRadius: token.borderRadiusSM,
        backgroundColor: bgColor,
      };

    return (
        <div >
          <ColorPicker value={color} onChange={(value, hex) =>{
           console.log("onChange")
            console.log(value);
            console.log(hex);
            console.log(name);
            setColor(value)
            changeValue(name,hex)
          }}>
          <Space>
            <div style={styleColor} />
            <span>{bgColor}</span>
          </Space>
       </ColorPicker>
        </div>     
    )
}

export default AppColorPicker;
