import { FaTrash } from 'react-icons/fa';

const ProjectCard = ({ project, isSelected, onClick, onDelete }) => {
  const handleDelete = (e) => {
    e.stopPropagation(); // Prevent triggering onClick when clicking delete
    if (window.confirm(`Are you sure you want to delete "${project.name}"?`)) {
      onDelete(project.id);
    }
  };

  return (
    <div
      onClick={onClick}
      className={`
        bg-white rounded-lg p-4 mb-3 cursor-pointer transition-all
        ${isSelected 
          ? 'border-l-4 border-blue-500 bg-blue-50 shadow-md' 
          : 'border-l-4 border-transparent hover:shadow-md'
        }
      `}
    >
      <div className="flex items-start gap-2">
        <span className="text-2xl">📁</span>
        <div className="flex-1">
          <h3 className="font-bold text-lg text-gray-800">
            {project.name}
          </h3>
          <p className="text-sm text-gray-500 mb-2">
            {project.projectKey}
          </p>
          <p className="text-sm text-gray-600 line-clamp-2">
            {project.description || 'No description'}
          </p>
        </div>
      </div>
      
      <div className="flex justify-end mt-3">
        <button
          onClick={handleDelete}
          className="text-red-500 hover:text-red-700 hover:bg-red-50 p-2 rounded transition"
          title="Delete project"
        >
          <FaTrash />
        </button>
      </div>
    </div>
  );
};

export default ProjectCard;
