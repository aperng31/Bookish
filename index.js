import React from 'react'
import reactDom from 'react-dom'
import App from './src/client/App'

import { Provider } from 'react-redux'
import { store } from './src/client/redux/store'

import { createBrowserRouter, RouterProvider } from 'react-router-dom'

const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
  },
])
reactDom.render(
  <Provider store={store}>
    <RouterProvider router={router} />
    {/* <App /> */}
  </Provider>,
  document.getElementById('root'),
)
