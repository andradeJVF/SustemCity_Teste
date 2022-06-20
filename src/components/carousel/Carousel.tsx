import React from 'react';
import Carousel from 'react-elastic-carousel';
import './Carousel.css'

function CarouselComponent() {
    var items = [

        { img: "https://i.imgur.com/gyppApD.jpg/2" },
        { img: "https://i.imgur.com/5KcZauE.jpg?1" },
        { img: "https://i.imgur.com/WqYAafG.jpg?2" }
    ]


    return (
        <div className='container-carousel'>
                <Carousel isRTL={false} className='imagens-carousel'>
                    {items.map(item => (
                        <img src={item.img} alt="Item" />
                    ))}
                </Carousel>
        </div>
    )
}

export default CarouselComponent