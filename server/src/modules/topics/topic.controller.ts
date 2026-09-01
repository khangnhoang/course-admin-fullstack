import type { Request, Response } from "express";
import { z } from "zod";

import {
  courseIdParamsSchema,
  createTopicSchema,
  topicIdParamsSchema,
  updateTopicSchema,
} from "./topic.schema.js";

import {
  createTopic,
  deleteTopic,
  getTopicsByCourseId,
  updateTopic,
} from "./topic.service.js";

export async function getTopicsByCourseIdController(
  req: Request<{ courseId: string }>,
  res: Response,
) {
  const parsedParams = courseIdParamsSchema.safeParse(req.params);

  if (!parsedParams.success) {
    res.status(400).json({
      message: "Invalid course ID",
      errors: z.flattenError(parsedParams.error),
    });

    return;
  }

  const topics = await getTopicsByCourseId(parsedParams.data.courseId);

  res.status(200).json(topics);
}

export async function createTopicController(
  req: Request<{ courseId: string }>,
  res: Response,
) {
  const parsedParams = courseIdParamsSchema.safeParse(req.params);

  if (!parsedParams.success) {
    res.status(400).json({
      message: "Invalid course ID",
      errors: z.flattenError(parsedParams.error),
    });

    return;
  }

  const parsedBody = createTopicSchema.safeParse(req.body);

  if (!parsedBody.success) {
    res.status(400).json({
      message: "Invalid topic data",
      errors: z.flattenError(parsedBody.error),
    });

    return;
  }

  const topic = await createTopic(parsedParams.data.courseId, parsedBody.data);

  if (!topic) {
    res.status(404).json({
      message: "Course not found",
    });

    return;
  }

  res.status(201).json(topic);
}

export async function updateTopicController(
  req: Request<{ id: string }>,
  res: Response,
) {
  const parsedParams = topicIdParamsSchema.safeParse(req.params);

  if (!parsedParams.success) {
    res.status(400).json({
      message: "Invalid topic ID",
      errors: z.flattenError(parsedParams.error),
    });

    return;
  }

  const parsedBody = updateTopicSchema.safeParse(req.body);

  if (!parsedBody.success) {
    res.status(400).json({
      message: "Invalid topic data",
      errors: z.flattenError(parsedBody.error),
    });

    return;
  }

  const topic = await updateTopic(parsedParams.data.id, parsedBody.data);

  if (!topic) {
    res.status(404).json({
      message: "Topic not found",
    });

    return;
  }

  res.status(200).json(topic);
}

export async function deleteTopicController(
  req: Request<{ id: string }>,
  res: Response,
) {
  const parsedParams = topicIdParamsSchema.safeParse(req.params);

  if (!parsedParams.success) {
    res.status(400).json({
      message: "Invalid topic ID",
      errors: z.flattenError(parsedParams.error),
    });

    return;
  }

  const deletedTopic = await deleteTopic(parsedParams.data.id);

  if (!deletedTopic) {
    res.status(404).json({
      message: "Topic not found",
    });

    return;
  }

  res.status(204).send();
}
