import { Component } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { SlotService } from "./slot.service";

@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.css"]
})
export class AppComponent {
  title = "car-parking";
  constructor(private fb: FormBuilder, public slots: SlotService) {}

  setup: boolean = true;
  setupForm: FormGroup;
  addCar: boolean = false;

  ngOnInit() {
    this.buildForm();
    // this.slots.genSlotNumbers(10);
    // this.slots.fillTakenSlots(5);
    // this.setup = false;
  }

  buildForm() {
    this.setupForm = this.fb.group({
      totalSlots: this.fb.control("", [
        Validators.required,
        Validators.pattern(/\d/g)
      ]),
      takenSlots: this.fb.control("", [
        Validators.required,
        Validators.pattern(/\d/g)
      ])
    });
  }

  startAutomation() {
    this.setup = false;
    this.slots.genSlotNumbers(Number(this.setupForm.value.totalSlots));
    this.slots.fillTakenSlots(Number(5));
  }
}
