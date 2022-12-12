import React from 'react'
import reactDom from 'react-dom'
import App from './src/client/App'

import { Provider } from 'react-redux'
import { store } from './src/client/redux/store'

reactDom.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('root'),
)

//EXPERIMENTED WITH REACT ROUTER DOM. COULDN'T GET CHILD ROUTS TO WORK

// import ErrorPage from './src/client/components/404'
// import Login from './src/client/components/Login'
// import { createRoot } from 'react-dom/client'

// import {
//   createBrowserRouter,
//   createRoutesFromElements,
//   Route,
//   RouterProvider,
// } from 'react-router-dom'

// const router = createBrowserRouter([
//   {
//     path: '/',
//     element: <App />,
//     errorElement: <ErrorPage />,
//     children: [
//         {
//             path: "login",
//             element: <Login />,
//           },
//         ],
//   },

// ])

// const container = document.getElementById('root');
// const root = createRoot(container); // createRoot(container!) if you use TypeScript
// root.render(
//   <Provider store={store}>
//     <RouterProvider router={router} />
//       {/* <App /> */}
//   </Provider>
// )
