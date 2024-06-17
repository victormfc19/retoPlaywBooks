import { test } from '@playwright/test';
import { OpenBooks } from '../src/interface/books.interface';


test('Validar el titulo y la descripcion de un libro seleccionado de manera aleatoria en la pagina books pwakit', async ({ page }) => {

  const testbook = new OpenBooks(page);
  await testbook.goto();
  await testbook.fillBook();
  await testbook.selectRandomBook();

});
