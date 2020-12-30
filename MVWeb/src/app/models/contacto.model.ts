
export class Contacto{
    constructor(
        public imagenURL:String,
        public mensaje: String,
        public fecha_emision: Date,
        public id_camposanto?: any,
        public id_usuario?: any
        
    ){

    }
}