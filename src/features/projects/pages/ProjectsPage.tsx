import { useState } from "react"

import AppShell
  from "../../../components/layout/AppShell"

import ProjectCard
  from "../components/ProjectCard"

import CreateProjectForm
  from "../components/CreateProjectForm"

import {
  useCreateProject,
  useDeleteProject,
  useProjects,
} from "../hooks/useProjects"


function ProjectsPage() {

  const [showCreateForm, setShowCreateForm] =
    useState(false)


  const {
    data: projects,
    isLoading,
    isError,
  } = useProjects()


  const createProject =
    useCreateProject()

  const deleteProject =
    useDeleteProject()


  return (
    <AppShell>

      <div className="projects-header">

        <div>

          <h2>All Projects</h2>

          <p>
            View and manage all your team projects.
          </p>

        </div>


        <button
          className="primary-button"
          onClick={() =>
            setShowCreateForm(true)
          }
        >
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

              deleting={
                deleteProject.isPending &&
                deleteProject.variables === project.id
              }

              onDelete={(projectId) =>
                deleteProject.mutate(projectId)
              }
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


      {showCreateForm && (

        <CreateProjectForm

          loading={
            createProject.isPending
          }

          onCancel={() =>
            setShowCreateForm(false)
          }

          onSubmit={(data) => {

            createProject.mutate(
              data,
              {
                onSuccess: () => {
                  setShowCreateForm(false)
                },
              }
            )

          }}

        />

      )}

    </AppShell>
  )
}


export default ProjectsPage