const Modal = ({ modalEl, children }) => {
    return (
        <>
            <dialog id={modalEl} className="modal">
                <div className="modal-box">
                    {children}
                    <div className="modal-action">
                        <form method="dialog">
                            {/* if there is a button in form, it will close the modal */}
                            <button className="btn">Close</button>
                        </form>
                    </div>
                </div>
            </dialog>
        </>
    );
};

export default Modal;
