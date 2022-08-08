import React from 'react'
import { ChevronLeftIcon, ChevronRightIcon } from '@heroicons/react/solid'
import {
  add,
  eachDayOfInterval,
  endOfMonth,
  format,
  getDay,
  isEqual,
  isSameDay,
  isSameMonth,
  isToday,
  parse,
  parseISO,
  startOfToday,
} from 'date-fns'
import { useState, useContext } from 'react'
import Button from '@mui/material/Button'
import AddBoxIcon from '@mui/icons-material/AddBox'
import axios from 'axios'
import Meeting from './Meeting'
import { addContext } from '../../pages'
import Form_1 from './Form_1'

function classNames(...classes) {
  return classes.filter(Boolean).join(' ')
}

let colStartClasses = [
  '',
  'col-start-2',
  'col-start-3',
  'col-start-4',
  'col-start-5',
  'col-start-6',
  'col-start-7',
]

function getDatesInRange(startDate, endDate) {
  const date = new Date(startDate.getTime())

  const dates = []

  while (date <= endDate) {
    dates.push(new Date(date))
    date.setDate(date.getDate() + 1)
  }

  return dates
}

function Calender() {
  const [data, setData] = React.useState()
  // const [color, setColor] = React.useState('')
  // console.log(color)

  React.useEffect(() => {
    async function getData() {
      const { data } = await axios.get(`http://localhost:3001/api/events/`)

      const event = data.map((item) => {
        const dates = getDatesInRange(
          new Date(item.event.startDate),
          new Date(item.event.endDate)
        )

        return { ...item, dates }
      })

      setData(event)
      // setData(data)
    }
    getData()
  }, [])

  const state = useContext(addContext)

  let today = startOfToday()
  let [selectedDay, setSelectedDay] = useState(today)
  let [currentMonth, setCurrentMonth] = useState(format(today, 'MMM-yyyy'))
  let firstDayCurrentMonth = parse(currentMonth, 'MMM-yyyy', new Date())

  let days = eachDayOfInterval({
    start: firstDayCurrentMonth,
    end: endOfMonth(firstDayCurrentMonth),
  })

  function previousMonth() {
    let firstDayNextMonth = add(firstDayCurrentMonth, { months: -1 })
    setCurrentMonth(format(firstDayNextMonth, 'MMM-yyyy'))
  }

  function nextMonth() {
    let firstDayNextMonth = add(firstDayCurrentMonth, { months: 1 })
    setCurrentMonth(format(firstDayNextMonth, 'MMM-yyyy'))
  }
  let selectedDayMeetings
  if (data !== undefined && data !== null) {
    selectedDayMeetings = data.filter((data) => {
      if (isSameDay(parseISO(data.event.startDate), selectedDay)) {
        return data.event.startDate
      }
    })
  }
  // let selectedDayMeetings = meetings.filter((meeting) =>
  //   isSameDay(parseISO(meeting.startDatetime), selectedDay)
  // )
  return (
    <div
      className={
        state.flag
          ? 'gap-4 md:grid md:grid-cols-7'
          : 'gap-4 md:grid md:grid-cols-5'
      }
    >
      <section className="col-span-3 mt-6 border-2 border-gray-400 rounded-lg h-96 bg-slate-100 md:mt-0">
        <div className="flex justify-between">
          <button
            type="button"
            onClick={previousMonth}
            className="-my-1.5 flex flex-none items-center justify-center p-1.5 text-gray-400 hover:text-gray-500"
          >
            <span className="sr-only">Previous month</span>
            <ChevronLeftIcon className="w-5 h-5" aria-hidden="true" />
          </button>

          <h2 className="font-semibold text-gray-900 ">
            {format(firstDayCurrentMonth, 'MMMM yyyy')}
          </h2>

          <button
            onClick={nextMonth}
            type="button"
            className="-my-1.5 -mr-1.5 ml-2 flex flex-none items-center justify-center p-1.5 text-gray-400 hover:text-gray-500"
          >
            <span className="sr-only">Next month</span>
            <ChevronRightIcon className="w-5 h-5" aria-hidden="true" />
          </button>
        </div>
        <div className="grid grid-cols-7 mt-8 text-xs leading-6 text-center text-gray-500">
          <div>SUN</div>
          <div>MON</div>
          <div>TUE</div>
          <div>WED</div>
          <div>THR</div>
          <div>FRI</div>
          <div>SAT</div>
        </div>
        <div className="grid grid-cols-7 mt-2 text-sm">
          {days.map((day, dayIdx) => (
            <div
              key={day.toString()}
              className={classNames(
                dayIdx === 0 && colStartClasses[getDay(day)],
                'py-1'
              )}
            >
              {data ? (
                <>
                  <button
                    id="date-button"
                    type="button"
                    onClick={() => {
                      // let res = data.map((event) => {

                      // const offset = day.getTimezoneOffset()
                      // day = new Date(day.getTime() - offset * 60 * 1000)

                      // console.log(
                      //   data[0].dates.some((date) => {
                      //     date.toISOString().split('T')[0] ===
                      //       day.toISOString().split('T')[0] &&
                      //       data[0].event.eventTitle === 'Survey camp'
                      //   })
                      // )
                      // console.log(data[0].dates[0].toISOString().split('T')[0])
                      // console.log(
                      //   day.toISOString().split('T')[0] ===
                      //     data[0].dates[0].toISOString().split('T')[0]
                      // )

                      // console.log(
                      //   data.some((meeting) => {
                      //     let res = meeting.dates.some((date) => {
                      //       if (
                      //         day.toISOString().split('T')[0] ===
                      //           date.toISOString().split('T')[0] &&
                      //         meeting.event.eventTitle === 'Survey camp'
                      //       )
                      //         return true
                      //     })
                      //     return res
                      //   })
                      // )

                      setSelectedDay(day)
                    }}
                    //"additional day colord+event not shown in all days"
                    className={classNames(
                      isEqual(day, selectedDay) && 'text-white',
                      !isEqual(day, selectedDay) &&
                        isToday(day) &&
                        'text-red-500',
                      !isEqual(day, selectedDay) &&
                        !isToday(day) &&
                        isSameMonth(day, firstDayCurrentMonth) &&
                        'text-gray-900',
                      !isEqual(day, selectedDay) &&
                        !isToday(day) &&
                        !isSameMonth(day, firstDayCurrentMonth) &&
                        'text-gray-400',
                      isEqual(day, selectedDay) && isToday(day) && 'bg-red-500',
                      isEqual(day, selectedDay) &&
                        !isToday(day) &&
                        'bg-gray-900',
                      !isEqual(day, selectedDay) && 'hover:bg-gray-200',
                      (isEqual(day, selectedDay) || isToday(day)) &&
                        'font-bold',
                      data.some(
                        (meeting) =>
                          isSameDay(parseISO(meeting.event.startDate), day) &&
                          meeting.event.eventTitle === 'Examination'
                      ) && 'solid border-2 border-blue-500',
                      data.some(
                        (meeting) =>
                          isSameDay(parseISO(meeting.event.startDate), day) &&
                          meeting.event.eventTitle === 'Dead week'
                      ) && 'solid border-2 border-orange-500',
                      data.some(
                        (meeting) =>
                          isSameDay(parseISO(meeting.event.startDate), day) &&
                          meeting.event.eventTitle === 'Vacation'
                      ) && 'solid border-2 border-green-500',
                      data.some(
                        (meeting) =>
                          isSameDay(parseISO(meeting.event.startDate), day) &&
                          meeting.event.eventTitle ===
                            'Industrial training special 1'
                      ) && 'solid border-2 border-black',
                      data.some(
                        (meeting) =>
                          isSameDay(parseISO(meeting.event.startDate), day) &&
                          meeting.event.eventTitle ===
                            'Industrial training special 2'
                      ) && 'solid border-2 border-gray-500',
                      data.some(
                        (meeting) =>
                          isSameDay(parseISO(meeting.event.startDate), day) &&
                          meeting.event.eventTitle === 'Final exam ending week'
                      ) && 'solid border-2 border-red-500',
                      data.some(
                        (meeting) =>
                          isSameDay(parseISO(meeting.event.startDate), day) &&
                          meeting.event.eventTitle === 'Survey camp'
                      ) && 'solid border-2 border-yellow-500',
                      data.some(
                        (meeting) =>
                          isSameDay(parseISO(meeting.event.startDate), day) &&
                          meeting.event.eventTitle ===
                            'Soft skill development pro'
                      ) && 'solid border-2 border-orange-500',
                      data.some(
                        (meeting) =>
                          isSameDay(parseISO(meeting.event.startDate), day) &&
                          meeting.event.eventTitle ===
                            'General elective special'
                      ) && 'solid border-2 border-orange-900',
                      data.some(
                        (meeting) =>
                          isSameDay(parseISO(meeting.event.startDate), day) &&
                          meeting.event.eventTitle === 'Online classes'
                      ) && 'solid border-2 border-purple-500',
                      data.some((meeting) => {
                        let res = meeting.dates.some((date) => {
                          if (
                            day.toISOString().split('T')[0] ===
                              date.toISOString().split('T')[0] &&
                            meeting.event.eventTitle === 'Survey camp'
                          )
                            return true
                        })
                        return res
                      }) && 'solid border-2 border-yellow-500',
                      data.some((meeting) => {
                        let res = meeting.dates.some((date) => {
                          if (
                            day.toISOString().split('T')[0] ===
                              date.toISOString().split('T')[0] &&
                            meeting.event.eventTitle === 'Online classes'
                          )
                            return true
                        })
                        return res
                      }) && 'solid border-2 border-purple-500',
                      data.some((meeting) => {
                        let res = meeting.dates.some((date) => {
                          if (
                            day.toISOString().split('T')[0] ===
                              date.toISOString().split('T')[0] &&
                            meeting.event.eventTitle ===
                              'General elective special'
                          )
                            return true
                        })
                        return res
                      }) && 'solid border-2 border-orange-900',
                      data.some((meeting) => {
                        let res = meeting.dates.some((date) => {
                          if (
                            day.toISOString().split('T')[0] ===
                              date.toISOString().split('T')[0] &&
                            meeting.event.eventTitle ===
                              'Soft skill development pro'
                          )
                            return true
                        })
                        return res
                      }) && 'solid border-2 border-pink-500',
                      data.some((meeting) => {
                        let res = meeting.dates.some((date) => {
                          if (
                            day.toISOString().split('T')[0] ===
                              date.toISOString().split('T')[0] &&
                            meeting.event.eventTitle ===
                              'Final exam ending week'
                          )
                            return true
                        })
                        return res
                      }) && 'solid border-2 border-red-500',
                      data.some((meeting) => {
                        let res = meeting.dates.some((date) => {
                          if (
                            day.toISOString().split('T')[0] ===
                              date.toISOString().split('T')[0] &&
                            meeting.event.eventTitle ===
                              'Industrial training special 2'
                          )
                            return true
                        })
                        return res
                      }) && 'solid border-2 border-gray-500',
                      data.some((meeting) => {
                        let res = meeting.dates.some((date) => {
                          if (
                            day.toISOString().split('T')[0] ===
                              date.toISOString().split('T')[0] &&
                            meeting.event.eventTitle ===
                              'Industrial training special 1'
                          )
                            return true
                        })
                        return res
                      }) && 'solid border-2 border-black',
                      data.some((meeting) => {
                        let res = meeting.dates.some((date) => {
                          if (
                            day.toISOString().split('T')[0] ===
                              date.toISOString().split('T')[0] &&
                            meeting.event.eventTitle === 'Vacation'
                          )
                            return true
                        })
                        return res
                      }) && 'solid border-2 border-green-500',
                      data.some((meeting) => {
                        let res = meeting.dates.some((date) => {
                          if (
                            day.toISOString().split('T')[0] ===
                              date.toISOString().split('T')[0] &&
                            meeting.event.eventTitle === 'Examination'
                          )
                            return true
                        })
                        return res
                      }) && 'solid border-2 border-blue-500',
                      data.some((meeting) => {
                        let res = meeting.dates.some((date) => {
                          if (
                            day.toISOString().split('T')[0] ===
                              date.toISOString().split('T')[0] &&
                            meeting.event.eventTitle === 'Dead week'
                          )
                            return true
                        })
                        return res
                      }) && 'solid border-2 border-orange-500',
                      'solid day-btn mx-auto flex h-10 w-10 items-center justify-center rounded-full'
                    )}
                  >
                    <time dateTime={format(day, 'yyyy-MM-dd')}>
                      {format(day, 'd')}
                    </time>
                  </button>
                  {/* {console.log(data)} */}
                </>
              ) : (
                <></>
              )}

              {/* <div className="w-1 h-1 mx-auto mt-1">
                    {meetings.some((meeting) =>
                      isSameDay(parseISO(meeting.startDatetime), day)
                    ) && (
                      
                    )}
                  </div> */}
            </div>
          ))}
        </div>
      </section>
      {state.flag ? (
        <>
          <section className="flex flex-col col-span-4 mt-6 border-2 border-gray-400 rounded-lg md:mt-0">
            <h2 className="px-4 py-2 font-semibold text-gray-900">
              Add an Event
              {/* <time dateTime={format(selectedDay, 'yyyy-MM-dd')}>
                {format(selectedDay, 'MMM dd, yyy')}
              </time> */}
            </h2>

            <ol className="mt-4 space-y-1 text-sm leading-6 text-gray-500">
              <div className="px-4 py-2">
                <div className="col-md-12">
                  <Form_1 />
                </div>
              </div>
            </ol>
          </section>
        </>
      ) : (
        <>
          <section className="flex flex-col col-span-2 mt-6 border-2 border-gray-400 rounded-lg md:mt-0">
            <h2 className="px-4 py-2 font-semibold text-gray-900">
              Schedule for{' '}
              <time dateTime={format(selectedDay, 'yyyy-MM-dd')}>
                {format(selectedDay, 'MMM dd, yyy')}
              </time>
            </h2>
            <ol className="mt-4 space-y-1 text-sm leading-6 text-gray-500">
              {data !== undefined &&
              data !== null &&
              selectedDayMeetings.length > 0 ? (
                selectedDayMeetings.map((data) => (
                  <Meeting data={data.event} key={data.event._id} />
                ))
              ) : (
                <p className="px-4 text-gray-900 py-">No events for today.</p>
              )}

              {/* {selectedDayMeetings.length > 0 ? (
                selectedDayMeetings.map((meeting) => (
                  <Meeting meeting={meeting} key={meeting.id} />
                ))
              ) : (
                <p className="px-4 py-2">No meetings for today.</p>
              )} */}
            </ol>
            <div className="flex justify-end px-4 py-2 mt-auto">
              <Button
                variant="outlined"
                startIcon={<AddBoxIcon />}
                onClick={() => state.setFlags(true)}
              >
                Add
              </Button>
            </div>
          </section>
        </>
      )}
    </div>
  )
}

export default Calender
