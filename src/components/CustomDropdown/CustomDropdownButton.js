import React from 'react';

export const CustomToggle = React.forwardRef(({ children, className, onClick }, ref) => (
  <button type="button" className={className} 
    onClick={(e) => {
      e.preventDefault();
      onClick(e);
    }}
  >

    <i class="fa-thin fa-download"></i>
    {
    children}
    <i class="fa-thin fa-chevron-down"></i>
  </button>
));
