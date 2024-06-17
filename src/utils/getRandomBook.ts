export class Random {

    book(): number {
        return Math.floor(Math.random() * 4);
    }

    listBook(): number {
        return Math.floor(Math.random() * 20);
    }

}