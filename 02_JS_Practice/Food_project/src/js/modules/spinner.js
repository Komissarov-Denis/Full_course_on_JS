
// SPINNER--------------------------------------------------------
export default function spinner() {
	const loadingClass = document.querySelectorAll('.loading');
	loadingClass.forEach(item => {
		showSpinner(item);
	});
	function showSpinner(loadingClass) {
		// console.log(loadingClass);
		const spinnerMessage = {loading: 'img/form/spinner.svg'};
		// console.log(spinnerMessage);
		const spinnerImg = document.createElement('img');
		// console.log(spinnerImg);
		spinnerImg.src = spinnerMessage.loading;
		// console.log();
		// spinnerImg.textContent = spinnerMessage.loading;
		// loadingClass.append(spinnerImg);
		loadingClass.insertAdjacentElement('beforeEnd', spinnerImg);
	}
}