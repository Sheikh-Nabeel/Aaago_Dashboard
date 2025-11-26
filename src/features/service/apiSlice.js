
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
const API_BASE_URL = import.meta.env?.VITE_API_BASE_URL || "http://localhost:3001/api";

export const apiSlice = createApi({
  reducerPath: "api",
  baseQuery: fetchBaseQuery({
    baseUrl: API_BASE_URL,
    prepareHeaders: (headers, { getState }) => {
      const token = getState().auth.token;
      if (token) {
        headers.set("Authorization", `Bearer ${token}`);
      } else {
        console.log('No token found in Redux state');
      }
      return headers;
    },
  }),
  tagTypes: ["PendingKYCs", "User"],
  endpoints: (builder) => ({
    loginUser: builder.mutation({
      query: (credentials) => ({
        url: "/user/login",
        method: "POST",
        body: credentials,
      }),
    }),
    getPendingKYCs: builder.query({
      query: () => ({
        url: "/user/pending-kycs",
        method: "GET",
      }),
      providesTags: ["PendingKYCs"],
    }),
    approveKyc: builder.mutation({
      query: ({ userId }) => ({
        url: "/user/approve-kyc",
        method: "POST",
        body: { userId },
      }),
      invalidatesTags: ["PendingKYCs"],
    }),
    rejectKyc: builder.mutation({
      query: ({ userId, reason }) => ({
        url: "/user/reject-kyc",
        method: "POST",
        body: { userId, reason },
      }),
      invalidatesTags: ["PendingKYCs"],
    }),
    getCurrentUser: builder.query({
      query: () => ({
        url: "/drivers/get-current-user",
        method: "GET",
      }),
      providesTags: ["User"],
      transformResponse: (response) => {
        console.log('getCurrentUser Response:', response);
        return response;
      },
    }),
    getPendingApprovalsEarnings: builder.query({
      query: () => ({
        url: `/mlm/pending-approvals-earnings/`,
        method: "GET",
      }),
      providesTags: ["PendingKYCs", "User"],
      transformResponse: (response) => {
        console.log('getPendingApprovalsEarnings Response:', response);
        return response?.data || response;
      },
    }),
    getVehicleSelectFlow: builder.query({
      query: () => ({
        url: "/vehicles/select-flow",
        method: "GET",
      }),
      transformResponse: (response) => response?.flow || response?.data?.flow || response,
    }),
    getComprehensivePricing: builder.query({
      query: ({ category, service, subService }) => ({
        url: "/admin/comprehensive-pricing",
        method: "GET",
        params: {
          ...(category ? { category } : {}),
          ...(service ? { service } : {}),
          ...(subService ? { subService } : {}),
        },
      }),
      transformResponse: (response) => response?.data || response,
    }),
    updateComprehensivePricing: builder.mutation({
      query: ({ category, service, subService, body }) => ({
        url: "/admin/comprehensive-pricing",
        method: "PUT",
        params: {
          ...(category ? { category } : {}),
          ...(service ? { service } : {}),
          ...(subService ? { subService } : {}),
        },
        body,
      }),
      transformResponse: (response) => response?.data || response,
    }),
    getWalletOverview: builder.query({
      query: () => ({
        url: "/wallet/admin/overview",
        method: "GET",
      }),
      transformResponse: (response) => response?.data || response,
    }),
  }),
});

export const { 
  useLoginUserMutation, 
  useGetPendingKYCsQuery, 
  useApproveKycMutation, 
  useRejectKycMutation,
  useGetCurrentUserQuery,
  useGetPendingApprovalsEarningsQuery,
  useGetVehicleSelectFlowQuery,
  useLazyGetComprehensivePricingQuery,
  useUpdateComprehensivePricingMutation,
  useGetWalletOverviewQuery
} = apiSlice;
