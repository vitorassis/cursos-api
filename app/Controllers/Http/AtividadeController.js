"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const Atividade_1 = __importDefault(global[Symbol.for('ioc.use')]("App/Models/Atividade"));
const Aula_1 = __importDefault(global[Symbol.for('ioc.use')]("App/Models/Aula"));
const luxon_1 = require("luxon");
class AtividadeController {
    async get({ params, request }) {
        let atividade = await Atividade_1.default.query()
            .preload('opcoes', q => q.whereNull('cancelado_em'))
            .whereHas('aula', q => {
            q.where('id', params.id);
            q.whereNull('cancelado_em');
            q.whereHas('modulo', q => q.whereNull('cancelado_em')
                .whereHas('curso', q => q.whereNull('cancelado_em')
                .where('cod_instrutor', request.body().usuario.instrutor[0].id)));
        }).whereNull('cancelado_em').orderBy('sequencia');
        return { success: atividade.length > 0, obj: atividade };
    }
    async criar({ request }) {
        let req = request.body();
        let aula = (await Aula_1.default.query().preload('atividades', q => q.whereNull('cancelado_em').
            orderBy('sequencia'))
            .where('id', req.body.cod_aula)
            .whereNull('cancelado_em')
            .whereHas('modulo', q => q.whereNull('cancelado_em')
            .whereHas('curso', q => q.whereNull('cancelado_em')
            .where('cod_instrutor', req.usuario.instrutor[0].id))))[0];
        if (aula) {
            let atividade = new Atividade_1.default();
            atividade.cod_aula = aula.id;
            atividade.pergunta = req.body.pergunta;
            atividade.sequencia = req.body.sequencia;
            if (atividade.sequencia > aula.atividades.length + 1)
                atividade.sequencia = aula.atividades.length + 1;
            if (atividade.sequencia < aula.atividades.length + 1) {
                let i = atividade.sequencia - 1;
                for (i; i < aula.atividades.length; i++) {
                    aula.atividades[i].sequencia = i + 2;
                    await (aula.atividades[i]).save();
                }
            }
            await atividade.save();
            return { success: atividade.$isPersisted, obj: atividade };
        }
        else {
            return { success: false, obj: 'Acesso negado!' };
        }
    }
    async editar({ request, params }) {
        let req = request.body();
        let atividade = (await Atividade_1.default.query()
            .where('id', params.id)
            .preload('opcoes', q => q.whereNull('cancelado_em'))
            .whereHas('aula', q => {
            q.whereNull('cancelado_em');
            q.whereHas('modulo', q => q.whereNull('cancelado_em')
                .whereHas('curso', q => q.whereNull('cancelado_em')
                .where('cod_instrutor', req.usuario.instrutor[0].id)));
        }).whereNull('cancelado_em').orderBy('sequencia'))[0];
        if (atividade) {
            let aula = (await Aula_1.default.query()
                .where('id', req.body.cod_aula)
                .preload('atividades', q => q.whereNull('cancelado_em')
                .orderBy('sequencia')))[0];
            atividade.pergunta = req.body.pergunta;
            let novaSeq = req.body.sequencia;
            if (novaSeq > aula.atividades.length)
                novaSeq = aula.atividades.length;
            if (atividade.sequencia < novaSeq) {
                for (let i = atividade.sequencia - 1; i < novaSeq; i++) {
                    aula.atividades[i].sequencia = i;
                    await (aula.atividades[i]).save();
                }
            }
            else if (atividade.sequencia > novaSeq) {
                for (let i = novaSeq - 1; i < atividade.sequencia; i++) {
                    aula.atividades[i].sequencia = i + 2;
                    await (aula.atividades[i]).save();
                }
            }
            atividade.sequencia = novaSeq;
            await atividade.save();
            return { success: atividade.$isPersisted, obj: atividade };
        }
        else
            return { success: false, obj: 'Atividade não encontrada' };
    }
    async deletar({ request, params }) {
        let req = request.body();
        let atividade = (await Atividade_1.default.query()
            .where('id', params.id)
            .preload('opcoes', q => q.whereNull('cancelado_em'))
            .whereHas('aula', q => {
            q.whereNull('cancelado_em');
            q.whereHas('modulo', q => q.whereNull('cancelado_em')
                .whereHas('curso', q => q.whereNull('cancelado_em')
                .where('cod_instrutor', req.usuario.instrutor[0].id)));
        }).whereNull('cancelado_em').orderBy('sequencia'))[0];
        if (atividade) {
            let aula = (await Aula_1.default.query()
                .where('id', atividade.cod_aula)
                .preload('atividades', q => q.whereNull('cancelado_em')
                .orderBy('sequencia')))[0];
            atividade.cancelado_em = luxon_1.DateTime.now();
            for (let i = atividade.sequencia; i < aula.atividades.length; i++) {
                aula.atividades[i].sequencia = i;
                await (aula.atividades[i]).save();
            }
            await atividade.save();
            return { success: atividade.$isPersisted, obj: atividade };
        }
        else
            return { success: false, obj: 'Atividade não encontrada' };
    }
}
exports.default = AtividadeController;
//# sourceMappingURL=AtividadeController.js.map