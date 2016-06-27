var _ = require('lodash');
var fs = require('fs');
var utils = {};

utils.coordinatingConjugater = function(input){
    return _.trim(_.reduce(_.compact(sentenceAnalyser(input.sentences)), sentenceMaker, ''));
}

var sentenceAnalyser = function (sentences) {
    var analysedSentences = [];
    sentences.forEach(function(sentence,index){
      var indexOfExistingSentence = getIndexOfExistSentence(analysedSentences, sentence);
      if(indexOfExistingSentence < 0)
        analysedSentences.push(sentence);
      else
        analysedSentences[indexOfExistingSentence].object.noun.push(sentence.object.noun[0]);
    });
    return analysedSentences;
}

var getIndexOfExistSentence = function(analysedSentences, sentence){
    return _.reduce(analysedSentences, function(resultIndex, element, index){
      if(_.isEqual(element.subject.noun, sentence.subject.noun) && _.isEqual(element.verb, sentence.verb))
        return index;
      return resultIndex;
    }, -1);
}

var sentenceMaker = function(paragraph, sentence){
    var obj = sentence.object.noun;
    var last = obj.pop();
    obj = obj.length ? obj.join(', ').concat(" and " + last) : last;
    return paragraph + ' ' + sentenceFormatter(sentence.subject.noun,sentence.verb, obj, sentence.fullstop);
};

var sentenceFormatter = function(noun, verb, object, fullstop){
  return [noun, verb, object].join(' ') + fullstop;
};

utils.jsonParser = function(filename) {
  return JSON.parse(fs.readFileSync(filename,'utf-8'));
}

exports.utils = utils;
