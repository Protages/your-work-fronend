import React, { useEffect, useState, useRef, useContext } from 'react';
import { Button, Stack, Container, Card, Row, Col } from 'react-bootstrap';
import { useFetch } from "../hooks/useFetch";

import CompasnyService from '../API/CompanyService';
import { createSearchParams, Link, useNavigate } from 'react-router-dom';
import { getAutData } from '../helpers/setToken';


const CompanyVacanciesList = () => {
    const [isAuth, authData] = getAutData()

    const [vacancies, setVacancies] = useState([{
        company: 1, description: "", 
        id: 1, img: null, required_experience: 0, 
        salary: 0, skills: "", title: ""
    }])

    const [fetchVacancies, isVacanciesLoading, vacanciesErrors] = useFetch(async () => {
        if (isAuth && authData.account_type === 'company') {
            const response = await CompasnyService.getCompanyVacancies(authData.related_obj_id)
            setVacancies(response.data)
        }
    })

    useEffect(() => {
        fetchVacancies()
    }, [])

    return (
        <>
        <Row>
        {vacancies.map((vacancy, indx) => (
        <Col xs={1} md={4} className="g-4" key={indx}>
            <Link to={`/vacancies/${vacancy.id}/`}>
            <Card
                bg="dark"
                key={indx}
                text="white"
                style={{ width: '18rem' }}
                className="mb-2"
            >
            <Card.Header>{vacancy.title}</Card.Header>
            <Card.Body>
                <Card.Title>{vacancy.salary}руб - от {vacancy.required_experience} лет</Card.Title>
                <Card.Text>{vacancy.description}</Card.Text>
            </Card.Body>
            </Card>
            </Link>
        </Col>
      ))}
      </Row>
    </>
    )
}

export default CompanyVacanciesList