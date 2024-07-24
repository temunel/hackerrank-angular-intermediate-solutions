import {Component, OnInit} from '@angular/core';
import {Survey} from "../types/Survey";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {

  statuses: string[] = ['All', 'Active', 'Completed'];
  categories: string[] = ['Development', 'Workplace', 'Hardware'];
  filteredList: Survey[];

  status = 'status';
  category = 'category';

  selectedStatus = 'All';
  selectedCategory = 'All';

  surveyList: Survey[] = [
    {
      title: "Designer Survey",
      category: "Workplace",
      status: "Active",
      label: "New Framework",
    },
    {
      title: "Developer Survey",
      category: "Development",
      status: "Active",
      label: "Education",
    },
    {
      title: "Backend Survey",
      category: "Hardware",
      status: "Completed",
      label: "Personal",
    }
  ];

  ngOnInit() {
    this.applyFilter();
  }

  onFilterSelected(filter: string, type: string) {
    type === 'status' ? this.selectedStatus = filter : this.selectedCategory = filter;
    this.applyFilter();
  }

  applyFilter() {
    this.filteredList = this.surveyList.filter(survey => {
      const isStatusMatch = this.selectedStatus === 'All' || survey.status === this.selectedStatus;
      const isCategoryMatch = this.selectedCategory === 'All' || survey.category === this.selectedCategory;

      return isStatusMatch && isCategoryMatch;
    })
  }
}
