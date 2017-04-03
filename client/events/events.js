import React from 'react';


const Events = ({events}) => (
	<div>
		{events.map(t => <p key={t._id}>{t.desc}</p>)}		
	</div>
);


export default Events;
