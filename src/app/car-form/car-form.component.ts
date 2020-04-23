import { Component, OnInit, Output, EventEmitter } from "@angular/core";
import { FormGroup, FormControl, Validators } from "@angular/forms";
import { SlotService } from "../slot.service";

export const Colors: string[] = [
  "grey",
  "red",
  "white",
  "green",
  "blue",
  "black",
  "yellow",
  "gold"
];

@Component({
  selector: "app-car-form",
  templateUrl: "./car-form.component.html",
  styleUrls: ["./car-form.component.css"]
})
export class CarFormComponent implements OnInit {
  constructor(private slots: SlotService) {}
  @Output("closeForm") closeForm: EventEmitter<boolean> = new EventEmitter(
    false
  );
  carColors: string[] = Colors;
  carForm: FormGroup = new FormGroup({
    number: new FormControl("", [Validators.required]),
    color: new FormControl("", [Validators.required])
  });

  ngOnInit() {}

  saveCar() {
    this.closeForm.emit(false);
    this.slots.parkCar(this.carForm.value);
  }
}
