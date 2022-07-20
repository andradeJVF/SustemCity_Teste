import React from 'react';
import './Carousel.css';

function CarouselComponent() {

    return (
        <>
        <div className="slider">
                <div className="slides">
                    <input type="radio" name="radio-btn" id="radio1" />
                    <input type="radio" name="radio-btn" id="radio2" />
                    <input type="radio" name="radio-btn" id="radio3" />

                    <div className="slide first">
                        <img src="https://i.imgur.com/gyppApD.jpg?2" alt="imagem 1" />
                    </div>
                    <div className="slide">
                        <img src="https://i.imgur.com/5KcZauE.jpg?1" alt="imagem 2" />
                    </div>
                    <div className="slide">
                        <img src="https://i.imgur.com/8IMX9tN.jpg?1" alt="imagem 3" />
                    </div>

                    <div className="navigation-auto">
                        <div className="auto-btn1"></div>
                        <div className="auto-btn2"></div>
                        <div className="auto-btn3"></div>
                    </div>
                </div>

                <div className="manual-navigation">
                    <label htmlFor="radio1" className="manual-btn"></label>
                    <label htmlFor="radio2" className="manual-btn"></label>
                    <label htmlFor="radio3" className="manual-btn"></label>
                </div>
            </div>
        
        </>
    )
}

export default CarouselComponent