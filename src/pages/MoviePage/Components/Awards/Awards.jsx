import { useEffect, useState } from "react";
import { AwardCard } from "../../../../Components/AwardCard/AwardCard";
import BlockHeader from "../../../../Components/BlockHeader/BlockHeader";
import "./style.css";

function Awards(obj) {
  const [btnText, setBtnText] = useState(false);

  useEffect(() => {
    if (obj.prop.items && obj.prop.items.length > 4) {
      setBtnText("Все награды");
    }
  }, [obj.prop.items]);

  return (
    <div className="awards-cont">
      <BlockHeader
        prop={{
          title: "Награды",
          btnText: btnText,
          btnLink: "/MoviePage",
        }}
      />

      <div className="awards-main">
        {obj.prop.items.slice(0, 4).map((el, index) => (
          <AwardCard key={index} prop={el} />
        ))}
      </div>
    </div>
  );
}

export default Awards;
