import React from 'react';
import AOS from 'aos';
import 'aos/dist/aos.css'; // You can also use <link> for styles
// ..
AOS.init();

export default function Home() {
  return (
    <div data-aos='fade-right'>
      <img style={{ width: '60%', height: '40rem' }} src='https://smarttodolist.s3.ca-central-1.amazonaws.com/Asset+1%403x.png'></img>
    </div>
  )
}
