import WinnerDetailsPage from '@/components/Result/WinnerDetailsPage'
import React from 'react'

const page = () => {
  return (
    <div className='mt-16'>
  <WinnerDetailsPage 
  winner={{
    id: "1",
    name: "Tasneem Sahat",
    institution: "NDC",
    wins: [
      { segment: "Robotics Competition", prize: 1 }, 
      { segment: "Robotics Competition", prize: 2}, 
      { segment: "Robotics Competition", prize: 3 }, 
    ]
  }}
/>
    </div>
  )
}

export default page
