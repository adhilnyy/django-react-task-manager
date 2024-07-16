import React from 'react'
import api from './Axios'

export const getItem = async () => {
    try {
        const response = await api.get('/tasks/')
        return response.data
    } catch (error) {
        throw error
    }
}

export const addItem = async (data) => {
    try {
        const response = await api.post('/tasks/', data)
        return response.data
    } catch (error) {
        throw error
    }
}

export const editItem = async (id, data) => {
    try {
        const response = await api.put(`/tasks/${id}/`, data)
        return response.data
    } catch (error) {
        throw error
    }
}

export const deleteItem = async (id) => {
    try {
        const response = await api.delete(`/tasks/${id}/`)
        return response.data
    } catch (error) {
        throw error
    }
}
