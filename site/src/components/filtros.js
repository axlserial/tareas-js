export default class Filtros {
	constructor(){
		this.form = document.getElementById('filters');
		this.btn = document.getElementById('search-btn');
	}

	onClick(callback){
		this.btn.onclick = (e) => {
			e.preventDefault();
			const data = new FormData(this.form);
			callback({
				type: data.get('answer'),
				words: data.get('words')
			});
		};
	}
}