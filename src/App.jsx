import NewProject from "./components/NewProject";
import ProjectsSidebar from "./components/ProjectsSidebar";
import NoProjectSelected from "./components/NoProjectSelected";
import { useState } from "react";
import SelectedProject from "./components/selectedProject";
function App() {
  const [projectsState, setProjectsState] = useState({
    selectedProjectId: undefined,
    projects: [],
    tasks:[]
  });
  function handleAddTask(text){
    setProjectsState((prev) => {
      const taskId=Math.random()
      const newTask = { text:text,projectId:prev.selectedProjectId, id: taskId };
      return {
        ...prev,
        tasks: [...prev.newTask, newTask],
      };
    })
  }
  function handleDelateTask(){}
  function handleStartAddProject() {
    setProjectsState((prev) => {
      return {
        ...prev,
        selectedProjectId: null,
      };
    });
  }
  function handleCancelAddProject(){
    setProjectsState((prev) => {
      return {
        ...prev,
        selectedProjectId:undefined,
      };
    });
  }
  function handleAddProject(projectData) {
    setProjectsState((prev) => {
      const newProject = { ...projectData, id: Math.random() };
      return {
        ...prev,
        selectedProjectId: undefined,
        projects: [...prev.projects, newProject],
      };
    });
  }
  function handleSelectProject(id){
    setProjectsState((prev) => {
      return {
        ...prev,
        selectedProjectId: id,
      };
    });
  }
  function handleDeleteProject(){
    setProjectsState((prev) => {
      return {
        ...prev,
        selectedProjectId: undefined,
        projects:prev.projects.filter((project)=>project.id!==prev.selectedProjectId)
      };
    });
  }
  const selectedProject=projectsState.projects.find(project=>project.id===projectsState.selectedProjectId)
  let content=<SelectedProject tasks={projectsState.tasks} project={selectedProject} onDelete={handleDeleteProject} onAddTask={handleAddTask} onDeleteTask={handleDelateTask}/>;
  if (projectsState.selectedProjectId === null) {
    content = <NewProject onAdd={handleAddProject} onCancel={handleCancelAddProject}/>;
  } else if (projectsState.selectedProjectId === undefined) {
    content = <NoProjectSelected onStartAddProject={handleStartAddProject} />;
  }
  return (
    <main className="h-screen my-8 flex gap-8">
      <ProjectsSidebar onStartAddProject={handleStartAddProject} projects={projectsState.projects} onSelectProject={handleSelectProject} />
      {content}
    </main>
  );
}

export default App;
