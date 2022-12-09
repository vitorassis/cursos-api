"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const Curso_1 = __importDefault(global[Symbol.for('ioc.use')]("App/Models/Curso"));
class InstrutorController {
    async getCursos({ request }) {
        let cursos = await Curso_1.default.query()
            .where('cod_instrutor', request.body().usuario.instrutor[0].id)
            .whereNull('cancelado_em');
        return { success: true, obj: cursos };
    }
}
exports.default = InstrutorController;
//# sourceMappingURL=InstrutorController.js.map