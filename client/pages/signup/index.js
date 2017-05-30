import React from 'react';
import SignupForm from './signupForm';
import Users from './users';




const SignupPage = () => (
	<div className="row">
		<div className="col-md-4 ">
			<Users />
		</div>
		<div className="col-md-4">
			<SignupForm />
		</div>
	</div>
);


export default SignupPage;
