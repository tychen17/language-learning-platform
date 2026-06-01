import { Routes, Route, Navigate } from 'react-router-dom'
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import HomePage from '@/pages/HomePage'
import CoursesPage from '@/pages/CoursesPage'
import CourseDetailPage from '@/pages/CourseDetailPage'
import LearnPage from '@/pages/LearnPage'
import DashboardPage from '@/pages/DashboardPage'
import CommunityPage from '@/pages/CommunityPage'
import ProfilePage from '@/pages/ProfilePage'
import AuthPage from '@/pages/AuthPage'
import { useStore } from '@/store'

function ProtectedRoute({ children }: { children: React.ReactNode }) {
  const { isLoggedIn } = useStore()
  if (!isLoggedIn) {
    return <Navigate to="/auth/login" />
  }
  return <>{children}</>
}

function PublicRoute({ children }: { children: React.ReactNode }) {
  const { isLoggedIn } = useStore()
  if (isLoggedIn) {
    return <Navigate to="/" />
  }
  return <>{children}</>
}

export default function App() {
  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      <main>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/courses" element={<CoursesPage />} />
          <Route path="/courses/:id" element={<CourseDetailPage />} />
          <Route
            path="/learn/:moduleType"
            element={
              <ProtectedRoute>
                <LearnPage />
              </ProtectedRoute>
            }
          />
          <Route
            path="/dashboard"
            element={
              <ProtectedRoute>
                <DashboardPage />
              </ProtectedRoute>
            }
          />
          <Route
            path="/community"
            element={
              <ProtectedRoute>
                <CommunityPage />
              </ProtectedRoute>
            }
          />
          <Route
            path="/profile"
            element={
              <ProtectedRoute>
                <ProfilePage />
              </ProtectedRoute>
            }
          />
          <Route
            path="/auth/login"
            element={
              <PublicRoute>
                <AuthPage />
              </PublicRoute>
            }
          />
          <Route
            path="/auth/signup"
            element={
              <PublicRoute>
                <AuthPage />
              </PublicRoute>
            }
          />
        </Routes>
      </main>
      <Footer />
    </div>
  )
}
