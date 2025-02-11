import { useEffect, useState, useCallback } from 'react'
import BlockHeader from "../../../../Components/BlockHeader/BlockHeader";
import { sha256 } from 'js-sha256'
import './style.css'

function InMainRoles(obj){
  const [tenActors, setTenActors] = useState([])

  const compareImages = useCallback(async (leftImageUrl, rightImageUrl) => {
      try {
        const leftImage = await fetchImage(leftImageUrl);
        const rightImage = await fetchImage(rightImageUrl);
  
        const leftHash = await sha256(leftImage);
        const rightHash = await sha256(rightImage);
  
        return !(leftHash === rightHash);
      } catch (error) {
        console.error("Ошибка при сравнении изображений:", error);
        return false;
      }
    }, []);
  
  
  async function fetchImage(url) {
    try {
      const response = await fetch(url);
      if (!response.ok) {
        throw new Error(`Ошибка при загрузке изображения ${url}: ${response.status} ${response.statusText}`);
      }
      const blob = await response.blob();
      const reader = new FileReader();
      return new Promise((resolve, reject) => {
        reader.onloadend = () => resolve(reader.result);
        reader.onerror = reject;
        reader.readAsArrayBuffer(blob);
      });
    } catch (error) {
      console.error("Ошибка в fetchImage:", error);
      throw error;
    }
  }
  
  useEffect(() => {
    const fetchActors = async () => {
      if (obj) {
        let arr = [];
        const promises = obj.prop.persons
          .filter(person => person.enProfession === "actor")
          .map(async person => {
            try{
              const imagesMatch = await compareImages("https://image.openmoviedb.com/kinopoisk-st-images//actor_iphone/iphone360_253180.jpg", person.photo);
              return imagesMatch ? person : null;
            } catch (error){
              console.error("Ошибка сравнения изображений для актера:", person.name, error)
              return null;
            }
  
          });
  
        const results = await Promise.all(promises);
        arr = results.filter(person => person !== null).slice(0, 10);
  
        setTenActors(arr);
      }
    };
  
    fetchActors();
  }, [obj, compareImages]);
    
    return (
        <div className="main-content-in_main_roles-cont">
           <BlockHeader prop={{title: "В главных ролях:", btnText: "Все актёры", btnLink: "/MoviePage"}}/>

            <div className="main-content-in_main_roles-cont-main">
                {tenActors.length !== 0 ? tenActors.map((item) => (
                    <div className="main-content-in_main_roles-cont-main-actor" key={item.id}>
                        <div className="main-content_in_main_roles-cont-main-actor-cont">
                            <div className="main-content-in_main_roles-cont-main-actor-cont-img"><img src={item.photo} alt="" /></div>
                            <div className="main-content-in_main_roles-cont-main-actor-cont-ru_name">{item.name}</div>
                            <div className="main-content-in_main_roles-cont-main-actor-cont-en_name">{item.enName}</div>
                            <div className="main-content-in_main_roles-cont-main-actor-cont-role">{item.description}</div>
                        </div>
                    </div>
                )) : Array.from({ length: 10 }, (_, index) => (
                  <div className="main-content-in_main_roles-cont-main-actor" key={index}>
                        <div className="main-content_in_main_roles-cont-main-actor-cont">
                            <div className="main-content-in_main_roles-cont-main-actor-cont-img"><div className="loading" style={{ width: "100%", height: "100%" }}></div></div>
                            <div className="main-content-in_main_roles-cont-main-actor-cont-ru_name"><div className="loading" style={{ width: "200px", height: "20px" }}></div></div>
                            <div className="main-content-in_main_roles-cont-main-actor-cont-en_name"><div className="loading" style={{ width: "175px", height: "20px" }}></div></div>
                            <div className="main-content-in_main_roles-cont-main-actor-cont-role"><div className="loading" style={{ width: "150px", height: "20px" }}></div></div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    )
}

export default InMainRoles