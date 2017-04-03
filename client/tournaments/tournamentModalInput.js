import React from 'react';
import classnames from 'classnames';


export function  ModalInputWrapper({children, title, spanId, error}){
	return (
		<div>
			<div className={classnames("input-group",{'has-error':error})} >
		  				<span className="input-group-addon modal-addon"  id={spanId}>
		  					{title}
		  				</span>
		  				{children}
		  	</div>
		  	{error && <span className="help-block">{error}</span>}
	  	</div>
	);
}

export function  ModalInput({val, type="text",name, required=false, onChange}){
	return (
		<input 
			type={type} 
			required={required ? 'false':''}
			className="form-control" 
			name={name}
			onChange={(onChange)}  
			defaultValue={val}  
		/>
	);
}
