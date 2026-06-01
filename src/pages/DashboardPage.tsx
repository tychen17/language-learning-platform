import { Link } from 'react-router-dom'
import { BookOpen, Trophy, TrendingUp, Clock, Target, Award, ChevronRight } from 'lucide-react'
import { useStore } from '@/store'
import { weeklyProgress } from '@/data/mockData'
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, BarElement, Title, Tooltip, Legend } from 'chart.js'
import { Line, Bar } from 'react-chartjs-2'

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, BarElement, Title, Tooltip, Legend)

export default function DashboardPage() {
  const { learningProgress, totalPoints, dailyStreak, achievements, userAchievements, courses, lessons, user } = useStore()
  const completedLessons = Object.values(learningProgress).filter(p => p.completed).length
  const totalLessons = lessons.length
  const progressPercent = Math.round((completedLessons / totalLessons) * 100) || 0
  const unlockedAchievements = userAchievements.length
  const totalAchievements = achievements.length

  const lineChartData = {
    labels: weeklyProgress.map(d => d.day),
    datasets: [{
      label: '学习时长(分钟)',
      data: weeklyProgress.map(d => d.minutes),
      borderColor: '#3b82f6',
      backgroundColor: 'rgba(59, 130, 246, 0.1)',
      fill: true,
      tension: 0.4,
    }],
  }

  const barChartData = {
    labels: weeklyProgress.map(d => d.day),
    datasets: [{
      label: '正确率(%)',
      data: weeklyProgress.map(d => d.score),
      backgroundColor: '#10b981',
      borderRadius: 8,
    }],
  }

  const chartOptions = {
    responsive: true,
    plugins: {
      legend: {
        display: false,
      },
    },
    scales: {
      x: {
        grid: {
          display: false,
        },
      },
      y: {
        grid: {
          color: 'rgba(0, 0, 0, 0.05)',
        },
      },
    },
  }

  const recentProgress = Object.entries(learningProgress)
    .slice(0, 5)
    .map(([lessonId, progress]) => {
      const lesson = lessons.find(l => l.id === lessonId)
      return { lesson, ...progress }
    })
    .filter(item => item.lesson)

  return (
    <div className="min-h-screen bg-gray-50">
      <section className="bg-gradient-to-br from-primary-600 via-primary-700 to-primary-800 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between">
            <div>
              <h1 className="text-3xl font-bold mb-2">学习进度</h1>
              <p className="text-primary-200">追踪您的学习成果和成就</p>
            </div>
            <div className="mt-4 md:mt-0">
              <div className="flex items-center space-x-3 bg-white/10 rounded-xl px-4 py-2">
                <div className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center">
                  <span className="text-xl">
                    {user?.learningLanguage === 'english' ? '🇺🇸' :
                     user?.learningLanguage === 'japanese' ? '🇯🇵' : '🇰🇷'}
                  </span>
                </div>
                <div>
                  <div className="font-medium">
                    {user?.learningLanguage === 'english' ? '英语' :
                     user?.learningLanguage === 'japanese' ? '日语' : '韩语'}
                  </div>
                  <div className="text-sm text-primary-200">
                    {user?.level === 'beginner' ? '初级' :
                     user?.level === 'intermediate' ? '中级' : '高级'}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="bg-white rounded-2xl p-6 shadow-sm">
              <div className="flex items-center justify-between mb-4">
                <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center">
                  <BookOpen className="w-6 h-6 text-blue-600" />
                </div>
                <span className="text-sm text-gray-500">已完成</span>
              </div>
              <div className="text-3xl font-bold text-gray-800 mb-1">{completedLessons}</div>
              <div className="text-sm text-gray-500">共 {totalLessons} 节课</div>
            </div>

            <div className="bg-white rounded-2xl p-6 shadow-sm">
              <div className="flex items-center justify-between mb-4">
                <div className="w-12 h-12 bg-yellow-100 rounded-xl flex items-center justify-center">
                  <Trophy className="w-6 h-6 text-yellow-600" />
                </div>
                <span className="text-sm text-gray-500">总积分</span>
              </div>
              <div className="text-3xl font-bold text-gray-800 mb-1">{totalPoints}</div>
              <div className="text-sm text-gray-500">继续学习获取更多</div>
            </div>

            <div className="bg-white rounded-2xl p-6 shadow-sm">
              <div className="flex items-center justify-between mb-4">
                <div className="w-12 h-12 bg-orange-100 rounded-xl flex items-center justify-center">
                  <TrendingUp className="w-6 h-6 text-orange-600" />
                </div>
                <span className="text-sm text-gray-500">连续学习</span>
              </div>
              <div className="text-3xl font-bold text-gray-800 mb-1">{dailyStreak}</div>
              <div className="text-sm text-gray-500">天</div>
            </div>

            <div className="bg-white rounded-2xl p-6 shadow-sm">
              <div className="flex items-center justify-between mb-4">
                <div className="w-12 h-12 bg-purple-100 rounded-xl flex items-center justify-center">
                  <Award className="w-6 h-6 text-purple-600" />
                </div>
                <span className="text-sm text-gray-500">成就</span>
              </div>
              <div className="text-3xl font-bold text-gray-800 mb-1">{unlockedAchievements}/{totalAchievements}</div>
              <div className="text-sm text-gray-500">已解锁</div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <div className="bg-white rounded-2xl shadow-sm p-6">
              <div className="flex items-center justify-between mb-6">
                <h3 className="font-semibold text-gray-800">本周学习时长</h3>
                <Clock className="w-5 h-5 text-gray-400" />
              </div>
              <div className="h-64">
                <Line data={lineChartData} options={chartOptions} />
              </div>
            </div>

            <div className="bg-white rounded-2xl shadow-sm p-6">
              <div className="flex items-center justify-between mb-6">
                <h3 className="font-semibold text-gray-800">本周正确率</h3>
                <Target className="w-5 h-5 text-gray-400" />
              </div>
              <div className="h-64">
                <Bar data={barChartData} options={chartOptions} />
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-white rounded-2xl shadow-sm overflow-hidden">
            <div className="p-6 border-b border-gray-100">
              <h3 className="font-semibold text-gray-800">总体进度</h3>
            </div>
            <div className="p-6">
              <div className="flex items-center justify-between mb-4">
                <span className="text-gray-600">课程完成进度</span>
                <span className="font-semibold text-success-600">{progressPercent}%</span>
              </div>
              <div className="h-4 bg-gray-100 rounded-full overflow-hidden">
                <div
                  className="h-full bg-gradient-to-r from-primary-500 to-success-500 rounded-full transition-all duration-500"
                  style={{ width: `${progressPercent}%` }}
                />
              </div>
              <div className="flex justify-between mt-2 text-sm text-gray-500">
                <span>开始学习</span>
                <span>完成全部课程</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row md:items-end md:justify-between mb-6">
            <h3 className="font-semibold text-gray-800">成就徽章</h3>
            <Link to="/profile" className="text-primary-600 text-sm hover:text-primary-700">查看全部</Link>
          </div>
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
                >
                  <div className="text-3xl mb-2">{unlocked ? achievement.icon : '🔒'}</div>
                  <div className="text-sm font-medium text-gray-800">{achievement.name}</div>
                </div>
              )
            })}
          </div>
        </div>
      </section>

      <section className="py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row md:items-end md:justify-between mb-6">
            <h3 className="font-semibold text-gray-800">最近学习</h3>
            <Link to="/courses" className="text-primary-600 text-sm hover:text-primary-700 flex items-center space-x-1">
              <span>继续学习</span>
              <ChevronRight className="w-4 h-4" />
            </Link>
          </div>
          <div className="space-y-3">
            {recentProgress.map((item) => (
              <div key={item.lesson?.id} className="bg-white rounded-xl p-4 flex items-center justify-between">
                <div className="flex items-center space-x-4">
                  <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${
                    item.completed
                      ? 'bg-success-100'
                      : 'bg-gray-100'
                  }`}>
                    {item.completed ? (
                      <span className="text-2xl">✓</span>
                    ) : (
                      <span className="text-2xl">📚</span>
                    )}
                  </div>
                  <div>
                    <div className="font-medium text-gray-800">{item.lesson?.title}</div>
                    <div className="text-sm text-gray-500">
                      {item.completed ? `得分: ${item.score}` : '未完成'}
                    </div>
                  </div>
                </div>
                {item.completed ? (
                  <span className="text-success-600 text-sm font-medium">已完成</span>
                ) : (
                  <Link to="/courses" className="text-primary-600 text-sm font-medium">继续</Link>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  )
}
