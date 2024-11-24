interface CartItem {
    id: string;
    title: string;
    price: number;
    img: string;
    size: string;
    quantity: number;
}

class CartStore {
    private static instance: CartStore;
    private items: CartItem[] = [];

    private constructor() {}

    public static getInstance(): CartStore {
        if (!CartStore.instance) {
            CartStore.instance = new CartStore();
        }
        return CartStore.instance;
    }

    public addItem(item: CartItem) {
        const existingItem = this.items.find(
            (i) => i.id === item.id && i.size === item.size
        );

        if (existingItem) {
            existingItem.quantity += item.quantity;
        } else {
            this.items.push(item);
        }
    }

    public removeItem(id: string, size: string) {
        this.items = this.items.filter(
            (item) => !(item.id === id && item.size === size)
        );
    }

    public updateQuantity(id: string, size: string, quantity: number) {
        const item = this.items.find(
            (i) => i.id === id && i.size === size
        );
        if (item) {
            item.quantity = quantity;
        }
    }

    public getItems(): CartItem[] {
        return this.items;
    }

    public getTotalPrice(): number {
        return this.items.reduce((total, item) => total + item.price * item.quantity, 0);
    }

    public getItemCount(): number {
        return this.items.reduce((total, item) => total + item.quantity, 0);
    }
}

export const cartStore = CartStore.getInstance();
