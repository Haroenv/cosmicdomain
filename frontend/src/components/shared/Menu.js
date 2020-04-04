import React, {useState} from "react";
import {Collapse, Navbar, NavbarToggler, NavbarBrand, Nav, NavItem, NavLink, UncontrolledDropdown, DropdownToggle, DropdownMenu, DropdownItem, NavbarText} from "reactstrap";

const Menu = props => {
   const [isOpen, setIsOpen] = useState(false);

   const toggle = () => setIsOpen(!isOpen);

   return (
      <Navbar dark expand='md'>
         <NavbarBrand href='/'>
            <img src={require("../../assets/images/cosmicdomain.svg")} alt='Cosmicdomain' />
         </NavbarBrand>
         <NavbarToggler onClick={toggle} />
         <Collapse isOpen={isOpen} navbar>
            <Nav className='ml-auto' navbar>
               <NavItem>
                  <NavLink href='/'>Home</NavLink>
               </NavItem>
               <NavItem>
                  <NavLink href='/domains/'>Domains</NavLink>
               </NavItem>
               <NavItem>
                  <NavLink href='/how-it-works/'>How It Works</NavLink>
               </NavItem>
               <NavItem>
                  <NavLink href='/components/'>Components</NavLink>
               </NavItem>
            </Nav>
         </Collapse>
      </Navbar>
   );
};

export default Menu;
