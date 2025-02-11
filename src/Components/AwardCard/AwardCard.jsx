import "./style.css";

export const AwardCard = (obj) => {
    const currentAward = obj.prop
  return (
    <div className="award_card">
      <div className="award_card-left">
        <div className="award_card-img">
          <img src={currentAward.imageUrl} alt="" />
        </div>
      </div>
      <div className="award_card-right">
        <div className="award_card-name">{currentAward.name}</div>
        <div className="award_card-nominationName">{currentAward.nominationName}</div>
        <div className="award_card-year">{currentAward.year}</div>
      </div>
    </div>
  );
};
