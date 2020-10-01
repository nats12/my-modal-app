import React, { useState, useEffect, useReducer } from 'react';
import { Modal } from 'react-bootstrap';
import User from './models/User';
import { CustomModal } from './CustomModal'

interface IUserProfile {
    user: User
}

const BLOCK = 'BLOCK';
const SEE_AVAILABILITY = 'SEE_AVAILABILITY';
const CLOSE = 'CLOSE';
const BLOCK_CONFIRM = 'BLOCK_CONFIRM';


export const UserProfile = (props: IUserProfile) => {

    const { user } = props;
    const [showConfirmCallToAction, setshowConfirmCallToAction] = useState(true);


    const modalReducer = (state: any, action: any) => {

        switch (action.type) {
            case BLOCK:
                return {
                    heading: `Block User ${action.user.username}.`,
                    content: `Are you sure you want to block user ${action.user.username}?`,
                    confirmButtonText: 'Block',
                    confirmButtonAction: () => console.log('User blocked'),
                    show: true
                }
            case BLOCK_CONFIRM:
                setshowConfirmCallToAction(false);
                return {
                    heading: `Success - user has been blocked.`,
                    content: `User ${action.user.username} has been blocked.`,
                    confirmButtonText: '',
                    confirmButtonAction: null,
                    show: true
                }
            case SEE_AVAILABILITY:
                return {
                    heading: `See ${action.user.username}'s Availability`,
                    content: `Below is ${action.user.username}'s availability. Select a time and date that works for you.`,
                    confirmButtonText: 'Request Session',
                    confirmButtonAction: () => console.log('Session(s) requested.'),
                    show: true
                }
            case CLOSE:
                return {
                    heading: '',
                    content: '',
                    confirmButtonText: '',
                    confirmButtonAction: '',
                    show: false
                }

        }
    }

    const [modalState, modalDispatch] = useReducer(modalReducer, {
        heading: '',
        content: '',
        confirmButtonText: '',
        confirmButtonAction: '',
        show: false
    })



    const dispatchModalAction = (action: string) => {
        modalDispatch({
            type: action,
            user: {
                username: user.username
            }
        })
    }

    const closeModalHandler = () => {

        modalDispatch({
            type: CLOSE
        })
    }

    return (
        <>
            <h4>Username: {user.username}</h4>
            <small>{user.intro}</small>
            <button onClick={() => dispatchModalAction(BLOCK)}>Block</button>
            <button onClick={() => dispatchModalAction(SEE_AVAILABILITY)}>See Availability</button>

            <CustomModal
                showConfirmCallToAction={showConfirmCallToAction}
                show={modalState?.show}
                close={closeModalHandler}
                confirmButtonText={modalState?.confirmButtonText}
                confirmButtonAction={modalState?.confirmButtonAction}>
                <Modal.Header closeButton>
                    <Modal.Title>{modalState?.heading}</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <>
                        <p>{modalState?.content}</p>
                    </>
                </Modal.Body>
            </CustomModal>
        </>
    );
}

