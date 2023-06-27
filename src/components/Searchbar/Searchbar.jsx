import React, { useState } from 'react'
import PropTypes from 'prop-types'

const Searchbar = ({ onSubmit }) => {
	const [searchValue, setSearchValue] = useState('')

	const handleChange = ({ target: { value } }) => {
		setSearchValue(value)
	}

	const handleSubmit = (e) => {
		e.preventDefault()
		onSubmit(searchValue)
		setSearchValue('')
	}
	return (
		<>
			<header className="navbar navbar-expand-lg  bg-light justify-content-center">
				<form className="d-flex my-2 my-lg-0 " onSubmit={handleSubmit}>
					<input
						name='searchValue'
						className="form-control mr-sm-3 m-2"
						type="text"
						autoComplete="off"
						autoFocus
						placeholder="Search images and photos"
						value={searchValue}
						onChange={handleChange}
					/>
					<button type="submit" className="btn btn-outline-success my-2  m-2">
						<span className="button-label">Search</span>
					</button>
				</form>
			</header>
		</>
	)
}

Searchbar.propTypes = {}

export default Searchbar
