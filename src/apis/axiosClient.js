import axios from 'axios'

// export default axios.create({
//   baseURL: "https://629c5e663798759975d48e46.mockapi.io/api/v1/",
// });

const API_URL = 'https://mas-api.azurewebsites.net/api/mas/v1/'

const defaultInstance = axios.create({
    baseURL: API_URL,
})

export const loadToken = () => {
    //const token = localStorage.getItem('JWT_TOKEN')
    defaultInstance.defaults.headers.common[
        'Authorization'
    ] = `Bearer ${'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJJZCI6IjJlYTMxNzAyLTdmY2EtNDU3MS1iZWQwLTkzMjA2OGI0ODhiMSIsImh0dHA6Ly9zY2hlbWFzLnhtbHNvYXAub3JnL3dzLzIwMDUvMDUvaWRlbnRpdHkvY2xhaW1zL25hbWVpZGVudGlmaWVyIjoiMmVhMzE3MDItN2ZjYS00NTcxLWJlZDAtOTMyMDY4YjQ4OGIxIiwiaHR0cDovL3NjaGVtYXMueG1sc29hcC5vcmcvd3MvMjAwNS8wNS9pZGVudGl0eS9jbGFpbXMvbmFtZSI6Imh1bmdAZ21haWwuY29tIiwiaHR0cDovL3NjaGVtYXMueG1sc29hcC5vcmcvd3MvMjAwNS8wNS9pZGVudGl0eS9jbGFpbXMvZW1haWxhZGRyZXNzIjoiaHVuZ0BnbWFpbC5jb20iLCJodHRwOi8vc2NoZW1hcy5taWNyb3NvZnQuY29tL3dzLzIwMDgvMDYvaWRlbnRpdHkvY2xhaW1zL3JvbGUiOiJhZG1pbiIsImV4cCI6MTY1NDUyMjAzM30._MgK_loUnAWSxcfgZ7UMOZ5L5yXYoxzkVNy4QiNObJ8'}`
}

export { defaultInstance }
