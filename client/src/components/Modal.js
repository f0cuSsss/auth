import React from 'react'
import ReactDOM from 'react-dom'

import '../styles/Modal.css'

const Modal = props => {
    return ReactDOM.createPortal(
        <div 
            className={`modal ${props.isActive ? 'active' : '' }`}
            onClick={ props.isOverflowExit ? 
                () => props.isActiveChange(false) : () => {} }
        >
            <div className="modal-child-wrapper" onClick={() => props.isActiveChange(false) }>
                <div onClick={e => e.stopPropagation()} className="modal-inner">
                    <div className="modal-btn-close unselectable">
                        X
                    </div>
                    {props.children}
                </div>
            </div>
        </div>,
        document.querySelector('body')
    );
}

export default Modal;
