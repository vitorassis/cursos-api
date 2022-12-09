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
const Instrutor_1 = __importDefault(require("./Instrutor"));
const Modulo_1 = __importDefault(require("./Modulo"));
const Matricula_1 = __importDefault(require("./Matricula"));
class Curso extends Orm_1.BaseModel {
}
__decorate([
    (0, Orm_1.column)({ isPrimary: true }),
    __metadata("design:type", Number)
], Curso.prototype, "id", void 0);
__decorate([
    (0, Orm_1.column)(),
    __metadata("design:type", String)
], Curso.prototype, "nome", void 0);
__decorate([
    (0, Orm_1.column)(),
    __metadata("design:type", String)
], Curso.prototype, "cod_hotmart", void 0);
__decorate([
    Orm_1.column.dateTime({ autoCreate: true }),
    __metadata("design:type", luxon_1.DateTime)
], Curso.prototype, "criado_em", void 0);
__decorate([
    Orm_1.column.dateTime(),
    __metadata("design:type", luxon_1.DateTime)
], Curso.prototype, "cancelado_em", void 0);
__decorate([
    (0, Orm_1.column)({ serializeAs: null }),
    __metadata("design:type", Number)
], Curso.prototype, "cod_instrutor", void 0);
__decorate([
    (0, Orm_1.belongsTo)(() => Instrutor_1.default, { foreignKey: 'cod_instrutor' }),
    __metadata("design:type", Object)
], Curso.prototype, "instrutor", void 0);
__decorate([
    (0, Orm_1.hasMany)(() => Modulo_1.default, { foreignKey: 'cod_curso' }),
    __metadata("design:type", Object)
], Curso.prototype, "modulos", void 0);
__decorate([
    (0, Orm_1.hasMany)(() => Matricula_1.default, { foreignKey: 'cod_curso' }),
    __metadata("design:type", Object)
], Curso.prototype, "matriculas", void 0);
exports.default = Curso;
//# sourceMappingURL=Curso.js.map