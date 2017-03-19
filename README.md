### What?

Loading comic content from my favorite web comics, uncluttered, in one page. Because lazy. This should never be under an IFD; Total and absolute respect for the content creators, especially Randall; By the way, his books are amazing. Go get them!

### Todo

* Latest? Random? Both? Some comics offer an endpoint to pull a random one
* Alright alright it (kind of) works. Refactor now
* Add more comics? Plug n' play with minimum customization to the regex / logic?
* Missing comics / numbers in URL numbering logic?

### (Talking to myself) So did you do this to save a few clicks?

...That's a loaded question.

### Tech

* [Node.JS](https://nodejs.org/en/)
* [Express](https://expressjs.com/)
* [Request](https://www.npmjs.com/package/request)
* [jQuery](https://jquery.com/)

### Routes
* /xkcd
* /pbf
* /cah (Cyanide & Happiness)
* /goose (Abstruse Goose)
* /spikedmath (Spiked Math)
* /smbc
* / (Serving the above)
* /comics (List of links to the comics, read from comics.json)

### Params
(At the moment only present for XCKD)
If "r" is set to 1, returns random
If "pretty" is set to 1, returns html rendered image

### Who?
Stefanos Kiourkoulis [GH](https://github.com/stefkiourk), [Web](https://stefki.com)
