import React from 'react';
import { Provider } from 'react-redux';
import { render } from 'react-dom';
import {Root} from './App/Start';
import { App } from './App/App';
import Navbar from './App/NavigationBar';

render(<Root /> , document.getElementById('app'));