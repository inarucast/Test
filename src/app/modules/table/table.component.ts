import {Component, OnInit} from '@angular/core';
import {MatTableDataSource} from "@angular/material/table";
import {RickMortyService} from "../../services/rick-morty.service";

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.scss']
})
export class TableComponent implements OnInit {

  dataSource = new MatTableDataSource();

  constructor(private rickService: RickMortyService) {
    this.rickService.getCurrentDataState().subscribe(data => {
      if (data) {
        this.dataSource = data.sort(function (a: { id: number; name: string; }, b: { id: number; name: any; }) {
          return a.id - b.id || a.name.localeCompare(b.name);
        });
      }
    });
  }

  displayedColumns: string[] = ['id', 'name', 'gender', 'location', 'status'];

  ngOnInit(): void {
    this.dataSource = JSON.parse(localStorage.getItem('information')!).sort(function (a: { id: number; name: string; }, b: { id: number; name: any; }) {
      return a.id - b.id || a.name.localeCompare(b.name);
    });
  }

}
