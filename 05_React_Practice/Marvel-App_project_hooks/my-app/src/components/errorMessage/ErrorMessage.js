import img from './error.gif'

const ErrorMessageImg = () => {
	return (
		// <img src={process.env.PUBLIC_URL + '/my-app/public/error.gif'} /> - конструкция работы с файлами из папки public
		<img style={{display: 'block', width: '250px', height: '250px', objectFit: 'contain', margin: '0 auto'}} src={img} alt='Error!'/>
	)
}

const ErrorMessageText = () => {
	return ('SORRY.	There is no description for this character')
}

export { ErrorMessageImg, ErrorMessageText };