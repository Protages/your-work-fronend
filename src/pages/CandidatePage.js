import React, { useEffect, useState, useRef, useContext } from 'react';
import { Button, Stack, Container, Card, Row, Col } from 'react-bootstrap';
import { useFetch } from "../hooks/useFetch";

import CandidateService from '../API/CandidateService';
import { createSearchParams, Link, useNavigate, useParams } from 'react-router-dom';
import { getAutData } from '../helpers/setToken';
import VacanciesList from './VacanciesList';
import CandidateExperienceList from './CandidateExperienceList';


const CandidatePage = () => {
    const [isAuth, authData] = getAutData()
    const [isOurCompany, setIsOurCompany] = useState(false)
    let { id } = useParams();
    id = parseInt(id)

    const [candidate, setCandidate] = useState({
        email: "", first_name: "", last_name: "",
        sex: "", birthday: "", position: "", status: "", salary: 0,
        education: "", skills: "", about: "", contact_email: "",
        phone: "", tg: "", city: "", id: 0
    })

    const [fetchCandidate, isCandidateLoading, candidateErrors] = useFetch(async () => {
        const response = await CandidateService.getCandidateById(id)
        setCandidate(response.data)
    })

    useEffect(() => {
        fetchCandidate()
    }, [])

    // useEffect(() => {
    //     isOurCompanyCheck()
    // }, [company])

    // const isOurCompanyCheck = () => {
    //     if (isAuth === true && authData.account_type === 'company' && authData.related_obj_id == company.id) {
    //         setIsOurCompany(true)
    //     }
    //     else {
    //         setIsOurCompany(false)
    //     }
    // }

    return (
        <>
        <Container className="mt-3">
            <Row>
            <Card.Header as="h3">Подробности о кандидате</Card.Header>
            <Card bg="dark"
                    text="white"
                    className="mb-2">
                <Card.Header as="h5">{candidate.first_name} {candidate.last_name}</Card.Header>
                <Card.Body>
                    <Card.Title>Позиция - {candidate.position}</Card.Title>
                    <Card.Text>Статус - {candidate.status}</Card.Text>
                    <Card.Text>Зарплата - {candidate.salary}</Card.Text>
                    <Card.Text>Город - {candidate.city}</Card.Text>
                    <Card.Text>Пол - {candidate.sex}</Card.Text>
                    <Card.Text>День рождения - {candidate.birthday}</Card.Text>
                    <Card.Text>Скилы - {candidate.skills}</Card.Text>
                    <Card.Text>Образование - {candidate.education}</Card.Text>
                    <Card.Text>Контактный email - {candidate.contact_email}</Card.Text>
                    <Card.Text>Телефон - {candidate.phone}</Card.Text>
                    <Card.Text>Телеграмм - {candidate.tg}</Card.Text>
                    <Card.Text>О кандидате - {candidate.about}</Card.Text>
                    {/* {isOurCompany === true
                    ? <><Button variant="primary">Изменить</Button></>
                    : <></>
                    } */}
                </Card.Body>
            </Card>
            <Card.Header as="h3">Опыт кандидата</Card.Header>
            <CandidateExperienceList candidate_id={id}/>
            </Row>
        </Container>
    </>
    )
}

export default CandidatePage