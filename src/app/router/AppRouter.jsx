import { createBrowserRouter, Navigate, RouterProvider } from 'react-router-dom'
import { ROUTE_PATHS } from './route-paths.js'
import { AuthRouteBoundary } from '../../widgets/auth-route-boundary/AuthRouteBoundary.jsx'
import { AppShell } from '../../widgets/app-shell/AppShell.jsx'
import { AgeGatePage } from '../../pages/age-gate/AgeGatePage.jsx'
import { ChatPage } from '../../pages/chat/ChatPage.jsx'
import { ConsentPage } from '../../pages/consent/ConsentPage.jsx'
import { ForgotPasswordPage } from '../../pages/forgot-password/ForgotPasswordPage.jsx'
import { HomePage } from '../../pages/home/HomePage.jsx'
import { LoginPage } from '../../pages/login/LoginPage.jsx'
import { OnboardingPage } from '../../pages/onboarding/OnboardingPage.jsx'
import { ResetPasswordPage } from '../../pages/reset-password/ResetPasswordPage.jsx'
import { SignupPage } from '../../pages/signup/SignupPage.jsx'

const router = createBrowserRouter([
  {
    path: '/',
    element: <AuthRouteBoundary />,
    children: [
      { index: true, element: <Navigate to={ROUTE_PATHS.LOGIN} replace /> },
      { path: ROUTE_PATHS.LOGIN, element: <LoginPage /> },
      { path: ROUTE_PATHS.SIGNUP, element: <SignupPage /> },
      {
        path: ROUTE_PATHS.FORGOT_PASSWORD,
        element: <ForgotPasswordPage />,
      },
      { path: ROUTE_PATHS.RESET_PASSWORD, element: <ResetPasswordPage /> },
      { path: ROUTE_PATHS.AGE_GATE, element: <AgeGatePage /> },
      { path: ROUTE_PATHS.CONSENT, element: <ConsentPage /> },
    ],
  },
  {
    path: '/',
    element: <AppShell />,
    children: [
      { path: ROUTE_PATHS.HOME, element: <HomePage /> },
      { path: ROUTE_PATHS.CHAT, element: <ChatPage /> },
      { path: ROUTE_PATHS.ONBOARDING, element: <OnboardingPage /> },
    ],
  },
])

export function AppRouter() {
  return <RouterProvider router={router} />
}
