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

      {className.search('show') !== -1 ? (
        <i class="fa-thin fa-chevron-up"></i>
      ) : (
        <i class="fa-thin fa-chevron-down"></i>
      )}
    </button>
  )
);
