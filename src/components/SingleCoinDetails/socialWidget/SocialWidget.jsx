import React, { useState } from 'react';
import './socialwidget.css';
import { IoLogoTwitter } from "react-icons/io";
import { IoLogoGithub } from "react-icons/io5";
import { IoLogoFacebook } from "react-icons/io5";

function SocialWidget(props) {

  const { links } = props.data;
  const [isShowMore, setIsShowMore] = useState(false);

  return (
    <>
      <div className={`info-container ${isShowMore ? '' : 'sm'}`}>
        <h4>Info</h4>

        <div className='coin-website d-flex mb-2 mt-3'>
          <div className='title'> Website</div>
          <div className='coin-website-tab d-flex gap-2'>
            <a href={links?.homepage[0]} target='_blank' rel="noreferrer">
              <div> bitcoin.org </div>
            </a>
            <div> whitepaper </div>
          </div>
        </div>

        <div className='coin-website d-flex mb-2'>
          <div className='title'> Community</div>
          <div className='coin-website-tab d-flex gap-2'>
            <a href={`https://twitter.com/${links?.twitter_screen_name}`} target='_blank' rel="noreferrer">
              <div> <IoLogoTwitter /> Twitter </div>
            </a>
            <a href={`https://www.facebook.com/${links?.facebook_username}`} target='_blank' rel="noreferrer">
              <div> <IoLogoFacebook /> Facebook </div>
            </a>
          </div>
        </div>

        <div className='coin-website d-flex mb-2'>
          <div className='title'> Search on</div>
          <div className='coin-website-tab d-flex gap-2'>
            <a href={`https://twitter.com/${links?.twitter_screen_name}`} target='_blank' rel="noreferrer">

              <div> <IoLogoTwitter /> Twitter </div>
            </a>
          </div>
        </div>

        <div className='coin-website d-flex mb-2'>
          <div className='title'> Source Code</div>
          <div className='coin-website-tab d-flex gap-2'>
            <a href={links?.repos_url?.github[0]} target='_blank' rel="noreferrer">
              <div> <IoLogoGithub /> Github </div>
            </a>
          </div>
        </div>
      </div>
      <div className='show-more-container' onClick={() => setIsShowMore(!isShowMore)}>
        {isShowMore ? "Show less" : "Show more"}
      </div>
    </>
  )
}

export default SocialWidget