import React, { useContext } from 'react'
import { addContext } from '../../pages'

const legend = [
  { name: 'Dead week', color: 'border-orange-500', topMargin: 'mt-5' },
  { name: 'Examination', color: 'border-blue-500', topMargin: 'mt-1' },
  { name: 'Vacation', color: 'border-green-500', topMargin: 'mt-1' },
  {
    name: 'Industrial training special 1',
    color: 'border-black',
    topMargin: 'mt-1',
  },
  {
    name: 'Industrial training special 2',
    color: 'border-gray-500',
    topMargin: 'mt-1',
  },
  {
    name: 'Final exam ending week',
    color: 'border-red-500',
    topMargin: 'mt-1',
  },
  { name: 'Survey camp', color: 'border-yellow-500', topMargin: 'mt-1' },
  {
    name: 'Soft skill development pro',
    color: 'border-pink-500',
    topMargin: 'mt-1',
  },
  {
    name: 'General elective special',
    color: 'border-orange-900',
    topMargin: 'mt-1',
  },
  { name: 'Online classes', color: 'border-purple-500', topMargin: 'mt-1' },
]

function Legend() {
  // const state = useContext(addContext)

  return (
    <section className="object-fill border-2 border-gray-400 rounded-lg h-96">
      <div className="m-4">
        {/* <h2 className="flex justify-center font-bold text-gray-900 ">
              Events category
            </h2> */}
        {legend.map((item, i) => {
          return (
            <div key={i} className={`flex ${item.topMargin}`}>
              <div
                className={`mx-auto mt-1 h-6 w-6 border-2 ${item.color} rounded-full`}
              ></div>
              <span className="flex w-3/4 py-1 text-xs">{item.name}</span>
            </div>
          )
        })}
      </div>
    </section>
  )
}

export default Legend
