import "./style.css"
import '../Skeleton/Skeleton.css'
import { Link } from "react-router-dom"

function Footer(){
    return(
        <footer>
        <div className="main-content-email_mailing">
            <div className="main-content-email_mailing-img">
                <img src="../img/Components/email_mailing.jpg" alt="" />
                
            </div>

            <div className="main-content-email_mailing-blue">
                <div className="main-content-email_mailing-cont">
                    <div className="main-content-email_mailing-cont-logo">
                        <div className="main-content-email_mailing-cont-logo-img">
                            <img src="../img/Components/logo.svg" alt="" />
                        </div>
                        <div className="main-content-email_mailing-cont-logo-title">Kinoarea</div>
                    </div>

                    <div className="main-content-email_mailing-cont-title">Подпишитесь на E-mail рассылку</div>

                    <div className="main-content-email_mailing-cont-discription">Если хотиет быть в курсе последних новостей и новинок кино - заполните форму ниже и оформите бесплатную E-mail рассылку! </div>

                    <form className="main-content-email_mailing-cont-form">
                        <div className="main-content-email_mailing-cont-form-cont">
                            <input className="main-content-email_mailing-cont-form-input_text" type="email" placeholder="Введите свой E-mail адрес" required />
                            <input className="main-content-email_mailing-cont-form-input_submit" type="submit" value="Подписаться" />
                        </div>
                        <label>
                            <input className="main-content-email_mailing-cont-form-input_checkbox" type="checkbox" id="" defaultChecked/>
                            <div className="main-content-email_mailing-cont-form-input_checkbox-txt">Соглашаюсь на условия <Link to="">политики конфиденциальности</Link></div>
                        </label>
                    </form>
                </div>
            </div>

            
        </div>

        <div className="footer-cont">
            <div className="footer-social_networks">
                <div className="footer-social_networks-social_network"><img src="../img/Components/vk_social_media_icon.svg" alt="" /></div>
                <div className="footer-social_networks-social_network"><img src="../img/Components/instagram_social_media_icon.svg" alt="" /></div>
                <div className="footer-social_networks-social_network"><img src="../img/Components/facebook_social_media_icon.svg" alt="" /></div>
                <div className="footer-social_networks-social_network"><img src="../img/Components/twitter_social_media_icon.svg" alt="" /></div>
                <div className="footer-social_networks-social_network"><img src="../img/Components/youtube_social_media_icon.svg" alt="" /></div>
            </div>
    
            <div className="footer-nav">
                <div className="footer-nav-div">Афиша</div>
                <div className="footer-nav-div">Новости</div>
                <div className="footer-nav-div">Персоны</div>
                <div className="footer-nav-div">Рейтинги</div>
                <div className="footer-nav-div">Рецензии</div>
                <div className="footer-nav-div">Каталог фильмов</div>
            </div>
    
            <div className="footer-all_rights">
                2020 © Kinoarea.  Все права защищены
            </div>
    
            <div className="footer-privacy_policy">
                Политика конфиденциальности
            </div>
        </div>
    </footer>
    )
}

export default Footer