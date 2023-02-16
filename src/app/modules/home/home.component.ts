import {Component, OnInit} from '@angular/core';
import {RickMortyService} from "../../services/rick-morty.service";
import {Character, Episode, Location} from "../../models/rick.model";
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {MatSnackBar} from "@angular/material/snack-bar";

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  constructor(private rickService: RickMortyService, private snackbarService: MatSnackBar) {
  }

  activeCharacterControl = new FormControl('2', [Validators.required]);
  activeCharacter = '2';
  residentData: Character | undefined;
  characterData: Character | undefined;
  episodeData: Episode | undefined;
  locationData: Location | undefined;
  episodeInfo: string = '';

  dataForm = new FormGroup({
    id: new FormControl('', [Validators.required]),
    name: new FormControl('', [Validators.required]),
    status: new FormControl('', [Validators.required]),
    species: new FormControl('', [Validators.required]),
    gender: new FormControl('', [Validators.required]),
    location: new FormControl('', [Validators.required]),
    locationName: new FormControl('', [Validators.required]),
    locationType: new FormControl('', [Validators.required]),
    locationDimension: new FormControl('', [Validators.required]),
    residentName: new FormControl('', [Validators.required]),
    residentSpecies: new FormControl('', [Validators.required]),
    residentStatus: new FormControl('', [Validators.required]),
    episodeName: new FormControl('', [Validators.required]),
  });

  ngOnInit(): void {
    this.getCharacter('character');

    this.activeCharacterControl.valueChanges.subscribe(value => {
      if (value) {
        this.activeCharacter = value;
        this.getCharacter('character');
      }
    });
  }

  getCharacter(type: string) {
    this.rickService.getCharacter(type, this.activeCharacter).subscribe({
      next: (res) => {
        if (type === 'character') {
          this.characterData = res;
        } else {
          this.residentData = res;
        }
      }, error: (error) => {
        this.snackbarService.open(error.error.error, '', {duration: 2000});
      }, complete: () => {
        if (this.characterData) {
          if (type === 'character') {
            this.getLocation();
            this.dataForm.patchValue({
              id: this.characterData.id,
              name: this.characterData.name,
              status: this.characterData.status,
              species: this.characterData.species,
              gender: this.characterData.gender,
              location: this.characterData.location.name
            });

            if (this.characterData.episode?.length > 0) {
              const episodeCount = this.characterData.episode.length;
              const randomIndex = this.getRandomInt(episodeCount);
              this.episodeInfo = this.characterData.episode.filter((episode, index) => (index === randomIndex))[0];
              this.getEpisode();
            }
          } else {
            if (this.residentData) {
              this.dataForm.patchValue({
                residentName: this.residentData?.name,
                residentSpecies: this.residentData?.species,
                residentStatus: this.residentData?.status
              });
            }
          }
        }
      }
    })
  }

  getLocation() {
    if (this.characterData) {
      this.rickService.getLocation(this.characterData.location.url).subscribe({
        next: (res) => {
          this.locationData = res
        }, error: (error) => {
          this.snackbarService.open(error.error.error, '', {duration: 2000});
        }, complete: () => {
          if (this.locationData) {
            this.dataForm.patchValue({
              locationName: this.locationData.name,
              locationType: this.locationData.type,
              locationDimension: this.locationData.dimension
            });
            this.activeCharacter = this.locationData.residents[0];
            this.getCharacter('resident');
          }
        }
      })
    }
  }

  getEpisode() {
    if (this.episodeInfo) {
      this.rickService.getEpisode(this.episodeInfo).subscribe({
        next: (res) => {
          this.episodeData = res
        }, error: (error) => {
          this.snackbarService.open(error.error.error, '', {duration: 2000});
        }, complete: () => {
          if (this.episodeData) {
            this.dataForm.patchValue({
              episodeName: this.episodeData.name
            });
          }
        }
      })
    }
  }


  getRandomInt(max: number) {
    return Math.floor(Math.random() * max);
  }

  onSubmit() {
    if (!localStorage.getItem('information')) {
      localStorage.setItem('information', JSON.stringify([this.dataForm.value]));
      this.rickService.setCurrentDataSate(this.dataForm.value);
      this.snackbarService.open('Information Guardada', '', {duration: 2000});
    } else {
      const data = JSON.parse(localStorage.getItem('information')!);
      const alreadyExist = data.filter((info: { id: string | null; }) => info.id == this.activeCharacterControl.value);
      if (alreadyExist.length > 0) {
        const i = data.findIndex((data: { id: string | null; }) => data.id == this.activeCharacterControl.value);
        data.splice(i, 1);
        data.push(this.dataForm.value)
        localStorage.setItem('information', JSON.stringify(data));
        this.rickService.setCurrentDataSate(data);
        this.snackbarService.open('Information actualizada', '', {duration: 2000});
      } else {
        data.push(this.dataForm.value);
        localStorage.setItem('information', JSON.stringify(data));
        this.rickService.setCurrentDataSate(data);
        this.snackbarService.open('Information Guardada', '', {duration: 2000});
      }
    }
  }

}
