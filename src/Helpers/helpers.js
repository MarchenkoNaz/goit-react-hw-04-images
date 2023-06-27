import PropTypes from 'prop-types'
import axios from 'axios';

const API_KEY = '37523612-016e16a6549b7a098e67dc77e';

axios.defaults.baseURL = 'https://pixabay.com/api';
axios.defaults.params = {
	image_type: 'photo',
	orientation: 'horizontal',
	per_page: 12,
};
export const fetchImages = async (query = '', page = 1) => {
	return await axios.get(`?key=${API_KEY}&q=${query}&page=${page}`)
};
fetchImages.propTypes = {
	searchQuery: PropTypes.string,
	page: PropTypes.number
}

export default fetchImages

export const filterProperties = (hits) => hits.map(hit => {
	const { id, webformatURL, largeImageURL, tags } = hit;
	return { id, webformatURL, largeImageURL, tags };
});
