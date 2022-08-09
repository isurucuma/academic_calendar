import React from 'react'
import axios from 'axios'
import { globalContext } from '../../pages'
import { filterContext } from '../../pages/_app'

import { format, startOfToday } from 'date-fns'

let legend = [
  {
    name: 'Dead week',
    color: 'orange-500',
    topMargin: 'mt-5',
    dates: [],
    loop: 0,
  },
  {
    name: 'Examination',
    color: 'blue-500',
    topMargin: 'mt-1',
    dates: [],
    loop: 0,
  },
  {
    name: 'Vacation',
    color: 'green-500',
    topMargin: 'mt-1',
    dates: [],
    loop: 0,
  },
  {
    name: 'Industrial training special 1',
    color: 'black',
    topMargin: 'mt-1',
    dates: [],
    loop: 0,
  },
  {
    name: 'Industrial training special 2',
    color: 'gray-500',
    topMargin: 'mt-1',
    dates: [],
    loop: 0,
  },
  {
    name: 'Final exam ending week',
    color: 'red-500',
    topMargin: 'mt-1',
    dates: [],
    loop: 0,
  },
  {
    name: 'Survey camp',
    color: 'yellow-500',
    topMargin: 'mt-1',
    dates: [],
    loop: 0,
  },
  {
    name: 'Soft skill development program',
    color: 'pink-500',
    topMargin: 'mt-1',
    dates: [],
    loop: 0,
  },
  {
    name: 'General elective special',
    color: 'orange-900',
    topMargin: 'mt-1',
    dates: [],
    loop: 0,
  },
  {
    name: 'Online classes',
    color: 'purple-500',
    topMargin: 'mt-1',
    dates: [],
    loop: 0,
  },
]

function Legend() {
  const [data, setData] = React.useState()
  const globalState = React.useContext(globalContext)
  const filterState = React.useContext(filterContext)

  React.useEffect(() => {
    legend.map((legend) => {
      legend.dates = []
    })
    let today = startOfToday()
    globalState.setCurrentMonth(format(today, 'MMM-yyyy'))
    async function getData() {
      const { data } = await axios.get(
        `http://localhost:3001/api/eventsCategory/`
      )
      setData(data)
    }
    getData()
  }, [filterState.filter])

  if (globalState.currentEvents) {
    {
      legend.map((item) => {
        globalState.currentEvents.map((events) => {
          if (
            events.event.eventTitle === item.name &&
            !item.dates.includes(events.event.startDate) &&
            events.event.batch === filterState.filter.name
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
            {legend.map((item, i) => {
              return (
                <div
                  key={i}
                  className={`flex ${item.topMargin} cursor-pointer`}
                  onClick={() => {
                    if (item.loop < item.dates.length) {
                      var dt = new Date(item.dates[item.loop])
                      globalState.setCurrentMonth(format(dt, 'MMM-yyyy'))
                      item.loop++
                    } else {
                      item.loop = 0
                    }
                  }}
                >
                  <div
                    className={
                      item.dates.length > 0
                        ? `mx-auto mt-1 h-6 w-6 border-4 border-${item.color} rounded-full bg-gray-400`
                        : `mx-auto mt-1 h-6 w-6 border-4 border-${item.color} rounded-full`
                    }
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
