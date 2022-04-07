import { Component, ReactNode, useState } from 'react';
import ReactModal from 'react-modal';


interface IPropsModal {
  isOpen: boolean,
  setIsOpen: () => void,
  children: ReactNode
}

interface IPrevProps {
  isOpen: boolean
}


const Modal = ({ isOpen, setIsOpen, children }: IPropsModal) => {  
    
  const  state = {
    modalStatus: isOpen
    }
 
  function componentDidUpdate(prevProps: IPrevProps ) {    
    if (prevProps.isOpen != isOpen) { 
      state.modalStatus =  isOpen 
    }
  } 

  const { modalStatus } = state;


  return (
    <ReactModal
      shouldCloseOnOverlayClick={!false}
      onRequestClose={setIsOpen}
      isOpen={modalStatus}
      ariaHideApp={false}
      className="modal-style"
      overlayClassName="modal-style-overlay"
      
    >
      {children}
    </ReactModal>
  );

}



export default Modal;

