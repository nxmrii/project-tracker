import type { Project } from "../features/projects/project.type"


export const MOCK_CIVIL_ID = "12345678"
export const MOCK_OTP = "123456"
export const MOCK_TOKEN = "project-tracker-token"


export let projects: Project[] = [ //for create, delete, add, edit

  {
    id: 1,
    name: "School Website",
    deadline: "2026-10-30",

    members: [
      {
        id: 1,
        name: "Noor",
        role: "Frontend Developer",
      },

      {
        id: 2,
        name: "Asma",
        role: "Backend Developer",
      },

      {
        id: 3,
        name: "Sara",
        role: "UI/UX Designer",
      },
    ],

    tasks: [
      {
        id: 1,
        title: "Design Login Page",
        assignedTo: 3,
        status: "done",
        dueDate: "2026-09-20",
      },

      {
        id: 2,
        title: "Build Dashboard",
        assignedTo: 1,
        status: "done",
        dueDate: "2026-09-28",
      },

      {
        id: 3,
        title: "Create Project API",
        assignedTo: 2,
        status: "todo",
        dueDate: "2026-10-05",
      },
    ],
  },


  {
    id: 2,
    name: "Employee Management System",
    deadline: "2026-11-15",

    members: [
      {
        id: 4,
        name: "Maha",
        role: "Project Manager",
      },

      {
        id: 5,
        name: "sahar",
        role: "Full Stack Developer",
      },
    ],

    tasks: [
      {
        id: 4,
        title: "Create Employee List",
        assignedTo: 5,
        status: "done",
        dueDate: "2026-10-10",
      },

      {
        id: 5,
        title: "Test Employee Module",
        assignedTo: 4,
        status: "todo",
        dueDate: "2026-11-01",
      },
    ],
  },

]



//fake data
export const delay = (ms = 500) =>
  new Promise((resolve) => setTimeout(resolve, ms))