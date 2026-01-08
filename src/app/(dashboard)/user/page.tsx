'use client';

import { CopyOutlined, DownloadOutlined, EyeOutlined } from '@ant-design/icons';
import { getOrders } from '@api/orders';
import type { OrderListItem } from '@api/orders/types';
import BaseTable, {
  type BaseTableActionType,
  type BaseTableSearchForm,
} from '@components/base-table';
import type { BaseTableProps } from '@components/base-table/types';
import { PageWrapper } from '@components/page-wrapper';
import { formatDate } from '@utils/time';
import { App, Button, Flex, Space, Tooltip } from 'antd';
import dayjs from 'dayjs';
import Link from 'next/link';
import { useRef } from 'react';

export default function OrdersPage() {
  const actionRef = useRef<BaseTableActionType>(undefined);
  const formRef = useRef<BaseTableSearchForm>(undefined);
  const { message } = App.useApp();
  // const { handleDataSourceChange } = useDetailNavigate('orders');
  const getSortTip = (_dataIndex: string, title: string) => {
    const content = `Sort ${title} Ascending `;
    // if (sort?.property === dataIndex) {
    //   content =
    //     sort?.sort === "ASC"
    //       ? `Sort ${title} Descending `
    //       : sort?.sort === "DESC"
    //         ? `Cancel Sort ${title}`
    //         : `Sort ${title} Ascending `;
    // }
    return content;
  };

  // 表格列配置
  const columns: BaseTableProps<OrderListItem>['columns'] = [
    {
      title: 'Order ID',
      dataIndex: 'order_no',
      // sorter: {
      //   compare: () => 0, // 后端排序，前端不处理
      // },
      // fixed: 'left',
      width: 230,

      showSorterTooltip: {
        title: getSortTip('order_no', 'Order ID'),
      },
      render: (_, record) => (
        <div className='flex items-center gap-2'>
          <Link
            href={`/orders/detail/${record.order_id}`}
            className='text-blue-600  hover:text-blue-800 font-semibold'
          >
            {record.order_no}
          </Link>
          <Tooltip title='Copy Order ID'>
            <Button
              type='text'
              size='small'
              icon={<CopyOutlined />}
              onClick={() => {
                navigator.clipboard.writeText(record.order_no);
                message.success('Order ID copied to clipboard');
              }}
            />
          </Tooltip>
        </div>
      ),
    },
    {
      title: 'Order Status',
      dataIndex: 'order_status',
      width: 140,
    },
    {
      title: 'Start & End Date',
      dataIndex: 'start_date',
      sorter: {
        compare: () => 0,
      },
      showSorterTooltip: {
        title: getSortTip('trip_date_start', 'Start Date'),
      },
      render: (_, record: any) => {
        return (
          <div>
            {formatDate(record?.start_date)} - {formatDate(record?.end_date)}
          </div>
        );
      },
    },
    {
      title: 'Service Type',
      dataIndex: 'service_type',
      width: 150,
      render: (_, record) => record.service_type || '-',
    },
    {
      title: 'Trip Completed',
      dataIndex: 'trip_completed',
      width: 120,
      align: 'center',
      render: (_: any, record: any) => {
        const value = record.trip_progress;
        return (
          <Flex gap={4}>
            <div>
              {value?.completed ?? 0}/{value?.total ?? 0}
            </div>
          </Flex>
        );
      },
    },
    {
      title: 'Payment Status',
      dataIndex: 'payment_status',
      width: 140,
      valueType: '_LyloOrderPaymentStatusSelect',
      // render: (_, record) => record.payment_status || '-',
    },
    {
      title: 'Order Source',
      dataIndex: 'order_source',
      width: 150,
      render: (_, record) => record.order_source || '-',
    },
    {
      title: 'Customer Details',
      dataIndex: 'customer_name',
      width: 200,
      render: (_: any, record: any) => {
        const value = record.customer_details || [];
        return (
          <Flex vertical>
            {value.map((i: any) => (
              <Flex vertical key={`${i.name}-${i.phone}`}>
                <div>{i.name}</div>
                <div>{i.phone}</div>
              </Flex>
            ))}
          </Flex>
        );
      },
    },
    {
      title: 'Car Type',
      dataIndex: 'car_type',
      width: 120,
      render: (_, record) => record.car_type || '-',
    },
    {
      title: 'Total Price',
      dataIndex: 'total_price',
      sorter: {
        compare: () => 0,
      },
      // valueType: '_Money',
      showSorterTooltip: {
        title: getSortTip('customer_total_amount', 'Total Price'),
      },
    },
    // {
    //   title: 'Payment Method',
    //   dataIndex: 'payment_method',
    //   width: 150,
    //   render: (_, record) => record.payment_method || '-',
    // },
    {
      title: 'Created Date/Time',
      dataIndex: 'created_at',
      sorter: {
        compare: () => 0,
      },
      valueType: 'date',
      fieldProps: {
        format: 'DD MMM YYYY, HH:mm',
      },
      showSorterTooltip: {
        title: getSortTip('created_at', 'Created Time'),
      },
    },
    {
      title: 'Updated At',
      dataIndex: 'updated_at',
      sorter: {
        compare: () => 0,
      },
      valueType: 'date',
      fieldProps: {
        format: 'DD MMM YYYY, HH:mm',
      },
      showSorterTooltip: {
        title: getSortTip('updated_at', 'Updated At'),
      },
    },
    {
      title: 'Actions',
      key: 'actions',
      fixed: 'right',
      width: 100,
      // align: 'center',
      render: (_, record) => (
        <Space>
          {/* 查看详情 - 新窗口打开 */}
          <Tooltip title='View Details'>
            <Button
              icon={<EyeOutlined />}
              onClick={() =>
                window.open(
                  `/orders/detail/${record.order_id}`,
                  '_blank',
                  'noopener,noreferrer'
                )
              }
            />
          </Tooltip>

          {/* 查看 Quotation */}
          <Tooltip title='View Quotation'>
            <Button
              icon={<DownloadOutlined />}
              onClick={() =>
                window.open(
                  `/contract/quotation?order_id=${record.order_id}`,
                  '_blank',
                  'noopener,noreferrer'
                )
              }
            />
          </Tooltip>

          {/* 查看地图 - Modal */}
          {/* <ViewMapModal
            locationItems={(record as any).stops
              ?.filter((stop: any) => stop.coordinate)
              .map((stop: any) => ({
                lat: Number(stop.coordinate?.latitude),
                lng: Number(stop.coordinate?.longitude),
              }))}
          /> */}

          {/* 查看 Trips */}
          {/* <Button
            onClick={() =>
              window.open(
                `/trips?order_no=${record.order_no}`,
                '_blank',
                'noopener,noreferrer'
              )
            }
          >
            View Trips
          </Button> */}
        </Space>
      ),
    },
  ];

  // 搜索列配置
  const searchColumns: BaseTableProps<OrderListItem>['searchColumns'] = [
    {
      title: 'Search',
      dataIndex: 'search',
      valueType: 'text',
      fieldProps: {
        placeholder: 'Order ID, name or number',
      },
    },
    {
      title: 'Order Start Date',
      dataIndex: ['order_start_date'],
      valueType: 'dateRange',
      fieldProps: {
        placeholder: ['From', 'To'],
      },
    },
    {
      title: 'Order End Date',
      dataIndex: ['order_end_date'],
      valueType: 'dateRange',
      fieldProps: {
        placeholder: ['From', 'To'],
      },
    },
    {
      title: 'Service Type',
      dataIndex: 'service_type',
      valueType: '_LyloServiceTypeSelect',
      fieldProps: {
        mode: 'multiple',
      },
    },
    // {
    //   title: 'Trip Number',
    //   dataIndex: 'trip_number',
    //   valueType: 'select',
    //   fieldProps: {
    //     placeholder: 'All',
    //     options: [
    //       { label: 'Single', value: '1' },
    //       { label: 'Multiple', value: '2' },
    //     ],
    //   },
    // },
    // {
    //   title: 'Order Source',
    //   dataIndex: 'order_source',
    //   valueType: '_LyloOrderSourceSelect',
    //   fieldProps: {
    //     mode: 'multiple',
    //   },
    // },
    {
      title: 'Payment Status',
      dataIndex: 'payment_status',
      valueType: '_LyloOrderPaymentStatusSelect',
      fieldProps: {
        mode: 'multiple',
      },
    },
    {
      title: 'Car Type',
      dataIndex: 'car_types',
      valueType: '_LyloCarTypeSelect',
      fieldProps: {
        mode: 'multiple',
      },
    },
    {
      title: 'Order Created Date',
      dataIndex: ['order_created_date'],
      valueType: 'dateRange',
      fieldProps: {
        placeholder: ['From', 'To'],
      },
    },
  ];

  return (
    <PageWrapper title='Users'>
      <Space orientation='vertical' size='large' className='w-full'>
        <BaseTable<OrderListItem>
          actionRef={actionRef}
          formRef={formRef}
          columns={columns}
          searchColumns={searchColumns}
          request={async ({ pageSize, current, ...rest }) => {
            const params = {
              page: current,
              page_size: pageSize,
              ...rest,
            } as any;

            // 直接调用 getOrders
            const data = await getOrders(params);
            return {
              success: true,
              total: data?.pagination?.total ?? 0,
              data: data?.list ?? [],
            };
          }}
          dateFormatter={value => {
            if (!value) return '';
            return dayjs(value).format('YYYY-MM-DD');
          }}
          rowKey='order_id'
        />
      </Space>
    </PageWrapper>
  );
}
