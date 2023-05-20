import React, { useState } from 'react'
import './navigation.css';
import Form from 'react-bootstrap/Form';
import { useDispatch, useSelector } from 'react-redux';
import { updateCurrency, currentMode, toggleMode } from '../../features/coinSlice';
import { BsFillMoonStarsFill } from "react-icons/bs";
import { ImSun } from "react-icons/im";
import { useNavigate } from 'react-router-dom';
import { GoThreeBars } from "react-icons/go";
import Offcanvas from 'react-bootstrap/Offcanvas';
import Nav from 'react-bootstrap/Nav';
import { AiOutlineClose } from "react-icons/ai";


function Navigation() {

  const defaultCurrency = useSelector(state => state.coins.currentCurrency)
  const mode = useSelector(currentMode);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [show, setShow] = useState(false);


  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);


  const handleChange = (e) => {
    const currentValue = e.target.value;
    dispatch(updateCurrency(currentValue))
  };


  const toggleUserMode = () => {
    dispatch(toggleMode());
  }

  return (
    <div className='navbar-section'>

      <div className='logo-section' onClick={() => navigate('/')}>
        <h3> CryptoTrade</h3>
      </div>

      <div className='menu-toggle-btn' onClick={handleShow}>
        <GoThreeBars size={'1.5rem'} />
      </div>

      <div className='nav-options'>
        <div className='currency'>
          <Form.Select size="sm" onChange={handleChange} defaultValue={defaultCurrency} className='drop-down-menu'>
            <option value="usd" > USD </option>
            <option value="lkr"> LKR </option>
          </Form.Select>
        </div>

        <div className='divider'> </div>
        <div className='language'>
          ENG
        </div>

        <div className='divider'> </div>

        <div className='togglemode' onClick={toggleUserMode}>
          {
            mode === 'dark' ?
              <BsFillMoonStarsFill style={{ color: '#fcd535' }} /> :
              <ImSun style={{ color: '#222' }} />
          }
        </div>

      </div>
      <Offcanvas show={show} onHide={handleClose} placement='end' className='w-100 offcanvas-content'>
        <Offcanvas.Header>
          <Offcanvas.Title>CryptoTrade</Offcanvas.Title>
          <AiOutlineClose fontSize={'1.4rem'} onClick={handleClose} cursor={'pointer'} />
        </Offcanvas.Header>
        <Offcanvas.Body>
          <Nav className="canvas-nav d-flex align-items-center justify-content-between">
            <div className='compartment'>
              ENG
            </div>
            <div className='compartment'>
              <Form.Select size="md" onChange={handleChange} defaultValue={defaultCurrency} className='custom-select'>
                <option value="usd" > USD </option>
                <option value="lkr"> LKR </option>
              </Form.Select>
            </div>
            <div className='compartment'>
              <div className='togglemode' onClick={toggleUserMode}>
                {
                  mode === 'dark' ?
                    <BsFillMoonStarsFill style={{ color: '#fcd535' }} /> :
                    <ImSun style={{ color: '#fff' }} />
                }
              </div>
            </div>
          </Nav>
        </Offcanvas.Body>
      </Offcanvas>
    </div>
  )
}

export default Navigation;