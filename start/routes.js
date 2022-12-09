"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const Route_1 = __importDefault(global[Symbol.for('ioc.use')]("Adonis/Core/Route"));
Route_1.default.group(() => {
}).prefix('/aluno');
Route_1.default.group(() => {
    Route_1.default.get('/cursos', 'InstrutorController.getCursos');
    Route_1.default.get('/curso/:id', 'CursoController.get');
    Route_1.default.post('/curso', 'CursoController.criar');
    Route_1.default.post('/curso/:id', 'CursoController.editar');
    Route_1.default.delete('/curso/:id', 'CursoController.deletar');
    Route_1.default.post('/modulo', 'ModuloController.criar');
    Route_1.default.post('/modulo/:id', 'ModuloController.editar');
    Route_1.default.delete('/modulo/:curso/:id', 'ModuloController.deletar');
    Route_1.default.get('/aula/:id', 'AulaController.get');
    Route_1.default.post('/aula/', 'AulaController.criar');
    Route_1.default.post('/aula/:id', 'AulaController.editar');
    Route_1.default.delete('/aula/:id', 'AulaController.deletar');
    Route_1.default.get('/aula/:id/atividades', 'AtividadeController.get');
    Route_1.default.post('/atividade', 'AtividadeController.criar');
    Route_1.default.post('/atividade/:id', 'AtividadeController.editar');
    Route_1.default.delete('/atividade/:id', 'AtividadeController.deletar');
    Route_1.default.post('/opcao', 'OpcaoController.criar');
    Route_1.default.post('/opcao/:id', 'OpcaoController.editar');
    Route_1.default.delete('/opcao/:id', 'OpcaoController.deletar');
}).middleware('auth:instrutor').prefix('/instrutor');
Route_1.default.group(() => {
    Route_1.default.get('/usuarios', 'UsuarioController.getAll');
    Route_1.default.post('/usuario', 'UsuarioController.criar');
    Route_1.default.delete('/usuario/:id', 'UsuarioController.deletar');
    Route_1.default.post('/acesso', 'UsuarioController.concederAcesso');
    Route_1.default.delete('/acesso/:id/:acesso', 'UsuarioController.revogarAcesso');
}).middleware(['auth:admin']).prefix('/admin');
Route_1.default.group(() => {
    Route_1.default.get('/perfil', 'UsuarioController.get');
    Route_1.default.post('/perfil', 'UsuarioController.editar');
}).prefix('/usuario').middleware('auth');
Route_1.default.post('/login', 'UsuarioController.login');
//# sourceMappingURL=routes.js.map