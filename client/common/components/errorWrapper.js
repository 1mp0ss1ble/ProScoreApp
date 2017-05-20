import classnames from 'classnames';
import React from 'react';

export default function ErrorWrapper({children,error}){
	return (
		<div className={classnames("input-group",{"has-error":error})}>
			{children}
			{error && <span className="help-block">{error}</span>}
		</div>
	);
}
