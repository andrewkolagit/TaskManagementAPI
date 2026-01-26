import { useState, useEffect } from 'react';
import { FaTrash } from 'react-icons/fa';
import CommentsSection from './CommentsSection';
import api from '../services/api';

const TaskCard = ({ task, isSelected, onClick, onAssign, onComplete, onDelete, currentUserId }) => {
  const [isAssigned, setIsAssigned] = useState(task.assignedToId === currentUserId);
  const [assignedUser, setAssignedUser] = useState(null);
  const isCompleted = task.status === 'Completed';
  const canDelete = task.createdById === currentUserId || task.assignedToId === currentUserId;

  // Debug logging - check console
  console.log('=== Task Card Debug ===');
  console.log('Task Title:', task.title);
  console.log('Current User ID:', currentUserId);
  console.log('Task Creator ID:', task.createdById);
  console.log('Task Assigned ID:', task.assignedToId);
  console.log('Can Delete:', canDelete);
  console.log('======================');

  useEffect(() => {
    if (task.assignedToId) {
      fetchAssignedUser();
    }
  }, [task.assignedToId]);

  const fetchAssignedUser = async () => {
    try {
      const response = await api.get(`/users/${task.assignedToId}`);
      setAssignedUser(response.data);
    } catch (error) {
      console.error('Error fetching assigned user:', error);
    }
  };

  const getPriorityColor = (priority) => {
    switch (priority?.toLowerCase()) {
      case 'low':
        return 'bg-green-100 text-green-800';
      case 'medium':
        return 'bg-yellow-100 text-yellow-800';
      case 'high':
        return 'bg-orange-100 text-orange-800';
      case 'urgent':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const handleAssign = async () => {
    await onAssign(task.id);
    setIsAssigned(true);
  };

  const handleComplete = async () => {
    await onComplete(task.id);
  };

  const handleDelete = (e) => {
    e.stopPropagation();
    if (window.confirm(`Are you sure you want to delete "${task.title}"?`)) {
      onDelete(task.id);
    }
  };

  return (
    <div
      onClick={!isCompleted ? onClick : undefined}
      className={`
        bg-white rounded-lg p-4 mb-3 transition-all relative
        ${isCompleted 
          ? 'opacity-50 cursor-default' 
          : 'cursor-pointer hover:shadow-md'
        }
        ${isSelected && !isCompleted
          ? 'border-l-4 border-blue-500 bg-blue-50 shadow-md' 
          : 'border-l-4 border-transparent'
        }
      `}
    >
      <div className="flex justify-between items-start mb-2">
        <h3 className={`font-semibold text-gray-800 flex-1 ${isCompleted ? 'line-through' : ''}`}>
          {task.title}
        </h3>
        <div className="flex items-center gap-2">
          {!isCompleted && (
            <span className={`px-3 py-1 rounded-full text-xs font-semibold ${getPriorityColor(task.priority)}`}>
              {task.priority?.toUpperCase()}
            </span>
          )}
          {canDelete && !isCompleted && (
            <button
              onClick={handleDelete}
              className="text-red-500 hover:text-red-700 hover:bg-red-50 p-2 rounded transition"
              title="Delete task"
            >
              <FaTrash size={14} />
            </button>
          )}
        </div>
      </div>

      <p className="text-sm text-gray-600 mb-2">
        {task.description || 'No description'}
      </p>

      {/* Show assigned user */}
      {assignedUser && (
        <p className="text-xs text-blue-600 mb-2">
          👤 Assigned to: <span className="font-semibold">{assignedUser.firstName} {assignedUser.lastName} ({assignedUser.username})</span>
        </p>
      )}

      {isCompleted && (
        <p className="text-sm text-green-600 font-semibold">
          ✓ Completed
        </p>
      )}

      {isSelected && !isCompleted && (
        <>
          <div className="flex gap-2 mt-3 pt-3 border-t border-gray-200">
            {!isAssigned ? (
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  handleAssign();
                }}
                className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition text-sm"
              >
                Assign to Me
              </button>
            ) : (
              <button
                disabled
                className="bg-green-500 text-white px-4 py-2 rounded-lg cursor-not-allowed text-sm"
              >
                ✓ Assigned
              </button>
            )}
            
            {/* Mark as Completed button with authorization */}
            <button
              onClick={(e) => {
                e.stopPropagation();
                handleComplete();
              }}
              disabled={!canDelete}
              className={`px-4 py-2 rounded-lg transition text-sm ${
                canDelete 
                  ? 'bg-gray-500 text-white hover:bg-gray-600 cursor-pointer' 
                  : 'bg-gray-300 text-gray-500 cursor-not-allowed'
              }`}
              title={!canDelete ? 'Only the creator or assigned user can complete this task' : 'Mark as completed'}
            >
              Mark as Completed
            </button>
          </div>

          {/* Comments Section */}
          <CommentsSection 
            taskId={task.id} 
            currentUserId={currentUserId}
          />
        </>
      )}
    </div>
  );
};

export default TaskCard;
