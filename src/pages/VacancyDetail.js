import React, { useEffect, useState, useRef, useContext } from 'react';
import { Button, Stack, Container, Card, Row, Col } from 'react-bootstrap';
import { useFetch } from "../hooks/useFetch";

import VacanciestService from '../API/VacanciesService';
import CompanyReactionsList from './CompanyReactionsList';
import { Link, useParams } from 'react-router-dom';
import { getAutData } from '../helpers/setToken';
import AddReaction from '../components/addReaction';


const VacancyDetail = () => {
    const [isModalVisible, setisModalVisible] = useState(false)
    const [isAuth, authData] = getAutData()
    const [isOurCompany, setIsOurCompany] = useState(false)

    let { id } = useParams();
    id = parseInt(id)
    const [vacancy, setVacancy] = useState({
        company: 0, description: "", 
        id: id, img: null, required_experience: 0, 
        salary: 0, skills: "", title: ""
    })

    const [fetchVacancy, isVacancyLoading, vacancyErrors] = useFetch(async () => {
        const response = await VacanciestService.getVacancy(id)
        setVacancy(response.data)
    })

    useEffect(() => {
        fetchVacancy()
    }, [])

    useEffect(() => {
        isOurCompanyCheck()
    }, [vacancy])

    const isOurCompanyCheck = () => {
        if (isAuth === true && authData.account_type === 'company' && authData.related_obj_id == vacancy.company) {
            console.log('idiasidasidaisdi')
            setIsOurCompany(true)
        }
        else {
            setIsOurCompany(false)
        }
    }
    
    return (
        <>
        <Container className="mt-3">
            {isModalVisible &&
                <AddReaction 
                    isVisible={isModalVisible} 
                    setIsVidible={setisModalVisible} 
                    candidate_id={parseInt(authData.related_obj_id)} 
                    vacancy_id={id}
                />
            }
            <Row>
            <Card
                bg="dark"
                text="white"
            >
            <Card.Header>{vacancy.title}</Card.Header>
            <Card.Body>
                <Card.Title>{vacancy.salary}руб - от {vacancy.required_experience} лет</Card.Title>
                <Card.Title>Описание</Card.Title>
                <Card.Text>{vacancy.description}</Card.Text>
                <Card.Title>Требуемые наваки</Card.Title>
                <Card.Text>{vacancy.skills}</Card.Text>
                <Card.Title>Компания</Card.Title>
                <Card.Text> 
                    <Link to={`/company/${vacancy.company}/`}> {vacancy.company} (клик)</Link>
                </Card.Text>
                {isOurCompany === true
                ? <><Button variant="primary">Изменить нашу вакансию</Button></>
                : <>{isAuth &&
                        <Button variant="primary" onClick={e => setisModalVisible(true)}>Откликнуться</Button>
                    }
                </>
                }
            </Card.Body>
            </Card>
            </Row>
            {isOurCompany === true
                ? <><CompanyReactionsList vacancy_id={id}/></>
                : <></>
            }
        </Container>
        </>
    )
}

export default VacancyDetail