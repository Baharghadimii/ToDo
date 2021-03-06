import React, { useState, useEffect } from 'react';
import './Home.scss';
import AOS from 'aos';
import 'aos/dist/aos.css'; // You can also use <link> for styles
// ..
AOS.init();

export default function Home(props) {
  const [assetOne, setAssetOne] = useState(false);
  const [assetTwo, setAssetTwo] = useState(false);
  const [assetThree, setAssetThree] = useState(false);
  const [mainText, setMainText] = useState(false)

  useEffect(() => {
    setTimeout(() => {
      setAssetOne(true);
    }, 500)
    setTimeout(() => {
      setAssetTwo(true);
      setMainText(true);
    }, 700)
    setTimeout(() => {
      setAssetThree(true);
    }, 900)
  }, [])
  return (
    <div style={{ marginTop: '2%', display: 'flex', flexDirection: 'row', width: '100%', height: '80rem' }}>
      <div style={{ width: '55%' }}>
        <img
          alt='background'
          data-aos='fade-right'
          style={{ width: '100%', height: '40rem' }}
          src='https://smarttodo.s3.ca-central-1.amazonaws.com/Asset+1%403x.png'></img>
        {assetOne &&
          <img
            alt='background'
            data-aos='fade-right'
            style={{ marginTop: '8rem', marginLeft: '-15rem', width: '25%', height: '20rem' }}
            src="https://smarttodo.s3.ca-central-1.amazonaws.com/Asset+1%403x+(2).png"></img>
        }
        {assetTwo && <img
          alt='background'
          data-aos='fade-right'
          style={{ marginLeft: '-41rem', width: '80%', height: '30rem' }}
          src="https://smarttodo.s3.ca-central-1.amazonaws.com/Asset+1%403x+(3).png" />}
        {assetThree && <img
          alt='background'
          data-aos='fade-right'
          style={{ marginTop: '3.5rem', marginLeft: '-45rem', width: '45%', height: '25rem' }}
          src="https://smarttodo.s3.ca-central-1.amazonaws.com/Asset+2%403x.png" />}

      </div>
      {mainText &&
        <div style={{ textAlign: 'center', marginTop: '5rem', marginLeft: '-5rem' }}>
          <div data-aos="fade-left" ><span style={{ paddingTop: '5rem', fontSize: '4rem' }}><strong>Organzie your free time</strong></span><br />
            <span style={{ fontSize: '30px' }}> with Smart ToDo.</span>
          </div>
          <button
            className="sgn-btn"
            onClick={props.showSignUp}>Sign Up</button>
        </div>
      }
    </div>
  )
}
