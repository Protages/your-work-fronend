import React, { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Modal from 'react-bootstrap/Modal';
import { useFetch } from '../hooks/useFetch';
import CompasnyService from '../API/CompanyService'
import { redirect } from 'react-router-dom';


function RegistrationCompany() {
    const [show, setShow] = useState(true);
    let [data, setData] = useState({
        email: "",
        password: "",
        title: "",
        employees: 0,
        city: "",
        address: '',
        contact_email: '',
        site: '',
        phone: '',
        tg: '',
        about: ""
    })

    const [fetchCompanyCreate, isCompanyCreateLoading, companyCreateErrors] = useFetch(async () => {
        const response = await CompasnyService.companyCreate(data)
        handleClose()
    })

    const handleClose = () => setShow(false);

    const sendData = (e) => {
        fetchCompanyCreate()
    }

    return (
        <>
            <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Зарегестрировать компанию</Modal.Title>
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
                        <Form.Group className="mb-3" controlId="exampleForm.ControlInput3">
                            <Form.Label>Название компании</Form.Label>
                            <Form.Control
                                value={data.title}
                                onChange={(e) => { setData({ ...data, title: e.target.value }) }}
                                placeholder="Best Company"
                            />
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="exampleForm.ControlInput4">
                            <Form.Label>Количество сотрудников</Form.Label>
                            <Form.Control
                                value={data.employees}
                                onChange={(e) => { setData({ ...data, employees: e.target.value }) }}
                                placeholder="100"
                            />
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="exampleForm.ControlInput5">
                            <Form.Label>Город</Form.Label>
                            <Form.Control
                                value={data.city}
                                onChange={(e) => { setData({ ...data, city: e.target.value }) }}
                                placeholder="Moscow"
                            />
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="exampleForm.ControlInput6">
                            <Form.Label>Адресс</Form.Label>
                            <Form.Control
                                value={data.address}
                                onChange={(e) => { setData({ ...data, address: e.target.value }) }}
                                placeholder="Адресс"
                            />
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="exampleForm.ControlInput7">
                            <Form.Label>Контактая почта</Form.Label>
                            <Form.Control
                                value={data.contact_email}
                                onChange={(e) => { setData({ ...data, contact_email: e.target.value }) }}
                                placeholder="example@mail.com"
                            />
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="exampleForm.ControlInput8">
                            <Form.Label>Телеграм</Form.Label>
                            <Form.Control
                                value={data.tg}
                                onChange={(e) => { setData({ ...data, tg: e.target.value }) }}
                                type="https://t.me/Best_Company"
                                placeholder="Password"
                            />
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="exampleForm.ControlInput9">
                            <Form.Label>Контактный телефон</Form.Label>
                            <Form.Control
                                value={data.phone}
                                onChange={(e) => { setData({ ...data, phone: e.target.value }) }}
                                placeholder="+79000000000"
                            />
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="exampleForm.ControlInput10">
                            <Form.Label>Сайт компании</Form.Label>
                            <Form.Control
                                value={data.site}
                                onChange={(e) => { setData({ ...data, site: e.target.value }) }}
                                placeholder="https://best_company.com/"
                            />
                        </Form.Group>
                        <Form.Group
                            className="mb-3"
                            controlId="exampleForm.ControlTextarea1"
                        >
                            <Form.Label>О компании</Form.Label>
                            <Form.Control
                                value={data.about}
                                onChange={(e) => { setData({ ...data, about: e.target.value }) }}
                                as="textarea" rows={3} 
                            />
                        </Form.Group>
                    </Form>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="primary" type="submit" onClick={sendData}>
                        Регистрация
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    );
}

export default RegistrationCompany