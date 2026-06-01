import { useState } from 'react'
import { Edit2, Save, Trophy, BookOpen, Calendar, Settings, LogOut } from 'lucide-react'
import { useStore } from '@/store'
import { useNavigate } from 'react-router-dom'

export default function ProfilePage() {
  const { user, achievements, userAchievements, totalPoints, dailyStreak, learningProgress, logout, lessons } = useStore()
  const navigate = useNavigate()
  const [isEditing, setIsEditing] = useState(false)
  const [username, setUsername] = useState(user?.username || '')
  const [learningLanguage, setLearningLanguage] = useState(user?.learningLanguage || 'english')

  const completedLessons = Object.values(learningProgress).filter(p => p.completed).length
  const unlockedAchievements = userAchievements.length

  const languages = [
    { id: 'english', label: '英语', flag: '🇺🇸' },
    { id: 'japanese', label: '日语', flag: '🇯🇵' },
    { id: 'korean', label: '韩语', flag: '🇰🇷' },
  ]

  const handleSave = () => {
    setIsEditing(false)
  }

  const handleLogout = () => {
    logout()
    navigate('/auth/login')
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <section className="bg-gradient-to-br from-primary-600 via-primary-700 to-primary-800 text-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="flex flex-col md:flex-row items-center space-y-6 md:space-y-0 md:space-x-8">
            <div className="relative">
              <img src={user?.avatarUrl} alt={user?.username} className="w-24 h-24 rounded-full border-4 border-white shadow-lg" />
              <button className="absolute bottom-0 right-0 w-8 h-8 bg-white rounded-full flex items-center justify-center shadow-md">
                <Edit2 className="w-4 h-4 text-gray-600" />
              </button>
            </div>
            <div className="flex-1 text-center md:text-left">
              {isEditing ? (
                <>
                  <div className="flex items-center space-x-2 mb-2">
                    <input
                      type="text"
                      value={username}
                      onChange={(e) => setUsername(e.target.value)}
                      className="px-4 py-2 bg-white/20 rounded-lg text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-white/50"
                    />
                    <button
                      onClick={handleSave}
                      className="p-2 bg-white/20 rounded-lg hover:bg-white/30 transition-colors"
                    >
                      <Save className="w-4 h-4" />
                    </button>
                  </div>
                  <select
                    value={learningLanguage}
                    onChange={(e) => setLearningLanguage(e.target.value as 'english' | 'japanese' | 'korean')}
                    className="px-4 py-2 bg-white/20 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-white/50"
                  >
                    {languages.map(lang => (
                      <option key={lang.id} value={lang.id} className="text-gray-800">
                        {lang.flag} {lang.label}
                      </option>
                    ))}
                  </select>
                </>
              ) : (
                <>
                  <h1 className="text-3xl font-bold">{user?.username}</h1>
                  <p className="text-primary-200">
                    {languages.find(l => l.id === user?.learningLanguage)?.flag}{' '}
                    {languages.find(l => l.id === user?.learningLanguage)?.label} -{' '}
                    {user?.level === 'beginner' ? '初级' : user?.level === 'intermediate' ? '中级' : '高级'}
                  </p>
                  <button
                    onClick={() => setIsEditing(true)}
                    className="mt-2 px-4 py-2 bg-white/20 rounded-lg hover:bg-white/30 transition-colors flex items-center space-x-2 mx-auto md:mx-0"
                  >
                    <Edit2 className="w-4 h-4" />
                    <span>编辑资料</span>
                  </button>
                </>
              )}
            </div>
          </div>
        </div>
      </section>

      <section className="py-8">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="bg-white rounded-2xl p-6 shadow-sm text-center">
              <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center mx-auto mb-3">
                <BookOpen className="w-6 h-6 text-blue-600" />
              </div>
              <div className="text-2xl font-bold text-gray-800">{completedLessons}</div>
              <div className="text-sm text-gray-500">已完成课程</div>
            </div>

            <div className="bg-white rounded-2xl p-6 shadow-sm text-center">
              <div className="w-12 h-12 bg-yellow-100 rounded-xl flex items-center justify-center mx-auto mb-3">
                <Trophy className="w-6 h-6 text-yellow-600" />
              </div>
              <div className="text-2xl font-bold text-gray-800">{totalPoints}</div>
              <div className="text-sm text-gray-500">总积分</div>
            </div>

            <div className="bg-white rounded-2xl p-6 shadow-sm text-center">
              <div className="w-12 h-12 bg-orange-100 rounded-xl flex items-center justify-center mx-auto mb-3">
                <Calendar className="w-6 h-6 text-orange-600" />
              </div>
              <div className="text-2xl font-bold text-gray-800">{dailyStreak}</div>
              <div className="text-sm text-gray-500">连续学习天数</div>
            </div>

            <div className="bg-white rounded-2xl p-6 shadow-sm text-center">
              <div className="w-12 h-12 bg-purple-100 rounded-xl flex items-center justify-center mx-auto mb-3">
                <Trophy className="w-6 h-6 text-purple-600" />
              </div>
              <div className="text-2xl font-bold text-gray-800">{unlockedAchievements}/{achievements.length}</div>
              <div className="text-sm text-gray-500">成就徽章</div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-8">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-white rounded-2xl shadow-sm overflow-hidden">
            <div className="p-6 border-b border-gray-100">
              <h3 className="font-semibold text-gray-800">成就徽章</h3>
            </div>
            <div className="p-6">
              <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-7 gap-4">
                {achievements.map((achievement) => {
                  const unlocked = userAchievements.some(a => a.achievementId === achievement.id)
                  return (
                    <div
                      key={achievement.id}
                      className={`relative rounded-xl p-4 text-center transition-all ${
                        unlocked
                          ? 'bg-gradient-to-br from-primary-50 to-blue-50 border-2 border-primary-200'
                          : 'bg-gray-100 opacity-50'
                      }`}
                      title={unlocked ? achievement.description : `${achievement.requiredPoints} 积分解锁`}
                    >
                      <div className="text-3xl mb-2">{unlocked ? achievement.icon : '🔒'}</div>
                      <div className="text-sm font-medium text-gray-800">{achievement.name}</div>
                    </div>
                  )
                })}
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-8">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-white rounded-2xl shadow-sm overflow-hidden">
            <div className="p-6 border-b border-gray-100">
              <h3 className="font-semibold text-gray-800">账户设置</h3>
            </div>
            <div className="divide-y divide-gray-100">
              <button className="w-full p-6 flex items-center justify-between hover:bg-gray-50 transition-colors">
                <div className="flex items-center space-x-4">
                  <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center">
                    <Settings className="w-6 h-6 text-blue-600" />
                  </div>
                  <div className="text-left">
                    <div className="font-medium text-gray-800">账户设置</div>
                    <div className="text-sm text-gray-500">修改密码、通知偏好等</div>
                  </div>
                </div>
                <svg className="w-5 h-5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </button>

              <button className="w-full p-6 flex items-center justify-between hover:bg-gray-50 transition-colors">
                <div className="flex items-center space-x-4">
                  <div className="w-12 h-12 bg-green-100 rounded-xl flex items-center justify-center">
                    <BookOpen className="w-6 h-6 text-green-600" />
                  </div>
                  <div className="text-left">
                    <div className="font-medium text-gray-800">学习偏好</div>
                    <div className="text-sm text-gray-500">设置学习目标、提醒等</div>
                  </div>
                </div>
                <svg className="w-5 h-5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </button>

              <button className="w-full p-6 flex items-center justify-between hover:bg-gray-50 transition-colors">
                <div className="flex items-center space-x-4">
                  <div className="w-12 h-12 bg-purple-100 rounded-xl flex items-center justify-center">
                    <Trophy className="w-6 h-6 text-purple-600" />
                  </div>
                  <div className="text-left">
                    <div className="font-medium text-gray-800">成就详情</div>
                    <div className="text-sm text-gray-500">查看所有成就要求</div>
                  </div>
                </div>
                <svg className="w-5 h-5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </button>

              <button onClick={handleLogout} className="w-full p-6 flex items-center justify-between hover:bg-red-50 transition-colors">
                <div className="flex items-center space-x-4">
                  <div className="w-12 h-12 bg-red-100 rounded-xl flex items-center justify-center">
                    <LogOut className="w-6 h-6 text-red-600" />
                  </div>
                  <div className="text-left">
                    <div className="font-medium text-red-600">退出登录</div>
                    <div className="text-sm text-gray-500">安全退出您的账户</div>
                  </div>
                </div>
              </button>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
