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
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthController = void 0;
const common_1 = require("@nestjs/common");
const passport_1 = require("@nestjs/passport");
const auth_service_1 = require("./auth.service");
const user_create_dto_1 = require("../dto/user-create.dto");
const cookies_utils_1 = require("../utils/cookies.utils");
let AuthController = class AuthController {
    authService;
    constructor(authService) {
        this.authService = authService;
    }
    async register(dto, res) {
        const result = await this.authService.register(dto);
        res.cookie(cookies_utils_1.COOKIE_CONFIG.refreshToken.name, result.refresh_token, cookies_utils_1.COOKIE_CONFIG.refreshToken.options);
        const { refresh_token, ...response } = result;
        return response;
    }
    async login(req, res) {
        const result = await this.authService.login(req.user);
        res.cookie(cookies_utils_1.COOKIE_CONFIG.refreshToken.name, result.refresh_token, cookies_utils_1.COOKIE_CONFIG.refreshToken.options);
        const { refresh_token, ...response } = result;
        return response;
    }
    async refresh(req, res) {
        const refreshToken = (0, cookies_utils_1.getCookieValue)(req, cookies_utils_1.COOKIE_CONFIG.refreshToken.name);
        if (!refreshToken) {
            return res.status(401).json({ message: 'Refresh token не найден' });
        }
        const tokens = await this.authService.refreshTokens(refreshToken);
        res.cookie(cookies_utils_1.COOKIE_CONFIG.refreshToken.name, tokens.refresh_token, cookies_utils_1.COOKIE_CONFIG.refreshToken.options);
        return {
            access_token: tokens.access_token,
        };
    }
    logout(res) {
        (0, cookies_utils_1.clearRefreshTokenCookie)(res);
        return { message: 'Успешный выход' };
    }
    getProfile(req) {
        return {
            name: req.user.name,
            email: req.user.email,
            desc: req.user.desc || '',
        };
    }
};
exports.AuthController = AuthController;
__decorate([
    (0, common_1.HttpCode)(201),
    (0, common_1.Post)('register'),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, common_1.Res)({ passthrough: true })),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [user_create_dto_1.CreateUserDto, Object]),
    __metadata("design:returntype", Promise)
], AuthController.prototype, "register", null);
__decorate([
    (0, common_1.UseGuards)((0, passport_1.AuthGuard)('local')),
    (0, common_1.Post)('login'),
    __param(0, (0, common_1.Request)()),
    __param(1, (0, common_1.Res)({ passthrough: true })),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], AuthController.prototype, "login", null);
__decorate([
    (0, common_1.Post)('refresh'),
    (0, common_1.HttpCode)(200),
    __param(0, (0, common_1.Request)()),
    __param(1, (0, common_1.Res)({ passthrough: true })),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], AuthController.prototype, "refresh", null);
__decorate([
    (0, common_1.Post)('logout'),
    (0, common_1.HttpCode)(200),
    __param(0, (0, common_1.Res)({ passthrough: true })),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], AuthController.prototype, "logout", null);
__decorate([
    (0, common_1.UseGuards)((0, passport_1.AuthGuard)('jwt')),
    (0, common_1.Post)('profile'),
    __param(0, (0, common_1.Request)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Object)
], AuthController.prototype, "getProfile", null);
exports.AuthController = AuthController = __decorate([
    (0, common_1.Controller)('auth'),
    __metadata("design:paramtypes", [auth_service_1.AuthService])
], AuthController);
//# sourceMappingURL=auth.controller.js.map