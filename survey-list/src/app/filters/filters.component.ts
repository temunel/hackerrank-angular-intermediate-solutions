import {Component, OnInit, Input, Output, EventEmitter} from '@angular/core';

@Component({
  selector: 'filters',
  templateUrl: './filters.component.html',
  styleUrls: ['./filters.component.scss']
})

export class Filters implements OnInit {
  @Input() filterType: string;
  @Input() filterValues: string[];
  @Output() onFilterSelected: EventEmitter<string> = new EventEmitter<string>();
  selectedFilter: string = '';
  isSelected: boolean = false;

  ngOnInit() {

  }

  toggleFilter(filter: string): void {
    if(this.filterType === 'category') {
      this.isSelected = filter === this.selectedFilter ? false : true;
      this.selectedFilter = this.isSelected ? filter : 'All';
    }
    else {
      this.selectedFilter = filter;
    }
    this.onFilterSelected.emit(this.selectedFilter);
  }
}
