import React, { useState } from 'react'
import { Dropdown } from 'semantic-ui-react'
import './homeStyle.css'

const options = [
  { key: 1, text: 'all', value: "" },
  { key: 2, text: 'sculpting', value: 'sculpting' },
  { key: 3, text: 'drawing', value: 'drawing' },
  { key: 4, text: 'painting', value: 'painting' },
]

const DropDown = (props) => {

  const [filter, setFilter] = useState(-1)

  return (
    <div className='dropdown'>
      <Dropdown
        placeholder='Select Category'
        color="black"
        fluid
        selection
        options={options}
        onChange={(e) => { props.setFilter(e.target.outerText) }}
        style={{ backgroundColor: 'aliceblue', color: '#000000' }}

      />
    </div>
  )
}

export default DropDown