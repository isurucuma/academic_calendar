import React from 'react'
import axios from 'axios'
import { globalContext } from '../../pages'
import { filterContext } from '../../pages/_app'

import { format } from 'date-fns'

let legend = [
  {
    name: 'Dead week',
    color: 'border-orange-500',
    topMargin: 'mt-5',
    dates: [],
    loop: 0,
  },
  {
    name: 'Examination',
    color: 'border-blue-500',
    topMargin: 'mt-1',
    dates: [],
    loop: 0,
  },
  {
    name: 'Vacation',
    color: 'border-green-500',
    topMargin: 'mt-1',
    dates: [],
    loop: 0,
  },
  {
    name: 'Industrial training special 1',
    color: 'border-black',
    topMargin: 'mt-1',
    dates: [],
    loop: 0,
  },
  {
    name: 'Industrial training special 2',
    color: 'border-gray-500',
    topMargin: 'mt-1',
    dates: [],
    loop: 0,
  },
  {
    name: 'Final exam ending week',
    color: 'border-red-500',
    topMargin: 'mt-1',
    dates: [],
    loop: 0,
  },
  {
    name: 'Survey camp',
    color: 'border-yellow-500',
    topMargin: 'mt-1',
    dates: [],
    loop: 0,
  },
  {
    name: 'Soft skill development program',
    color: 'border-pink-500',
    topMargin: 'mt-1',
    dates: [],
    loop: 0,
  },
  {
    name: 'General elective special',
    color: 'border-orange-900',
    topMargin: 'mt-1',
    dates: [],
    loop: 0,
  },
  {
    name: 'Online classes',
    color: 'border-purple-500',
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
    legend.map((legend, i) => {
      legend.dates = []
    })

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
      legend.map((item, i) => {
        globalState.currentEvents.map((events, i) => {
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
