import axios from 'axios'

const API = axios.create({
  baseURL: 'http://localhost:5000/api',
})

export const getAllLeads = (params) => API.get('/leads', { params })
export const getStats = () => API.get('/leads/stats')
export const createLead = (data) => API.post('/leads', data)
export const updateLead = (id, data) => API.put(`/leads/${id}`, data)
export const deleteLead = (id) => API.delete(`/leads/${id}`)