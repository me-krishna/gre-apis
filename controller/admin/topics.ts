import { Request, Response } from "express";
import { getTopics } from "../../model/admin/topics.model";
import createResponse from "../../utils/api-resp";

export const GetTopics = async (req: Request, res: Response) => {
  try {
    const topics: number | undefined = req.params.topic_id ? parseInt(req.params.topic_id) : undefined;
    const getListOfTopics = await getTopics(topics) as any[];
    createResponse(res, {
      status: 200, message: 'Success', data: getListOfTopics, metadata: {}
    })
  } catch (error) {
    createResponse(res, { status: 500, message: 'Internal Server Error', data: null, metadata: {} });
  }
}