"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const Usuario_1 = __importDefault(global[Symbol.for('ioc.use')]("App/Models/Usuario"));
const luxon_1 = require("luxon");
const Hash_1 = __importDefault(global[Symbol.for('ioc.use')]("Adonis/Core/Hash"));
const Administrador_1 = __importDefault(global[Symbol.for('ioc.use')]("App/Models/Administrador"));
const Aluno_1 = __importDefault(global[Symbol.for('ioc.use')]("App/Models/Aluno"));
const Instrutor_1 = __importDefault(global[Symbol.for('ioc.use')]("App/Models/Instrutor"));
class UsuarioController {
    async get({ request }) {
        let usuario = (await Usuario_1.default.query().where('id', request.body().usuario.id).preload('admin', q => q.whereNull('cancelado_em')).preload('aluno', q => q.whereNull('cancelado_em')).preload('instrutor', q => q.whereNull('cancelado_em')))[0];
        return { success: true, obj: usuario };
    }
    async editar({ request }) {
        let req = request.body();
        let usuario = (await Usuario_1.default.query().where('id', request.body().usuario.id))[0];
        usuario.nome = req.body.nome;
        usuario.email = req.body.email;
        usuario.telefone = req.body.telefone;
        await usuario.save();
        return { success: usuario.$isPersisted };
    }
    async criar({ request }) {
        function makeid(length) {
            var result = '';
            var characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
            var charactersLength = characters.length;
            for (var i = 0; i < length; i++) {
                result += characters.charAt(Math.floor(Math.random() * charactersLength));
            }
            return result;
        }
        let usuario = new Usuario_1.default();
        let body = request.body();
        usuario.nome = body.body.nome;
        usuario.email = body.body.email;
        let senha = makeid(15);
        usuario.senha = '1234';
        usuario.telefone = body.body.telefone ? body.body.telefone : '';
        usuario.criado_por = body.usuario.admin[0].id;
        await usuario.save();
        if (usuario.$isPersisted) {
            await usuario.load('criadoPor');
            await usuario.criadoPor.load('usuario');
        }
        return {
            success: usuario.$isPersisted, obj: { usuario, senha }
        };
    }
    async deletar({ params, request }) {
        let usuario = await Usuario_1.default.findOrFail(params.id);
        usuario.cancelado_em = luxon_1.DateTime.now();
        usuario.cancelado_por = request.body().usuario.admin[0].id;
        await usuario.save();
        let admin = await Administrador_1.default.query().where('cod_usuario', params.id).whereNull('cancelado_em');
        for (let i = 0; i < admin.length; i++) {
            admin[i].cancelado_em = luxon_1.DateTime.now();
            admin[i].cancelado_por = request.body().usuario.admin[0].id;
            await admin[i].save();
        }
        let aluno = await Aluno_1.default.query().where('cod_usuario', params.id).whereNull('cancelado_em');
        for (let i = 0; i < aluno.length; i++) {
            aluno[i].cancelado_em = luxon_1.DateTime.now();
            aluno[i].cancelado_por = request.body().usuario.admin[0].id;
            await aluno[i].save();
        }
        let instrutor = await Instrutor_1.default.query().where('cod_usuario', params.id).whereNull('cancelado_em');
        for (let i = 0; i < instrutor.length; i++) {
            instrutor[i].cancelado_em = luxon_1.DateTime.now();
            instrutor[i].cancelado_por = request.body().usuario.admin[0].id;
            await instrutor[i].save();
        }
        return {
            success: usuario.$isPersisted
        };
    }
    async getAll() {
        async function loadRelations(obj) {
            if (obj.criado_por != null) {
                await obj.load('criadoPor');
                await obj.criadoPor.load('usuario');
            }
            if (obj.cancelado_por != null) {
                await obj.load('canceladoPor');
                await obj.canceladoPor.load('usuario');
            }
            await obj.load('admin', q => {
                q.whereNull('cancelado_em');
            });
            await obj.load('aluno', q => {
                q.whereNull('cancelado_em');
            });
            await obj.load('instrutor', q => {
                q.whereNull('cancelado_em');
            });
        }
        let usuarios = await Usuario_1.default.all();
        for (let i = 0; i < usuarios.length; i++) {
            await loadRelations(usuarios[i]);
        }
        return { success: true, obj: usuarios };
    }
    async login({ auth, request }) {
        const email = request.input('email');
        const password = request.input('senha');
        const acesso = request.input('perfil');
        const user = await Usuario_1.default
            .query()
            .where('email', email)
            .whereNull('cancelado_em')
            .first();
        if (user == null)
            return { success: false, obj: 'Usuário não encontrado' };
        if (!(await Hash_1.default.verify(user.senha, password))) {
            return { success: false, obj: 'Usuário não encontrado' };
        }
        let err = false;
        switch (acesso) {
            case 'Al':
                await user.load('aluno', q => {
                    q.whereNull('cancelado_em');
                });
                if (user.aluno.length == 0)
                    err = true;
                break;
            case 'Ad':
                await user.load('admin', q => {
                    q.whereNull('cancelado_em');
                });
                if (user.admin.length == 0)
                    err = true;
                break;
            case 'In':
                await user.load('instrutor', q => {
                    q.whereNull('cancelado_em');
                });
                if (user.instrutor.length == 0)
                    err = true;
        }
        if (err) {
            return { success: false, obj: 'Usuário não encontrado' };
        }
        const token = await auth.use('api').generate(user, {
            expiresIn: '1 day'
        });
        return {
            success: true,
            obj: {
                usuario: {
                    ...(user.serialize()),
                    token: token.token
                }
            }
        };
    }
    async concederAcesso({ request }) {
        let body = request.body();
        let acesso = null;
        let check = [];
        switch (body.body.tipo) {
            case 'admin':
                check = await Administrador_1.default.query().
                    where('cod_usuario', body.body.cod_usuario).whereNull('cancelado_em');
                if (check.length == 0)
                    acesso = new Administrador_1.default();
                break;
            case 'aluno':
                check = await Aluno_1.default.query().
                    where('cod_usuario', body.body.cod_usuario).whereNull('cancelado_em');
                if (check.length == 0)
                    acesso = new Aluno_1.default();
                break;
            case 'instrutor':
                check = await Instrutor_1.default.query().
                    where('cod_usuario', body.body.cod_usuario).whereNull('cancelado_em');
                if (check.length == 0)
                    acesso = new Instrutor_1.default();
        }
        if (acesso != null) {
            acesso.cod_usuario = body.body.cod_usuario;
            acesso.criado_por = body.usuario.admin[0].id;
            await acesso.save();
            return { success: acesso.$isPersisted };
        }
        else
            return { success: false };
    }
    async revogarAcesso({ params, request }) {
        let body = request.body();
        let acesso = null;
        switch (params.acesso) {
            case 'admin':
                acesso = await Administrador_1.default.query().
                    where('cod_usuario', params.id).whereNull('cancelado_em').first();
                break;
            case 'aluno':
                acesso = await Aluno_1.default.query().
                    where('cod_usuario', params.id).whereNull('cancelado_em').first();
                break;
            case 'instrutor':
                acesso = await Instrutor_1.default.query().
                    where('cod_usuario', params.id).whereNull('cancelado_em').first();
        }
        if (acesso != null) {
            acesso.cancelado_por = body.usuario.admin[0].id;
            acesso.cancelado_em = luxon_1.DateTime.now();
            await acesso.save();
            return { success: acesso.$isPersisted };
        }
        else
            return { success: false };
    }
}
exports.default = UsuarioController;
//# sourceMappingURL=UsuarioController.js.map