import React, {Fragment, useRef} from 'react';
import {Container, Navbar} from "react-bootstrap";
import {AiOutlineCheckCircle, AiOutlineEdit, AiOutlineLogout, AiOutlineMenuUnfold, AiOutlineUser} from "react-icons/ai";
import {NavLink} from "react-router-dom";
import {RiDashboardLine} from "react-icons/ri";
import {BsListNested} from "react-icons/bs";
import {MdOutlineCancelPresentation, MdOutlineFlightClass} from "react-icons/md";

import logo from "../../assets/logo.png"
import {getUserDetails, removeSessions} from "../../helper/SessionHelper.js";

const MasterLayout = (props) => {

    let contentRef,sideNavRef = useRef()

    const onLogout = () => {
        removeSessions()
    }

    const MenuBarClickHandler = () => {
        let sideNav = sideNavRef;
        let content = contentRef;
        if (sideNav.classList.contains("side-nav-open")) {
            sideNav.classList.add("side-nav-close");
            sideNav.classList.remove("side-nav-open");
            content.classList.add("content-expand");
            content.classList.remove("content");
        } else {
            sideNav.classList.remove("side-nav-close");
            sideNav.classList.add("side-nav-open");
            content.classList.remove("content-expand");
            content.classList.add("content");
        }
    };
    const data = getUserDetails()
    return (
        <Fragment>
            <Navbar className="fixed-top px-0 shadow-sm bg-white">
                <Container fluid={true}>
                    <Navbar.Brand>
                        <a className="icon-nav m-0 h5" onClick={MenuBarClickHandler}><AiOutlineMenuUnfold/></a>
                        <img className="nav-logo mx-2" src={logo} alt="logo" />
                    </Navbar.Brand>

                    <div className="float-right h-auto d-flex">
                        <div className="user-dropdown">
                            <img className="icon-nav-img icon-nav" src={data['photo']} alt="" />
                            <div className="user-dropdown-content">
                                <div className="mt-4 text-center">
                                    <img className="icon-nav-img" src={data['photo']} alt="" />
                                    <h6 className='fw-semibold'>{data.firstName}</h6>
                                    <hr className="user-dropdown-divider p-0" />
                                </div>
                                <NavLink to='/profile' className="side-bar-item">
                                    <AiOutlineUser className="side-bar-item-icon" />
                                    <span className="side-bar-item-caption">Profile</span>
                                </NavLink>
                                <a onClick={onLogout} className='side-bar-item'>
                                    <AiOutlineLogout className='side-bar-item-icon' />
                                    <span className='side-bar-item-caption'>Logout</span>
                                </a>
                            </div>
                        </div>
                    </div>
                </Container>
            </Navbar>

            <div ref={(div) =>{sideNavRef=div}} className='side-nav-open'>

                <NavLink className={(navData) => navData.isActive ? "side-bar-item-active side-bar-item mt-2 px-3" : "side-bar-item mt-2 px-3"} to='/'>
                    <RiDashboardLine className='side-bar-item-icon' />
                    <span className='side-bar-item-caption'>Dashboard</span>
                </NavLink>

                <NavLink className={(navData) => navData.isActive ? "side-bar-item-active side-bar-item mt-2 px-3" : "side-bar-item mt-2 px-3"} to='/create'>
                    <AiOutlineEdit className='side-bar-item-icon' />
                    <span className='side-bar-item-caption'>Create New</span>
                </NavLink>

                <NavLink className={(navData) => navData.isActive ? "side-bar-item-active side-bar-item mt-2 px-3" : "side-bar-item mt-2 px-3"} to='/new'>
                    <BsListNested className='side-bar-item-icon' />
                    <span className='side-bar-item-caption'>New Task</span>
                </NavLink>

                <NavLink className={(navData) => navData.isActive ? "side-bar-item-active side-bar-item mt-2 px-3" : "side-bar-item mt-2 px-3"} to='/progress'>
                    <MdOutlineFlightClass className='side-bar-item-icon' />
                    <span className='side-bar-item-caption'>In Progress</span>
                </NavLink>

                <NavLink className={(navData) => navData.isActive ? "side-bar-item-active side-bar-item mt-2 px-3" : "side-bar-item mt-2 px-3"} to='/completed'>
                    <AiOutlineCheckCircle className='side-bar-item-icon' />
                    <span className='side-bar-item-caption'>Completed</span>
                </NavLink>

                <NavLink className={(navData) => navData.isActive ? "side-bar-item-active side-bar-item mt-2 px-3" : "side-bar-item mt-2 px-3"} to='/canceled'>
                    <MdOutlineCancelPresentation className='side-bar-item-icon' />
                    <span className='side-bar-item-caption'>Canceled</span>
                </NavLink>

            </div>

            <div ref={(div) => contentRef = div} className="content">
                {props.children}
            </div>

        </Fragment>
    );
};

export default MasterLayout;