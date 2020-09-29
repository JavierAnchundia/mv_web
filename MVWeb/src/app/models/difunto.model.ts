export interface Difunto{
    nombre:string,
    apellido:string,
    genero: string,
    cedula:string,
    lugar_nacimiento: string,
    fecha_nacimiento: Date,
    lugar_difuncion: string,
    fecha_difuncion: Date,
    no_lapida: Number,
    longitud: Number,
    latitud: Number,
    num_rosas: Number,
    estado: boolean,
    id_camposanto?: any,
    id_difunto?:any,
    id_tip_sepultura?: any,
    id_sector?: any,

}