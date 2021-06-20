import axios from "axios";

export function getScoreByPersonId(id){
    return axios.get(`/api/personrate/${id}`)
}

export function getScoreByOrgId(id) {
    return axios.get(`/api/orgrate/${id}`)
}