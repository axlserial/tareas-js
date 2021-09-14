export default class Fecha {
	constructor(){
		this.date = null;
	}

	getFechaISO(){
		this.date = new Date();
		return this.date.toISOString();
	}

	generaFechaActual(){
		this.date = new Date();
		const formato = {year: 'numeric', month: 'short', day: 'numeric'};
		return this.date.toLocaleDateString("es-MX", formato);
	}

	generaHoraActual(){
		this.date = new Date();
		const formato = {hour: 'numeric', minute: 'numeric', hour12: 'true'};
		return this.date.toLocaleString("es-MX", formato);
	}
}