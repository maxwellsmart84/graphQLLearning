function duplicateEncode(word){
  const lowecaseWord = word.toLowerCase();
  const characters = lowecaseWord.split();
  let count = 0;
  const answer = characters.reduce((acc, item) => {
   const returnValue = [];
   console.log('wtf', returnValue)
     if(acc && acc === item) {
         count ++
         if (count > 1) {
          returnValue.push('(')
           count = 0;
          } else {
           returnValue.push(')')
          }
    }
    return returnValue;
  })
  return answer;
};

const thing = duplicateEncode('tests');
console.log('answer!', thing)