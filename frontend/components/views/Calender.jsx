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

// const meetings = [
//   {
//     id: 1,
//     name: 'Leslie Alexander',
//     imageUrl:
//       'https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
//     startDatetime: '2022-05-11T13:00',
//     endDatetime: '2022-05-11T14:30',
//   },
//   {
//     id: 2,
//     name: 'Michael Foster',
//     imageUrl:
//       'https://images.unsplash.com/photo-1519244703995-f4e0f30006d5?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
//     startDatetime: '2022-05-20T09:00',
//     endDatetime: '2022-05-20T11:30',
//   },
//   {
//     id: 3,
//     name: 'Dries Vincent',
//     imageUrl:
//       'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
//     startDatetime: '2022-05-20T17:00',
//     endDatetime: '2022-05-20T18:30',
//   },
//   {
//     id: 4,
//     name: 'Leslie Alexander',
//     imageUrl:
//       'https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
//     startDatetime: '2022-07-28T07:45:18.225Z',
//     endDatetime: '2022-06-09T14:30',
//   },
//   {
//     id: 5,
//     name: 'Michael Foster',
//     imageUrl:
//       'https://images.unsplash.com/photo-1519244703995-f4e0f30006d5?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
//     startDatetime: '2022-07-13T14:00',
//     endDatetime: '2022-05-13T14:30',
//   },
// ]

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

        // switch (item.event.eventTitle) {
        //   case 'Vacation':
        //     setColor('border-green-500')
        //     break
        //   case 'Examination':
        //     setColor('border-blue-500')
        //     break
        //   case 'Dead week':
        //     setColor('border-orange-500')
        //     break
        //   case 'Vacation':
        //     setColor('border-green-500')
        //     break
        //   case 'Industrial training special 2':
        //     setColor('border-gray-500')
        //     break
        //   case 'Industrial training special 1':
        //     setColor('border-black')
        //     break
        //   case 'Final exam ending week':
        //     setColor('border-red-500')
        //     break
        //   case 'Survey camp':
        //     setColor('border-yellow-500')
        //     break
        //   case 'Soft skill development pro':
        //     setColor('border-pink-500')
        //     break
        //   case 'General elective special':
        //     setColor('border-orange-900')
        //     break
        //   case 'Online classes':
        //     setColor('border-purple-500')
        //     break
        //   default:
        //     setColor('border-blue-500')
        // }
        return { ...item, dates }
      })

      setData(event)
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
                    type="button"
                    onClick={() => setSelectedDay(day)}
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
                      data.some((meeting) =>
                        isSameDay(parseISO(meeting.event.startDate), day)
                      ) && `solid border-2 border-purple-500`,
                      'solid day-btn mx-auto flex h-10 w-10 items-center justify-center rounded-full'
                    )}
                  >
                    <time dateTime={format(day, 'yyyy-MM-dd')}>
                      {format(day, 'd')}
                    </time>
                  </button>
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
                <p className="px-4 text-gray-900 py-">No meetings for today.</p>
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
