import { Card, type CardProps } from 'antd';

const CardSection = ({ title, children, styles, ...rest }: CardProps) => {
  // 处理 styles 合并（styles 可能是对象或函数）
  const mergedStyles =
    typeof styles === 'function'
      ? styles
      : {
          header: {
            borderBottom: 'none',
            fontSize: 20,
            paddingLeft: 16,
            ...styles?.header,
          },
          body: {
            paddingTop: 2,
            ...styles?.body,
          },
        };

  return (
    <Card variant='outlined' styles={mergedStyles} title={title} {...rest}>
      {children}
    </Card>
  );
};

export default CardSection;
