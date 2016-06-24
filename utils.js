var _ = require('lodash');
var fs = require('fs');
var utils = {};

utils.coordinatingConjugater = function(input){
    return _.trimEnd(_.reduce(_.compact(sentenceAnalyser(input.sentences)), sentenceReducer, ''));
}

var sentenceAnalyser = function (sentences) {
  var analysedSentences = [];
  sentences.forEach(function(element,index,arr){
      if(analysedSentences[index-1]){
        if(element.subject.noun == arr[index-1].subject.noun && element.verb == arr[index-1].verb){
          element.object.noun = arr[index-1].object.noun.concat(element.object.noun);
          analysedSentences[index-1] = 0;
        }
      }
      analysedSentences.push(element);
    });
    return analysedSentences;
}

var sentenceReducer = function(paragraph, sentence){
    var obj = sentence.object.noun;
    obj = [obj, obj.splice(obj.length-2, 2)];
    if(obj[1].length == 2){
      obj[1].splice(obj[1].length-1, 0, "and");
    }
    return paragraph + sentenceFormatter(sentence.subject.noun,sentence.verb, obj, sentence.fullstop);
};

var sentenceFormatter = function(noun, verb, object, fullstop){
  return _.flattenDeep(_.compact([noun, verb, addPrefix(object[0],',').join(' '), object[1]])).join(' ') + fullstop + ' ';
};

var addPrefix = function(array, prefix) {
  return _.map(array, function(element) {
    return element + prefix;
  });
}

utils.jsonParser = function(filename) {
  return JSON.parse(fs.readFileSync(filename,'utf-8'));
}

exports.utils = utils;
