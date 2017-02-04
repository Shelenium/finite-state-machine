class FSM {
    /**
     * Creates new FSM instance.
     * @param config
     */
    constructor(config) {
    this.initial = config.initial;
    this.states = config.states;
    this.activeState = this.initial;
    this.undoState = [];
    this.redoState = [];
    }

    /**
     * Returns active state.
     * @returns {String}
     */
    getState() {
        return this.activeState;
    }

    /**
     * Goes to specified state.
     * @param state
     */
    changeState(state) {

        if (Object.keys(this.states).indexOf(state) != -1){

        this.undoState.push(this.activeState);
        this.activeState = state;
        this.redoState = [];

        } else {
        alert('Not available state to this FSM');
        }
    }

    /**
     * Changes state according to event transition rules.
     * @param event
     */
    trigger(event) {
        var startPosition = this.states[this.activeState].transitions;
        var events = Object.keys(startPosition);

        if (events.indexOf(event) !=-1) {

       this.undoState.push(this.activeState);
       this.activeState = startPosition[event];
       this.redoState = [];

   } else { 
       alert('Not available event to this state');
       }
         
    }

    /**
     * Resets FSM state to initial.
     */
    reset() {
        this.activeState = this.initial;
        this.undoState = [];
        this.redoState = [];
    }

    /**
     * Returns an array of states for which there are specified event transition rules.
     * Returns all states if argument is undefined.
     * @param event
     * @returns {Array}
     */
    getStates(event) {
        if (!event) {
            return Object.keys(this.states)
    }
        else {
            var states = [];
            for (var key in this.states) {
                var set_states = Object.keys(this.states[key].transitions);
                if (set_states.indexOf(event) != -1) {
                    states.push (key);
                };

            }
            return states;
        }    

    }

    /**
     * Goes back to previous state.
     * Returns false if undo is not available.
     * @returns {Boolean}
     */
    undo() {

        if (this.undoState.length == 0) {
            return false;
        } else {
        this.redoState[this.redoState.length] = this.activeState;
        this.activeState = this.undoState[this.undoState.length-1];
        this.undoState.length--;
        return true;
    }
}

    /**
     * Goes redo to state.
     * Returns false if redo is not available.
     * @returns {Boolean}
     */
    redo() {
        if (this.redoState.length == 0) {
            return false;
        } else {
        this.undoState[this.undoState.length] = this.activeState; 
        this.activeState = this.redoState[this.redoState.length-1];
        this.redoState.length--;
        return true;
    }
    }

    /**
     * Clears transition history
     */
    clearHistory() {
        this.undoState = [];
        this.redoState = [];
    }
}

module.exports = FSM;

/** @Created by Uladzimir Halushka **/
