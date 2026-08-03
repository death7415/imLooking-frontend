import { API_BASE_URL } from './env.js'

const AUTH_BASE_PATH = '/api/auth'

export const API_ENDPOINTS = {
  health: '/health',
  auth: {
    login: `${AUTH_BASE_PATH}/login`,
    signup: `${AUTH_BASE_PATH}/signup`,
    forgotPassword: `${AUTH_BASE_PATH}/forgot-password`,
    resetPassword: `${AUTH_BASE_PATH}/reset-password`,
    ageGate: `${AUTH_BASE_PATH}/age-gate`,
    consent: `${AUTH_BASE_PATH}/consent`,
  },
}

export function buildApiUrl(path) {
  return `${API_BASE_URL}${path}`
}
