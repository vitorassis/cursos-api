"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const Atividade_1 = __importDefault(global[Symbol.for('ioc.use')]("App/Models/Atividade"));
const Opcao_1 = __importDefault(global[Symbol.for('ioc.use')]("App/Models/Opcao"));
const luxon_1 = require("luxon");
class OpcaoController {
    async criar({ request }) {
        let req = request.body();
        let atividade = await Atividade_1.default.query()
            .where('id', req.body.cod_atividade).whereNull('cancelado_em')
            .whereHas('aula', q => {
            q.whereNull('cancelado_em');
            q.whereHas('modulo', q => {
                q.whereNull('cancelado_em');
                q.whereHas('curso', q => {
                    q.whereNull('cancelado_em');
                    q.where('cod_instrutor', req.usuario.instrutor[0].id);
                });
            });
        });
        if (atividade) {
            let opcao = new Opcao_1.default();
            opcao.texto = req.body.texto;
            opcao.correta = req.body.correta;
            opcao.cod_atividade = req.body.cod_atividade;
            await opcao.save();
            return { success: opcao.$isPersisted, obj: opcao };
        }
        else {
            return { success: false, obj: 'Atividade não encontrada' };
        }
    }
    async editar({ request, params }) {
        let req = request.body();
        let atividade = await Atividade_1.default.query()
            .where('id', req.body.cod_atividade).whereNull('cancelado_em')
            .whereHas('aula', q => {
            q.whereNull('cancelado_em');
            q.whereHas('modulo', q => {
                q.whereNull('cancelado_em');
                q.whereHas('curso', q => {
                    q.whereNull('cancelado_em');
                    q.where('cod_instrutor', req.usuario.instrutor[0].id);
                });
            });
        });
        if (atividade) {
            let opcao = await Opcao_1.default.find(params.id);
            if (opcao) {
                opcao.texto = req.body.texto;
                opcao.correta = req.body.correta;
                await opcao.save();
                return { success: opcao.$isPersisted, obj: opcao };
            }
            else {
                return { success: false, obj: 'Opção não encontrada' };
            }
        }
        else {
            return { success: false, obj: 'Atividade não encontrada' };
        }
    }
    async deletar({ request, params }) {
        let req = request.body();
        let opcao = (await Opcao_1.default.query()
            .where('id', params.id)
            .whereNull('cancelado_em')
            .whereHas('atividade', q => {
            q.whereNull('cancelado_em');
            q.whereHas('aula', q => {
                q.whereNull('cancelado_em');
                q.whereHas('modulo', q => {
                    q.whereNull('cancelado_em');
                    q.whereHas('curso', q => {
                        q.whereNull('cancelado_em');
                        q.where('cod_instrutor', req.usuario.instrutor[0].id);
                    });
                });
            });
        }))[0];
        if (opcao) {
            opcao.cancelado_em = luxon_1.DateTime.now();
            await opcao.save();
            return { success: opcao.$isPersisted, obj: opcao };
        }
        else {
            return { success: false, obj: "Opção não encontrada" };
        }
    }
}
exports.default = OpcaoController;
//# sourceMappingURL=OpcaoController.js.map