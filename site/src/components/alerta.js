export default class Alerta {
	constructor(idMensaje){
		this.alerta = document.getElementById(idMensaje);
	}

	show(mensaje){
		this.alerta.classList.remove('is-hidden');
		this.alerta.getElementsByClassName('message-body')[0].innerText = mensaje;
	}

	hide(){
		this.alerta.classList.add('is-hidden');
	}
}