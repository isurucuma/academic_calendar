import React from 'react'
import Button from '@mui/material/Button'
import AddBoxIcon from '@mui/icons-material/AddBox'
import ArrowBackIcon from '@mui/icons-material/ArrowBack'
import { addContext } from './../../pages/index'
import axios from 'axios'
function Form_1() {
  const state = React.useContext(addContext)
  const [data, setData] = React.useState({
    startDate: '',
    endDate: '',
    batch: '',
    description: '',
    title: '',
  })

  const handleSubmit = (e) => {
    e.preventDefault()
    console.log(data)
    axios
      .post(`http://localhost:3001/api/events/create`, data)
      .then((res) => {
        console.log(res.status)
        setData({
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
  }

  return (
    <div>
      <form
        method="POST"
        id="contactForm"
        name="contactForm"
        onSubmit={handleSubmit}
      >
        <div className="flex gap-4 grid-col-4">
          <div className="col-span-1">
            <div className="form-group">
              <label htmlFor="#" className="mr-2">
                Title
              </label>
              <select
                type="text"
                className="border-2 border-black form-control"
                name="title"
                id="name"
                placeholder="Name"
                value={data.title}
                onChange={(e) => setData({ ...data, title: e.target.value })}
              >
                <option value="62e0226ae94516d45d442f16">Vacation</option>
                <option value="62e0226ae94516d45d442f15">Examination</option>
                <option value="62e0226ae94516d45d442f14">Dead week</option>
                <option value="62e0226ae94516d45d442f17">
                  Industrial training special 1
                </option>
              </select>
            </div>
          </div>
          <div className="col-span-1">
            <div className="form-group">
              <label htmlFor="#" className="mr-2">
                Description
              </label>
              <input
                type="text"
                className="border-2 border-black form-control"
                name="description"
                id="description"
                value={data.description}
                placeholder="Description"
                onChange={(e) =>
                  setData({ ...data, description: e.target.value })
                }
              />
            </div>
            <div className="col-span-1 mt-3">
              <div className="form-group">
                <label htmlFor="#" className="mr-3">
                  Start date
                </label>
                <input
                  type="date"
                  className="border-2 border-black form-control"
                  name="startDate"
                  id="startDate"
                  value={data.startDate}
                  placeholder="Description"
                  onChange={(e) =>
                    setData({ ...data, startDate: e.target.value })
                  }
                />
              </div>
            </div>
            <div className="col-span-1 mt-3">
              <div className="form-group">
                <label htmlFor="#" className="mr-3">
                  End date
                </label>
                <input
                  type="date"
                  className="border-2 border-black form-control"
                  name="endDate"
                  id="endDate"
                  value={data.endDate}
                  placeholder="Description"
                  onChange={(e) =>
                    setData({ ...data, endDate: e.target.value })
                  }
                />
              </div>
            </div>
          </div>
          <div className="col-span-1">
            <div className=" form-group form-control">
              <label htmlFor="#" className="mr-3">
                Batch
              </label>
              <select
                className="border-2 border-black"
                name="batch"
                id=""
                onChange={(e) => setData({ ...data, batch: e.target.value })}
                value={data.batch}
              >
                <option value="E17">E17</option>
                <option value="E18">E18</option>
                <option value="E19">E19</option>
                <option value="E20">E20</option>
              </select>
            </div>
          </div>
        </div>

        <div className="col-md-12">
          <Button type="submit" variant="outlined" startIcon={<AddBoxIcon />}>
            Add
          </Button>
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
