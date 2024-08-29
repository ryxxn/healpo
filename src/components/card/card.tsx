import React from 'react';

type Props = React.HTMLAttributes<HTMLDivElement>;

const Card = ({ children, className, ...other }: Props) => {
  return (
    <div
      className={`rounded-xl bg-white border border-gray-200 ${className}`}
      {...other}
    >
      {children}
    </div>
  );
};

export default Card;
