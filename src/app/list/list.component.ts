import { Component, OnInit, Input, EventEmitter, Output } from "@angular/core";
import { SlotService } from "../slot.service";

import { trigger, transition, animate, style } from "@angular/animations";

export interface Slot {
  carNumber: string;
  carColor: string;
  slotNumber: number;
  dateTaken: Date;
}
// cubic-bezier(.29,-0.33,.81,1.45)

@Component({
  selector: "app-list",
  templateUrl: "./list.component.html",
  styleUrls: ["./list.component.css"],
  animations: [
    trigger("slideInOut", [
      transition(":leave", [
        style({ height: "*", opacity: 1, transform: "scale(1)" }),
        animate(
          "0.5s ease-out",
          style({
            transform: "scale(0.5)",
            height: "0px",
            padding: "0px",
            margin: "0px auto",
            opacity: 0
          })
        )
      ]),
      transition(":enter", [
        style({
          height: "0px",
          opacity: 0,
          transform: "scale(0)",
          padding: "0px",
          margin: "0px auto"
        }),
        animate(
          "0.5s ease-out",
          style({
            transform: "scale(1)",
            height: "*",
            margin: "*",
            padding: "*",
            opacity: 1
          })
        )
      ])
    ])
  ]
})
export class ListComponent implements OnInit {
  constructor(public slots: SlotService) {}

  @Output("addCar") addCar: EventEmitter<boolean> = new EventEmitter(false);

  ngOnInit() {}
}
