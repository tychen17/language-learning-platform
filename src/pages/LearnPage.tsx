import { useState, useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { ArrowLeft, Volume2, CheckCircle, XCircle, Lightbulb, RotateCcw, ChevronRight, Mic, MicOff, Play } from 'lucide-react'
import { useStore } from '@/store'

export default function LearnPage() {
  const { moduleType } = useParams<{
    moduleType: string
  }>()
  const navigate = useNavigate()
  const { currentCourse, currentLesson, vocabularyWords, grammarExercises, speakingExercises, listeningExercises, updateProgress } = useStore()
  const [currentIndex, setCurrentIndex] = useState(0)
  const [showAnswer, setShowAnswer] = useState(false)
  const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null)
  const [isCorrect, setIsCorrect] = useState<boolean | null>(null)
  const [score, setScore] = useState(0)
  const [completedCount, setCompletedCount] = useState(0)
  const [isRecording, setIsRecording] = useState(false)
  const [flashcardFlipped, setFlashcardFlipped] = useState(false)
  const [showHint, setShowHint] = useState(false)
  const [sessionCompleted, setSessionCompleted] = useState(false)

  const exercises = moduleType === 'vocabulary' ? vocabularyWords :
                    moduleType === 'grammar' ? grammarExercises :
                    moduleType === 'speaking' ? speakingExercises :
                    listeningExercises

  const totalQuestions = exercises.length

  useEffect(() => {
    setCurrentIndex(0)
    setScore(0)
    setCompletedCount(0)
    setSessionCompleted(false)
  }, [moduleType])

  const handleAnswer = (answer: string) => {
    if (showAnswer) return
    setSelectedAnswer(answer)
    const correct = answer === (moduleType === 'vocabulary'
      ? exercises[currentIndex].translation
      : exercises[currentIndex].answer)
    setIsCorrect(correct)
    setShowAnswer(true)
    if (correct) {
      setScore(prev => prev + 10)
    }
    setCompletedCount(prev => prev + 1)
  }

  const handleNext = () => {
    if (currentIndex < totalQuestions - 1) {
      setCurrentIndex(prev => prev + 1)
      setShowAnswer(false)
      setSelectedAnswer(null)
      setIsCorrect(null)
      setShowHint(false)
      setFlashcardFlipped(false)
    } else {
      setSessionCompleted(true)
      if (currentLesson) {
        updateProgress(currentLesson.id, true, Math.round((score / (totalQuestions * 10)) * 100))
      }
    }
  }

  const handleRestart = () => {
    setCurrentIndex(0)
    setScore(0)
    setCompletedCount(0)
    setShowAnswer(false)
    setSelectedAnswer(null)
    setIsCorrect(null)
    setShowHint(false)
    setFlashcardFlipped(false)
    setSessionCompleted(false)
  }

  const moduleConfig = {
    vocabulary: { title: '词汇记忆', icon: '📚', color: 'from-blue-500 to-blue-600' },
    grammar: { title: '语法练习', icon: '📝', color: 'from-green-500 to-green-600' },
    speaking: { title: '口语跟读', icon: '🗣️', color: 'from-orange-500 to-orange-600' },
    listening: { title: '听力训练', icon: '👂', color: 'from-purple-500 to-purple-600' },
  }

  const config = moduleConfig[moduleType as keyof typeof moduleConfig] || moduleConfig.vocabulary

  const currentExercise = exercises[currentIndex]

  if (sessionCompleted) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
        <div className="bg-white rounded-3xl shadow-xl p-8 max-w-md w-full text-center animate-fade-in">
          <div className="w-20 h-20 bg-gradient-to-br from-success-500 to-success-600 rounded-full flex items-center justify-center mx-auto mb-6 text-4xl">
            🎉
          </div>
          <h2 className="text-2xl font-bold text-gray-800 mb-2">学习完成！</h2>
          <p className="text-gray-500 mb-6">
            您已完成本次学习，获得 {score} 积分
          </p>
          <div className="bg-gray-50 rounded-xl p-4 mb-6">
            <div className="flex justify-between items-center mb-2">
              <span className="text-gray-600">正确率</span>
              <span className="font-semibold text-success-600">
                {Math.round((score / (totalQuestions * 10)) * 100)}%
              </span>
            </div>
            <div className="h-3 bg-gray-200 rounded-full overflow-hidden">
              <div
                className="h-full bg-gradient-to-r from-success-500 to-success-600 rounded-full"
                style={{ width: `${(score / (totalQuestions * 10)) * 100}%` }}
              />
            </div>
          </div>
          <div className="flex space-x-4">
            <button
              onClick={handleRestart}
              className="flex-1 py-3 bg-gray-100 text-gray-700 rounded-xl font-medium hover:bg-gray-200 transition-colors"
            >
              再练一次
            </button>
            <button
              onClick={() => navigate(-1)}
              className="flex-1 py-3 bg-primary-600 text-white rounded-xl font-medium hover:bg-primary-700 transition-colors"
            >
              返回课程
            </button>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <section className="bg-gradient-to-br from-primary-600 via-primary-700 to-primary-800 text-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex items-center justify-between">
            <button
              onClick={() => navigate(-1)}
              className="p-2 hover:bg-white/10 rounded-lg transition-colors"
            >
              <ArrowLeft className="w-6 h-6" />
            </button>
            <div className="text-center">
              <h1 className="text-xl font-bold">{config.title}</h1>
              <p className="text-primary-200 text-sm">
                {currentCourse?.title} - {currentLesson?.title}
              </p>
            </div>
            <div className="flex items-center space-x-2">
              <span className="text-sm">{currentIndex + 1}/{totalQuestions}</span>
            </div>
          </div>
        </div>
      </section>

      <section className="py-8">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-white rounded-2xl shadow-sm p-6 md:p-8">
            <div className="flex justify-between items-center mb-6">
              <div className="flex items-center space-x-2">
                <div className={`w-12 h-12 bg-gradient-to-br ${config.color} rounded-xl flex items-center justify-center text-2xl`}>
                  {config.icon}
                </div>
                <div>
                  <div className="font-semibold text-gray-800">{config.title}</div>
                  <div className="text-sm text-gray-500">
                    得分: <span className="font-medium text-primary-600">{score}</span>
                  </div>
                </div>
              </div>
              <div className="text-right">
                <div className="text-sm text-gray-500">完成进度</div>
                <div className="text-lg font-bold text-gray-800">
                  {completedCount}/{totalQuestions}
                </div>
              </div>
            </div>

            {moduleType === 'vocabulary' && (
              <div className="flip-card h-64 cursor-pointer" onClick={() => setFlashcardFlipped(!flashcardFlipped)}>
                <div
                  className={`flip-card-inner w-full h-full relative transition-transform duration-500 ${flashcardFlipped ? 'rotate-y-180' : ''}`}
                  style={{ transformStyle: 'preserve-3d' }}
                >
                  <div
                    className="flip-card-front absolute inset-0 bg-gradient-to-br from-blue-500 to-blue-600 rounded-2xl flex flex-col items-center justify-center p-6"
                    style={{ backfaceVisibility: 'hidden' }}
                  >
                    <div className="text-white text-4xl font-bold mb-4">
                      {currentExercise?.word}
                    </div>
                    <button
                      onClick={(e) => {
                        e.stopPropagation()
                        const utterance = new SpeechSynthesisUtterance(currentExercise?.word || '')
                        utterance.lang = 'en-US'
                        speechSynthesis.speak(utterance)
                      }}
                      className="p-3 bg-white/20 rounded-full hover:bg-white/30 transition-colors"
                    >
                      <Volume2 className="w-6 h-6 text-white" />
                    </button>
                    <div className="mt-4 text-white/80 text-sm">点击卡片查看翻译</div>
                  </div>
                  <div
                    className="flip-card-back absolute inset-0 bg-gradient-to-br from-blue-600 to-blue-700 rounded-2xl flex flex-col items-center justify-center p-6"
                    style={{ backfaceVisibility: 'hidden', transform: 'rotateY(180deg)' }}
                  >
                    <div className="text-white text-3xl font-bold mb-2">
                      {currentExercise?.translation}
                    </div>
                    <div className="text-white/80 text-lg mb-4">
                      /{currentExercise?.pronunciation}/
                    </div>
                    <div className="text-white/70 text-sm text-center italic">
                      "{currentExercise?.example}"
                    </div>
                  </div>
                </div>
              </div>
            )}

            {moduleType === 'grammar' && (
              <div className="space-y-6">
                <div className="bg-gray-50 rounded-xl p-6">
                  <div className="text-lg font-medium text-gray-800 mb-4">
                    {currentExercise?.question}
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                    {currentExercise?.options?.map((option, index) => (
                      <button
                        key={index}
                        onClick={() => handleAnswer(option)}
                        disabled={showAnswer}
                        className={`p-4 rounded-xl font-medium transition-all ${
                          showAnswer
                            ? option === currentExercise?.answer
                              ? 'bg-success-100 text-success-700 border-2 border-success-500'
                              : selectedAnswer === option
                                ? 'bg-red-100 text-red-700 border-2 border-red-500'
                                : 'bg-gray-100 text-gray-500'
                            : 'bg-gray-100 text-gray-700 hover:bg-gray-200 border-2 border-transparent'
                        }`}
                      >
                        {option}
                      </button>
                    ))}
                  </div>
                </div>

                {showAnswer && (
                  <div className={`p-4 rounded-xl ${isCorrect ? 'bg-success-50' : 'bg-red-50'}`}>
                    <div className="flex items-center space-x-2 mb-2">
                      {isCorrect ? (
                        <>
                          <CheckCircle className="w-5 h-5 text-success-600" />
                          <span className="font-medium text-success-700">回答正确！</span>
                        </>
                      ) : (
                        <>
                          <XCircle className="w-5 h-5 text-red-600" />
                          <span className="font-medium text-red-700">回答错误</span>
                        </>
                      )}
                    </div>
                    {currentExercise?.explanation && (
                      <div className="flex items-start space-x-2 text-gray-600">
                        <Lightbulb className="w-4 h-4 text-warning-500 flex-shrink-0 mt-0.5" />
                        <span>{currentExercise.explanation}</span>
                      </div>
                    )}
                  </div>
                )}
              </div>
            )}

            {moduleType === 'speaking' && (
              <div className="space-y-6">
                <div className="bg-gray-50 rounded-xl p-6">
                  <div className="text-lg font-medium text-gray-800 mb-2">
                    {currentExercise?.question}
                  </div>
                  <div className="text-gray-500 text-sm mb-4">
                    示例回答: {currentExercise?.answer}
                  </div>
                  <div className="flex justify-center">
                    <button
                      onClick={() => setIsRecording(!isRecording)}
                      className={`w-20 h-20 rounded-full flex items-center justify-center transition-all ${
                        isRecording
                          ? 'bg-red-500 animate-pulse'
                          : 'bg-gradient-to-br from-orange-500 to-orange-600 hover:scale-105'
                      }`}
                    >
                      {isRecording ? (
                        <MicOff className="w-10 h-10 text-white" />
                      ) : (
                        <Mic className="w-10 h-10 text-white" />
                      )}
                    </button>
                  </div>
                  <div className="text-center mt-4">
                    <span className={`text-sm ${isRecording ? 'text-red-600' : 'text-gray-500'}`}>
                      {isRecording ? '正在录音...' : '点击按钮开始录音'}
                    </span>
                  </div>
                </div>

                {showAnswer && (
                  <div className="bg-success-50 rounded-xl p-4">
                    <div className="flex items-center space-x-2 mb-2">
                      <CheckCircle className="w-5 h-5 text-success-600" />
                      <span className="font-medium text-success-700">练习完成！</span>
                    </div>
                    <div className="text-gray-600">
                      <div className="text-sm mb-1">您的回答:</div>
                      <div className="font-medium">模拟语音识别结果</div>
                    </div>
                  </div>
                )}

                {!showAnswer && (
                  <button
                    onClick={() => {
                      setShowAnswer(true)
                      setIsCorrect(true)
                      setCompletedCount(prev => prev + 1)
                      setScore(prev => prev + 10)
                    }}
                    className="w-full py-3 bg-orange-100 text-orange-700 rounded-xl font-medium hover:bg-orange-200 transition-colors"
                  >
                    完成练习
                  </button>
                )}
              </div>
            )}

            {moduleType === 'listening' && (
              <div className="space-y-6">
                <div className="bg-gray-50 rounded-xl p-6">
                  <div className="text-lg font-medium text-gray-800 mb-4">
                    {currentExercise?.question}
                  </div>
                  <button
                    onClick={() => {
                      const utterance = new SpeechSynthesisUtterance(currentExercise?.answer || '')
                      utterance.lang = 'en-US'
                      speechSynthesis.speak(utterance)
                    }}
                    className="flex items-center space-x-3 px-6 py-3 bg-purple-100 text-purple-700 rounded-xl hover:bg-purple-200 transition-colors"
                  >
                    <Play className="w-5 h-5" />
                    <span className="font-medium">播放音频</span>
                  </button>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  {currentExercise?.options?.map((option, index) => (
                    <button
                      key={index}
                      onClick={() => handleAnswer(option)}
                      disabled={showAnswer}
                      className={`p-4 rounded-xl font-medium transition-all ${
                        showAnswer
                          ? option === currentExercise?.answer
                            ? 'bg-success-100 text-success-700 border-2 border-success-500'
                            : selectedAnswer === option
                              ? 'bg-red-100 text-red-700 border-2 border-red-500'
                              : 'bg-gray-100 text-gray-500'
                          : 'bg-gray-100 text-gray-700 hover:bg-gray-200 border-2 border-transparent'
                      }`}
                    >
                      {option}
                    </button>
                  ))}
                </div>

                {showAnswer && (
                  <div className={`p-4 rounded-xl ${isCorrect ? 'bg-success-50' : 'bg-red-50'}`}>
                    <div className="flex items-center space-x-2 mb-2">
                      {isCorrect ? (
                        <>
                          <CheckCircle className="w-5 h-5 text-success-600" />
                          <span className="font-medium text-success-700">回答正确！</span>
                        </>
                      ) : (
                        <>
                          <XCircle className="w-5 h-5 text-red-600" />
                          <span className="font-medium text-red-700">回答错误</span>
                        </>
                      )}
                    </div>
                    <div className="text-gray-600">
                      正确答案: <span className="font-medium">{currentExercise?.answer}</span>
                    </div>
                  </div>
                )}
              </div>
            )}

            {showAnswer && (
              <div className="flex justify-end mt-6">
                <button
                  onClick={handleNext}
                  className="flex items-center space-x-2 px-6 py-3 bg-primary-600 text-white rounded-xl font-medium hover:bg-primary-700 transition-colors"
                >
                  <span>
                    {currentIndex < totalQuestions - 1 ? '下一题' : '完成学习'}
                  </span>
                  <ChevronRight className="w-5 h-5" />
                </button>
              </div>
            )}

            {moduleType !== 'vocabulary' && !showAnswer && (
              <button
                onClick={() => setShowHint(true)}
                className="flex items-center space-x-2 text-warning-600 hover:text-warning-700 transition-colors"
              >
                <Lightbulb className="w-4 h-4" />
                <span className="text-sm">查看提示</span>
              </button>
            )}

            {showHint && moduleType !== 'vocabulary' && (
              <div className="bg-warning-50 rounded-xl p-4 mt-4">
                <div className="flex items-start space-x-2">
                  <Lightbulb className="w-4 h-4 text-warning-500 flex-shrink-0 mt-0.5" />
                  <span className="text-warning-800">
                    {currentExercise?.explanation || '仔细思考一下，答案就在选项中！'}
                  </span>
                </div>
              </div>
            )}
          </div>
        </div>
      </section>

      <section className="py-8">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <button
            onClick={handleRestart}
            className="w-full py-3 bg-gray-100 text-gray-700 rounded-xl font-medium hover:bg-gray-200 transition-colors flex items-center justify-center space-x-2"
          >
            <RotateCcw className="w-4 h-4" />
            <span>重新开始</span>
          </button>
        </div>
      </section>
    </div>
  )
}
