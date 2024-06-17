import { expect, Page } from "@playwright/test";
import { Random } from "../utils/getRandomBook";
import { books } from "../data/books.data";
import { ElementSelector } from "../selectors/selectorsBooks";
import { ListBooksAlgebra, listBooksCalDif, listBooksCalInt, listBooksCalVec } from "../data/book-list.data";

export interface IOpenBooks {

    goto(): Promise<void>;
    fillBook(nameBook: string): Promise<void>;
    selectRandomBook(locator: string): Promise<void>;

}

export class OpenBooks implements IOpenBooks {

    private page: Page;
    private book: string;

    constructor(page: Page) {
        this.page = page;
        let random = new Random();
        let position = random.book();
        this.book = books[position];
    }

    async goto(): Promise<void> {
        await this.page.goto('https://books-pwakit.appspot.com/');
    }

    async fillBook(): Promise<void> {
        await this.page.fill(ElementSelector.findBook, this.book);
        await this.page.getByLabel('Search Books').press('Enter');
    }

    async selectRandomBook(): Promise<void> {
        let position = new Random().listBook();

        if(this.book == 'Calculo Diferencial'){

            const {title, desc, role}= listBooksCalDif[position];
            await this.page.getByRole('link', { name: `${role}` }).click();
            await expect(this.page.getByRole('heading', { name: `${title}` })).toHaveText(title);

        }else if (this.book == 'Calculo Integral'){

            const {title, desc, role}= listBooksCalInt[position];
            await this.page.getByRole('link', { name: `${role}` }).click();
            await expect(this.page.getByRole('heading', { name: `${title}` })).toHaveText(title);
            
        }else if (this.book == 'Calculo Vectorial'){  

            const {title, desc, role}= listBooksCalVec[position];
            await this.page.getByRole('link', { name: `${role}` }).click();
            await expect(this.page.getByRole('heading', { name: `${title}` })).toHaveText(title);
            
        }else{

            const {title, desc, role}= ListBooksAlgebra[position];
            await this.page.getByRole('link', { name: `${role}` }).click();
            await expect(this.page.getByRole('heading', { name: `${title}` })).toHaveText(title);
        }

        await this.page.waitForTimeout(6000);
    }

}
