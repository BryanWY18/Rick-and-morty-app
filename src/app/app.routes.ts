import { Routes } from '@angular/router';

export const routes: Routes = [
 {
  path: '',
  loadComponent: () =>
    import('../app/pages/home/home').then(
      (c) => c.Home
    ),
  title: 'Rick and Morty App',
  },
  {
    path: 'characters',
    loadComponent: () =>
      import('../app/pages/character-list/character-list').then(
        (c) => c.CharacterList
      ),
    title: 'Personajes de Rick and Morty',
  },
  {
    path: 'character/:id',
    loadComponent: () =>
      import('../app/pages/character-detail/character-detail').then(
        (c) => c.CharacterDetail
      ),
    title: 'Detalle del Personaje',
  },
  {
    path: '**',
    redirectTo: '',
  },
  
];
