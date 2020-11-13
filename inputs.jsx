import React, {useState} from 'react'
import TextField from '@material-ui/core/TextField'
import FormControlLabel from '@material-ui/core/FormControlLabel'
import Checkbox from '@material-ui/core/Checkbox'
import FormControl from '@material-ui/core/FormControl'
import RadioGroup from '@material-ui/core/RadioGroup'
import Radio from '@material-ui/core/Radio'
import InputLabel from '@material-ui/core/InputLabel'
import Select from '@material-ui/core/Select'
import MenuItem from '@material-ui/core/MenuItem'
import FormHelperText from '@material-ui/core/FormHelperText'
import Autocomplete from '@material-ui/lab/Autocomplete'
import Fade from '@material-ui/core/Fade'

import InputAdornment from '@material-ui/core/InputAdornment'
import {Visibility, VisibilityOff} from '@material-ui/icons'
import IconButton from '@material-ui/core/IconButton'

export const RenderTextField = ({label, input, meta: {touched, invalid, error}, ...custom}) => (
  <TextField
    {...input}
    variant='outlined'
    label={label + ':'}
    placeholder={label + ':'}
    error={touched && invalid}
    helperText={touched && error}
    fullWidth
    {...custom}
  />
)

export const RenderTextFieldDecoration = ({
  label,
  input,
  decoration,
  meta: {touched, invalid, error},
  ...custom
}) => {
  return (
    <TextField
      {...input}
      variant='outlined'
      label={label + ':'}
      placeholder={label + ':'}
      InputProps={{
        endAdornment: <InputAdornment position='end'>{decoration}</InputAdornment>
      }}
      error={touched && invalid}
      helperText={touched && error}
      fullWidth
      {...custom}
    />
  )
}

export const RenderTextFieldPassword = ({
  label,
  input,
  meta: {touched, invalid, error},
  ...custom
}) => {
  const [show, setShow] = useState(false)

  return (
    <TextField
      {...input}
      variant='outlined'
      label={label + ':'}
      placeholder={label + ':'}
      InputProps={{
        endAdornment: (
          <InputAdornment position='end'>
            <IconButton
              aria-label='toggle password visibility'
              onClick={() => setShow(!show)}
              edge='end'
            >
              {show ? (
                <Fade in timeout={300}>
                  <Visibility />
                </Fade>
              ) : (
                <Fade in timeout={300}>
                  <VisibilityOff />
                </Fade>
              )}
            </IconButton>
          </InputAdornment>
        )
      }}
      error={touched && invalid}
      helperText={touched && error}
      fullWidth
      {...custom}
      type={show ? 'text' : 'password'}
    />
  )
}

export const RenderCheckbox = ({input, label}) => (
  <FormControlLabel
    control={<Checkbox checked={input.value ? true : false} onChange={input.onChange} />}
    label={label}
  />
)

export const RenderInputSelect = props => {
  const {
    input,
    name,
    label,
    items,
    meta: {touched, error},
    ...custom
  } = props

  const renderFromHelper = ({touched, error}) => {
    if (!(touched && error)) {
      return null
    } else {
      return <FormHelperText>{error}</FormHelperText>
    }
  }

  return (
    <FormControl variant='outlined' fullWidth error={touched && !!error}>
      <InputLabel id={`${label}-label`}>{label} *</InputLabel>
      <Select labelId={`${label}-label`} label={`${label} *`} id={name} {...input} {...custom}>
        {items.length !== 0 ? (
          items.map(opt => {
            return (
              <MenuItem key={opt.id.toString()} value={+opt.id}>
                {opt.name}
              </MenuItem>
            )
          })
        ) : (
          <MenuItem value=''>Ничего не выбрано</MenuItem>
        )}
      </Select>
      {renderFromHelper({touched, error})}
    </FormControl>
  )
}

export const RenderAutoComplete = ({label, input, items, meta: {touched, invalid, error}}) => {
  return (
    <Autocomplete
      options={items}
      getOptionLabel={option => option.label}
      getOptionSelected={(option, value) => option.value === value.value}
      renderInput={params => (
        <TextField
          {...params}
          {...input}
          label={label + ':'}
          variant='outlined'
          fullWidth
          error={touched && invalid}
          helperText={touched && error ? error : false}
        />
      )}
    />
  )
}

export const RenderRadioButton = ({input, items, ...rest}) => (
  <FormControl variant='outlined' fullWidth>
    <RadioGroup {...input} {...rest}>
      {items.map(({label, value}, index) => (
        <FormControlLabel key={index} value={value} control={<Radio />} label={label} />
      ))}
    </RadioGroup>
  </FormControl>
)
