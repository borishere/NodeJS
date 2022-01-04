import express from 'express';
import { apiErrorLogger } from '../../middleware/apiErrorLogger.js';
import { groupService } from '../../services/groupService.js';

export const groupsRouter = express.Router();

groupsRouter.post('/groups', async (req, res, next) => {
  try {
    const groupDTO = req.body;

    await groupService.createGroup(groupDTO);

    return res.end();

  } catch (e) {
    next(e);
  }
})
  .get('/groups', async (req, res, next) => {
    try {
      const groups = await groupService.getGroups();

      if (!groups) {
        res.status(404).end();

        return;
      }

      res.status(200).json(groups).end();
    } catch (e) {
      next(e);
    }
  })
  .get('/groups/:id', async (req, res, next) => {
    try {
      const groupId = req.params.id;
      const group = await groupService.getGroup(groupId);

      if (!group) {
        res.status(404).end();

        return;
      }

      res.status(200).json(group).end();

    } catch (e) {
      next(e);
    }
  })
  .delete('/groups/:id', async (req, res, next) => {
    try {
      const groupId = req.params.id;

      await groupService.deleteGroup(groupId);

      res.status(200).end();
    } catch (e) {
      next(e);
    }
  })
  .patch('/groups/:id', async (req, res, next) => {
    try {
      const groupId = req.params.id;
      const groupDTO = req.body;

      const newGroup = await groupService.updateGroup(groupId, groupDTO);

      if (!newGroup) {
        res.status(404).end();
      }

      res.status(200).end();

    } catch (e) {
      next(e);
    }
  });

groupsRouter.use(apiErrorLogger);
