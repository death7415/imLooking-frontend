import { API_BASE_URL } from './env.js'

const AUTH_BASE_PATH = '/api/v1/auth'
const AUTH_PASSWORD_BASE_PATH = '/api/v1/auth/password'
const CONSENT_BASE_PATH = '/api/v1/consent'
const SMS_BASE_PATH = '/api/v1/messaging/sms'

export const API_ENDPOINTS = {
  health: '/health',
  auth: {
    session: `${AUTH_BASE_PATH}/session`,
    login: `${AUTH_BASE_PATH}/login`,
    logout: `${AUTH_BASE_PATH}/logout`,
    refresh: `${AUTH_BASE_PATH}/refresh`,
    signup: `${AUTH_BASE_PATH}/signup`,
    startVerification: `${AUTH_BASE_PATH}/verification/start`,
    completeVerification: `${AUTH_BASE_PATH}/verification/complete`,
    forgotPassword: `${AUTH_PASSWORD_BASE_PATH}/forgot`,
    resetPassword: `${AUTH_PASSWORD_BASE_PATH}/reset`,
  },
  consent: {
    ageGate: `${CONSENT_BASE_PATH}/age-gate`,
    policyAcknowledgement: `${CONSENT_BASE_PATH}/policy-acknowledgement`,
  },
  messaging: {
    sendSms: `${SMS_BASE_PATH}/send`,
  },
}

export function buildApiUrl(path) {
  return `${API_BASE_URL}${path}`
}
