import { Injectable } from "@angular/core";
import { Slot } from "./list/list.component";
import { Observable, BehaviorSubject } from "rxjs";

export const TakenSlots: Slot[] = [
  {
    carNumber: "KA-O5-AS-3366",
    carColor: "red",
    slotNumber: 3,
    dateTaken: new Date()
  },
  {
    carNumber: "KA-51-JY-3586",
    carColor: "red",
    slotNumber: 4,
    dateTaken: new Date()
  },
  {
    carNumber: "KA-07-KK-8874",
    carColor: "white",
    slotNumber: 1,
    dateTaken: new Date()
  },
  {
    carNumber: "KA-O1-AA-2874",
    carColor: "black",
    slotNumber: 2,
    dateTaken: new Date()
  },
  {
    carNumber: "KA-04-ML-7819",
    carColor: "blue",
    slotNumber: 5,
    dateTaken: new Date()
  }
];
export const costPerSpot: number = 20;

@Injectable({
  providedIn: "root"
})
export class SlotService {
  // Slots in the parking lot
  private slotNumbersAvailable: number[] = [];
  private totalSlots: BehaviorSubject<number> = new BehaviorSubject(0);
  public totalSlots$: Observable<number> = this.totalSlots.asObservable();

  // Used slots
  private takenSlots: Slot[] = [];
  private filledSlots: BehaviorSubject<Slot[]> = new BehaviorSubject(
    this.takenSlots
  );
  public filledSlots$: Observable<Slot[]> = this.filledSlots.asObservable();

  // Number of slots available
  private totalSlotsAvailable: BehaviorSubject<number> = new BehaviorSubject(
    this.slotNumbersAvailable.length
  );
  public totalSlotsAvailabe$: Observable<
    number
  > = this.totalSlotsAvailable.asObservable();

  // Total money made
  private moneyMade: BehaviorSubject<number> = new BehaviorSubject(0);
  public moneyMade$: Observable<number> = this.moneyMade.asObservable();

  constructor() {}

  genSlotNumbers(num) {
    this.slotNumbersAvailable = Array(num)
      .fill(0)
      .map((x, i) => i + 1);
    this.totalSlots.next(num);
    this.totalSlotsAvailable.next(this.slotNumbersAvailable.length);
  }

  fillTakenSlots(num) {
    const len = TakenSlots.length;
    for (let i = 0; i < num; i++) {
      const slot = { ...TakenSlots[i % len] };
      this.takenSlots[i] = slot;
      this.slotNumbersAvailable = this.slotNumbersAvailable.filter(
        x => x !== slot.slotNumber
      );
    }
    this.filledSlots.next(this.takenSlots);
    this.totalSlotsAvailable.next(this.slotNumbersAvailable.length);
  }

  fillSlot() {
    const num = this.slotNumbersAvailable.shift();
    this.totalSlotsAvailable.next(this.slotNumbersAvailable.length);
    return num;
  }

  freeSlot(num) {
    this.takenSlots = this.takenSlots.filter(slot => slot.slotNumber !== num);
    this.filledSlots.next(this.takenSlots);
    this.slotNumbersAvailable.push(num);
    this.totalSlotsAvailable.next(this.slotNumbersAvailable.length);
    this.moneyMade.next(this.moneyMade.value + costPerSpot);
  }

  parkCar({ number, color }) {
    const car: Slot = {
      carNumber: number.toUpperCase(),
      carColor: color,
      slotNumber: this.fillSlot(),
      dateTaken: new Date()
    };
    this.takenSlots.push(car);
    this.filledSlots.next(this.takenSlots);
  }
}
