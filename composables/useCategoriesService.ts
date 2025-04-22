export function useCategoryManagementService() {
  const BASE_ORG_URL = "/offer-management";

  const viewCategories = async () => {
    const fetch = await useLandingAPI<{ id: string; name: string }[]>(
      `${BASE_ORG_URL}/view-categories`,
      {
        method: "GET",
      },
    );
    return fetch;
  };

  const viewSubCategories = async (categoryId: string) => {
    const fetch = await useLandingAPI<{ id: string; name: string }[]>(
      `${BASE_ORG_URL}/view-sub-categories`,
      {
        method: "GET",
        query: {
          categoryId,
        },
      },
    );
    return fetch;
  };

  return {
    viewCategories,
    viewSubCategories,
  };
}
