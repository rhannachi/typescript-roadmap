export abstract class Dessert {
    private label?: string
    private price?: number;

    getLabel() {
        return this.label;
    }
    getPrice() {
        return this.price;
    }

    protected setLabel(label: string) {
        this.label = label;
    }
    protected setPrice(price: number) {
        this.price = price;
    }

    public Information() {
        return this.getLabel() + " : " + this.getPrice() + "€";
    }
}

