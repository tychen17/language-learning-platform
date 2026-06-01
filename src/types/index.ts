export interface User {
  id: string
  email: string
  username: string
  avatarUrl: string
  createdAt: string
  learningLanguage: string
  level: 'beginner' | 'intermediate' | 'advanced'
}

export interface Course {
  id: string
  title: string
  language: 'english' | 'japanese' | 'korean'
  level: 'beginner' | 'intermediate' | 'advanced'
  description: string
  imageUrl: string
  lessonsCount: number
  estimatedHours: number
}

export interface Lesson {
  id: string
  courseId: string
  title: string
  moduleType: 'vocabulary' | 'grammar' | 'speaking' | 'listening'
  order: number
  duration: number
}

export interface Exercise {
  id: string
  lessonId: string
  question: string
  answer: string
  options?: string[]
  explanation?: string
  audioUrl?: string
}

export interface Word {
  id: string
  word: string
  translation: string
  pronunciation: string
  example: string
  difficulty: number
}

export interface Progress {
  userId: string
  lessonId: string
  completed: boolean
  score: number
  completedAt?: string
}

export interface Achievement {
  id: string
  name: string
  description: string
  icon: string
  requiredPoints: number
}

export interface UserAchievement {
  achievementId: string
  earnedAt: string
}

export interface ForumTopic {
  id: string
  userId: string
  username: string
  avatarUrl: string
  title: string
  content: string
  createdAt: string
  views: number
  likes: number
  commentsCount: number
}

export interface ForumComment {
  id: string
  topicId: string
  userId: string
  username: string
  avatarUrl: string
  content: string
  createdAt: string
}

export interface StudyGroup {
  id: string
  name: string
  description: string
  language: string
  creatorId: string
  memberCount: number
  createdAt: string
}

export type ModuleType = 'vocabulary' | 'grammar' | 'speaking' | 'listening'

export type Language = 'english' | 'japanese' | 'korean'

export type Level = 'beginner' | 'intermediate' | 'advanced'
