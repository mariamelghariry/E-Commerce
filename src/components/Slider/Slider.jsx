import React from 'react'
import Slider from 'react-slick'
import imgSlider1 from '../../assets/img/img1.jpg'
import imgSlider2 from '../../assets/img/img2.jpg'
import imgSlider3 from '../../assets/img/img3.jpg'
import imgSlider4 from '../../assets/img/img4.jpg'


export default function HomeSlider() {
  var settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1
  };

  return (
    <div className='row justify-content-center my-4'>
      <div className="col-md-3 ">
        <Slider {...settings}>
        <img src={imgSlider1} className='w-100 ' alt="imgslider" height={400} />
        <img src={imgSlider2} className='w-100' alt="imgslider" height={400} />
        
        </Slider>

      </div>
      <div className="col-md-3">
        <img src={imgSlider3} className='w-100' alt="imgslider" height={200} />
        <img src={imgSlider4} className='w-100' alt="imgslider" height={200} />

      </div>
    </div>
  )
}
