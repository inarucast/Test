import {Component, OnInit} from '@angular/core';
import {MatTableDataSource} from "@angular/material/table";

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.scss']
})
export class TableComponent implements OnInit {

  constructor() {
  }

  displayedColumns: string[] = ['name'];
  dataSource = new MatTableDataSource(JSON.parse(localStorage.getItem('information')!));

  ngOnInit(): void {
  }

}
