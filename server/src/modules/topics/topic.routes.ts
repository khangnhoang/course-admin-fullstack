import { Router } from "express";

import {
  deleteTopicController,
  updateTopicController,
} from "./topic.controller.js";

const topicRouter = Router();

topicRouter.patch("/:id", updateTopicController);
topicRouter.delete("/:id", deleteTopicController);

export { topicRouter };