'use client';

import { InboxOutlined } from '@ant-design/icons';
import { UploadToCos } from '@components/UploadToCos';
import { type CosUploadProps, useCosUpload } from '@hooks/useCosUpload';
import { Upload, type UploadProps } from 'antd';
import type React from 'react';

export type UploadDraggerProps = CosUploadProps &
  Pick<UploadProps, 'maxCount' | 'accept' | 'showUploadList' | 'disabled'> & {
    children?: React.ReactNode;
    hint?: React.ReactNode;
    multiple?: boolean;
    prefix?: string;
  };

const { Dragger } = Upload;

export function UploadDragger(props: UploadDraggerProps) {
  const { children, hint, multiple = true, maxCount, ...rest } = props;
  const { defaultFileList, fileList, handleChange } = useCosUpload(props);

  return (
    <UploadToCos
      maxCount={multiple ? maxCount : 1}
      accept='.png,.jpeg,.jpg,.pdf'
      {...rest}
      fileList={fileList}
      onChange={handleChange}
      defaultFileList={defaultFileList}
      render={uploadProps => (
        <Dragger {...uploadProps}>
          {children ?? (
            <>
              <p className='ant-upload-drag-icon'>
                <InboxOutlined />
              </p>
              <p className='ant-upload-text'>
                Click or drag file to this area to upload
              </p>
              <p className='ant-upload-hint'>{hint}</p>
            </>
          )}
        </Dragger>
      )}
    />
  );
}
