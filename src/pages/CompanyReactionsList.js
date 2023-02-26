import React, { useEffect, useState, useRef, useContext } from 'react';
import { Button, Stack, Container, Card, Row, Col } from 'react-bootstrap';
import { useFetch } from "../hooks/useFetch";

import CompasnyService from '../API/CompanyService';
import { createSearchParams, Link, useNavigate } from 'react-router-dom';
import { getAutData } from '../helpers/setToken';


const CompanyReactionsList = () => {
    const [isAuth, authData] = getAutData()

    const [reactions, setReactions] = useState([{
        id: 0, status: "", comment: "",
        cv: "", candidate: 0, vacancy: 0
    }])

    const [fetchReactions, isReactionsLoading, reactionsErrors] = useFetch(async () => {
        if (isAuth && authData.account_type === 'company') {
            const response = await CompasnyService.getCompanyReactions(authData.related_obj_id)
            setReactions(response.data)
        }
    })

    useEffect(() => {
        fetchReactions()
    }, [])

    return (
        <>
        <Row>
        {reactions.map((reaction, indx) => (
        <Col xs={1} md={4} className="g-4" key={indx}>
            {/* <Link to={`/reaction/${reaction.id}/`}> */}
            <Card
                bg="dark"
                key={indx}
                text="white"
                style={{ width: '18rem' }}
                className="mb-2"
            >
            <Card.Header>{reaction.status}</Card.Header>
            <Card.Body>
                <Card.Title>На вакансию</Card.Title>
                <Card.Text><Link to={`/vacancies/${reaction.vacancy}/`}> {reaction.vacancy} (клик)</Link></Card.Text>
                <Card.Title>Кандидат</Card.Title>
                <Card.Text>{reaction.candidate}</Card.Text>
                <Card.Title>Комментарий</Card.Title>
                <Card.Text>{reaction.comment}</Card.Text>
            </Card.Body>
            </Card>
            {/* </Link> */}
        </Col>
      ))}
      </Row>
    </>
    )
}

export default CompanyReactionsList