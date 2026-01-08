'use client';

import { getCosToken } from '@api/config/cos';
import { checkCanPreview, PreviewFile } from '@components/PreviewFile';
import { cos } from '@utils/cos';
import { App, Upload, type UploadFile, type UploadProps } from 'antd';
import type COS from 'cos-js-sdk-v5';
import dayjs from 'dayjs';
import { useState } from 'react';

export type CosMeta = Pick<COS.UploadFileParams, 'Bucket' | 'Key' | 'Region'>;

export type ExtraData = {
  id: string;
  cos: {
    response: COS.UploadFileResult;
    meta: CosMeta;
  };
};

export type RecordAttachment = UploadFile<ExtraData>;

const getBase64 = (file: File): Promise<string> =>
  new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result as string);
    reader.onerror = error => reject(error);
  });

export type UploadToCosProps = Pick<
  UploadProps,
  | 'listType'
  | 'name'
  | 'multiple'
  | 'showUploadList'
  | 'maxCount'
  | 'defaultFileList'
  | 'fileList'
  | 'onChange'
  | 'children'
  | 'disabled'
  | 'accept'
> & {
  render: (props: UploadProps) => React.ReactNode;
  /** COS 路径前缀 */
  prefix?: string;
  /** 存储桶类型，默认 private */
  bucketType?: 'private' | 'public';
};

export const UploadToCos: React.FC<UploadToCosProps> = props => {
  const {
    render,
    prefix = 'enterprise_default',
    bucketType = 'private',
  } = props;
  const { message } = App.useApp();
  const [previewFile, setPreviewFile] = useState<UploadFile | null>(null);
  const [previewVisible, setPreviewVisible] = useState<boolean>(false);

  const upload = async (file: File, onProgress?: (data: any) => void) => {
    // 从后端获取 COS 配置
    const tokenData = await getCosToken({
      cos_path: prefix,
      bucket_type: bucketType,
    });

    const meta: Pick<COS.UploadFileParams, 'Bucket' | 'Key' | 'Region'> = {
      Bucket: tokenData.bucket_name,
      Region: tokenData.region,
      Key: `${prefix}/${dayjs().format('YYYY_MM_DD__HH_mm_ss')}_${file.name}`,
    };
    try {
      const data = await cos.uploadFile({
        ...meta,
        Body: file,
        SliceSize: 1024 * 1024 * 5,
        onProgress: progressData => {
          onProgress?.({ percent: progressData?.percent * 100 });
        },
      });
      console.log('upload success', data);
      return { err: null, data, meta };
    } catch (err) {
      return { err, data: null, meta: null };
    }
  };

  const combineProps: UploadProps = {
    ...props,
    onPreview(file) {
      if (checkCanPreview(file)) {
        setPreviewFile(file);
        setPreviewVisible(true);
        return;
      }
      if (file.url) {
        window.open(file.url);
      }
      message.info(`Missing file link`);
    },
    async customRequest(options) {
      console.log('options: ', options);
      const { data, err, meta } = await upload(
        options.file as File,
        options.onProgress
      );
      if (options.file) {
        try {
          // @ts-expect-error - Adding preview property to file
          options.file.preview = await getBase64(options.file as File);
        } catch (err) {
          console.log('create preview error', err);
        }
      }
      if (err) {
        return options.onError?.(err as any);
      }

      const response = { cos: { response: data, meta } };
      if (options.file) {
        // @ts-expect-error - Adding url property to file
        options.file.url = `https://${data?.Location}`;
        // @ts-expect-error - Adding cosMeta property to file
        options.file.cosMeta = meta;
        // @ts-expect-error - Adding id property to file (Key format: prefix/timestamp_filename)
        options.file.id = meta?.Key;
        console.log('options.file', options.file);
      }
      console.log('response----');
      return options.onSuccess?.(response);
    },
    onChange(info) {
      console.log('info', info);
      const { status } = info.file;
      if (status !== 'uploading') {
        console.log(info.file, info.fileList);
      }
      if (status === 'done') {
        console.log(`${info.file.name} file uploaded successfully.`, info);
        message.success(`${info.file.name} file uploaded successfully.`);
      } else if (status === 'error') {
        message.error(`${info.file.name} file upload failed.`);
      }
      props.onChange?.(info);
    },
    async onRemove(_file) {
      // Auto delete from COS is disabled
      // const cosMeta = file.cosMeta;
      // if (cosMeta) {
      //   cos.deleteObject(cosMeta).then(() => {
      //     console.log("file delete success", cosMeta);
      //   });
      // }
    },
    async beforeUpload(file) {
      if (file.size > 10 * 1024 * 1024) {
        message.error('Max file size 10 MB');
        return Upload.LIST_IGNORE;
      }
      return file;
    },
  };

  return (
    <>
      {render(combineProps)}
      {previewFile && (
        <PreviewFile
          visible={previewVisible}
          file={previewFile}
          onVisibleChange={bl => {
            setPreviewVisible(bl);
          }}
        />
      )}
    </>
  );
};
