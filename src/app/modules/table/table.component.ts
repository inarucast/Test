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
      if (data.length > 0) {
        this.dataSource = data.sort((a: { id: number; }, b: { id: number; }) => a.id - b.id);
      }
    });
  }

  displayedColumns: string[] = ['id', 'name', 'gender', 'location', 'status'];

  ngOnInit(): void {
    this.dataSource = JSON.parse(localStorage.getItem('information')!).sort((a: { id: number; }, b: { id: number; }) => a.id - b.id);
  }

}
