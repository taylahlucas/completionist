import React from 'react';

interface ConditionProps {
  condition: boolean;
  children: any;
  conditionalElement?: any;
};

const Condition = ({ condition = false, children, conditionalElement }: ConditionProps) => {
  return (
    <>
      {condition
        ? children
        : !!conditionalElement ? conditionalElement : null
      }
    </>
  );
};

export default Condition;