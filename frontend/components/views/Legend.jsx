import React from 'react'
import axios from 'axios'
import { addContext } from '../../pages'
import { format } from 'date-fns'
const legend = [
  {
    name: 'Dead week',
    color: 'border-orange-500',
    topMargin: 'mt-5',
    dates: [],
  },
  {
    name: 'Examination',
    color: 'border-blue-500',
    topMargin: 'mt-1',
    dates: [],
  },
  { name: 'Vacation', color: 'border-green-500', topMargin: 'mt-1', dates: [] },
  {
    name: 'Industrial training special 1',
    color: 'border-black',
    topMargin: 'mt-1',
    dates: [],
  },
  {
    name: 'Industrial training special 2',
    color: 'border-gray-500',
    topMargin: 'mt-1',
    dates: [],
  },
  {
    name: 'Final exam ending week',
    color: 'border-red-500',
    topMargin: 'mt-1',
    dates: [],
  },
  {
    name: 'Survey camp',
    color: 'border-yellow-500',
    topMargin: 'mt-1',
    dates: [],
  },
  {
    name: 'Soft skill development program',
    color: 'border-pink-500',
    topMargin: 'mt-1',
    dates: [],
  },
  {
    name: 'General elective special',
    color: 'border-orange-900',
    topMargin: 'mt-1',
    dates: [],
  },
  {
    name: 'Online classes',
    color: 'border-purple-500',
    topMargin: 'mt-1',
    dates: [],
  },
]

function Legend() {
  const [data, setData] = React.useState()
  const state = React.useContext(addContext)

  console.log(state.currentEvents)

  React.useEffect(() => {
    async function getData() {
      const { data } = await axios.get(
        `http://localhost:3001/api/eventsCategory/`
      )
      setData(data)
    }
    getData()
  }, [])

  if (state.currentEvents) {
    {
      legend.map((item, i) => {
        state.currentEvents.map((events, i) => {
          if (
            events.event.eventTitle === item.name &&
            !item.dates.includes(events.event.startDate)
          ) {
            return item.dates.push(events.event.startDate)
          }
        })
      })
    }
  }

  return (
    <section className="object-fill border-2 border-gray-400 rounded-lg h-96">
      {data ? (
        <>
          <div className="m-4">
            {/* <h2 className="flex justify-center font-bold text-gray-900 ">
              Events category
            </h2> */}

            {legend.map((item, i) => {
              return (
                <div
                  key={i}
                  className={`flex ${item.topMargin} cursor-pointer`}
                  onClick={() => {
                    state.currentEvents.map((events, i) => {
                      if (events.event.eventTitle === item.name) {
                        var dt = new Date(events.event.startDate)
                        state.setCurrentMonth(format(dt, 'MMM-yyyy'))
                        console.log(item.dates)
                      }
                    })
                  }}
                >
                  <div
                    className={`mx-auto mt-1 h-6 w-6 border-2 ${item.color} rounded-full`}
                  ></div>
                  <span className="flex w-3/4 py-1 text-xs">
                    {data[i].name}
                  </span>
                </div>
              )
            })}
          </div>
        </>
      ) : (
        <>loading....</>
      )}
    </section>
  )
}

export default Legend
