/* description: Parses and executes english statements. */

/* lexical grammar */
%lex
%%

\s+                                                  /* skip whitespace */
('Ram'|'Sita'|'tea'|'coffee'|'butter'|'cheese'|'biscuits')          return 'NOUN'
('He'|'She'|'It')                                    return 'PRONOUN'
('likes'|'hates')                                    return 'VERB'
('also')                                             return 'ADVERB'
"."                                                  return 'FULLSTOP'
<<EOF>>                                              return 'EOF'

/lex

%start PARAGRAPH

%% /* language grammar */

PARAGRAPH: EOF
        { console.log("Provide text file to translate."); return $1; }
      | SENTENCES EOF
        {return {'sentences':$1};}
      ;
SENTENCES: SENTENCE
          {$$ = [$1];}
        | SENTENCES SENTENCE
          {$$ = $1.concat([$2]);}
        ;
SENTENCE: SUBJECT VERB FULLSTOP
        {$$ = {'subject':$1, 'verb':$2, 'fullstop':$3};}
      | SUBJECT VERB OBJECT FULLSTOP
        {$$ = {'subject':$1, 'verb':$2, 'object':$3, 'fullstop':$4};}
      | SUBJECT ADVERB VERB OBJECT FULLSTOP
        {$$ = {'subject':$1, 'adverb':$2, 'verb':$3, 'object':$4, 'fullstop':$5};}
      ;
SUBJECT: NOUN
        {$$ = {'noun':$1}}
      | PRONOUN
        {$$ = {'pronoun':$1}}
      ;
OBJECT: NOUN
        {$$ = {'noun':[$1]}}
      | PRONOUN
        {$$ = {'pronoun':$1.toLowerCase()}}
      ;
