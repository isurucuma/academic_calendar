import { Menu, Transition } from '@headlessui/react'
import { DotsVerticalIcon } from '@heroicons/react/outline'
// import { format, parseISO } from 'date-fns'
import React, { Fragment, useContext } from 'react'
import { addContext } from '../../pages'
import axios from 'axios'

export default function Meeting({ data }) {
  const state = useContext(addContext)
  // console.log(data)
  // let startDate = parseISO(data.startDate)
  // let endDate = parseISO(data.endDate)

  // let startDateTime = parseISO(meeting.startDatetime)
  // let endDateTime = parseISO(meeting.endDatetime)

  const deleteEvent = async (event) => {
    await axios.delete(`http://localhost:3001/api/events/delete/${event}`)
    window.location.reload()
  }

  return (
    <li className="flex items-center px-4 py-2 space-x-4 group rounded-xl focus-within:bg-gray-100 hover:bg-gray-100">
      {/* <img
        src={meeting.imageUrl}
        alt=""
        className="flex-none w-10 h-10 rounded-full"
      /> */}
      <div className="flex-auto">
        <p className="text-gray-900">{data.eventTitle}</p>
        {/* <p className="text-gray-900">{meeting.name}</p> */}
        <p className="mt-0.5">
          {data.description}
          {/* <time dateTime={data.startDate}>{format(startDate, 'h:mm a')}</time> -{' '}
          <time dateTime={data.endDate}>{format(endDate, 'h:mm a')}</time> */}
          {/* <time dateTime={meeting.startDatetime}>
            {format(startDateTime, 'h:mm a')}
          </time>{' '}
          -{' '}
          <time dateTime={meeting.endDatetime}>
            {format(endDateTime, 'h:mm a')}
          </time> */}
        </p>
      </div>
      <Menu
        as="div"
        className="relative opacity-0 focus-within:opacity-100 group-hover:opacity-100"
      >
        <div>
          <Menu.Button className="-m-2 flex items-center rounded-full p-1.5 text-gray-500 hover:text-gray-600">
            <span className="sr-only">Open options</span>
            <DotsVerticalIcon className="w-6 h-6" aria-hidden="true" />
          </Menu.Button>
        </div>

        <Transition
          as={Fragment}
          enter="transition ease-out duration-100"
          enterFrom="transform opacity-0 scale-95"
          enterTo="transform opacity-100 scale-100"
          leave="transition ease-in duration-75"
          leaveFrom="transform opacity-100 scale-100"
          leaveTo="transform opacity-0 scale-95"
        >
          <Menu.Items className="absolute right-0 z-10 mt-2 origin-top-right bg-white rounded-md shadow-lg w-36 ring-1 ring-black ring-opacity-5 focus:outline-none">
            <div className="py-1">
              <Menu.Item>
                {({ active }) => (
                  <a
                    href="#"
                    className={classNames(
                      active ? 'bg-gray-100 text-gray-900' : 'text-gray-700',
                      'block px-4 py-2 text-sm'
                    )}
                    onClick={() => {
                      state.setIsUpdate(true)
                      state.setFlags(true)
                      state.setData({
                        id: data._id,
                        startDate: data.startDate.split('T')[0],
                        endDate: data.endDate.split('T')[0],
                        batch: data.batch,
                        description: data.description,
                        title: data.title,
                      })
                    }}
                  >
                    Edit
                  </a>
                )}
              </Menu.Item>
              <Menu.Item>
                {({ active }) => (
                  <a
                    href="#"
                    onClick={() => deleteEvent(data._id)}
                    className={classNames(
                      active ? 'bg-gray-100 text-gray-900' : 'text-gray-700',
                      'block px-4 py-2 text-sm'
                    )}
                  >
                    Remove
                  </a>
                )}
              </Menu.Item>
            </div>
          </Menu.Items>
        </Transition>
      </Menu>
    </li>
  )
}
function classNames(...classes) {
  return classes.filter(Boolean).join(' ')
}
