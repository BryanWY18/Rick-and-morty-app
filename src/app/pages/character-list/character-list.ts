import { Component, signal, inject, OnInit, viewChild, ElementRef } from '@angular/core';
import { RouterLink } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { RickMortyService } from '../../services/rick-morty-service';
import { Character, ApiInfo, CharacterFilters } from '../../models/character.model';

@Component({
  selector: 'app-character-list',
  imports: [RouterLink, FormsModule],
  templateUrl: './character-list.html',
  styleUrl: './character-list.css',
})
export class CharacterList implements OnInit {
  private rickMortyService = inject(RickMortyService);

  characters = signal<Character[]>([])
  info = signal<ApiInfo | null>(null); 
  error = signal<string | null>(null);
  currentPage = signal(1);
  loading = signal(false);

  searchName = signal('');
  searchStatus = signal('');
  searchSpecies = signal('');

  alertDialog = viewChild<ElementRef<HTMLDialogElement>>('alertDialog');

  ngOnInit(): void {
    this.loadCharacters(1);
  }

  loadCharacters(page: number): void {
    this.loading.set(true);
    this.error.set(null);

    const filters: CharacterFilters = {
      name: this.searchName() || undefined,
      status: this.searchStatus() as CharacterFilters['status'] || undefined,
      species: this.searchSpecies() || undefined
    };

    this.rickMortyService.getCharacters(page, filters).subscribe({
      next: (response) => {
        this.characters.set(response.results);
        this.info.set(response.info);
        this.currentPage.set(page);
        this.loading.set(false);
      },
      error: () => {
        this.characters.set([]);
        this.info.set(null);
        this.loading.set(false);
      }
    });
  }

  applyFilters(): void {
    if (!this.searchName() && !this.searchStatus() && !this.searchSpecies()) {
      this.alertDialog()?.nativeElement.showModal();
      return;
    }
    this.loadCharacters(1);
  }

  closeAlert(): void {
    this.alertDialog()?.nativeElement.close();
  }

  clearFilters(): void {
    this.searchName.set('');
    this.searchStatus.set('');
    this.searchSpecies.set('');
    this.loadCharacters(1);
  }

  nextPage(): void {
    if (this.info()?.next)
      this.loadCharacters(this.currentPage() + 1);
    }

  prevPage(): void {
    if (this.info()?.prev) 
      this.loadCharacters(this.currentPage() - 1);
    }

}
