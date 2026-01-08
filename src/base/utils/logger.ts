/**
 * 日志工具类
 * 统一管理应用日志，区分开发和生产环境
 */
class Logger {
  private isDev = process.env.NODE_ENV === 'development';

  /**
   * 调试日志（仅开发环境）
   */
  debug(...args: any[]) {
    if (this.isDev) {
      console.log('[DEBUG]', ...args);
    }
  }

  /**
   * 信息日志（仅开发环境）
   */
  info(...args: any[]) {
    if (this.isDev) {
      console.info('[INFO]', ...args);
    }
  }

  /**
   * 警告日志
   */
  warn(...args: any[]) {
    console.warn('[WARN]', ...args);
  }

  /**
   * 错误日志
   */
  error(...args: any[]) {
    console.error('[ERROR]', ...args);
    // TODO: 生产环境可以发送到监控系统（如 Sentry）
    // if (!this.isDev) {
    //   Sentry.captureException(args[0]);
    // }
  }

  /**
   * 普通日志
   */
  log(...args: any[]) {
    if (this.isDev) {
      console.log(...args);
    }
  }
}

export const logger = new Logger();
