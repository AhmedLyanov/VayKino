import React, { useState, useRef, useEffect } from 'react';
import './style.css';
// import { v4 as uuidv4 } from 'uuid';
import MovieCard from '../MovieCard/MovieCard';

export const Slider = ({ items }) => {
    const [currentIndex, setCurrentIndex] = useState(0);
    const sliderRef = useRef(null);
    const [slideWidth, setSlideWidth] = useState(0);
    const [visibleSlides, setVisibleSlides] = useState(1); // Количество видимых слайдов
    const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);

    const gap = 20; // Изменяем gap на 20px


    useEffect(() => {
       const handleResize = () => {
            setIsMobile(window.innerWidth <= 768);
           updateSlider();
        };
      updateSlider()
        window.addEventListener('resize', handleResize);
  
      return () => {
        window.removeEventListener('resize', handleResize);
      };
    }, []);


    const updateSlider = () => {
        if (sliderRef.current) {
             const sliderWidth = sliderRef.current.offsetWidth;
            let slidesCount;
            if (sliderWidth > 768) {
              slidesCount = 3;
            } else if (sliderWidth > 480) {
             slidesCount = 2;
            } else {
              slidesCount = 1;
            }
            setVisibleSlides(slidesCount)
           const newSlideWidth = (sliderWidth - (slidesCount - 1) * gap) / slidesCount;
         setSlideWidth(newSlideWidth);
        }
    };

    const totalPages = Math.ceil(items.length / visibleSlides);

    const handlePrev = () => {
      setCurrentIndex((prevIndex) => (prevIndex > 0 ? prevIndex - 1 : totalPages - 1));
    };

    const handleNext = () => {
      setCurrentIndex((prevIndex) => (prevIndex < totalPages - 1 ? prevIndex + 1 : 0));
    };

    const calculateTransform = () => {
        return -(currentIndex * (slideWidth + gap));
    };
  

    return (
        <div className="slider-container">
            <div className="slider-wrapper" ref={sliderRef}>
                <div
                  className="slider"
                    style={{ transform: `translateX(${calculateTransform()}px)` }}
                >
                    {items.map((el, index) => (
                        <div
                            key={index}
                            className="slide"
                            style={{ width: slideWidth, minWidth: slideWidth }}
                        >
                            <MovieCard
                                key={index}
                                prop={{
                                    rating: null,
                                    poster: el.posterUrl,
                                    name: el.nameRu || el.nameEn,
                                    genres: null,
                                    relationType: el.relationType,
                                }}
                            />
                        </div>
                    ))}
                </div>
            </div>
          {!isMobile &&  <div className="slider-controls">
                <button className="slider-button prev" onClick={handlePrev}>
                    &larr;
                </button>
                <span className="slider-pagination">
                    {currentIndex + 1} / {totalPages}
                </span>
                <button className="slider-button next" onClick={handleNext}>
                    &rarr;
                </button>
            </div>}
        </div>
    );
};