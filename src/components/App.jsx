import Searchbar from "./Searchbar/Searchbar";
import { fetchImages, filterProperties } from '../Helpers/helpers'
import { useEffect, useState } from "react";

import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer, toast } from "react-toastify";
import ImageGallery from "./ImageGallery/ImageGallery";
import Button from "./Button/Button";
import Modal from "./Modal/Modal";
import Loader from "./Loader/Loader";


export const App = () => {
	const INITIAL_MODAL = {
		isOpen: false,
		src: '',
		alt: ''
	}

	const [photos, setPhotos] = useState([])
	const [query, setQuery] = useState('')
	const [page, setPage] = useState(1)
	const [error, setError] = useState('')
	const [isLoading, setIsLoading] = useState(false)
	const [modal, setModal] = useState(INITIAL_MODAL)


	useEffect(() => {
		if (!query) {
			<p className="lead">Write a word into the input</p>
			return
		}
		(async () => {
			try {
				setIsLoading(true)
				const { data: { hits, total } } = await fetchImages(query, page)
				if (!total) {
					toast.info('There is no photos with such word');
				}
				const filteredHits = filterProperties(hits)
				setPhotos(prev => [...prev, ...filteredHits])
			}
			catch (error) { setError(error) }
			finally {
				setIsLoading(false)
			}
		})()
	}, [query, page])

	const onSubmit = (query) => {
		setQuery(query, page)
		setPhotos([])
	}

	const handleOpen = (src, alt) => {
		setModal(() => ({ isOpen: true, src, alt }))
	}
	const handleClose = () => {
		setModal(() => ({ isOpen: false, src: '', alt: '' }))
	}
	const handleLoadMore = () => {
		setPage((prev) => prev + 1)
	}
	const showLoadMoreBtn = photos.length > 0 && !isLoading;

	return (
		<>
			<Searchbar onSubmit={onSubmit} />
			{isLoading && <Loader />}
			{photos.length !== 0 ? <ImageGallery images={photos} error={error} openFullScreenMode={handleOpen} /> : <p className="lead text-center">No Photos</p>}
			{showLoadMoreBtn && <Button onClick={handleLoadMore} />}
			{modal.isOpen && (
				<Modal closeModal={handleClose}>
					<img src={modal.src} alt={modal.alt} />
				</Modal>
			)}
			<ToastContainer />
		</>
	);
};
