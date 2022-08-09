import Calender from '../components/views/Calender'
import Legend from '../components/views/Legend'
import React, { createContext, useState } from 'react'
import { format, startOfToday } from 'date-fns'

export const globalContext = createContext()

export default function Example() {
  const [flag, setFlags] = useState(false)
  const [isUpdate, setIsUpdate] = useState(false)
  const [date, setDate] = useState({ startDate: '', endDate: '' })
  const [data, setData] = React.useState({
    id: '',
    startDate: '',
    endDate: '',
    batch: 'E17',
    description: '',
    title: '62e0226ae94516d45d442f16',
  })
  const [currentEvents, setCurrentEvents] = useState()
  let today = startOfToday()
  let [currentMonth, setCurrentMonth] = useState(format(today, 'MMM-yyyy'))

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
                <globalContext.Provider
                  value={{
                    setFlags,
                    flag,
                    setDate,
                    date,
                    data,
                    setData,
                    isUpdate,
                    setIsUpdate,
                    currentEvents,
                    currentMonth,
                    setCurrentMonth,
                    setCurrentEvents,
                  }}
                >
                  <Calender />
                </globalContext.Provider>
              </div>
            </>
          ) : (
            <>
              <globalContext.Provider
                value={{
                  setFlags,
                  flag,
                  setDate,
                  date,
                  data,
                  setData,
                  isUpdate,
                  setIsUpdate,
                  currentEvents,
                  currentMonth,
                  setCurrentMonth,
                  setCurrentEvents,
                }}
              >
                <div className="col-span-2">
                  <Legend />
                </div>
                <div className="col-span-5">
                  <Calender />
                </div>
              </globalContext.Provider>
            </>
          )}
        </div>
      </div>
    </div>
  )
}
