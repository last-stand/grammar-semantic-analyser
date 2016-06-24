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
    })
});
