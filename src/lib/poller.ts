import { EventEmitter } from "events";

class Poller extends EventEmitter {
  
  private timeout: number;
  
  /**
   * @param {number} timeout how long should we wait after the poll started?
   */
  constructor(timeout: number = 100) {
    super();
    this.timeout = timeout;
  }

  poll() {
    setTimeout(() => this.emit('poll'), this.timeout);
  }

  onPoll(callback: () => void) {
      this.on('poll', callback);
  }
}

export default Poller;