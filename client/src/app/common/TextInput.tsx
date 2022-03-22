import React, {FC} from 'react'
import classnames from 'classnames'

type Props = {
    name:any,       
    value:any,       
    error:any,       
    type:any,
    onChange:any,
    placeholder?:any,
    label?:any,
    disabled?:any,
    info?:any
}

const TextInput: FC<Props> = ({
        name,       
        value,       
        error,       
        type,
        onChange,
        placeholder,
        label,
        disabled,
        info
    }) => (
        <div className="form-group">
            {label ?(<><label className='text-orange own-font fs-4'>{label}</label><br /></>):<></>}
            <input 
            type={type} 
            className={classnames("form-control form-control-lg",{"is-invalid":error})} 
            placeholder={placeholder}
            value={value} 
            onChange={onChange}
            name={name} 
            disabled={disabled}/>
            {info && <small className='form-text text-muted'>{info}</small>}
            {error && (<div className='invalid-feedback'>{error}</div>)}
        </div>
)


export default TextInput;