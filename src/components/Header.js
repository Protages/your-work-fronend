import React, { useContext } from 'react';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';

import { getAutData } from '../helpers/setToken';

const Header = () => {
    const [isAuth, authData] = getAutData()

    return (
        <>
        <Navbar bg="dark" variant="dark">
        <Container>
          <Navbar.Brand href="#home">Your-work</Navbar.Brand>
          <Nav className="me-auto">
            <Nav.Link href="/vacancies">Вакансии</Nav.Link>
            {isAuth === true &&
              <>{authData.account_type === 'company'
              ?<>
                <Nav.Link href="/our_vacancies">Ваши вакансии</Nav.Link>
                <Nav.Link href="/our_reactions">Все ваши отклики</Nav.Link>
              </>
              :<>
                <Nav.Link href="/my_reactions">Ваши отклики</Nav.Link>
                <Nav.Link href="/my_experience">Ваш опыт</Nav.Link>
              </>
              }</>
            }
          </Nav>
          <Nav className="me-left">
            {isAuth === true
            ? <>
            {authData.account_type === 'company'
              ?<><Nav.Link href={`/company/${authData.related_obj_id}/`}>Ваша компания</Nav.Link></>
              :<><Navbar.Text>Вы кандиат!</Navbar.Text></>
            }
              <Nav.Link href="/logout">Выйти</Nav.Link>
            </>
            : <>
              <Navbar.Text>Вы не аторизованы!</Navbar.Text>
              <Nav.Link href="/login">Войти</Nav.Link>
              <Nav.Link href="/registration_candidate">Регистрация</Nav.Link>
              <Nav.Link href="/registration_company">Регистрация как компания</Nav.Link>
            </>
            }
            
          </Nav>
        </Container>
      </Navbar>
      </>
    )
}

export default Header