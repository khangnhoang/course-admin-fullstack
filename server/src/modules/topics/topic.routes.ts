import { Router } from "express";

import {
  deleteTopicController,
  updateTopicController,
  moveTopicController,
} from "./topic.controller.js";

const topicRouter = Router();

topicRouter.patch("/:id", updateTopicController);
topicRouter.delete("/:id", deleteTopicController);
topicRouter.post("/:id/move", moveTopicController);

export { topicRouter };