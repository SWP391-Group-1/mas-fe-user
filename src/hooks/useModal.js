import {
    Button,
    Dialog,
    DialogActions,
    DialogContent,
    DialogContentText,
    DialogTitle,
} from '@mui/material'
import React, { createContext, useContext } from 'react'

const ModalContext = createContext(null)

export function ModalProvider({ children, ...props }) {
    const [isModalOpen, setIsModalOpen] = React.useState(false)

    /** @type {[ModalDataType]} */
    const [modalData, setModalData] = React.useState({
        title: '',
        content: '',
        contentSecond: '',
        buttons: [],
    })

    /**
     * @param {ModalDataType} modalData
     */
    function openModal(modalData) {
        if (modalData) {
            setModalData(modalData)
            setIsModalOpen(true)
        }
    }

    function closeModal() {
        setIsModalOpen(false)
    }

    const contextValue = {
        openModal,
        closeModal,
    }

    return (
        <ModalContext.Provider value={contextValue} {...props}>
            {children}
            <Dialog
                open={isModalOpen}
                // onClose={handleClose}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
            >
                <DialogTitle id="alert-dialog-title">
                    {modalData?.title}
                </DialogTitle>
                <DialogContent>
                    <DialogContentText id="alert-dialog-description">
                        {modalData?.content}
                    </DialogContentText>
                    <DialogContentText id="alert-dialog-description">
                        {modalData?.contentSecond}
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    {modalData?.buttons?.map((btnData, index) => (
                        <Button id={index} onClick={btnData.onClick}>
                            {btnData.text}
                        </Button>
                    ))}
                </DialogActions>
            </Dialog>
        </ModalContext.Provider>
    )
}

/** @returns {UseModalType} */
export function useModal() {
    const context = useContext(ModalContext)
    return context
}

/**
 * @typedef {{ title: string, content:string, contentSecond:str, buttons: {text: string, onClick: () => any}[] }} ModalDataType
 * @typedef {{ openModal: (modalData: ModalDataType) => any, closeModal: () => any }} UseModalType
 */
