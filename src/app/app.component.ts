import { Component } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { SlotService } from "./slot.service";
import { trigger, transition, style, animate } from "@angular/animations";

@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.css"],
  animations: [
    trigger("growFade", [
      transition(":enter", [
        style({ opacity: 0, transform: "scale(0.5)" }),
        animate("0.3s ease-out", style({ opacity: 1, transform: "scale(1)" }))
      ]),
      transition(":leave", [
        animate("0.3s ease-out", style({ opacity: 0, transform: "scale(0.5)" }))
      ])
    ])
  ]
})
export class AppComponent {
  constructor(private fb: FormBuilder, public slots: SlotService) {}

  setup: boolean = true;
  setupForm: FormGroup;
  addCar: boolean = false;

  ngOnInit() {
    this.buildForm();
    this.slots.genSlotNumbers(10);
    this.slots.fillTakenSlots(5);
    this.setup = false;
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
