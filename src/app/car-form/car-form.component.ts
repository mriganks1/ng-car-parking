import {
  Component,
  OnInit,
  Output,
  EventEmitter,
  AfterViewInit,
  ViewChildren
} from "@angular/core";
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
export class CarFormComponent implements OnInit, AfterViewInit {
  constructor(private slots: SlotService) {}
  @Output("closeForm") closeForm: EventEmitter<boolean> = new EventEmitter(
    false
  );
  carColors: string[] = Colors;
  carForm: FormGroup = new FormGroup({
    number: new FormControl("", [Validators.required]),
    color: new FormControl("", [Validators.required])
  });
  @ViewChildren("input") numberInput;

  ngOnInit() {}

  ngAfterViewInit(): void {
    this.numberInput.first.nativeElement.focus();
  }

  saveCar() {
    this.closeForm.emit(false);
    this.slots.parkCar(this.carForm.value);
  }
}
