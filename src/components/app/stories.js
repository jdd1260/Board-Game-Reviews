import React from 'react';
import {
  MemoryRouter,
} from "react-router-dom";

import App from '.';

export default { title: 'App' };

export const basic = () => <App router={MemoryRouter} />;