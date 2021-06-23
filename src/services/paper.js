import request from '@/utils/request';
import axios from 'axios'

export async function getPaperInfo(paperId) {
    return request(`/api/pappers?paperId=${paperId}`,{
        method: 'GET'
    })
}

export async function uploadPaper(data){
    console.log('paper',data);
    return request('/api/pappers',{
        method: 'POST',
        data
    })
}
export async function uploadPaperFile(url,data){
    console.log('url',url.split('.com/'));
    return axios({
        method: "PUT",
        url:`/file/${url.split('.com/')[1]}`,
        data,
        headers: {"Content-Type": `application/octet-stream`,}
    })
}
export async function searchPaper(keyword){
    return request(`/api/pappers/search?keyword=${keyword}`,{
        method: 'GET'
    })
}

export async function markPaper(data){
    return request(`/api/pappers`,{
        method: 'PATCH',
        data
    })
}

export async function getPaperList(){
    return request(`/api/pappers/list`,{
        method: 'GET'
    })
}

export async function downloadPaper(fileName){
    return request(`/file/${fileName}`)
}