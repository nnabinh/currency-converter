// Need to use the React-specific entry point to import createApi
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export type ExchangeRates = {
  base_code: string;
  conversion_rates: {
    [key: string]: number;
  };
};

// Define a service using a base URL and expected endpoints
export const converterApi = createApi({
  reducerPath: 'converterApi',
  baseQuery: fetchBaseQuery({
    baseUrl: process.env.EXPO_PUBLIC_EXCHANGERATE_API,
  }),
  endpoints: (builder) => ({
    exchangeRates: builder.query<ExchangeRates, string>({
      query: (baseCurrency: string) => `latest/${baseCurrency}`,
    }),
  }),
});

// Export hooks for usage in functional components, which are
// auto-generated based on the defined endpoints
export const { useExchangeRatesQuery } = converterApi;
