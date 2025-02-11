import "./style.css"
import '../Skeleton/Skeleton.css'
import { useNavigate } from "react-router-dom"
import { useState } from "react"
import { SearchModal } from "../SearchModal/SearchModal";

function Header(){
    const navigate = useNavigate();
    const [open, setOpen] = useState(false);

    const handleClose = () => {
        setOpen(false);
    };

    const handleOpen = () => {
        setOpen(true);
    };
    
    return(
        <header>
        <div className="header-cont">
            <div className="header-left">
                <div className="header-logo" onClick={() => navigate('/')}>
                    <div className="header-logo-img">
                        <img src="img/Components/logo.svg" alt="" />
                    </div>
    
                    <div className="header-logo-title">Kino<mark>area</mark></div>
                </div>
    
                <div className="header-social_networks">
                    <div className="header-social_network"><img src="img/Components/vk_social_media_icon.svg" alt="" /></div>
                    <div className="header-social_network"><img src="img/Components/instagram_social_media_icon.svg" alt="" /></div>
                    <div className="header-social_network"><img src="img/Components/facebook_social_media_icon.svg" alt="" /></div>
                    <div className="header-social_network"><img src="img/Components/twitter_social_media_icon.svg" alt="" /></div>
                </div>
            </div>
    
            <div className="header-center">
                <nav>
                    <div className="header-nav-div">Афиша</div>
                    <div className="header-nav-div">Медиа</div>
                    <div className="header-nav-div">Фильмы</div>
                    <div className="header-nav-div">Актеры</div>
                    <div className="header-nav-div">Новости</div>
                    <div className="header-nav-div">Подборки</div>
                    <div className="header-nav-div">Категории</div>
                </nav>
            </div>
            
            <div className="header-right">
                <div className="header-search_btn" onClick={handleOpen}>
                    <img src="img/Components/search.svg" alt="" />
                </div>
                <div className="header-login">Войти</div>
            </div>
        </div>

        <SearchModal isOpen={open} onClose={handleClose} />
    </header>
    )
}

export default Header