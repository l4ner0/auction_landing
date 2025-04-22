
export function useOfferAPI() {
  const page = ref(1);
  const sortOptions = ref("[]");
  const onSort = (sortObject: { [key: string]: string }[]) => {
    sortOptions.value = JSON.stringify(sortObject);
  };
  
  return { 
    page,
    sortOptions,
    onSort,
  };
}
