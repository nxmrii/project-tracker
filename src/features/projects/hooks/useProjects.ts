import {
  useMutation,
  useQuery,
  useQueryClient,
} from "@tanstack/react-query"

import {
  addMemberApi,
  addTaskApi,
  updateTaskStatusApi,
  createProjectApi,
  deleteProjectApi,
  getProjectsApi,
  getProjectByIdApi,
} from "../api/projects.api"




export function useProjects() {

  return useQuery({
    queryKey: ["projects"],
    queryFn: getProjectsApi,
  })

}


export function useCreateProject() {

  const queryClient = useQueryClient()

  return useMutation({

    mutationFn: createProjectApi,

    onSuccess: () => {

      queryClient.invalidateQueries({
        queryKey: ["projects"],
      })

    },

  })

}


export function useDeleteProject() {

  const queryClient = useQueryClient()

  return useMutation({

    mutationFn: deleteProjectApi,

    onSuccess: () => {

      queryClient.invalidateQueries({
        queryKey: ["projects"],
      })

    },

  })

}

export function useProject(
  projectId: number
) {

  return useQuery({
    queryKey: ["projects", projectId],

    queryFn: () =>
      getProjectByIdApi(projectId),

    enabled: !Number.isNaN(projectId),
  })

}


export function useAddMember() {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: addMemberApi,
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({
queryKey: ["projects", variables.projectId],
      })
      queryClient.invalidateQueries({
        queryKey: ["projects"],
      })
  },
})
}


export function useAddTask() {

  const queryClient = useQueryClient()

  return useMutation({

    mutationFn: addTaskApi,

    onSuccess: (_, variables) => {

      queryClient.invalidateQueries({
        queryKey: [
          "projects",
          variables.projectId,
        ],
      })

      queryClient.invalidateQueries({
        queryKey: ["projects"],
      })

    },

  })

}


export function useUpdateTaskStatus() {

  const queryClient = useQueryClient()

  return useMutation({

    mutationFn: updateTaskStatusApi,

    onSuccess: (_, variables) => {

      queryClient.invalidateQueries({
        queryKey: [
          "projects",
          variables.projectId,
        ],
      })

      queryClient.invalidateQueries({
        queryKey: ["projects"],
      })

    },

  })

}