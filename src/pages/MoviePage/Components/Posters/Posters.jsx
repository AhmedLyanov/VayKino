import { useState, useEffect } from 'react'
import BlockHeader from '../../../../Components/BlockHeader/BlockHeader'
import './style.css'

export const Posters = (obj) => {
    const [btnText, setBtnText] = useState(false);

  useEffect(() => {
    if (obj.prop.items.length > 4) {
      setBtnText("Все постеры");
    }
  }, [obj.prop.items.length]);

  return (
    <div className="posters-cont">
      <BlockHeader
        prop={{
          title: "Постеры к фильму",
          btnText: btnText,
          btnLink: "/MoviePage",
        }}
      />

      <div className="posters-main">
        {obj.prop.items.slice(0, 4).map((el, index) => (
            <div key={index} className="posters-img">
                <img src={el.imageUrl} alt="" />
            </div>
        ))}
      </div>
    </div>
  );
}