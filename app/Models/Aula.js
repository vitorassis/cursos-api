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
const Modulo_1 = __importDefault(require("./Modulo"));
const Atividade_1 = __importDefault(require("./Atividade"));
class Aula extends Orm_1.BaseModel {
}
__decorate([
    (0, Orm_1.column)({ isPrimary: true }),
    __metadata("design:type", Number)
], Aula.prototype, "id", void 0);
__decorate([
    (0, Orm_1.column)(),
    __metadata("design:type", String)
], Aula.prototype, "nome", void 0);
__decorate([
    (0, Orm_1.column)(),
    __metadata("design:type", String)
], Aula.prototype, "url_thumbnail", void 0);
__decorate([
    (0, Orm_1.column)(),
    __metadata("design:type", String)
], Aula.prototype, "url_video", void 0);
__decorate([
    (0, Orm_1.column)(),
    __metadata("design:type", String)
], Aula.prototype, "descricao", void 0);
__decorate([
    (0, Orm_1.column)(),
    __metadata("design:type", Number)
], Aula.prototype, "sequencia", void 0);
__decorate([
    Orm_1.column.dateTime({ autoCreate: true }),
    __metadata("design:type", luxon_1.DateTime)
], Aula.prototype, "criado_em", void 0);
__decorate([
    Orm_1.column.dateTime(),
    __metadata("design:type", luxon_1.DateTime)
], Aula.prototype, "cancelado_em", void 0);
__decorate([
    (0, Orm_1.column)({ serializeAs: null }),
    __metadata("design:type", Number)
], Aula.prototype, "cod_modulo", void 0);
__decorate([
    (0, Orm_1.belongsTo)(() => Modulo_1.default, { foreignKey: 'cod_modulo' }),
    __metadata("design:type", Object)
], Aula.prototype, "modulo", void 0);
__decorate([
    (0, Orm_1.hasMany)(() => Atividade_1.default, { foreignKey: 'cod_aula' }),
    __metadata("design:type", Object)
], Aula.prototype, "atividades", void 0);
exports.default = Aula;
//# sourceMappingURL=Aula.js.map