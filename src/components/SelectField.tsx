import React from 'react'
import Autocomplete from '@mui/material/Autocomplete'
import TextField from '@mui/material/TextField'

type OptionType = {
  id: string
  [key: string]: string
}

interface SelectFieldProps {
  options: OptionType[]
  labelText: string
  selectedValue: string
  onValueChange: (selectedValue: string) => void
  displayProperty: string
  wantedProperty: string
}

function SelectField({ options, labelText, selectedValue, onValueChange, displayProperty, wantedProperty }: SelectFieldProps) {
  const handleChange = (event: React.ChangeEvent<{}>, newValue: OptionType | null) => {
    if (newValue) {
      onValueChange(newValue[wantedProperty])
    } else {
      onValueChange('')
    }
  }

  return (
    <div className='flex flex-col'>
      <Autocomplete
        id='autocompleteField'
        className='rounded p-1'
        options={options}
        getOptionLabel={(option) => option[displayProperty] || ""}
        value={options.find(option => option[wantedProperty] === selectedValue) || null}
        onChange={handleChange}
        renderInput={(params) => (
          <TextField
            label={labelText}
            {...params}
            variant='standard'
            InputLabelProps={{
              style: { color: 'white' },
            }}
            inputProps={{
              ...params.inputProps,
              style: { color: 'white' }
            }}
          />
        )}
        renderOption={(props, option) => {
          const { key, ...restProps } = props;
          return(
            <li
              key={option.id}
              {...restProps}
              className='bg-gray-900 p-2 border-0 overflow-hidden hover:bg-gray-950'
              style={{ color: 'white', borderColor: 'transparent' }}
            >
              {option[displayProperty]}
            </li>
          )
        }}
        PaperComponent={({ children }) => (
          <ul className="overflow-hidden">
            {children}
          </ul>
        )}
      />
    </div>
  )
}

export default SelectField



// import { ChangeEvent } from 'react'

// type OptionType = {
//   id: string
//   [key: string]: string
// }

// interface SelectFieldProps {
//   options: OptionType[],
//   labelText: string,
//   selectedValue: string,
//   onValueChange: (selectedValue: string) => void,
//   displayProperty: string
// }

// function SelectField({ options, labelText, selectedValue, onValueChange, displayProperty }: SelectFieldProps) {
//   const handleChange = (event: ChangeEvent<HTMLSelectElement>) => {
//     onValueChange(event.target.value)
//   }

//   return (
//     <div className='flex flex-col'>
//       <label htmlFor='selectField' className='text-white'>{labelText}:</label>
//       <select id='selectField'
//         className='rounded'
//         value={selectedValue}
//         onChange={handleChange}>
//         <option value=''>Todos(as)</option>
//         {options.map(option => {
//           return (
//             <option key={option.id} value={option[displayProperty]}>
//               {option[displayProperty]}
//             </option>
//           )
//         })}
//       </select>
//     </div>
//   )
// }

// export default SelectField