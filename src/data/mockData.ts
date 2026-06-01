import type { Course, Lesson, Word, Exercise, Achievement, ForumTopic, ForumComment, StudyGroup, User } from '@/types'

export const mockUser: User = {
  id: '1',
  email: 'user@example.com',
  username: '学习达人',
  avatarUrl: 'https://api.dicebear.com/7.x/avataaars/svg?seed=user1',
  createdAt: '2024-01-15',
  learningLanguage: 'english',
  level: 'intermediate',
}

export const courses: Course[] = [
  {
    id: 'c1',
    title: '英语入门课程',
    language: 'english',
    level: 'beginner',
    description: '从零开始学习英语，掌握基础词汇和语法',
    imageUrl: 'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=english%20language%20learning%20classroom%20with%20books%20and%20world%20map&image_size=landscape_16_9',
    lessonsCount: 24,
    estimatedHours: 12,
  },
  {
    id: 'c2',
    title: '英语进阶课程',
    language: 'english',
    level: 'intermediate',
    description: '深入学习英语语法和会话技巧',
    imageUrl: 'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=advanced%20english%20conversation%20class%20professional%20setting&image_size=landscape_16_9',
    lessonsCount: 36,
    estimatedHours: 18,
  },
  {
    id: 'c3',
    title: '英语高级课程',
    language: 'english',
    level: 'advanced',
    description: '精通英语听说读写，达到专业水平',
    imageUrl: 'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=professional%20business%20english%20meeting%20international%20team&image_size=landscape_16_9',
    lessonsCount: 48,
    estimatedHours: 24,
  },
  {
    id: 'c4',
    title: '日语入门课程',
    language: 'japanese',
    level: 'beginner',
    description: '学习日语五十音和基础会话',
    imageUrl: 'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=japanese%20language%20learning%20with%20kanji%20characters%20traditional%20setting&image_size=landscape_16_9',
    lessonsCount: 20,
    estimatedHours: 10,
  },
  {
    id: 'c5',
    title: '日语进阶课程',
    language: 'japanese',
    level: 'intermediate',
    description: '掌握日语语法和日常对话',
    imageUrl: 'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=japanese%20conversation%20practice%20casual%20setting%20modern%20style&image_size=landscape_16_9',
    lessonsCount: 32,
    estimatedHours: 16,
  },
  {
    id: 'c6',
    title: '韩语入门课程',
    language: 'korean',
    level: 'beginner',
    description: '学习韩语字母和基础词汇',
    imageUrl: 'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=korean%20language%20learning%20hangul%20characters%20colorful%20modern&image_size=landscape_16_9',
    lessonsCount: 18,
    estimatedHours: 9,
  },
  {
    id: 'c7',
    title: '韩语进阶课程',
    language: 'korean',
    level: 'intermediate',
    description: '提升韩语听说能力',
    imageUrl: 'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=korean%20drama%20scene%20language%20learning%20modern%20korean%20style&image_size=landscape_16_9',
    lessonsCount: 28,
    estimatedHours: 14,
  },
]

export const lessons: Lesson[] = [
  { id: 'l1', courseId: 'c1', title: '基础词汇', moduleType: 'vocabulary', order: 1, duration: 15 },
  { id: 'l2', courseId: 'c1', title: '基本语法', moduleType: 'grammar', order: 2, duration: 20 },
  { id: 'l3', courseId: 'c1', title: '日常对话', moduleType: 'speaking', order: 3, duration: 25 },
  { id: 'l4', courseId: 'c1', title: '听力入门', moduleType: 'listening', order: 4, duration: 20 },
  { id: 'l5', courseId: 'c2', title: '中级词汇', moduleType: 'vocabulary', order: 1, duration: 20 },
  { id: 'l6', courseId: 'c2', title: '复杂语法', moduleType: 'grammar', order: 2, duration: 30 },
  { id: 'l7', courseId: 'c2', title: '商务会话', moduleType: 'speaking', order: 3, duration: 35 },
  { id: 'l8', courseId: 'c2', title: '新闻听力', moduleType: 'listening', order: 4, duration: 25 },
]

export const vocabularyWords: Word[] = [
  { id: 'w1', word: 'apple', translation: '苹果', pronunciation: '/ˈæpl/', example: 'I eat an apple every day.', difficulty: 1 },
  { id: 'w2', word: 'beautiful', translation: '美丽的', pronunciation: '/ˈbjuːtɪfl/', example: 'She is a beautiful girl.', difficulty: 2 },
  { id: 'w3', word: 'important', translation: '重要的', pronunciation: '/ɪmˈpɔːrtnt/', example: 'Education is important.', difficulty: 2 },
  { id: 'w4', word: 'knowledge', translation: '知识', pronunciation: '/ˈnɑːlɪdʒ/', example: 'Knowledge is power.', difficulty: 3 },
  { id: 'w5', word: 'vocabulary', translation: '词汇', pronunciation: '/voʊˈkæbjəleri/', example: 'Build your vocabulary.', difficulty: 3 },
  { id: 'w6', word: 'conversation', translation: '对话', pronunciation: '/ˌkɑːnvərˈseɪʃn/', example: 'Have a conversation.', difficulty: 3 },
  { id: 'w7', word: 'practice', translation: '练习', pronunciation: '/ˈpræktɪs/', example: 'Practice makes perfect.', difficulty: 2 },
  { id: 'w8', word: 'improve', translation: '提高', pronunciation: '/ɪmˈpruːv/', example: 'Improve your skills.', difficulty: 2 },
]

export const grammarExercises: Exercise[] = [
  {
    id: 'g1',
    lessonId: 'l2',
    question: 'Choose the correct form: She ___ to school every day.',
    answer: 'goes',
    options: ['go', 'goes', 'going', 'went'],
    explanation: '第三人称单数动词需要加s/es',
  },
  {
    id: 'g2',
    lessonId: 'l2',
    question: 'Choose the correct form: I ___ breakfast at 7 AM.',
    answer: 'eat',
    options: ['eats', 'eating', 'eat', 'ate'],
    explanation: '第一人称使用动词原形',
  },
  {
    id: 'g3',
    lessonId: 'l6',
    question: 'Choose the correct form: If I ___ rich, I would travel the world.',
    answer: 'were',
    options: ['am', 'was', 'were', 'be'],
    explanation: '虚拟语气中使用were',
  },
  {
    id: 'g4',
    lessonId: 'l6',
    question: 'Choose the correct form: He suggested that she ___ early.',
    answer: 'leave',
    options: ['leaves', 'left', 'leave', 'leaving'],
    explanation: 'suggest后面的从句使用动词原形',
  },
]

export const speakingExercises: Exercise[] = [
  {
    id: 's1',
    lessonId: 'l3',
    question: 'Introduce yourself in English',
    answer: 'Hello, my name is [Your Name]. Nice to meet you.',
    explanation: '练习自我介绍',
  },
  {
    id: 's2',
    lessonId: 'l3',
    question: 'Describe your favorite food',
    answer: 'My favorite food is pizza. It is delicious.',
    explanation: '描述喜好',
  },
  {
    id: 's3',
    lessonId: 'l7',
    question: 'Talk about your work experience',
    answer: 'I have been working in this field for 5 years.',
    explanation: '商务场景对话',
  },
]

export const listeningExercises: Exercise[] = [
  {
    id: 'li1',
    lessonId: 'l4',
    question: 'What time does the meeting start?',
    answer: '9:00 AM',
    options: ['8:00 AM', '9:00 AM', '10:00 AM', '11:00 AM'],
    explanation: '听力理解练习',
  },
  {
    id: 'li2',
    lessonId: 'l4',
    question: 'Where is the restaurant located?',
    answer: 'On Main Street',
    options: ['On Main Street', 'On Park Avenue', 'On Broadway', 'On Fifth Avenue'],
    explanation: '地点听力',
  },
]

export const achievements: Achievement[] = [
  { id: 'a1', name: '初学者', description: '完成第一节课', icon: '🌟', requiredPoints: 10 },
  { id: 'a2', name: '坚持不懈', description: '连续学习7天', icon: '🔥', requiredPoints: 70 },
  { id: 'a3', name: '词汇大师', description: '掌握100个单词', icon: '📚', requiredPoints: 100 },
  { id: 'a4', name: '语法达人', description: '完成所有语法练习', icon: '🏆', requiredPoints: 150 },
  { id: 'a5', name: '口语能手', description: '完成所有口语练习', icon: '🗣️', requiredPoints: 120 },
  { id: 'a6', name: '听力专家', description: '完成所有听力练习', icon: '👂', requiredPoints: 120 },
  { id: 'a7', name: '全能学霸', description: '完成全部课程', icon: '👑', requiredPoints: 500 },
]

export const forumTopics: ForumTopic[] = [
  {
    id: 't1',
    userId: '1',
    username: '学习达人',
    avatarUrl: 'https://api.dicebear.com/7.x/avataaars/svg?seed=user1',
    title: '分享我的英语学习心得',
    content: '大家好，我想分享一下我学习英语的经验...',
    createdAt: '2024-01-20',
    views: 128,
    likes: 24,
    commentsCount: 15,
  },
  {
    id: 't2',
    userId: '2',
    username: '日语爱好者',
    avatarUrl: 'https://api.dicebear.com/7.x/avataaars/svg?seed=user2',
    title: '日语五十音学习技巧',
    content: '最近在学习日语五十音，总结了一些记忆方法...',
    createdAt: '2024-01-19',
    views: 96,
    likes: 18,
    commentsCount: 8,
  },
  {
    id: 't3',
    userId: '3',
    username: '韩语新手',
    avatarUrl: 'https://api.dicebear.com/7.x/avataaars/svg?seed=user3',
    title: '韩语TOPIK考试经验分享',
    content: '刚刚通过了TOPIK中级考试，想给大家一些建议...',
    createdAt: '2024-01-18',
    views: 256,
    likes: 42,
    commentsCount: 23,
  },
  {
    id: 't4',
    userId: '4',
    username: '语言学习者',
    avatarUrl: 'https://api.dicebear.com/7.x/avataaars/svg?seed=user4',
    title: '如何有效背单词？',
    content: '背单词总是记了又忘，有没有好方法？',
    createdAt: '2024-01-17',
    views: 312,
    likes: 35,
    commentsCount: 41,
  },
]

export const forumComments: ForumComment[] = [
  {
    id: 'c1',
    topicId: 't1',
    userId: '2',
    username: '日语爱好者',
    avatarUrl: 'https://api.dicebear.com/7.x/avataaars/svg?seed=user2',
    content: '感谢分享！很有帮助',
    createdAt: '2024-01-20',
  },
  {
    id: 'c2',
    topicId: 't1',
    userId: '3',
    username: '韩语新手',
    avatarUrl: 'https://api.dicebear.com/7.x/avataaars/svg?seed=user3',
    content: '我也有类似的经验，一起加油！',
    createdAt: '2024-01-20',
  },
]

export const studyGroups: StudyGroup[] = [
  {
    id: 'sg1',
    name: '英语初学者小组',
    description: '适合英语零基础的小伙伴一起学习',
    language: 'english',
    creatorId: '1',
    memberCount: 45,
    createdAt: '2024-01-10',
  },
  {
    id: 'sg2',
    name: '日语学习交流群',
    description: '一起学习日语，分享学习资源',
    language: 'japanese',
    creatorId: '2',
    memberCount: 32,
    createdAt: '2024-01-12',
  },
  {
    id: 'sg3',
    name: '韩语TOPIK备考群',
    description: '备考TOPIK考试的小伙伴集合',
    language: 'korean',
    creatorId: '3',
    memberCount: 58,
    createdAt: '2024-01-08',
  },
]

export const weeklyProgress = [
  { day: '周一', minutes: 45, score: 85 },
  { day: '周二', minutes: 30, score: 78 },
  { day: '周三', minutes: 60, score: 92 },
  { day: '周四', minutes: 40, score: 88 },
  { day: '周五', minutes: 55, score: 90 },
  { day: '周六', minutes: 70, score: 95 },
  { day: '周日', minutes: 35, score: 82 },
]
