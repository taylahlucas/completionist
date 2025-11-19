import React, { ReactNode } from 'react';

interface ConditionProps {
  condition: boolean;
  children: ReactNode;
  conditionalElement?: ReactNode | ReactNode[];
}

export const Condition = ({
  condition = false,
  children,
  conditionalElement,
}: ConditionProps) => {
  return (
    <>{condition ? children : conditionalElement ? conditionalElement : null}</>
  );
};
