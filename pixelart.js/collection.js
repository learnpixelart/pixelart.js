


class Collection {

   static async read( img_src, ...dataset_urls ) {
       let composite = await ImageComposite.read( img_src );
       let dataset  = await Dataset.readCsv( ...dataset_urls );

      return new Collection( composite, dataset );
   }

   constructor( composite, dataset ) {
      this.composite = composite;   // todo/check: rename to image - why? why not?
      this.dataset =  dataset;
    // console.log( dataset.recs );
    console.log( "[Collection]", this.dataset.recs.length, "record(s)" );
   }

   // convenience shortcut (forward) helpers
   get recs() { return this.dataset.recs; }
}

