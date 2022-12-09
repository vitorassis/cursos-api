"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const Curso_1 = __importDefault(global[Symbol.for('ioc.use')]("App/Models/Curso"));
const Modulo_1 = __importDefault(global[Symbol.for('ioc.use')]("App/Models/Modulo"));
const luxon_1 = require("luxon");
class ModuloController {
    async criar({ request }) {
        let req = request.body();
        let curso = (await Curso_1.default.query()
            .where('id', req.body.cod_curso).whereNull('cancelado_em')
            .where('cod_instrutor', req.usuario.instrutor[0].id).preload('modulos', q => {
            q.whereNull('cancelado_em').orderBy('sequencia');
        }))[0];
        if (curso) {
            let modulo = new Modulo_1.default();
            modulo.nome = req.body.nome;
            modulo.sequencia = req.body.sequencia;
            modulo.cod_curso = req.body.cod_curso;
            if (modulo.sequencia > curso.modulos.length + 1)
                modulo.sequencia = curso.modulos.length + 1;
            if (modulo.sequencia < curso.modulos.length + 1) {
                let i = modulo.sequencia - 1;
                for (i; i < curso.modulos.length; i++) {
                    curso.modulos[i].sequencia = i + 2;
                    await (curso.modulos[i]).save();
                }
            }
            await modulo.save();
            return { success: modulo.$isPersisted, obj: modulo };
        }
    }
    async editar({ request, params }) {
        let req = request.body();
        let curso = (await Curso_1.default.query()
            .where('id', req.body.cod_curso).whereNull('cancelado_em')
            .where('cod_instrutor', req.usuario.instrutor[0].id).preload('modulos', q => {
            q.whereNull('cancelado_em').orderBy('sequencia');
        }))[0];
        if (curso) {
            let modulo = (await Modulo_1.default.query().where('id', params.id).whereNull('cancelado_em').where('cod_curso', curso.id))[0];
            if (modulo) {
                modulo.nome = req.body.nome;
                let novaSeq = req.body.sequencia;
                if (novaSeq > curso.modulos.length)
                    novaSeq = curso.modulos.length;
                if (modulo.sequencia < novaSeq) {
                    for (let i = modulo.sequencia - 1; i < novaSeq; i++) {
                        curso.modulos[i].sequencia = i;
                        await (curso.modulos[i]).save();
                    }
                }
                else if (modulo.sequencia > novaSeq) {
                    for (let i = novaSeq - 1; i < modulo.sequencia; i++) {
                        curso.modulos[i].sequencia = i + 2;
                        await (curso.modulos[i]).save();
                    }
                }
                modulo.sequencia = novaSeq;
                await modulo.save();
                return { success: modulo.$isPersisted, obj: modulo };
            }
            else
                return { success: false, obj: 'Curso não encontrado' };
        }
    }
    async deletar({ request, params }) {
        let req = request.body();
        let curso = (await Curso_1.default.query()
            .where('id', params.curso).whereNull('cancelado_em')
            .where('cod_instrutor', req.usuario.instrutor[0].id).preload('modulos', q => {
            q.whereNull('cancelado_em').orderBy('sequencia');
        }))[0];
        if (curso) {
            let modulo = (await Modulo_1.default.query().where('id', params.id).whereNull('cancelado_em').where('cod_curso', curso.id))[0];
            if (modulo) {
                modulo.cancelado_em = luxon_1.DateTime.now();
                for (let i = modulo.sequencia; i < curso.modulos.length; i++) {
                    curso.modulos[i].sequencia = i;
                    await (curso.modulos[i]).save();
                }
                await modulo.save();
                return { success: modulo.$isPersisted, obj: modulo };
            }
            else
                return { success: false, obj: 'Modulo não encontrado' };
        }
    }
}
exports.default = ModuloController;
//# sourceMappingURL=ModuloController.js.map