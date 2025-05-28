declare module 'amadeus' {
  export default class Amadeus {
    constructor(config: {
      clientId: string;
      clientSecret: string;
    });

    referenceData: {
      locations: {
        get(params: { keyword: string; subType: string }): Promise<any>;
      };
      airlines: {
        get(): Promise<any>;
      };
    };

    shopping: {
      flightOffersSearch: {
        get(params: any): Promise<any>;
      };
    };
  }
} 