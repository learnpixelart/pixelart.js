


function random( max, exclude=[] ) {
  // e.g. random( 3 ) =>  results in 0,1,2
  //  note: retry if num(ber) already in exclude array (sample)
  let num;
  do {
    num = Math.floor( Math.random() * max );
  } while(  exclude.includes( num ) );
  return num;
}



class Quiz {

constructor( col ) {
   this.col = col;

   // console.log( "[Quiz]", this.col );

   this.rounds = 0;
   this.locked = true;

   console.log( "[Quiz]", this.col.recs.length, "record(s)" );


   this.ids_by_attributes = new Map();
    for (let i=0; i < this.col.recs.length; i++) {
       let rec = this.col.recs[i];
       console.log( "rec", rec );

       // remove all empty strings
       let values = Object.values(rec);
       values = values.filter( val => val != "" );

       const count = values.length;
       // "simulate"   ids_by_attributes[ count] ||= []
       this.ids_by_attributes.set( count, this.ids_by_attributes.get( count ) || [] );
       let ids =  this.ids_by_attributes.get( count );
       ids.push( i );
     }

    console.log( this.ids_by_attributes );

    // check no. of attributes
    //    incl. all with 4+ ids
    // e.g. from 1 to 7  (not drop 8 attributes - only one punk)
    this.attrib_counts = [];

    for( let [key,val] of this.ids_by_attributes ) {
      let attrib_count = val.length;
      if( attrib_count >= 4 ) {
        console.log( "adding " + key + " with count " + attrib_count );
         this.attrib_counts.push( key );
      } else {
         console.log( "WARN: skipping attribute "+ key + " with count " + attrib_count );
      }
    }

    console.log( this.attrib_counts );
    this.attrib_counts = this.attrib_counts.sort();
    console.log( this.attrib_counts );
}



   nextQuestion() {
    this.locked = false;

 this.attribs = this.attrib_counts[ random( this.attrib_counts.length ) ];
 console.log( "pick image w/", this.attribs, "attribs" );

 const attrib_ids = this.ids_by_attributes.get( this.attribs );

 // el.innerText = `Images w/ ${attribs-1} attribute(s) - ${attrib_ids.length} max.`;

 this.rounds += 1;

 // note: pass in drawn lucky numbers (to avoid duplicates!!)
 let nums = [];
 let max = attrib_ids.length;
 nums.push( random( max, nums ) );
 nums.push( random( max, nums ) );
 nums.push( random( max, nums ) );
 nums.push( random( max, nums ) );

 this.ids = [
    attrib_ids[ nums[0] ],
    attrib_ids[ nums[1] ],
    attrib_ids[ nums[2] ],
    attrib_ids[ nums[3] ],
           ];

 this.answer = random( 4 );
}


static ANSWER_LABELS =  ['A', 'B', 'C', 'D'];

// make is_locked into a get property - why? why not?
is_locked()         { return this.locked; }

is_answer( val )   {
  return val == Quiz.ANSWER_LABELS[ this.answer ];
 }



  drawA( sel, zoom=1 ) { this.col.composite.drawCanvas( this.ids[0], sel, zoom ); }
  drawB( sel, zoom=1 ) { this.col.composite.drawCanvas( this.ids[1], sel, zoom ); }
  drawC( sel, zoom=1 ) { this.col.composite.drawCanvas( this.ids[2], sel, zoom ); }
  drawD( sel, zoom=1 ) { this.col.composite.drawCanvas( this.ids[3], sel, zoom ); }



  get question()  {
    const answer_id = this.ids[ this.answer ];

      // remove all empty strings
     let values = Object.values(this.col.recs[ answer_id ] );
     values = values.filter( val => val != "" );

     const text = values.join( ' • ' );
     console.log( "text", text );
     return text;
  }

   get debug()  {
      // debug text
     const attrib_ids = this.ids_by_attributes.get( this.attribs );
     const text = `Images w/ ${this.attribs-1} attribute(s) - ${attrib_ids.length} max.`;
     return text;
   }
}

