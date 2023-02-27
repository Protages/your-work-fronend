import VacanciesList from '../pages/VacanciesList'
import RegistrationCompany from '../pages/RegistrationCompany'
import RegistrationCandidate from '../pages/RegistrationCandidate'
import VacancyDetail from '../pages/VacancyDetail'
import Login from '../pages/Login'
import Logout from '../pages/Logout'
import CompanyVacanciesList from '../pages/CompanyVacanciesList'
import CompanyReactionsList from '../pages/CompanyReactionsList'
import CompanyPage from '../pages/CompanyPage'
import CandidateReactionsList from '../pages/CandidateReactionsList'
import CandidateExperienceList from '../pages/CandidateExperienceList'


export const loginRouts = [
    {path: '/login', element: <Login />},
    {path: '/logout', element: <Logout />},
    {path: '/vacancies', element: <VacanciesList />},
    {path: '/vacancies/:id', element: <VacancyDetail />},
    {path: '/registration_company', element: <RegistrationCompany />},
    {path: '/registration_candidate', element: <RegistrationCandidate />},
    {path: '/our_vacancies', element: <CompanyVacanciesList />},
    {path: '/our_reactions', element: <CompanyReactionsList />},
    {path: '/company/:id', element: <CompanyPage />},
    {path: '/my_reactions', element: <CandidateReactionsList />},
    {path: '/my_experience', element: <CandidateExperienceList />},
    
]












// export const unLoginRouts = [
//     {path: '/login', element: <Login />},
// ]
