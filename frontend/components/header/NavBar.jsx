import React from 'react'
import CustomListBox from '../custom/CustomListBox'
import LoginBtn from '../custom/Loginbtn'

function NavBar() {
  return (
    <div className="flex h-20 justify-center bg-blue-900 pt-4">
      <div className="mr-2">
        <CustomListBox
          width={52}
          options={[
            { name: 'Computer Engineering' },
            { name: 'Electrical Engineering' },
            { name: 'Civil Engineering' },
            { name: 'Mechanical Engineering' },
          ]}
        />
      </div>
      <div className="mr-2">
        <CustomListBox
          width={24}
          options={[
            { name: 'E17' },
            { name: 'E18' },
            { name: 'E19' },
            { name: 'E20' },
            { name: 'E21' },
          ]}
        />
      </div>
      <div className="mr-2">
        <CustomListBox
          width={52}
          options={[
            { name: 'Semester 1' },
            { name: 'Semester 2' },
            { name: 'Semester 3' },
            { name: 'Semester 4' },
            { name: 'Semester 5' },
            { name: 'Semester 6' },
            { name: 'Semester 7' },
            { name: 'Semester 8' },
          ]}
        />
      </div>
      <div className="mr-2 mt-1">
        <LoginBtn />
      </div>
    </div>
  )
}

export default NavBar
