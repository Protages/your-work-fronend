import React, { useEffect, useState, useRef, useContext } from 'react';
import { Button, Stack, Container, Card, Row, Col } from 'react-bootstrap';
import { useFetch } from "../hooks/useFetch";

import CompanyService from '../API/CompanyService';
import VacanciestService from '../API/VacanciesService';
import { createSearchParams, Link, useNavigate, useParams } from 'react-router-dom';
import { getAutData } from '../helpers/setToken';
import VacanciesList from './VacanciesList';


const CompanyPage = ({vacancy_id}) => {
    const [isAuth, authData] = getAutData()
    const [isOurCompany, setIsOurCompany] = useState(false)
    let { id } = useParams();
    id = parseInt(id)

    const [company, setCompany] = useState([{
        email: "", title: "", employees: 0,
        city: "", address: "", site: "",
        contact_email: "", phone: "", tg: "",
        about: "", id: 0
    }])

    const [fetchCompany, isCompanyLoading, companyErrors] = useFetch(async () => {
        const response = await CompanyService.getCompanyById(id)
        setCompany(response.data)
    })

    useEffect(() => {
        fetchCompany()
    }, [])

    useEffect(() => {
        isOurCompanyCheck()
    }, [company])

    const isOurCompanyCheck = () => {
        if (isAuth === true && authData.account_type === 'company' && authData.related_obj_id == company.id) {
            setIsOurCompany(true)
        }
        else {
            setIsOurCompany(false)
        }
    }

    return (
        <>
        <Container className="mt-3">
            <Row>
            <Card.Header as="h3">Подробности о компании</Card.Header>
            <Card bg="dark"
                    text="white"
                    className="mb-2">
                <Card.Header as="h5">{company.title}</Card.Header>
                <Card.Body>
                    <Card.Title></Card.Title>
                    <Card.Text>Сотрудников - {company.employees}</Card.Text>
                    <Card.Text>Город компании - {company.city}</Card.Text>
                    <Card.Text>Адресс компании - {company.address}</Card.Text>
                    <Card.Text>Сайт - {company.site}</Card.Text>
                    <Card.Text>Контактный email - {company.contact_email}</Card.Text>
                    <Card.Text>Телефон - {company.phone}</Card.Text>
                    <Card.Text>Телеграмм - {company.tg}</Card.Text>
                    <Card.Text>О компании - {company.about}</Card.Text>
                    {isOurCompany === true
                    ? <><Button variant="primary">Изменить</Button></>
                    : <></>
                    }
                </Card.Body>
            </Card>
            <Card.Header as="h3">Вакансии компании</Card.Header>
            <VacanciesList company_id={id}/>
            </Row>
        </Container>
    </>
    )
}

export default CompanyPage