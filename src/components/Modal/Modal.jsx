import { createPortal } from "react-dom";
import PropTypes from "prop-types";
import { useEffect } from "react";

const modalRoot = document.querySelector('#modal-root')

const Modal = ({onClose, children}) => {
    useEffect(() => {
        const handleKeyDown = event => {
            console.log(event.code);
            if (event.code === 'Escape') {
                onClose();
            }
        }
        window.addEventListener('keydown', handleKeyDown);

        return () => {
            window.removeEventListener('keydown', handleKeyDown);
        }
    }, [onClose]);

    const handleBackdropClick = event => {
        if (event.target === event.currentTarget) {
            onClose();
        }
    };

    return createPortal(
        <div className="Overlay" onClick={handleBackdropClick}>
            <div className="Modal">{children}</div>
        </div>,
        modalRoot
    )
}

Modal.propTypes = {
    onClose: PropTypes.func.isRequired,
};

export default Modal;