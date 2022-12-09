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
const Aula_1 = __importDefault(require("./Aula"));
const Opcao_1 = __importDefault(require("./Opcao"));
class Atividade extends Orm_1.BaseModel {
}
__decorate([
    (0, Orm_1.column)({ isPrimary: true }),
    __metadata("design:type", Number)
], Atividade.prototype, "id", void 0);
__decorate([
    (0, Orm_1.column)(),
    __metadata("design:type", String)
], Atividade.prototype, "pergunta", void 0);
__decorate([
    (0, Orm_1.column)(),
    __metadata("design:type", Number)
], Atividade.prototype, "sequencia", void 0);
__decorate([
    Orm_1.column.dateTime({ autoCreate: true }),
    __metadata("design:type", luxon_1.DateTime)
], Atividade.prototype, "criado_em", void 0);
__decorate([
    Orm_1.column.dateTime(),
    __metadata("design:type", luxon_1.DateTime)
], Atividade.prototype, "cancelado_em", void 0);
__decorate([
    (0, Orm_1.column)({ serializeAs: null }),
    __metadata("design:type", Number)
], Atividade.prototype, "cod_aula", void 0);
__decorate([
    (0, Orm_1.belongsTo)(() => Aula_1.default, { foreignKey: 'cod_aula' }),
    __metadata("design:type", Object)
], Atividade.prototype, "aula", void 0);
__decorate([
    (0, Orm_1.hasMany)(() => Opcao_1.default, { foreignKey: 'cod_atividade' }),
    __metadata("design:type", Object)
], Atividade.prototype, "opcoes", void 0);
exports.default = Atividade;
//# sourceMappingURL=Atividade.js.map