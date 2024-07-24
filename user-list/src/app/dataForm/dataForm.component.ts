import {Component, OnInit, EventEmitter, Input, Output} from '@angular/core';
import {Item} from "../../types/Item";

@Component({
  selector: 'data-form',
  templateUrl: './dataForm.component.html',
  styleUrls: ['./dataForm.component.scss']
})

export class DataForm implements OnInit {
  items: Item = {
    name: "",
    genre: "",
    creator: "",
    type: ""
  };
  checked = false;
  @Output() onItemAdded: EventEmitter<Item> = new EventEmitter<Item>();

  ngOnInit() {

  }

  addItem(event: any) {
    this.onItemAdded.emit(this.items);
    this.items = {
      name: "",
      genre: "",
      creator: "",
      type: ""
    };
    this.checked = false;
  }

  checkrad() {
    this.checked = true;
  }

}
