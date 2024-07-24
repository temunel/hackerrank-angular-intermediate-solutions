import {Component} from '@angular/core';
import {Item} from "../types/Item";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {

  Book: Item[] = [];
  Song: Item[] = [];

  constructor() {

  }

  ngOnInit() {

  }

  onItemAdded(item) {
    item.type === 'Song' ? this.Song.push(item) : this.Book.push(item);
  }

  onItemDelete(item) {

  }
}
