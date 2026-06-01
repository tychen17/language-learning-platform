import { Link } from 'react-router-dom'
import { BookOpen, Award, TrendingUp, Users, ChevronRight, Play, Star } from 'lucide-react'
import { useStore } from '@/store'

export default function HomePage() {
  const { courses, totalPoints, dailyStreak, learningProgress, user } = useStore()
  
  const completedLessons = Object.values(learningProgress).filter(p => p.completed).length
  const featuredCourses = courses.slice(0, 3)

  const stats = [
    { icon: BookOpen, label: '已完成课程', value: completedLessons, color: 'bg-primary-500' },
    { icon: Award, label: '累计积分', value: totalPoints, color: 'bg-warning-500' },
    { icon: TrendingUp, label: '连续学习', value: `${dailyStreak}天`, color: 'bg-success-500' },
    { icon: Users, label: '社区成员', value: '10,000+', color: 'bg-purple-500' },
  ]

  return (
    <div className="min-h-screen bg-gray-50">
      <section className="relative bg-gradient-to-br from-primary-600 via-primary-700 to-primary-800 text-white overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-10 left-10 w-72 h-72 bg-white rounded-full filter blur-3xl"></div>
          <div className="absolute bottom-10 right-10 w-96 h-96 bg-blue-300 rounded-full filter blur-3xl"></div>
        </div>
        
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-6">
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight">
                沉浸式多语种
                <br />
                <span className="text-primary-200">学习体验</span>
              </h1>
              <p className="text-lg text-primary-100 max-w-xl">
                支持英语、日语、韩语等主流语言，通过互动式学习模块，让语言学习变得轻松有趣。
              </p>
              <div className="flex flex-wrap gap-4">
                <Link
                  to="/courses"
                  className="px-8 py-4 bg-white text-primary-700 font-semibold rounded-xl hover:bg-primary-50 transition-all transform hover:scale-105 flex items-center space-x-2"
                >
                  <Play className="w-5 h-5" />
                  <span>开始学习</span>
                </Link>
                <Link
                  to="/courses"
                  className="px-8 py-4 border-2 border-white/30 text-white font-semibold rounded-xl hover:bg-white/10 transition-all"
                >
                  浏览课程
                </Link>
              </div>
            </div>
            
            <div className="hidden lg:block relative">
              <div className="relative w-full aspect-square max-w-lg mx-auto">
                <div className="absolute inset-0 bg-gradient-to-br from-primary-400 to-primary-600 rounded-3xl transform rotate-6 opacity-50"></div>
                <div className="absolute inset-0 bg-white rounded-3xl shadow-2xl overflow-hidden">
                  <img
                    src="https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=diverse%20people%20learning%20languages%20together%20online%20education%20modern%20technology&image_size=square"
                    alt="语言学习"
                    className="w-full h-full object-cover"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {stats.map((stat, index) => (
              <div
                key={index}
                className="bg-gray-50 rounded-xl p-6 text-center hover:shadow-lg transition-shadow"
              >
                <div className={`w-12 h-12 ${stat.color} rounded-xl flex items-center justify-center mx-auto mb-4`}>
                  <stat.icon className="w-6 h-6 text-white" />
                </div>
                <div className="text-3xl font-bold text-gray-800 mb-1">{stat.value}</div>
                <div className="text-gray-500 text-sm">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row md:items-end md:justify-between mb-12">
            <div>
              <h2 className="text-3xl font-bold text-gray-800 mb-2">推荐课程</h2>
              <p className="text-gray-500">根据您的学习进度推荐</p>
            </div>
            <Link
              to="/courses"
              className="mt-4 md:mt-0 text-primary-600 font-medium flex items-center space-x-1 hover:text-primary-700"
            >
              <span>查看全部课程</span>
              <ChevronRight className="w-5 h-5" />
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {featuredCourses.map((course) => (
              <div
                key={course.id}
                className="bg-white rounded-2xl shadow-sm overflow-hidden hover:shadow-xl transition-shadow group"
              >
                <div className="relative h-48 overflow-hidden">
                  <img
                    src={course.imageUrl}
                    alt={course.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  <div className="absolute top-4 left-4">
                    <span className="px-3 py-1 bg-white/90 backdrop-blur-sm rounded-full text-sm font-medium text-gray-700">
                      {course.language === 'english' ? '英语' : course.language === 'japanese' ? '日语' : '韩语'}
                    </span>
                  </div>
                  <div className="absolute top-4 right-4">
                    <span className={`px-3 py-1 rounded-full text-sm font-medium ${
                      course.level === 'beginner' ? 'bg-green-100 text-green-700' :
                      course.level === 'intermediate' ? 'bg-yellow-100 text-yellow-700' :
                      'bg-red-100 text-red-700'
                    }`}>
                      {course.level === 'beginner' ? '初级' : course.level === 'intermediate' ? '中级' : '高级'}
                    </span>
                  </div>
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-semibold text-gray-800 mb-2 group-hover:text-primary-600 transition-colors">
                    {course.title}
                  </h3>
                  <p className="text-gray-500 text-sm mb-4 line-clamp-2">{course.description}</p>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-4 text-sm text-gray-500">
                      <span className="flex items-center space-x-1">
                        <BookOpen className="w-4 h-4" />
                        <span>{course.lessonsCount}节课</span>
                      </span>
                      <span>{course.estimatedHours}小时</span>
                    </div>
                    <div className="flex items-center space-x-1">
                      <Star className="w-4 h-4 text-warning-500 fill-warning-500" />
                      <span className="text-sm font-medium">4.9</span>
                    </div>
                  </div>
                  <Link
                    to={`/courses/${course.id}`}
                    className="mt-4 w-full py-3 bg-primary-50 text-primary-600 font-medium rounded-xl text-center hover:bg-primary-100 transition-colors"
                  >
                    开始学习
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-800 mb-4">学习模块</h2>
            <p className="text-gray-500 max-w-2xl mx-auto">
              通过多种互动式学习方式，全面提升语言能力
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { title: '词汇记忆', description: '闪卡式单词学习，高效记忆', icon: '📚', color: 'from-blue-500 to-blue-600' },
              { title: '语法练习', description: '交互式语法练习，巩固基础', icon: '📝', color: 'from-green-500 to-green-600' },
              { title: '口语跟读', description: '语音识别跟读，提升发音', icon: '🗣️', color: 'from-orange-500 to-orange-600' },
              { title: '听力训练', description: '丰富听力材料，强化理解', icon: '👂', color: 'from-purple-500 to-purple-600' },
            ].map((module, index) => (
              <div
                key={index}
                className="bg-gray-50 rounded-2xl p-6 text-center hover:shadow-lg transition-all transform hover:-translate-y-1 cursor-pointer"
              >
                <div className={`w-16 h-16 bg-gradient-to-br ${module.color} rounded-2xl flex items-center justify-center mx-auto mb-4 text-3xl`}>
                  {module.icon}
                </div>
                <h3 className="text-lg font-semibold text-gray-800 mb-2">{module.title}</h3>
                <p className="text-gray-500 text-sm">{module.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-20 bg-gradient-to-br from-primary-50 to-blue-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-white rounded-3xl shadow-xl p-8 md:p-12">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
              <div>
                <h2 className="text-3xl font-bold text-gray-800 mb-4">
                  加入我们的学习社区
                </h2>
                <p className="text-gray-500 mb-6">
                  与志同道合的学习者交流经验，分享学习心得，共同进步。
                </p>
                <ul className="space-y-3">
                  {[
                    '参与话题讨论，获取学习建议',
                    '加入学习小组，互相监督鼓励',
                    '分享学习资源，共同成长',
                  ].map((item, index) => (
                    <li key={index} className="flex items-center space-x-3">
                      <div className="w-6 h-6 bg-success-100 rounded-full flex items-center justify-center">
                        <svg className="w-4 h-4 text-success-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                        </svg>
                      </div>
                      <span className="text-gray-600">{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
              <div className="bg-gray-50 rounded-2xl p-6">
                <div className="flex items-center space-x-4 mb-6">
                  <img
                    src={user?.avatarUrl}
                    alt={user?.username}
                    className="w-12 h-12 rounded-full object-cover"
                  />
                  <div>
                    <div className="font-semibold text-gray-800">{user?.username}</div>
                    <div className="text-sm text-gray-500">正在学习英语 · 中级水平</div>
                  </div>
                </div>
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="text-gray-600">学习进度</span>
                    <span className="font-semibold text-success-600">65%</span>
                  </div>
                  <div className="h-3 bg-gray-200 rounded-full overflow-hidden">
                    <div className="h-full bg-gradient-to-r from-primary-500 to-success-500 rounded-full w-[65%]"></div>
                  </div>
                  <div className="flex justify-between text-sm text-gray-500">
                    <span>已完成 16/24 节课</span>
                    <span>连续学习 5 天</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
