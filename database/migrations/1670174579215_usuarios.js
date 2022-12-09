"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const Schema_1 = __importDefault(global[Symbol.for('ioc.use')]("Adonis/Lucid/Schema"));
class default_1 extends Schema_1.default {
    constructor() {
        super(...arguments);
        this.tableName = 'usuarios';
    }
    async up() {
        this.schema.createTable(this.tableName, (table) => {
            table.increments('id').primary();
            table.string('nome', 100).notNullable();
            table.string('email', 100).notNullable().unique();
            table.string('telefone', 13);
            table.string('senha', 60).notNullable();
            table.string('img_url');
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
//# sourceMappingURL=1670174579215_usuarios.js.map