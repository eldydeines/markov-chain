/** Textual markov chain generator */


class MarkovMachine {

  /** build markov machine; read in text.*/

  constructor(text) {
    let words = text.split(/[ \r\n]+/);
    this.words = words.filter(c => c !== "");
    this.chains = this.makeChains();
  }

  /** set markov chains:
   *
   *  for text of "the cat in the hat", chains will be
   *  {"the": ["cat", "hat"], "cat": ["in"], "in": ["the"], "hat": [null]} */

  makeChains() {

    let chains = {};

    for (let word in this.words) {

      if (!chains[`${this.words[word]}`]) {

        chains[`${this.words[word]}`] = this.words.filter(function (val, i, ary) {
          return val != ary[word] && ary[i - 1] == ary[word];
        });

      }//end if

      if (chains[`${this.words[word]}`] == []) {
        chains[`${this.words[word]}`] = null;
      }
      else {
        let tempAry = chains[`${this.words[word]}`];
        chains[`${this.words[word]}`] = [...new Set(tempAry)];
      }

    }//end for

    return chains;

  }


  /** return random text from chains */

  makeText(numWords = 100) {

    let rand = Math.floor(Math.random() * this.words.length);
    let key = this.words[rand];
    let chain = key;
    let i = true;

    while (i == true && key !== null) {

      if (!this.chains[key]) {
        return chain.replace(" undefined", "");
      }
      else {
        rand = Math.floor(Math.random() * this.chains[key].length);
        chain += " " + this.chains[key][rand];
        key = this.chains[key][rand];
      }//end if/else

    }//end while

  }//end makeText

}

module.exports = { MarkovMachine };