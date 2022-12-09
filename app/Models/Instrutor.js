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
const Usuario_1 = __importDefault(require("./Usuario"));
const Administrador_1 = __importDefault(require("./Administrador"));
const Curso_1 = __importDefault(require("./Curso"));
class Instrutor extends Orm_1.BaseModel {
}
__decorate([
    (0, Orm_1.column)({ isPrimary: true }),
    __metadata("design:type", Number)
], Instrutor.prototype, "id", void 0);
__decorate([
    Orm_1.column.dateTime({ autoCreate: true }),
    __metadata("design:type", luxon_1.DateTime)
], Instrutor.prototype, "criado_em", void 0);
__decorate([
    (0, Orm_1.column)({ serializeAs: null }),
    __metadata("design:type", Number)
], Instrutor.prototype, "criado_por", void 0);
__decorate([
    (0, Orm_1.belongsTo)(() => Administrador_1.default, { foreignKey: 'criado_por' }),
    __metadata("design:type", Object)
], Instrutor.prototype, "criadoPor", void 0);
__decorate([
    Orm_1.column.dateTime(),
    __metadata("design:type", luxon_1.DateTime)
], Instrutor.prototype, "cancelado_em", void 0);
__decorate([
    (0, Orm_1.column)({ serializeAs: null }),
    __metadata("design:type", Number)
], Instrutor.prototype, "cancelado_por", void 0);
__decorate([
    (0, Orm_1.belongsTo)(() => Administrador_1.default, { foreignKey: 'cancelado_por' }),
    __metadata("design:type", Object)
], Instrutor.prototype, "canceladoPor", void 0);
__decorate([
    (0, Orm_1.column)({ serializeAs: null }),
    __metadata("design:type", Number)
], Instrutor.prototype, "cod_usuario", void 0);
__decorate([
    (0, Orm_1.hasOne)(() => Usuario_1.default),
    __metadata("design:type", Object)
], Instrutor.prototype, "usuario", void 0);
__decorate([
    (0, Orm_1.hasMany)(() => Curso_1.default, { foreignKey: 'cod_instrutor' }),
    __metadata("design:type", Object)
], Instrutor.prototype, "cursos", void 0);
exports.default = Instrutor;
//# sourceMappingURL=Instrutor.js.map