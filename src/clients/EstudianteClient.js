import axios from "axios";

//Guardar API
//public Response guardar(@RequestBody EstudianteTo estudianteto)

const guardar = async (body) => {
    const data = axios.post('http://localhost:8081/api/matricula/v1/estudiantes', body).then(r => r.data);
    console.log(data);
};
//Actualizar API id
//public Response actualizarPorId(@RequestBody EstudianteTo estudianteTo, @PathParam("id") Integer id)
const actualizar = async (body, id) => {
    axios.put(`http://localhost:8081/api/matricula/v1/estudiantes/${id}`, body).then(r => r.data);

};
//ActualizarParcial API
//public Response actualizarParcialPorId(@RequestBody EstudianteTo estudianteTo, @PathParam("id") Integer id)

const actualizarParcial = async (body, id) => {
    axios.patch(`http://localhost:8081/api/matricula/v1/estudiantes/${id}`,body).then(r => r.data);
};

//ELiminar API
//public Response borrarporId(@PathParam("id") Integer id)

const borrarPorId = async (id) => {
    axios.delete(`http://localhost:8081/api/matricula/v1/estudiantes/${id}`).then(r => r.data);
};
// Consultar estudiante por ID
const consultarEstudiante = async (id) => {
    const url = `http://localhost:8081/api/matricula/v1/estudiantes/${id}`;
    const respuesta = await axios.get(url).then((r) => r.data);
    return respuesta;
};
// Consultar TODOS los estudiantes
const consultarTodos = async () => {
    const url = `http://localhost:8081/api/matricula/v1/estudiantes`;
    const respuesta = await axios.get(url).then((r) => r.data);
    return respuesta;
};

//Fachada
export const guardarFachada = async (body) => {
    await guardar(body);
};
export const actualizarFachada = async (body, id) => {
    await actualizar(body, id);
};

export const actualizarParcialFachada = async (body, id) => {
    await actualizarParcial(body, id);
};

export const borrarPorIdFachada = async (id) => {
    await borrarPorId(id);
};
export const consultarEstudianteFachada = async (id) => {
    return await consultarEstudiante(id);
};

export const consultarTodosEstudiantesFachada = async () => {
    return await consultarTodos();
};
