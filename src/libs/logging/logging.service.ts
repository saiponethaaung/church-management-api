import { Inject, Injectable, Logger, Scope } from '@nestjs/common';
import { REQUEST } from '@nestjs/core';
import { Request } from 'express';
import { LOG_LEVEL, LogPropsType } from 'src/interfaces/logging.interface';

@Injectable({ scope: Scope.REQUEST })
export class LoggingService {
  private readonly logger: Logger;
  private tenant: string;

  constructor(@Inject(REQUEST) private request: Request) {
    // const env = request.env || {};
    // this.tenant =
    //   process.env.AWS_S3_BUCKET && env.KEYCLOAK_REALM
    //     ? process.env.AWS_S3_BUCKET + '-' + env.KEYCLOAK_REALM
    //     : 'unknown_tenant';

    this.logger = new Logger(this.tenant);
  }

  async log(
    message: LogPropsType,
    level: LOG_LEVEL = 1,
    ignoreSentry: boolean = false,
  ): Promise<void> {
    /**
     *
     * Stop the process if log is disable or log level is higher than the one passed in.
     * Log Level will priority are counted in reverse order.
     * Meaning 0 is highest and 7 is lowest.
     *
     */
    if (
      !process.env.ENABLE_LOG ||
      !process.env.LOG_LEVEL.split(',')
        .map((n) => Number(n))
        .includes(level)
    )
      return;

    const e = new Error();
    const stackArr = e.stack.split('\n');
    const regex = /\((.*):(\d+):(\d+)\)$/;
    const source =
      stackArr[2].trim().split(' ').length === 2 ? stackArr[4] : stackArr[2];
    const match = regex.exec(source);
    const file = source.replace(/  +/g, ' ').trim().split(' ')[1].split('.');

    const fileInfo = {
      class: file[0],
      function: file[1],
      line: match[2],
      path: match[1],
    };

    const log = {
      level,
      ...message,
      fileInfo,
      tenant: this.tenant,
    };

    const stringifiedLog = JSON.stringify(log, null, 2)
      .replace(/\\n/g, '')
      .replace(/\n/g, '');

    let logLevel: any = 'fatal';

    switch (level) {
      case LOG_LEVEL.Emergency:
      case LOG_LEVEL.Alert:
      case LOG_LEVEL.Critical:
        this.logger.fatal(log.message, stringifiedLog);
        logLevel = 'fatal';
        break;

      case LOG_LEVEL.Error:
        this.logger.error(log.message, stringifiedLog);
        logLevel = 'error';
        break;

      case LOG_LEVEL.Warning:
        this.logger.warn(log.message, stringifiedLog);
        logLevel = 'warning';
        break;

      case LOG_LEVEL.Notice:
      case LOG_LEVEL.Informational:
        this.logger.log(log.message, stringifiedLog);
        logLevel = 'info';
        break;

      case LOG_LEVEL.Debug:
        this.logger.debug(log.message, stringifiedLog);
        logLevel = 'debug';
        break;

      default:
        this.logger.fatal(log.message, stringifiedLog);
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        logLevel = 'fatal';
        break;
    }
    if (
      process.env.SENTRY_ENABLED &&
      JSON.parse(process.env.SENTRY_ENABLED) &&
      !ignoreSentry
    ) {
      //   const apiEndpoint = this.request.url;
      if (message.content && message.content.exception) {
        // TODO implement sentry or similar service
      } else {
        // TODO implement sentry or similar service
      }
    }

    return;
  }
}
