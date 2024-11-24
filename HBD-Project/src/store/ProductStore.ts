interface Product {
    id: string;
    title: string;
    price: number;
    img: string;
    size: string[];
}

class ProductStore {
    private static instance: ProductStore;
    private products: Product[] = [];
    private filters: {
        size: string[];
        searchQuery: string;
    } = {
        size: [],
        searchQuery: '',
    };

    private constructor() {}

    public static getInstance(): ProductStore {
        if (!ProductStore.instance) {
            ProductStore.instance = new ProductStore();
        }
        return ProductStore.instance;
    }

    public setProducts(products: Product[]) {
        this.products = products;
    }

    public getProducts(): Product[] {
        return this.products.filter((product) => {
            // Filter by size
            if (this.filters.size.length > 0) {
                if (!product.size.some((s) => this.filters.size.includes(s))) {
                    return false;
                }
            }

            // Filter by search query
            if (this.filters.searchQuery) {
                return product.title
                    .toLowerCase()
                    .includes(this.filters.searchQuery.toLowerCase());
            }

            return true;
        });
    }

    public setSizeFilter(sizes: string[]) {
        this.filters.size = sizes;
    }

    public setSearchQuery(query: string) {
        this.filters.searchQuery = query;
    }

    public clearFilters() {
        this.filters = {
            size: [],
            searchQuery: '',
        };
    }
}

export const productStore = ProductStore.getInstance();
