import { AfterViewInit, Component, OnInit, TemplateRef } from '@angular/core';


class Message {
  public message: string;
  public sent_at: Date;
  public sender: boolean;
  constructor(message: string, sent_at: Date, sender: boolean) {
    this.message = message;
    this.sent_at = sent_at;
    this.sender = sender;
  }
}
@Component({
  selector: 'app-chat-area',
  templateUrl: './chat-area.component.html',
  styleUrls: ['./chat-area.component.scss']
})
export class ChatAreaComponent implements OnInit, AfterViewInit {

  keyRegistry = new Map([
    ["13, false", "ENTER"],
    ["13, true", "ENTER+SHIFT"],
    ["8, false", "BACKSPACE"]
  ]);


  public messages: Message[] = [
    new Message("Hello Mario", new Date(), true),
    new Message("Hello Andi", new Date(), false),
    new Message("How are you?", new Date(), true),
    new Message("I'm good, thanks! You?", new Date(), false),
    new Message("I'm good too, thank you!", new Date(), true),
    new Message("I'm good too, thank you!", new Date(), true),
    new Message("I'm good too, thank you!", new Date(), true),
    new Message("I'm good too, thank you!", new Date(), true),
    new Message("I'm good too, thank you!", new Date(), true),
    new Message("I'm good too, thank you!", new Date(), true),
    new Message("I'm good too, thank you!", new Date(), true),
    new Message("I'm good too, thank you!", new Date(), true),
    new Message("I'm good too, thank you!", new Date(), true),
    new Message("I'm good too, thank you!", new Date(), true),
    new Message("I'm good too, thank you!", new Date(), true),
    new Message("I'm good too, thank you!", new Date(), true),
    new Message("I'm good too, thank you!", new Date(), true),
    new Message("I'm good too, thank you!", new Date(), true),
    new Message("I'm good too, thank you!", new Date(), true),
    new Message("I'm good too, thank you!", new Date(), true),
    new Message("I'm good too, thank you!", new Date(), true),
    new Message("I'm good too, thank you!", new Date(), true),
    new Message("I'm good too, thank you!", new Date(), true),
    new Message("I'm good too, thank you!", new Date(), true),
  ]
  
  constructor() { }

  ngAfterViewInit(): void {
    this.scrollToBottom(1);
  }

  ngOnInit(): void {
    
  }

  public onKeyDown(event: KeyboardEvent, input: HTMLTextAreaElement): void { 
    // manage different key presses
    const key = this._getActionKey(event);
    switch(key) { 
      case "ENTER": { 
        this._sendMessage(event, input)
        break; 
      }
      case "ENTER+SHIFT": { 
        this._createNewLines(event);
        break; 
      }
      case "BACKSPACE": { 
        console.log("backspace");
        
        break; 
      }
   } 
    
  }

  private _createNewLines(event: any): void {
    const textarea = document.getElementById("textarea-id");
    console.log(event?.srcElement.value);
    
    if(textarea) {      
      textarea.style.height = textarea.offsetHeight + "px";
    }
  }

  private _sendMessage(event: KeyboardEvent, input: HTMLTextAreaElement): void {
    event.preventDefault();
    const enteredValue = input.value.trim();
    if(enteredValue !== "")
      this.messages.push(new Message(enteredValue, new Date(), Math.random() < 0.5));
    this.scrollToBottom(50);
    input.value = "";
  }

  scrollToBottom(time: number): void {
    const messageDisplayer = document.getElementById("message-displayer");
    setTimeout(()=> {
      if(messageDisplayer) messageDisplayer.scrollTop = messageDisplayer.scrollHeight;
    }, time);
  }

  getScrollHeight(): number {
    const messageDisplayer = document.getElementById("message-displayer");
    if(messageDisplayer) {
      console.log(messageDisplayer.style.height);
      
      return messageDisplayer.scrollHeight - messageDisplayer.scrollTop - 735;
    }
    return -1;
  }


  private _getActionKey(event: any): string {
    return this.keyRegistry.get(event.keyCode + ", " + event.shiftKey)??"";
  }

  getMessageWidth(tempRef: any) {
    console.log(tempRef);
    // return tempRef.offsetWidth + 100
  }
}
