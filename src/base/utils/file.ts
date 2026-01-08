/**
 * 文件下载工具函数
 * @param blob - 文件的 Blob 数据
 * @param filename - 文件名（不含扩展名）
 * @param extension - 文件扩展名，默认为 'xlsx'
 */
export const downloadFile = (
  blob: Blob,
  filename: string,
  extension: string = 'xlsx'
): void => {
  // 创建下载链接
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.href = url;
  link.download = `${filename}.${extension}`;

  // 触发下载
  document.body.appendChild(link);
  link.click();

  // 清理
  document.body.removeChild(link);
  URL.revokeObjectURL(url);
};

/**
 * 从响应头中提取文件名
 * @param contentDisposition - Content-Disposition 响应头的值
 * @returns 提取的文件名，如果没有则返回 null
 */
export const extractFilenameFromHeader = (
  contentDisposition: string | null
): string | null => {
  if (!contentDisposition) return null;

  // 尝试匹配 filename*=UTF-8''encoded-filename 格式
  const filenameStarMatch = contentDisposition.match(/filename\*=UTF-8''(.+)/i);
  if (filenameStarMatch) {
    try {
      return decodeURIComponent(filenameStarMatch[1]);
    } catch {
      // 解码失败，继续尝试其他格式
    }
  }

  // 尝试匹配 filename="filename" 或 filename=filename 格式
  const filenameMatch = contentDisposition.match(/filename=["']?([^"';]+)/i);
  if (filenameMatch) {
    return filenameMatch[1];
  }

  return null;
};
