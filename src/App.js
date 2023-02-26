import './styles/App.css';
import 'bootstrap/dist/css/bootstrap.min.css';

import { BrowserRouter, Navigate } from 'react-router-dom'
import Header from './components/Header';
import Router from './routers/Router';
import { Button, Stack, Container } from 'react-bootstrap';

import { setAuthToken } from './helpers/setToken'


function App() {
    const token = localStorage.getItem("token");
    if (token) {
        setAuthToken(token);
    }

    return (
        <div className="App">
            <Container>
                <Header/>
                <BrowserRouter>
                    <Router />
                </BrowserRouter>
            </Container>
        </div>
    );
}

export default App;
