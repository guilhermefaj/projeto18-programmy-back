import { Router } from 'express';
import { createProject, showProjects, showProjectsByClassId } from '../controllers/projects.controller.js';

const projectsRouter = Router();

projectsRouter.post('/projects', createProject);
projectsRouter.get('/projects', showProjects);
projectsRouter.get('/projects/:classId', showProjectsByClassId);

export default projectsRouter;
