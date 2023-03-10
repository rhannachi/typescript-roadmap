/**
 * Generic Classes
 */

class DataStorage<T extends string | number | boolean> {
    private data: T[] = [];

    addItem(item: T) {
        this.data.push(item);
    }

    removeItem(item: T) {
        if (this.data.indexOf(item) === -1) {
            return;
        }
        this.data.splice(this.data.indexOf(item), 1); // -1
    }

    getItems() {
        return [...this.data];
    }
}

const textStorage = new DataStorage<string>();
textStorage.addItem('Max');
textStorage.addItem('Manu');
textStorage.removeItem('Max');

// const textStorage = new DataStorage<number>();
// textStorage.addItem(44);
// textStorage.addItem(3);
// textStorage.removeItem(99);

console.log('example 4');
console.log(textStorage.getItems());
console.log();

