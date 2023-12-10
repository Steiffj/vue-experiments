import type { InjectionKey } from "vue";
import type { UiState } from "./UiState";

export const uiStateKey = Symbol() as InjectionKey<UiState>;
