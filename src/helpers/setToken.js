import axios from 'axios';
import { useState } from 'react';
 
export const setAuthToken = token => {
   if (token) {
       axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
   }
   else
       delete axios.defaults.headers.common["Authorization"];
}

export const getAutData = () => {
    const token = localStorage.getItem("token");
    const account_type = localStorage.getItem("account_type");
    const related_obj_id = localStorage.getItem("related_obj_id");
    if (token) {
        return [true, {token: token, account_type: account_type, related_obj_id: related_obj_id}]
    }
    return [false, null]
}
