import { useState, useEffect } from 'react';
import Navbar from '../components/Navbar';
import ProjectCard from '../components/ProjectCard';
import TaskCard from '../components/TaskCard';
import CreateProjectModal from '../components/CreateProjectModal';
import CreateTaskModal from '../components/CreateTaskModal';
import api,{
  getAllProjects,
  createProject,
  deleteProject,
  getTasksByProject,
  createTask,
  updateTask,
  deleteTask,
} from '../services/api';

const Home = () => {
  const [projects, setProjects] = useState([]);
  const [tasks, setTasks] = useState([]);
  const [selectedProject, setSelectedProject] = useState(null);
  const [selectedTask, setSelectedTask] = useState(null);
  const [isProjectModalOpen, setIsProjectModalOpen] = useState(false);
  const [isTaskModalOpen, setIsTaskModalOpen] = useState(false);
  const [currentUser, setCurrentUser] = useState(null);

  useEffect(() => {
  fetchCurrentUser();
}, []);

const fetchCurrentUser = async () => {
  try {    const response = await api.get('/users/me');
    setCurrentUser(response.data);
  } catch (error) {
    console.error('Error fetching current user:', error);
  }
};

  useEffect(() => {
    fetchProjects();
  }, []);

  useEffect(() => {
    if (selectedProject) {
      fetchTasks(selectedProject.id);
    }
  }, [selectedProject]);

  const fetchProjects = async () => {
    try {
      const response = await getAllProjects();
      setProjects(response.data);
    } catch (error) {
      console.error('Error fetching projects:', error);
    }
  };

  const fetchTasks = async (projectId) => {
    try {
      const response = await getTasksByProject(projectId);
      setTasks(response.data);
    } catch (error) {
      console.error('Error fetching tasks:', error);
    }
  };

  const handleCreateProject = async (projectData) => {
    try {
      const newProject = {
        ...projectData,
        ownerId: currentUser.id,
        status: 'Active',
      };
      await createProject(newProject);
      fetchProjects();
    } catch (error) {
      console.error('Error creating project:', error);
      alert('Error creating project: ' + (error.response?.data?.message || error.message));
    }
  };

  const handleDeleteProject = async (projectId) => {
  try {
    await deleteProject(projectId);
    
    if (selectedProject?.id === projectId) {
      setSelectedProject(null);
      setTasks([]);
    }
    
    fetchProjects();
  } catch (error) {
    console.error('Error deleting project:', error);
    alert('Error deleting project: ' + (error.response?.data?.message || error.message));
  }
};

  const handleCreateTask = async (taskData) => {
    try {
      const newTask = {
        ...taskData,
        projectId: selectedProject.id,
        createdById: currentUser.id,
        status: 'To Do',
      };
      await createTask(newTask);
      fetchTasks(selectedProject.id);
    } catch (error) {
      console.error('Error creating task:', error);
      alert('Error creating task: ' + (error.response?.data?.message || error.message));
    }
  };

  const handleAssignTask = async (taskId) => {
    try {
      const taskToUpdate = tasks.find(t => t.id === taskId);
      await updateTask(taskId, {
        ...taskToUpdate,
        assignedToId: currentUser.id,
      });
      fetchTasks(selectedProject.id);
    } catch (error) {
      console.error('Error assigning task:', error);
    }
  };

  const handleCompleteTask = async (taskId) => {
    try {
      const taskToUpdate = tasks.find(t => t.id === taskId);
      await updateTask(taskId, {
        ...taskToUpdate,
        status: 'Completed',
      });
      fetchTasks(selectedProject.id);
      setSelectedTask(null);
    } catch (error) {
      console.error('Error completing task:', error);
    }
  };

  const handleProjectClick = (project) => {
    setSelectedProject(project);
    setSelectedTask(null);
  };

  const handleTaskClick = (task) => {
    setSelectedTask(task);
  };

  const handleDeleteTask = async (taskId) => {
  try {
    await deleteTask(taskId);
    fetchTasks(selectedProject.id);
    setSelectedTask(null);
  } catch (error) {
    console.error('Error deleting task:', error);
    alert('Error deleting task: ' + (error.response?.data?.message || error.message));
  }
};

  const activeTasks = tasks.filter(task => task.status !== 'Completed');
  const completedTasks = tasks.filter(task => task.status === 'Completed');

  return (
    <div className="min-h-screen bg-gray-100">
      <Navbar user={currentUser} />

      <div className="flex h-[calc(100vh-64px)]">
        <div className="w-[30%] bg-gray-50 p-4 overflow-y-auto border-r border-gray-200">
          <h2 className="text-xl font-bold text-gray-800 mb-4">PROJECTS</h2>

          <button
            onClick={() => setIsProjectModalOpen(true)}
            className="w-full bg-blue-500 text-white py-3 rounded-lg hover:bg-blue-600 transition mb-4 font-semibold"
          >
            + Create Project
          </button>

          {projects.length === 0 ? (
            <p className="text-gray-500 text-center mt-8">
              No projects yet. Create your first project!
            </p>
          ) : (
            projects.map((project) => (
              <ProjectCard
                key={project.id}
                project={project}
                isSelected={selectedProject?.id === project.id}
                onClick={() => handleProjectClick(project)}
                onDelete={handleDeleteProject}
              />
            ))
          )}
        </div>

        <div className="w-[70%] bg-white p-4 overflow-y-auto">
          <h2 className="text-xl font-bold text-gray-800 mb-4">TASKS</h2>

          <button
            onClick={() => setIsTaskModalOpen(true)}
            disabled={!selectedProject}
            className={`w-full py-3 rounded-lg transition mb-4 font-semibold ${
              selectedProject
                ? 'bg-blue-500 text-white hover:bg-blue-600 cursor-pointer'
                : 'bg-gray-300 text-gray-500 cursor-not-allowed opacity-50'
            }`}
          >
            + Create Task
            {!selectedProject && (
              <span className="block text-sm font-normal mt-1">
                (Select a project first)
              </span>
            )}
          </button>

          {!selectedProject ? (
            <p className="text-gray-500 text-center mt-8">
              Select a project to view tasks
            </p>
          ) : tasks.length === 0 ? (
            <p className="text-gray-500 text-center mt-8">
              No tasks yet. Create your first task!
            </p>
          ) : (
            <div>
              {activeTasks.length > 0 && (
                <>
                  <div className="border-b-2 border-gray-300 mb-4 pb-2">
                    <h3 className="text-center text-gray-500 font-semibold">
                      ACTIVE TASKS
                    </h3>
                  </div>

                  {activeTasks.map((task) => (
                    <TaskCard
                      key={task.id}
                      task={task}
                      isSelected={selectedTask?.id === task.id}
                      onClick={() => handleTaskClick(task)}
                      onAssign={handleAssignTask}
                      onComplete={handleCompleteTask}
                      onDelete={handleDeleteTask}
                      currentUserId={currentUser?.id}
                    />
                  ))}
                </>
              )}

              {completedTasks.length > 0 && (
                <>
                  <div className="border-b-2 border-gray-300 mb-4 pb-2 mt-8">
                    <h3 className="text-center text-gray-500 font-semibold">
                      COMPLETED TASKS
                    </h3>
                  </div>

                  {completedTasks.map((task) => (
                    <TaskCard
                      key={task.id}
                      task={task}
                      isSelected={false}
                      onClick={() => {}}
                      onAssign={() => {}}
                      onComplete={() => {}}
                      currentUserId={currentUser?.id}
                    />
                  ))}
                </>
              )}
            </div>
          )}
        </div>
      </div>

      {/* Modals */}
      <CreateProjectModal
        isOpen={isProjectModalOpen}
        onClose={() => setIsProjectModalOpen(false)}
        onCreateProject={handleCreateProject}
      />

      <CreateTaskModal
        isOpen={isTaskModalOpen}
        onClose={() => setIsTaskModalOpen(false)}
        onCreateTask={handleCreateTask}
        selectedProject={selectedProject}
      />
    </div>
  );
};

export default Home;
