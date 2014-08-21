# History

## 1.3

* Implement `email`, `intNumber` and `floatNumber` predicates. Thanks to [Rodrigo González][rodrigo].
* Infinity is not a number.
* Implement `defined` and `nulled`. Thanks to [Alejandro Villanueva][ialex].
* Speculatively fix conflict with angular-mocks.

## 1.2

* Implement `not` modifier.
* Implement `gitUrl` predicate. Thanks to [Gal Niv][galniv].

## 1.1

* Replace `check.maybe.verify.xxx` with `check.verify.maybe.xxx`.

## 1.0

* API overhaul:
    * Predicates exported as `check.xxx` rather than `check.isXxx`.
    * Verifiers exported as `check.verify.xxx` rather than `check.verifyXxx`. Thanks to [Marc-Olivier Ricard][marcolivier].
* Unit tests added for error messages.

## 0.8

* Added `isWebUrl` and `verifyWebUrl`. Thanks to [Gleb Bahmutov][gleb].

## 0.7

* Added `check.maybe` modifier. Thanks to [Marc-Olivier Ricard][marcolivier].
* Added `check.map`, `check.every` and `check.any` batch operations. Thanks to [Marc-Olivier Ricard][marcolivier].
* Harmonised the node and browser unit tests.

[marcolivier]: https://github.com/ricardmo
[gleb]: https://github.com/bahmutov
[galniv]: https://github.com/galniv
[rodrigo]: https://github.com/roro89
[ialex]: https://github.com/ialex

