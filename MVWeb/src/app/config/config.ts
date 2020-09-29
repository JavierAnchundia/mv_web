// const URL_ROOT = 'http://localhost:8000/api'
// const URL_ROOT_AUTH = 'http://localhost:8000'
const URL_ROOT = 'https://carmsanc.pythonanywhere.com/api'
const URL_ROOT_AUTH = 'https://carmsanc.pythonanywhere.com'

const URL_SERVICIOS = {
    camposantos : URL_ROOT + '/camposantos/',
    camposanto : URL_ROOT + '/camposanto/',
    difunto : URL_ROOT + '/difunto/',
    difunto_post : URL_ROOT + '/difunto_post/',
    difuntos : URL_ROOT + '/difuntos/',
    red_social_post: URL_ROOT + '/red_social_post/',
    red_social_put: URL_ROOT + '/red_social_put/',
    red_social: URL_ROOT + '/redes_sociales_camp/',
    sector: URL_ROOT + '/sector_camp/',
    sepultura: URL_ROOT + '/tipo_sepultura_camp/',
    responsable_post: URL_ROOT + '/responsable_difunto_post/',
    responsable_get: URL_ROOT + '/responsable_difunto_get/',
    geolocalizacion_post: URL_ROOT + '/geolocalizacion_post/',
    empresas: URL_ROOT + '/empresas/',
    empresa_get: URL_ROOT + '/empresa_get/',
    usuario: URL_ROOT_AUTH + '/users/',
    login: URL_ROOT + '/token/',
    refreshlogin: URL_ROOT_AUTH +'api/token/refresh/ ',
    fblogin: URL_ROOT_AUTH+'/auth/convert-token/',
    obtener_usuarios: URL_ROOT + '/obtener_usuarios/',
}

export default URL_SERVICIOS