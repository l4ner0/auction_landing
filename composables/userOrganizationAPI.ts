export function useApiOrganization() {
  const BASE_ORG_URL = "/organization-management";

  const viewOrganizationIdAndNameList = async () => {
    const { status, error, data }: any = await useLandingAPI(
      `${BASE_ORG_URL}/view-organization-id-and-name-list`,
      {
        method: "GET",
      } as any,
    );
    return { status, error, data };
  };

  return {
    viewOrganizationIdAndNameList,
  };
}
