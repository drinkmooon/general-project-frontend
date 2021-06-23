import request from "umi-request";

export async function getDownloadCountByPaperId(id){
    return request(`/api/downloads/papper?papperId=${id}`)
}

export async function getDownloadCountByUserId(id){
    return request(`/api/downloads/paper?UserId=${id}`)
}

export async function addDownloadCount(data){
    return request(`/api/downloads`,{
        method: 'PUT',
        data
    })
}