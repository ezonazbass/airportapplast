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
Object.defineProperty(exports, "__esModule", { value: true });
exports.apiService = void 0;
var amadeus_1 = require("amadeus");
var react_native_1 = require("react-native");
// Amadeus API yapılandırması
var amadeus = new amadeus_1.default({
    clientId: '6SXvmiNhwlOJeBiayGwBumVVGlH2cR7A',
    clientSecret: 'RAmMrt3hSacGpPX4'
});
var ApiService = /** @class */ (function () {
    function ApiService() {
    }
    // Tüm şehirleri getir
    ApiService.prototype.getCities = function () {
        return __awaiter(this, void 0, void 0, function () {
            var response, error_1;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        return [4 /*yield*/, amadeus.referenceData.locations.get({
                                keyword: 'CITY',
                                subType: 'CITY'
                            })];
                    case 1:
                        response = _a.sent();
                        return [2 /*return*/, response.data.map(function (city) { return city.name; })];
                    case 2:
                        error_1 = _a.sent();
                        console.error('Şehirler alınırken hata oluştu:', error_1);
                        react_native_1.Alert.alert('Hata', 'Şehirler alınırken bir hata oluştu. Lütfen tekrar deneyin.');
                        return [2 /*return*/, []];
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    // Tüm havayollarını getir
    ApiService.prototype.getAirlines = function () {
        return __awaiter(this, void 0, void 0, function () {
            var response, error_2;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        return [4 /*yield*/, amadeus.referenceData.airlines.get()];
                    case 1:
                        response = _a.sent();
                        return [2 /*return*/, response.data.map(function (airline) { return airline.name; })];
                    case 2:
                        error_2 = _a.sent();
                        console.error('Havayolları alınırken hata oluştu:', error_2);
                        react_native_1.Alert.alert('Hata', 'Havayolları alınırken bir hata oluştu. Lütfen tekrar deneyin.');
                        return [2 /*return*/, []];
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    // Uçuşları arama
    ApiService.prototype.searchFlights = function (params) {
        return __awaiter(this, void 0, void 0, function () {
            var searchParams, response, error_3;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        searchParams = {
                            originLocationCode: params.from,
                            destinationLocationCode: params.to,
                            departureDate: params.departureDate,
                            adults: '1',
                            max: 10
                        };
                        if (params.isRoundTrip && params.returnDate) {
                            searchParams.returnDate = params.returnDate;
                        }
                        return [4 /*yield*/, amadeus.shopping.flightOffersSearch.get(searchParams)];
                    case 1:
                        response = _a.sent();
                        return [2 /*return*/, response.data.map(function (offer) {
                                var _a, _b;
                                return ({
                                    id: offer.id,
                                    from: offer.itineraries[0].segments[0].departure.iataCode,
                                    to: offer.itineraries[0].segments[0].arrival.iataCode,
                                    departureDate: offer.itineraries[0].segments[0].departure.at.split('T')[0],
                                    returnDate: params.isRoundTrip ? (_a = offer.itineraries[1]) === null || _a === void 0 ? void 0 : _a.segments[0].departure.at.split('T')[0] : '',
                                    departureTime: offer.itineraries[0].segments[0].departure.at.split('T')[1].substring(0, 5),
                                    returnTime: params.isRoundTrip ? (_b = offer.itineraries[1]) === null || _b === void 0 ? void 0 : _b.segments[0].departure.at.split('T')[1].substring(0, 5) : '',
                                    airline: offer.itineraries[0].segments[0].carrierCode,
                                    price: parseFloat(offer.price.total),
                                    currency: offer.price.currency,
                                    duration: offer.itineraries[0].duration,
                                    available: true
                                });
                            })];
                    case 2:
                        error_3 = _a.sent();
                        console.error('Uçuşlar aranırken hata oluştu:', error_3);
                        react_native_1.Alert.alert('Hata', 'Uçuşlar aranırken bir hata oluştu. Lütfen tekrar deneyin.');
                        return [2 /*return*/, []];
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    // Tek bir uçuş detayını getir
    ApiService.prototype.getFlightDetails = function (flightId) {
        return __awaiter(this, void 0, void 0, function () {
            var response, offer, error_4;
            var _a, _b;
            return __generator(this, function (_c) {
                switch (_c.label) {
                    case 0:
                        _c.trys.push([0, 2, , 3]);
                        return [4 /*yield*/, amadeus.shopping.flightOffersSearch.get({
                                id: flightId
                            })];
                    case 1:
                        response = _c.sent();
                        if (!response.data || response.data.length === 0) {
                            return [2 /*return*/, null];
                        }
                        offer = response.data[0];
                        return [2 /*return*/, {
                                id: offer.id,
                                from: offer.itineraries[0].segments[0].departure.iataCode,
                                to: offer.itineraries[0].segments[0].arrival.iataCode,
                                departureDate: offer.itineraries[0].segments[0].departure.at.split('T')[0],
                                returnDate: ((_a = offer.itineraries[1]) === null || _a === void 0 ? void 0 : _a.segments[0].departure.at.split('T')[0]) || '',
                                departureTime: offer.itineraries[0].segments[0].departure.at.split('T')[1].substring(0, 5),
                                returnTime: ((_b = offer.itineraries[1]) === null || _b === void 0 ? void 0 : _b.segments[0].departure.at.split('T')[1].substring(0, 5)) || '',
                                airline: offer.itineraries[0].segments[0].carrierCode,
                                price: parseFloat(offer.price.total),
                                currency: offer.price.currency,
                                duration: offer.itineraries[0].duration,
                                available: true
                            }];
                    case 2:
                        error_4 = _c.sent();
                        console.error('Uçuş detayları alınırken hata oluştu:', error_4);
                        react_native_1.Alert.alert('Hata', 'Uçuş detayları alınırken bir hata oluştu. Lütfen tekrar deneyin.');
                        return [2 /*return*/, null];
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    return ApiService;
}());
exports.apiService = new ApiService();
