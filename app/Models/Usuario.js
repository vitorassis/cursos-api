"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const luxon_1 = require("luxon");
const Orm_1 = global[Symbol.for('ioc.use')]("Adonis/Lucid/Orm");
const Administrador_1 = __importDefault(require("./Administrador"));
const Hash_1 = __importDefault(global[Symbol.for('ioc.use')]("Adonis/Core/Hash"));
const Aluno_1 = __importDefault(require("./Aluno"));
const Instrutor_1 = __importDefault(require("./Instrutor"));
class Usuario extends Orm_1.BaseModel {
    static async hashPassword(user) {
        if (user.$dirty.senha) {
            user.senha = await Hash_1.default.make(user.senha);
        }
    }
}
__decorate([
    (0, Orm_1.column)({ isPrimary: true }),
    __metadata("design:type", Number)
], Usuario.prototype, "id", void 0);
__decorate([
    (0, Orm_1.column)(),
    __metadata("design:type", String)
], Usuario.prototype, "nome", void 0);
__decorate([
    (0, Orm_1.column)(),
    __metadata("design:type", String)
], Usuario.prototype, "email", void 0);
__decorate([
    (0, Orm_1.column)(),
    __metadata("design:type", String)
], Usuario.prototype, "telefone", void 0);
__decorate([
    Orm_1.column.dateTime({ autoCreate: true }),
    __metadata("design:type", luxon_1.DateTime)
], Usuario.prototype, "criado_em", void 0);
__decorate([
    (0, Orm_1.column)({ serializeAs: null }),
    __metadata("design:type", Number)
], Usuario.prototype, "criado_por", void 0);
__decorate([
    (0, Orm_1.belongsTo)(() => Administrador_1.default, { foreignKey: 'criado_por' }),
    __metadata("design:type", Object)
], Usuario.prototype, "criadoPor", void 0);
__decorate([
    Orm_1.column.dateTime(),
    __metadata("design:type", luxon_1.DateTime)
], Usuario.prototype, "cancelado_em", void 0);
__decorate([
    (0, Orm_1.column)({ serializeAs: null }),
    __metadata("design:type", Number)
], Usuario.prototype, "cancelado_por", void 0);
__decorate([
    (0, Orm_1.belongsTo)(() => Administrador_1.default, { foreignKey: 'cancelado_por' }),
    __metadata("design:type", Object)
], Usuario.prototype, "canceladoPor", void 0);
__decorate([
    (0, Orm_1.column)({ serializeAs: null }),
    __metadata("design:type", String)
], Usuario.prototype, "senha", void 0);
__decorate([
    (0, Orm_1.hasMany)(() => Aluno_1.default, { foreignKey: 'cod_usuario' }),
    __metadata("design:type", Object)
], Usuario.prototype, "aluno", void 0);
__decorate([
    (0, Orm_1.hasMany)(() => Administrador_1.default, { foreignKey: 'cod_usuario' }),
    __metadata("design:type", Object)
], Usuario.prototype, "admin", void 0);
__decorate([
    (0, Orm_1.hasMany)(() => Instrutor_1.default, { foreignKey: 'cod_usuario' }),
    __metadata("design:type", Object)
], Usuario.prototype, "instrutor", void 0);
__decorate([
    (0, Orm_1.beforeSave)(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Usuario]),
    __metadata("design:returntype", Promise)
], Usuario, "hashPassword", null);
exports.default = Usuario;
//# sourceMappingURL=Usuario.js.map