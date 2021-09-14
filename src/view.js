import Fecha from './components/fecha.js';
import AddTarea from './components/add-tarea.js';
import Modal from './components/modal.js';
import Filtros from './components/filtros.js';

export default class View {
	constructor(){
		this.model = null;
		this.fecha = new Fecha();
		this.tarjetas = document.getElementById('tarjetas');

		this.filtros = new Filtros();
		this.filtros.onClick((filtros) => this.filtrar(filtros));

		this.modal = new Modal('#myModal');
		this.modal.setView(this);

		this.addTarea = new AddTarea();
		this.addTarea.onClick((titulo, desc) => this.agregaTarea(titulo, desc));
	}

	agregaTarea(titulo, desc){
		const tarea = this.model.agregaTareas(titulo, desc);
		this.creaTarjeta(tarea);
	}

	creaTarjeta(tarea){
		const tarjeta = document.createElement('div');
		tarjeta.setAttribute('id', tarea.id);
		tarjeta.setAttribute('class', 'column is-one-quarter my-auto mx-3');

		tarjeta.innerHTML = `
			<div class="card">
				<header class="card-header">
					<p class="card-header-title">${tarea.titulo}</p>
				</header>
				<div class="card-content">
					<div class="content">
					<p class="has-background-info-light box">${tarea.desc}</p>
						<time datetime="${this.fecha.getFechaISO()}">${tarea.fecha}</time>
						<br><br>
						<label class="checkbox">
							<input type="checkbox">
							Completada
						</label>
					</div>
				</div>
				<footer class="card-footer">
					<a class="button is-primary is-light card-footer-item editar">Editar</a>
					<a class="button is-danger is-light card-footer-item borrar">Borrar</a>
				</footer>
			</div>
		`;

		const boton = tarjeta.querySelector('input[type=checkbox]');
		boton.checked = tarea.completa;
		boton.onclick = () => this.checkTarjeta(tarea.id);

		//editar
		const editar = tarjeta.getElementsByClassName('editar')[0];
		editar.addEventListener('click', () => this.editarTarjeta(tarea.id));

		const borrar = tarjeta.getElementsByClassName('borrar')[0];
		borrar.onclick = () => this.borrarTarjeta(tarea.id);

		tarjetas.appendChild(tarjeta);
	}

	borrarTarjeta(id){
		this.model.borraTarea(id);
		document.getElementById(id).remove();
	}

	editarTarjeta(id){
		const tarea = this.model.getTarea(id);
		this.modal.setValues(tarea);
		this.modal.show();
	}

	editarTarea(tarea){
		this.model.editarTarea(tarea);
		const tarjeta = document.getElementById(tarea.id);
		tarjeta.getElementsByClassName('card-header-title')[0].innerText = tarea.titulo;
		tarjeta.getElementsByClassName('has-background-info-light box')[0].innerText = tarea.desc;
		tarjeta.querySelector('input[type=checkbox]').checked = tarea.completa;
	}

	checkTarjeta(id){
		const boton = document.getElementById(id).querySelector('input[type=checkbox]');
		boton.checked = this.model.checkTarea(id);
	}

	filtrar(filtros){
		const {type, words} = filtros;
		const rows = this.tarjetas.children;

		for (const row of rows){
			const titulo = row.getElementsByClassName('card-header-title')[0];
			const desc = row.getElementsByClassName('has-background-info-light box')[0];
			const check = row.querySelector('input[type=checkbox]');

			let esconder = false;

			if (words){
				esconder = !titulo.innerText.includes(words) && !desc.innerText.includes(words);
			}

			const completa = type === 'Completado';
			const yaCompleta = check.checked;

			if (type !== 'Todo' && completa !== yaCompleta){
				esconder = true;
			}

			if (esconder){
				row.classList.add('is-hidden');
			} else {
				row.classList.remove('is-hidden');
			}
		}
	}

	setModel(model){
		this.model = model;
	}

	render(){
		this.model.getTareas().forEach(tarea => this.creaTarjeta(tarea));
	}

}