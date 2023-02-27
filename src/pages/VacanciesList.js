import React, { useEffect, useState, useRef, useContext } from 'react';
import { Button, Stack, Container, Card, Row, Col } from 'react-bootstrap';
import { useFetch } from "../hooks/useFetch";

import VacanciestService from '../API/VacanciesService';
import CompasnyService from '../API/CompanyService';
import { createSearchParams, Link, useNavigate } from 'react-router-dom';


const VacanciesList = ({company_id}) => {
    const [vacancies, setVacancies] = useState([{
        company: 1, description: "some_description1", 
        id: 1, img: null, required_experience: 2, 
        salary: 170000, skills: "some_skills1", title: "Python Middle developer"
    }])

    const [fetchVacancies, isVacanciesLoading, vacanciesErrors] = useFetch(async () => {
        let response = {}
        if (company_id) {
            response = await CompasnyService.getCompanyVacancies(company_id)
        } else {
            response = await VacanciestService.getAllVacancies()
        }
        setVacancies(response.data)
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

export default VacanciesList