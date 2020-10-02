import './index.css';
import { ReactComponent as ContactFormIcon } from './icons/contact-form.svg';

import React, {useState, useEffect, useRef} from 'react';
import { CSSTransition } from 'react-transition-group';


function DropDownHandler() {
  return (
    <Navbar>
      <NavItem icon={<ContactFormIcon/>} ></NavItem>
      <NavItem icon={<ContactFormIcon/>}>
        <DropDownMenu></DropDownMenu>

      </NavItem>
    </Navbar>
  );
}

function Navbar(props){
  return(
    <nav className="navbar">
      <ul className="navbar-nav"> {props.children}</ul>
    </nav>
  );
}

function NavItem(props){

  const [open, setOpen] = useState(false);

  return(
    <li className="nav-item">
      <a href="#" className="icon-button" onClick={() => setOpen(!open)}>
        {props.icon}
      </a>

      {open && props.children}
    </li>

  );
}

function DropDownMenu(){
  
  const [activeMenu, setActiveMenu] = useState('main');
  const [menuHeight, setMenuHeight] = useState(null);
  const dropdownRef = useRef(null);

  useEffect(()=>{
    setMenuHeight(dropdownRef.current?.firstChild.offsetHeight)
  }, []);

  function calcHeight(el){
    const height = el.offsetHeight;
    setMenuHeight(height);
  };

  function DropDownItem(props){
    return(
      <a href="#" className="menu-item" onClick={() => props.goToMenu && setActiveMenu(props.goToMenu)}>
        <span className="icon-button">{props.leftIcon}</span>
        {props.children}
        <span className="icon-right">{props.rightIcon}</span>
      </a>
    );
  };

  return(
    <div className="dropdown" style={{ height: menuHeight }} ref={dropdownRef}>

      <CSSTransition 
        in={activeMenu === 'main'}         
        timeout={500}
        classNames="menu-primary"
        unmountOnExit 
        onEnter={calcHeight}>
        <div className="menu">      
          <DropDownItem>My Profile</DropDownItem>
          <DropDownItem
            leftIcon={<ContactFormIcon/>}
            rightIcon="🦔"
            goToMenu="settings"> Settings </DropDownItem>

      <DropDownItem
            leftIcon="🦧"
            rightIcon="🦔"
            goToMenu="animals"> Animals </DropDownItem>


      </div>
      </CSSTransition>

      <CSSTransition 
        in={activeMenu === 'settings'}          
        timeout={500}
        classNames="menu-secondary"
        unmountOnExit
        onEnter={calcHeight}>
          
        <div className="menu">
      
      <DropDownItem goToMenu="main">Back</DropDownItem>
      <DropDownItem>Fill</DropDownItem>
      <DropDownItem>Fill</DropDownItem>
      <DropDownItem>Fill</DropDownItem>
      <DropDownItem>Fill</DropDownItem>
      <DropDownItem>Fill</DropDownItem>
      <DropDownItem>Fill</DropDownItem>
      <DropDownItem>Fill</DropDownItem>
      <DropDownItem>Fill</DropDownItem>
      
      
      </div>
      </CSSTransition>
    </div>
  );
}
export default DropDownHandler;
