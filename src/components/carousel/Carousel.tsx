import React from 'react';
import Carousel from 'react-elastic-carousel';
import './Carousel.css'

function CarouselComponent (){
    var items = [
    
          {img : "https://i.imgur.com/vOXM5lK.png?1"},    
         { img : "https://i.imgur.com/2gCRABX.png"},
         { img : "https://i.imgur.com/1PYjUFo.png"},
         { img :"https://i.imgur.com/f509CGu.png"}
    ]
    

    return (
        <Carousel isRTL={false} className='img'>
            {

                items.map(item => (
                    <>
                    <img src={item.img} alt= "Item" className='imagens-carousel'/>
                    </>
                ))
            }
            </Carousel>
        
    )
}

export default CarouselComponent