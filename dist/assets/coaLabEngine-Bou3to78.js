const H={binary:{id:"binary",name:"Binary",radix:2,subscript:"₂",prefix:"0b",allowedChars:/^[01]+$/},octal:{id:"octal",name:"Octal",radix:8,subscript:"₈",prefix:"0o",allowedChars:/^[0-7]+$/},decimal:{id:"decimal",name:"Decimal",radix:10,subscript:"₁₀",prefix:"",allowedChars:/^[0-9]+$/},hexadecimal:{id:"hexadecimal",name:"Hexadecimal",radix:16,subscript:"₁₆",prefix:"0x",allowedChars:/^[0-9a-fA-F]+$/}},Q={0:0,1:1,2:2,3:3,4:4,5:5,6:6,7:7,8:8,9:9,A:10,B:11,C:12,D:13,E:14,F:15},J=["0","1","2","3","4","5","6","7","8","9","A","B","C","D","E","F"];function at(t,n){const a=(t||"").trim().toUpperCase();if(!a)return{isValid:!1,message:"Please enter a number to convert."};const o=H[n];if(!o)return{isValid:!1,message:"Unknown source number system."};if(!o.allowedChars.test(a))switch(n){case"binary":return{isValid:!1,message:"Binary numbers can only contain 0 and 1."};case"octal":return{isValid:!1,message:"Octal numbers can only contain digits 0 to 7."};case"decimal":return{isValid:!1,message:"Decimal numbers can only contain digits 0 to 9."};case"hexadecimal":return{isValid:!1,message:"Hexadecimal numbers can only contain 0–9 and A–F."}}return a.length>32?{isValid:!1,message:"Input is too long for educational display (maximum 32 digits)."}:{isValid:!0,sanitized:a}}function ot(t,n,a){const o=at(t,n);if(!o.isValid)return{success:!1,error:o.message};const s=o.sanitized,r=H[n],l=H[a];if(n===a)return{success:!0,input:s,output:s,answerText:`${s}${r.subscript} = ${s}${l.subscript}`,sourceBase:n,targetBase:a,stepsHtml:`
        <div class="coa-calc-step">
          <div class="coa-calc-step-num">STEP 1</div>
          <div class="coa-calc-step-body">
            <strong>Identical Bases:</strong> The number is already in ${r.name} (Base ${r.radix}). No conversion needed.
          </div>
        </div>
      `,explanation:{whatHappened:`The input ${s} is already in ${r.name}.`,how:`Both source and target radices are ${r.radix}, so the digit values remain unchanged.`,why:"Direct representation requires no mathematical conversion."}};try{let e=0n;n==="decimal"?e=BigInt(s):n==="binary"?e=BigInt("0b"+s):n==="octal"?e=BigInt("0o"+s):n==="hexadecimal"&&(e=BigInt("0x"+s));let i="";a==="decimal"?i=e.toString(10):a==="binary"?i=e.toString(2):a==="octal"?i=e.toString(8):a==="hexadecimal"&&(i=e.toString(16).toUpperCase());const p=`${s}${r.subscript} = ${i}${l.subscript}`,{stepsHtml:u,explanation:d}=it(s,i,e,n,a);return{success:!0,input:s,output:i,answerText:p,decimalVal:e.toString(),sourceBase:n,targetBase:a,stepsHtml:u,explanation:d}}catch(e){return{success:!1,error:`Calculation error: ${e.message}`}}}function it(t,n,a,o,s){const r=H[o],l=H[s];if(s==="decimal"){const u=t.length,d=[],m=[];let c=[];for(let b=0;b<u;b++){const y=t[b],C=u-1-b,R=o==="hexadecimal"?Q[y]:parseInt(y,10),w=BigInt(r.radix)**BigInt(C),f=BigInt(R)*w;d.push(`${y} × ${r.radix}<sup>${C}</sup>`),m.push(`<tr>
        <td><code>${y}</code></td>
        <td>${r.radix}<sup>${C}</sup> = ${w.toString()}</td>
        <td>${R} × ${w.toString()}</td>
        <td><strong>${f.toString()}</strong></td>
      </tr>`),(f>0n||d.length===1)&&c.push(f.toString())}c.length===0&&(c=["0"]);const h=`
      <div class="coa-calc-step">
        <div class="coa-calc-step-num">STEP 1</div>
        <div class="coa-calc-step-body">
          <strong>Assign Powers of ${r.radix}:</strong>
          <p class="coa-calc-sub">Each digit is weighted by ${r.radix} raised to its position index (from right to left, starting at 0):</p>
          <div class="coa-math-formula">${d.join(" + ")}</div>
        </div>
      </div>

      <div class="coa-calc-step">
        <div class="coa-calc-step-num">STEP 2</div>
        <div class="coa-calc-step-body">
          <strong>Calculate Position Values:</strong>
          <table class="coa-calc-table">
            <thead>
              <tr><th>Digit</th><th>Power (${r.radix}<sup>n</sup>)</th><th>Multiplication</th><th>Value</th></tr>
            </thead>
            <tbody>
              ${m.join("")}
            </tbody>
          </table>
        </div>
      </div>

      <div class="coa-calc-step">
        <div class="coa-calc-step-num">STEP 3</div>
        <div class="coa-calc-step-body">
          <strong>Sum All Values:</strong>
          <div class="coa-math-formula">${c.join(" + ")} = <strong>${n}</strong></div>
        </div>
      </div>

      <div class="coa-calc-step coa-step-final">
        <div class="coa-calc-step-num">STEP 4</div>
        <div class="coa-calc-step-body">
          <strong>Final Answer:</strong>
          <div class="coa-math-highlight">${t}${r.subscript} = ${n}${l.subscript}</div>
        </div>
      </div>
    `,$={whatHappened:`Converted ${t}${r.subscript} into standard base-10 decimal (${n}₁₀).`,how:`Multiplied each digit by its positional power of ${r.radix} and summed the results.`,why:"Positional numbering systems evaluate the total magnitude by multiplying digits by powers of the radix."};return{stepsHtml:h,explanation:$}}if(o==="decimal"){let u=a;const d=BigInt(l.radix),m=[],c=[];if(u===0n)m.push(`<tr><td>0</td><td>÷ ${l.radix}</td><td>0</td><td>0</td></tr>`),c.push("0");else for(;u>0n;){const b=u/d,y=Number(u%d),C=s==="hexadecimal"?J[y]:y.toString();m.push(`<tr>
          <td>${u.toString()}</td>
          <td>÷ ${l.radix}</td>
          <td>${b.toString()}</td>
          <td><strong>${C}</strong>${y>=10?` (${y})`:""}</td>
        </tr>`),c.push(C),u=b}const h=`
      <div class="coa-calc-step">
        <div class="coa-calc-step-num">STEP 1</div>
        <div class="coa-calc-step-body">
          <strong>Repeated Division by ${l.radix}:</strong>
          <p class="coa-calc-sub">Divide the decimal number by ${l.radix} repeatedly until the quotient reaches 0. Record each remainder:</p>
          <table class="coa-calc-table">
            <thead>
              <tr><th>Value</th><th>Operation</th><th>Quotient</th><th>Remainder</th></tr>
            </thead>
            <tbody>
              ${m.join("")}
            </tbody>
          </table>
        </div>
      </div>

      <div class="coa-calc-step">
        <div class="coa-calc-step-num">STEP 2</div>
        <div class="coa-calc-step-body">
          <strong>Read Remainders from Bottom to Top:</strong>
          <p class="coa-calc-sub">The last remainder is the Most Significant Digit (MSD); the first remainder is the Least Significant Digit (LSD):</p>
          <div class="coa-math-formula">
            Remainders: [ ${c.slice().reverse().join(", ")} ] ↑ (read upward)
          </div>
        </div>
      </div>

      <div class="coa-calc-step coa-step-final">
        <div class="coa-calc-step-num">STEP 3</div>
        <div class="coa-calc-step-body">
          <strong>Final Answer:</strong>
          <div class="coa-math-highlight">${t}${r.subscript} = ${n}${l.subscript}</div>
        </div>
      </div>
    `,$={whatHappened:`Converted decimal ${t}₁₀ into ${l.name} (${n}${l.subscript}).`,how:`Repeatedly divided by ${l.radix} and assembled the remainders in reverse order (bottom-to-top).`,why:"Repeated division peels away the lowest-order radix digits until all magnitude has been accounted for."};return{stepsHtml:h,explanation:$}}if(o==="binary"&&s==="hexadecimal"){let u=t;const d=u.length%4,m=d===0?0:4-d;m>0&&(u="0".repeat(m)+u);const c=[],h=[];for(let y=0;y<u.length;y+=4){const C=u.slice(y,y+4),R=parseInt(C,2),w=J[R];c.push(C),h.push(`<tr>
        <td><code>${C}</code></td>
        <td>${R}</td>
        <td><strong>${w}</strong></td>
      </tr>`)}const $=`
      <div class="coa-calc-step">
        <div class="coa-calc-step-num">STEP 1</div>
        <div class="coa-calc-step-body">
          <strong>Group Binary Bits into Nibbles (4-bit groups):</strong>
          <p class="coa-calc-sub">Because 2⁴ = 16, exactly 4 binary bits represent 1 hexadecimal digit. Group from right to left (padded with leading zeros if needed):</p>
          <div class="coa-math-formula">${c.map(y=>`<span class="coa-bit-group">${y}</span>`).join(" ")}</div>
        </div>
      </div>

      <div class="coa-calc-step">
        <div class="coa-calc-step-num">STEP 2</div>
        <div class="coa-calc-step-body">
          <strong>Convert Each 4-bit Group to Hexadecimal:</strong>
          <table class="coa-calc-table">
            <thead>
              <tr><th>4-bit Binary Group</th><th>Decimal Value</th><th>Hexadecimal Digit</th></tr>
            </thead>
            <tbody>
              ${h.join("")}
            </tbody>
          </table>
        </div>
      </div>

      <div class="coa-calc-step coa-step-final">
        <div class="coa-calc-step-num">STEP 3</div>
        <div class="coa-calc-step-body">
          <strong>Combine Digits:</strong>
          <div class="coa-math-highlight">${t}${r.subscript} = ${n}${l.subscript}</div>
        </div>
      </div>
    `,b={whatHappened:`Converted binary ${t}₂ directly to hexadecimal ${n}₁₆ using 4-bit grouping.`,how:"Grouped bits into 4-bit sets from right to left, converting each group directly to its hex character.",why:"Since 16 is 2⁴, hex is a compact 4:1 representation of binary without requiring decimal division."};return{stepsHtml:$,explanation:b}}if(o==="hexadecimal"&&s==="binary"){const u=[];for(let c=0;c<t.length;c++){const h=t[c],$=Q[h],b=$.toString(2).padStart(4,"0");u.push(`<tr>
        <td><code>${h}</code></td>
        <td>${$}</td>
        <td><strong>${b}</strong></td>
      </tr>`)}const d=`
      <div class="coa-calc-step">
        <div class="coa-calc-step-num">STEP 1</div>
        <div class="coa-calc-step-body">
          <strong>Expand Each Hex Digit into 4 Binary Bits:</strong>
          <p class="coa-calc-sub">Each hexadecimal digit corresponds to exactly 4 binary bits (2⁴ = 16):</p>
          <table class="coa-calc-table">
            <thead>
              <tr><th>Hex Digit</th><th>Decimal Value</th><th>4-Bit Binary</th></tr>
            </thead>
            <tbody>
              ${u.join("")}
            </tbody>
          </table>
        </div>
      </div>

      <div class="coa-calc-step coa-step-final">
        <div class="coa-calc-step-num">STEP 2</div>
        <div class="coa-calc-step-body">
          <strong>Concatenate Bits (drop leading zeros):</strong>
          <div class="coa-math-highlight">${t}${r.subscript} = ${n}${l.subscript}</div>
        </div>
      </div>
    `,m={whatHappened:`Expanded hexadecimal ${t}₁₆ into binary ${n}₂.`,how:"Replaced each hex character with its 4-bit binary equivalent and joined them.",why:"Computers convert human hex notation back into physical wire signals (4 bits per character)."};return{stepsHtml:d,explanation:m}}if(o==="binary"&&s==="octal"){let u=t;const d=u.length%3,m=d===0?0:3-d;m>0&&(u="0".repeat(m)+u);const c=[],h=[];for(let y=0;y<u.length;y+=3){const C=u.slice(y,y+3),R=parseInt(C,2);c.push(C),h.push(`<tr><td><code>${C}</code></td><td><strong>${R}</strong></td></tr>`)}const $=`
      <div class="coa-calc-step">
        <div class="coa-calc-step-num">STEP 1</div>
        <div class="coa-calc-step-body">
          <strong>Group Binary Bits into 3-Bit Sets:</strong>
          <p class="coa-calc-sub">Since 2³ = 8, each octal digit corresponds to 3 binary bits. Group from right to left:</p>
          <div class="coa-math-formula">${c.map(y=>`<span class="coa-bit-group">${y}</span>`).join(" ")}</div>
        </div>
      </div>

      <div class="coa-calc-step">
        <div class="coa-calc-step-num">STEP 2</div>
        <div class="coa-calc-step-body">
          <strong>Convert Each Group to Octal:</strong>
          <table class="coa-calc-table">
            <thead><tr><th>3-Bit Group</th><th>Octal Digit</th></tr></thead>
            <tbody>${h.join("")}</tbody>
          </table>
        </div>
      </div>

      <div class="coa-calc-step coa-step-final">
        <div class="coa-calc-step-num">STEP 3</div>
        <div class="coa-calc-step-body">
          <strong>Final Answer:</strong>
          <div class="coa-math-highlight">${t}${r.subscript} = ${n}${l.subscript}</div>
        </div>
      </div>
    `,b={whatHappened:`Converted binary ${t}₂ to octal ${n}₈.`,how:"Grouped bits into 3-bit triplets from right to left.",why:"Octal provides a convenient 3-to-1 compression of binary bits."};return{stepsHtml:$,explanation:b}}if(o==="octal"&&s==="binary"){const u=[];for(let c=0;c<t.length;c++){const h=t[c],$=parseInt(h,10).toString(2).padStart(3,"0");u.push(`<tr><td><code>${h}</code></td><td><strong>${$}</strong></td></tr>`)}const d=`
      <div class="coa-calc-step">
        <div class="coa-calc-step-num">STEP 1</div>
        <div class="coa-calc-step-body">
          <strong>Expand Each Octal Digit into 3 Binary Bits (2³ = 8):</strong>
          <table class="coa-calc-table">
            <thead><tr><th>Octal Digit</th><th>3-Bit Binary</th></tr></thead>
            <tbody>${u.join("")}</tbody>
          </table>
        </div>
      </div>

      <div class="coa-calc-step coa-step-final">
        <div class="coa-calc-step-num">STEP 2</div>
        <div class="coa-calc-step-body">
          <strong>Final Answer:</strong>
          <div class="coa-math-highlight">${t}${r.subscript} = ${n}${l.subscript}</div>
        </div>
      </div>
    `,m={whatHappened:`Expanded octal ${t}₈ into binary ${n}₂.`,how:"Replaced each octal digit with its 3-bit binary equivalent.",why:"Allows direct binary synthesis without requiring intermediate decimal division."};return{stepsHtml:d,explanation:m}}const e=a.toString(2),i=`
    <div class="coa-calc-step">
      <div class="coa-calc-step-num">STEP 1</div>
      <div class="coa-calc-step-body">
        <strong>Convert ${r.name} to Binary:</strong>
        <p class="coa-calc-sub">${t}${r.subscript} converted to binary equals:</p>
        <div class="coa-math-formula"><code>${e}₂</code></div>
      </div>
    </div>

    <div class="coa-calc-step">
      <div class="coa-calc-step-num">STEP 2</div>
      <div class="coa-calc-step-body">
        <strong>Convert Binary to ${l.name}:</strong>
        <p class="coa-calc-sub">Group binary bits to form the ${l.name} value:</p>
        <div class="coa-math-formula"><code>${e}₂</code> → <strong>${n}${l.subscript}</strong></div>
      </div>
    </div>

    <div class="coa-calc-step coa-step-final">
      <div class="coa-calc-step-num">STEP 3</div>
      <div class="coa-calc-step-body">
        <strong>Final Answer:</strong>
        <div class="coa-math-highlight">${t}${r.subscript} = ${n}${l.subscript}</div>
      </div>
    </div>
  `,p={whatHappened:`Converted ${r.name} ${t}${r.subscript} to ${l.name} ${n}${l.subscript}.`,how:"Converted through binary as the common machine intermediary.",why:"Direct powers-of-two bases (2, 8, 16) transfer cleanly through binary bit groups."};return{stepsHtml:i,explanation:p}}function rt(t,n=0){const a=(t||"").trim().toUpperCase().replace(/\s*,\s*/g,", ");if(!a)return{success:!1,error:"Please enter an assembly instruction (e.g. LOAD R1, 5)."};const o=a.match(/^LOAD\s+R1,\s*(-?\d+)$/i);if(o){const e=parseInt(o[1],10);return{success:!0,instruction:{id:"custom_load",label:`LOAD R1, ${e}`,assembly:`LOAD R1, ${e}`,opcode:"LOAD",description:`Load immediate integer ${e} directly into register R1.`,initialState:{r1:n,pc:"0x00",ir:"—",status:"Ready to fetch"},steps:[{stepNumber:1,phase:"FETCH",label:"01 — FETCH",activeComponent:"comp-memory",activeArrow:"arrow-fetch",state:{r1:n,pc:"0x01",ir:`LOAD R1, ${e}`,status:"Instruction fetched into IR"},whatIsHappening:`The CPU retrieves 'LOAD R1, ${e}' from Memory location 0x00 into the Instruction Register (IR). Program Counter increments to 0x01.`,why:"The CPU cannot act on code until it reads the opcode bits out of RAM into its internal Instruction Register.",result:`IR = 'LOAD R1, ${e}' | PC = 0x01`},{stepNumber:2,phase:"DECODE",label:"02 — DECODE",activeComponent:"comp-cu",activeArrow:"arrow-decode",state:{r1:n,pc:"0x01",ir:`LOAD R1, ${e}`,status:"Decoded by Control Unit"},whatIsHappening:`The Control Unit interprets opcode 'LOAD'. It identifies destination register R1 and immediate literal value ${e}.`,why:"The Control Unit translates binary instruction bits into electrical control signals for registers and buses.",result:`Instruction understood: Load immediate literal ${e} into destination R1.`},{stepNumber:3,phase:"EXECUTE",label:"03 — EXECUTE",activeComponent:"comp-alu",activeArrow:"arrow-execute",state:{r1:n,pc:"0x01",ir:`LOAD R1, ${e}`,status:`Routing operand ${e}`},whatIsHappening:`The internal CPU data path routes the immediate value ${e} toward the register input latches.`,why:"In a LOAD immediate instruction, the execution phase routes data directly through the internal CPU bus.",result:`Value ${e} is primed on internal bus for register write-back.`},{stepNumber:4,phase:"STORE",label:"04 — STORE",activeComponent:"comp-reg",activeArrow:"arrow-store",state:{r1:e,pc:"0x01",ir:`LOAD R1, ${e}`,status:`Completed: R1 = ${e}`},whatIsHappening:`Register R1 latches and stores the value ${e}. The instruction execution is now complete.`,why:"The destination register holds the updated value ready for subsequent instructions to use.",result:`R1 = ${e} (Instruction Cycle Complete)`}]}}}const s=a.match(/^ADD\s+R1,\s*(-?\d+)$/i);if(s){const e=parseInt(s[1],10),i=n===0?5:n,p=i+e;return{success:!0,instruction:{id:"custom_add",label:`ADD R1, ${e}`,assembly:`ADD R1, ${e}`,opcode:"ADD",description:`Add integer literal ${e} to current value in register R1 (${i} + ${e} = ${p}).`,initialState:{r1:i,pc:"0x01",ir:"—",status:`Ready to fetch (R1 currently contains ${i})`},steps:[{stepNumber:1,phase:"FETCH",label:"01 — FETCH",activeComponent:"comp-memory",activeArrow:"arrow-fetch",state:{r1:i,pc:"0x02",ir:`ADD R1, ${e}`,status:"Instruction fetched into IR"},whatIsHappening:`The CPU reads 'ADD R1, ${e}' from Memory location 0x01 into the Instruction Register. Program Counter advances to 0x02.`,why:"Every instruction begins with the identical fetch phase to pull machine code out of memory.",result:`IR = 'ADD R1, ${e}' | PC = 0x02`},{stepNumber:2,phase:"DECODE",label:"02 — DECODE",activeComponent:"comp-cu",activeArrow:"arrow-decode",state:{r1:i,pc:"0x02",ir:`ADD R1, ${e}`,status:"Decoded by Control Unit"},whatIsHappening:`The Control Unit decodes 'ADD'. It directs the register file to feed R1 (${i}) and literal ${e} into the ALU.`,why:"The Control Unit configures the ALU multiplexers and sets the operation code to ADD.",result:`Operands identified: Input A = R1 (${i}), Input B = ${e}. Operation = Addition.`},{stepNumber:3,phase:"EXECUTE",label:"03 — EXECUTE",activeComponent:"comp-alu",activeArrow:"arrow-execute",state:{r1:i,pc:"0x02",ir:`ADD R1, ${e}`,status:`ALU computed: ${i} + ${e} = ${p}`},whatIsHappening:`The Arithmetic Logic Unit (ALU) performs integer addition: ${i} + ${e} = ${p}. Flags are updated.`,why:"The ALU is the calculation engine containing full adder logic circuits to compute results.",result:`ALU Output = ${p}`},{stepNumber:4,phase:"STORE",label:"04 — STORE",activeComponent:"comp-reg",activeArrow:"arrow-store",state:{r1:p,pc:"0x02",ir:`ADD R1, ${e}`,status:`Completed: R1 updated to ${p}`},whatIsHappening:`The ALU result (${p}) is written back into register R1, replacing its prior value (${i}).`,why:"Write-back commits the arithmetic calculation into the processor's register state.",result:`R1 = ${p} (Instruction Cycle Complete)`}]}}}const r=a.match(/^SUB\s+R1,\s*(-?\d+)$/i);if(r){const e=parseInt(r[1],10),i=n===0?10:n,p=i-e;return{success:!0,instruction:{id:"custom_sub",label:`SUB R1, ${e}`,assembly:`SUB R1, ${e}`,opcode:"SUB",description:`Subtract integer literal ${e} from register R1 (${i} - ${e} = ${p}).`,initialState:{r1:i,pc:"0x01",ir:"—",status:`Ready to fetch (R1 contains ${i})`},steps:[{stepNumber:1,phase:"FETCH",label:"01 — FETCH",activeComponent:"comp-memory",activeArrow:"arrow-fetch",state:{r1:i,pc:"0x02",ir:`SUB R1, ${e}`,status:"Instruction fetched into IR"},whatIsHappening:`The CPU reads 'SUB R1, ${e}' from Memory location 0x01 into the Instruction Register. Program Counter advances to 0x02.`,why:"Every instruction begins with the identical fetch phase to pull machine code out of memory.",result:`IR = 'SUB R1, ${e}' | PC = 0x02`},{stepNumber:2,phase:"DECODE",label:"02 — DECODE",activeComponent:"comp-cu",activeArrow:"arrow-decode",state:{r1:i,pc:"0x02",ir:`SUB R1, ${e}`,status:"Decoded by Control Unit"},whatIsHappening:`The Control Unit decodes 'SUB'. It directs register R1 (${i}) and subtrahend ${e} into the ALU.`,why:"The Control Unit configures the ALU complementer and sets the subtraction operation.",result:`Operands identified: Input A = R1 (${i}), Input B = ${e}. Operation = Subtraction.`},{stepNumber:3,phase:"EXECUTE",label:"03 — EXECUTE",activeComponent:"comp-alu",activeArrow:"arrow-execute",state:{r1:i,pc:"0x02",ir:`SUB R1, ${e}`,status:`ALU computed: ${i} - ${e} = ${p}`},whatIsHappening:`The ALU performs binary integer subtraction: ${i} - ${e} = ${p}.`,why:"The ALU performs two's complement negation and addition to execute subtraction.",result:`ALU Output = ${p}`},{stepNumber:4,phase:"STORE",label:"04 — STORE",activeComponent:"comp-reg",activeArrow:"arrow-store",state:{r1:p,pc:"0x02",ir:`SUB R1, ${e}`,status:`Completed: R1 updated to ${p}`},whatIsHappening:`The ALU result (${p}) is written back into register R1.`,why:"Write-back updates the architectural register state to reflect the subtraction outcome.",result:`R1 = ${p} (Instruction Cycle Complete)`}]}}}const l=a.match(/^STORE\s+R1(?:\s*,\s*\[?(?:0X)?([0-9A-F]+)\]?)?$/i);if(l){const e=l[1]?`[0x${l[1]}]`:"[0x0A]",i=n===0?8:n;return{success:!0,instruction:{id:"custom_store",label:"STORE R1",assembly:`STORE R1, ${e}`,opcode:"STORE",description:`Write the current value of register R1 (${i}) into Memory location ${e}.`,initialState:{r1:i,pc:"0x02",ir:"—",status:`Ready to fetch (R1 contains ${i})`},steps:[{stepNumber:1,phase:"FETCH",label:"01 — FETCH",activeComponent:"comp-memory",activeArrow:"arrow-fetch",state:{r1:i,pc:"0x03",ir:`STORE R1, ${e}`,status:"Instruction fetched into IR"},whatIsHappening:`The CPU fetches 'STORE R1, ${e}' from Memory location 0x02 into the Instruction Register. Program Counter advances to 0x03.`,why:"Even memory-write operations must first be fetched as instructions into the CPU core.",result:`IR = 'STORE R1, ${e}' | PC = 0x03`},{stepNumber:2,phase:"DECODE",label:"02 — DECODE",activeComponent:"comp-cu",activeArrow:"arrow-decode",state:{r1:i,pc:"0x03",ir:`STORE R1, ${e}`,status:"Decoded by Control Unit"},whatIsHappening:"The Control Unit decodes 'STORE'. It configures the Memory Write-Enable line and selects R1 as the data source.",why:"The Control Unit switches the memory bus from Read mode to Write mode.",result:`Target configured: Destination = Memory ${e}, Data Source = R1 (${i}).`},{stepNumber:3,phase:"EXECUTE",label:"03 — EXECUTE",activeComponent:"comp-reg",activeArrow:"arrow-execute",state:{r1:i,pc:"0x03",ir:`STORE R1, ${e}`,status:`Placing R1 value (${i}) on Data Bus`},whatIsHappening:`Register R1 outputs its value (${i}) onto the internal data bus headed toward memory.`,why:"Data travels from internal register flip-flops onto external bus lines.",result:`Data Bus = ${i} | Target Memory Address = ${e}`},{stepNumber:4,phase:"STORE",label:"04 — STORE",activeComponent:"comp-result",activeArrow:"arrow-store",state:{r1:i,pc:"0x03",ir:`STORE R1, ${e}`,status:`Completed: Memory ${e} = ${i}`},whatIsHappening:`Memory location ${e} latches the value ${i}. The data is safely persisted in RAM.`,why:"Registers are temporary; storing to memory persists data across program execution.",result:`Memory ${e} = ${i} (Instruction Cycle Complete)`}]}}}return{success:!1,error:`Unsupported instruction '${t}'. Supported format: LOAD R1, <num> | ADD R1, <num> | SUB R1, <num> | STORE R1`}}class ct{constructor(n="LOAD R1, 5"){this.currentR1=0,this.loadInstruction(n)}loadInstruction(n){const a=rt(n,this.currentR1);return a.success?(this.instruction=a.instruction,this.currentStepIndex=-1,{success:!0,instruction:this.instruction}):a}getCurrentState(){return this.currentStepIndex<0?{stepNumber:0,totalSteps:4,phase:"READY",label:"READY",activeComponent:null,activeArrow:null,state:this.instruction.initialState,whatIsHappening:`Instruction '${this.instruction.assembly}' is waiting in memory. Click 'Next Step' or 'Play' to begin.`,why:"The CPU clock is waiting to start the first Fetch cycle.",result:"Ready to run."}:{...this.instruction.steps[this.currentStepIndex],totalSteps:4}}nextStep(){return this.currentStepIndex<3?(this.currentStepIndex++,this.currentStepIndex===3&&(this.currentR1=this.instruction.steps[3].state.r1),!0):!1}prevStep(){return this.currentStepIndex>0?(this.currentStepIndex--,!0):this.currentStepIndex===0?(this.currentStepIndex=-1,!0):!1}reset(){this.currentStepIndex=-1}isComplete(){return this.currentStepIndex===3}}function B(t){return t>="a"&&t<="z"}function D(t){return t==="+"||t==="-"||t==="*"||t==="/"}function K(t){return t==="+"||t==="-"?1:t==="*"||t==="/"?2:0}function et(t){if(!t||typeof t!="string")return!1;const n=t.replace(/\s+/g,"");if(n.length===0)return!1;let a=0,o=0;for(let s=0;s<n.length;s++){const r=n[s];if(B(r)){if(o===1||o===4)return!1;o=1}else if(D(r)){if(o!==1&&o!==4)return!1;o=2}else if(r==="("){if(o===1||o===4)return!1;a++,o=3}else if(r===")"){if(a===0||o===2||o===3||o===0)return!1;a--,o=4}else return!1}return a===0&&o!==2&&o!==3&&o!==0}function lt(t){const n=t.replace(/\s+/g,"");let a="";const o=[];for(let s=0;s<n.length;s++){const r=n[s];if(B(r))a+=r;else if(r==="(")o.push(r);else if(r===")"){for(;o.length>0&&o[o.length-1]!=="(";)a+=o.pop();o.length>0&&o[o.length-1]==="("&&o.pop()}else if(D(r)){for(;o.length>0&&D(o[o.length-1])&&K(o[o.length-1])>=K(r);)a+=o.pop();o.push(r)}}for(;o.length>0;)o[o.length-1]!=="("?a+=o.pop():o.pop();return a}function st(t){const n=new Set;for(let a=0;a<t.length;a++){const o=t[a];B(o)&&n.add(o)}return Array.from(n).sort()}function q(t){switch(t){case"+":return"ADD";case"-":return"SUB";case"*":return"MUL";case"/":return"DIV";default:return""}}function dt(t){const n=[],a=[];let o=1;for(let s=0;s<t.length;s++){const r=t[s];if(B(r))a.push(r);else if(D(r)){if(a.length<2)continue;const l=a.pop(),e=a.pop(),i=`t${o++}`;n.push(`${i}=${e}${r}${l}`),a.push(i)}}return n}function ut(t){const n=[],a=[];let o=1;for(let s=0;s<t.length;s++){const r=t[s];if(B(r))a.push(r);else if(D(r)){if(a.length<2)continue;const l=a.pop(),e=a.pop();n.push(`MOV R1,${e}`),n.push(`${q(r)} R1,${l}`);const i=`t${o++}`;n.push(`MOV ${i},R1`),a.push(i)}}return n}function pt(t){const n=[],a=[];let o=1;for(let s=0;s<t.length;s++){const r=t[s];if(B(r))a.push(r);else if(D(r)){if(a.length<2)continue;const l=a.pop(),e=a.pop(),i=`t${o++}`;n.push(`LOAD ${e}`),n.push(`${q(r)} ${l}`),n.push(`STORE ${i}`),a.push(i)}}return n}function mt(t){const n=[];let a=1;for(let o=0;o<t.length;o++){const s=t[o];B(s)?n.push(`PUSH ${s}`):D(s)&&n.push(q(s))}return n.push(`POP t${a}`),n}function ht(t){const n=new Set;for(const a of t){const o=a.match(/\bt\d+\b/g);o&&o.forEach(s=>n.add(s))}return Array.from(n).sort()}function T(t,n,a){if(n.has(t))return n.get(t);if(a&&a[t]!==void 0&&a[t]!==null&&a[t]!==""){const o=Number(a[t]);return Number.isNaN(o)?1:o}return t.length===1&&t>="a"&&t<="z"?t.charCodeAt(0)-97+1:0}function k(t){return Array.from(t.entries()).map(([n,a])=>({name:n,value:a})).sort((n,a)=>n.name.localeCompare(a.name))}function M(t,n,a={}){const o={name:t,instructions:n,instructionCount:n.length,steps:[],temporaryVariables:ht(n),registers:t==="Two Address"?"R1":t==="One Address"?"AC":t==="Zero Address"?"Stack":"None",finalResult:""};if(o.temporaryVariables.length===0&&o.temporaryVariables.push("None"),t==="Three Address"){const s=new Map;for(const r of n){const l=r.indexOf("=");if(l===-1)continue;const e=r.substring(0,l),i=r.substring(l+1);if(i.length<3)continue;const p=i[0],u=i[1],d=i.substring(2),m=T(p,s,a),c=T(d,s,a);let h=0;switch(u){case"+":h=m+c;break;case"-":h=m-c;break;case"*":h=m*c;break;case"/":h=c===0?0:Math.trunc(m/c);break}s.set(e,h);const $=k(s);o.steps.push({instruction:r,result:`${e} = ${h}`,state:$}),e.startsWith("t")&&(o.finalResult=`${e} = ${h}`)}}else if(t==="Two Address"){let s=0;const r=new Map;for(const l of n){const e=l.split(" "),i=e[0],p=e[1]||"";if(i==="MOV"){const d=p.indexOf(",");if(d===-1)continue;const m=p.substring(0,d),c=p.substring(d+1),h=c==="R1"?s:T(c,r,a);m==="R1"?s=h:r.set(m,h)}else if(i==="ADD"||i==="SUB"||i==="MUL"||i==="DIV"){const d=p.indexOf(",");if(d===-1)continue;const m=p.substring(d+1),c=m==="R1"?s:T(m,r,a);switch(i){case"ADD":s+=c;break;case"SUB":s-=c;break;case"MUL":s*=c;break;case"DIV":s=c===0?0:Math.trunc(s/c);break}}const u=k(r);o.steps.push({instruction:l,result:`R1 = ${s}`,state:u})}o.steps.length>0&&(o.finalResult=`R1 = ${s}`)}else if(t==="One Address"){let s=0;const r=new Map;for(const l of n){const e=l.split(" "),i=e[0],p=e[1]||"";if(i==="LOAD")s=T(p,r,a);else if(i==="ADD"||i==="SUB"||i==="MUL"||i==="DIV"){const d=T(p,r,a);switch(i){case"ADD":s+=d;break;case"SUB":s-=d;break;case"MUL":s*=d;break;case"DIV":s=d===0?0:Math.trunc(s/d);break}}else i==="STORE"&&r.set(p,s);const u=k(r);o.steps.push({instruction:l,result:`AC = ${s}`,state:u})}o.steps.length>0&&(o.finalResult=`AC = ${s}`)}else if(t==="Zero Address"){const s=[],r=new Map;for(const l of n){const e=l.split(" "),i=e[0],p=e[1]||"";if(i==="PUSH"){const d=T(p,r,a);s.push(d)}else if(i==="POP"){if(s.length>0){const d=s.pop();r.set(p,d)}}else if((i==="ADD"||i==="SUB"||i==="MUL"||i==="DIV")&&s.length>=2){const d=s.pop(),m=s.pop();let c=0;switch(i){case"ADD":c=m+d;break;case"SUB":c=m-d;break;case"MUL":c=m*d;break;case"DIV":c=d===0?0:Math.trunc(m/d);break}s.push(c)}const u=k(r);o.steps.push({instruction:l,result:`Stack updated: [${s.join(", ")}]`,state:u,stackSnapshot:[...s]})}o.steps.length>0&&(o.finalResult=`Stack top = ${s.length>0?s[s.length-1]:"-"}`)}return o}function tt(t,n={}){const a=(t||"").trim();if(!a)return{success:!1,error:"Please enter an expression."};if(!et(a))return{success:!1,error:"Invalid expression. Use lowercase operands a-z, operators + - * /, and balanced parentheses."};const o=lt(a),s=st(a),r=dt(o),l=ut(o),e=pt(o),i=mt(o),p=M("Three Address",r,n),u=M("Two Address",l,n),d=M("One Address",e,n),m=M("Zero Address",i,n),c=[p,u,d,m],h=[{name:"Three Address",instructionCount:r.length,registers:"None",temporaryVariables:p.temporaryVariables.join(", "),finalResultType:"Intermediate variable (tX)"},{name:"Two Address",instructionCount:l.length,registers:"R1",temporaryVariables:u.temporaryVariables.join(", "),finalResultType:"R1 register"},{name:"One Address",instructionCount:e.length,registers:"AC",temporaryVariables:d.temporaryVariables.join(", "),finalResultType:"AC register"},{name:"Zero Address",instructionCount:i.length,registers:"Stack",temporaryVariables:m.temporaryVariables.join(", "),finalResultType:"Stack top"}];return{success:!0,expression:a,postfix:o,variables:s,formats:c,comparisonRows:h}}function yt(){gt(),ft(),vt()}function gt(){const t=document.getElementById("numFromBase"),n=document.getElementById("numToBase"),a=document.getElementById("numInputVal"),o=document.getElementById("numConvertBtn"),s=document.getElementById("numResetBtn"),r=document.getElementById("numErrorBanner"),l=document.getElementById("numResultPanel"),e=document.getElementById("numAnswerVal"),i=document.getElementById("numStepsContainer"),p=document.getElementById("numWhatHappened"),u=document.getElementById("numHow"),d=document.getElementById("numWhy");if(!o||!a||!t||!n)return;function m(){const c=a.value,h=t.value,$=n.value,b=ot(c,h,$);if(!b.success){r&&(r.textContent=b.error,r.classList.add("active")),l&&l.classList.remove("active");return}r&&(r.classList.remove("active"),r.textContent=""),l&&l.classList.add("active"),e&&(e.textContent=b.answerText),i&&(i.innerHTML=b.stepsHtml),b.explanation&&(p&&(p.textContent=b.explanation.whatHappened),u&&(u.textContent=b.explanation.how),d&&(d.textContent=b.explanation.why))}o.addEventListener("click",m),a.addEventListener("keydown",c=>{c.key==="Enter"&&(c.preventDefault(),m())}),s==null||s.addEventListener("click",()=>{t.value="binary",n.value="decimal",a.value="101101",m()}),document.querySelectorAll("#secNumberSystems .coa-preset-btn, .coa-preset-btn[data-from]").forEach(c=>{c.addEventListener("click",()=>{const h=c.getAttribute("data-from"),$=c.getAttribute("data-to"),b=c.getAttribute("data-val");h&&(t.value=h),$&&(n.value=$),b&&(a.value=b),m()})}),t.addEventListener("change",()=>{switch(t.value){case"binary":a.placeholder="e.g. 101101 (only 0 and 1)";break;case"decimal":a.placeholder="e.g. 45 (digits 0 to 9)";break;case"octal":a.placeholder="e.g. 55 (digits 0 to 7)";break;case"hexadecimal":a.placeholder="e.g. 2D or FF (digits 0-9, A-F)";break}}),m()}function ft(){const t=document.getElementById("expression"),n=document.getElementById("validateBtn"),a=document.getElementById("generateBtn"),o=document.getElementById("resetBtn"),s=document.getElementById("messageBox"),r=document.getElementById("variableSection"),l=document.getElementById("variableInputs"),e=document.getElementById("results"),i=document.getElementById("postfixValue"),p=document.getElementById("variablesValue"),u=document.getElementById("formatCards"),d=document.getElementById("comparisonTableBody"),m=document.querySelectorAll(".coa-expr-preset-btn");if(!t||!n)return;function c(f,g){s&&(s.className=`coa-error-banner alert-${g}`,g==="danger"?(s.style.borderColor="rgba(239, 68, 68, 0.4)",s.style.color="#f87171",s.style.backgroundColor="rgba(239, 68, 68, 0.08)"):(s.style.borderColor="rgba(52, 211, 153, 0.4)",s.style.color="#34d399",s.style.backgroundColor="rgba(16, 185, 129, 0.08)"),s.textContent=f,s.classList.remove("d-none"))}function h(){s&&(s.className="coa-error-banner d-none",s.textContent="")}function $(){t.value="",r&&r.classList.add("d-none"),l&&(l.innerHTML=""),e&&e.classList.add("d-none"),h(),m.forEach(f=>f.classList.remove("active"))}function b(){const f={};return document.querySelectorAll("[data-variable-input]").forEach(g=>{const E=g.dataset.variableInput,I=Number(g.value);f[E]=Number.isNaN(I)?1:I}),f}function y(f){if(!(!l||!r)){if(l.innerHTML="",!f||!f.length){r.classList.add("d-none");return}r.classList.remove("d-none"),f.forEach(g=>{const E=document.createElement("div");E.className="coa-var-input-box",E.innerHTML=`
        <label class="coa-var-input-label" for="var_input_${g}">${g} =</label>
        <input type="number" id="var_input_${g}" class="coa-input" data-variable-input="${g}" value="1" min="0" style="padding: 0.5rem 0.75rem;" />
      `,E.querySelector("input").addEventListener("input",()=>{R()}),l.appendChild(E)})}}function C(f){if(!f.success){c(f.error,"danger"),e&&e.classList.add("d-none");return}i&&(i.textContent=f.postfix||"—"),p&&(p.textContent=f.variables.join(", ")||"None"),u&&(u.innerHTML="",f.formats.forEach(g=>{const E=document.createElement("div");E.className="coa-format-card",E.innerHTML=`
          <div class="coa-format-card-header">
            <h3 class="coa-format-title">${g.name}</h3>
            <span class="coa-format-badge">${g.instructionCount} instructions</span>
          </div>
          <div>
            <strong style="font-size: 0.82rem; color: var(--text-muted); font-family: var(--font-mono); text-transform: uppercase;">Generated Instructions:</strong>
            <pre class="coa-instructions-box">${g.instructions.join(`
`)}</pre>
          </div>
          <div>
            <strong style="font-size: 0.82rem; color: var(--text-muted); font-family: var(--font-mono); text-transform: uppercase;">Step-by-Step Simulation:</strong>
            <div class="coa-simulation-steps-wrap" style="margin-top: 0.5rem;">
              ${g.steps.map(I=>`
                <div class="coa-sim-step-item">
                  <span class="coa-sim-step-inst">${I.instruction}</span>
                  <span class="coa-sim-step-res">${I.result}</span>
                  <span class="coa-sim-step-state">${I.state.map(S=>`${S.name}=${S.value}`).join(", ")||"State cleared"}</span>
                </div>
              `).join("")}
            </div>
          </div>
          <div class="coa-format-meta-footer">
            <p><strong>Registers / Stack:</strong> ${g.registers}</p>
            <p><strong>Temporary Variables:</strong> ${g.temporaryVariables.join(", ")}</p>
            <p><strong>Final Result:</strong> <span style="color: #38bdf8; font-weight: 700;">${g.finalResult}</span></p>
          </div>
        `,u.appendChild(E)})),d&&(d.innerHTML="",f.comparisonRows.forEach(g=>{const E=document.createElement("tr");E.innerHTML=`
          <td>${g.name}</td>
          <td><span class="coa-format-badge">${g.instructionCount} instructions</span></td>
          <td>${g.registers}</td>
          <td>${g.temporaryVariables}</td>
          <td><strong style="color: #38bdf8;">${g.finalResultType}</strong></td>
        `,d.appendChild(E)})),e&&e.classList.remove("d-none"),c("Expression validated and simulated successfully.","success")}function R(){const f=t.value.trim();if(!f)return;const g=b(),E=tt(f,g);E.success&&C(E)}function w(f=!1){const g=t.value.trim();if(!g){c("Please enter an expression.","danger");return}if(!et(g)){y([]),e&&e.classList.add("d-none"),c("Invalid expression. Use lowercase operands a-z, operators + - * /, and balanced parentheses.","danger");return}const E=b(),I=st(g);y(I),Object.keys(E).forEach(U=>{const P=document.querySelector(`[data-variable-input="${U}"]`);P&&(P.value=E[U])});const S=b(),L=tt(g,S);L.success?C(L):(y([]),e&&e.classList.add("d-none"),c(L.error,"danger"))}n==null||n.addEventListener("click",()=>w(!0)),a==null||a.addEventListener("click",()=>w(!1)),o==null||o.addEventListener("click",$),t==null||t.addEventListener("keydown",f=>{f.key==="Enter"&&(f.preventDefault(),w(!1))}),m.forEach(f=>{f.addEventListener("click",()=>{m.forEach(E=>E.classList.remove("active")),f.classList.add("active");const g=f.getAttribute("data-expr");g&&(t.value=g,w(!1))})}),w(!1)}function vt(){const t=new ct("LOAD R1, 5");let n=null;const a=document.getElementById("customInstInput"),o=document.getElementById("loadCustomInstBtn"),s=document.getElementById("instErrorBanner"),r=document.querySelectorAll("#secCpuSimulator .coa-preset-btn, .coa-presets-wrap .coa-preset-btn[data-inst]"),l=document.getElementById("instDesc"),e=document.getElementById("cpuPrevBtn"),i=document.getElementById("cpuNextBtn"),p=document.getElementById("cpuPlayBtn"),u=document.getElementById("cpuPlayIcon"),d=document.getElementById("cpuPlayText"),m=document.getElementById("cpuResetBtn"),c=document.getElementById("cpuStepBadge"),h=document.getElementById("cpuPhaseName"),$=document.getElementById("comp-memory"),b=document.getElementById("comp-cu"),y=document.getElementById("comp-reg"),C=document.getElementById("comp-alu"),R=document.getElementById("comp-result"),w=document.getElementById("arrow-fetch"),f=document.getElementById("arrow-decode"),g=document.getElementById("arrow-execute"),E=document.getElementById("arrow-store"),I=document.getElementById("val-mem-inst"),S=document.getElementById("val-cu-status"),L=document.getElementById("val-r1"),U=document.getElementById("val-pc"),P=document.getElementById("val-ir"),N=document.getElementById("val-alu-status"),F=document.getElementById("val-result-status"),X=document.getElementById("stripPc"),G=document.getElementById("stripIr"),z=document.getElementById("stripR1"),W=document.getElementById("stripStatus"),_=document.getElementById("cpuWhatHappening"),Y=document.getElementById("cpuWhy"),Z=document.getElementById("cpuResultText");if(!i||!a)return;function A(){const v=t.getCurrentState();if(c&&(c.textContent=v.stepNumber===0?"READY":`STEP ${v.stepNumber} / 4`),h&&(h.textContent=v.phase),e&&(e.disabled=t.currentStepIndex<0),i&&(i.disabled=t.isComplete(),i.textContent=t.isComplete()?"COMPLETE ✓":"NEXT STEP ▶"),[$,b,y,C,R].forEach(x=>x==null?void 0:x.classList.remove("active")),[w,f,g,E].forEach(x=>x==null?void 0:x.classList.remove("active")),v.activeComponent){const x=document.getElementById(v.activeComponent);x==null||x.classList.add("active")}if(v.activeArrow){const x=document.getElementById(v.activeArrow);x==null||x.classList.add("active")}I&&(I.textContent=t.instruction.assembly),L&&(L.textContent=v.state.r1),U&&(U.textContent=v.state.pc),P&&(P.textContent=v.state.ir),S&&(S.textContent=v.phase==="DECODE"?`Decoded: ${t.instruction.opcode} | Ready to route`:`Status: ${v.phase==="READY"?"Idle":"Active"}`),N&&(v.phase==="EXECUTE"?N.textContent=v.state.status||"Computing...":N.textContent="Operation: Ready"),F&&(v.phase==="STORE"?F.textContent=v.state.status||"Completed":F.textContent="Waiting for execution cycle to complete."),X&&(X.textContent=v.state.pc),G&&(G.textContent=v.state.ir),z&&(z.textContent=v.state.r1),W&&(W.textContent=v.state.status),_&&(_.textContent=v.whatIsHappening),Y&&(Y.textContent=v.why),Z&&(Z.textContent=v.result)}function O(){n&&(clearInterval(n),n=null),u&&(u.textContent="▶"),d&&(d.textContent="PLAY")}function nt(){n?O():(t.isComplete()&&(t.reset(),A()),u&&(u.textContent="⏸"),d&&(d.textContent="PAUSE"),n=setInterval(()=>{const v=t.nextStep();A(),v||O()},1400))}function j(v){O();const x=t.loadInstruction(v);return x.success?(s&&(s.classList.remove("active"),s.textContent=""),a&&(a.value=t.instruction.assembly),r.forEach(V=>{(V.getAttribute("data-inst")||V.textContent).trim().toUpperCase()===t.instruction.assembly.toUpperCase()?V.classList.add("active"):V.classList.remove("active")}),l&&t.instruction.description&&(l.textContent=t.instruction.description),A(),!0):(s&&(s.textContent=x.error,s.classList.add("active")),!1)}i==null||i.addEventListener("click",()=>{O(),t.nextStep(),A()}),e==null||e.addEventListener("click",()=>{O(),t.prevStep(),A()}),p==null||p.addEventListener("click",nt),m==null||m.addEventListener("click",()=>{O(),t.reset(),A()}),o==null||o.addEventListener("click",()=>{a&&j(a.value.trim())}),a==null||a.addEventListener("keydown",v=>{v.key==="Enter"&&(v.preventDefault(),j(a.value.trim()))}),r.forEach(v=>{v.addEventListener("click",()=>{const x=v.getAttribute("data-inst")||v.textContent.trim();j(x)})}),A()}export{yt as i};
