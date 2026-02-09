import React, { useState } from 'react'
import { EyeIcon, EyeOffIcon } from 'lucide-react'

import { Input } from './input'

interface PasswordFieldProps extends React.InputHTMLAttributes<HTMLInputElement> {
  divClassName?: string
  autogenerate?: boolean
}

const PasswordField: React.FunctionComponent<PasswordFieldProps> = ({
  divClassName,
  onChange,
  ...props
}) => {
  const [showPassword, setShowPassword] = useState(false)

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword)
  }

  return (
    <div className={divClassName}>
      <div style={{ position: 'relative' }}>
        <Input
          type={showPassword ? 'text' : 'password'}
          placeholder="••••••••••••"
          onChange={onChange}
          {...props}
        />
        {props.value && (
          <button
            onClick={togglePasswordVisibility}
            type="button"
            style={{
              position: 'absolute',
              right: '10px',
              top: '50%',
              transform: 'translateY(-50%)',
              border: 'none',
              background: 'transparent',
              cursor: 'pointer',
              outline: 'none',
            }}
          >
            {showPassword ? <EyeOffIcon className="size-4" /> : <EyeIcon className="size-4" />}
          </button>
        )}
      </div>
    </div>
  )
}

export { PasswordField }
