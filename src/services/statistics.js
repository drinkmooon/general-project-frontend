import request from "umi-request";

export async function getPapersRating(){
    return request(`/api/statistics/rating`)
}

export async function getPapersDownloadRank(){
    return request(`/api/statistics/rank`)
}
// ? empty url
export async function getPapersCountByDept(id){
    return request(`/api/statistics?dept=${id}`)
}