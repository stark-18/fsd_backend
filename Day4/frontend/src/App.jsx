import React from 'react'
import Register from './components/register/Register'
import View from './components/view/View'
import Update from './components/update/Update'
import Delete from './components/delete/Delete'

const App = () => {
  return (
    <div>
      <h1 className="font-bold text-3xl mb-6 flex flex-col items-center justify-center">User Registration System</h1>
      <Register/>
      <View/>
      <Update/>
      <Delete/>
    </div>
  )
}

export default App