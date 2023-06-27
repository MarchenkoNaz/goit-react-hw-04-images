import React, { useEffect } from 'react'
import PropTypes from 'prop-types'
import './modal.css'

const Modal = ({ children, closeModal }) => {
	useEffect(() => {
		window.addEventListener('keydown', (e) => handleKeyPress(e));

		return () => window.removeEventListener('keydown', (e) => handleKeyPress(e));
	})

	const handleKeyPress = e => {
		if (e.key === 'Escape') {
			closeModal();
		}
	};
	return (
		<>
			<div className="backdrop" onClick={closeModal}>
				<div className="modal-image-cur">
					{children}
				</div>
			</div>
		</>
	);
}

Modal.propTypes = {
	closeModal: PropTypes.func.isRequired
}

export default Modal