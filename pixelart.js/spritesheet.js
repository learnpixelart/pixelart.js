

class Spritesheet {

   constructor( composite, dataset ) {
     this.composite   = composite;
     this.names       = this._build_names( dataset );
   }

   get tileWidth()  { return this.composite.tileWidth; }
   get tileHeight() { return this.composite.tileHeight; }



   _build_names( dataset ) {
      // assume text records in comma-separated values (.csv)
      // e.g.
      //   id, name (or names?)
      //   0, Male 1
      //   1, Male 2
      //   ...
      //   11, Rosy Cheeks (m)

      let names = {};
      for( let rec of dataset.recs ) {
         let id = parseInt( rec['id'] );

         // note: allow more than one name  (split by pipe e.g. |)
         //     Marc 2 | Marc Mid  |  Marc Medium
         let values = (rec['name'] || rec['names']).split('|');
         for( let name of values) {
            name = this._norm_name( name );
            names[ name ] = id;
         }
     }

      return names;
   }

  _norm_name( str ) {
    str = str.toLowerCase();
    str = str.replaceAll( /[ _-]/ig, '' );
    console.log( str );
    return str;
  }



  _find_num( name ) {
    let num =  this.names[ this._norm_name( name ) ];
    return num;
  }

  drawCanvas( name, sel, zoom=1 ) {
    let num =  this._find_num( name );
    this.composite.drawCanvas( num, sel, zoom );
  }

  pasteCanvas( name, sel, zoom=1 ) {
    let num =  this._find_num( name );
    this.composite.pasteCanvas( num, sel, zoom );
  }

  drawCtx( name, ctx, zoom=1 ) {
    let num =  this._find_num( name );
    this.composite.drawCtx( num, ctx, zoom );
  }

  pasteCtx( name, ctx, zoom=1 ) {
    let num =  this._find_num( name );
    this.composite.pasteCtx( num, ctx, zoom );
  }



// find a better name e.g. fill/update/build or such - why? why not?
  drawSprites( sel='span.sprite', zoom=1 ) {
    // note: use onload (async) callback to wait for (required) image download to complete
     let els = document.querySelectorAll( sel );
      // console.log( els );

       for( let el of Array.from( els ) ) {
         let name = el.dataset.name;
         console.log( name );

         let canvas = document.createElement( 'canvas' );

         this.drawCanvas( name, canvas, zoom );

         el.appendChild( canvas );
       }
       console.log( "done Spritesheet.drawSprites()" );
      }
}


