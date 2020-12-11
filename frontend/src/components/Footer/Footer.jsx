import React from 'react';
import './Footer.css';
import { Link } from 'react-router-dom';
import InstagramIcon from '@material-ui/icons/Instagram';
import FacebookIcon from '@material-ui/icons/Facebook';

function Footer() {
  return (
    <footer className="footer-container">
      <div className="footer__logo">
        <Link to="/" style={{ textDecoration: 'none' }}>
          <div>
            <img
              className="footer__logo"
              src="https://trello-attachments.s3.amazonaws.com/5fc0f7845fca4370bc8c6bca/5fc42c268a13fa2e375e47c5/ff411b0bcf88deb3885024870d73b989/Daria.wix-2.png"
              alt=""
            />
          </div>
        </Link>
      </div>

      <div className="footer__contact">CONTACT ME</div>
      <div className="flex-spacer" />
      <div className="footer__social">
        <InstagramIcon className="social-link" />
        <FacebookIcon className="social-link" />
      </div>

    </footer>
  );
}

export default Footer;
