import { useState } from 'react'
import { MessageCircle, Eye, Heart, Send, Users, Search, Plus } from 'lucide-react'
import { useStore } from '@/store'

export default function CommunityPage() {
  const { forumTopics, forumComments, studyGroups, addForumTopic, addForumComment, likeTopic } = useStore()
  const [activeTab, setActiveTab] = useState<'topics' | 'groups'>('topics')
  const [selectedTopic, setSelectedTopic] = useState<string | null>(null)
  const [newTopicModal, setNewTopicModal] = useState(false)
  const [newComment, setNewComment] = useState('')
  const [topicTitle, setTopicTitle] = useState('')
  const [topicContent, setTopicContent] = useState('')
  const [searchQuery, setSearchQuery] = useState('')

  const filteredTopics = forumTopics.filter(topic =>
    topic.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    topic.content.toLowerCase().includes(searchQuery.toLowerCase())
  )

  const topicComments = selectedTopic
    ? forumComments.filter(c => c.topicId === selectedTopic)
    : []

  const handleCreateTopic = () => {
    if (topicTitle && topicContent) {
      addForumTopic(topicTitle, topicContent)
      setTopicTitle('')
      setTopicContent('')
      setNewTopicModal(false)
    }
  }

  const handleAddComment = () => {
    if (newComment && selectedTopic) {
      addForumComment(selectedTopic, newComment)
      setNewComment('')
    }
  }

  const currentTopic = forumTopics.find(t => t.id === selectedTopic)

  return (
    <div className="min-h-screen bg-gray-50">
      <section className="bg-gradient-to-br from-primary-600 via-primary-700 to-primary-800 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <h1 className="text-3xl font-bold mb-2">学习社区</h1>
          <p className="text-primary-200">与其他学习者交流，分享学习心得</p>
        </div>
      </section>

      <section className="py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-6">
            <div className="flex space-x-2">
              <button
                onClick={() => setActiveTab('topics')}
                className={`px-4 py-2 rounded-lg font-medium transition-all ${
                  activeTab === 'topics'
                    ? 'bg-primary-600 text-white'
                    : 'bg-white text-gray-700 hover:bg-gray-100'
                }`}
              >
                <span className="flex items-center space-x-2">
                  <MessageCircle className="w-4 h-4" />
                  <span>讨论区</span>
                </span>
              </button>
              <button
                onClick={() => setActiveTab('groups')}
                className={`px-4 py-2 rounded-lg font-medium transition-all ${
                  activeTab === 'groups'
                    ? 'bg-primary-600 text-white'
                    : 'bg-white text-gray-700 hover:bg-gray-100'
                }`}
              >
                <span className="flex items-center space-x-2">
                  <Users className="w-4 h-4" />
                  <span>学习小组</span>
                </span>
              </button>
            </div>

            {activeTab === 'topics' && (
              <button
                onClick={() => setNewTopicModal(true)}
                className="flex items-center space-x-2 px-4 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition-colors"
              >
                <Plus className="w-4 h-4" />
                <span>发布话题</span>
              </button>
            )}
          </div>

          {activeTab === 'topics' && (
            <>
              <div className="relative max-w-xl mb-6">
                <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                <input
                  type="text"
                  placeholder="搜索话题..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-12 pr-4 py-3 bg-white border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary-500"
                />
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                <div className="lg:col-span-2 space-y-4">
                  {selectedTopic ? (
                    <div className="bg-white rounded-2xl shadow-sm overflow-hidden">
                      <div className="p-6 border-b border-gray-100">
                        <button
                          onClick={() => setSelectedTopic(null)}
                          className="text-gray-500 hover:text-gray-700 mb-4"
                        >
                          ← 返回话题列表
                        </button>
                        {currentTopic && (
                          <>
                            <h2 className="text-xl font-bold text-gray-800 mb-4">
                              {currentTopic.title}
                            </h2>
                            <div className="flex items-center space-x-4 text-sm text-gray-500 mb-4">
                              <img src={currentTopic.avatarUrl} alt="" className="w-8 h-8 rounded-full" />
                              <span>{currentTopic.username}</span>
                              <span>{currentTopic.createdAt}</span>
                            </div>
                            <p className="text-gray-600">{currentTopic.content}</p>
                          </>
                        )}
                      </div>

                      <div className="p-6">
                        <div className="flex items-center space-x-3 mb-4">
                          <button
                            onClick={() => likeTopic(selectedTopic)}
                            className="flex items-center space-x-1 text-gray-500 hover:text-red-500 transition-colors"
                          >
                            <Heart className="w-5 h-5" />
                            <span>{currentTopic?.likes}</span>
                          </button>
                          <span className="flex items-center space-x-1 text-gray-500">
                            <Eye className="w-5 h-5" />
                            <span>{currentTopic?.views}</span>
                          </span>
                          <span className="flex items-center space-x-1 text-gray-500">
                            <MessageCircle className="w-5 h-5" />
                            <span>{topicComments.length}</span>
                          </span>
                        </div>

                        <div className="space-y-4">
                          {topicComments.map(comment => (
                            <div key={comment.id} className="flex space-x-3">
                              <img src={comment.avatarUrl} alt="" className="w-10 h-10 rounded-full" />
                              <div className="flex-1">
                                <div className="flex items-center space-x-2 mb-1">
                                  <span className="font-medium text-gray-800">{comment.username}</span>
                                  <span className="text-sm text-gray-500">{comment.createdAt}</span>
                                </div>
                                <p className="text-gray-600">{comment.content}</p>
                              </div>
                            </div>
                          ))}
                        </div>

                        <div className="mt-6 pt-6 border-t border-gray-100">
                          <div className="flex space-x-3">
                            <input
                              type="text"
                              placeholder="写下你的评论..."
                              value={newComment}
                              onChange={(e) => setNewComment(e.target.value)}
                              className="flex-1 px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary-500"
                            />
                            <button
                              onClick={handleAddComment}
                              className="p-3 bg-primary-600 text-white rounded-xl hover:bg-primary-700 transition-colors"
                            >
                              <Send className="w-5 h-5" />
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  ) : (
                    filteredTopics.map(topic => (
                      <div
                        key={topic.id}
                        onClick={() => setSelectedTopic(topic.id)}
                        className="bg-white rounded-xl p-6 shadow-sm hover:shadow-md transition-shadow cursor-pointer"
                      >
                        <div className="flex items-start space-x-4">
                          <img src={topic.avatarUrl} alt="" className="w-12 h-12 rounded-full flex-shrink-0" />
                          <div className="flex-1 min-w-0">
                            <h3 className="font-semibold text-gray-800 mb-2 hover:text-primary-600 transition-colors">
                              {topic.title}
                            </h3>
                            <p className="text-gray-500 text-sm line-clamp-2 mb-4">{topic.content}</p>
                            <div className="flex items-center justify-between">
                              <div className="flex items-center space-x-4 text-sm text-gray-500">
                                <span>{topic.username}</span>
                                <span>{topic.createdAt}</span>
                              </div>
                              <div className="flex items-center space-x-4 text-sm text-gray-500">
                                <span className="flex items-center space-x-1">
                                  <Eye className="w-4 h-4" />
                                  <span>{topic.views}</span>
                                </span>
                                <span className="flex items-center space-x-1">
                                  <Heart className="w-4 h-4" />
                                  <span>{topic.likes}</span>
                                </span>
                                <span className="flex items-center space-x-1">
                                  <MessageCircle className="w-4 h-4" />
                                  <span>{topic.commentsCount}</span>
                                </span>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    ))
                  )}
                </div>

                <div className="lg:col-span-1">
                  <div className="bg-white rounded-2xl shadow-sm p-6">
                    <h3 className="font-semibold text-gray-800 mb-4">热门话题</h3>
                    <div className="space-y-4">
                      {forumTopics.slice(0, 5).map((topic, index) => (
                        <div
                          key={topic.id}
                          onClick={() => setSelectedTopic(topic.id)}
                          className="flex items-start space-x-3 cursor-pointer hover:bg-gray-50 p-2 rounded-lg transition-colors"
                        >
                          <span className="text-sm font-medium text-gray-400 w-6">{index + 1}</span>
                          <div>
                            <h4 className="text-sm font-medium text-gray-800">{topic.title}</h4>
                            <div className="flex items-center space-x-2 text-xs text-gray-500">
                              <span>{topic.likes} 赞</span>
                              <span>{topic.commentsCount} 评论</span>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </>
          )}

          {activeTab === 'groups' && (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {studyGroups.map(group => (
                <div key={group.id} className="bg-white rounded-2xl shadow-sm overflow-hidden">
                  <div className="p-6">
                    <div className="flex items-center space-x-3 mb-4">
                      <div className="w-12 h-12 bg-gradient-to-br from-primary-500 to-primary-600 rounded-xl flex items-center justify-center">
                        <Users className="w-6 h-6 text-white" />
                      </div>
                      <div>
                        <h3 className="font-semibold text-gray-800">{group.name}</h3>
                        <span className="text-sm text-gray-500">
                          {group.language === 'english' ? '🇺🇸 英语' :
                           group.language === 'japanese' ? '🇯🇵 日语' : '🇰🇷 韩语'}
                        </span>
                      </div>
                    </div>
                    <p className="text-gray-500 text-sm mb-4">{group.description}</p>
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-gray-500">{group.memberCount} 成员</span>
                      <button className="px-4 py-2 bg-primary-100 text-primary-700 rounded-lg font-medium hover:bg-primary-200 transition-colors">
                        加入小组
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </section>

      {newTopicModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl p-6 max-w-lg w-full">
            <h3 className="text-xl font-bold text-gray-800 mb-4">发布新话题</h3>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">标题</label>
                <input
                  type="text"
                  value={topicTitle}
                  onChange={(e) => setTopicTitle(e.target.value)}
                  placeholder="输入话题标题"
                  className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">内容</label>
                <textarea
                  value={topicContent}
                  onChange={(e) => setTopicContent(e.target.value)}
                  placeholder="分享你的想法..."
                  rows={4}
                  className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary-500"
                />
              </div>
              <div className="flex justify-end space-x-3">
                <button
                  onClick={() => setNewTopicModal(false)}
                  className="px-4 py-2 text-gray-600 hover:bg-gray-100 rounded-lg transition-colors"
                >
                  取消
                </button>
                <button
                  onClick={handleCreateTopic}
                  className="px-4 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition-colors"
                >
                  发布
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
