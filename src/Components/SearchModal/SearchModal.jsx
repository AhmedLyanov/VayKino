import "./style.css";
import { useNavigate } from "react-router-dom";
import { useEffect, useRef } from "react";

export const SearchModal = ({ isOpen, onClose }) => {
  const navigate = useNavigate();
  const modalContainerRef = useRef(null);
  const modalRef = useRef(null);

  useEffect(() => {
    if (isOpen) {
       const scrollbarWidth = window.innerWidth - document.documentElement.clientWidth;
        document.body.style.paddingRight = `${scrollbarWidth}px`;
        document.body.style.overflow = 'hidden';
        if(document.body.querySelector(".bg-joker")){
          document.querySelector(".bg-joker").style.width = `calc(100% - ${scrollbarWidth}px)`
        }

        if(document.body.querySelector(".bg-movie_cadr")){
          document.querySelector(".bg-movie_cadr").style.width = `calc(100% - ${scrollbarWidth}px)`
        }

        if (modalRef.current && modalContainerRef.current) {
           setTimeout(() => {
             modalContainerRef.current.classList.add("active");
             modalRef.current.classList.add("active");
           }, 10);
       }
    } else {
        document.body.style.paddingRight = "0";
        document.body.style.overflow = 'auto';
        if(document.body.querySelector(".bg-movie_cadr")){
          document.body.querySelector(".bg-movie_cadr").style.width = "100%"
        }

        if(document.body.querySelector(".bg-joker")){
          document.body.querySelector(".bg-joker").style.width = "100%"
        }
       if (modalContainerRef.current){
           modalContainerRef.current.classList.remove("active");
           modalRef.current.classList.remove("active");
       }
    }
  }, [isOpen]);


  if (!isOpen) return null;

  const handleClick = (e) => {
    e.preventDefault();
    e.stopPropagation();
  };

  const logoAction = () => {
    navigate("/")
    onClose()
  }

  return (
    <div ref={modalRef} className="modal" onClick={onClose}>
      <div ref={modalContainerRef} onClick={(e) => handleClick(e)} className="modal-container">
        <div className="modal-logo" onClick={logoAction}>
          <div className="modal-logo-img">
            <img src="img/Components/logo.svg" alt="" />
          </div>

          <div className="modal-logo-title">
            Kino<mark>area</mark>
          </div>
        </div>

        <div className="modal-input">

        </div>
      </div>
    </div>
  );
};
