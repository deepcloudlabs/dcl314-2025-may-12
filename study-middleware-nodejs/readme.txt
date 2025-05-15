Node.js Runtime:
1. v8 JS Engine
   Virtual Machine: Garbage Collector, JIT Compiler,
   * Single Execution Thread: functions in Call Stack
   blocking -> non-blocking -> async
                              i. callback
                             ii. promise
2. Event Queue & Loop
   Event Loop -> 6 Phases
   Phase 1 -> Phase 2 -> ... -> Phase 6 --
      /\                                  |
       |__________________________________|
   Microtask -> Queue: Critical tasks
       require -> initialization
       promise -> then -> logic
   Macrotask -> Queue -> starvation
       setTimeout/setInterval
       setImmediate