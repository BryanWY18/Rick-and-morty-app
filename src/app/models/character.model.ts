export interface Character {
  id: number;
  name: string;
  status: 'Alive' | 'Dead' | 'unknown';
  species: string;
  type: string;
  gender: 'Female' | 'Male' | 'Genderless' | 'unknown';
  origin: LocationRef;
  location: LocationRef;
  image: string;
  episode: string[];
  url: string;
  created: string;
}

export interface LocationRef {
  name: string;
  url: string;
}

export interface ApiInfo {
  count: number;
  pages: number;
  next: string | null;
  prev: string | null;
}

export interface CharacterListResponse {
  info: ApiInfo;
  results: Character[];
}

export interface CharacterFilters {
  name?: string;
  status?: 'Alive' | 'Dead' | 'unknown';
  species?: string;
  gender?: 'Female' | 'Male' | 'Genderless' | 'unknown';
}

export interface Episode {
  id: number;
  name: string;
  air_date: string;
  episode: string;
  url: string;
}