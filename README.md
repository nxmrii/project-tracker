# Project Tracking System

A simple project tracking system built with React and TypeScript.

The application simulates project management for a work team. Users can manage projects, team members, tasks, task assignments, deadlines, and project progress.

All application data is mock data and no real backend is connected.

## Features

### Authentication

- Login using Civil ID
- Mock OTP verification
- Fake authentication token stored in localStorage
- Protected project routes
- Logout functionality

### Project Management

- View all projects
- Create a project
- Delete a project
- View project details
- Track project deadline
- Display overdue projects

### Member Management

- Add members to a project
- Store member name and role
- Display assigned task count
- Display completed task count

### Task Management

- Add tasks
- Assign tasks to project members
- Set task due date
- Change task status
- Supported statuses:
  - Todo
  - In Progress
  - Done
- Display overdue unfinished tasks

### Progress Tracking

Project progress is calculated based on completed tasks.

Progress formula:

completed tasks / total tasks × 100

Member contribution is calculated using the number of assigned and completed tasks.

## Tech Stack

- React
- TypeScript
- Vite
- TanStack Router
- TanStack Query
- CSS
- Mock Data

## Project Structure

```text
src/
├── components/
│   └── layout/
├── features/
│   ├── auth/
│   └── projects/
├── lib/
│   └── mockStore.ts
├── router/
├── utils/
├── index.css
└── main.tsx