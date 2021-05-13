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
const graphql_request_1 = require("graphql-request");
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
    const query = graphql_request_1.gql `
        {
            submissions(
                first: ${limit}
                skip: ${skip}
                orderBy: creationTime
                orderDirection: desc
            ) {
                id
            }
        }
    `;
    const response = yield graphql_request_1.request(config_1.pohAPI_URL, query);
    if (response.submissions.length >= limit) {
        return response.submissions.length + (yield countEmAll(skip + limit, limit));
    }
    else {
        return response.submissions.length;
    }
});
exports.countEmAll = countEmAll;
const countEmFiltered = (skip, limit, filter) => __awaiter(void 0, void 0, void 0, function* () {
    const query = graphql_request_1.gql `
        {
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
    `;
    const response = yield graphql_request_1.request(config_1.pohAPI_URL, query);
    if (response.submissions.length >= limit) {
        return response.submissions.length + (yield countEmFiltered(skip + limit, limit, filter));
    }
    else {
        return response.submissions.length;
    }
});
exports.countEmFiltered = countEmFiltered;
const checkIfSantiParoLaQueue = (skip, limit) => __awaiter(void 0, void 0, void 0, function* () {
    const query = graphql_request_1.gql `
        {
            submission(id:"0x2a52309edf998799c4a8b89324ccad91848c8676"){
            disputed
            vouchees(where:{disputed: true}) {
                id
                status
                name
            } 
            }
        }
    `;
    const response = yield graphql_request_1.request(config_1.pohAPI_URL, query);
    if (response.submission.disputed === true) {
        return 'Santi metio la pata';
    }
    else {
        if (response.submission.vouchees.length > 0) {
            return `${response.submission.vouchees[0].name} metió la pata`;
        }
    }
    if (response.submission.vouchees.length >= limit) {
        return yield checkIfSantiParoLaQueue(skip + limit, limit);
    }
    else {
        return 'Por hoy todo bien';
    }
});
exports.checkIfSantiParoLaQueue = checkIfSantiParoLaQueue;
//# sourceMappingURL=fetchInfoFunctions.js.map