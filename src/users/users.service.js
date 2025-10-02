"use strict";
var __esDecorate = (this && this.__esDecorate) || function (ctor, descriptorIn, decorators, contextIn, initializers, extraInitializers) {
    function accept(f) { if (f !== void 0 && typeof f !== "function") throw new TypeError("Function expected"); return f; }
    var kind = contextIn.kind, key = kind === "getter" ? "get" : kind === "setter" ? "set" : "value";
    var target = !descriptorIn && ctor ? contextIn["static"] ? ctor : ctor.prototype : null;
    var descriptor = descriptorIn || (target ? Object.getOwnPropertyDescriptor(target, contextIn.name) : {});
    var _, done = false;
    for (var i = decorators.length - 1; i >= 0; i--) {
        var context = {};
        for (var p in contextIn) context[p] = p === "access" ? {} : contextIn[p];
        for (var p in contextIn.access) context.access[p] = contextIn.access[p];
        context.addInitializer = function (f) { if (done) throw new TypeError("Cannot add initializers after decoration has completed"); extraInitializers.push(accept(f || null)); };
        var result = (0, decorators[i])(kind === "accessor" ? { get: descriptor.get, set: descriptor.set } : descriptor[key], context);
        if (kind === "accessor") {
            if (result === void 0) continue;
            if (result === null || typeof result !== "object") throw new TypeError("Object expected");
            if (_ = accept(result.get)) descriptor.get = _;
            if (_ = accept(result.set)) descriptor.set = _;
            if (_ = accept(result.init)) initializers.unshift(_);
        }
        else if (_ = accept(result)) {
            if (kind === "field") initializers.unshift(_);
            else descriptor[key] = _;
        }
    }
    if (target) Object.defineProperty(target, contextIn.name, descriptor);
    done = true;
};
var __runInitializers = (this && this.__runInitializers) || function (thisArg, initializers, value) {
    var useValue = arguments.length > 2;
    for (var i = 0; i < initializers.length; i++) {
        value = useValue ? initializers[i].call(thisArg, value) : initializers[i].call(thisArg);
    }
    return useValue ? value : void 0;
};
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
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g = Object.create((typeof Iterator === "function" ? Iterator : Object).prototype);
    return g.next = verb(0), g["throw"] = verb(1), g["return"] = verb(2), typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
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
var __setFunctionName = (this && this.__setFunctionName) || function (f, name, prefix) {
    if (typeof name === "symbol") name = name.description ? "[".concat(name.description, "]") : "";
    return Object.defineProperty(f, "name", { configurable: true, value: prefix ? "".concat(prefix, " ", name) : name });
};
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UsersService = void 0;
var common_1 = require("@nestjs/common");
var bcrypt = require("bcrypt");
var sequelize_1 = require("sequelize");
var UsersService = function () {
    var _classDecorators = [(0, common_1.Injectable)()];
    var _classDescriptor;
    var _classExtraInitializers = [];
    var _classThis;
    var UsersService = _classThis = /** @class */ (function () {
        function UsersService_1(userModel, transactionModel) {
            this.userModel = userModel;
            this.transactionModel = transactionModel;
        }
        // Crear usuario
        UsersService_1.prototype.create = function (createUserDto) {
            return __awaiter(this, void 0, void 0, function () {
                var hashedPassword, accountNumber, user, _a, password, result, error_1;
                var _b;
                return __generator(this, function (_c) {
                    switch (_c.label) {
                        case 0:
                            _c.trys.push([0, 3, , 4]);
                            return [4 /*yield*/, bcrypt.hash(createUserDto.password, 10)];
                        case 1:
                            hashedPassword = _c.sent();
                            accountNumber = 'AC-' + Math.floor(1000000000 + Math.random() * 9000000000).toString();
                            return [4 /*yield*/, this.userModel.create({
                                    name: createUserDto.name,
                                    email: createUserDto.email,
                                    password: hashedPassword,
                                    account_number: accountNumber,
                                    balance: (_b = createUserDto.balance) !== null && _b !== void 0 ? _b : 0,
                                })];
                        case 2:
                            user = _c.sent();
                            _a = user.toJSON(), password = _a.password, result = __rest(_a, ["password"]);
                            result.balance = Number(result.balance).toFixed(2);
                            return [2 /*return*/, result];
                        case 3:
                            error_1 = _c.sent();
                            if (error_1 instanceof sequelize_1.UniqueConstraintError) {
                                throw new common_1.BadRequestException('El correo ya está registrado');
                            }
                            if (error_1 instanceof sequelize_1.ValidationError) {
                                throw new common_1.BadRequestException(error_1.errors.map(function (e) { return e.message; }).join(', '));
                            }
                            throw new common_1.InternalServerErrorException('Error al crear el usuario');
                        case 4: return [2 /*return*/];
                    }
                });
            });
        };
        // Obtener todos los usuarios
        UsersService_1.prototype.findAll = function () {
            return __awaiter(this, void 0, void 0, function () {
                var users;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0: return [4 /*yield*/, this.userModel.findAll()];
                        case 1:
                            users = _a.sent();
                            return [2 /*return*/, users.map(function (u) {
                                    var _a = u.toJSON(), password = _a.password, result = __rest(_a, ["password"]);
                                    result.balance = Number(result.balance).toFixed(2);
                                    return result;
                                })];
                    }
                });
            });
        };
        // Buscar usuario por email
        UsersService_1.prototype.findByEmail = function (email) {
            return __awaiter(this, void 0, void 0, function () {
                return __generator(this, function (_a) {
                    return [2 /*return*/, this.userModel.findOne({ where: { email: email } })];
                });
            });
        };
        // Buscar usuario por ID
        UsersService_1.prototype.findById = function (id) {
            return __awaiter(this, void 0, void 0, function () {
                var user, _a, password, result;
                return __generator(this, function (_b) {
                    switch (_b.label) {
                        case 0: return [4 /*yield*/, this.userModel.findByPk(id)];
                        case 1:
                            user = _b.sent();
                            if (!user)
                                throw new common_1.NotFoundException('Usuario no encontrado');
                            _a = user.toJSON(), password = _a.password, result = __rest(_a, ["password"]);
                            result.balance = Number(result.balance).toFixed(2);
                            return [2 /*return*/, result];
                    }
                });
            });
        };
        // Actualizar balance
        UsersService_1.prototype.updateBalance = function (userId, amount) {
            return __awaiter(this, void 0, void 0, function () {
                var user, _a, password, result;
                return __generator(this, function (_b) {
                    switch (_b.label) {
                        case 0: return [4 /*yield*/, this.userModel.findByPk(userId)];
                        case 1:
                            user = _b.sent();
                            if (!user)
                                throw new common_1.NotFoundException('Usuario no encontrado');
                            user.balance = amount;
                            return [4 /*yield*/, user.save()];
                        case 2:
                            _b.sent();
                            _a = user.toJSON(), password = _a.password, result = __rest(_a, ["password"]);
                            result.balance = Number(result.balance).toFixed(2);
                            return [2 /*return*/, result];
                    }
                });
            });
        };
        // Realizar transferencia
        UsersService_1.prototype.transfer = function (fromUserId, transferDto) {
            return __awaiter(this, void 0, void 0, function () {
                var fromUser, toUser, transaction, _a, _, from, _b, __, to;
                return __generator(this, function (_c) {
                    switch (_c.label) {
                        case 0:
                            if (fromUserId === transferDto.toUserId) {
                                throw new common_1.BadRequestException('No puedes transferirte dinero a ti mismo');
                            }
                            return [4 /*yield*/, this.userModel.findByPk(fromUserId)];
                        case 1:
                            fromUser = _c.sent();
                            if (!fromUser)
                                throw new common_1.NotFoundException('Usuario remitente no encontrado');
                            return [4 /*yield*/, this.userModel.findByPk(transferDto.toUserId)];
                        case 2:
                            toUser = _c.sent();
                            if (!toUser)
                                throw new common_1.NotFoundException('Usuario destinatario no encontrado');
                            if (Number(fromUser.balance) < transferDto.amount) {
                                throw new common_1.BadRequestException('Saldo insuficiente para realizar la transferencia');
                            }
                            // Actualizar balances
                            fromUser.balance = Number(fromUser.balance) - Number(transferDto.amount);
                            toUser.balance = Number(toUser.balance) + Number(transferDto.amount);
                            return [4 /*yield*/, fromUser.save()];
                        case 3:
                            _c.sent();
                            return [4 /*yield*/, toUser.save()];
                        case 4:
                            _c.sent();
                            return [4 /*yield*/, this.transactionModel.create({
                                    sender_id: fromUser.id,
                                    receiver_id: toUser.id,
                                    amount: transferDto.amount,
                                    description: "Transferencia de ".concat(fromUser.name, " a ").concat(toUser.name),
                                })];
                        case 5:
                            transaction = _c.sent();
                            _a = fromUser.toJSON(), _ = _a.password, from = __rest(_a, ["password"]);
                            _b = toUser.toJSON(), __ = _b.password, to = __rest(_b, ["password"]);
                            from.balance = Number(from.balance).toFixed(2);
                            to.balance = Number(to.balance).toFixed(2);
                            return [2 /*return*/, { from: from, to: to, transaction: transaction }];
                    }
                });
            });
        };
        // Obtener historial de transacciones
        UsersService_1.prototype.getTransactions = function (userId) {
            return __awaiter(this, void 0, void 0, function () {
                var transactions;
                var _a;
                return __generator(this, function (_b) {
                    switch (_b.label) {
                        case 0: return [4 /*yield*/, this.transactionModel.findAll({
                                where: (_a = {},
                                    _a[sequelize_1.Op.or] = [
                                        { sender_id: userId },
                                        { receiver_id: userId },
                                    ],
                                    _a),
                                order: [['createdAt', 'DESC']],
                            })];
                        case 1:
                            transactions = _b.sent();
                            return [2 /*return*/, transactions.map(function (t) { return ({
                                    id: t.id,
                                    sender_id: t.sender_id,
                                    receiver_id: t.receiver_id,
                                    amount: Number(t.amount).toFixed(2),
                                    description: t.description,
                                    date: t.createdAt,
                                    type: t.sender_id === userId ? 'sent' : 'received',
                                }); })];
                    }
                });
            });
        };
        return UsersService_1;
    }());
    __setFunctionName(_classThis, "UsersService");
    (function () {
        var _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
        __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
        UsersService = _classThis = _classDescriptor.value;
        if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
        __runInitializers(_classThis, _classExtraInitializers);
    })();
    return UsersService = _classThis;
}();
exports.UsersService = UsersService;
