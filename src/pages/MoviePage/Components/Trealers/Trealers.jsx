import "./style.css";
import BlockHeader from "../../../../Components/BlockHeader/BlockHeader";

function Trealers( obj ) {   
  return (
    <div className="trealers-cont">
      <BlockHeader prop={{title: "Трейлеры фильма", btnText: "Все трейлеры", btnLink: "/MoviePage"}}/>

      <div className="trealers-trealer">
        <iframe
          width="100%"
          height="auto"
          src="https://www.youtube.com/embed/7cl5x78F6-E?si=Ll7_H2sEDXLlveBw"
          title="YouTube video player"
          frameBorder="0"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
          referrerPolicy="strict-origin-when-cross-origin"
          allowFullScreen
        ></iframe>
      </div>

      <div className="trealers-info">
        <div className="trealers-info-cont">
          <div className="trealers-info-name">{obj.prop.name}</div>

          <div className="trealers-info-socail_networks">
            <div>
              <img src=".././img/Main/vk_social_media_icon.svg" alt="VK" />
            </div>
            <div>
              <img
                src=".././img/Main/instagram_social_media_icon.svg"
                alt="Instagram"
              />
            </div>
            <div>
              <img
                src=".././img/Main/facebook_social_media_icon.svg"
                alt="Facebook"
              />
            </div>
            <div>
              <img
                src=".././img/Main/twitter_social_media_icon.svg"
                alt="Twitter(X)"
              />
            </div>
          </div>
        </div>

        <div className="trealers-info-likes">
          <div className="trealers-info-like">
            <div className="trealers-info-like-img">
              <img src=".././img/Main/like.svg" alt="like" />
            </div>
            <div className="trealers-info-like-count">
              426
            </div>
          </div>
          <div className="trealers-info-dislike">
            <div className="trealers-info-dislike-img">
              <img src=".././img/Main/dislike.svg" alt="dislike" />
            </div>
            <div className="trealers-info-dislike-count">
              74
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Trealers;
