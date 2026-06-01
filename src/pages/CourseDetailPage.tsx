import { useParams, Link, useNavigate } from 'react-router-dom'
import { ArrowLeft, BookOpen, Clock, Play, CheckCircle, Circle, ChevronRight, Star } from 'lucide-react'
import { useStore } from '@/store'

export default function CourseDetailPage() {
  const { id } = useParams()
  const navigate = useNavigate()
  const { courses, lessons, learningProgress, selectCourse, selectLesson } = useStore()

  const course = courses.find((c) => c.id === id)
  const courseLessons = lessons.filter((l) => l.courseId === id)

  if (!course) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="text-6xl mb-4">📚</div>
          <h2 className="text-2xl font-semibold text-gray-800 mb-2">课程不存在</h2>
          <button
            onClick={() => navigate('/courses')}
            className="mt-4 px-6 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition-colors"
          >
            返回课程列表
          </button>
        </div>
      </div>
    )
  }

  const handleStartLesson = (lesson: typeof courseLessons[0]) => {
    selectCourse(course)
    selectLesson(lesson)
    navigate(`/learn/${lesson.moduleType}`)
  }

  const moduleTypeLabels: Record<string, string> = {
    vocabulary: '词汇',
    grammar: '语法',
    speaking: '口语',
    listening: '听力',
  }

  const moduleTypeColors: Record<string, string> = {
    vocabulary: 'bg-blue-100 text-blue-700',
    grammar: 'bg-green-100 text-green-700',
    speaking: 'bg-orange-100 text-orange-700',
    listening: 'bg-purple-100 text-purple-700',
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <section className="bg-gradient-to-br from-primary-600 via-primary-700 to-primary-800 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="flex items-center space-x-4 mb-8">
            <button
              onClick={() => navigate('/courses')}
              className="p-2 hover:bg-white/10 rounded-lg transition-colors"
            >
              <ArrowLeft className="w-6 h-6" />
            </button>
            <h1 className="text-2xl font-bold">课程详情</h1>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2">
              <h2 className="text-4xl font-bold mb-4">{course.title}</h2>
              <p className="text-primary-100 text-lg mb-6">{course.description}</p>
              <div className="flex flex-wrap gap-6 text-primary-100">
                <span className="flex items-center space-x-2">
                  <BookOpen className="w-5 h-5" />
                  <span>{course.lessonsCount} 节课</span>
                </span>
                <span className="flex items-center space-x-2">
                  <Clock className="w-5 h-5" />
                  <span>约 {course.estimatedHours} 小时</span>
                </span>
                <span className="flex items-center space-x-2">
                  <Star className="w-5 h-5 text-warning-400 fill-warning-400" />
                  <span>4.9 评分</span>
                </span>
              </div>
            </div>
            <div className="flex justify-center lg:justify-end">
              <div className="relative w-full max-w-xs">
                <img
                  src={course.imageUrl}
                  alt={course.title}
                  className="rounded-2xl shadow-2xl w-full aspect-video object-cover"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-white rounded-2xl shadow-sm overflow-hidden">
            <div className="p-6 border-b border-gray-100">
              <h3 className="text-xl font-semibold text-gray-800">课程章节</h3>
              <p className="text-gray-500 text-sm mt-1">共 {courseLessons.length} 个章节</p>
            </div>

            <div className="divide-y divide-gray-100">
              {courseLessons.map((lesson, index) => {
                const progress = learningProgress[lesson.id]
                const isCompleted = progress?.completed
                const score = progress?.score || 0

                return (
                  <div
                    key={lesson.id}
                    className="p-6 hover:bg-gray-50 transition-colors"
                  >
                    <div className="flex items-start space-x-4">
                      <div className="flex-shrink-0">
                        {isCompleted ? (
                          <div className="w-10 h-10 bg-success-100 rounded-full flex items-center justify-center">
                            <CheckCircle className="w-6 h-6 text-success-600" />
                          </div>
                        ) : index === 0 && !learningProgress[courseLessons[0]?.id]?.completed ? (
                          <button
                            onClick={() => handleStartLesson(lesson)}
                            className="w-10 h-10 bg-primary-600 rounded-full flex items-center justify-center hover:bg-primary-700 transition-colors"
                          >
                            <Play className="w-5 h-5 text-white" />
                          </button>
                        ) : (
                          <div className="w-10 h-10 bg-gray-100 rounded-full flex items-center justify-center">
                            <Circle className="w-5 h-5 text-gray-400" />
                          </div>
                        )}
                      </div>

                      <div className="flex-1 min-w-0">
                        <div className="flex items-center space-x-3 mb-1">
                          <h4 className="font-semibold text-gray-800">{lesson.title}</h4>
                          <span className={`px-2 py-0.5 rounded-full text-xs font-medium ${moduleTypeColors[lesson.moduleType]}`}>
                            {moduleTypeLabels[lesson.moduleType]}
                          </span>
                        </div>
                        <div className="flex items-center space-x-4 text-sm text-gray-500">
                          <span>第 {lesson.order} 章</span>
                          <span>{lesson.duration} 分钟</span>
                          {isCompleted && (
                            <span className="text-success-600 font-medium">得分: {score}</span>
                          )}
                        </div>
                      </div>

                      {!isCompleted && index === 0 && !learningProgress[courseLessons[0]?.id]?.completed && (
                        <Link
                          onClick={() => handleStartLesson(lesson)}
                          className="flex items-center space-x-1 text-primary-600 hover:text-primary-700 font-medium"
                        >
                          <span>开始学习</span>
                          <ChevronRight className="w-4 h-4" />
                        </Link>
                      )}
                    </div>
                  </div>
                )
              })}
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
