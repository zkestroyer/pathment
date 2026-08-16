import React from 'react';

const Loader = () => {
  return (
    <div className="flex justify-center items-center h-full min-h-[200px]">
      <div className="w-12 h-12 border-4 border-primary-200 border-t-primary-500 rounded-full animate-spin"></div>
    </div>
  );
};

export default Loader;
