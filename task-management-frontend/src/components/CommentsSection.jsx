import { useState, useEffect } from 'react';
import { getCommentsByTask, createComment, deleteComment } from '../services/api';
import { FaTrash } from 'react-icons/fa';

const CommentsSection = ({ taskId, currentUserId }) => {
  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState('');
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetchComments();
  }, [taskId]);

  const fetchComments = async () => {
    try {
      const response = await getCommentsByTask(taskId);
      setComments(response.data);
    } catch (error) {
      console.error('Error fetching comments:', error);
    }
  };

  const handleAddComment = async (e) => {
    e.preventDefault();
    if (!newComment.trim()) return;

    setLoading(true);
    try {
      await createComment({
        content: newComment,
        taskId: taskId,
        userId: currentUserId,
      });
      setNewComment('');
      fetchComments();
    } catch (error) {
      console.error('Error creating comment:', error);
      alert('Error adding comment: ' + (error.response?.data?.message || error.message));
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteComment = async (commentId) => {
    if (!window.confirm('Are you sure you want to delete this comment?')) return;

    try {
      await deleteComment(commentId);
      fetchComments();
    } catch (error) {
      console.error('Error deleting comment:', error);
      alert('Error deleting comment');
    }
  };

  const formatTimestamp = (timestamp) => {
    const date = new Date(timestamp);
    const now = new Date();
    const diffMs = now - date;
    const diffMins = Math.floor(diffMs / 60000);
    const diffHours = Math.floor(diffMs / 3600000);
    const diffDays = Math.floor(diffMs / 86400000);

    if (diffMins < 1) return 'Just now';
    if (diffMins < 60) return `${diffMins} minute${diffMins > 1 ? 's' : ''} ago`;
    if (diffHours < 24) return `${diffHours} hour${diffHours > 1 ? 's' : ''} ago`;
    if (diffDays < 7) return `${diffDays} day${diffDays > 1 ? 's' : ''} ago`;
    return date.toLocaleDateString();
  };

  return (
    <div className="mt-4 pt-4 border-t border-gray-200">
      <h4 className="font-semibold text-gray-700 mb-3 text-center">
        ━━━━━━━━━━━ COMMENTS ━━━━━━━━━━━
      </h4>

      {/* Comments List */}
      <div className="space-y-3 mb-4 max-h-60 overflow-y-auto">
        {comments.length === 0 ? (
          <p className="text-gray-500 text-sm text-center italic">
            No comments yet. Be the first to comment!
          </p>
        ) : (
          comments.map((comment) => (
            <div
              key={comment.id}
              className="bg-gray-50 p-3 rounded-lg"
            >
              <div className="flex justify-between items-start mb-1">
                <div className="flex items-center gap-2">
                  <span className="text-lg">💬</span>
                  <span className="font-semibold text-sm text-gray-700">
                    User #{comment.userId}
                  </span>
                  <span className="text-xs text-gray-500">
                    {formatTimestamp(comment.createdAt)}
                  </span>
                </div>
                {comment.userId === currentUserId && (
                  <button
                    onClick={() => handleDeleteComment(comment.id)}
                    className="text-red-500 hover:text-red-700 text-sm"
                    title="Delete comment"
                  >
                    <FaTrash size={12} />
                  </button>
                )}
              </div>
              <p className="text-sm text-gray-700 ml-7">
                {comment.content}
              </p>
            </div>
          ))
        )}
      </div>

      {/* Add Comment Form */}
      <form onSubmit={handleAddComment} className="flex gap-2">
        <input
          type="text"
          value={newComment}
          onChange={(e) => setNewComment(e.target.value)}
          placeholder="Add a comment..."
          className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500 text-sm"
          disabled={loading}
        />
        <button
          type="submit"
          disabled={loading || !newComment.trim()}
          className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition text-sm disabled:bg-gray-300 disabled:cursor-not-allowed"
        >
          {loading ? 'Adding...' : 'Add Comment'}
        </button>
      </form>
    </div>
  );
};

export default CommentsSection;
