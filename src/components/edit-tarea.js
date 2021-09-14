import Alerta from './alerta.js';

export default class EditTarea {
	constructor(){
		this.title = document.getElementById('titulo-modal');
		this.desc = document.getElementById('desc-modal');
		this.check = document.getElementById('check-modal');
		this.btn = document.getElementById('save-modal');
		this.alerta = new Alerta('error-modal');
	}

	onClick(callback){
		this.btn.onclick = () => {
			if (this.title.value === '' || this.desc.value === ''){
				this.alerta.show('No puedes dejar algún campo vacío');
			} else {
				this.alerta.hide();
				callback(this.title.value, this.desc.value, this.check.checked);
			}
		};
	}
}