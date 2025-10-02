"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        if (typeof b !== "function" && b !== null)
            throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
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
var __setFunctionName = (this && this.__setFunctionName) || function (f, name, prefix) {
    if (typeof name === "symbol") name = name.description ? "[".concat(name.description, "]") : "";
    return Object.defineProperty(f, "name", { configurable: true, value: prefix ? "".concat(prefix, " ", name) : name });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Transaction = void 0;
var sequelize_typescript_1 = require("sequelize-typescript");
var user_entity_1 = require("../../users/entities/user.entity");
var uuid_1 = require("uuid");
var Transaction = function () {
    var _classDecorators = [(0, sequelize_typescript_1.Table)({
            tableName: 'transactions',
            timestamps: true, // ✅ Sequelize creará createdAt y updatedAt
        })];
    var _classDescriptor;
    var _classExtraInitializers = [];
    var _classThis;
    var _classSuper = sequelize_typescript_1.Model;
    var _id_decorators;
    var _id_initializers = [];
    var _id_extraInitializers = [];
    var _sender_id_decorators;
    var _sender_id_initializers = [];
    var _sender_id_extraInitializers = [];
    var _receiver_id_decorators;
    var _receiver_id_initializers = [];
    var _receiver_id_extraInitializers = [];
    var _amount_decorators;
    var _amount_initializers = [];
    var _amount_extraInitializers = [];
    var _description_decorators;
    var _description_initializers = [];
    var _description_extraInitializers = [];
    var _sender_decorators;
    var _sender_initializers = [];
    var _sender_extraInitializers = [];
    var _receiver_decorators;
    var _receiver_initializers = [];
    var _receiver_extraInitializers = [];
    var Transaction = _classThis = /** @class */ (function (_super) {
        __extends(Transaction_1, _super);
        function Transaction_1() {
            var _this = _super !== null && _super.apply(this, arguments) || this;
            _this.id = __runInitializers(_this, _id_initializers, void 0);
            _this.sender_id = (__runInitializers(_this, _id_extraInitializers), __runInitializers(_this, _sender_id_initializers, void 0));
            _this.receiver_id = (__runInitializers(_this, _sender_id_extraInitializers), __runInitializers(_this, _receiver_id_initializers, void 0));
            _this.amount = (__runInitializers(_this, _receiver_id_extraInitializers), __runInitializers(_this, _amount_initializers, void 0));
            _this.description = (__runInitializers(_this, _amount_extraInitializers), __runInitializers(_this, _description_initializers, void 0));
            // Relaciones para traer datos de usuarios en el historial
            _this.sender = (__runInitializers(_this, _description_extraInitializers), __runInitializers(_this, _sender_initializers, void 0));
            _this.receiver = (__runInitializers(_this, _sender_extraInitializers), __runInitializers(_this, _receiver_initializers, void 0));
            __runInitializers(_this, _receiver_extraInitializers);
            return _this;
        }
        return Transaction_1;
    }(_classSuper));
    __setFunctionName(_classThis, "Transaction");
    (function () {
        var _a;
        var _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create((_a = _classSuper[Symbol.metadata]) !== null && _a !== void 0 ? _a : null) : void 0;
        _id_decorators = [sequelize_typescript_1.PrimaryKey, (0, sequelize_typescript_1.Default)(function () { return (0, uuid_1.v4)(); }), (0, sequelize_typescript_1.Column)({ type: sequelize_typescript_1.DataType.UUID })];
        _sender_id_decorators = [(0, sequelize_typescript_1.ForeignKey)(function () { return user_entity_1.User; }), (0, sequelize_typescript_1.Column)({ type: sequelize_typescript_1.DataType.UUID, allowNull: false })];
        _receiver_id_decorators = [(0, sequelize_typescript_1.ForeignKey)(function () { return user_entity_1.User; }), (0, sequelize_typescript_1.Column)({ type: sequelize_typescript_1.DataType.UUID, allowNull: false })];
        _amount_decorators = [(0, sequelize_typescript_1.Column)({ type: sequelize_typescript_1.DataType.DECIMAL(10, 2), allowNull: false })];
        _description_decorators = [(0, sequelize_typescript_1.Column)({ type: sequelize_typescript_1.DataType.STRING, allowNull: true })];
        _sender_decorators = [(0, sequelize_typescript_1.BelongsTo)(function () { return user_entity_1.User; }, 'sender_id')];
        _receiver_decorators = [(0, sequelize_typescript_1.BelongsTo)(function () { return user_entity_1.User; }, 'receiver_id')];
        __esDecorate(null, null, _id_decorators, { kind: "field", name: "id", static: false, private: false, access: { has: function (obj) { return "id" in obj; }, get: function (obj) { return obj.id; }, set: function (obj, value) { obj.id = value; } }, metadata: _metadata }, _id_initializers, _id_extraInitializers);
        __esDecorate(null, null, _sender_id_decorators, { kind: "field", name: "sender_id", static: false, private: false, access: { has: function (obj) { return "sender_id" in obj; }, get: function (obj) { return obj.sender_id; }, set: function (obj, value) { obj.sender_id = value; } }, metadata: _metadata }, _sender_id_initializers, _sender_id_extraInitializers);
        __esDecorate(null, null, _receiver_id_decorators, { kind: "field", name: "receiver_id", static: false, private: false, access: { has: function (obj) { return "receiver_id" in obj; }, get: function (obj) { return obj.receiver_id; }, set: function (obj, value) { obj.receiver_id = value; } }, metadata: _metadata }, _receiver_id_initializers, _receiver_id_extraInitializers);
        __esDecorate(null, null, _amount_decorators, { kind: "field", name: "amount", static: false, private: false, access: { has: function (obj) { return "amount" in obj; }, get: function (obj) { return obj.amount; }, set: function (obj, value) { obj.amount = value; } }, metadata: _metadata }, _amount_initializers, _amount_extraInitializers);
        __esDecorate(null, null, _description_decorators, { kind: "field", name: "description", static: false, private: false, access: { has: function (obj) { return "description" in obj; }, get: function (obj) { return obj.description; }, set: function (obj, value) { obj.description = value; } }, metadata: _metadata }, _description_initializers, _description_extraInitializers);
        __esDecorate(null, null, _sender_decorators, { kind: "field", name: "sender", static: false, private: false, access: { has: function (obj) { return "sender" in obj; }, get: function (obj) { return obj.sender; }, set: function (obj, value) { obj.sender = value; } }, metadata: _metadata }, _sender_initializers, _sender_extraInitializers);
        __esDecorate(null, null, _receiver_decorators, { kind: "field", name: "receiver", static: false, private: false, access: { has: function (obj) { return "receiver" in obj; }, get: function (obj) { return obj.receiver; }, set: function (obj, value) { obj.receiver = value; } }, metadata: _metadata }, _receiver_initializers, _receiver_extraInitializers);
        __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
        Transaction = _classThis = _classDescriptor.value;
        if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
        __runInitializers(_classThis, _classExtraInitializers);
    })();
    return Transaction = _classThis;
}();
exports.Transaction = Transaction;
