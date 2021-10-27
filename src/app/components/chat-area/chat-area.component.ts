import { AfterViewInit, Component, OnInit, TemplateRef } from '@angular/core';
import { DateUtil } from 'src/app/date-util/date-util';


class Message {
  public message?: string;
  public sent_at?: Date;
  public sender?: boolean;
  public firstOccurence?: boolean;
  constructor(message: string, sent_at: Date, sender: boolean, firstOccurence: boolean) {
    this.message = message;
    this.sent_at = sent_at;
    this.sender = sender;
    this.firstOccurence = firstOccurence;
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

  currentHeight: number = 0;

  public messagesToDisplay: Message[] = [
    new Message("I'm good too, thank you!", new Date(), true, true),
    new Message("I'm good too, thank you!", new Date(), true, true),
    new Message("I'm good too, thank you!", new Date(), true, true),
    new Message("I'm good too, thank you!", new Date(), true, true),
    new Message("I'm good too, thank you!", new Date(), true, true),
    new Message("I'm good too, thank you!", new Date(), true, false),
    new Message("I'm good too, thank you!", new Date(), true, false),
    new Message("I'm good too, thank you!", new Date(), true, false),
    new Message("I'm good too, thank you!", new Date(), true, false),
    new Message("I'm good too, thank you!", new Date(), true, false),
    new Message("I'm good too, thank you!", new Date(), true, false),
    new Message("I'm good too, thank you!", new Date(), true, false),
    new Message("I'm good too, thank you!", new Date(), true, false),
    new Message("I'm good too, thank you!", new Date(), true, false),
    new Message("I'm good too, thank you!", new Date(), true, false),
    new Message("I'm good too, thank you!", new Date(), true, false),
    new Message("I'm good too, thank you!", new Date(), true, false),
    new Message("I'm good too, thank you!", new Date(), true, false),
    new Message("I'm good too, thank you!", new Date(), true, false),
    new Message("I'm good too, thank you!", new Date(), true, false),
    new Message("I'm good too, thank you!", new Date(), true, false),
    new Message("I'm good too, thank you!", new Date(), true, false),
    new Message("I'm good too, thank you!", new Date(), true, false),
    new Message("I'm good too, thank you!", new Date(), true, false),
  ];


  public messages: Message[] = [
    new Message("I'm good too, thank you!", new Date(), true, true),
    new Message("I'm good too, thank you!", new Date(), true, false),
    new Message("I'm good too, thank you!", new Date(), true, false),
    new Message("I'm good too, thank you!", new Date(), true, false),
    new Message("I'm good too, thank you!", new Date(), true, false),
    new Message("I'm good too, thank you!", new Date(), true, false),
    new Message("I'm good too, thank you!", new Date(), true, false),
    new Message("I'm good too, thank you!", new Date(), true, false),
    new Message("I'm good too, thank you!", new Date(), true, false),
    new Message("I'm good too, thank you!", new Date(), true, false),
    new Message("I'm good too, thank you!", new Date(), true, false),
    new Message("I'm good too, thank you!", new Date(), true, false),
    new Message("I'm good too, thank you!", new Date(), true, false),
    new Message("I'm good too, thank you!", new Date(), true, false),
    new Message("I'm good too, thank you!", new Date(), true, false),
    new Message("I'm good too, thank you!", new Date(), true, false),
    new Message("I'm good too, thank you!", new Date(), true, false),
    new Message("I'm good too, thank you!", new Date(), true, false),
    new Message("I'm good too, thank you!", new Date(), true, false),
    new Message("I'm good too, thank you!", new Date(), true, false),
  ];

  public latestMessage: Message | undefined = undefined;
  
  constructor() { }

  ngAfterViewInit(): void {
    this.updateHeight();
    this.scrollDown(1);
  }

  ngOnInit(): void {
    const dateUtil = new DateUtil();
    dateUtil.start();
  }

  public onKeyDown(event: KeyboardEvent, input: HTMLTextAreaElement): void { 
    // manage different key presses
    const key = this._getActionKey(event);
    switch(key) { 
      case "ENTER": { 
        this.sendMessage(event, input)
        break; 
      }
      case "ENTER+SHIFT": { 
        this._createNewLines(event);
        break; 
      }
      case "BACKSPACE": { 
        
        break; 
      }
   } 
    
  }

  private _createNewLines(event: any): void {
    const textarea = document.getElementById("textarea-id");    
    if(textarea) {      
      textarea.style.height = textarea.offsetHeight + "px";
    }
  }

  public sendMessage(event: any, input: HTMLTextAreaElement): void {
    event?.preventDefault();
    const enteredValue = input.value.trim();
    if(enteredValue !== "") {
      const sender = Math.random() < 0.5;
      let firstOccurence = true;
      if(this.latestMessage) {
        if(sender && this.latestMessage.sender) {
          firstOccurence = false;
        } else if(!sender && !this.latestMessage.sender) {
          firstOccurence = false;
        } else {
          firstOccurence = true;
        }
      }
      const message = new Message(enteredValue, new Date(), sender, firstOccurence);
      this.messages.push(message);
      this.scrollDown(50);
      this.latestMessage = message;
      this.updateMessagesToDisplay(0);
    }
    input.value = "";
  }

  private updateMessagesToDisplay(total: number): void {
    let sliceTotal = this.messagesToDisplay.length + total;
    if(total === 0) {
      sliceTotal = 20
    }
    this.messagesToDisplay = this.messages.slice(-sliceTotal);
  }

  scrollDown(time: number, howMuch?: number): void {
    const messageDisplayer = document.getElementById("message-displayer");
    setTimeout(()=> {
      if(messageDisplayer) {
        if(!howMuch) {
          messageDisplayer.scrollTop = messageDisplayer.scrollHeight;
        } else {
          if(this.messages.length !== this.messagesToDisplay.length) 
            messageDisplayer.scrollTop = howMuch;
          else messageDisplayer.scrollTop = 0
        }
      }
    }, time);
  }

  getScrollHeight(): number {
    const messageDisplayer = document.getElementById("message-displayer");
    if(messageDisplayer) {
      
      return messageDisplayer.scrollHeight - messageDisplayer.scrollTop - 735;
    }
    return -1;
  }


  private _getActionKey(event: any): string {
    return this.keyRegistry.get(event.keyCode + ", " + event.shiftKey)??"";
  }

  setTopMargin(message: Message): number {
    if(message.firstOccurence) {
      return 10
    }
    return 0
  }

  getMessageStyleClass(message: Message): string {
    let response = "message-container";
    if (message.sender && message.firstOccurence) {
      response = response + " right-sb";
    } else if(!message.sender && message.firstOccurence) {
      response = response + " left-sb";
    }
    return response;
  }

  onScroll(event: any): void {
    const scrollTop = event.srcElement.scrollTop;
    if(scrollTop === 0) {
      event.preventDefault();
      this.updateMessagesToDisplay(20);
      this.updateHeight();
    }
    
  }

  updateHeight(): void {
    setTimeout(() => {
      const messageDisplayer = document.getElementById("message-displayer");
      if(messageDisplayer) {
        const difference = messageDisplayer.scrollHeight - this.currentHeight;
        this.scrollDown(20  , 200);
        this.currentHeight = messageDisplayer.scrollHeight
      }
    }, 1);
  }
}
