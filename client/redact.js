import React from 'react';
import ReactDOM from 'react-dom';

import RedactPage from './RedactPage'

//PageData comes from window
ReactDOM.render(<RedactPage {...PageData.image} />, document.querySelector('main#root'))
