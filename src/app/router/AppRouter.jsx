import { Navigate, createBrowserRouter, RouterProvider } from 'react-router-dom'
import { ROUTE_PATHS } from './route-paths.js'
import { AuthRouteBoundary } from '../../widgets/auth-route-boundary/AuthRouteBoundary.jsx'
import { AppShell } from '../../widgets/app-shell/AppShell.jsx'
import { AgeGatePage } from '../../pages/age-gate/AgeGatePage.jsx'
import { ChatPage } from '../../pages/chat/ChatPage.jsx'
import { CommunityGuidelinesPage } from '../../pages/community-guidelines/CommunityGuidelinesPage.jsx'
import { ConsentPage } from '../../pages/consent/ConsentPage.jsx'
import { RouteErrorPage } from '../../pages/error/RouteErrorPage.jsx'
import { ForgotPasswordPage } from '../../pages/forgot-password/ForgotPasswordPage.jsx'
import { HomePage } from '../../pages/home/HomePage.jsx'
import { LoadingPage } from '../../pages/loading/LoadingPage.jsx'
import { LoginPage } from '../../pages/login/LoginPage.jsx'
import { ProfilePage } from '../../pages/profile/ProfilePage.jsx'
import { PrivacyPage } from '../../pages/privacy/PrivacyPage.jsx'
import { ResetPasswordPage } from '../../pages/reset-password/ResetPasswordPage.jsx'
import { SignupPage } from '../../pages/signup/SignupPage.jsx'
import { TermsPage } from '../../pages/terms/TermsPage.jsx'
import { VerifyEmailPage } from '../../pages/verify-email/VerifyEmailPage.jsx'
import { ProtectedAppRoute } from '../../widgets/protected-app-route/ProtectedAppRoute.jsx'

const router = createBrowserRouter([
  {
    path: '/',
    element: <AuthRouteBoundary />,
    errorElement: <RouteErrorPage />,
    children: [
      { index: true, element: <LoadingPage /> },
      { path: ROUTE_PATHS.LOGIN, element: <LoginPage /> },
      { path: ROUTE_PATHS.SIGNUP, element: <SignupPage /> },
      {
        path: ROUTE_PATHS.FORGOT_PASSWORD,
        element: <ForgotPasswordPage />,
      },
      { path: ROUTE_PATHS.RESET_PASSWORD, element: <ResetPasswordPage /> },
      { path: ROUTE_PATHS.AGE_GATE, element: <AgeGatePage /> },
      { path: ROUTE_PATHS.CONSENT, element: <ConsentPage /> },
      { path: ROUTE_PATHS.TERMS, element: <TermsPage /> },
      { path: ROUTE_PATHS.PRIVACY, element: <PrivacyPage /> },
      {
        path: ROUTE_PATHS.COMMUNITY_GUIDELINES,
        element: <CommunityGuidelinesPage />,
      },
    ],
  },
  {
    path: '/',
    element: <ProtectedAppRoute />,
    errorElement: <RouteErrorPage />,
    children: [
      {
        path: '/',
        element: <AppShell />,
        children: [
          { path: ROUTE_PATHS.HOME, element: <HomePage /> },
          { path: ROUTE_PATHS.CHAT, element: <ChatPage /> },
          { path: ROUTE_PATHS.PROFILE, element: <ProfilePage /> },
          { path: ROUTE_PATHS.VERIFY_EMAIL, element: <VerifyEmailPage /> },
          {
            path: '/onboarding',
            element: <Navigate replace to={ROUTE_PATHS.PROFILE} />,
          },
        ],
      },
    ],
  },
])

export function AppRouter() {
  return <RouterProvider router={router} />
}
