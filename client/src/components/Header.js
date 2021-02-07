import React, { useState } from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'

import '../styles/Header.css'
import Modal from './Modal'
import AuthForm from './AuthForm'
import RegisterForm from './RegisterForm'
import home_icon from '../images/icons/home_page.svg'
import profile_logo from '../images/icons/profile_icon.svg'

const Header = (props) => {
    const [isModalOpen, setIsModalOpen] = useState(false);

    const renderContent = () => {
        switch(props.user){
            case null:
                return;
            case "":
                return (
                    <>
                        <div className="sign-in__btn header__button"> 
                            <button onClick={() => setIsModalOpen(!isModalOpen) }>Sign in</button>
                        </div>
                        <div className="join-free__btn header__button"> 
                            <button onClick={() => setIsModalOpen(!isModalOpen) }>Join free</button>
                        </div>
                    </>
                );
            default:
                return (
                    <div className="header__profile--logo">
                        <Link to={`/profile/${props.user._id}`}>
                            <img src={profile_logo} alt="user profile logo"/>
                        </Link>
                    </div>
                );
        }
    }

    return (
        <header>
            <div className="header__homepage">
                <Link to="/">
                    <img src={home_icon} alt="home" />
                </Link>
            </div>
            <div className="header__right-side">
                {renderContent()}
            </div>
            <Modal isOverflowExit="false" isActive={isModalOpen} isActiveChange={(a) => setIsModalOpen(a)}>
                <RegisterForm />
            </Modal>
        </header>
    );
}

const mapStateToProps = state => {
    return { user: state.currentUser }
}

export default connect(mapStateToProps)(Header);