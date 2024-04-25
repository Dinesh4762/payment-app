import React from 'react'

const Input = ({label,value, onChange}) => {
  return (
    <label className="flex flex-col gap-1">
      <span className='font-medium'>{label}</span>
      <input
        className="border rounded outline-none px-2 py-1 w-[80%] min-w-[60%]"
        type="text"
        value={value}
        onChange={(e) => onChange(e.target.value)}
      />
    </label>
  );
}

export default Input
