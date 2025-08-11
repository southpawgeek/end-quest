import React, { memo } from 'react'
import Tasks from "./Tasks"
import Actions from "./Actions"

const Sidebar = memo(() => {
  return (
    <div id="sidebar">
      <Tasks />
      <Actions />
    </div>
  )
})

Sidebar.displayName = 'Sidebar'

export default Sidebar
