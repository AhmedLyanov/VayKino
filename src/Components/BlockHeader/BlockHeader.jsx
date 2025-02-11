import "./style.css";
import { useNavigate } from "react-router-dom";

function BlockHeader(obj) {
  const navigate = useNavigate();
  return (
    <div className="block_header">
      <div className="block_header-title">{obj.prop.title}</div>

      {obj.prop.btnText && obj.prop.btnLink? <div
        className="block_header-btn"
        onClick={() => {
          navigate(`${obj.prop.btnLink}`);
        }}
      >
        {obj.prop.btnText} <span>→</span>
      </div> : <></>}
    </div>
  );
}

export default BlockHeader;
