import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { Globe, Menu, X, BookOpen, Trophy, Users, User, LogOut } from 'lucide-react'
import { useStore } from '@/store'

export default function Header() {
  const { user, isLoggedIn, logout } = useStore()
  const navigate = useNavigate()
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  const handleLogout = () => {
    logout()
    navigate('/auth/login')
  }

  return (
    <header className="bg-white shadow-sm sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center space-x-3">
            <div className="flex items-center justify-center w-10 h-10 bg-gradient-to-br from-primary-500 to-primary-700 rounded-lg">
              <Globe className="w-6 h-6 text-white" />
            </div>
            <span className="text-xl font-bold text-gray-800">语言学习平台</span>
          </div>

          <nav className="hidden md:flex items-center space-x-8">
            <Link to="/" className="text-gray-600 hover:text-primary-600 transition-colors">
              首页
            </Link>
            <Link to="/courses" className="text-gray-600 hover:text-primary-600 transition-colors">
              课程
            </Link>
            <Link to="/dashboard" className="text-gray-600 hover:text-primary-600 transition-colors flex items-center space-x-1">
              <BookOpen className="w-4 h-4" />
              <span>学习进度</span>
            </Link>
            <Link to="/community" className="text-gray-600 hover:text-primary-600 transition-colors flex items-center space-x-1">
              <Users className="w-4 h-4" />
              <span>社区</span>
            </Link>
          </nav>

          <div className="flex items-center space-x-4">
            {isLoggedIn ? (
              <>
                <div className="hidden md:flex items-center space-x-2 text-gray-600">
                  <Trophy className="w-5 h-5 text-warning-500" />
                  <span className="font-medium">{useStore.getState().totalPoints} 积分</span>
                </div>
                <Link to="/profile" className="flex items-center space-x-2">
                  <img
                    src={user?.avatarUrl}
                    alt={user?.username}
                    className="w-8 h-8 rounded-full object-cover border-2 border-primary-200"
                  />
                  <span className="hidden md:block text-gray-700 font-medium">{user?.username}</span>
                </Link>
                <button
                  onClick={handleLogout}
                  className="hidden md:flex items-center space-x-1 text-gray-500 hover:text-red-500 transition-colors"
                >
                  <LogOut className="w-4 h-4" />
                  <span>退出</span>
                </button>
              </>
            ) : (
              <div className="flex items-center space-x-3">
                <Link to="/auth/login" className="text-gray-600 hover:text-primary-600">登录</Link>
                <Link to="/auth/signup" className="px-4 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition-colors">
                  注册
                </Link>
              </div>
            )}

            <button
              className="md:hidden p-2 text-gray-600"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>

        {isMenuOpen && (
          <div className="md:hidden py-4 border-t">
            <nav className="flex flex-col space-y-3">
              <Link to="/" className="text-gray-600 hover:text-primary-600 py-2">首页</Link>
              <Link to="/courses" className="text-gray-600 hover:text-primary-600 py-2">课程</Link>
              <Link to="/dashboard" className="text-gray-600 hover:text-primary-600 py-2">学习进度</Link>
              <Link to="/community" className="text-gray-600 hover:text-primary-600 py-2">社区</Link>
              {isLoggedIn && (
                <>
                  <div className="flex items-center space-x-2 text-gray-600 py-2">
                    <Trophy className="w-5 h-5 text-warning-500" />
                    <span>{useStore.getState().totalPoints} 积分</span>
                  </div>
                  <Link to="/profile" className="text-gray-600 hover:text-primary-600 py-2">个人资料</Link>
                  <button onClick={handleLogout} className="text-left text-gray-500 hover:text-red-500 py-2">退出登录</button>
                </>
              )}
            </nav>
          </div>
        )}
      </div>
    </header>
  )
}
