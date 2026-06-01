import { create } from 'zustand'
import type { User, Course, Lesson, Word, Exercise, Achievement, UserAchievement, ForumTopic, ForumComment, StudyGroup } from '@/types'
import { mockUser, courses, lessons, vocabularyWords, grammarExercises, speakingExercises, listeningExercises, achievements, forumTopics, forumComments, studyGroups } from '@/data/mockData'

interface AppState {
  user: User | null
  isLoggedIn: boolean
  courses: Course[]
  lessons: Lesson[]
  currentCourse: Course | null
  currentLesson: Lesson | null
  vocabularyWords: Word[]
  grammarExercises: Exercise[]
  speakingExercises: Exercise[]
  listeningExercises: Exercise[]
  achievements: Achievement[]
  userAchievements: UserAchievement[]
  forumTopics: ForumTopic[]
  forumComments: ForumComment[]
  studyGroups: StudyGroup[]
  learningProgress: Record<string, { completed: boolean; score: number }>
  totalPoints: number
  dailyStreak: number
  selectedLanguage: 'english' | 'japanese' | 'korean'
  selectedLevel: 'beginner' | 'intermediate' | 'advanced' | 'all'

  login: (email: string, password: string) => void
  logout: () => void
  signup: (email: string, password: string, username: string) => void
  selectCourse: (course: Course) => void
  selectLesson: (lesson: Lesson) => void
  updateProgress: (lessonId: string, completed: boolean, score: number) => void
  addAchievement: (achievementId: string) => void
  checkAchievements: () => void
  setSelectedLanguage: (language: 'english' | 'japanese' | 'korean') => void
  setSelectedLevel: (level: 'beginner' | 'intermediate' | 'advanced' | 'all') => void
  addForumTopic: (title: string, content: string) => void
  addForumComment: (topicId: string, content: string) => void
  likeTopic: (topicId: string) => void
}

export const useStore = create<AppState>((set, get) => ({
  user: mockUser,
  isLoggedIn: true,
  courses,
  lessons,
  currentCourse: null,
  currentLesson: null,
  vocabularyWords,
  grammarExercises,
  speakingExercises,
  listeningExercises,
  achievements,
  userAchievements: [{ achievementId: 'a1', earnedAt: '2024-01-15' }],
  forumTopics,
  forumComments,
  studyGroups,
  learningProgress: { 'l1': { completed: true, score: 90 }, 'l2': { completed: true, score: 85 } },
  totalPoints: 150,
  dailyStreak: 5,
  selectedLanguage: 'english',
  selectedLevel: 'all',

  login: (email: string, password: string) => {
    if (email === 'user@example.com' && password === 'password') {
      set({ user: mockUser, isLoggedIn: true })
    }
  },

  logout: () => {
    set({ user: null, isLoggedIn: false })
  },

  signup: (email: string, password: string, username: string) => {
    const newUser: User = {
      id: 'new',
      email,
      username,
      avatarUrl: `https://api.dicebear.com/7.x/avataaars/svg?seed=${username}`,
      createdAt: new Date().toISOString().split('T')[0],
      learningLanguage: 'english',
      level: 'beginner',
    }
    set({ user: newUser, isLoggedIn: true })
  },

  selectCourse: (course: Course) => {
    set({ currentCourse: course })
  },

  selectLesson: (lesson: Lesson) => {
    set({ currentLesson: lesson })
  },

  updateProgress: (lessonId: string, completed: boolean, score: number) => {
    set((state) => {
      const currentProgress = state.learningProgress[lessonId]
      const pointsEarned = completed ? Math.floor(score / 10) : 0
      const newProgress = {
        ...state.learningProgress,
        [lessonId]: { completed, score },
      }
      const newTotalPoints = state.totalPoints + (currentProgress?.completed ? 0 : pointsEarned)
      
      return {
        learningProgress: newProgress,
        totalPoints: newTotalPoints,
      }
    })
    get().checkAchievements()
  },

  addAchievement: (achievementId: string) => {
    set((state) => {
      if (!state.userAchievements.find(a => a.achievementId === achievementId)) {
        return {
          userAchievements: [...state.userAchievements, { achievementId, earnedAt: new Date().toISOString().split('T')[0] }],
        }
      }
      return state
    })
  },

  checkAchievements: () => {
    const { totalPoints, achievements, userAchievements } = get()
    achievements.forEach((achievement) => {
      if (totalPoints >= achievement.requiredPoints && !userAchievements.find(a => a.achievementId === achievement.id)) {
        get().addAchievement(achievement.id)
      }
    })
  },

  setSelectedLanguage: (language) => {
    set({ selectedLanguage: language })
  },

  setSelectedLevel: (level) => {
    set({ selectedLevel: level })
  },

  addForumTopic: (title: string, content: string) => {
    const { user } = get()
    if (!user) return

    const newTopic: ForumTopic = {
      id: `t${Date.now()}`,
      userId: user.id,
      username: user.username,
      avatarUrl: user.avatarUrl,
      title,
      content,
      createdAt: new Date().toISOString().split('T')[0],
      views: 0,
      likes: 0,
      commentsCount: 0,
    }

    set((state) => ({
      forumTopics: [newTopic, ...state.forumTopics],
    }))
  },

  addForumComment: (topicId: string, content: string) => {
    const { user } = get()
    if (!user) return

    const newComment: ForumComment = {
      id: `c${Date.now()}`,
      topicId,
      userId: user.id,
      username: user.username,
      avatarUrl: user.avatarUrl,
      content,
      createdAt: new Date().toISOString().split('T')[0],
    }

    set((state) => ({
      forumComments: [...state.forumComments, newComment],
      forumTopics: state.forumTopics.map((topic) =>
        topic.id === topicId ? { ...topic, commentsCount: topic.commentsCount + 1 } : topic
      ),
    }))
  },

  likeTopic: (topicId: string) => {
    set((state) => ({
      forumTopics: state.forumTopics.map((topic) =>
        topic.id === topicId ? { ...topic, likes: topic.likes + 1 } : topic
      ),
    }))
  },
}))
