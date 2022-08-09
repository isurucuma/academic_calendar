import React from 'react'
import CustomListBox from '../custom/CustomListBox'
import LoginBtn from '../custom/Loginbtn'

function NavBar() {
  return (
    <div className="flex justify-center h-20 pt-4 bg-blue-900">
      {/* <div className="mr-2">
        <CustomListBox
          width={52}
          options={[
            { name: 'Computer Engineering' },
            { name: 'Electrical Engineering' },
            { name: 'Civil Engineering' },
            { name: 'Mechanical Engineering' },
          ]}
        />
      </div> */}
      <div className="mr-2">
        <CustomListBox
          options={[
            { name: 'E17' },
            { name: 'E18' },
            { name: 'E19' },
            { name: 'E20' },
            { name: 'E21' },
          ]}
        />
      </div>
      {/* <div className="mr-2">
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
      </div> */}
      <div className="mt-1 mr-2">
        <LoginBtn />
      </div>
    </div>
  )
}

export default NavBar
