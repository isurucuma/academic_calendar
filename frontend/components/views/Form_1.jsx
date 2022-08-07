import React from 'react'
import Button from '@mui/material/Button'
import AddBoxIcon from '@mui/icons-material/AddBox'
import EditIcon from '@mui/icons-material/Edit'
import ArrowBackIcon from '@mui/icons-material/ArrowBack'
import { addContext } from './../../pages/index'
import axios from 'axios'
function Form_1() {
  const state = React.useContext(addContext)

  const handleSubmit = (e) => {
    e.preventDefault()
    console.log(state.data)
    if (!state.isUpdate) {
      axios
        .post(`http://localhost:3001/api/events/create`, state.data)
        .then((res) => {
          console.log(res.status)
          state.setData({
            id: '',
            startDate: '',
            endDate: '',
            batch: '',
            description: '',
            title: '',
          })
          alert('event added')
          state.setFlags(false)
        })
        .catch((e) => console.log(e))
    } else {
      axios
        .put(
          `http://localhost:3001/api/events/update/${state.data.id}`,
          state.data
        )
        .then((res) => {
          console.log(res.status)
          state.setData({
            startDate: '',
            endDate: '',
            batch: '',
            description: '',
            title: '',
          })
          alert('event updated')
          state.setFlags(false)
          state.setIsUpdate(false)
        })
        .catch((e) => console.log(e))
    }
  }

  return (
    <div>
      <form
        method="POST"
        id="contactForm"
        name="contactForm"
        onSubmit={handleSubmit}
      >
        <div className="flex flex-col">
          <div className="flex flex-row">
            <div className="form-group">
              <label htmlFor="#" className="mr-2">
                Title
              </label>
              <select
                type="text"
                className="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-blue-500 focus:ring-blue-500 dark:border-gray-400 dark:bg-gray-200 dark:text-black dark:placeholder-gray-400 dark:focus:border-blue-500 dark:focus:ring-blue-500"
                name="title"
                id="name"
                placeholder="Name"
                value={state.data.title}
                onChange={(e) =>
                  state.setData({ ...state.data, title: e.target.value })
                }
              >
                <option value="62e0226ae94516d45d442f16">Vacation</option>
                <option value="62e0226ae94516d45d442f15">Examination</option>
                <option value="62e0226ae94516d45d442f14">Dead week</option>
                <option value="62e0226ae94516d45d442f17">
                  Industrial training special 1
                </option>
              </select>
            </div>
            <div className="ml-4 form-group">
              <label htmlFor="#" className="mr-2">
                Description
              </label>
              <input
                type="text"
                className="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-blue-500 focus:ring-blue-500 dark:border-gray-400 dark:bg-gray-200 dark:text-black dark:placeholder-gray-400 dark:focus:border-blue-500 dark:focus:ring-blue-500"
                name="description"
                id="description"
                value={state.data.description}
                placeholder="Description"
                onChange={(e) =>
                  state.setData({ ...state.data, description: e.target.value })
                }
              />
            </div>
          </div>
          <div className="flex flex-row ">
            <div className="mt-3">
              <div className="form-group">
                <label htmlFor="#" className="mr-3">
                  Start date
                </label>
                <input
                  type="date"
                  className="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-blue-500 focus:ring-blue-500 dark:border-gray-400 dark:bg-gray-200 dark:text-black dark:placeholder-gray-400 dark:focus:border-blue-500 dark:focus:ring-blue-500"
                  name="startDate"
                  id="startDate"
                  value={state.data.startDate}
                  placeholder="Description"
                  onChange={(e) =>
                    state.setData({ ...state.data, startDate: e.target.value })
                  }
                />
              </div>
            </div>
            <div className="mt-3 ml-6">
              <div className="form-group">
                <label htmlFor="#" className="mr-3">
                  End date
                </label>
                <input
                  type="date"
                  className="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-blue-500 focus:ring-blue-500 dark:border-gray-400 dark:bg-gray-200 dark:text-black dark:placeholder-gray-400 dark:focus:border-blue-500 dark:focus:ring-blue-500"
                  name="endDate"
                  id="endDate"
                  value={state.data.endDate}
                  placeholder="Description"
                  onChange={(e) =>
                    state.setData({ ...state.data, endDate: e.target.value })
                  }
                />
              </div>
            </div>
            <div className="mt-3 ml-6 form-group form-control">
              <label htmlFor="#" className="mr-3">
                Batch
              </label>
              <select
                className="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-blue-500 focus:ring-blue-500 dark:border-gray-400 dark:bg-gray-200 dark:text-black dark:placeholder-gray-400 dark:focus:border-blue-500 dark:focus:ring-blue-500"
                name="batch"
                id=""
                onChange={(e) =>
                  state.setData({ ...state.data, batch: e.target.value })
                }
                value={state.data.batch}
              >
                <option value="E17">E17</option>
                <option value="E18">E18</option>
                <option value="E19">E19</option>
                <option value="E20">E20</option>
              </select>
            </div>
          </div>
        </div>

        <div className="mt-12 col-md-12">
          {state.isUpdate ? (
            <>
              <Button type="submit" variant="outlined" startIcon={<EditIcon />}>
                Update
              </Button>
            </>
          ) : (
            <>
              <Button
                type="submit"
                variant="outlined"
                startIcon={<AddBoxIcon />}
              >
                Add
              </Button>
            </>
          )}

          <Button
            className="ml-3"
            onClick={() => state.setFlags(false)}
            variant="outlined"
            startIcon={<ArrowBackIcon />}
          >
            Back
          </Button>
        </div>
      </form>
    </div>
  )
}

export default Form_1
