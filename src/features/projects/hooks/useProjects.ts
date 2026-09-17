import {
  useMutation,
  useQuery,
  useQueryClient,
} from "@tanstack/react-query"

import {
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
