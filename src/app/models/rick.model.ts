export interface Character {
  id: string;
  name: string;
  status: string;
  species: string;
  type: string;
  gender: string;
  origin: Catalog;
  location: Catalog;
  image: string;
  episode: string[]
}

export interface Catalog {
  name: string;
  url: string;
}

export interface Location {
  id: string;
  name: string;
  type: string;
  dimension: string;
  residents: string[];
}

export interface Episode {
  name: string;
  air_date: string;
  episode: string;
}
