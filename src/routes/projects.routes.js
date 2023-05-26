import { Router } from 'express';
import { createProject, getGradesByProject, showProject, showProjects, showProjectsByClassId } from '../controllers/projects.controller.js';

const projectsRouter = Router();

projectsRouter.post('/projects', createProject);
projectsRouter.get('/projects', showProjects);
projectsRouter.get('/projects/:classId', showProjectsByClassId);
projectsRouter.get('/project/:id', showProject);
projectsRouter.get('/project/grades/:projectId', getGradesByProject)

export default projectsRouter;
