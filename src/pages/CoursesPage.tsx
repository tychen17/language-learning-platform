import { useState } from 'react'
import { Link } from 'react-router-dom'
import { Search, Filter, BookOpen, Clock, Star, ChevronRight } from 'lucide-react'
import { useStore } from '@/store'

export default function CoursesPage() {
  const { courses, selectedLanguage, setSelectedLanguage, selectedLevel, setSelectedLevel } = useStore()
  const [searchQuery, setSearchQuery] = useState('')

  const filteredCourses = courses.filter((course) => {
    const matchesLanguage = selectedLanguage === course.language
    const matchesLevel = selectedLevel === 'all' || selectedLevel === course.level
    const matchesSearch = course.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         course.description.toLowerCase().includes(searchQuery.toLowerCase())
    return matchesLanguage && matchesLevel && matchesSearch
  })

  const languages = [
    { id: 'english', label: '英语', flag: '🇺🇸' },
    { id: 'japanese', label: '日语', flag: '🇯🇵' },
    { id: 'korean', label: '韩语', flag: '🇰🇷' },
  ]

  const levels = [
    { id: 'all', label: '全部' },
    { id: 'beginner', label: '初级' },
    { id: 'intermediate', label: '中级' },
    { id: 'advanced', label: '高级' },
  ]

  return (
    <div className="min-h-screen bg-gray-50">
      <section className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold text-gray-800 mb-2">课程中心</h1>
            <p className="text-gray-500">选择您想要学习的语言和课程</p>
          </div>

          <div className="relative max-w-2xl mx-auto mb-8">
            <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
            <input
              type="text"
              placeholder="搜索课程..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-12 pr-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
            />
          </div>

          <div className="flex flex-col md:flex-row md:items-center md:justify-center gap-6">
            <div className="flex items-center space-x-2">
              <Filter className="w-5 h-5 text-gray-500" />
              <span className="text-gray-600 font-medium">语言:</span>
              <div className="flex space-x-2">
                {languages.map((lang) => (
                  <button
                    key={lang.id}
                    onClick={() => setSelectedLanguage(lang.id as 'english' | 'japanese' | 'korean')}
                    className={`px-4 py-2 rounded-lg font-medium transition-all ${
                      selectedLanguage === lang.id
                        ? 'bg-primary-600 text-white'
                        : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                    }`}
                  >
                    {lang.flag} {lang.label}
                  </button>
                ))}
              </div>
            </div>

            <div className="flex items-center space-x-2">
              <span className="text-gray-600 font-medium">难度:</span>
              <div className="flex space-x-2">
                {levels.map((level) => (
                  <button
                    key={level.id}
                    onClick={() => setSelectedLevel(level.id as 'beginner' | 'intermediate' | 'advanced' | 'all')}
                    className={`px-4 py-2 rounded-lg font-medium transition-all ${
                      selectedLevel === level.id
                        ? 'bg-primary-600 text-white'
                        : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                    }`}
                  >
                    {level.label}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredCourses.map((course) => (
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
                      {course.language === 'english' ? '🇺🇸 英语' : course.language === 'japanese' ? '🇯🇵 日语' : '🇰🇷 韩语'}
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
                  <div className="flex items-center justify-between text-sm text-gray-500 mb-4">
                    <span className="flex items-center space-x-1">
                      <BookOpen className="w-4 h-4" />
                      <span>{course.lessonsCount}节课</span>
                    </span>
                    <span className="flex items-center space-x-1">
                      <Clock className="w-4 h-4" />
                      <span>{course.estimatedHours}小时</span>
                    </span>
                    <span className="flex items-center space-x-1">
                      <Star className="w-4 h-4 text-warning-500 fill-warning-500" />
                      <span>4.9</span>
                    </span>
                  </div>
                  <Link
                    to={`/courses/${course.id}`}
                    className="w-full py-3 bg-primary-50 text-primary-600 font-medium rounded-xl text-center hover:bg-primary-100 transition-colors flex items-center justify-center space-x-2"
                  >
                    <span>查看课程</span>
                    <ChevronRight className="w-4 h-4" />
                  </Link>
                </div>
              </div>
            ))}
          </div>

          {filteredCourses.length === 0 && (
            <div className="text-center py-16">
              <div className="text-6xl mb-4">🔍</div>
              <h3 className="text-xl font-semibold text-gray-800 mb-2">未找到课程</h3>
              <p className="text-gray-500">请尝试调整筛选条件或搜索关键词</p>
            </div>
          )}
        </div>
      </section>
    </div>
  )
}
