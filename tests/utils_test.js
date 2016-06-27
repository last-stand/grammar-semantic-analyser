var utils = require('../utils').utils;
var expect = require('chai').expect;

var sampleParsedData = utils.jsonParser('tests/testData.json');


describe('| Semantic Analyser |',function(){
  	beforeEach(function(){
  	});

  	describe(" #should merge similar sentences using 'and' in compound object",function(){
  		it("should return 'Ram likes tea and coffee. Ram hates butter and cheese.'",function(done){
         expect(utils.coordinatingConjugater(sampleParsedData[0])).to.equal("Ram likes tea and coffee. Ram hates butter and cheese.");
         done();
  		})
    });

    describe(" #should merge similar sentences using ',' and 'and' in compound objects",function(){
      it("should return 'Ram likes tea, coffee and biscuits. Ram hates butter and cheese.'",function(done){
         expect(utils.coordinatingConjugater(sampleParsedData[1])).to.equal("Ram likes tea, coffee and biscuits. Ram hates butter and cheese.");
         done();
  		})

      it("should return 'Ram likes sita, tea and coffee. Sita likes Ram. Ram hates butter and cheese.'",function(done){
         expect(utils.coordinatingConjugater(sampleParsedData[2])).to.equal("Ram likes Sita, tea and coffee. Sita likes Ram. Ram hates butter and cheese.");
         done();
  		})
    })

    describe(" #should merge similar sentences which has 'also' using ',' and 'and' in compound objects",function(){
      it("should return 'Ram likes Sita and coffee. Ram hates butter and cheese. Sita likes Ram.'",function(done){
         expect(utils.coordinatingConjugater(sampleParsedData[3])).to.equal("Ram likes Sita and coffee. Ram hates butter and cheese. Sita likes Ram.");
         done();
  		})
    });

    describe(" #should throw Semantic Error if 'also' appeared before context",function(){
      it("should throw Semantic Error on 'Ram also likes Sita.'",function(done){
          var SemanticError = new utils.SemanticError("Ram also likes Sita.<- also appeared before context.", "SEMANTIC ERROR")
          var testFunction =function(){
            utils.coordinatingConjugater(sampleParsedData[4]);
          }
          expect(testFunction).to.throw(SemanticError);
          done();
  		})
    });
});
