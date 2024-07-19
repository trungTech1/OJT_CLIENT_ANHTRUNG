import { BrowserRouter, Route, Routes } from 'react-router-dom'

import { lazyFnDelay } from './lazy'

const RouterSetup = () =>  {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={lazyFnDelay(() => import('@pages/home/Home'))}></Route>
        <Route path='*' element={lazyFnDelay(() => import('@pages/not-fond/404'))}></Route>
      </Routes>
    </BrowserRouter>
  )
}

export default RouterSetup