'use client';

import { PreviewImage } from '@components/PreviewImage';
import type { UploadFile } from 'antd';

/**
 * 检查文件是否为图片
 */
export const checkFileIsImage = (file: UploadFile) => {
  const suffix = file.name.slice(file.name.lastIndexOf('.'));
  return ['.png', '.jpg', '.jpeg', '.gif'].includes(suffix.toLowerCase());
};

/**
 * 检查文件是否可以预览
 */
export const checkCanPreview = (file: UploadFile) => {
  return checkFileIsImage(file);
};

/**
 * 文件预览组件
 */
export const PreviewFile: React.FC<{
  file: UploadFile;
  visible?: boolean;
  onVisibleChange?: (bl: boolean) => Promise<void> | void;
}> = props => {
  const { file, visible = false, onVisibleChange } = props;
  if (checkFileIsImage(file)) {
    return (
      <PreviewImage
        file={file}
        visible={visible}
        onVisibleChange={onVisibleChange}
      />
    );
  }
  return null;
};
