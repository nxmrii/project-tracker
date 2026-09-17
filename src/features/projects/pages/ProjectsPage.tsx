import AppShell from "../../../components/layout/AppShell"

import ProjectCard from "../components/ProjectCard"

import { useProjects } from "../hooks/useProjects"


function ProjectsPage() {

  const {
    data: projects,
    isLoading,
    isError,
  } = useProjects()


  return (
    <AppShell>

      <div className="projects-header">

        <div>
          <h2>All Projects</h2>

          <p>
            View and manage all your team projects.
          </p>
        </div>

        <button className="primary-button">
          + New Project
        </button>

      </div>


      {isLoading && (
        <div className="state-message">
          Loading projects...
        </div>
      )}


      {isError && (
        <div className="state-message error-state">
          Failed to load projects.
        </div>
      )}


      {projects && projects.length > 0 && (

        <div className="projects-grid">

          {projects.map((project) => (

            <ProjectCard
              key={project.id}
              project={project}
            />

          ))}

        </div>

      )}


      {projects && projects.length === 0 && (

        <div className="empty-projects">

          <div className="empty-icon">
            ▦
          </div>

          <h3>No projects yet</h3>

          <p>
            Create your first project to start
            tracking your team's work.
          </p>

        </div>

      )}

    </AppShell>
  )
}


export default ProjectsPage