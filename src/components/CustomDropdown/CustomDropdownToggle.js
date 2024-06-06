import React from 'react';

export const CustomToggle = React.forwardRef(
  ({ children, className, onClick }, ref) => (
    <button
      type="button"
      className={className}
      onClick={(e) => {
        e.preventDefault();
        onClick(e);
      }}
    >
      {children}
      <i className="fa-thin fa-chevron-down"></i>
    </button>
  )
);
