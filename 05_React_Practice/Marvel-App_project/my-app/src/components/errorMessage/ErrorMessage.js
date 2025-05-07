import img from './error.gif'

const ErrorMessage = () => {
    return (
        // <img src={process.env.PUBLIC_URL + '/my-app/public/error.gif'} /> - конструкция работы с файлами из папки public
        <img style={{display: 'block', width: '250px', height: '250px', objectFit: 'contain', margin: '0 auto'}} src={img} alt='Error!'/>
    )
}

export default ErrorMessage;