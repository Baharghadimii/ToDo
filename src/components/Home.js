import React, { useState, useEffect } from 'react';
import AOS from 'aos';
import 'aos/dist/aos.css'; // You can also use <link> for styles
// ..
AOS.init();

export default function Home() {
  const [showVase, setShowVase] = useState(false);

  useEffect(() => {
    setTimeout(() => {
      setShowVase(true);
    }, 700)
  }, [])
  return (
    <div data-aos='fade-right'>
      <img style={{ width: '60%', height: '40rem' }} src='https://smarttodolist.s3.ca-central-1.amazonaws.com/Asset+1%403x.png'></img>
      {showVase &&
        <img data-aos='fade-right' style={{ marginTop: '17rem', marginLeft: '-18rem', width: '15%', height: '20rem' }} src="https://smarttodolist.s3.ca-central-1.amazonaws.com/Asset+1%403x+(2).png"></img>
      }
    </div>
  )
}
