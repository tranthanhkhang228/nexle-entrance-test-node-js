/* eslint-disable ../server/typescript-eslint/no-explicit-any */
import * as path from "path";
import {
  createLogger,
  format,
  Logger as WinstonLogger,
  transports,
} from "winston";
import { LOG_LEVEL } from "../config";

interface Logger {
  debug(message: string, ...args: any[]): void;
  info(message: string, ...args: any[]): void;
  warn(message: string, ...args: any[]): void;
  error(message: string, ...args: any[]): void;
}

class DefaultLogger implements Logger {
  public static DEFAULT_SCOPE = "app";

  private static parsePathToScope(filepath: string): string {
    if (filepath.indexOf(path.sep) >= 0) {
      filepath = filepath.replace(process.cwd(), "");
      filepath = filepath.replace(`${path.sep}src${path.sep}`, "");
      filepath = filepath.replace(`${path.sep}dist${path.sep}`, "");
      filepath = filepath.replace(".ts", "");
      filepath = filepath.replace(".js", "");
      filepath = filepath.replace(path.sep, ":");
    }
    return filepath;
  }

  private scope: string;
  private logger: WinstonLogger;

  constructor(scope?: string) {
    this.scope = DefaultLogger.parsePathToScope(
      scope ? scope : DefaultLogger.DEFAULT_SCOPE
    );

    const { timestamp, colorize, printf, combine } = format;
    const timeFormat = timestamp({ format: "YYYY-MM-DD HH:mm:ss" });
    const msgFormat = printf((info) => {
      return `${info.timestamp} ${info.level}: ${info.message}`;
    });

    this.logger = createLogger({
      level: LOG_LEVEL.toLowerCase(),
      transports: [
        new transports.File({
          filename: `${LOG_LEVEL}-${new Date()
            .toJSON()
            .slice(0, 10)
            .replace(/-/g, "-")}.log`,
          format: combine(timeFormat, msgFormat),
        }),
        new transports.Console({
          format: combine(timeFormat, msgFormat, colorize({ all: true })),
        }),
      ],
    });
  }

  public debug(message: string, ...args: any[]): void {
    this.log("debug", message, args);
  }

  public info(message: string, ...args: any[]): void {
    this.log("info", message, args);
  }

  public warn(message: string, ...args: any[]): void {
    this.log("warn", message, args);
  }

  public error(message: string, ...args: any[]): void {
    this.log("error", message, args);
  }

  public log(level: string, message: string, args: any[]): void {
    let formattedMsg = `${this.formatScope()} ${message}`;

    if (args && args.length > 0) {
      formattedMsg = formattedMsg + " " + JSON.stringify(args);
    }

    this.logger.log(level, `${this.formatScope()} ${formattedMsg}`);
  }

  private formatScope(): string {
    return `[${this.scope}]`;
  }
}

export function getLogger(scope?: string): Logger {
  return new DefaultLogger(scope);
}

export function log(level: string, message: string, args: any[]): void {
  return new DefaultLogger().log(level, message, args);
}
