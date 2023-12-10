import { ref, type Ref } from "vue";

export class UiState {
  private readonly hidden: Record<string, Ref<boolean>> = {};

  toggleHidden(elem: string) {
    if (!this.hidden[elem]) {
      // Not sure if it should be created and toggled at once.
      // Shouldn't matter much if toggling occurs in response to user input.
      this.hidden[elem] = ref(false);
    }

    this.hidden[elem].value = !this.hidden[elem].value;
  }

  setHidden(elem: string, hidden: boolean) {
    if (!this.hidden[elem]) {
      this.hidden[elem] = ref(hidden);
    } else {
      this.hidden[elem].value = hidden;
    }
  }

  isHidden(elem: string) {
    if (!this.hidden[elem]) {
      this.hidden[elem] = ref(false);
    }

    return this.hidden[elem];
  }
}
