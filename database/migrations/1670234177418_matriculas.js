"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const Schema_1 = __importDefault(global[Symbol.for('ioc.use')]("Adonis/Lucid/Schema"));
class default_1 extends Schema_1.default {
    constructor() {
        super(...arguments);
        this.tableName = 'matriculas';
    }
    async up() {
        this.schema.createTable(this.tableName, (table) => {
            table.increments('id').primary();
            table.integer('cod_curso').defaultTo(null).unsigned().references('cursos.id').onDelete('CASCADE');
            table.integer('cod_aluno').defaultTo(null).unsigned().references('alunos.id').onDelete('CASCADE');
            table.timestamp('criado_em', { useTz: true });
            table.integer('criado_por').defaultTo(null).unsigned().references('usuarios.id').onDelete('CASCADE');
            table.timestamp('cancelado_em', { useTz: true });
            table.integer('cancelado_por').defaultTo(null).unsigned().references('usuarios.id').onDelete('CASCADE');
        });
    }
    async down() {
        this.schema.dropTable(this.tableName);
    }
}
exports.default = default_1;
//# sourceMappingURL=1670234177418_matriculas.js.map