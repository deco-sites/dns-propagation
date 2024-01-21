const _getProducts = async (
  storeAccount: string,
): Promise<{ categories: string[] }[]> =>
  await fetch(
    `https://portal.vtexcommercestable.com.br/api/catalog_system/pub/products/search?an=${storeAccount}&O=OrderByTopSaleDESC`,
  ).then((res) => res.json());

type Data = {
  categories?: string[];
};
export const getMostSoldCategories = async (
  data: Data,
  storeAccount: string,
) => {
  const products = await _getProducts(storeAccount);
  const categories = products.flatMap(({ categories }) =>
    categories[0].split("/").filter(Boolean)
  );
  // Map <Category, Ocurrences>
  const categoryOccurrence = categories.reduce((occurrences, category) => {
    if (!occurrences[category]) {
      occurrences[category] = 0;
    }

    occurrences[category] += 1;

    return occurrences;
  }, {} as Record<string, number>);

  // Sort ocurrences
  data.categories = [...new Set(categories)].sort((categoryA, categoryB) =>
    categoryOccurrence[categoryA] - categoryOccurrence[categoryB]
  );
};
