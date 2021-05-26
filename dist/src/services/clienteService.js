"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteCliente = exports.getById = exports.getByCpf = exports.getAllCliente = exports.updadeCliente = exports.createCliente = void 0;
var connection_1 = __importDefault(require("./../database/connection"));
var tables_1 = __importDefault(require("../database/tables"));
function createCliente(cliente) {
    return __awaiter(this, void 0, void 0, function () {
        var trx, error_1;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _a.trys.push([0, 3, , 4]);
                    return [4 /*yield*/, connection_1.default.transaction()];
                case 1:
                    trx = _a.sent();
                    return [4 /*yield*/, trx(tables_1.default.CLIENTES).insert(cliente)];
                case 2:
                    _a.sent();
                    trx.commit();
                    return [3 /*break*/, 4];
                case 3:
                    error_1 = _a.sent();
                    console.log(error_1);
                    return [2 /*return*/, error_1];
                case 4: return [2 /*return*/];
            }
        });
    });
}
exports.createCliente = createCliente;
function updadeCliente(cliente) {
    return __awaiter(this, void 0, void 0, function () {
        var trx, error_2;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _a.trys.push([0, 3, , 4]);
                    return [4 /*yield*/, connection_1.default.transaction()];
                case 1:
                    trx = _a.sent();
                    return [4 /*yield*/, trx(tables_1.default.CLIENTES).where('idCliente', cliente.idCliente).update(cliente)];
                case 2:
                    _a.sent();
                    trx.commit();
                    return [3 /*break*/, 4];
                case 3:
                    error_2 = _a.sent();
                    console.log();
                    return [2 /*return*/, error_2];
                case 4: return [2 /*return*/];
            }
        });
    });
}
exports.updadeCliente = updadeCliente;
function getAllCliente() {
    return __awaiter(this, void 0, void 0, function () {
        var trx, data, error_3;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _a.trys.push([0, 3, , 4]);
                    return [4 /*yield*/, connection_1.default.transaction()];
                case 1:
                    trx = _a.sent();
                    return [4 /*yield*/, trx(tables_1.default.CLIENTES).select('*')];
                case 2:
                    data = _a.sent();
                    trx.commit();
                    return [2 /*return*/, data];
                case 3:
                    error_3 = _a.sent();
                    console.log(error_3);
                    return [2 /*return*/, error_3];
                case 4: return [2 /*return*/];
            }
        });
    });
}
exports.getAllCliente = getAllCliente;
function getByCpf(cpf) {
    return __awaiter(this, void 0, void 0, function () {
        var trx, data, error_4;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _a.trys.push([0, 3, , 4]);
                    return [4 /*yield*/, connection_1.default.transaction()];
                case 1:
                    trx = _a.sent();
                    return [4 /*yield*/, trx(tables_1.default.CLIENTES).where('cpf', cpf).select('*')];
                case 2:
                    data = _a.sent();
                    trx.commit();
                    return [2 /*return*/, data[0]];
                case 3:
                    error_4 = _a.sent();
                    console.log(error_4);
                    return [2 /*return*/, error_4];
                case 4: return [2 /*return*/];
            }
        });
    });
}
exports.getByCpf = getByCpf;
function getById(idCliente) {
    return __awaiter(this, void 0, void 0, function () {
        var trx, data, error_5;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _a.trys.push([0, 3, , 4]);
                    return [4 /*yield*/, connection_1.default.transaction()];
                case 1:
                    trx = _a.sent();
                    return [4 /*yield*/, trx(tables_1.default.CLIENTES).where('idCliente', idCliente).select('*')];
                case 2:
                    data = _a.sent();
                    trx.commit();
                    return [2 /*return*/, data[0]];
                case 3:
                    error_5 = _a.sent();
                    console.log(error_5);
                    return [2 /*return*/, error_5];
                case 4: return [2 /*return*/];
            }
        });
    });
}
exports.getById = getById;
function deleteCliente(idCliente) {
    return __awaiter(this, void 0, void 0, function () {
        var trx, error_6;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _a.trys.push([0, 3, , 4]);
                    return [4 /*yield*/, connection_1.default.transaction()];
                case 1:
                    trx = _a.sent();
                    return [4 /*yield*/, trx(tables_1.default.CLIENTES).where('idCliente', idCliente).delete()];
                case 2:
                    _a.sent();
                    trx.commit();
                    return [3 /*break*/, 4];
                case 3:
                    error_6 = _a.sent();
                    console.log(error_6);
                    return [2 /*return*/, error_6];
                case 4: return [2 /*return*/];
            }
        });
    });
}
exports.deleteCliente = deleteCliente;
