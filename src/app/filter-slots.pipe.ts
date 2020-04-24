import { Pipe, PipeTransform } from "@angular/core";
import { Slot } from "./list/list.component";

@Pipe({
  name: "filterSlots"
})
export class FilterSlotsPipe implements PipeTransform {
  transform(value: Slot[], ...args: any[]): Slot[] {
    if (!!args[0] || !!args[1]) {
      return value.filter(slot => {
        const re = new RegExp(args[0], "ig");
        if (args[0] && args[1]) {
          return re.test(slot.carNumber) && slot.carColor === args[1];
        } else if (!args[0] && !!args[1]) {
          return slot.carColor === args[1];
        } else if (!!args[0] && !args[1]) {
          return re.test(slot.carNumber);
        }
      });
    } else return value;
  }
}
