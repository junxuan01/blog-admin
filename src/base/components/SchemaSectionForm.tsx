import {
  BetaSchemaForm,
  GridContext,
  ProFormColumnsType,
} from '@ant-design/pro-components';
import { CusProComponentsType } from '@components/pro-components/index';
import { Col, GetProps, Row } from 'antd';
import { merge } from 'lodash';
import { useContext } from 'react';

export function SchemaSectionForm<T, ValueType = CusProComponentsType>(props: {
  columns: ProFormColumnsType<T, ValueType>[];
  rowProps?: GetProps<typeof Row>;
  colProps?: GetProps<typeof Col>;
}) {
  const { columns, rowProps, colProps } = props;
  const {
    grid: originGrid,
    rowProps: originRowProps = { gutter: [40, 0] },
    colProps: originColProps,
  } = useContext(GridContext);

  const mergeRowProps = merge({}, originRowProps, rowProps);
  const mergeColProps = merge({}, originColProps, colProps);

  return originGrid ? (
    <BetaSchemaForm layoutType='Embed' columns={columns as any} />
  ) : (
    <GridContext.Provider
      value={{
        grid: true,
        rowProps: mergeRowProps,
        colProps: mergeColProps,
      }}
    >
      <Row {...mergeRowProps}>
        <BetaSchemaForm layoutType='Embed' columns={columns as any} />
      </Row>
    </GridContext.Provider>
  );
}
