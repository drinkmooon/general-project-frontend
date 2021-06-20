import axios from "axios";

export function getScoreByPersonId(id){
    return axios.get(`/personrate/${id}`)
}

export function getScoreByOrgId(id) {
    return axios.get(`/orgrate/${id}`)
}