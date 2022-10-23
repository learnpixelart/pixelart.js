
function parseCsv( str ) {
  const lines = str.split( /\r?\n/ );
  let rows = [];

  for( let line of lines ) {
      line = line.trim();

      // skip empty & comment lines
      if( line.length === 0 || line.startsWith('#') ) {
         continue;
      }
      values = line.split(',');

      values = values.map( val => val.trim() );
      // console.log( values );

      rows.push( values );
  }

  return rows
}



class Record {

  static build( headers, values ) {
    let rec = {};   // todo/check: use Object.create( null ) - no prototype for object - why? why not?
    for(let i=0; i < headers.length; i++ ) {
       // note: if row value is missing, make default empty string (NOT null)!!!
       //   all values should be strings for now
       //  todo/check: double check / assert - why? why not?
       rec[ headers[i] ] = values[i] || '';
    }
    return new Record( rec );
  }



  constructor( source ) {
    if( Array.isArray( source )) {
      Object.assign( this, Object.fromEntries( source ));
    } else {
      // default - assume source is an object already
     Object.assign( this, source );
    }
  }

  get values()  { return Object.values( this ); }
  get keys()    { return Object.keys( this ); }
  get entries() { return Object.entries( this ); }
}



function rowsToRecs( rows ) {

  let recs = [];

  // convert recs to array of objects (key/value pairs)
  const headers = rows[0];
  for (let i=1; i < rows.length; i++) {
   const row = rows[i];
   let rec = Record.build( headers, row );
   recs.push( rec );
  }

  return recs;
}



function rowsToRecsOld( rows ) {

  let recs = [];

  // convert recs to array of objects (key/value pairs)
  const headers = rows[0];
  for (let i=1; i < rows.length; i++) {
   const row = rows[i];
   let rec = {};   // todo/check: use Object.create( null ) - no prototype for object - why? why not?
   for(let j=0; j < headers.length; j++ ) {
      // note: if row value is missing, make default empty string (NOT null)!!!
      //   all values should be strings for now
      //  todo/check: double check / assert - why? why not?
      rec[ headers[j] ] = row[j] || '';
   }
   recs.push( rec );
  }

  return recs;
}




// change/rename to Table/Tabular/etc. or such - why? why not?
class Dataset {


static async readCsv( ...urls ) {
     let recs = [];

     for( const url of urls ) {
        // get csv records
        const res = await fetch( url );
        // console.log( res );

        const text = await res.text();
        // console.log( text );
        const rows = parseCsv( text );
        const more_recs = rowsToRecs( rows );
        recs = recs.concat( more_recs );   // check if there's a better way to add (in-place?) two arrays
     }

      return new Dataset( recs );
 }

 static parseCsv( ...texts ) {
       let recs = [];

       for( const text of texts ) {
         // console.log( text );
         const rows = parseCsv( text );
         const more_recs = rowsToRecs( rows );
         recs = recs.concat( more_recs );   // check if there's a better way to add (in-place?) two arrays
       }
      return new Dataset( recs );
 }


 constructor( recs ) {
   console.log( "[Dataset]", recs.length, "record(s)" );
   this.recs   = recs;
   // console.log( recs );
}

 // add get helper e.g.  dataset.get(0) or such
 //                        same as dataset.recs[0]  - why? why not?
  get( idx ) { return this.recs[ idx]; }

  get length() { return this.recs.length; }
  get size() { return this.recs.length; }


  map( func ) {
    let recs = [];
    for( let rec of this.recs ) {
        let obj = func( rec );
        // note: wrap (javascript) objects into Record objects
        recs.push( new Record( obj ) );
    }
    return new Dataset( recs );
  }


  except( ...keys ) {
    // remove keys
    let recs = [];
    for( let rec of this.recs ) {
        let obj = {};
        for( let [k,v] of Object.entries( rec ) ) {
            if( keys.includes( k )) {
              // skip key; do nothing
            }
            else {
              obj[k]=v;
            }
        }
        // note: wrap (javascript) objects into Record objects
        recs.push( new Record( obj ) );
    }
    return new Dataset( recs );
  }
}
