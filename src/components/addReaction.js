import React, { useContext, useState } from 'react';
import { Button, Form, Modal } from 'react-bootstrap';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';

import { getAutData } from '../helpers/setToken';
import ExperienceService from '../API/ExperienceService';
import ReactionService from '../API/ReactionService';
import { useFetch } from '../hooks/useFetch';


const AddReaction = ( {isVisible, setIsVidible, candidate_id, vacancy_id} ) => {
    const [isAuth, authData] = getAutData()
    const [reaction, setReaction] = useState({
        status: "NVD",
        comment: "",
        candidate: parseInt(candidate_id),
        vacancy: parseInt(vacancy_id)
    })
    
    const [fetchReactionCreate, isReactionCreateLoading, reactionCreateErrors] = useFetch(async () => {
        if (isAuth && authData.account_type === 'candidate') {
            const response = await ReactionService.createReaction(reaction)
            // setExperience(response.data)
            setIsVidible(false)
        }
    })

    const sendData = () => {
        fetchReactionCreate()
    }

    const handleClose = () => setIsVidible(false);

    return (
        <>
            <Modal show={isVisible} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Написание отклика</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form>
                        <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                            <Form.Label>Комментарий</Form.Label>
                            <Form.Control
                                type="email"
                                placeholder="Хочу у вас работать"
                                autoFocus
                                value={reaction.comment}
                                onChange={(e) => { setReaction({ ...reaction, comment: e.target.value }) }}
                            />
                        </Form.Group>
                    </Form>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="primary" onClick={sendData}>
                        Отправить отклик
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    )
}

export default AddReaction