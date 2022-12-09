"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const Schema_1 = __importDefault(global[Symbol.for('ioc.use')]("Adonis/Lucid/Schema"));
class default_1 extends Schema_1.default {
    constructor() {
        super(...arguments);
        this.tableName = 'alunos';
    }
    async up() {
        this.schema.createTable(this.tableName, (table) => {
            table.increments('id').primary();
            table.integer('cod_usuario').unsigned().references('usuarios.id');
            table.timestamp('criado_em', { useTz: true });
            table.integer('criado_por').defaultTo(null).unsigned().references('administradors.id').onDelete('CASCADE');
            table.timestamp('cancelado_em', { useTz: true });
            table.integer('cancelado_por').defaultTo(null).unsigned().references('administradors.id').onDelete('CASCADE');
        });
    }
    async down() {
        this.schema.dropTable(this.tableName);
    }
}
exports.default = default_1;
//# sourceMappingURL=1670174596090_alunos.js.map