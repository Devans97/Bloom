import type { State } from './model.js';
export interface Host {
  getState(): State;
  commit(next:State,message?:string,close?:boolean):Promise<boolean>;
  show(title:string,html:string):HTMLDialogElement;
  closeDialog(dialog?:HTMLDialogElement):Promise<void>;
  announce(message:string):void;
  navigate(page:string):void;
}
export const esc=(value:unknown)=>String(value??'').replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]!));
