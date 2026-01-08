'use client';

import { Button, type GetProps } from 'antd';
import { type MouseEventHandler, useState } from 'react';

type BtnProps = GetProps<typeof Button>;

/**
 * Async Button that shows loading state during onClick handler execution
 */
export const AsyncButton: React.FC<BtnProps> = ({
  children,
  onClick,
  ...rest
}) => {
  const [loading, setLoading] = useState(false);

  const handleClick: MouseEventHandler<HTMLElement> = async e => {
    setLoading(true);
    try {
      await onClick?.(e);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Button {...rest} onClick={handleClick} loading={loading}>
      {children}
    </Button>
  );
};
