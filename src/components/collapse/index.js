import React, { useState } from 'react';

export default function Collapse({ children, name }) {
  const [collapsed, setCollapsed] = useState(true);
  return (
    <div>
      <button onClick={() => setCollapsed(!collapsed)}> { collapsed ? 'View' : 'Hide' } { name } </button>
      { !collapsed && children }
    </div>
  );
}