import type { UseFetchOptions, FetchResult } from "nuxt/app";

export async function useLandingAPI<T>(
  endpoint: string | (() => string),
  options: Omit<UseFetchOptions<T>, "default"> & { default: () => T | Ref<T> },
  debug: boolean = false
) {
  const baseURL = useRuntimeConfig().public.apiUrl;

  console.log("Base URL:", baseURL);
  console.log(
    "Endpoint:",
    typeof endpoint === "function" ? endpoint() : endpoint
  );

  const fetch = await useFetch(`${baseURL}${endpoint}`, {
    ...options,
  });

  console.log(`-------------------------`);
  console.log(`fetch-url   : ${baseURL}${endpoint}`);
  console.log(`fetch-status: ${fetch.status.value}`);
  console.log(`fetch-data  : ${JSON.stringify(fetch.data.value, null, 2)}`);
  console.log(
    `fetch-data-error  : ${JSON.stringify(fetch.error.value, null, 2)}`
  );
  console.log(`-------------------------`);

  return fetch;
}
