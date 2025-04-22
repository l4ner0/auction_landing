export default defineEventHandler(async (event) => {
  const { globalDomain } = useRuntimeConfig(event).public;
  try {
    const isLoggedIn = getCookie(event, "isLoggedIn");
    return {
      isLoggedIn: isLoggedIn === "true",
    };
  } catch (error: any) {
    throw createError({
      data: error.data,
    });
  }
});
