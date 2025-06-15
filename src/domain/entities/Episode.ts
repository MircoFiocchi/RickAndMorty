export default class Episode {
  id!: number;
  name!: string;
  air_date!: string;
  episode!: string;
  characters!: string[];
  url!: string;
  created!: string;

  constructor(character: Episode) {
    Object.assign(this, character);
  }
}
