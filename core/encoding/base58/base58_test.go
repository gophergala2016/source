package base58

import (
	"bytes"
	"encoding/hex"
	"fmt"
	"testing"
)

func testCaseDecodeFail(t *testing.T, bad_encoded string) {
	_, expected_err := Decode(bad_encoded)
	if expected_err == nil {
		t.Errorf("Should not have decoded %s", bad_encoded)
		return
	}
}

func bytesToString(b []byte) string {
	r := "["
	for i, by := range b {
		if i == 0 {
			r += fmt.Sprintf("%d", by)
		} else {
			r += fmt.Sprintf(", %d", by)
		}
	}

	return r + "]"
}

func testCaseSuccess(t *testing.T, expected_encoded string, expected_decoded []byte) {
	encoded := Encode(expected_decoded)
	if bytes.Compare([]byte(expected_encoded), []byte(encoded)) != 0 {
		t.Errorf("Encode failed.  expected = %s, actual = %s", bytesToString([]byte(expected_encoded)), bytesToString([]byte(encoded)))
		return
	}
	decoded, err := Decode(expected_encoded)
	if err != nil {
		t.Errorf("Decode error %s", err)
		return
	}
	if bytes.Compare(expected_decoded, decoded) != 0 {
		t.Errorf("Decode failed.  expected = %s, actual = %s", bytesToString(expected_decoded), bytesToString(decoded))
		return
	}
}

func Test0(t *testing.T) {
	data, _ := hex.DecodeString("8018E14A7B6A307F426A94F8114701E7C8E774E7F9A47E2C2035DB29A206321725d91ea8a6")
	encoded := "5J1F7GHadZG3sCCKHCwg8Jvys9xUbFsjLnGec4H125Ny1V9nR6V"
	testCaseSuccess(t, encoded, data)
}

func Test1(t *testing.T) {
	data, _ := hex.DecodeString("00000000")
	encoded := "1111"
	testCaseSuccess(t, encoded, data)
}

func Test2(t *testing.T) {
	data, _ := hex.DecodeString("00000000FF")
	encoded := "11115Q"
	testCaseSuccess(t, encoded, data)
}

func Test3(t *testing.T) {
	data, _ := hex.DecodeString("00")
	encoded := "1"
	testCaseSuccess(t, encoded, data)
}

func TestDecodeShouldFail(t *testing.T) {
	bad_encoded_cases := []string{"", "abcd;", "0", "zI", "OV", "llll", "."}

	for _, bad_encoded := range bad_encoded_cases {
		testCaseDecodeFail(t, bad_encoded)
	}
}
