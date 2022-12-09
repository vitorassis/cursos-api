"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const standalone_1 = require("@adonisjs/auth/build/standalone");
const standalone_2 = require("@adonisjs/core/build/standalone");
const Usuario_1 = __importDefault(global[Symbol.for('ioc.use')]("App/Models/Usuario"));
class AuthMiddleware {
    constructor() {
        this.redirectTo = '/login';
    }
    async authenticate(auth, guards) {
        let guardLastAttempted;
        for (let guard of guards) {
            guardLastAttempted = guard;
            if (await auth.use(guard).check()) {
                auth.defaultGuard = guard;
                return true;
            }
        }
        throw new standalone_1.AuthenticationException('Unauthorized access', 'E_UNAUTHORIZED_ACCESS', guardLastAttempted, this.redirectTo);
    }
    async handle({ request, auth }, next, perfil) {
        const guards = [auth.name];
        await this.authenticate(auth, guards);
        await auth.use('api').authenticate();
        let a = auth.use('api');
        let usuario;
        if (a.user)
            usuario = await Usuario_1.default.findOrFail(a.user.id);
        let erro = false;
        perfil = perfil?.at(0);
        switch (perfil) {
            case 'aluno':
                await usuario.load('aluno', q => {
                    q.whereNull('cancelado_em');
                });
                if (usuario.aluno.length == 0)
                    erro = true;
                break;
            case 'admin':
                await usuario.load('admin');
                if (usuario.admin.length == 0)
                    erro = true;
                break;
            case 'instrutor':
                await usuario.load('instrutor', q => {
                    q.whereNull('cancelado_em');
                });
                if (usuario.instrutor.length == 0)
                    erro = true;
                break;
        }
        if (erro)
            throw new standalone_2.Exception('Não autorizado!');
        request.updateBody({
            usuario,
            body: request.body()
        });
        await next();
    }
}
exports.default = AuthMiddleware;
//# sourceMappingURL=Auth.js.map