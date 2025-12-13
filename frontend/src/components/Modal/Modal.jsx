const Modal = ({ modalEl, children }) => {
    return (
        <>
            <dialog id={modalEl} className="modal modal-top md:modal-middle">
                <div className="modal-box absolute w-full max-w-1/2 md:left-[20%]">
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
