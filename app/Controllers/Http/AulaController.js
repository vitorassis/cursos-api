"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const Aula_1 = __importDefault(global[Symbol.for('ioc.use')]("App/Models/Aula"));
const Modulo_1 = __importDefault(global[Symbol.for('ioc.use')]("App/Models/Modulo"));
const luxon_1 = require("luxon");
class AulaController {
    async criar({ request }) {
        let req = request.body();
        let modulo = (await Modulo_1.default.query()
            .where('id', req.body.cod_modulo)
            .whereHas('curso', q => {
            q.where('cod_instrutor', req.usuario.instrutor[0].id);
            q.whereNull('cancelado_em');
        }).whereNull('cancelado_em').preload('aulas', q => q.whereNull('cancelado_em').orderBy('sequencia')))[0];
        if (modulo) {
            let aula = new Aula_1.default();
            aula.nome = req.body.nome;
            aula.descricao = req.body.descricao;
            aula.sequencia = req.body.sequencia;
            aula.cod_modulo = req.body.cod_modulo;
            if (aula.sequencia > modulo.aulas.length + 1)
                aula.sequencia = modulo.aulas.length + 1;
            if (aula.sequencia < modulo.aulas.length + 1) {
                let i = aula.sequencia - 1;
                for (i; i < modulo.aulas.length; i++) {
                    modulo.aulas[i].sequencia = i + 2;
                    await (modulo.aulas[i]).save();
                }
            }
            await aula.save();
            if (aula.$isPersisted)
                return { success: true, obj: aula };
            return { success: false, obj: 'Falha na inclusão' };
        }
        else
            return { success: false, obj: 'Modulo não encontrado' };
    }
    async get({ request, params }) {
        let req = request.body();
        let aula = (await Aula_1.default.query()
            .where('id', params.id)
            .whereHas('modulo', q => q.whereHas('curso', q => q.where('cod_instrutor', req.usuario.instrutor[0].id)
            .whereNull('cancelado_em')).whereNull('cancelado_em'))
            .whereNull('cancelado_em')
            .whereNull('cancelado_em'))[0];
        return { success: aula != undefined, obj: aula };
    }
    async editar({ request, params }) {
        let req = request.body();
        let aula = (await Aula_1.default.query()
            .where('id', params.id)
            .whereHas('modulo', q => q.whereHas('curso', q => q.where('cod_instrutor', req.usuario.instrutor[0].id)
            .whereNull('cancelado_em')).whereNull('cancelado_em'))
            .whereNull('cancelado_em')
            .whereNull('cancelado_em'))[0];
        if (aula) {
            aula.nome = req.body.nome;
            aula.descricao = req.body.descricao;
            let modulo = (await Modulo_1.default.query()
                .where('id', aula.cod_modulo)
                .preload('aulas', q => q.whereNull('cancelado_em').orderBy('sequencia')))[0];
            let novaSeq = req.body.sequencia;
            if (novaSeq > modulo.aulas.length)
                novaSeq = modulo.aulas.length;
            if (aula.sequencia < novaSeq) {
                for (let i = aula.sequencia - 1; i < novaSeq; i++) {
                    modulo.aulas[i].sequencia = i;
                    await (modulo.aulas[i]).save();
                }
            }
            else if (aula.sequencia > novaSeq) {
                for (let i = novaSeq - 1; i < aula.sequencia; i++) {
                    modulo.aulas[i].sequencia = i + 2;
                    await (modulo.aulas[i]).save();
                }
            }
            aula.sequencia = novaSeq;
            await aula.save();
            if (aula.$isPersisted)
                return { success: true, obj: aula };
            return { success: false };
        }
    }
    async deletar({ request, params }) {
        let req = request.body();
        let aula = (await Aula_1.default.query()
            .where('id', params.id)
            .whereHas('modulo', q => q.whereHas('curso', q => q.where('cod_instrutor', req.usuario.instrutor[0].id)
            .whereNull('cancelado_em')).whereNull('cancelado_em'))
            .whereNull('cancelado_em')
            .whereNull('cancelado_em'))[0];
        if (aula) {
            let modulo = (await Modulo_1.default.query()
                .where('id', aula.cod_modulo)
                .preload('aulas', q => q.whereNull('cancelado_em').orderBy('sequencia')))[0];
            aula.cancelado_em = luxon_1.DateTime.now();
            for (let i = aula.sequencia; i < modulo.aulas.length; i++) {
                modulo.aulas[i].sequencia = i;
                await (modulo.aulas[i]).save();
            }
            await aula.save();
            if (aula.$isPersisted)
                return { success: true, obj: aula };
            return { success: false };
        }
    }
}
exports.default = AulaController;
//# sourceMappingURL=AulaController.js.map