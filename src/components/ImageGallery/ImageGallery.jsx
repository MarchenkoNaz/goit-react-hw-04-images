import React from 'react'
import PropTypes from 'prop-types'
import ImageGalleryItem from 'components/ImageGalleryItem/ImageGalleryItem';


const ImageGallery = ({ images = [], error, openFullScreenMode }) => {

	return (<>
		<ul className="container-fluid  row row-cols-3">
			{images.map(img => {
				return (
					<ImageGalleryItem key={img.id} {...img} openFullScreenMode={openFullScreenMode} />
				)
			})}
		</ul>
		{!!error && <p>{error.message}</p>}
	</>)
}


ImageGallery.propTypes = {
	images: PropTypes.array,
	error: PropTypes.string,
	openFullScreenMode: PropTypes.func,
};

export default ImageGallery