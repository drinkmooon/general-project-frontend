import request from '@/utils/request';

export async function getAllDepartments() {
    return request('/api/departments/list', {
      method: 'GET',
    })
}

export async function getDepartmentInfo(data) {
    return request(`/api/departments/?departmentId=${data}`, {
      method: 'GET',
    })
}

export async function createDepartment(data){
    return request(`/api/departments`,{
        method: 'POST',
        data
    })
}