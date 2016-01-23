package base58

import (
	"bytes"
	"fmt"
	"math/big"
)

/*
n   b58 n   b58 n   b58 n   b58
0   1   1   2   2   3   3   4
4   5   5   6   6   7   7   8
8   9   9   A   10  B   11  C
12  D   13  E   14  F   15  G
16  H   17  J   18  K   19  L
20  M   21  N   22  P   23  Q
24  R   25  S   26  T   27  U
28  V   29  W   30  X   31  Y
32  Z   33  a   34  b   35  c
36  d   37  e   38  f   39  g
40  h   41  i   42  j   43  k
44  m   45  n   46  o   47  p
48  q   49  r   50  s   51  t
52  u   53  v   54  w   55  x
56  y   57  z
*/

const (
	base58EncodeString = "123456789ABCDEFGHJKLMNPQRSTUVWXYZabcdefghijkmnopqrstuvwxyz"
	er                 = 0xff
)

var (
	base58DecodeArray = []byte{
		// 48 .. 63
		er, 0, 1, 2, 3, 4, 5, 6, 7, 8, er, er, er, er, er, er,
		// 64 .. 79
		er, 9, 10, 11, 12, 13, 14, 15, 16, er, 17, 18, 19, 20, 21, er,
		// 80 .. 95
		22, 23, 24, 25, 26, 27, 28, 29, 30, 31, 32, er, er, er, er, er,
		// 96 .. 111
		er, 33, 34, 35, 36, 37, 38, 39, 40, 41, 42, 43, er, 44, 45, 46,
		// 112 ... 127
		47, 48, 49, 50, 51, 52, 53, 54, 55, 56, 57, er, er, er, er, er,
	}

	zeroBig       = big.NewInt(0)
	fiftyEightBig = big.NewInt(58)
	singleZero    = []byte{0}
)
var (
	decodeEmptyString = fmt.Errorf("Cannot decode empty string")
	decodeBadChar     = fmt.Errorf("Bad character encountered")
)

func Encode(dec []byte) string {
	x := (&big.Int{}).SetBytes(dec)
	rem := big.NewInt(0) // remainder
	r := ""              // result

	for x.Cmp(zeroBig) > 0 {
		x.DivMod(x, fiftyEightBig, rem)
		enc := string(base58EncodeString[rem.Int64()])
		r = enc + r
	}

	for i := 0; i < len(dec) && dec[i] == 0; i++ {
		r = "1" + r
	}

	return r
}

func MustDecode(encoded string) (decoded []byte) {
	decoded, err := Decode(encoded)
	if err != nil {
		panic(err)
	}
	return
}

func Decode(encoded string) (decoded []byte, err error) {
	if len(encoded) == 0 {
		return nil, decodeEmptyString
	}

	// count pad bytes ("1111...")
	pad_bytes := 0
	i := 0
	for ; i < len(encoded) && encoded[i] == '1'; i++ {
		pad_bytes++
	}

	// decode
	sum := big.NewInt(0)
	var decodedCh byte
	for ; i < len(encoded); i++ {
		ch := encoded[i]
		if ch >= 48 && ch <= 127 {
			decodedCh = base58DecodeArray[ch-48]
		} else {
			decodedCh = er
		}
		if decodedCh == er {
			return nil, decodeBadChar
		}
		sum.Add(sum.Mul(sum, fiftyEightBig), big.NewInt(int64(decodedCh)))
	}

	// add pad
	pad := bytes.Repeat(singleZero, pad_bytes)
	return append(pad, sum.Bytes()...), nil
}
