import React from 'react';
import './Header.css';
import { Link } from 'react-router-dom';
import MenuIcon from '@material-ui/icons/Menu';
import Button from '@material-ui/core/Button';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';

function Header() {
  const [anchorEl, setAnchorEl] = React.useState(null);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const path = {
    stretching: '5fc37472da17ed08fdae08c3',
    pilates: '5fc375634cd4ba142ae806ec',
    yoga: '5fc3ea0d7096975798ab13b9',
  };

  return (

    <header className="header">
      <Button className="burger-btn" style={{ outlineStyle: 'none' }} aria-controls="simple-menu" aria-haspopup="true" onClick={handleClick}>
        <MenuIcon style={{ width: '100px', height: '50px', color: '#41555a87' }} />
      </Button>
      <Menu
        id="simple-menu"
        anchorEl={anchorEl}
        keepMounted
        open={Boolean(anchorEl)}
        onClose={handleClose}
        textDecoration="none"
        color="#805f4c"
      >
        <Link
          className="link"
          to={`/workouts/${path.stretching}`}
        >
          {' '}
          <MenuItem onClick={handleClose}>Stretching</MenuItem>
        </Link>
        <Link
          className="link"
          to={`/workouts/${path.pilates}`}
        >
          {' '}
          <MenuItem onClick={handleClose}>Pilates</MenuItem>
        </Link>
        <Link
          className="link"
          to={`/workouts/${path.yoga}`}
        >
          {' '}
          <MenuItem onClick={handleClose}>Yoga</MenuItem>
        </Link>
        <MenuItem onClick={handleClose}>Schedule/prices</MenuItem>
        <MenuItem onClick={handleClose}>About me</MenuItem>
      </Menu>

      <Link to="/" style={{ textDecoration: 'none' }}>
        <div>
          <img
            className="header__logo"
            src="https://trello-attachments.s3.amazonaws.com/5fc0f7845fca4370bc8c6bca/5fc42c268a13fa2e375e47c5/ff411b0bcf88deb3885024870d73b989/Daria.wix-2.png"
            alt=""
          />
        </div>
      </Link>
    </header>

  );
}

export default Header;
