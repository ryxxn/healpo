import React from 'react';

const PageLayout = ({ children }: React.PropsWithChildren) => {
  return (
    <div className="max-w-md mx-auto size-full flex-1 flex flex-col">
      {children}
    </div>
  );
};

export default PageLayout;
