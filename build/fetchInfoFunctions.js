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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.checkIfSantiParoLaQueue = exports.countEmFiltered = exports.countEmAll = exports.getMyTokenPrice = void 0;
const axios_1 = __importDefault(require("axios"));
const config_1 = require("./config");
const getMyTokenPrice = (URL, address) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const res = yield axios_1.default.get(URL);
        return res.data[address];
    }
    catch (err) {
        console.log(err);
    }
});
exports.getMyTokenPrice = getMyTokenPrice;
const countEmAll = (skip, limit) => __awaiter(void 0, void 0, void 0, function* () {
    const res = yield axios_1.default({
        url: config_1.pohAPI_URL,
        method: 'post',
        data: {
            query: `
            query {
                submissions(
                    first: ${limit}
                    skip: ${skip}
                    orderBy: creationTime
                    orderDirection: desc
                ) {
                    id
                }
              }
            `
        }
    });
    if (res.data.data.submissions.length >= limit) {
        return res.data.data.submissions.length + (yield countEmAll(skip + limit, limit));
    }
    else {
        return res.data.data.submissions.length;
    }
});
exports.countEmAll = countEmAll;
const countEmFiltered = (skip, limit, filter) => __awaiter(void 0, void 0, void 0, function* () {
    const response = yield axios_1.default({
        url: config_1.pohAPI_URL,
        method: 'post',
        data: {
            query: `
            query {
                submissions(
                    first: ${limit}
                    skip: ${skip}
                    orderBy: creationTime
                    orderDirection: desc
                    where: ${filter}
                ) {
                    id
                }
              }
            `
        }
    });
    if (response.data.data.submissions.length >= limit) {
        return response.data.data.submissions.length + (yield countEmFiltered(skip + limit, limit, filter));
    }
    else {
        return response.data.data.submissions.length;
    }
});
exports.countEmFiltered = countEmFiltered;
const checkIfSantiParoLaQueue = (skip, limit) => __awaiter(void 0, void 0, void 0, function* () {
    const response = yield axios_1.default({
        url: config_1.pohAPI_URL,
        method: 'post',
        data: {
            query: `
            query {
                submission(id:"0x2a52309edf998799c4a8b89324ccad91848c8676"){
                    disputed
                    vouchees(where:{disputed: true}) {
                        id
                        status
                        name
                    } 
                    }
              }
            `
        }
    });
    if (response.data.data.submission.disputed === true) {
        return 'Santi metio la pata';
    }
    else {
        if (response.data.data.submission.vouchees.length > 0) {
            return `${response.data.data.submission.vouchees[0].name} metió la pata`;
        }
    }
    if (response.data.data.submission.vouchees.length >= limit) {
        return yield checkIfSantiParoLaQueue(skip + limit, limit);
    }
    else {
        return 'Por hoy todo bien';
    }
});
exports.checkIfSantiParoLaQueue = checkIfSantiParoLaQueue;
//# sourceMappingURL=fetchInfoFunctions.js.map