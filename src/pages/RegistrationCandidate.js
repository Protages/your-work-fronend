import React, { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Modal from 'react-bootstrap/Modal';
import { useFetch } from '../hooks/useFetch';

import CandidateService from '../API/CandidateService'


function RegistrationCandidate() {
    const [show, setShow] = useState(true);
    let [data, setData] = useState({
        email: "",
        password: "",
        first_name: "",
        last_name: "",
        sex: '',
        birthday: "2000-02-24",
        position: "",
        status: '',
        salary: 100000,
        education: "",
        skills: "",
        about: "",
        contact_email: "",
        phone: "",
        tg: "",
        city: ""
    })

    const [fetchCandidateCreate, isCandidateCreateLoading, candidateCreateErrors] = useFetch(async () => {
        const response = await CandidateService.candidateCreate(data)
        handleClose()
    })

    const handleClose = () => setShow(false);

    const sendData = (e) => {
        fetchCandidateCreate()
    }

    return (
        <>
            <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Зарегестрировать кандидата</Modal.Title>
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
                            <Form.Label>Имя</Form.Label>
                            <Form.Control
                                value={data.first_name}
                                onChange={(e) => { setData({ ...data, first_name: e.target.value }) }}
                                placeholder="Имя"
                            />
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="exampleForm.ControlInput4">
                            <Form.Label>Фамилия</Form.Label>
                            <Form.Control
                                value={data.last_name}
                                onChange={(e) => { setData({ ...data, last_name: e.target.value }) }}
                                placeholder="Фамилия"
                            />
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="exampleForm.ControlInput5">
                            <Form.Label>Пол</Form.Label>
                            <Form.Select
                                value={data.sex}
                                onChange={(e) => { setData({ ...data, sex: e.target.value }) }}
                            >
                                <option defaultValue value="NC">Не выбрано</option>
                                <option value="MN">Мужской</option>
                                <option value="WN">Женский</option>
                            </Form.Select>
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="exampleForm.ControlInput6">
                            <Form.Label>Дата рождения</Form.Label>
                            <Form.Control
                                value={data.birthday}
                                onChange={(e) => { setData({ ...data, birthday: e.target.value }) }}
                                placeholder="2000-02-24"
                            />
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="exampleForm.ControlInput7">
                            <Form.Label>Желаемая позиция</Form.Label>
                            <Form.Control
                                value={data.position}
                                onChange={(e) => { setData({ ...data, position: e.target.value }) }}
                                placeholder="Python developer"
                            />
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="exampleForm.ControlInput8">
                            <Form.Label>Статутс резюме</Form.Label>
                            <Form.Select
                                value={data.status}
                                onChange={(e) => { setData({ ...data, status: e.target.value }) }}
                            >
                                <option defaultValue value="SC">В поиске работы</option>
                                <option value="NSC">Не в поиске работы </option>
                                <option value="TH">Рассматриваю предложения</option>
                            </Form.Select>
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="exampleForm.ControlInput9">
                            <Form.Label>Зарплатные ожидания</Form.Label>
                            <Form.Control
                                value={data.salary}
                                onChange={(e) => { setData({ ...data, salary: e.target.value }) }}
                                placeholder="100000"
                            />
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="exampleForm.ControlInput10">
                            <Form.Label>Образование</Form.Label>
                            <Form.Control
                                value={data.education}
                                onChange={(e) => { setData({ ...data, education: e.target.value }) }}
                                placeholder="MIT, Гарвард, Кембридж"
                            />
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="exampleForm.ControlInput11">
                            <Form.Label>Наваки</Form.Label>
                            <Form.Control
                                value={data.skills}
                                onChange={(e) => { setData({ ...data, skills: e.target.value }) }}
                                placeholder="Строительство космолетов, рытье каналов"
                            />
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="exampleForm.ControlInput12">
                            <Form.Label>Контактная почта</Form.Label>
                            <Form.Control
                                value={data.contact_email}
                                onChange={(e) => { setData({ ...data, contact_email: e.target.value }) }}
                                placeholder="example@mail.com"
                            />
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="exampleForm.ControlInput12">
                            <Form.Label>Контакстный телефон</Form.Label>
                            <Form.Control
                                value={data.phone}
                                onChange={(e) => { setData({ ...data, phone: e.target.value }) }}
                                placeholder="+79000000000"
                            />
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="exampleForm.ControlInput12">
                            <Form.Label>Телеграмм</Form.Label>
                            <Form.Control
                                value={data.tg}
                                onChange={(e) => { setData({ ...data, tg: e.target.value }) }}
                                placeholder="https://t.me/my_tg"
                            />
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="exampleForm.ControlInput12">
                            <Form.Label>Город</Form.Label>
                            <Form.Control
                                value={data.city}
                                onChange={(e) => { setData({ ...data, city: e.target.value }) }}
                                placeholder="Moscow"
                            />
                        </Form.Group>
                        <Form.Group
                            className="mb-3"
                            controlId="exampleForm.ControlTextarea1"
                        >
                            <Form.Label>О себе</Form.Label>
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

export default RegistrationCandidate