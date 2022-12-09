"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const Curso_1 = __importDefault(global[Symbol.for('ioc.use')]("App/Models/Curso"));
const luxon_1 = require("luxon");
class CursoController {
    async criar({ request }) {
        let curso = new Curso_1.default();
        let req = request.body();
        curso.nome = req.body.nome;
        curso.cod_hotmart = req.body.cod_hotmart;
        curso.cod_instrutor = req.usuario.instrutor[0].id;
        await curso.save();
        if (curso.$isPersisted) {
            return { success: true, obj: curso };
        }
    }
    async get({ request, params }) {
        let curso = (await Curso_1.default.query()
            .where('id', params.id)
            .where('cod_instrutor', request.body().usuario.instrutor[0].id).preload('modulos', q => {
            q.whereNull('cancelado_em').orderBy('sequencia');
        }))[0];
        if (curso) {
            for (let i = 0; i < curso.modulos.length; i++) {
                await curso.modulos[i].load('aulas', q => q.whereNull('cancelado_em').orderBy('sequencia'));
                for (let j = 0; j < curso.modulos[i].aulas.length; j++) {
                    await curso.modulos[i].aulas[j].load('atividades', q => q.orderBy('sequencia').whereNull('cancelado_em'));
                    for (let k = 0; k < curso.modulos[i].aulas[j].atividades.length; k++) {
                        await curso.modulos[i].aulas[j].atividades[k].load('opcoes', q => q.whereNull('cancelado_em'));
                    }
                }
            }
        }
        return { success: curso != null, obj: curso };
    }
    async editar({ request, params }) {
        let curso = (await Curso_1.default.query()
            .where('id', params.id)
            .where('cod_instrutor', request.body().usuario.instrutor[0].id))[0];
        if (curso) {
            curso.nome = request.body().body.nome;
            curso.cod_hotmart = request.body().body.cod_hotmart;
            await curso.save();
            return { success: curso.$isPersisted, obj: curso };
        }
        return { success: false };
    }
    async deletar({ request, params }) {
        let curso = (await Curso_1.default.query()
            .where('id', params.id)
            .where('cod_instrutor', request.body().usuario.instrutor[0].id))[0];
        if (curso) {
            curso.cancelado_em = luxon_1.DateTime.now();
            await curso.save();
            return { success: curso.$isPersisted, obj: curso };
        }
        return { success: false };
    }
}
exports.default = CursoController;
//# sourceMappingURL=CursoController.js.map