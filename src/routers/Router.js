import React, { useContext } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom'
import { loginRouts } from './routs'

import { history  } from '../helpers/history'


const Router = () => {
    return (
        <Routes history={history}>
            {loginRouts.map(rout => 
                <Route 
                    path={rout.path} 
                    element={rout.element}
                    key={rout.path}
                />    
            )}
            <Route path="/*" element={<Navigate to="/vacancies" replace />} />
        </Routes>
    )
}


export default Router