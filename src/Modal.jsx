import React, { useRef, forwardRef, useImperativeHandle } from "react";
import { createPortal } from "react-dom";

const Modal = forwardRef(function Modal(
	{ handleModalStateClose, children },
	ref
) {
	const dialog = useRef();

	useImperativeHandle(ref, () => {
		return {
			open: () => {
				dialog.current.showModal();
			},
			close: () => {
				dialog.current.close();
			},
		};
	});

	return createPortal(
		<dialog ref={dialog} onClose={handleModalStateClose}>
			{children}
		</dialog>,
		document.querySelector("#modal")
	);
});

export default Modal;
