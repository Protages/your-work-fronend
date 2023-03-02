import React, { useEffect, useState, useRef, useContext } from 'react';
import { Button, Stack, Container, Card, Row, Col, Modal, Form } from 'react-bootstrap';
import axios from 'axios';
import { useFetch } from "../hooks/useFetch";

import LoginService from '../API/LoginService';
import { createSearchParams, Link, Navigate, useNavigate } from 'react-router-dom';
import { setAuthToken } from '../helpers/setToken'


const Login = () => {
    const [show, setShow] = useState(true);
    const [token, setToken] = useState()
    let [data, setData] = useState({
        email: "",
        password: ""
    })

    const [fetchLogin, isVLoginLoading, loginErrors] = useFetch(async () => {
        const response = await LoginService.getToken(data.email, data.password)
        console.log(response.data)
        // setToken(response.data)
        const token = response.data.access
        const refresh_token = response.data.refresh
        const account_type = response.data.account_type
        const related_obj_id = response.data.related_obj_id
        localStorage.setItem("token", token);
        localStorage.setItem("refresh", refresh_token);
        localStorage.setItem("account_type", account_type);
        localStorage.setItem("related_obj_id", related_obj_id);
        setAuthToken(token)
        setShow(false)
    })

    const handleClose = () => setShow(false);

    const sendData = (e) => {
        fetchLogin()
    }

    return (
        <>
            <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Войти</Modal.Title>
                </Modal.Header>
                <Modal.Header >
                    {loginErrors &&
                        <Modal.Title>{loginErrors.response.data.detail}</Modal.Title>
                    }
                </Modal.Header>
                <Modal.Body>
                    <Form>
                        <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                            <Form.Label>Почта</Form.Label>
                            <Form.Control
                                value={data.email}
                                onChange={(e) => { setData({ ...data, email: e.target.value }) }}
                                required={true}
                                type="email"
                                placeholder="name@example.com"
                                autoFocus
                            />
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="exampleForm.ControlInput2">
                            <Form.Label>Пароль</Form.Label>
                            <Form.Control
                                value={data.password}
                                onChange={(e) => { setData({ ...data, password: e.target.value }) }}
                                type="password"
                                placeholder="Password"
                            />
                        </Form.Group>
                    </Form>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="primary" type="submit" onClick={sendData}>
                        Войти
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    );
}

export default Login