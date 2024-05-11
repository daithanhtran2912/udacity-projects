import 'source-map-support/register';
import * as middy from 'middy';

import { APIGatewayProxyEvent, APIGatewayProxyResult } from 'aws-lambda';
import { cors, httpErrorHandler } from 'middy/middlewares';
import { createAttachmentPresignedUrl, updatePresignedUrlForTodo } from '../../businessLogic/todos';
import { getUserId } from '../utils';

export const handler = middy(
  async (event: APIGatewayProxyEvent): Promise<APIGatewayProxyResult> => {
    const todoId = event.pathParameters.todoId;
    const userId = getUserId(event);
    const uploadUrl = await createAttachmentPresignedUrl(todoId);
    // TODO: Return a presigned URL to upload a file for a TODO item with the provided id

    try {
      await updatePresignedUrlForTodo(userId, todoId);
      return {
        statusCode: 200,
        body: JSON.stringify({
          uploadUrl
        })
      };
    } catch (e) {
      return {
        statusCode: 404,
        body: JSON.stringify({
          error: e
        })
      };
    }
  })

handler
  .use(httpErrorHandler())
  .use(
    cors({
      credentials: true
    })
  )
