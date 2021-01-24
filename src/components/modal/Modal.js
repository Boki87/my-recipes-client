import React from 'react'
import styled from 'styled-components'
import {AnimatePresence, motion} from 'framer-motion'

const StyledModal = styled.div`

    position: fixed;
    top: 0px;left:0px;
    width:100%;
    height:100%;
    background: rgba(0,0,0,0.6);
    z-index: 100;
    display: flex;
    overflow: auto;
    
    .modal-content {
        background: ${({theme}) => theme.bgPrimary};
        border-radius: 8px;
        margin: auto;
        justify-self: center;
    }
`

const Modal = ({show, onClose, children}) => {

    const closeHandler = (e) => {
        onClose()
    }

    return (
        <AnimatePresence>
            {show && 
            <StyledModal onClick={closeHandler}>
                
                    <motion.div
                        key='modal-content'
                        className='modal-content'
                        initial={{opacity: 0, y:-40}}
                        animate={{opacity:1, y:0}}
                        exit={{opacity: 0, y:-40}}
                        onClick={e => e.stopPropagation()}
                    >
                        {children}
                    </motion.div>    
            </StyledModal>
            }
        </AnimatePresence>        
    )
}

export default Modal
