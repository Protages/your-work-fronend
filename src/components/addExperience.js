import React, { useContext, useState } from 'react';
import { Button, Form, Modal } from 'react-bootstrap';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';

import { getAutData } from '../helpers/setToken';
import ExperienceService from '../API/ExperienceService';
import { useFetch } from '../hooks/useFetch';

const AddExperience = ( {isVisible, setIsVidible} ) => {
    const [isAuth, authData] = getAutData()
    const [experience, setExperience] = useState({
        company: "", position: "", start: "",
         description: "", candidate: parseInt(authData.related_obj_id)
    })
    
    const [fetchExperienceCreate, isExperienceCreateLoading, experienceCreateErrors] = useFetch(async () => {
        if (isAuth && authData.account_type === 'candidate') {
            // setExperience({...experience, candidate: parseInt(authData.related_obj_id) })
            const response = await ExperienceService.postExperience(experience)
            // setExperience(response.data)
            setIsVidible(false)
        }
    })

    const sendData = () => {
        fetchExperienceCreate()
    }

    const handleClose = () => setIsVidible(false);

    return (
        <>
            <Modal show={isVisible} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Добовление опыта</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form>
                        <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                            <Form.Label>Название компании</Form.Label>
                            <Form.Control
                                type="email"
                                placeholder="name@example.com"
                                autoFocus
                                value={experience.company}
                                onChange={(e) => { setExperience({ ...experience, company: e.target.value }) }}
                            />
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="exampleForm.ControlInput2">
                            <Form.Label>Позиция в компании</Form.Label>
                            <Form.Control
                                placeholder="Python Developer"
                                autoFocus
                                value={experience.position}
                                onChange={(e) => { setExperience({ ...experience, position: e.target.value }) }}
                            />
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="exampleForm.ControlInput3">
                            <Form.Label>Начало работы</Form.Label>
                            <Form.Control
                                type='date'
                                placeholder="2018-02-27"
                                autoFocus
                                value={experience.start}
                                onChange={(e) => { setExperience({ ...experience, start: e.target.value }) }}
                            />
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="exampleForm.ControlInput4">
                            <Form.Label>Окончание работы</Form.Label>
                            <Form.Control
                                type='date'
                                placeholder="2018-02-27"
                                autoFocus
                                value={experience.end}
                                onChange={(e) => { setExperience({ ...experience, end: e.target.value }) }}
                            />
                        </Form.Group>
                        <Form.Group
                            className="mb-3"
                            controlId="exampleForm.ControlTextarea1"
                        >
                            <Form.Label>Описание</Form.Label>
                            <Form.Control
                                value={experience.description}
                                onChange={(e) => { setExperience({ ...experience, description: e.target.value }) }}
                                as="textarea" rows={3} 
                            />
                        </Form.Group>
                    </Form>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="primary" onClick={sendData}>
                        Добавить опыт
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    )
}

export default AddExperience