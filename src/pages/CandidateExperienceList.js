import React, { useEffect, useState, useRef, useContext } from 'react';
import { Button, Stack, Container, Card, Row, Col } from 'react-bootstrap';
import { useFetch } from "../hooks/useFetch";

import CandidateService from '../API/CandidateService';
import { createSearchParams, Link, useNavigate } from 'react-router-dom';
import { getAutData } from '../helpers/setToken';
import AddExperience from '../components/addExperience';


const CandidateExperienceList = ({vacancy_id}) => {
    const [isModalVisible, setIsModalVisible] = useState(false)
    const [isAuth, authData] = getAutData()

    const [experiences, setExperiences] = useState([{
        id: 0, company: "", position: "", start: "",
        end: "", description: "", candidate: 0
    }])

    const [fetchExperiences, isExperiencesLoading, experiencesErrors] = useFetch(async () => {
        if (isAuth && authData.account_type === 'candidate') {
            const response = await CandidateService.getAllCandidateExperiences(authData.related_obj_id)
            setExperiences(response.data)
        }
    })

    useEffect(() => {
        fetchExperiences()
    }, [])

    return (
        <>
        <Row>
        <div className="d-grid gap-2 mt-3">
            <Button variant="primary" size="lg" onClick={e => setIsModalVisible(true)}>
                Добавить опыт работы
            </Button>
        </div>
        {isModalVisible &&
            <AddExperience isVisible={isModalVisible} setIsVidible={setIsModalVisible}/>
        }
        {experiences.map((experience, indx) => (
        <Col xs={1} md={4} className="g-4" key={indx}>
            {/* <Link to={`/reaction/${reaction.id}/`}> */}
            <Card
                bg="dark"
                key={indx}
                text="white"
                style={{ width: '18rem' }}
                className="mb-2"
            >
            <Card.Header>{experience.company}</Card.Header>
            <Card.Body>
                <Card.Title>Позиция - {experience.position}</Card.Title>
                <Card.Title>Время</Card.Title>
                <Card.Text>{experience.start} -  
                {experience.end
                    ? <span> {experience.end}</span>
                    : <span> по наши дни</span>
                }
                </Card.Text>
                <Card.Title>Описание</Card.Title>
                <Card.Text>{experience.description}</Card.Text>
            </Card.Body>
            </Card>
            {/* </Link> */}
        </Col>
      ))}
      </Row>
    </>
    )
}

export default CandidateExperienceList