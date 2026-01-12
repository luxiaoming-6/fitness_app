import express from 'express';

// 响应结果接口
interface ApiResponse<T = any> {
  code: number;
  msg: string;
  data?: T | undefined;
  errors?: string[] | undefined;
}

// 响应工具类
class ResponseUtil {
  /**
   * 成功响应
   * @param res Response对象
   * @param data 响应数据
   * @param msg 响应消息
   * @param code 响应状态码
   */
  success<T>(res: express.Response, data?: T, msg: string = '操作成功', code: number = 200) {
    const response: ApiResponse<T> = {
      code,
      msg,
      data: data !== undefined ? data : undefined,
    };
    res.status(code).json(response);
  }

  /**
   * 失败响应
   * @param res Response对象
   * @param msg 错误消息
   * @param code 响应状态码
   * @param errors 详细错误信息
   */
  error(res: express.Response, msg: string = '操作失败', code: number = 400, errors?: string[]) {
    const response: ApiResponse = {
      code,
      msg,
      errors: errors !== undefined ? errors : undefined,
    };
    res.status(code).json(response);
  }

  /**
   * 未授权响应
   * @param res Response对象
   * @param msg 错误消息
   */
  unauthorized(res: express.Response, msg: string = '未授权') {
    this.error(res, msg, 401);
  }

  /**
   * 禁止访问响应
   * @param res Response对象
   * @param msg 错误消息
   */
  forbidden(res: express.Response, msg: string = '禁止访问') {
    this.error(res, msg, 403);
  }

  /**
   * 资源不存在响应
   * @param res Response对象
   * @param msg 错误消息
   */
  notFound(res: express.Response, msg: string = '资源不存在') {
    this.error(res, msg, 404);
  }

  /**
   * 服务器错误响应
   * @param res Response对象
   * @param msg 错误消息
   */
  serverError(res: express.Response, msg: string = '服务器错误') {
    this.error(res, msg, 500);
  }
}

// 导出单例实例
export const responseUtil = new ResponseUtil();
