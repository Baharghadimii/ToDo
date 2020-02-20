import React, { useState, useEffect } from 'react';
import AOS from 'aos';
import 'aos/dist/aos.css'; // You can also use <link> for styles
// ..
AOS.init();

export default function Home() {
  const [showVase, setShowVase] = useState(false);
  const [showList, setShowList] = useState(false);
  const [showGirl, setShowGirl] = useState(false);

  useEffect(() => {
    setTimeout(() => {
      setShowVase(true);
    }, 500)
    setTimeout(() => {
      setShowList(true);
    }, 700)
    setTimeout(() => {
      setShowGirl(true);
    }, 900)
  }, [])
  return (
    <div data-aos='fade-right'>
      <img style={{ width: '60%', height: '40rem' }} src='https://smarttodolist.s3.ca-central-1.amazonaws.com/Asset+1%403x.png'></img>
      {showVase &&
        <img data-aos='fade-right' style={{ marginTop: '8rem', marginLeft: '-18rem', width: '15%', height: '20rem' }} src="https://smarttodolist.s3.ca-central-1.amazonaws.com/Asset+1%403x+(2).png"></img>
      }
      {showList && <img data-aos='fade-right' style={{ marginLeft: '-40rem', width: '40%', height: '30rem' }} src="https://smarttodolist.s3.ca-central-1.amazonaws.com/Asset+1%403x+(3).png" />}
      {showGirl && <img data-aos='fade-right' style={{ marginTop: '3.5rem', marginLeft: '-45rem', width: '25%', height: '25rem' }} src="https://smarttodolist.s3.ca-central-1.amazonaws.com/Asset+2%403x.png" />}
    </div>
  )
}
