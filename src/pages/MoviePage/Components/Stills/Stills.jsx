import "./style.css";
import { useState, useEffect } from "react";
import BlockHeader from "../../../../Components/BlockHeader/BlockHeader";

export const Stills = (obj) => {
  const [btnText, setBtnText] = useState(false);

  useEffect(() => {
    if (obj.prop.items && obj.prop.items.length > 4) {
      setBtnText("Все кадры");
    }
  }, [obj.prop.items]);

  return (
    <div className="stills-cont">
      <BlockHeader
        prop={{
          title: "Кадры из фильма",
          btnText: btnText,
          btnLink: "/MoviePage",
        }}
      />

      <div className="stills-main">
        {obj.prop.items.slice(0, 4).map((el, index) => (
            <div key={index} className="stills-img">
                <img src={el.previewUrl} alt="" />
            </div>
        ))}
        </div>
    </div>
  );
};
