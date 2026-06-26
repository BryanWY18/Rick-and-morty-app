import { Component, signal, inject, input, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';
import { RickMortyService } from '../../services/rick-morty-service';
import { Character, Episode } from '../../models/character.model';

@Component({
  selector: 'app-character-detail',
  imports: [RouterLink],
  templateUrl: './character-detail.html',
  styleUrl: './character-detail.css',
})
export class CharacterDetail implements OnInit {
  private rickMortyService = inject(RickMortyService);

  id = input.required<number>();

  character = signal<Character | null>(null);
  episodes = signal<Episode[]>([])
  loading = signal(false);
  error = signal<string | null>(null);

  ngOnInit(): void {
    this.loadCharacter(this.id());
  }

  loadCharacter(id: number): void {
    this.loading.set(true);
    this.error.set(null);
    this.episodes.set([]);

    this.rickMortyService.getCharacter(id).subscribe({
      next: (character) => {
        this.character.set(character);
        this.loadEpisodes(character.episode);
        this.loading.set(false);
      },
      error: () => {
        this.error.set('Error al cargar el personaje.');
        this.loading.set(false);
      },
    });
  }

  private loadEpisodes(urls: string[]): void {
    const ids = urls.map((url) => Number(url.split('/').pop()));
    this.rickMortyService.getEpisode(ids).subscribe({
      next: (episodes) => {
        this.episodes.set(episodes);
      },
      error: () => {
        this.episodes.set([]);
      }
    });
  }
  
}
