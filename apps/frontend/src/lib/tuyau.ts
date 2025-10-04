import { createTuyau, TuyauHTTPError } from "@tuyau/client";
import { api } from "@boilerplate/backend/api";
import { QueryClient } from "@tanstack/react-query";
import { createTuyauReactQueryClient } from "@tuyau/react-query";
import { toast } from "sonner";

export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      networkMode: "offlineFirst",
      staleTime: 1000 * 60 * 5,
      retry: false,
    },
    mutations: {
      onError: (error: unknown) => {
        if (error instanceof TuyauHTTPError) {
          toast.error("Une erreur est survenue", {
            description: (error.value as Error).message,
          });
        } else {
          toast.error("Une erreur est survenue");
        }
      },
    },
  },
});

export const client = createTuyau({
  api,
  baseUrl: import.meta.env.VITE_API_URL || "http://localhost:3333",
  credentials: "include",
});

export const tuyau = createTuyauReactQueryClient({ client, queryClient });