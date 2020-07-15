import React, {Component} from 'react';
import {NavLink} from 'react-router-dom';
import "../css/pageNotFound.css"
import "../css/app.css"

class PageNotFound extends Component
{
	render()
	{
		return (
			<div className='notFound'>
				<div className='content'>
					<span role="img" aria-label="sad face emoji">&#x1F61E;</span>
					Unfortunately Page not found
					<NavLink className='btn' to='/'>🡸</NavLink>
				</div>
			</div>
		);
	}
}

export default PageNotFound;