import Calender from '../components/views/Calender'
import Legend from '../components/views/Legend'
import React, { createContext, useState } from 'react'
export const addContext = createContext()

export default function Example() {
  const [flag, setFlags] = useState(false)
  const [isUpdate, setIsUpdate] = useState(false)
  const [date, setDate] = useState({ startDate: '', endDate: '' })
  const [data, setData] = React.useState({
    id: '',
    startDate: '',
    endDate: '',
    batch: '',
    description: '',
    title: '',
  })

  return (
    <div className="container">
      <div className="flex justify-center mt-6 text-xl font-bold text-stone-600">
        <span>Academic Calender</span>
      </div>
      <div className="px-4 mx-auto mt-6 sm:px-7 md:max-w-6xl md:px-6">
        <div className="flex grid-cols-1 gap-4 md:grid md:grid-cols-7">
          {flag ? (
            <>
              <div className="h-96 md:col-span-7">
                <addContext.Provider
                  value={{
                    setFlags,
                    flag,
                    setDate,
                    date,
                    data,
                    setData,
                    isUpdate,
                    setIsUpdate,
                  }}
                >
                  <Calender />
                </addContext.Provider>
              </div>
            </>
          ) : (
            <>
              <div className="h-96 md:col-span-2">
                <Legend />
              </div>
              <div className="h-96 md:col-span-5">
                <addContext.Provider
                  value={{
                    setFlags,
                    flag,
                    setDate,
                    date,
                    data,
                    setData,
                    isUpdate,
                    setIsUpdate,
                  }}
                >
                  <Calender />
                </addContext.Provider>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  )
}
